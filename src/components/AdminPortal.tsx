/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Download, 
  Check, 
  Trash2, 
  Building, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  ExternalLink, 
  Settings, 
  Database,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  LogOut,
  Key
} from 'lucide-react';
import { Booking, Inquiry } from '../types';
import { 
  getBookings, 
  getInquiries, 
  updateBookingStatus, 
  deleteBooking, 
  updateInquiryStatus, 
  deleteInquiry,
  getAdminConfig,
  saveAdminConfig,
  testWebhook
} from '../lib/storage';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  
  // Tab states
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries' | 'sheets' | 'audit'>('bookings');
  
  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  // Webhook settings states
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSaveSuccess, setWebhookSaveSuccess] = useState(false);
  const [webhookTestStatus, setWebhookTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  // Clipboard success state
  const [copiedIndex, setCopiedIndex] = useState<'bookings' | 'inquiries' | null>(null);

  // Load and subscribe to database updates
  const loadData = () => {
    setBookings(getBookings());
    setInquiries(getInquiries());
    const config = getAdminConfig();
    setWebhookUrl(config.webhookUrl || '');
  };

  useEffect(() => {
    loadData();
    
    // Listen for custom change events
    const handleDataChange = () => {
      loadData();
    };
    
    window.addEventListener('arihant_data_changed', handleDataChange);
    return () => {
      window.removeEventListener('arihant_data_changed', handleDataChange);
    };
  }, []);

  // Check backend session status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/verify');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsUnlocked(true);
          }
        }
      } catch (err) {
        console.warn('Backend session status check failed:', err);
      }
    };
    checkAuthStatus();
  }, []);

  // Load audit logs from backend
  const loadLogs = async () => {
    try {
      const res = await fetch('/api/auth/logs');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    }
  };

  // Fetch logs whenever the audit tab is loaded
  useEffect(() => {
    if (isUnlocked && activeTab === 'audit') {
      loadLogs();
    }
  }, [isUnlocked, activeTab]);

  // Unlock verification via server backend API
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setPinError(false);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsUnlocked(true);
        setPinError(false);
        setPin('');
      } else {
        setPinError(true);
        setPin('');
        if (navigator.vibrate) navigator.vibrate(100);
      }
    } catch (err) {
      console.error('Server auth request failed:', err);
      setPinError(true);
      setPin('');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Server logout failed:', err);
    }
    setIsUnlocked(false);
    setActiveTab('bookings');
    setPin('');
  };

  // Status changers
  const handleBookingStatusChange = (id: string, status: Booking['status']) => {
    updateBookingStatus(id, status);
  };

  const handleInquiryStatusChange = (id: string, status: Inquiry['status']) => {
    updateInquiryStatus(id, status);
  };

  // Deletions
  const handleBookingDelete = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this booking record?')) {
      deleteBooking(id);
    }
  };

  const handleInquiryDelete = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this inquiry record?')) {
      deleteInquiry(id);
    }
  };

  // Webhook settings save
  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminConfig({ webhookUrl });
    setWebhookSaveSuccess(true);
    setTimeout(() => setWebhookSaveSuccess(false), 2000);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) return;
    setWebhookTestStatus('testing');
    const success = await testWebhook(webhookUrl);
    if (success) {
      setWebhookTestStatus('success');
    } else {
      setWebhookTestStatus('failed');
    }
    setTimeout(() => setWebhookTestStatus('idle'), 3000);
  };

  // CSV Spreadsheet Export
  const downloadCSV = (type: 'bookings' | 'inquiries') => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = '';

    if (type === 'bookings') {
      headers = ['Booking ID', 'Client Name', 'Email', 'Phone', 'Project Destination', 'Visit Date', 'Time Slot', 'Submitted At', 'Status'];
      rows = bookings.map(b => [
        b.id,
        b.name,
        b.email,
        b.phone,
        b.projectName,
        b.date,
        b.timeSlot,
        new Date(b.submittedAt).toLocaleString(),
        b.status
      ]);
      filename = 'arihant_tour_bookings_ledger.csv';
    } else {
      headers = ['Inquiry ID', 'Client Name', 'Email', 'Phone', 'Source Project', 'Form Type', 'Submitted At', 'Status'];
      rows = inquiries.map(i => [
        i.id,
        i.name,
        i.email,
        i.phone,
        i.projectName,
        i.formType.toUpperCase(),
        new Date(i.submittedAt).toLocaleString(),
        i.status
      ]);
      filename = 'arihant_investment_inquiries_ledger.csv';
    }

    // Format fields with quotes to handle commas correctly
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
    URL.revokeObjectURL(url);
  };

  // Clipboard TSV Sync
  const copyToClipboard = (type: 'bookings' | 'inquiries') => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (type === 'bookings') {
      headers = ['Booking ID', 'Client Name', 'Email', 'Phone', 'Project Destination', 'Visit Date', 'Time Slot', 'Submitted At', 'Status'];
      rows = bookings.map(b => [
        b.id,
        b.name,
        b.email,
        b.phone,
        b.projectName,
        b.date,
        b.timeSlot,
        new Date(b.submittedAt).toLocaleString(),
        b.status
      ]);
    } else {
      headers = ['Inquiry ID', 'Client Name', 'Email', 'Phone', 'Source Project', 'Form Type', 'Submitted At', 'Status'];
      rows = inquiries.map(i => [
        i.id,
        i.name,
        i.email,
        i.phone,
        i.projectName,
        i.formType.toUpperCase(),
        new Date(i.submittedAt).toLocaleString(),
        i.status
      ]);
    }

    // TSV structure
    const tsvContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');

    navigator.clipboard.writeText(tsvContent).then(() => {
      setCopiedIndex(type);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh] flex flex-col justify-between">
      
      {/* HEADER STATEMENT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-slate-900" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono font-bold block">Internal Operations</span>
          </div>
          <h1 className="text-3xl font-display font-light text-slate-900 tracking-tight">
            Arihant <span className="font-semibold">Registry Desk</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-light">
            Real-time client ledger database, secure local persistence, and spreadsheet integration.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="self-start sm:self-auto py-2 px-4 rounded-none border border-slate-300 text-xs font-mono tracking-widest text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-colors cursor-pointer"
        >
          Return Portfolio
        </button>
      </div>

      {/* LOCK / PIN SCREEN */}
      {!isUnlocked ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md p-8 rounded-none border border-slate-200 bg-white shadow-md text-center space-y-6">
            <div className="w-12 h-12 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-900">
              <Lock className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-display text-slate-900 font-semibold">Security Access Key</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                This area contains secure client contact credentials and requires private authorization.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-2">
                <input 
                  type="password"
                  required
                  maxLength={4}
                  placeholder="Enter 4-Digit Security PIN"
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPin(val);
                    setPinError(false);
                  }}
                  className={`w-full text-center tracking-[0.5em] text-lg font-mono p-3 rounded-none border ${
                    pinError ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 focus:border-slate-900'
                  } focus:outline-none focus:bg-white transition-all`}
                />
                {pinError && (
                  <p className="text-[10px] text-red-600 font-mono font-bold animate-pulse">
                    AUTHORIZATION FAILURE: INVALID SECURITY CREDENTIALS
                  </p>
                )}
              </div>

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 bg-slate-900 text-white font-mono tracking-widest uppercase text-xs hover:bg-slate-800 transition-colors cursor-pointer disabled:bg-slate-400"
              >
                {isAuthenticating ? 'VERIFYING CREDENTIALS...' : 'Unlock Registry'}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Sparkles className="w-3 h-3 text-slate-500" />
              <span>Session is verified securely via server filesystem credentials</span>
            </div>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD - UNLOCKED */
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* NAVIGATION SIDEBAR TAB LIST */}
          <div className="lg:col-span-3 space-y-2 font-mono">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left py-3 px-4 rounded-none border text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'bookings'
                  ? 'border-slate-900 bg-slate-900 text-white shadow'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Private Visit Bookings
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-none font-bold ${activeTab === 'bookings' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full text-left py-3 px-4 rounded-none border text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'border-slate-900 bg-slate-900 text-white shadow'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Investment Inquiries
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-none font-bold ${activeTab === 'inquiries' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sheets')}
              className={`w-full text-left py-3 px-4 rounded-none border text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'sheets'
                  ? 'border-slate-900 bg-slate-900 text-white shadow'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" /> Spreadsheet Sync Hub
              </span>
              <span className="text-[10px] text-slate-400 font-bold">
                {webhookUrl ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full text-left py-3 px-4 rounded-none border text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'audit'
                  ? 'border-slate-900 bg-slate-900 text-white shadow'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" /> Security Audit Logs
              </span>
              <span className="text-[10px] text-slate-400 font-bold">
                {auditLogs.length} LOGS
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left py-3 px-4 rounded-none border border-red-200 bg-red-50 text-red-700 text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer hover:bg-red-100 hover:border-red-300 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5 text-red-700" /> Close Session (Logout)
            </button>

            <div className="p-4 rounded-none border border-slate-200 bg-slate-50 text-[10px] text-slate-500 leading-relaxed font-sans space-y-2">
              <p className="font-semibold text-slate-800 font-mono uppercase text-[9px] tracking-wider flex items-center gap-1">
                <Unlock className="w-3 h-3 text-green-600" /> Authenticated Console
              </p>
              <p>Registry is fully integrated with Express backend. Admin sessions are secured via filesystem-based verification, and actions are compiled in audit logs.</p>
            </div>
          </div>

          {/* ACTIVE CONTENT VIEW */}
          <div className="lg:col-span-9 bg-white border border-slate-200 p-6 shadow-sm min-h-[400px]">
            
            {/* 1. BOOKINGS LIST */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
                  <div>
                    <h2 className="text-xl font-display font-light text-slate-900">Private Tour <span className="font-semibold">Schedules</span></h2>
                    <p className="text-xs text-slate-400">Exclusive client appointments for on-site property walkthroughs.</p>
                  </div>
                  
                  {bookings.length > 0 && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard('bookings')}
                        className="py-1.5 px-3 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                      >
                        {copiedIndex === 'bookings' ? <Check className="w-3 h-3 text-green-600" /> : <Download className="w-3 h-3" />}
                        {copiedIndex === 'bookings' ? 'Pasted TSV Copied!' : 'Copy for Sheets/Excel'}
                      </button>
                      <button 
                        onClick={() => downloadCSV('bookings')}
                        className="py-1.5 px-3 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                      >
                        <Download className="w-3 h-3" /> Download CSV (Excel)
                      </button>
                    </div>
                  )}
                </div>

                {bookings.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 font-light">No visits have been scheduled yet.</p>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">Open the portfolio page, click "Book Visit" and fill out the details to generate entries here instantly.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                          <th className="py-3 px-2 font-bold">Client ID</th>
                          <th className="py-3 px-2 font-bold">Guest Detail</th>
                          <th className="py-3 px-2 font-bold">Project Destination</th>
                          <th className="py-3 px-2 font-bold">Date & Time</th>
                          <th className="py-3 px-2 font-bold">Status</th>
                          <th className="py-3 px-2 text-right font-bold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-2 font-mono text-[10px] text-slate-400 font-bold">{booking.id}</td>
                            <td className="py-3 px-2">
                              <p className="font-semibold text-slate-900">{booking.name}</p>
                              <div className="flex flex-col gap-0.5 text-[10px] text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" /> {booking.phone}</span>
                                <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {booking.email}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wide">
                                <Building className="w-3 h-3 text-slate-400" /> {booking.projectName}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <p className="font-medium text-slate-800">{new Date(booking.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {booking.timeSlot}
                              </p>
                            </td>
                            <td className="py-3 px-2">
                              <select
                                value={booking.status}
                                onChange={(e) => handleBookingStatusChange(booking.id, e.target.value as Booking['status'])}
                                className={`p-1 border rounded-none text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer ${
                                  booking.status === 'CONFIRMED' ? 'border-green-300 bg-green-50 text-green-700' :
                                  booking.status === 'CONTACTED' ? 'border-blue-300 bg-blue-50 text-blue-700' :
                                  booking.status === 'ARCHIVED' ? 'border-slate-300 bg-slate-50 text-slate-600' :
                                  'border-amber-300 bg-amber-50 text-amber-700'
                                }`}
                              >
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                              </select>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <button
                                onClick={() => handleBookingDelete(booking.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-all rounded-none cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 2. INQUIRIES LIST */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
                  <div>
                    <h2 className="text-xl font-display font-light text-slate-900">Investment <span className="font-semibold">Inquiry Registry</span></h2>
                    <p className="text-xs text-slate-400">Formal lead submissions and callback/brochure requests.</p>
                  </div>
                  
                  {inquiries.length > 0 && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard('inquiries')}
                        className="py-1.5 px-3 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                      >
                        {copiedIndex === 'inquiries' ? <Check className="w-3 h-3 text-green-600" /> : <Download className="w-3 h-3" />}
                        {copiedIndex === 'inquiries' ? 'Pasted TSV Copied!' : 'Copy for Sheets/Excel'}
                      </button>
                      <button 
                        onClick={() => downloadCSV('inquiries')}
                        className="py-1.5 px-3 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                      >
                        <Download className="w-3 h-3" /> Download CSV (Excel)
                      </button>
                    </div>
                  )}
                </div>

                {inquiries.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <Mail className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 font-light">No investment inquiries found.</p>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">Fill out the private consultation form in the landing pages or download a brochure to register inquiries here instantly.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                          <th className="py-3 px-2 font-bold">Inquiry ID</th>
                          <th className="py-3 px-2 font-bold">Prospect Detail</th>
                          <th className="py-3 px-2 font-bold">Source/Campaign</th>
                          <th className="py-3 px-2 font-bold">Action Request</th>
                          <th className="py-3 px-2 font-bold">Submitted At</th>
                          <th className="py-3 px-2 font-bold">Status</th>
                          <th className="py-3 px-2 text-right font-bold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {inquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-2 font-mono text-[10px] text-slate-400 font-bold">{inquiry.id}</td>
                            <td className="py-3 px-2">
                              <p className="font-semibold text-slate-900">{inquiry.name}</p>
                              <div className="flex flex-col gap-0.5 text-[10px] text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" /> {inquiry.phone}</span>
                                <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {inquiry.email}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wide">
                                <Building className="w-3 h-3 text-slate-400" /> {inquiry.projectName}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider ${
                                inquiry.formType === 'brochure' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                inquiry.formType === 'callback' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                                inquiry.formType === 'inquiry' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                                'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}>
                                {inquiry.formType}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-slate-500 font-mono text-[10px]">
                              {new Date(inquiry.submittedAt).toLocaleString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                            </td>
                            <td className="py-3 px-2">
                              <select
                                value={inquiry.status}
                                onChange={(e) => handleInquiryStatusChange(inquiry.id, e.target.value as Inquiry['status'])}
                                className={`p-1 border rounded-none text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer ${
                                  inquiry.status === 'CONTACTED' ? 'border-blue-300 bg-blue-50 text-blue-700' :
                                  inquiry.status === 'ARCHIVED' ? 'border-slate-300 bg-slate-50 text-slate-600' :
                                  'border-red-300 bg-red-50 text-red-700'
                                }`}
                              >
                                <option value="UNREAD">UNREAD</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                              </select>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <button
                                onClick={() => handleInquiryDelete(inquiry.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-all rounded-none cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 3. SPREADSHEET SYNC HUB */}
            {activeTab === 'sheets' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-display font-light text-slate-900">Spreadsheet <span className="font-semibold">Integration Hub</span></h2>
                  <p className="text-xs text-slate-400">Instantly synchronize local registry submissions directly into external software like Google Sheets or Microsoft Excel.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* Webhook Configuration form */}
                  <div className="space-y-4 border border-slate-200 p-5 rounded-none bg-slate-50">
                    <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                      <Settings className="w-3.5 h-3.5 text-slate-900" /> Configure Google Sheet API Webhook
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Adding a webhook URL enables the app to fire background HTTP POST requests to your spreadsheet backend in real-time on every form submission.
                    </p>

                    <form onSubmit={handleSaveWebhook} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">
                          Google Web App Script URL
                        </label>
                        <input 
                          type="url"
                          placeholder="https://script.google.com/macros/s/.../exec"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          className="w-full text-xs font-mono p-2.5 bg-white border border-slate-200 focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-slate-900 text-white font-mono tracking-widest uppercase text-[10px] hover:bg-slate-800 transition-all cursor-pointer text-center font-bold"
                        >
                          {webhookSaveSuccess ? 'Webhook Saved!' : 'Save Endpoint'}
                        </button>
                        
                        {webhookUrl && (
                          <button
                            type="button"
                            onClick={handleTestWebhook}
                            disabled={webhookTestStatus === 'testing'}
                            className="py-2 px-4 border border-slate-300 hover:border-slate-900 bg-white text-slate-700 font-mono tracking-widest uppercase text-[10px] transition-all cursor-pointer font-bold"
                          >
                            {webhookTestStatus === 'testing' ? 'Testing...' :
                             webhookTestStatus === 'success' ? 'Tested ✓' :
                             webhookTestStatus === 'failed' ? 'Failed ✗' : 'Test Sync'}
                          </button>
                        )}
                      </div>
                    </form>

                    {webhookTestStatus === 'success' && (
                      <p className="text-[10px] text-green-700 font-mono font-bold animate-pulse">
                        CONNECTION ESTABLISHED: Handshake payload dispatched successfully.
                      </p>
                    )}
                    {webhookTestStatus === 'failed' && (
                      <p className="text-[10px] text-red-600 font-mono font-bold animate-pulse">
                        CONNECTION BLOCKED: Handshake rejected. Ensure the Apps Script allows Anonymous access.
                      </p>
                    )}
                  </div>

                  {/* Copy-Paste guide */}
                  <div className="space-y-4 border border-slate-200 p-5 rounded-none bg-white">
                    <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-900" /> Live Google Sheet Sync Guide
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      You can connect this app directly to a Google Sheet for free:
                    </p>

                    <ol className="text-xs text-slate-500 space-y-2 font-light list-decimal pl-4">
                      <li>Open a new <strong>Google Sheet</strong>.</li>
                      <li>Go to <strong>Extensions &gt; Apps Script</strong>.</li>
                      <li>Delete existing code and paste this script:</li>
                    </ol>

                    <div className="relative">
                      <pre className="text-[9px] font-mono p-2.5 bg-slate-900 text-slate-300 overflow-x-auto max-h-[140px] leading-relaxed">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.event,
    data.id,
    data.name,
    data.email,
    data.phone,
    data.project,
    data.date || "",
    data.timeSlot || "",
    data.status
  ]);
  return ContentService.createTextOutput("Success");
}`}
                      </pre>
                    </div>

                    <ol className="text-xs text-slate-500 space-y-2 font-light list-decimal pl-4" start={4}>
                      <li>Click <strong>Deploy &gt; New Deployment</strong>.</li>
                      <li>Select type <strong>Web App</strong>.</li>
                      <li>Set "Execute as" to <strong>Me</strong> and "Who has access" to <strong>Anyone</strong> (this is crucial!).</li>
                      <li>Deploy, copy the Web App URL, and paste it into the endpoint settings on the left!</li>
                    </ol>
                  </div>
                </div>

                <div className="p-4 border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-mono font-bold text-slate-900">Immediate Copy Integration Shortcut</p>
                    <p className="text-[11px] text-slate-500 font-light">Don't want webhooks? Use the copying buttons in the database tables to grab fully formatted cells and instantly paste them directly into your sheet.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyToClipboard('bookings')}
                      className="py-2 px-4 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 bg-white transition-colors cursor-pointer font-bold"
                    >
                      Copy Bookings
                    </button>
                    <button 
                      onClick={() => copyToClipboard('inquiries')}
                      className="py-2 px-4 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 bg-white transition-colors cursor-pointer font-bold"
                    >
                      Copy Inquiries
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SECURITY AUDIT LOGS */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
                  <div>
                    <h2 className="text-xl font-display font-light text-slate-900 font-bold">Security <span className="font-semibold text-red-700">Audit Logs</span></h2>
                    <p className="text-xs text-slate-400">Server-side records of all administrative access attempts and session terminations.</p>
                  </div>
                  <button 
                    onClick={loadLogs}
                    className="py-1.5 px-3 rounded-none border border-slate-300 hover:border-slate-900 text-[10px] font-mono uppercase text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                  >
                    Refresh Logs
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  All administrative logins, logouts, and invalid credentials are systematically recorded on the server file system in <strong>/admin_access.log</strong>.
                </p>

                <div className="border border-slate-200 rounded-none bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-y-auto max-h-[400px] space-y-1">
                  {auditLogs.length === 0 ? (
                    <p className="text-slate-500 italic text-slate-400">No access logs found. Initiate some actions or logins to generate server log entries.</p>
                  ) : (
                    auditLogs.map((log, index) => {
                      let colorClass = 'text-slate-300';
                      if (log.includes('LOGIN_SUCCESS')) colorClass = 'text-green-400';
                      else if (log.includes('LOGIN_FAILURE')) colorClass = 'text-red-400';
                      else if (log.includes('LOGOUT')) colorClass = 'text-blue-400';
                      
                      return (
                        <div key={index} className={`py-1 border-b border-slate-800/50 last:border-0 ${colorClass}`}>
                          {log}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER METRICS AND COUNTERS */}
      {isUnlocked && (
        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-400">
          <p>AUTHORIZED SESSION ACTIVE • SECURE CONNECTION</p>
          <p>TOTAL VISITS REGISTERED: {bookings.length} • INQUIRIES REGISTERED: {inquiries.length}</p>
        </div>
      )}
    </div>
  );
};
