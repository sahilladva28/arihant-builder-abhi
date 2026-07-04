/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Map, Compass } from 'lucide-react';
import { LocationPOI } from '../types';

interface MapExplorerProps {
  pois: LocationPOI[];
  mapImage: string;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ pois, mapImage }) => {
  const [activePoiIndex, setActivePoiIndex] = useState(0);

  // Position coordinates on the map mockup corresponding to index
  const coordinates = [
    { top: '35%', left: '42%' },
    { top: '55%', left: '68%' },
    { top: '22%', left: '20%' },
    { top: '65%', left: '30%' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Map visual showcase */}
      <div className="lg:col-span-7 rounded-none overflow-hidden relative border border-slate-200 bg-slate-50 min-h-[300px] md:min-h-[420px] flex items-center justify-center">
        {/* Subtle background coordinate grid lines for that bespoke layout aesthetic */}
        <div className="absolute inset-0 bg-radial-gradient from-slate-900/[0.03] via-transparent to-transparent opacity-40 pointer-events-none" />
        
        {/* Real Location Image or Plot Overlay */}
        <img
          referrerPolicy="no-referrer"
          src={mapImage}
          alt="Neighborhood Location Map Plan"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        {/* Ambient overlay vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Project Centered Target Indicator */}
        <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
          <div className="relative">
            <span className="absolute inline-flex h-12 w-12 rounded-none bg-slate-900/10 animate-ping opacity-75" />
            <div className="relative w-6 h-6 rounded-none bg-slate-900 border-4 border-white flex items-center justify-center shadow-lg">
              <span className="w-1.5 h-1.5 rounded-none bg-white" />
            </div>
          </div>
          <span className="mt-1 block text-[9px] font-mono tracking-widest text-white font-bold uppercase bg-slate-900 px-2 py-0.5 rounded-none border border-slate-700">
            ARIHANT SITE
          </span>
        </div>

        {/* POI Hotspots */}
        {pois.map((poi, idx) => {
          const coord = coordinates[idx % coordinates.length];
          const isActive = idx === activePoiIndex;
          return (
            <button
              key={poi.name}
              onClick={() => setActivePoiIndex(idx)}
              style={{ top: coord.top, left: coord.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex flex-col items-center group z-10 cursor-pointer"
            >
              <div className={`relative p-2 rounded-none transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white scale-110 shadow-lg border border-slate-950 ring-4 ring-slate-900/10' 
                  : 'bg-white text-slate-700 hover:bg-slate-900 hover:text-white border border-slate-200 hover:scale-105'
              }`}>
                <MapPin className="w-4 h-4" />
              </div>
              
              {/* Tooltip on hover or when active */}
              <div className={`mt-1.5 px-2 py-1 rounded-none border transition-all ${
                isActive 
                  ? 'border-slate-300 bg-white/95 text-slate-900 shadow opacity-100 scale-100' 
                  : 'border-slate-200 bg-white/90 text-slate-700 opacity-0 group-hover:opacity-100 scale-95 pointer-events-none'
              }`}>
                <span className="text-[9px] font-mono tracking-wider font-bold whitespace-nowrap uppercase">
                  {poi.name} ({poi.distance})
                </span>
              </div>
            </button>
          );
        })}

        {/* Dynamic Compass overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md py-1.5 px-2.5 rounded-none border border-slate-200 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-slate-900 animate-spin-slow" />
          <span className="text-[10px] font-mono tracking-wider text-slate-500 font-bold">MUMBAI CO-ORDS</span>
        </div>
      </div>

      {/* POI Sidebar Detail Controller */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold block">Location Advantages</span>
          </div>
          <h3 className="text-2xl font-display font-light text-slate-900 tracking-tight">Connected <span className="font-semibold">Neighborhood</span></h3>
          <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
            Situated at the nexus of elite commercial districts, premium transit nodes, and high-end cultural establishments.
          </p>
        </div>

        {/* Interactive list buttons */}
        <div className="space-y-3">
          {pois.map((poi, idx) => {
            const isActive = idx === activePoiIndex;
            return (
              <button
                key={poi.name}
                onClick={() => setActivePoiIndex(idx)}
                className={`w-full text-left p-3.5 rounded-none border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                  isActive 
                    ? 'border-slate-900 bg-slate-100 text-slate-900' 
                    : 'border-slate-200 bg-white hover:border-slate-400 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className={`p-2 rounded-none transition-all ${
                  isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-widest font-bold">{poi.name}</h4>
                    <span className="text-xs text-slate-900 font-mono font-bold">{poi.distance}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-light">{poi.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Travel Summary Accent */}
        <div className="p-4 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500 shadow-inner">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-slate-700" />
            <span className="font-semibold">Select points to map routing</span>
          </div>
          <span className="text-slate-900 font-bold">Active Hubs</span>
        </div>
      </div>
    </div>
  );
};
