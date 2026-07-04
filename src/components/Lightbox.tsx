/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ items, activeIndex, onClose, onNavigate }) => {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  if (activeIndex === null) return null;

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % items.length;
    onNavigate(nextIndex);
  };

  const currentItem = items[activeIndex];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-slate-950/98 p-4 md:p-8 animate-fade-in select-none">
      {/* Upper bar */}
      <div className="flex items-center justify-between text-slate-400 text-xs font-mono z-10 py-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold tracking-widest text-[10px]">GALLERY</span>
          <span>•</span>
          <span className="uppercase tracking-widest text-slate-300 text-[10px]">{currentItem.category}</span>
          <span>•</span>
          <span className="text-[10px]">{activeIndex + 1} OF {items.length}</span>
        </div>
        
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors py-1.5 px-4 rounded-none border border-slate-700 hover:border-white bg-slate-900/60 cursor-pointer"
        >
          <span className="uppercase tracking-widest text-[9px] font-bold">Close ESC</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center py-4">
        {/* Navigation arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-none border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white transition-all flex items-center justify-center active:translate-y-[1px] cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Image Wrapper */}
        <div className="relative max-w-5xl max-h-[75vh] md:max-h-[80vh] w-full h-full flex flex-col justify-center items-center px-6 md:px-12">
          <img
            referrerPolicy="no-referrer"
            src={currentItem.url}
            alt={currentItem.alt}
            className="object-contain max-w-full max-h-full rounded-none shadow-2xl animate-fade-in border border-slate-800"
          />
        </div>

        {/* Navigation arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-none border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white transition-all flex items-center justify-center active:translate-y-[1px] cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer bar detailing current selection */}
      <div className="max-w-xl mx-auto text-center space-y-2 z-10 py-4">
        <h4 className="text-lg font-display text-white tracking-tight font-light">
          {currentItem.title}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed font-sans px-4 font-light">
          {currentItem.alt}
        </p>
      </div>
    </div>
  );
};
