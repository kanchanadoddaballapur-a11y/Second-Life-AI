/**
 * SecondLife AI - E-Waste Second-Life Engine
 * Core domain types, Indian Rupee (₹ INR) currency standard, and local discovery models
 */

export type ComponentHealth = 'good' | 'moderate' | 'poor' | 'faulty' | 'unknown';

export type EvidenceSource = 'user_provided' | 'ai_visual' | 'diagnostic' | 'estimated';

export interface ComponentAssessment {
  name: string;
  category: 'Display' | 'Keyboard' | 'Battery' | 'Storage' | 'Motherboard' | 'Performance' | 'Physical body' | 'Ports' | 'Operating system';
  status: ComponentHealth;
  evidenceSource: EvidenceSource;
  confidence: 'High' | 'Medium' | 'Low';
  notes: string;
}

export type PathwayId =
  | 'repair'
  | 'reuse'
  | 'refurbish'
  | 'resell'
  | 'donate'
  | 'component_recovery'
  | 'recycling';

export type UserSelectedPathwayChoice = PathwayId | 'ai_suggest';

export interface EnvironmentalImpact {
  divertedKg: number;
  embodiedCo2eSavedKg: number;
  criticalRawMaterialsConservedGrams: number;
  addedUsefulLifeYears: number;
  isVerifiedEstimate: boolean;
  methodologySource: string;
}

export interface DestinationAction {
  category: string;
  recommendedPartnerType: string;
  actionSteps: string[];
  dataSecurityRequirements: string[];
  estimatedTurnaroundDays: number;
}

export interface PathwayEvaluation {
  id: PathwayId;
  name: string;
  tagline: string;
  description: string;
  estimatedCost: {
    min: number;
    max: number;
    currency: 'INR';
  };
  potentialRecoveredValue: {
    min: number;
    max: number;
    currency: 'INR';
  };
  netEconomicBenefit: number;
  feasibility: 'High' | 'Medium' | 'Low' | 'Infeasible';
  secondLifePotential: 'High' | 'Medium' | 'Low';
  confidence: 'High' | 'Medium' | 'Low';
  supportingEvidence: string[];
  keyRisksOrUncertainties: string[];
  environmentalImpact: EnvironmentalImpact;
  destination: DestinationAction;
  score: number;
  rank: number;
  isRecommended: boolean;
  isAlternative: boolean;
}

export interface DeviceInputData {
  deviceType: string;
  brand: string;
  model: string;
  ageYears: number;
  bootsNormally: boolean;
  batteryStatus: string;
  displayStatus: string;
  keyboardStatus: string;
  storageStatus: string;
  motherboardStatus: string;
  performanceStatus: string;
  physicalBodyStatus: string;
  portsStatus: string;
  osStatus: string;
  cpuRamSpecs?: string;
  purchaseDate?: string;
  userReportedFaults: string;
  additionalInfo?: string;
  diagnosticResults?: string;
  imageBase64?: string;
  currency: 'INR';
  displayWorking?: boolean;
  keyboardWorking?: boolean;
  batteryHoldsCharge?: boolean;
  storageWorking?: boolean;
  motherboardFunctional?: boolean;
  physicalCondition?: 'good' | 'minor_damage' | 'heavy_damage';
  performance?: 'fast' | 'moderate' | 'sluggish';
}

export interface AnalysisResult {
  deviceId: string;
  timestamp: string;
  deviceIdentity: {
    detectedType: string;
    detectedBrand: string;
    detectedModel: string;
    estimatedOriginalMSRP: number; // in INR
    currency: 'INR';
    identificationConfidence: 'High' | 'Medium' | 'Low';
    identificationNotes: string;
  };
  conditionTable: ComponentAssessment[];
  pathways: PathwayEvaluation[];
  recommendedPathway: PathwayId;
  recommendationExplanation: {
    headline: string;
    primaryRationale: string;
    supportingEvidence: string[];
    economicBreakdown: string;
    secondLifeOutlook: string;
    alternativePathway: PathwayId;
    alternativeRationale: string;
    confidenceLevel: 'High' | 'Medium' | 'Low';
    criticalUncertainties: string[];
    humanInspectionRecommended: boolean;
  };
  missingInformation: string[];
  environmentalSummary: {
    divertedWeightKg: number;
    embodiedCo2eAvoidedKg: number;
    usableLifeExtendedYears: number;
    criticalMaterialsConservedGrams: number;
    verificationStatus: 'verified_model' | 'provisional_estimate' | 'insufficient_data';
    citation: string;
  };
  decisionFrameworkMetrics: {
    circularityScore: number;
    economicViabilityRatio: number;
    repairabilityIndex: number;
  };
}

export interface WhatIfScenarioModifiers {
  batteryReplacementCostFactor: number;
  refurbishedMarketDemand: 'depressed' | 'stable' | 'high';
  diyRepairLabor: boolean;
  donationTaxIncentive: boolean;
  scrapMetalPriceChange: number;
}

// ==========================================
// User Preference & Provider Discovery
// ==========================================

export type ProviderType =
  | 'repair_shop'
  | 'refurbisher'
  | 'reseller'
  | 'donation_org'
  | 'component_recovery'
  | 'ewaste_recycler'
  | 'authorized_service_center';

export type UserPriority =
  | 'lowest_cost'
  | 'highest_value'
  | 'fastest'
  | 'max_life'
  | 'environmental'
  | 'convenience'
  | 'nearby';

export type DistanceLimitOption = 1 | 3 | 5 | 10 | 25 | 'city';

export type BudgetPreset =
  | '0-500'
  | '500-1000'
  | '1000-2500'
  | '2500-5000'
  | '5000-10000'
  | '10000+'
  | 'none';

export type SortOption =
  | 'nearest'
  | 'lowest_cost'
  | 'highest_rating'
  | 'most_relevant'
  | 'best_budget';

export interface UserPreferences {
  selectedPathways: UserSelectedPathwayChoice[];
  budgetPreset: BudgetPreset;
  isCustomBudget: boolean;
  customBudgetMin: number | null;
  customBudgetMax: number | null;
  distanceLimit: DistanceLimitOption;
  priority: UserPriority;
  providerTypes: ProviderType[];
  marketDemand?: 'high' | 'moderate' | 'low';
  expectedSalePrice?: number | null;
  location: {
    city: string;
    pinCode?: string;
    areaName?: string;
  };
}

export interface NearbyProvider {
  id: string;
  name: string;
  providerType: ProviderType;
  providerTypeLabel: string;
  address: string;
  city: string;
  phone: string | null;
  website: string | null;
  distanceKm: number;
  estimatedCost: {
    min: number;
    max: number;
    currency: 'INR';
    notes: string;
  };
  services: string[];
  rating: number | null;
  reviewCount: number | null;
  openingHours: string | null;
  whyItMatches: string;
  pathwayAffinity: PathwayId[];
  isVerified: boolean;
  dataIntegrityNotes?: string;
  hasHomeService?: boolean;
  hasDoorstepPickup?: boolean;
  onlineBookingUrl?: string;
}

// User Profile & Authentication
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  address?: string;
  avatarUrl?: string;
  savedProviderIds: string[];
}

// Bookings & Doorstep / Home Service Models
export type BookingServiceType = 'home_service' | 'pickup_delivery' | 'store_visit';

export type BookingStatus =
  | 'pending'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export interface BookingItem {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceAddress: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  requiredService: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  estimatedCost: number;
  finalCost?: number;
  status: BookingStatus;
  serviceType: BookingServiceType;
  providerId: string;
  providerName: string;
  providerPhone: string;
  providerWebsite: string;
  providerRating?: number;
  bookingNotes?: string;
  createdAt: string;
  isHomeService: boolean;
  externalBookingUrl?: string;
}

export interface BookingNotification {
  id: string;
  title: string;
  message: string;
  type: 'confirmed' | 'upcoming' | 'rescheduled' | 'completed';
  timestamp: string;
  read: boolean;
  bookingId?: string;
}

export interface DeviceHistoryItem {
  id: string;
  deviceName: string;
  deviceType: string;
  assessmentDate: string;
  selectedPathway: string;
  budgetLabel: string;
  providerName: string;
  status: 'Action Planned' | 'In Repair' | 'Refurbished' | 'Donated' | 'Recycled' | 'Booked Service';
  estimatedCost: number;
  divertedWeightKg: number;
}
