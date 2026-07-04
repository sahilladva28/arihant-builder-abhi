/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, Building, CheckCircle, Sparkles } from 'lucide-react';
import { projects } from '../data';
import { saveBooking } from '../lib/storage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialProjectId }) => {
  const [projectId, setProjectId] = useState(initialProjectId || projects[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to local storage database
    saveBooking({
      name,
      email,
      phone,
      date,
      timeSlot,
      projectId,
      projectName: selectedProjectObj?.name || projectId
    });

    // Simulate luxury API response with professional delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const selectedProjectObj = projects.find(p => p.id === projectId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-none border border-slate-300 bg-white transition-all duration-500 z-10 p-6 md:p-8 shadow-xl">
        {/* Decorative ambient top line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-900" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold">Bespoke Experience</span>
              </div>
              <h3 className="text-2xl font-display font-light text-slate-900 tracking-tight">Schedule <span className="font-semibold">Private Viewing</span></h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Experience quiet luxury firsthand. Our private relationship managers will host an exclusive tour.
              </p>
            </div>

            {/* Project Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5 font-bold">
                <Building className="w-3.5 h-3.5 text-slate-900" /> Select Destination
              </label>
              <div className="grid grid-cols-3 gap-2">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setProjectId(proj.id)}
                    className={`p-2.5 rounded-none border text-xs font-semibold text-center transition-all cursor-pointer ${
                      projectId === proj.id
                        ? 'border-slate-900 bg-slate-900 text-white shadow'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {proj.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5 font-bold">
                    <User className="w-3.5 h-3.5 text-slate-900" /> Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-none border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder-slate-400"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5 font-bold">
                    <Phone className="w-3.5 h-3.5 text-slate-900" /> Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-none border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5 font-bold">
                  <Mail className="w-3.5 h-3.5 text-slate-900" /> Private Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-none border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder-slate-400"
                />
              </div>
            </div>

            {/* Date & Time Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-slate-900" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-none border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5 text-slate-900" /> Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-none border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                  <option value="12:00 PM">12:00 PM - 02:00 PM</option>
                  <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-none bg-slate-900 text-white font-mono tracking-widest uppercase text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Securing Appointment...
                </>
              ) : (
                'Request Elite Access'
              )}
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-slate-900" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-light text-slate-900"><span className="font-semibold">Appointment</span> Reserved</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-slate-950 font-bold">{name}</span>. A designated relationship manager will reach out via <span className="text-slate-950 font-mono font-bold">{phone}</span> to finalize your private itinerary at <span className="text-slate-950 font-bold">{selectedProjectObj?.name}</span>.
              </p>
            </div>

            <div className="p-4 rounded-none bg-slate-50 border border-slate-200 inline-block text-left text-xs text-slate-600 font-mono space-y-1 mx-auto">
              <div><span className="text-slate-400 font-bold">DATE:</span> {date}</div>
              <div><span className="text-slate-400 font-bold">TIME:</span> {timeSlot}</div>
              <div><span className="text-slate-400 font-bold">STATUS:</span> CONFIRMED</div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setName('');
                setEmail('');
                setPhone('');
                setDate('');
                onClose();
              }}
              className="mt-6 py-2.5 px-6 rounded-none border border-slate-300 hover:border-slate-900 text-xs uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Return Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
