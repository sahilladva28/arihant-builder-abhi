import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// In-memory admin session store
const activeSessions = new Set<string>();

// Simple zero-dependency cookie parser middleware
const cookieMiddleware = (req: any, res: any, next: any) => {
  const cookieHeader = req.headers.cookie;
  req.cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie: string) => {
      const parts = cookie.split('=');
      const name = parts.shift()?.trim();
      const value = parts.join('=')?.trim();
      if (name) {
        req.cookies[name] = decodeURIComponent(value || '');
      }
    });
  }
  next();
};
app.use(cookieMiddleware);

// Security Headers Middleware
app.use((req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  
  // Base CSP directives
  let csp = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://lh3.googleusercontent.com; connect-src 'self' *;";
  
  if (isProd) {
    csp += " frame-ancestors 'self';";
    res.setHeader('X-Frame-Options', 'DENY');
  } else {
    // In development/preview mode, allow framing from AI Studio domains so the live preview is visible
    csp += " frame-ancestors 'self' https://*.google.com https://*.google.dev https://ai.studio;";
    // Do not set X-Frame-Options: DENY in development, as it overrides CSP frame-ancestors and breaks iframe rendering completely
  }
  
  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Helper for access logs
const logAccess = (action: string, ip: string) => {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] IP: ${ip} | Action: ${action}\n`;
  try {
    fs.appendFileSync(path.join(process.cwd(), 'admin_access.log'), entry, 'utf8');
  } catch (err) {
    console.error('Failed to write admin access log:', err);
  }
  console.log(`[ACCESS LOG] ${entry.trim()}`);
};

// API: Admin Login
app.post('/api/auth/login', (req, res) => {
  const { pin } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ipStr = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  if (!pin) {
    logAccess('LOGIN_ATTEMPT_EMPTY', ipStr);
    return res.status(400).json({ success: false, error: 'PIN is required' });
  }

  try {
    const passwordPath = path.join(process.cwd(), 'admin_password.txt');
    if (!fs.existsSync(passwordPath)) {
      // Auto-recreate password file if it was deleted
      fs.writeFileSync(passwordPath, '1989', 'utf8');
    }
    
    const correctPin = fs.readFileSync(passwordPath, 'utf8').trim();

    if (pin === correctPin) {
      // Generate secure random session ID
      const sessionId = 'SESS_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      activeSessions.add(sessionId);

      // Set secure HTTP-only cookie
      res.setHeader(
        'Set-Cookie',
        `admin_session=${sessionId}; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400`
      );

      logAccess('LOGIN_SUCCESS', ipStr);
      return res.json({ success: true });
    } else {
      logAccess(`LOGIN_FAILURE (Attempted PIN: ${pin})`, ipStr);
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid PIN' });
    }
  } catch (error) {
    console.error('Error during login verification:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// API: Admin Logout
app.post('/api/auth/logout', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ipStr = Array.isArray(clientIp) ? clientIp[0] : clientIp;
  const sessionId = req.cookies?.admin_session;

  if (sessionId) {
    activeSessions.delete(sessionId);
  }

  // Clear cookie
  res.setHeader(
    'Set-Cookie',
    'admin_session=; HttpOnly; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );

  logAccess('LOGOUT', ipStr);
  return res.json({ success: true });
});

// API: Admin Verify Session
app.get('/api/auth/verify', (req, res) => {
  const sessionId = req.cookies?.admin_session;
  if (sessionId && activeSessions.has(sessionId)) {
    return res.json({ authenticated: true });
  }
  return res.json({ authenticated: false });
});

// API: Admin Audit Logs
app.get('/api/auth/logs', (req, res) => {
  const sessionId = req.cookies?.admin_session;
  if (!sessionId || !activeSessions.has(sessionId)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const logPath = path.join(process.cwd(), 'admin_access.log');
    if (fs.existsSync(logPath)) {
      const logs = fs.readFileSync(logPath, 'utf8');
      return res.json({ logs: logs.split('\n').filter(Boolean) });
    }
    return res.json({ logs: [] });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read audit logs' });
  }
});

// Start the Express app
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    // Vite dev middleware setup
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});
