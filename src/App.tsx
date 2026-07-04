/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  Menu, 
  X, 
  Compass, 
  Award, 
  Calendar, 
  Maximize2, 
  Check, 
  Download, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Eye,
  History,
  Briefcase,
  Train,
  School,
  Activity,
  ShoppingBag
} from 'lucide-react';
import { ViewState } from './types';
import { projects } from './data';
import { BookingModal } from './components/BookingModal';
import { Lightbox } from './components/Lightbox';
import { MapExplorer } from './components/MapExplorer';
import { AdminPortal } from './components/AdminPortal';
import { saveInquiry } from './lib/storage';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProjectId, setBookingProjectId] = useState<string>('shreya');
  
  // Gallery Lightbox states
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState<number | null>(null);
  const [lightboxProject, setLightboxProject] = useState<string>('shreya');

  // Lead inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState<string | null>(null);

  // Auto-scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [viewState]);

  const handleOpenBooking = (projId: string) => {
    setBookingProjectId(projId);
    setIsBookingOpen(true);
  };

  const activeProject = projects.find(p => p.id === viewState);

  const handleInquirySubmit = (e: React.FormEvent, formId: string) => {
    e.preventDefault();
    
    let projName = 'General Registry';
    let fType: 'general' | 'brochure' | 'callback' | 'inquiry' = 'general';
    
    if (formId !== 'general') {
      const proj = projects.find(p => p.id === formId);
      if (proj) {
        projName = proj.name;
        // Map the project formType (which matches the required 'brochure' | 'callback' | 'inquiry' types)
        fType = proj.formType;
      }
    }

    saveInquiry({
      name: inquiryName,
      phone: inquiryPhone,
      email: inquiryEmail,
      projectId: formId,
      projectName: projName,
      formType: fType
    });

    setInquirySubmitted(formId);
    setTimeout(() => {
      // Clear inputs
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 selection:bg-slate-900 selection:text-white flex flex-col justify-between font-sans relative overflow-x-hidden">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Signature */}
          <button 
            onClick={() => setViewState('home')}
            className="flex items-center gap-3.5 group text-left cursor-pointer animate-fade-in"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-none border border-slate-300 flex items-center justify-center bg-slate-50 group-hover:border-slate-900 transition-colors">
              <Building2 className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <span className="font-display text-xl tracking-[0.2em] text-slate-900 font-bold group-hover:text-slate-700 transition-colors block leading-none">ARIHANT</span>
              <span className="text-[9px] tracking-[0.3em] text-slate-500 block uppercase mt-1">BUILDERS &amp; DEVELOPERS</span>
            </div>
          </button>

          {/* Desktop Luxury Navigation Menus */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-slate-600" id="desktop-nav-menu">
            <button 
              onClick={() => setViewState('home')}
              className={`hover:text-slate-900 transition-colors py-2 relative uppercase ${viewState === 'home' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Portfolio
              {viewState === 'home' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />}
            </button>
            
            <div className="relative group">
              <button 
                className={`hover:text-slate-900 transition-colors py-2 uppercase flex items-center gap-1 ${
                  ['shreya', 'santosh', 'nirmala'].includes(viewState) ? 'text-slate-900 font-semibold' : ''
                }`}
              >
                Developments <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </button>
              
              {/* Dropdown panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-none bg-white border border-slate-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 p-2 space-y-1 shadow-md">
                <button 
                  onClick={() => setViewState('shreya')}
                  className="w-full text-left px-4 py-2.5 rounded-none text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-between"
                >
                  <span>Shreya Flagship</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono font-bold">ONGOING</span>
                </button>
                <button 
                  onClick={() => setViewState('santosh')}
                  className="w-full text-left px-4 py-2.5 rounded-none text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-between"
                >
                  <span>Santosh Apartment</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono font-bold">READY</span>
                </button>
                <button 
                  onClick={() => setViewState('nirmala')}
                  className="w-full text-left px-4 py-2.5 rounded-none text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-between"
                >
                  <span>Nirmala Commercial</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold">GRADE A</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setViewState('about')}
              className={`hover:text-slate-900 transition-colors py-2 relative uppercase ${viewState === 'about' ? 'text-slate-900 font-semibold' : ''}`}
            >
              The Pedigree
              {viewState === 'about' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />}
            </button>

            <button 
              onClick={() => setViewState('legacy')}
              className={`hover:text-slate-900 transition-colors py-2 relative uppercase ${viewState === 'legacy' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Legacy Timeline
              {viewState === 'legacy' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />}
            </button>
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleOpenBooking('shreya')}
              className="hidden sm:inline-flex items-center gap-2 py-2.5 px-5 rounded-none border-2 border-slate-900 text-xs font-mono tracking-wider uppercase text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
              id="header-book-visit-btn"
            >
              <span>Book Visit</span>
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-none border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-900"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl animate-fade-in md:hidden">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-lg tracking-widest text-slate-900 font-bold">ARIHANT</span>
                <span className="text-[8px] tracking-widest text-slate-500 block uppercase mt-0.5">BUILDERS</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-none border border-slate-200 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-sm font-mono uppercase tracking-widest">
              <button 
                onClick={() => setViewState('home')}
                className={`text-left py-1 hover:text-slate-900 ${viewState === 'home' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}
              >
                Portfolio Home
              </button>
              
              <div className="border-t border-slate-100 my-2 pt-2 space-y-3">
                <p className="text-[10px] text-slate-400 tracking-wider font-semibold">DEVELOPMENTS</p>
                <button 
                  onClick={() => setViewState('shreya')}
                  className={`text-left block w-full py-1 text-xs hover:text-slate-900 ${viewState === 'shreya' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}
                >
                  Shreya Flagship (Ongoing)
                </button>
                <button 
                  onClick={() => setViewState('santosh')}
                  className={`text-left block w-full py-1 text-xs hover:text-slate-900 ${viewState === 'santosh' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}
                >
                  Santosh Apartment (Ready)
                </button>
                <button 
                  onClick={() => setViewState('nirmala')}
                  className={`text-left block w-full py-1 text-xs hover:text-slate-900 ${viewState === 'nirmala' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}
                >
                  Nirmala Commercial (Office)
                </button>
              </div>

              <button 
                onClick={() => setViewState('about')}
                className={`text-left py-1 hover:text-slate-900 ${viewState === 'about' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}
              >
                The Pedigree
              </button>

              <button 
                onClick={() => setViewState('legacy')}
                className={`text-left py-1 hover:text-slate-900 ${viewState === 'legacy' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}
              >
                Legacy Timeline
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenBooking('shreya');
              }}
              className="w-full py-3 px-4 rounded-none bg-slate-900 text-white font-medium text-xs tracking-widest uppercase text-center flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <span>Book View Tour</span>
              <Compass className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-center text-slate-400 font-mono">
              EXCLUSIVE SALES DESK: +91 22 4920 0000
            </p>
          </div>
        </div>
      )}


      {/* VIEW STATE HANDLERS */}
      <main className="flex-1">

        {/* 1. PORTFOLIO OVERVIEW SCREEN (HOME) */}
        {viewState === 'home' && (
          <div className="space-y-24 md:space-y-36">
            
            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12" id="hero-portal">
              {/* Background elegant high-res cinematic tower architecture */}
              <div className="absolute inset-0 z-0">
                <img 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBymuNSaNcUdmlJ0zXovMGek_g0TBWxE-0r2EQCQXqjwDOvLxDEdYp6u3zPmL7H_vBB6bHJ9aPU9l2lQzj-amNwKDITUKmwTP9pqimzmfCRJIbkei_PT8s90ctdn98KTV0qTfcAJF9CmKWmccJsNDGebJLntOoFmTPpNRYT9TFs9DUXnkwoMuRx1yqEWtvV3o6YAv2U8nROVXimvTY72kddjxUQPfVnOP9mI88yUi4J9Lge1P7jh9tq4lWyxwk97s-8YbUWEmvzCstW"
                  alt="Arihant Flagship Tower Architecture"
                  className="w-full h-full object-cover opacity-45 scale-105 filter saturate-50 animate-subtle-scale"
                />
                <div className="absolute inset-0 bg-[#F8FAFC] bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-transparent to-[#F8FAFC]" />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full relative">
                <div className="max-w-3xl space-y-6">
                  
                  {/* Highlight micro bar */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border border-slate-300 bg-white shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-slate-900 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-900 font-bold">Bespoke Living Spaces</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light text-slate-900 tracking-tight leading-[1.05]">
                    Shaping Mumbai's <br />
                    <span className="font-semibold text-slate-900">Skyline of Tomorrow</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl font-light">
                    Uncompromising quality, quiet luxury, and timeless design. Celebrating decades of creating Mumbai's most prestigious landmarks with perfect geometric precision.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => setViewState('shreya')}
                      className="py-3.5 px-6 rounded-none bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      id="hero-explore-cta"
                    >
                      <span>Explore Flagship</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => handleOpenBooking('shreya')}
                      className="py-3.5 px-6 rounded-none border border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900 font-medium text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Private Viewing
                    </button>
                  </div>
                </div>

                {/* Pedigree Metrics Strip */}
                <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl pt-8 border-t border-slate-200">
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-display font-semibold text-slate-900">35+</p>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-medium">Years of Legacy</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-display font-semibold text-slate-900">12M+</p>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-medium">Sq. Ft. Conceived</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-display font-semibold text-slate-900">20,000+</p>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-medium">Elite Families</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Grade A</p>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-medium">Structural Integrity</p>
                  </div>
                </div>
              </div>

              {/* Infinite indicator line */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-medium">Scroll Portfolio</span>
                <div className="hero-scroll-indicator" />
              </div>
            </section>


            {/* DESIGN PHILLOSOPHY / STATEMENT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 p-8 sm:p-12 shadow-sm rounded-none">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono font-bold block">Sovereign Philosophy</span>
                  <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
                    The Art of <br />
                    <span className="font-semibold text-slate-900">Quiet Grandeur</span>
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
                    At Arihant, we do not believe in the clamor of superficial embellishments. We design spaces where grandeur is whispered rather than shouted. By pairing meticulous engineering with hand-selected materials—pure Italian marble slabs, column-free panoramic views, and premium architectural bronze—we construct masterpieces that endure.
                  </p>
                </div>
              </div>
            </section>


            {/* THE TRIO OF LEGENDARY DEVELOPMENTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] w-8 bg-slate-900" />
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono font-bold">Bespoke Collection</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight">
                    Iconic <span className="font-semibold">Destinations</span>
                  </h2>
                </div>
                <p className="text-xs text-slate-400 font-mono font-medium">
                  ACTIVE PORTFOLIO &amp; ENQUIRY DESK • SELECT A MASTERPIECE TO VIEW DETAILS
                </p>
              </div>

              {/* The Bento-style dynamic cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="portfolio-bento-grid">
                
                {/* 1. Shreya Flagship (The Big Card - 7 Cols) */}
                <div className="lg:col-span-7 group rounded-none overflow-hidden bg-white border border-slate-200 hover:border-slate-900 transition-all duration-500 flex flex-col justify-between relative ambient-glow">
                  
                  {/* Project Image */}
                  <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
                    <img 
                      referrerPolicy="no-referrer"
                      src={projects[0].heroImage} 
                      alt={projects[0].heroAlt} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none">
                      Ongoing Flagship
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-300 font-mono font-bold">₹ 8.5 CR ONWARDS</p>
                        <h3 className="text-2xl font-display font-semibold text-white mt-0.5">{projects[0].name}</h3>
                      </div>
                      <span className="p-2 rounded-none bg-white/10 text-white hover:bg-slate-900 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="p-6 md:p-8 space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {projects[0].description} Featuring 4 &amp; 5 BHK custom-configured sky-villas with panoramic horizons, infinity pool decks, and personalized concierge infrastructure.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">TYPOLOGY</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">4 &amp; 5 BHK Sky-Villas</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">ARCHITECTURAL HEIGHT</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">60+ Sovereign Levels</span>
                      </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                      <button 
                        onClick={() => setViewState('shreya')}
                        className="flex-1 py-3 px-4 rounded-none bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-mono tracking-wider uppercase transition-colors text-center cursor-pointer"
                      >
                        Explore Project Detail
                      </button>
                      <button 
                        onClick={() => handleOpenBooking('shreya')}
                        className="py-3 px-5 rounded-none border border-slate-900 hover:bg-slate-950 hover:text-white text-slate-900 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Santosh Apartment (The Elegant Side Card - 5 Cols) */}
                <div className="lg:col-span-5 group rounded-none overflow-hidden bg-white border border-slate-200 hover:border-slate-900 transition-all duration-500 flex flex-col justify-between relative ambient-glow">
                  
                  {/* Image */}
                  <div className="relative h-60 sm:h-72 lg:h-80 w-full overflow-hidden">
                    <img 
                      referrerPolicy="no-referrer"
                      src={projects[1].heroImage} 
                      alt={projects[1].heroAlt} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none border border-white/25">
                      Completed • Ready
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-300 font-mono font-bold">₹ 14.5 CR ONWARDS</p>
                        <h3 className="text-2xl font-display font-semibold text-white mt-0.5">{projects[1].name}</h3>
                      </div>
                      <span className="p-2 rounded-none bg-white/10 text-white hover:bg-slate-900 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {projects[1].description} Premium architectural masterwork with private elevators and vast column-free interior floor configurations.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">STATUS</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">Ready to Move</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">TOTAL AREA</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">4,200 Sq. Ft.</span>
                      </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                      <button 
                        onClick={() => setViewState('santosh')}
                        className="flex-1 py-3 px-4 rounded-none bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-mono tracking-wider uppercase transition-colors text-center cursor-pointer"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => handleOpenBooking('santosh')}
                        className="py-3 px-5 rounded-none border border-slate-900 hover:bg-slate-950 hover:text-white text-slate-900 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        Callback
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Nirmala Commercial (Horizontal Card at Bottom - 12 Cols) */}
                <div className="lg:col-span-12 group rounded-none overflow-hidden bg-white border border-slate-200 hover:border-slate-900 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 items-stretch ambient-glow">
                  
                  {/* Image side */}
                  <div className="md:col-span-5 relative min-h-[240px] md:min-h-[340px] overflow-hidden">
                    <img 
                      referrerPolicy="no-referrer"
                      src={projects[2].heroImage} 
                      alt={projects[2].heroAlt} 
                      className="w-full h-full object-cover absolute inset-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 bg-blue-100 text-blue-850 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none border border-blue-200">
                      Corporate Grade A
                    </div>
                  </div>

                  {/* Detail side */}
                  <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Sovereign Commercial Address</span>
                      </div>
                      
                      <h3 className="text-3xl font-display font-semibold text-slate-900 tracking-tight">
                        {projects[2].name}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed font-light max-w-xl">
                        {projects[2].longDescription} Located at a premier financial intersection in Mumbai, offering robotic parking grids, intelligent environment controllers, and grand double-height executive lounges.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs font-mono mt-6">
                      <div>
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">DEVELOPMENT SIZE</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">450K Sq. Ft.</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">POSSESSION</span>
                        <span className="text-slate-900 font-bold mt-0.5 block">Year 2026</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-slate-400 block text-[9px] tracking-wider uppercase">ELEVATORS</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">12 High-Speed Smart</span>
                      </div>
                    </div>

                    <div className="pt-8 flex flex-wrap gap-4">
                      <button 
                        onClick={() => setViewState('nirmala')}
                        className="py-3 px-6 rounded-none bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-mono tracking-wider uppercase transition-colors text-center cursor-pointer"
                      >
                        Explore Commercial Layout
                      </button>
                      <button 
                        onClick={() => handleOpenBooking('nirmala')}
                        className="py-3 px-6 rounded-none bg-slate-900 text-white hover:bg-slate-800 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>


            {/* SAVED LANDMARKS SEED SECTION (THE LEGACY HIGHLIGHT) */}
            <section className="bg-slate-100/60 py-20 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-mono font-bold block">Bespoke Heritage</span>
                    <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight">
                      Crafting Absolute <span className="font-semibold">Quality Since 1989</span>
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">
                      Arihant Builders &amp; Developers was founded with a singular conviction: to construct residences that endure for generations. From structural integrity assessments exceeding national mandates to hand-selecting the finest marble from the hills of Carrara, we maintain non-negotiable standards of luxury.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-5 h-5 rounded-none bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-900">
                          <Check className="w-3 h-3 text-slate-900" />
                        </div>
                        <span className="text-xs font-mono tracking-wider text-slate-700 font-medium">3-tier high-density pile foundations</span>
                      </div>
                      <div className="flex items-center gap-3.5">
                        <div className="w-5 h-5 rounded-none bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-900">
                          <Check className="w-3 h-3 text-slate-900" />
                        </div>
                        <span className="text-xs font-mono tracking-wider text-slate-700 font-medium">Premium architectural bronze windows</span>
                      </div>
                      <div className="flex items-center gap-3.5">
                        <div className="w-5 h-5 rounded-none bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-900">
                          <Check className="w-3 h-3 text-slate-900" />
                        </div>
                        <span className="text-xs font-mono tracking-wider text-slate-700 font-medium">Zero delayed possession timeline delivery</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setViewState('about')}
                        className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-slate-900 uppercase hover:text-slate-700 transition-colors font-bold cursor-pointer"
                      >
                        <span>Learn About Our Principles</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="rounded-none overflow-hidden h-48 border border-slate-200 relative shadow-sm">
                        <img 
                          referrerPolicy="no-referrer"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChIlMGinXZ7K1ZXfRBclP70HIwIYVt2r714vrNPC9iRKGWXbPr3QBKR7fQcEa1-mJK3WflHaVQnfR1hnMhBLVfsGyVmUKtl26bmWkLWtRrse5ovXcwklAr61rpgsY9LvmQ70PX8bclYC-Iv8Mn6ciF3g2oHwGs6ZKLEU6GkhkCCeRNR8uV9GwhF5atG8O5JCP3PcVlFvPq7jm0LY9ImM3aG4VUQv1HvX9QpR4nmj2R8symL52W0vCkDj59S3lb1l3PuKv6Jv490dsj" 
                          alt="Luxury Infinity Edge Pool View" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/10" />
                      </div>
                      <div className="rounded-none overflow-hidden h-64 border border-slate-200 relative shadow-sm">
                        <img 
                          referrerPolicy="no-referrer"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQoV07-mncDAYw0VfDByrUtW8zgpj4m7FtOV4Hfcr0Nq-uzVrdgdiAWBv4LxXfpbP040sMg0an_tKrfVIkHnRskobqizIYEA6IwXrqs3oB8f1wj598ha2FR8Cwv2J0ONC0I_cy0uQzw8tuCvGpwPhw2AZBy_1W_DzE7ORYo8cTy9Il2cTBjWo5KtYKuhKM6bKEsrsTKkpCxMpipEAiPDVMhldMgcWg4l0kHWS23T-lnzOBWakDaC374uI73IgcgyTSyPZMkZC8yXvk" 
                          alt="Exclusive Wellness Club Gym" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/10" />
                      </div>
                    </div>

                    <div className="space-y-4 pt-8">
                      <div className="rounded-none overflow-hidden h-64 border border-slate-200 relative shadow-sm">
                        <img 
                          referrerPolicy="no-referrer"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeLgEQK4Y__o652HjCN60mHuXcEvnoZ0q7SSvRfwxe95V3enAx0M_7mxoJ44oXhUT248KywhhLzLEiqeExJfJHL4OHbRr8pB_Hl5MzvYxeWs2b5fCXwr-cv0izYRzn2f5wBcLIY4tMzqIPULKtQTfX7FZoO7W58C2-6AuTjKr-_IVQ6rhOm43Y0GW1okPiRh-28XQ5kMuM7BGC4YIYEAf4FzoZ44omGhnNHw9i5bADDcu2ggoof14GHn74gHP6exiFRXDj3SCzX0Oj" 
                          alt="Deluxe Suite Bath Design" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/10" />
                      </div>
                      <div className="rounded-none overflow-hidden h-48 border border-slate-200 relative shadow-sm">
                        <img 
                          referrerPolicy="no-referrer"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBMWqSqvjCo7MSlsnrBA9EQWbTJHjaLDaXvDejr93R95L36zoXTTDymJUU0TbssWMeZkxplgKnnATiPJDpXgK9-pDhRxn2NICA5wilSqZLg3tyhE7mpHxO56owe62ns-9e3cyUAlTFmrQSCPQM6DxDx3f0hI5919hRoj8giez7WGJEw0x0P_F9vIHNoPy4xc3FEi3NbfwFXwPsjcHY_psritj01k84g0B6Bya6mDiy_6cPUQcmc-aMyNGCQHT9p56ilPhZUdEx89m4" 
                          alt="Exquisite Facade Detail" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* THE RELATIONSHIP & LEAD INQUIRY BLOCK */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="rounded-none overflow-hidden border border-slate-200 relative p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 bg-white shadow-sm">
                <div className="flex-1 space-y-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-mono font-bold block">Private Registry</span>
                  <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight">
                    Begin Your Private Consultation
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg font-light">
                    Register with our Private Registry desk to receive exclusive off-market brochures, architectural floor plans, and priority invitations to upcoming developments.
                  </p>
                  
                  <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-900" />
                      <span className="text-slate-600 font-medium">sales@arihantbuilders.in</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-900" />
                      <span className="text-slate-600 font-medium">+91 22 4920 0000</span>
                    </div>
                  </div>
                </div>

                {/* Inline form card */}
                <div className="w-full max-w-md p-6 sm:p-8 rounded-none border border-slate-200 bg-slate-50 relative z-10">
                  {inquirySubmitted === 'general' ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-12 h-12 rounded-none bg-slate-200 border border-slate-300 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 text-slate-900" />
                      </div>
                      <h4 className="text-lg font-display text-slate-900 font-bold">Registry Complete</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        An executive relation counselor will prepare your personalized information package and contact you within 2 business hours.
                      </p>
                      <button 
                        onClick={() => setInquirySubmitted(null)}
                        className="py-1.5 px-4 rounded-none border border-slate-300 text-[10px] text-slate-600 font-mono hover:text-slate-900 hover:border-slate-400 cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleInquirySubmit(e, 'general')} className="space-y-5">
                      <h4 className="text-sm font-mono uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 font-bold animate-fade-in">
                        Registry Request
                      </h4>
                      
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          required 
                          placeholder="Your Full Name" 
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full ghost-input text-xs" 
                        />
                        <input 
                          type="email" 
                          required 
                          placeholder="Your Email Address" 
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full ghost-input text-xs" 
                        />
                        <input 
                          type="tel" 
                          required 
                          placeholder="Phone Number" 
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full ghost-input text-xs" 
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 rounded-none bg-slate-900 text-white font-mono tracking-widest uppercase text-xs hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Submit General Enquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>

          </div>
        )}


        {/* 2. DYNAMIC PROJECT DETAIL SCREEN (SHREYA, SANTOSH, NIRMALA) */}
        {activeProject && (
          <div className="space-y-24 pb-20">
            
            {/* HERO BANNER */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end pb-12 overflow-hidden border-b border-slate-200">
              <div className="absolute inset-0 z-0">
                <img 
                  referrerPolicy="no-referrer"
                  src={activeProject.heroImage} 
                  alt={activeProject.heroAlt} 
                  className="w-full h-full object-cover scale-100"
                />
                {/* Modern light/dark gradient blends */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/10 to-transparent opacity-60" />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
                <div className="max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-white/20 border border-white/30 text-xs font-mono text-white">
                    <span>{activeProject.statusLabel}</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-white tracking-tight">
                    {activeProject.name}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-200 max-w-xl font-light">
                    {activeProject.tagline}
                  </p>

                  <div className="flex items-start gap-2 text-xs text-slate-300 font-mono max-w-2xl bg-black/40 backdrop-blur-md p-3 border border-white/10">
                    <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{activeProject.address}</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => handleOpenBooking(activeProject.id)}
                      className="py-3 px-6 rounded-none bg-white text-slate-900 text-xs font-mono uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer font-bold shadow"
                    >
                      <span>Book Viewing Tour</span>
                      <Compass className="w-3.5 h-3.5" />
                    </button>
                    
                    <span className="text-xs font-mono text-slate-300 font-bold bg-slate-900/40 px-3 py-1.5 border border-white/10">
                      PRICE RANGE: {activeProject.price}
                    </span>
                  </div>
                </div>
              </div>
            </section>


            {/* INTRODUCTORY & HIGH-END SPECIFICATIONS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Copy blocks */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] w-6 bg-slate-900" />
                    <span className="text-xs uppercase tracking-widest text-slate-900 font-mono font-bold">Project Blueprint</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-slate-900 tracking-tight">
                    Architectural Excellence, <span className="font-semibold">Realized.</span>
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    {activeProject.longDescription}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    Our structures incorporate seismic-resistant designs, smart centralized HVAC management grids with medical-grade air filtration, soundproof double-glazed visual bays, and highly customizable internal floor layouts that accommodate varying architectural layouts.
                  </p>
                </div>

                {/* Technical Specs Bento Grid */}
                <div className="lg:col-span-5 rounded-none bg-white border border-slate-200 p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-slate-500 border-b border-slate-100 pb-2.5 font-bold">
                    KEY PARAMETERS
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    {activeProject.specifications.map((spec) => (
                      <div key={spec.label} className="space-y-1">
                        <span className="text-[9px] font-mono tracking-widest text-slate-400 block uppercase">
                          {spec.label}
                        </span>
                        <span className="text-sm font-semibold text-slate-900 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <button 
                      onClick={() => handleOpenBooking(activeProject.id)}
                      className="w-full py-2.5 rounded-none border border-slate-900 hover:bg-slate-900 hover:text-white text-xs font-mono tracking-widest uppercase text-slate-900 transition-all text-center cursor-pointer font-bold"
                    >
                      REQUEST TECHNICAL BLUEPRINT
                    </button>
                  </div>
                </div>

              </div>
            </section>


            {/* RESIDENCE TYPOLOGIES & CONFIGURATIONS */}
            {activeProject.flatConfigurations && activeProject.flatConfigurations.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-bold">PREMIUM LIVING VOLUMES</span>
                      <h2 className="text-3xl font-display font-light text-slate-900 tracking-tight">
                        Residence <span className="font-semibold">Configurations</span>
                      </h2>
                      <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                        Thoughtfully engineered residences crafted to maximize carpet efficiency, cross-ventilation, and physical structural integrity.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1.5 flex-shrink-0 self-start md:self-auto">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available for On-site Bookings</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {activeProject.flatConfigurations.map((flat) => (
                      <div 
                        key={flat.typology} 
                        className="border border-slate-200 bg-white hover:border-slate-950 hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-6 relative group"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div>
                              <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                                {flat.typology}
                              </h3>
                              <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
                                ARCHITECTURAL LAYOUT
                              </p>
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase bg-slate-900 text-white px-2.5 py-1">
                              {flat.carpetArea}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                              Included Specifications
                            </span>
                            <ul className="space-y-2.5">
                              {flat.features.map((feature, i) => (
                                <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                                  <span className="text-slate-900 flex-shrink-0 font-bold text-xs mt-0.5">✓</span>
                                  <span className="font-light leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                              ESTIMATED VALUE
                            </span>
                            <span className="text-sm font-semibold text-slate-900 font-mono tracking-tight block mt-0.5">
                              {flat.price}
                            </span>
                          </div>
                          <button
                            onClick={() => handleOpenBooking(activeProject.id)}
                            className="py-2 px-3.5 bg-slate-900 hover:bg-slate-850 text-white font-mono text-[10px] tracking-widest uppercase transition-all cursor-pointer font-bold animate-fade-in"
                          >
                            REQUEST DETAILS
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}


            {/* PREMIUM AMENITIES IN FOCUS */}
            <section className="bg-slate-100/60 py-20 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-bold">Curated Indulgences</span>
                  <h2 className="text-3xl font-display font-light text-slate-900 tracking-tight">
                    Sovereign <span className="font-semibold">Comfort Elements</span>
                  </h2>
                </div>

                {/* Premium Amenity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeProject.amenities.map((am) => (
                    <div 
                      key={am.title} 
                      className="p-6 rounded-none border border-slate-250 bg-white hover:border-slate-900 transition-colors flex flex-col justify-between min-h-[220px] shadow-sm"
                    >
                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                          <span className="material-symbols-outlined text-lg">{am.icon}</span>
                        </div>
                        <h3 className="text-base font-display font-bold text-slate-900">{am.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">{am.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            {/* IMMERSIVE LIGHTBOX GALLERY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-bold">Visual Portfolio</span>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-slate-900 tracking-tight">
                    Exquisite Spaces <span className="font-semibold">Captured</span>
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  CLICK TO VIEW FULLSCREEN LIGHTBOX
                </span>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeProject.gallery.map((item, idx) => (
                  <button
                    key={item.url}
                    onClick={() => {
                      setLightboxProject(activeProject.id);
                      setLightboxActiveIndex(idx);
                    }}
                    className="group relative rounded-none overflow-hidden aspect-[4/3] border border-slate-200 bg-white text-left block w-full shadow-sm cursor-pointer"
                  >
                    <img 
                      referrerPolicy="no-referrer"
                      src={item.url} 
                      alt={item.alt} 
                      className="w-full h-full object-cover transition-all duration-750 group-hover:scale-105"
                    />
                    
                    {/* Visual Overlay elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-all" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-white/95 bg-slate-900/60 px-1.5 py-0.5 uppercase block">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-display text-white font-medium mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                      <span className="p-1.5 rounded-none bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>


            {/* LOCATION EXPLORER & MAP */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MapExplorer pois={activeProject.locationPOI} mapImage={activeProject.mapImage} />
            </section>


            {/* CONNECTIVITY HUB */}
            {activeProject.connectivity && activeProject.connectivity.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-bold">METROPOLITAN COMMUTE HUB</span>
                    <h2 className="text-3xl font-display font-light text-slate-900 tracking-tight">
                      Transit &amp; <span className="font-semibold">Connectivity Infrastructure</span>
                    </h2>
                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      Strategically located with multiple access highways, railway junctions, and direct access to major healthcare, retail, and education hubs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Transit */}
                    <div className="border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Compass className="w-4 h-4 text-slate-900" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">Rail &amp; Metro Transit</h3>
                      </div>
                      <ul className="space-y-3 text-xs">
                        {activeProject.connectivity
                          .filter(item => item.type === 'transit')
                          .map((item, idx) => (
                            <li key={idx} className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2 last:border-none last:pb-0">
                              <span className="text-slate-600 font-light">{item.destination}</span>
                              <div className="text-right flex-shrink-0 font-mono font-bold text-slate-900 text-[10px]">
                                <div>{item.time}</div>
                                {item.distance && <div className="text-[9px] text-slate-400 font-light">{item.distance}</div>}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Healthcare */}
                    <div className="border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Activity className="w-4 h-4 text-slate-900" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">Emergency &amp; Medical</h3>
                      </div>
                      <ul className="space-y-3 text-xs">
                        {activeProject.connectivity
                          .filter(item => item.type === 'healthcare')
                          .map((item, idx) => (
                            <li key={idx} className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2 last:border-none last:pb-0">
                              <span className="text-slate-600 font-light">{item.destination}</span>
                              <div className="text-right flex-shrink-0 font-mono font-bold text-slate-900 text-[10px]">
                                <div>{item.time}</div>
                                {item.distance && <div className="text-[9px] text-slate-400 font-light">{item.distance}</div>}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Education */}
                    <div className="border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <School className="w-4 h-4 text-slate-900" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">Institutions &amp; Schools</h3>
                      </div>
                      <ul className="space-y-3 text-xs">
                        {activeProject.connectivity
                          .filter(item => item.type === 'education')
                          .map((item, idx) => (
                            <li key={idx} className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2 last:border-none last:pb-0">
                              <span className="text-slate-600 font-light">{item.destination}</span>
                              <div className="text-right flex-shrink-0 font-mono font-bold text-slate-900 text-[10px]">
                                <div>{item.time}</div>
                                {item.distance && <div className="text-[9px] text-slate-400 font-light">{item.distance}</div>}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Lifestyle */}
                    <div className="border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <ShoppingBag className="w-4 h-4 text-slate-900" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">Lifestyle &amp; Retail</h3>
                      </div>
                      <ul className="space-y-3 text-xs">
                        {activeProject.connectivity
                          .filter(item => item.type === 'lifestyle')
                          .map((item, idx) => (
                            <li key={idx} className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2 last:border-none last:pb-0">
                              <span className="text-slate-600 font-light">{item.destination}</span>
                              <div className="text-right flex-shrink-0 font-mono font-bold text-slate-900 text-[10px]">
                                <div>{item.time}</div>
                                {item.distance && <div className="text-[9px] text-slate-400 font-light">{item.distance}</div>}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )}


            {/* INDIVIDUAL BROCHURE OR INQUIRY FORM */}
            <section className="max-w-3xl mx-auto px-4">
              <div className="rounded-none border border-slate-200 bg-white p-6 md:p-10 relative shadow-sm">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-slate-900" />
                
                {inquirySubmitted === activeProject.id ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7 text-slate-900" />
                    </div>
                    <h3 className="text-xl font-display text-slate-900 font-bold">Registry complete</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      Thank you. We have received your inquiry for <span className="text-slate-950 font-semibold">{activeProject.name}</span>. A private relationship advisor will transmit the portfolio files to <span className="text-slate-900 font-mono font-semibold">{inquiryEmail || 'your email'}</span> shortly.
                    </p>
                    <button 
                      onClick={() => setInquirySubmitted(null)}
                      className="mt-4 text-xs font-mono text-slate-900 hover:text-slate-700 underline transition-colors cursor-pointer font-bold"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleInquirySubmit(e, activeProject.id)} className="space-y-6">
                    <div className="text-center space-y-1">
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold">Secured Register</span>
                      <h3 className="text-xl font-display font-light text-slate-900">
                        {activeProject.formType === 'brochure' && 'Download Digital Brochure'}
                        {activeProject.formType === 'callback' && 'Request Immediate Callback'}
                        {activeProject.formType === 'inquiry' && 'Submit Formal Investment Enquiry'}
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Kindly provide credentials to authenticate access to project specifications.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          required 
                          placeholder="Your Name" 
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full ghost-input text-xs" 
                        />
                        <input 
                          type="tel" 
                          required 
                          placeholder="Phone Number" 
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full ghost-input text-xs" 
                        />
                      </div>
                      <input 
                        type="email" 
                        required 
                        placeholder="Private Email Address" 
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full ghost-input text-xs" 
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 rounded-none bg-slate-900 text-white text-xs font-mono tracking-widest uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {activeProject.formType === 'brochure' && (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Request Brochure Files</span>
                        </>
                      )}
                      {activeProject.formType === 'callback' && (
                        <>
                          <Phone className="w-4 h-4" />
                          <span>Request Private Call</span>
                        </>
                      )}
                      {activeProject.formType === 'inquiry' && (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Submit Formal Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </section>

          </div>
        )}


        {/* 3. ABOUT SCREEN (PEDIGREE) */}
        {viewState === 'about' && (
          <div className="space-y-24 py-16">
            
            {/* Header statement */}
            <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono font-bold block">Our History</span>
              <h1 className="text-4xl sm:text-5xl font-display font-light text-slate-900 tracking-tight">
                Architecting Trust with <span className="font-semibold">Uncompromising Rigor</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
                Since 1989, Arihant Builders &amp; Developers has been crafting structural masterworks across Mumbai. Our ethos is simple: avoid superficial trends, utilize materials that outperform legal parameters, and deliver absolute aesthetic permanence.
              </p>
            </section>

            {/* Values Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="p-8 rounded-none border border-slate-200 bg-white space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display text-slate-900 font-bold">Structural Integrity First</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Every tower features concrete grades exceeding national code standards by up to 30%, anchored deep into Mumbai bedrock with high-density premium pile grids.
                  </p>
                </div>

                <div className="p-8 rounded-none border border-slate-200 bg-white space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display text-slate-900 font-bold">Spatial Intelligence</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    We employ column-free floor plate layouts, enabling homeowners and commercial entities to construct custom architectural layouts with complete freedom.
                  </p>
                </div>

                <div className="p-8 rounded-none border border-slate-200 bg-white space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display text-slate-900 font-bold">Possession Certainty</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Throughout our history, every project has been delivered within its designated timeline, backed by robust liquidity structures and meticulous management.
                  </p>
                </div>

              </div>
            </section>

            {/* Master builder quote */}
            <section className="max-w-4xl mx-auto px-4 text-center">
              <div className="p-8 md:p-12 rounded-none border border-slate-200 bg-slate-150 relative">
                <span className="text-5xl font-display text-slate-300 absolute top-4 left-6">“</span>
                <p className="text-lg md:text-xl font-display italic text-slate-800 leading-relaxed relative z-10 font-light">
                  We don't merely assemble materials. We curate visual and emotional environments. The texture of Carrara marble, the acoustic damping of our partitions, and the alignment of our sightlines are deliberate actions aimed at excellence.
                </p>
                <div className="mt-6">
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-900 font-semibold">Arihant Leadership Council</p>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Arihant Builders &amp; Developers</p>
                </div>
              </div>
            </section>

          </div>
        )}


        {/* 4. LEGACY SCREEN (TIMELINE) */}
        {viewState === 'legacy' && (
          <div className="space-y-16 py-16 max-w-4xl mx-auto px-4">
            
            <div className="text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-bold">Timeline</span>
              <h1 className="text-3xl sm:text-4xl font-display font-light text-slate-900 tracking-tight">
                Our Landmark <span className="font-semibold">Timeline</span>
              </h1>
              <p className="text-sm text-slate-500 max-w-lg mx-auto font-light leading-relaxed">
                Celebrating over three decades of engineering masterpieces that have stood as landmarks across the Mumbai cityscape.
              </p>
            </div>

            {/* Timeline vertical elements */}
            <div className="relative border-l border-slate-300 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">
              
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-none bg-slate-900 border-4 border-[#F8FAFC] shadow" />
                <span className="text-xs font-mono font-bold text-slate-500">2026 • THE FUTURE</span>
                <h3 className="text-lg font-display text-slate-900 mt-1 font-semibold">Nirmala Commercial Launch</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                  Our premier Commercial Grade A estate, bringing intelligent workspace volumes and a robotic parking framework online.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-none bg-slate-900 border-4 border-[#F8FAFC] shadow" />
                <span className="text-xs font-mono font-bold text-slate-500">2023 • ACTIVE</span>
                <h3 className="text-lg font-display text-slate-900 mt-1 font-semibold">Shreya Flagship Blueprint Execution</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                  Commencement of the 60+ level tower landmark, designed to host customized sky-villas with expansive double-height interiors.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-none bg-slate-400 border-4 border-[#F8FAFC] shadow" />
                <span className="text-xs font-mono font-bold text-slate-400">2019 • LANDMARK</span>
                <h3 className="text-lg font-display text-slate-800 mt-1 font-semibold">Santosh Apartment Delivery</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                  Delivered ready possession of our iconic boutique luxury residency, featuring private lift lobbies and marble facades.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-none bg-slate-400 border-4 border-[#F8FAFC] shadow" />
                <span className="text-xs font-mono font-bold text-slate-400">2010 • EXPANSION</span>
                <h3 className="text-lg font-display text-slate-800 mt-1 font-semibold">Arihant Heritage Tower</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                  Completed our premier gated tower community in Mumbai, housing over 400 families with extensive garden landscapes.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-none bg-slate-300 border-4 border-[#F8FAFC] shadow" />
                <span className="text-xs font-mono font-bold text-slate-400">1989 • THE FOUNDATION</span>
                <h3 className="text-lg font-display text-slate-800 mt-1 font-semibold">Establishment &amp; First Gated Plot</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                  Arihant Builders &amp; Developers commenced operations in Mumbai with a commitment to unyielding structural quality and premium workmanship.
                </p>
              </div>

            </div>

            <div className="p-6 rounded-none border border-slate-200 bg-white text-center text-xs font-mono text-slate-400 shadow-sm">
              Ongoing projects authenticated under RERA guidelines. All credentials can be inspected upon request.
            </div>

          </div>
        )}

        {/* 5. SECURED REGISTRY DESK (ADMIN) */}
        {viewState === 'admin' && (
          <AdminPortal onClose={() => setViewState('home')} />
        )}

      </main>


      {/* FOOTER BAR BRAND SUMMARY */}
      <footer className="border-t border-slate-200 bg-white py-12 md:py-16 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <div>
              <span className="font-display text-lg tracking-[0.25em] text-slate-900 font-bold leading-none block">ARIHANT</span>
              <span className="text-[8px] tracking-[0.3em] text-slate-500 block uppercase mt-1 font-bold">BUILDERS &amp; DEVELOPERS</span>
            </div>
            <p className="max-w-sm font-light text-slate-400 leading-relaxed">
              Shaping Mumbai's skyline with uncompromising quality, quiet luxury, and timeless design. Celebrating decades of architectural grandeur.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] text-slate-900 uppercase tracking-widest font-bold">PRESTIGIOUS DEVELOPMENTS</h4>
            <ul className="space-y-2 font-mono">
              <li><button onClick={() => setViewState('shreya')} className="hover:text-slate-900 transition-colors text-left text-xs cursor-pointer">Shreya Flagship</button></li>
              <li><button onClick={() => setViewState('santosh')} className="hover:text-slate-900 transition-colors text-left text-xs cursor-pointer">Santosh Apartment</button></li>
              <li><button onClick={() => setViewState('nirmala')} className="hover:text-slate-900 transition-colors text-left text-xs cursor-pointer">Nirmala Commercial</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] text-slate-900 uppercase tracking-widest font-bold">THE PEDIGREE</h4>
            <ul className="space-y-2 font-mono">
              <li><button onClick={() => setViewState('about')} className="hover:text-slate-900 transition-colors text-xs cursor-pointer">Architectural Ethos</button></li>
              <li><button onClick={() => setViewState('legacy')} className="hover:text-slate-900 transition-colors text-xs cursor-pointer">Historical Timeline</button></li>
              <li><button onClick={() => handleOpenBooking('shreya')} className="hover:text-slate-900 transition-colors text-xs cursor-pointer">Private Viewings</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-[10px] text-slate-900 uppercase tracking-widest font-bold">SALES CONTACT</h4>
            <ul className="space-y-2 font-mono text-slate-400">
              <li>+91 22 4920 0000</li>
              <li className="text-slate-900 font-bold">sales@arihantbuilders.in</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-400">
          <p>© {new Date().getFullYear()} ARIHANT BUILDERS &amp; DEVELOPERS. ALL RIGHTS RESERVED.</p>
          <p className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
            <span>MUMBAI, INDIA •</span>
            <button 
              onClick={() => setViewState('admin')} 
              className="hover:text-slate-900 transition-colors uppercase font-bold underline flex items-center gap-1 cursor-pointer"
            >
              Secure Registry Console
            </button>
          </p>
        </div>
      </footer>


      {/* GLOBAL BOOKING MODAL */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialProjectId={bookingProjectId}
      />


      {/* GLOBAL GALLERY LIGHTBOX */}
      {lightboxActiveIndex !== null && (
        <Lightbox 
          items={projects.find(p => p.id === lightboxProject)?.gallery || []}
          activeIndex={lightboxActiveIndex}
          onClose={() => setLightboxActiveIndex(null)}
          onNavigate={(idx) => setLightboxActiveIndex(idx)}
        />
      )}

    </div>
  );
}
