/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectSpec {
  label: string;
  value: string;
  icon?: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  url: string;
  alt: string;
  category: string;
  title: string;
}

export interface LocationPOI {
  name: string;
  distance: string;
  icon: string;
  description: string;
}

export interface FlatConfig {
  typology: string;
  carpetArea: string;
  price: string;
  features: string[];
}

export interface ConnectivityItem {
  destination: string;
  time: string;
  distance?: string;
  type: 'transit' | 'education' | 'healthcare' | 'lifestyle';
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  heroAlt: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  statusLabel: string;
  price?: string;
  address: string;
  specifications: ProjectSpec[];
  amenities: Amenity[];
  gallery: GalleryItem[];
  locationPOI: LocationPOI[];
  mapImage: string;
  formType: 'brochure' | 'callback' | 'inquiry';
  flatConfigurations?: FlatConfig[];
  connectivity?: ConnectivityItem[];
}

export type ViewState = 'home' | 'shreya' | 'santosh' | 'nirmala' | 'about' | 'legacy' | 'admin';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  projectId: string;
  projectName: string;
  submittedAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'CONTACTED' | 'ARCHIVED';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectId: string;
  projectName: string;
  formType: 'general' | 'brochure' | 'callback' | 'inquiry';
  submittedAt: string;
  status: 'UNREAD' | 'CONTACTED' | 'ARCHIVED';
}

export interface AdminConfig {
  webhookUrl?: string;
}

