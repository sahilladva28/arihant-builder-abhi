/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Booking, Inquiry, AdminConfig } from '../types';

// Storage keys
const BOOKINGS_KEY = 'arihant_bookings';
const INQUIRIES_KEY = 'arihant_inquiries';
const ADMIN_CONFIG_KEY = 'arihant_admin_config';

/**
 * Fetch all booked visits from localStorage
 */
export function getBookings(): Booking[] {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading bookings from localStorage', e);
    return [];
  }
}

/**
 * Save a new booking and trigger sync webhook if configured
 */
export function saveBooking(bookingData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  projectId: string;
  projectName: string;
}): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...bookingData,
    id: 'B-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    submittedAt: new Date().toISOString(),
    status: 'PENDING'
  };

  bookings.unshift(newBooking); // Add to the top of the list
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  
  // Trigger dispatch (fire-and-forget)
  triggerWebhookSync({ type: 'booking', data: newBooking });
  
  // Dispatch a custom event to notify App of the new entry
  window.dispatchEvent(new CustomEvent('arihant_data_changed'));

  return newBooking;
}

/**
 * Update status of an existing booking
 */
export function updateBookingStatus(id: string, status: Booking['status']): void {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('arihant_data_changed'));
  }
}

/**
 * Delete a booking
 */
export function deleteBooking(id: string): void {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('arihant_data_changed'));
}

/**
 * Fetch all general/specific inquiries from localStorage
 */
export function getInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem(INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading inquiries from localStorage', e);
    return [];
  }
}

/**
 * Save a new inquiry and trigger webhook if configured
 */
export function saveInquiry(inquiryData: {
  name: string;
  email: string;
  phone: string;
  projectId: string;
  projectName: string;
  formType: Inquiry['formType'];
}): Inquiry {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: 'I-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    submittedAt: new Date().toISOString(),
    status: 'UNREAD'
  };

  inquiries.unshift(newInquiry);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  
  // Trigger dispatch
  triggerWebhookSync({ type: 'inquiry', data: newInquiry });
  
  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('arihant_data_changed'));

  return newInquiry;
}

/**
 * Update inquiry status
 */
export function updateInquiryStatus(id: string, status: Inquiry['status']): void {
  const inquiries = getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  if (index !== -1) {
    inquiries[index].status = status;
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new CustomEvent('arihant_data_changed'));
  }
}

/**
 * Delete an inquiry
 */
export function deleteInquiry(id: string): void {
  const inquiries = getInquiries();
  const filtered = inquiries.filter(i => i.id !== id);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('arihant_data_changed'));
}

/**
 * Fetch Admin settings
 */
export function getAdminConfig(): AdminConfig {
  try {
    const data = localStorage.getItem(ADMIN_CONFIG_KEY);
    return data ? JSON.parse(data) : { webhookUrl: '' };
  } catch (e) {
    return { webhookUrl: '' };
  }
}

/**
 * Save Admin settings
 */
export function saveAdminConfig(config: AdminConfig): void {
  localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(config));
}

/**
 * Helper to dispatch webhook events to external sync targets (e.g., Google Sheet Script Web App)
 */
async function triggerWebhookSync(payload: { type: 'booking' | 'inquiry'; data: Booking | Inquiry }): Promise<boolean> {
  const config = getAdminConfig();
  if (!config.webhookUrl) return false;

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for web-apps returning CORS-less redirects or empty bodies
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: payload.type,
        timestamp: new Date().toISOString(),
        id: payload.data.id,
        name: payload.data.name,
        email: payload.data.email,
        phone: payload.data.phone,
        project: payload.data.projectName,
        date: 'date' in payload.data ? payload.data.date : '',
        timeSlot: 'timeSlot' in payload.data ? payload.data.timeSlot : '',
        status: payload.data.status,
        raw: payload.data
      })
    });
    return true;
  } catch (error) {
    console.warn('Webhook transmission background failure (this is expected if webhook is inactive or block-cors):', error);
    return false;
  }
}

/**
 * Dedicated webhook tester
 */
export async function testWebhook(url: string): Promise<boolean> {
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: 'test',
        timestamp: new Date().toISOString(),
        message: 'Establishing connection from Arihant Builders & Developers Registry Desk.'
      })
    });
    return true;
  } catch (error) {
    console.error('Test webhook connection failed:', error);
    return false;
  }
}
