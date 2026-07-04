/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'shreya',
    name: 'Shreya Apartment',
    tagline: 'THE APEX OF LUXURY RESIDENTIAL LIVING',
    description: 'A brilliant modern landmark rising above Kandivali West, meticulously designed to redefine urban luxury.',
    longDescription: 'Shreya Apartment is not merely a residence; it is an inheritance of architectural perfection. Designed for families who appreciate spaciousness and fine finishes, it integrates state-of-the-art automation with serene layouts. Located in the bustling yet peaceful pocket of Goraswadi, this high-rise stands as an icon of luxury, delivering panoramic city views and a private sanctuary away from the metropolitan hum.',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    heroAlt: 'High-quality architectural capture of the Shreya Apartment modern luxury high-rise tower',
    status: 'Ongoing',
    statusLabel: 'Ongoing Premium Residential',
    price: '₹ 1.25 Cr - ₹ 3.50 Cr',
    address: 'Shreya apartment, Malad, Adarsh Dugdhalaya, Goraswadi, Kandivali West, Mumbai, Maharashtra 400064',
    specifications: [
      { label: 'TYPOLOGY', value: '1, 2 & 3.5 BHK', icon: 'bedroom_parent' },
      { label: 'STATUS', value: 'Ongoing', icon: 'pending_actions' },
      { label: 'TOWER HEIGHT', value: 'Stilt + 22 Storeys', icon: 'layers' },
      { label: 'CARPET AREA', value: '480 - 1,350 SQ.FT', icon: 'square_foot' }
    ],
    flatConfigurations: [
      {
        typology: '1 BHK Executive',
        carpetArea: '480 Sq.Ft.',
        price: '₹ 1.25 Cr*',
        features: ['Vastu Compliant Layout', 'Full-Height French Windows', 'Dedicated Wardrobe Nooks', 'L-Shaped Dining Platform']
      },
      {
        typology: '2 BHK Luxury',
        carpetArea: '760 Sq.Ft.',
        price: '₹ 1.95 Cr*',
        features: ['Double Master Bedrooms', 'Premium Vitrified Tile Flooring', 'Dual Multi-utility Balconies', 'Modular Kitchen Ready']
      },
      {
        typology: '3.5 BHK Sovereign',
        carpetArea: '1,350 Sq.Ft.',
        price: '₹ 3.50 Cr*',
        features: ['Spacious 3 Bedrooms + Study Room', 'Opulent Italian Marble Flooring', 'Huge Sundeck with 180° Goraswadi Views', 'Integrated Alexa Smart Home Hub']
      }
    ],
    amenities: [
      {
        title: 'Multi-Level Smart Parking',
        description: 'High-speed automated puzzle tower parking ensuring absolute security for vehicles.',
        icon: 'local_parking'
      },
      {
        title: 'High-Performance Gym',
        description: 'Elite air-conditioned fitness suite equipped with premium cardio and strength machines.',
        icon: 'fitness_center'
      },
      {
        title: 'Continuous Power Backup',
        description: 'Uninterrupted 24/7 dual generator backup systems supporting both flats and common areas.',
        icon: 'bolt'
      },
      {
        title: '5-Tier Proactive Security',
        description: 'Integrated biometric card lobby entry, 24/7 CCTV surveillance, and intercom desk.',
        icon: 'security'
      },
      {
        title: 'Grand Entrance Lobby',
        description: 'Double-height designer arrival lobby embellished with Italian stone and velvet seating.',
        icon: 'domain'
      },
      {
        title: 'High-Speed Smart Elevators',
        description: 'Ultra-fast passenger lifts from leading global brands with automated fire evacuation return.',
        icon: 'elevator'
      },
      {
        title: 'Terrace Garden & Deck',
        description: 'Beautifully landscaped open-air rooftop zone featuring sky jogging paths and yoga zones.',
        icon: 'deck'
      },
      {
        title: 'Kids Safe Play Area',
        description: 'Cushioned soft-turf indoor and outdoor play courts for children with cognitive games.',
        icon: 'child_care'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
        alt: 'Elegant designer double-height living room inside Shreya Apartment',
        category: 'Interior',
        title: 'The Sovereign Living Space'
      },
      {
        url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
        alt: 'Bespoke bedroom setting with warm recessed lighting and wooden accents',
        category: 'Interior',
        title: 'Master Bed Chamber'
      },
      {
        url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop',
        alt: 'Stunning white marble bathroom layout with matte black designer fixtures',
        category: 'Interior',
        title: 'Premium En-Suite Bathroom'
      }
    ],
    locationPOI: [
      {
        name: 'Kandivali Railway Station',
        distance: '5 min drive (1.1 km)',
        icon: 'train',
        description: 'Provides lightning-fast rail connectivity to South Mumbai and Western Suburbs.'
      },
      {
        name: 'Western Express Highway',
        distance: '12 min drive (3.4 km)',
        icon: 'local_shipping',
        description: 'Swift arterial connectivity leading directly to central business districts and airports.'
      },
      {
        name: 'Link Road (Lalji Pada Junction)',
        distance: '2 min walk (400 m)',
        icon: 'add_road',
        description: 'Direct entry to Mumbai\'s main retail, commercial, and metro transport veins.'
      }
    ],
    connectivity: [
      { destination: 'Kandivali Railway Station', time: '5 mins', distance: '1.1 km', type: 'transit' },
      { destination: 'Link Road Metro Station', time: '3 mins', distance: '600 m', type: 'transit' },
      { destination: 'Western Express Highway', time: '12 mins', distance: '3.4 km', type: 'transit' },
      { destination: 'Ryan International School', time: '8 mins', distance: '2.1 km', type: 'education' },
      { destination: 'Zenith Multi-speciality Hospital', time: '4 mins', distance: '900 m', type: 'healthcare' },
      { destination: 'Infinity Mall Malad', time: '10 mins', distance: '2.5 km', type: 'lifestyle' }
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zwHr8F_yr3CQHndhk8XiUx-2hvtRVfszoAnwoAFA-dL9q1wzU7Qx6UdGstKNFVxHZ44rEtUntidfh4yrshyHnvmmavWzs51Mksyf1gK4Cxk9xNCp022UT1Kn6bAlu3kgpdgvCL1tbHGaSIhoK5D-0_S6j3A3P8WYnfMtlSrREUCQgaCl1qxF_vwDjttyYyWShm9ODIZRX1_G9YPUjE4bcv901I6HL19wUYtrU5-OrU5KgstrwJaX_yXmvq9Ey7RNc3eqYrOBiOJw',
    formType: 'brochure'
  },
  {
    id: 'santosh',
    name: 'Santosh Apartment',
    tagline: 'A MODERN FAMILY SANCTUARY IN MALAD WEST',
    description: 'An outstanding architectural sanctuary in Malad West, providing serene modern flats with direct connectivity.',
    longDescription: 'Conceived as an premium residential escape for urban families, Santosh Apartment stands tall at Nadiyawala Colony 2 in Malad West. Each flat represents a flawless integration of space, daylight, and robust concrete build quality. Featuring high-ceiling structures, private elevator lobbies, and immediate proximity to the Western Express Highway and S.V. Road, this property represents the finest balance of domestic tranquility and metropolitan convenience.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    heroAlt: 'The high-quality modern front facade of Santosh Apartment in Malad West',
    status: 'Completed',
    statusLabel: 'Completed Ready to Move',
    price: '₹ 1.15 Cr - ₹ 3.10 Cr',
    address: '5RJW+2HJ, Malad, Nadiyawala Colony 2, Malad West, Mumbai, Maharashtra 400064',
    specifications: [
      { label: 'TYPOLOGY', value: '1, 2 & 3.5 BHK', icon: 'bedroom_parent' },
      { label: 'STRUCTURE', value: 'Seismic Resistant RCC', icon: 'architecture' },
      { label: 'STATUS', value: 'Ready Possession', icon: 'check_circle' },
      { label: 'TOTAL FLATS', value: 'Limited 42 Residences', icon: 'home' }
    ],
    flatConfigurations: [
      {
        typology: '1 BHK Classic',
        carpetArea: '465 Sq.Ft.',
        price: '₹ 1.15 Cr*',
        features: ['East-West Facing Entrance', 'Granite Platform Kitchen', 'Video Door Security Phone', 'Dedicated Dry Yard Space']
      },
      {
        typology: '2 BHK Premium',
        carpetArea: '740 Sq.Ft.',
        price: '₹ 1.80 Cr*',
        features: ['Spacious Living-cum-Dining Bay', 'Jaquar Concealed Brass Washroom Fittings', 'Heavy Gauge Sliding Windows', 'Provision for Piped Gas']
      },
      {
        typology: '3.5 BHK Presidential',
        carpetArea: '1,280 Sq.Ft.',
        price: '₹ 3.10 Cr*',
        features: ['3 Grand Bedrooms + Servant Quarter', 'Elegant False Ceiling with LED Grooves', 'Custom Wooden Panel Accents', 'Master Bedroom with Walk-in Closet Space']
      }
    ],
    amenities: [
      {
        title: 'Secured Covered Parking',
        description: 'Robust ground level covered parking with personal charger points for electric vehicles.',
        icon: 'local_parking'
      },
      {
        title: 'Sky Jogging & Deck',
        description: 'Landscaped open-air terrace with viewing galleries, jogging path, and comfortable benches.',
        icon: 'deck'
      },
      {
        title: 'Exclusive Fitness Studio',
        description: 'Equipped with heavy weights, rowers, and dynamic stretching zones for complete workouts.',
        icon: 'fitness_center'
      },
      {
        title: 'Emergency Power Grid',
        description: '100% silent DG set powering elevators, pumps, water systems, and general flat lighting.',
        icon: 'bolt'
      },
      {
        title: 'Video Door Security',
        description: 'Connected biometric video doorbell in each flat synced directly to the main security gate.',
        icon: 'security'
      },
      {
        title: 'Lobby & Concierge',
        description: 'Warm contemporary reception lounge with professional parcel holding cabinet and staff.',
        icon: 'domain'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        alt: 'High-quality kitchen setup inside Santosh Apartment with marble countertops',
        category: 'Interior',
        title: 'The Contemporary Kitchen'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Master bedroom layout with custom lighting and wide French windows',
        category: 'Interior',
        title: 'Cozy Master Retreat'
      }
    ],
    locationPOI: [
      {
        name: 'Malad West Metro Terminal',
        distance: '4 min drive (800 m)',
        icon: 'train',
        description: 'Seamless elevated transit connectivity directly connecting to Western and Central lines.'
      },
      {
        name: 'S.V. Road Junction',
        distance: '3 min drive (600 m)',
        icon: 'add_road',
        description: 'Instant vehicle entry to Malad\'s prime commercial markets and transportation corridors.'
      },
      {
        name: 'Inorbit Mall Malad',
        distance: '6 min drive (1.5 km)',
        icon: 'shopping_bag',
        description: 'Premier Mumbai destination for elite fashion retail, leisure, movie halls, and gourmet dining.'
      }
    ],
    connectivity: [
      { destination: 'Malad West Metro Terminal', time: '4 mins', distance: '800 m', type: 'transit' },
      { destination: 'S.V. Road Junction', time: '3 mins', distance: '600 m', type: 'transit' },
      { destination: 'Inorbit Mall Malad', time: '6 mins', distance: '1.5 km', type: 'lifestyle' },
      { destination: 'Western Express Highway', time: '10 mins', distance: '2.8 km', type: 'transit' },
      { destination: 'Lifeline Multispeciality Hospital', time: '5 mins', distance: '1.2 km', type: 'healthcare' },
      { destination: 'Ornellas High School', time: '6 mins', distance: '1.4 km', type: 'education' }
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zwHr8F_yr3CQHndhk8XiUx-2hvtRVfszoAnwoAFA-dL9q1wzU7Qx6UdGstKNFVxHZ44rEtUntidfh4yrshyHnvmmavWzs51Mksyf1gK4Cxk9xNCp022UT1Kn6bAlu3kgpdgvCL1tbHGaSIhoK5D-0_S6j3A3P8WYnfMtlSrREUCQgaCl1qxF_vwDjttyYyWShm9ODIZRX1_G9YPUjE4bcv901I6HL19wUYtrU5-OrU5KgstrwJaX_yXmvq9Ey7RNc3eqYrOBiOJw',
    formType: 'callback'
  },
  {
    id: 'nirmala',
    name: 'Nirmala Commercial',
    tagline: 'THE PREMIER BUSINESS & APARTMENT HUB IN KANDIVALI WEST',
    description: 'A strategic, mixed-use commercial and luxury serviced apartment icon located on V L Road.',
    longDescription: 'Positioned at the prime corner of Jamuna Niwas on V L Road in Kandivali West, Nirmala Commercial stands as a state-of-the-art hybrid ecosystem. Merging Grade-A professional business office workspaces on lower storeys with premium serviced residential flats on the upper towers, it provides an unparalleled environment for forward-thinking professionals. Boasting premium materials and immediate proximity to the Kandivali Railway Station, it is the new benchmark for professional corporate growth.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    heroAlt: 'The stunning glass-curtain architecture of Nirmala Commercial on V L Road',
    status: 'Upcoming',
    statusLabel: 'Launching Soon • Mixed Use',
    price: '₹ 1.45 Cr - ₹ 4.10 Cr',
    address: 'Jamuna Niwas, V L Road, Kandivali West, Kandivali West, Mumbai, Maharashtra 400067',
    specifications: [
      { label: 'WORKSPACES', value: 'Grade-A Offices', icon: 'business_center' },
      { label: 'SUITE FLATS', value: '1, 2 & 3.5 BHK', icon: 'home' },
      { label: 'INFRASTRUCTURE', value: 'Smart BMS Systems', icon: 'memory' },
      { label: 'LOCATION BENEFIT', value: 'V L Road Main Corner', icon: 'add_location_alt' }
    ],
    flatConfigurations: [
      {
        typology: '1 BHK Serviced Suite',
        carpetArea: '520 Sq.Ft.',
        price: '₹ 1.45 Cr*',
        features: ['In-built Executive Study Nook', 'Kitchenette with Built-in Hob & Oven', 'Broadband Fiber Pre-routed', 'Premium Soundproof Glass']
      },
      {
        typology: '2 BHK Business Suite',
        carpetArea: '820 Sq.Ft.',
        price: '₹ 2.25 Cr*',
        features: ['Professional Work-from-Home Studio', 'Double Glazed Acoustic Insulated Windows', 'Concierge Service Bell Enabled', 'Premium Hardwood Flooring Option']
      },
      {
        typology: '3.5 BHK Corp Penthouse',
        carpetArea: '1,500 Sq.Ft.',
        price: '₹ 4.10 Cr*',
        features: ['Sundeck with Panoramic V L Road Views', 'Double-height Private Meeting Lounge', 'Full Glass Boardroom Corner', 'Dedicated Private Elevator Access Card']
      }
    ],
    amenities: [
      {
        title: 'Smart Robotic Parking',
        description: 'State-of-the-art mechanical robotic car lift stacker ensuring lightning-quick storage and retrieval.',
        icon: 'local_parking'
      },
      {
        title: 'Corporate Fitness Suite',
        description: 'Modern gym overlooking V L Road, designed specifically for early-morning corporate health routines.',
        icon: 'fitness_center'
      },
      {
        title: 'Dual Power Bus-Ducts',
        description: '100% heavy duty power backup with silent copper conductors for server rooms and flat grids.',
        icon: 'bolt'
      },
      {
        title: 'Commercial 6-Tier Security',
        description: 'Professional guard desks, automated metal scanners, baggage scanning, and biometric card locks.',
        icon: 'security'
      },
      {
        title: 'Smart Destination Elevators',
        description: 'Fuzzy logic destination control lifts minimizing waiting times across offices and suites.',
        icon: 'elevator'
      },
      {
        title: 'Executive AC Lounge',
        description: 'Polished designer meeting lounge with video conferencing consoles and luxury sofa banks.',
        icon: 'domain'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
        alt: 'High-quality corporate entrance lobby of Nirmala Commercial with high glass walls',
        category: 'Office',
        title: 'Grand Business Atrium'
      },
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
        alt: 'Modern workspace setup with sleek desks and panoramic city sights',
        category: 'Office',
        title: 'Executive Workspace Wing'
      }
    ],
    locationPOI: [
      {
        name: 'Kandivali Railway Station',
        distance: '3 min walk (500 m)',
        icon: 'train',
        description: 'Extremely close railway transit hubs ensuring effortless staff and client daily commuting.'
      },
      {
        name: 'S.V. Road Corner',
        distance: '1 min walk (150 m)',
        icon: 'add_road',
        description: 'Direct visibility and immediate access to Kandivali\'s most important retail high-street.'
      },
      {
        name: 'Shatabdi Municipal Hospital',
        distance: '3 min drive (750 m)',
        icon: 'local_hospital',
        description: 'Prominent tertiary healthcare center providing instant emergency medical care access.'
      }
    ],
    connectivity: [
      { destination: 'Kandivali Railway Station', time: '3 mins', distance: '500 m', type: 'transit' },
      { destination: 'S.V. Road Corner', time: '1 min', distance: '150 m', type: 'transit' },
      { destination: 'Link Road Kandivali', time: '5 mins', distance: '1.3 km', type: 'transit' },
      { destination: 'Western Express Highway', time: '8 mins', distance: '2.2 km', type: 'transit' },
      { destination: 'Shatabdi Municipal Hospital', time: '3 mins', distance: '750 m', type: 'healthcare' },
      { destination: 'Kandivali Recreation Club', time: '4 mins', distance: '1.0 km', type: 'lifestyle' }
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zwHr8F_yr3CQHndhk8XiUx-2hvtRVfszoAnwoAFA-dL9q1wzU7Qx6UdGstKNFVxHZ44rEtUntidfh4yrshyHnvmmavWzs51Mksyf1gK4Cxk9xNCp022UT1Kn6bAlu3kgpdgvCL1tbHGaSIhoK5D-0_S6j3A3P8WYnfMtlSrREUCQgaCl1qxF_vwDjttyYyWShm9ODIZRX1_G9YPUjE4bcv901I6HL19wUYtrU5-OrU5KgstrwJaX_yXmvq9Ey7RNc3eqYrOBiOJw',
    formType: 'inquiry'
  }
];
