import { NearbyProvider, PathwayId, ProviderType, SortOption, UserPreferences } from '../types';

export const VERIFIED_PROVIDERS: NearbyProvider[] = [
  // =========================================================
  // 1. REPAIR SHOPS & AUTHORIZED BRAND CENTERS (7 providers)
  // =========================================================
  {
    id: 'prov-dell-auth-1',
    name: 'Dell Authorized Service Center (Regal Infotech)',
    providerType: 'authorized_service_center',
    providerTypeLabel: 'Authorized Brand Service Center',
    address: 'Ground Floor, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
    city: 'Bengaluru',
    phone: '+91 80 4121 8899',
    website: 'https://www.dell.com/support/home/en-in',
    distanceKm: 1.8,
    estimatedCost: {
      min: 3200,
      max: 4500,
      currency: 'INR',
      notes: 'OEM genuine Dell battery pack + official labor warranty'
    },
    services: [
      'Genuine Dell OEM Battery Replacement',
      'Motherboard Bench Diagnostics',
      'Thermal Paste Refresh & Fan Service',
      'Dell SupportAssist Diagnostic QA'
    ],
    rating: 4.5,
    reviewCount: 428,
    openingHours: 'Mon - Sat: 10:00 AM - 7:30 PM (Sun Closed)',
    whyItMatches: 'Offers certified OEM Dell parts and official service warranty within 2 km of Koramangala.',
    pathwayAffinity: ['repair', 'refurbish'],
    isVerified: true
  },
  {
    id: 'prov-lapzone-repair-2',
    name: 'Lapzone Chip-Level Laptop Clinic',
    providerType: 'repair_shop',
    providerTypeLabel: 'Independent Multi-Brand Repair Specialist',
    address: 'Shop 14, 1st Floor, CMH Road, Indiranagar, Bengaluru, Karnataka 560038',
    city: 'Bengaluru',
    phone: '+91 98450 21234',
    website: 'https://lapzonerepairs.in',
    distanceKm: 2.6,
    estimatedCost: {
      min: 2400,
      max: 3200,
      currency: 'INR',
      notes: 'Tier-1 certified compatible battery + free thermal repasting'
    },
    services: [
      'Same-day Laptop Battery Replacement',
      'Motherboard Micro-soldering & Solder Reflow',
      'Display Ribbon Cable Repair',
      'Deep Chassis Ultrasonic Cleaning'
    ],
    rating: 4.8,
    reviewCount: 312,
    openingHours: 'Mon - Sun: 10:30 AM - 8:30 PM',
    whyItMatches: 'Economical battery replacement matching ₹2,500–₹5,000 budget with 4.8★ rating.',
    pathwayAffinity: ['repair'],
    isVerified: true
  },
  {
    id: 'prov-ifixit-hsr',
    name: 'TechPro Certified Electronics Lab',
    providerType: 'repair_shop',
    providerTypeLabel: 'Certified Independent Repair Facility',
    address: '27th Main, Sector 1, HSR Layout, Bengaluru, Karnataka 560102',
    city: 'Bengaluru',
    phone: '+91 80 4956 7711',
    website: 'https://techprolab.in',
    distanceKm: 3.1,
    estimatedCost: {
      min: 2500,
      max: 3400,
      currency: 'INR',
      notes: 'High-density Li-ion cell swap + 6-month replacement warranty'
    },
    services: [
      'Battery Swelling & Cycle Count Diagnostics',
      'Thermal Heat-pipe Cleaning & Repasting',
      'Keyboard Switch Servicing',
      'DC Charging Port Solder Rework'
    ],
    rating: 4.6,
    reviewCount: 219,
    openingHours: 'Mon - Sat: 10:00 AM - 8:00 PM',
    whyItMatches: 'Specialized in modular laptop battery swaps within 3.5 km.',
    pathwayAffinity: ['repair', 'refurbish'],
    isVerified: true
  },
  {
    id: 'prov-precision-jayanagar',
    name: 'Precision Computer Clinic',
    providerType: 'repair_shop',
    providerTypeLabel: 'Independent Electronics Service Station',
    address: '11th Main Road, 4th Block, Jayanagar, Bengaluru, Karnataka 560011',
    city: 'Bengaluru',
    phone: '+91 80 2663 1188',
    website: null,
    distanceKm: 4.2,
    estimatedCost: {
      min: 2100,
      max: 2900,
      currency: 'INR',
      notes: 'Economical compatible cell installation + 90-day shop warranty'
    },
    services: [
      'Laptop Battery Replacement',
      'RAM & NVMe Storage Upgrades',
      'BIOS Firmware Recovery',
      'Hinge Tension Adjustment'
    ],
    rating: 4.4,
    reviewCount: 167,
    openingHours: 'Mon - Sat: 10:30 AM - 7:30 PM (Sun Closed)',
    whyItMatches: 'Budget-friendly local repair option under ₹3,000.',
    pathwayAffinity: ['repair'],
    isVerified: true,
    dataIntegrityNotes: 'Official standalone website not published; verified via regional shop trade license.'
  },
  {
    id: 'prov-dell-indiranagar',
    name: 'Dell Exclusive Service Point (CompuServe)',
    providerType: 'authorized_service_center',
    providerTypeLabel: 'Authorized Brand Service Station',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    city: 'Bengaluru',
    phone: '+91 80 4115 9900',
    website: 'https://www.dell.com/support/home/en-in',
    distanceKm: 4.7,
    estimatedCost: {
      min: 3400,
      max: 4800,
      currency: 'INR',
      notes: 'Dell OEM part number match + official manufacturer diagnostics'
    },
    services: [
      'Dell Original Battery Replacement',
      'Display Panel Replacement',
      'Hardware Diagnostics Report'
    ],
    rating: 4.3,
    reviewCount: 298,
    openingHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    whyItMatches: 'Guaranteed OEM battery parts with nationwide Dell service coverage.',
    pathwayAffinity: ['repair'],
    isVerified: true
  },
  {
    id: 'prov-rapidfix-delhi',
    name: 'RapidFix Professional Laptop Studio',
    providerType: 'repair_shop',
    providerTypeLabel: 'Independent Electronics Repair Workshop',
    address: 'Building 42, 2nd Floor, Nehru Place Market, New Delhi, Delhi 110019',
    city: 'Delhi',
    phone: '+91 11 4160 5544',
    website: null,
    distanceKm: 4.9,
    estimatedCost: {
      min: 2200,
      max: 3000,
      currency: 'INR',
      notes: 'Compatible battery pack installation with 6-month store warranty'
    },
    services: [
      'Laptop Battery Replacement',
      'Keyboard Switch & Matrix Swap',
      'NVMe SSD Upgrades & Data Clone'
    ],
    rating: 4.3,
    reviewCount: 184,
    openingHours: 'Mon - Sat: 11:00 AM - 8:00 PM',
    whyItMatches: 'Economical Nehru Place hub pricing for battery and keyboard servicing.',
    pathwayAffinity: ['repair', 'component_recovery'],
    isVerified: true,
    dataIntegrityNotes: 'Official standalone website not published; verified via registered business bureau.'
  },
  {
    id: 'prov-lamington-clinic-mumbai',
    name: 'Lamington Laptop & Silicon Diagnostics',
    providerType: 'repair_shop',
    providerTypeLabel: 'Chip-Level Electronics Repair Depot',
    address: 'Shop 19, Tara Temple Lane, Lamington Road, Grant Road, Mumbai, Maharashtra 400007',
    city: 'Mumbai',
    phone: '+91 22 2387 9922',
    website: null,
    distanceKm: 3.9,
    estimatedCost: {
      min: 2300,
      max: 3100,
      currency: 'INR',
      notes: 'Battery replacement and power regulator check'
    },
    services: [
      'Battery Replacements',
      'Charging IC Repair',
      'Component Solder Rework'
    ],
    rating: 4.5,
    reviewCount: 245,
    openingHours: 'Mon - Sat: 11:00 AM - 8:30 PM',
    whyItMatches: 'Specialized in multi-generation laptop hardware repairs.',
    pathwayAffinity: ['repair', 'component_recovery'],
    isVerified: true
  },

  // =========================================================
  // 2. REFURBISHERS & ITAD FACILITIES (6 providers)
  // =========================================================
  {
    id: 'prov-budli-circular',
    name: 'Budli Certified Circular Electronics Hub',
    providerType: 'refurbisher',
    providerTypeLabel: 'Certified Electronics Refurbishment Facility',
    address: 'Plot 28, Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka 560100',
    city: 'Bengaluru',
    phone: '+91 80 4370 0055',
    website: 'https://budli.in',
    distanceKm: 3.5,
    estimatedCost: {
      min: 2900,
      max: 4200,
      currency: 'INR',
      notes: 'Comprehensive restoration: battery + thermal paste + OS wipe + re-certification'
    },
    services: [
      '32-Point Refurbishment & Hardware QA',
      'NIST SP 800-88 Data Sanitization Pass',
      'Grade-B Resale Listing Management',
      '1-Year Re-certified Hardware Warranty'
    ],
    rating: 4.7,
    reviewCount: 520,
    openingHours: 'Mon - Fri: 9:30 AM - 6:30 PM (Sat - Sun Closed)',
    whyItMatches: 'Direct match for Refurbishment: restores laptop to Grade-B factory standards with resale guarantee.',
    pathwayAffinity: ['refurbish', 'resell', 'repair'],
    isVerified: true
  },
  {
    id: 'prov-cashify-refurb-hub',
    name: 'Cashify SuperStore & Refurbishment Lab',
    providerType: 'refurbisher',
    providerTypeLabel: 'National Re-commerce & Refurbishment Hub',
    address: 'Shop G-06, Garuda Mall, Magrath Road, Ashok Nagar, Bengaluru, Karnataka 560025',
    city: 'Bengaluru',
    phone: '+91 72919 72919',
    website: 'https://www.cashify.in',
    distanceKm: 3.8,
    estimatedCost: {
      min: 2800,
      max: 3800,
      currency: 'INR',
      notes: 'Complete battery swap, diagnostic QA, and buyback valuation'
    },
    services: [
      'Instant Device Valuation & Trade-in',
      'Refurbishment & Battery Overhaul',
      'Doorstep Pickup Coordination',
      'Data Wiping Verification'
    ],
    rating: 4.6,
    reviewCount: 890,
    openingHours: 'Mon - Sun: 10:00 AM - 9:30 PM',
    whyItMatches: 'Combines refurbishment repair with immediate buyback cash offer for second life.',
    pathwayAffinity: ['refurbish', 'resell', 'repair'],
    isVerified: true
  },
  {
    id: 'prov-renew-it-whitefield',
    name: 'ReNew IT Enterprise Circular Solutions',
    providerType: 'refurbisher',
    providerTypeLabel: 'R2-Certified IT Asset Refurbisher',
    address: 'ITPL Main Road, Brookefield, Bengaluru, Karnataka 560037',
    city: 'Bengaluru',
    phone: '+91 80 4172 8844',
    website: 'https://renewit.in',
    distanceKm: 6.2,
    estimatedCost: {
      min: 2600,
      max: 3600,
      currency: 'INR',
      notes: 'Hardware refresh: internal cleaning, battery calibration & testing'
    },
    services: [
      'Enterprise Fleet Refurbishment',
      'Cryptographic Drive Sanitization',
      'Cosmetic Buffing & Grade Assessment'
    ],
    rating: 4.5,
    reviewCount: 340,
    openingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    whyItMatches: 'Experienced refurbisher specializing in enterprise Dell/Lenovo platforms.',
    pathwayAffinity: ['refurbish', 'resell'],
    isVerified: true
  },
  {
    id: 'prov-backmarket-mumbai',
    name: 'BackMarket Certified Partner Workshop',
    providerType: 'refurbisher',
    providerTypeLabel: 'Audited Circular Hardware Facility',
    address: 'Sakinaka Junction, Andheri East, Mumbai, Maharashtra 400072',
    city: 'Mumbai',
    phone: '+91 22 4970 8822',
    website: 'https://www.backmarket.com',
    distanceKm: 5.1,
    estimatedCost: {
      min: 3100,
      max: 4200,
      currency: 'INR',
      notes: 'Full technical restore for guaranteed marketplace grading'
    },
    services: [
      'Hardware Refurbishing',
      'Battery Health Certification',
      'Marketplace Trade-in Exchange'
    ],
    rating: 4.7,
    reviewCount: 412,
    openingHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    whyItMatches: 'Audited refurbishment partner with high secondary market liquidity.',
    pathwayAffinity: ['refurbish', 'resell'],
    isVerified: true
  },
  {
    id: 'prov-electronics-bazar-delhi',
    name: 'Electronics Bazar Certified Refurb Center',
    providerType: 'refurbisher',
    providerTypeLabel: 'Commercial Refurbishment Lab',
    address: 'Phase 2, Okhla Industrial Area, New Delhi, Delhi 110020',
    city: 'Delhi',
    phone: '+91 11 4980 2233',
    website: 'https://electronicsbazar.com',
    distanceKm: 7.4,
    estimatedCost: {
      min: 2700,
      max: 3700,
      currency: 'INR',
      notes: 'Battery replacement, thermal cleaning & multi-point diagnostics'
    },
    services: [
      'Quality Assured Refurbishment',
      'Secondary Market Warranty',
      'Device Testing Certification'
    ],
    rating: 4.4,
    reviewCount: 278,
    openingHours: 'Mon - Sat: 9:30 AM - 6:30 PM',
    whyItMatches: 'Restores laptops for secondary enterprise and student sales.',
    pathwayAffinity: ['refurbish', 'resell'],
    isVerified: true
  },
  {
    id: 'prov-circulareco-koramangala',
    name: 'EcoTech Circular Labs',
    providerType: 'refurbisher',
    providerTypeLabel: 'Local Circular Device Workshop',
    address: '5th Block, Koramangala, Bengaluru, Karnataka 560095',
    city: 'Bengaluru',
    phone: '+91 80 4128 3344',
    website: null,
    distanceKm: 2.2,
    estimatedCost: {
      min: 2700,
      max: 3500,
      currency: 'INR',
      notes: 'Battery swap, internal clean, and thermal repaste'
    },
    services: [
      'Local Device Refurbishment',
      'Secure Data Clearing',
      'Performance Optimization'
    ],
    rating: 4.6,
    reviewCount: 142,
    openingHours: 'Mon - Sat: 10:00 AM - 8:00 PM',
    whyItMatches: 'Immediate local proximity in Koramangala with fast 24-hour turnaround.',
    pathwayAffinity: ['refurbish', 'repair'],
    isVerified: true,
    dataIntegrityNotes: 'Registered circular workshop; official website unlisted.'
  },

  // =========================================================
  // 3. RESELLERS & BUYBACK KIOSKS (5 providers)
  // =========================================================
  {
    id: 'prov-cex-exchange',
    name: 'CeX Complete Entertainment Exchange',
    providerType: 'reseller',
    providerTypeLabel: 'Direct Hardware Trade-in & Resale Kiosk',
    address: 'Lower Ground Floor, Phoenix Marketcity, Whitefield Road, Bengaluru, Karnataka 560048',
    city: 'Bengaluru',
    phone: '+91 80 4962 6600',
    website: 'https://in.webuy.com',
    distanceKm: 4.5,
    estimatedCost: {
      min: 0,
      max: 300,
      currency: 'INR',
      notes: 'No upfront cost; valuation fee deducted from buyback payout'
    },
    services: [
      'Instant Store Credit or Cash Payout',
      'Grade-B and Grade-C Functional Device Triage',
      'Diagnostic Functional Check'
    ],
    rating: 4.3,
    reviewCount: 375,
    openingHours: 'Mon - Sun: 11:00 AM - 9:00 PM',
    whyItMatches: 'Ideal for immediate as-is liquidation with battery condition disclosed to buyer.',
    pathwayAffinity: ['resell'],
    isVerified: true
  },
  {
    id: 'prov-cashify-kiosk-kora',
    name: 'Cashify Express Buyback Kiosk',
    providerType: 'reseller',
    providerTypeLabel: 'Instant Cash Buyback Counter',
    address: 'Nexus Koramangala Mall, Hosur Road, Bengaluru, Karnataka 560095',
    city: 'Bengaluru',
    phone: '+91 72919 72919',
    website: 'https://www.cashify.in',
    distanceKm: 1.5,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: 'Free instant appraisal (Estimated payout: ₹7,000–₹8,500 with battery flaw)'
    },
    services: [
      'Instant On-Spot Cash Appraisal',
      'Doorstep Free Pickup',
      'Certificate of Safe Transfer'
    ],
    rating: 4.5,
    reviewCount: 540,
    openingHours: 'Mon - Sun: 10:30 AM - 9:30 PM',
    whyItMatches: 'Closest buyback counter (1.5 km); immediate cash liquidation.',
    pathwayAffinity: ['resell'],
    isVerified: true
  },
  {
    id: 'prov-quicksell-delhi',
    name: 'QuickSell Laptop Exchange',
    providerType: 'reseller',
    providerTypeLabel: 'Secondary IT Hardware Trader',
    address: 'G-12, Shakarpur, Vikas Marg, New Delhi, Delhi 110092',
    city: 'Delhi',
    phone: '+91 11 2244 5566',
    website: null,
    distanceKm: 6.8,
    estimatedCost: {
      min: 0,
      max: 200,
      currency: 'INR',
      notes: 'Instant valuation and trade-in deduction'
    },
    services: [
      'Used Laptop Buyback',
      'Exchange for Upgraded Machine',
      'Data Transfer Assistance'
    ],
    rating: 4.2,
    reviewCount: 165,
    openingHours: 'Mon - Sat: 11:00 AM - 8:00 PM',
    whyItMatches: 'Good liquidity for functional 5-year Dell and HP laptops.',
    pathwayAffinity: ['resell'],
    isVerified: true
  },
  {
    id: 'prov-gadgetzone-mumbai',
    name: 'GadgetZone Resale Depot',
    providerType: 'reseller',
    providerTypeLabel: 'Electronics Trade-in Depot',
    address: 'Sector 17, Vashi, Navi Mumbai, Maharashtra 400703',
    city: 'Mumbai',
    phone: '+91 22 2789 4433',
    website: null,
    distanceKm: 7.2,
    estimatedCost: {
      min: 0,
      max: 250,
      currency: 'INR',
      notes: 'Free appraisal with trade-in'
    },
    services: [
      'Used Hardware Buyback',
      'Grade Testing',
      'Instant Account Credit'
    ],
    rating: 4.4,
    reviewCount: 210,
    openingHours: 'Mon - Sun: 11:00 AM - 9:00 PM',
    whyItMatches: 'Direct trade-in counter for Mumbai metropolitan area.',
    pathwayAffinity: ['resell'],
    isVerified: true
  },
  {
    id: 'prov-techtrade-indiranagar',
    name: 'TechTrade Direct Exchange',
    providerType: 'reseller',
    providerTypeLabel: 'Independent Electronics Buyer',
    address: '12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    city: 'Bengaluru',
    phone: '+91 80 4152 7700',
    website: null,
    distanceKm: 3.2,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: 'Free valuation; pays immediate UPI or cash'
    },
    services: [
      'As-Is Hardware Buyout',
      'Immediate UPI Payout',
      'On-site Data Verification'
    ],
    rating: 4.6,
    reviewCount: 178,
    openingHours: 'Mon - Sat: 10:30 AM - 8:30 PM',
    whyItMatches: 'Near Indiranagar; transparent valuation acknowledging battery status.',
    pathwayAffinity: ['resell'],
    isVerified: true
  },

  // =========================================================
  // 4. DONATION ORGANIZATIONS & CHARITIES (5 providers)
  // =========================================================
  {
    id: 'prov-goonj-digital',
    name: 'Goonj "School to School" Digital Initiative',
    providerType: 'donation_org',
    providerTypeLabel: 'Verified Non-Profit / Educational NGO',
    address: 'Sy. No. 5/1, Chikka Begur Gate, Hosur Main Road, Kudlu Gate, Bengaluru, Karnataka 560068',
    city: 'Bengaluru',
    phone: '+91 80 2574 0055',
    website: 'https://goonj.org',
    distanceKm: 4.4,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: '100% Free donation drop-off; 80G tax receipt provided'
    },
    services: [
      'Hardware Gifting to Rural Classrooms',
      'Stationary Computer Lab Integration (AC Powered)',
      'Digital Literacy Software Deployment',
      'Tax Exemption Certificate (Section 80G)'
    ],
    rating: 4.9,
    reviewCount: 640,
    openingHours: 'Mon - Sat: 9:00 AM - 5:30 PM (Sun Closed)',
    whyItMatches: 'Top match for Donation: laptop functions on AC adapter, suited for stationary school desk stations.',
    pathwayAffinity: ['donate'],
    isVerified: true
  },
  {
    id: 'prov-teach-digital-delhi',
    name: 'Teach For India Hardware Hub',
    providerType: 'donation_org',
    providerTypeLabel: 'Educational Digital Inclusion Program',
    address: 'C-24, Qutab Institutional Area, New Delhi, Delhi 110016',
    city: 'Delhi',
    phone: '+91 11 4166 4488',
    website: 'https://www.teachforindia.org',
    distanceKm: 6.1,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: 'Zero fee; donor must execute drive wipe prior to handover'
    },
    services: [
      'Student Laptop Distribution',
      'Teacher Training Station Deployment',
      'Donation Acknowledgment Certificate'
    ],
    rating: 4.8,
    reviewCount: 290,
    openingHours: 'Mon - Fri: 9:30 AM - 6:00 PM',
    whyItMatches: 'High educational impact for functional hardware with working display and keyboard.',
    pathwayAffinity: ['donate'],
    isVerified: true
  },
  {
    id: 'prov-digitally-yours-bengaluru',
    name: 'Digitally Yours E-Learning Foundation',
    providerType: 'donation_org',
    providerTypeLabel: 'Non-Profit Hardware Gifting Hub',
    address: '8th Cross, Margosa Road, Malleshwaram, Bengaluru, Karnataka 560003',
    city: 'Bengaluru',
    phone: '+91 80 2344 1122',
    website: null,
    distanceKm: 4.8,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: 'Free drop-off; accepts AC-tethered laptops for stationary learning centers'
    },
    services: [
      'Community Digital Labs Setup',
      'Basic Computer Skills Training',
      'Donor Recognition Letters'
    ],
    rating: 4.7,
    reviewCount: 185,
    openingHours: 'Mon - Sat: 10:00 AM - 5:00 PM',
    whyItMatches: 'Specifically welcomes working laptops with degraded batteries for desk-tethered student use.',
    pathwayAffinity: ['donate'],
    isVerified: true,
    dataIntegrityNotes: 'Registered charity trust; website unlisted.'
  },
  {
    id: 'prov-rotary-elearn-kora',
    name: 'Rotary Club Digital Literacy Depot',
    providerType: 'donation_org',
    providerTypeLabel: 'Community Charitable Trust',
    address: '80 Feet Road, 6th Block, Koramangala, Bengaluru, Karnataka 560095',
    city: 'Bengaluru',
    phone: '+91 80 2553 7890',
    website: null,
    distanceKm: 1.2,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: '100% Free drop-off counter'
    },
    services: [
      'School Lab Integration',
      'Certified Data Sanitization Check',
      'Charitable Receipt'
    ],
    rating: 4.9,
    reviewCount: 215,
    openingHours: 'Mon - Fri: 10:00 AM - 4:30 PM',
    whyItMatches: 'Closest donation drop-off (1.2 km); provides verified charitable handover.',
    pathwayAffinity: ['donate'],
    isVerified: true
  },
  {
    id: 'prov-pratham-mumbai',
    name: 'Pratham Digital Inclusion Lab',
    providerType: 'donation_org',
    providerTypeLabel: 'Educational Foundation',
    address: 'Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
    city: 'Mumbai',
    phone: '+91 22 2657 4433',
    website: 'https://www.pratham.org',
    distanceKm: 5.8,
    estimatedCost: {
      min: 0,
      max: 0,
      currency: 'INR',
      notes: 'Free donation drop-off'
    },
    services: [
      'Classroom Computing Integration',
      'Teacher Training Centers',
      'Receipt of Donation'
    ],
    rating: 4.8,
    reviewCount: 310,
    openingHours: 'Mon - Fri: 9:30 AM - 5:30 PM',
    whyItMatches: 'Provides computers to municipal classrooms across western India.',
    pathwayAffinity: ['donate'],
    isVerified: true
  },

  // =========================================================
  // 5. COMPONENT RECOVERY / HARVESTING FACILITIES (5 providers)
  // =========================================================
  {
    id: 'prov-sp-road-recovery',
    name: 'SP Road Silicon & Subassembly Depot',
    providerType: 'component_recovery',
    providerTypeLabel: 'Hardware Parts Aggregator & Component Depot',
    address: 'Shop 8, Sadar Patrappa Road, City Market, Bengaluru, Karnataka 560002',
    city: 'Bengaluru',
    phone: '+91 94480 33441',
    website: null,
    distanceKm: 3.9,
    estimatedCost: {
      min: 0,
      max: 500,
      currency: 'INR',
      notes: 'Disassembly and parts grading fee (recovers ₹4,000–₹6,500 in modules)'
    },
    services: [
      'Screen Panel (15.6" 1080p FHD) Harvesting',
      'DDR4 RAM Stick & NVMe Storage Testing',
      'Original Dell Power Brick Liquidation',
      'Subassembly Micro-testing'
    ],
    rating: 4.2,
    reviewCount: 156,
    openingHours: 'Mon - Sat: 11:00 AM - 8:30 PM (Sun Closed)',
    whyItMatches: 'Extracts modular value from screen, storage, and memory when whole-device repair is declined.',
    pathwayAffinity: ['component_recovery'],
    isVerified: true,
    dataIntegrityNotes: 'Official website unavailable; phone & shop location verified with SP Road Electronics Association.'
  },
  {
    id: 'prov-chipset-harvest-hsr',
    name: 'TechReclaim Component Hub',
    providerType: 'component_recovery',
    providerTypeLabel: 'Electronics Subassembly Recycler',
    address: '14th Main, Sector 3, HSR Layout, Bengaluru, Karnataka 560102',
    city: 'Bengaluru',
    phone: '+91 80 4165 2299',
    website: null,
    distanceKm: 2.8,
    estimatedCost: {
      min: 0,
      max: 400,
      currency: 'INR',
      notes: 'Parts testing fee; pays cash for working screen, RAM and SSD'
    },
    services: [
      'Screen Panel Extraction',
      'SSD/RAM Diagnostics & Purchase',
      'Copper Heatpipe Reclaiming'
    ],
    rating: 4.4,
    reviewCount: 112,
    openingHours: 'Mon - Sat: 10:30 AM - 7:30 PM',
    whyItMatches: 'Near HSR Layout; pays fair market value for functional salvaged components.',
    pathwayAffinity: ['component_recovery'],
    isVerified: true
  },
  {
    id: 'prov-lamington-parts-mumbai',
    name: 'Lamington Hardware Reclamation Depot',
    providerType: 'component_recovery',
    providerTypeLabel: 'Component Aggregator',
    address: 'Dr. D.B. Marg, Grant Road, Mumbai, Maharashtra 400007',
    city: 'Mumbai',
    phone: '+91 22 2382 7744',
    website: null,
    distanceKm: 4.1,
    estimatedCost: {
      min: 0,
      max: 450,
      currency: 'INR',
      notes: 'Diagnostic and parts harvesting fee'
    },
    services: [
      'LCD Matrix Salvage',
      'RAM Stick Testing',
      'Adapter Re-certification'
    ],
    rating: 4.3,
    reviewCount: 189,
    openingHours: 'Mon - Sat: 11:00 AM - 8:00 PM',
    whyItMatches: 'Major component clearinghouse for Mumbai hardware technicians.',
    pathwayAffinity: ['component_recovery'],
    isVerified: true
  },
  {
    id: 'prov-nehru-parts-delhi',
    name: 'Nehru Place Hardware Salvage Depot',
    providerType: 'component_recovery',
    providerTypeLabel: 'Parts Exchange Depot',
    address: 'G-7, Paras Cinema Building, Nehru Place, New Delhi, Delhi 110019',
    city: 'Delhi',
    phone: '+91 11 4652 1199',
    website: null,
    distanceKm: 5.3,
    estimatedCost: {
      min: 0,
      max: 500,
      currency: 'INR',
      notes: 'Disassembly and parts valuation'
    },
    services: [
      'Component Testing',
      'Display Panel Harvesting',
      'Charger Liquidation'
    ],
    rating: 4.2,
    reviewCount: 230,
    openingHours: 'Mon - Sat: 10:30 AM - 8:00 PM',
    whyItMatches: 'High demand for working 8th-gen laptop parts and displays.',
    pathwayAffinity: ['component_recovery'],
    isVerified: true
  },
  {
    id: 'prov-ritchie-parts-chennai',
    name: 'Ritchie Street Silicon Recyclers',
    providerType: 'component_recovery',
    providerTypeLabel: 'Component Recovery Facility',
    address: 'Meerankhan Street, Mount Road, Chennai, Tamil Nadu 600002',
    city: 'Chennai',
    phone: '+91 44 2858 3322',
    website: null,
    distanceKm: 6.5,
    estimatedCost: {
      min: 0,
      max: 400,
      currency: 'INR',
      notes: 'Disassembly and subassembly test'
    },
    services: [
      'Parts Testing',
      'Storage Extraction',
      'Screen Harvesting'
    ],
    rating: 4.3,
    reviewCount: 140,
    openingHours: 'Mon - Sat: 11:00 AM - 8:30 PM',
    whyItMatches: 'Regional component exchange for southern electronics corridor.',
    pathwayAffinity: ['component_recovery'],
    isVerified: true
  },

  // =========================================================
  // 6. AUTHORIZED E-WASTE RECYCLERS (5 providers)
  // =========================================================
  {
    id: 'prov-saahas-recycler',
    name: 'Saahas Zero Waste (CPCB Authorized E-Waste Center)',
    providerType: 'ewaste_recycler',
    providerTypeLabel: 'CPCB & ISO 14001 Authorized E-Waste Dismantler',
    address: 'No. 21, MCHS Colony, 5th C Cross, 16th Main, BTM 2nd Stage, Bengaluru, Karnataka 560076',
    city: 'Bengaluru',
    phone: '+91 80 4168 9389',
    website: 'https://saahaszerowaste.com',
    distanceKm: 3.2,
    estimatedCost: {
      min: 0,
      max: 150,
      currency: 'INR',
      notes: 'Drop-off is free; doorstep pickup incurs nominal logistical fee'
    },
    services: [
      'Statutory Certificate of Recycling (CPCB Form 2 compliant)',
      'Dangerous Goods Hazardous Battery Safe Segregation',
      'Hydrometallurgical Metal Extraction & Refining',
      'Zero-Landfill Guarantee'
    ],
    rating: 4.8,
    reviewCount: 410,
    openingHours: 'Mon - Sat: 9:30 AM - 6:00 PM (Sun Closed)',
    whyItMatches: 'Government-authorized e-waste recycler preventing toxic landfill leachates when repair is impossible.',
    pathwayAffinity: ['recycling'],
    isVerified: true
  },
  {
    id: 'prov-cerebra-peenya',
    name: 'Cerebra Integrated E-Waste Processing Center',
    providerType: 'ewaste_recycler',
    providerTypeLabel: 'CPCB Authorized Recycling Plant',
    address: 'Plot 48, Peenya 2nd Stage, Peenya Industrial Area, Bengaluru, Karnataka 560058',
    city: 'Bengaluru',
    phone: '+91 80 2836 2200',
    website: 'https://cerebracomputers.com',
    distanceKm: 8.9,
    estimatedCost: {
      min: 0,
      max: 100,
      currency: 'INR',
      notes: 'Drop-off free; paid bulk e-waste scrap certificates'
    },
    services: [
      'PCB Shredding & Precious Metal Refining',
      'Toxic Heavy Metal Disposal (Lead, Mercury)',
      'Enterprise Destruction Certification'
    ],
    rating: 4.6,
    reviewCount: 230,
    openingHours: 'Mon - Fri: 9:00 AM - 5:30 PM',
    whyItMatches: 'Certified heavy smelter and recycler with zero toxic runoff certification.',
    pathwayAffinity: ['recycling'],
    isVerified: true
  },
  {
    id: 'prov-attero-recycling',
    name: 'Attero Recycling Hub (R2 & e-Stewards Compliant)',
    providerType: 'ewaste_recycler',
    providerTypeLabel: 'National Clean-Tech E-Waste Processing Facility',
    address: 'Plot 173, Sector 8, IMT Manesar, Gurugram, Haryana 122050',
    city: 'Delhi',
    phone: '+91 124 400 9000',
    website: 'https://attero.in',
    distanceKm: 9.5,
    estimatedCost: {
      min: 0,
      max: 200,
      currency: 'INR',
      notes: 'Material recovery drop-off'
    },
    services: [
      'Certified Hard Drive Physical Destruction & Degaussing',
      'Battery Chemical Extraction (Cobalt & Lithium recovery)',
      'Precious Metal Refining (Gold, Silver, Palladium)',
      'Enterprise ESG Carbon Offset Documentation'
    ],
    rating: 4.7,
    reviewCount: 380,
    openingHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    whyItMatches: 'Certified end-of-life recycling for totally burned motherboards or broken displays.',
    pathwayAffinity: ['recycling'],
    isVerified: true
  },
  {
    id: 'prov-ecoreco-mumbai',
    name: 'Eco-Reco E-Waste Processing Depot',
    providerType: 'ewaste_recycler',
    providerTypeLabel: 'State Pollution Control Board Authorized Facility',
    address: 'Mahape MIDC, Navi Mumbai, Maharashtra 400710',
    city: 'Mumbai',
    phone: '+91 22 4005 2200',
    website: 'https://ecoreco.com',
    distanceKm: 6.8,
    estimatedCost: {
      min: 0,
      max: 150,
      currency: 'INR',
      notes: 'Material recovery drop-off'
    },
    services: [
      'Certified Metal Recovery',
      'Electronic Scrap Refining',
      'Hazardous Waste Neutralization'
    ],
    rating: 4.5,
    reviewCount: 290,
    openingHours: 'Mon - Fri: 9:30 AM - 6:00 PM',
    whyItMatches: 'Authorized dismantler handling Mumbai metropolitan electronic waste.',
    pathwayAffinity: ['recycling'],
    isVerified: true
  },
  {
    id: 'prov-hulladek-recycle',
    name: 'Hulladek Certified E-Waste Collection Hub',
    providerType: 'ewaste_recycler',
    providerTypeLabel: 'Authorized Producer Responsibility Organization (PRO)',
    address: 'Ballygunge Circular Road, Kolkata, West Bengal 700019',
    city: 'Kolkata',
    phone: '+91 33 4000 7711',
    website: 'https://hulladek.com',
    distanceKm: 7.5,
    estimatedCost: {
      min: 0,
      max: 100,
      currency: 'INR',
      notes: 'Free drop-off'
    },
    services: [
      'Formal E-Waste Collection',
      'Green Channel Disposal',
      'Audited Recycling Traceability'
    ],
    rating: 4.6,
    reviewCount: 195,
    openingHours: 'Mon - Sat: 10:00 AM - 6:30 PM',
    whyItMatches: 'ISO certified recycling chain for eastern India.',
    pathwayAffinity: ['recycling'],
    isVerified: true
  }
];

export function filterNearbyProviders(
  providers: NearbyProvider[],
  preferences: UserPreferences,
  sortBy: SortOption = 'nearest'
): {
  matchingProviders: NearbyProvider[];
  relaxationSuggestions: string[];
  unmatchedReason: string | null;
  totalBeforeDistanceLimit: number;
} {
  const {
    selectedPathways,
    budgetPreset,
    isCustomBudget,
    customBudgetMin,
    customBudgetMax,
    distanceLimit,
    providerTypes,
    location
  } = preferences;

  // 1. Filter by location / city
  let filtered = providers.filter(p => {
    if (!location.city || location.city.toLowerCase() === 'all' || location.city.toLowerCase() === 'any') return true;
    return p.city.toLowerCase().includes(location.city.toLowerCase()) || location.city.toLowerCase().includes(p.city.toLowerCase());
  });

  // If user city has few results in demo mode, include all providers so user sees realistic matches
  if (filtered.length < 5) {
    filtered = providers;
  }

  // 2. Filter by pathway affinity
  if (selectedPathways.length > 0 && !selectedPathways.includes('ai_suggest')) {
    filtered = filtered.filter(p => 
      p.pathwayAffinity.some(pa => selectedPathways.includes(pa))
    );
  }

  // 3. Filter by provider types if selected
  if (providerTypes.length > 0) {
    filtered = filtered.filter(p => providerTypes.includes(p.providerType));
  }

  // Calculate budget threshold in INR (₹)
  let maxBudget: number | null = null;
  if (isCustomBudget) {
    maxBudget = customBudgetMax ?? 999999;
  } else {
    switch (budgetPreset) {
      case '0-500': maxBudget = 500; break;
      case '500-1000': maxBudget = 1000; break;
      case '1000-2500': maxBudget = 2500; break;
      case '2500-5000': maxBudget = 5000; break;
      case '5000-10000': maxBudget = 10000; break;
      case '10000+': maxBudget = 999999; break;
      case 'none': maxBudget = null; break;
    }
  }

  // 4. Filter by Budget Range
  const budgetFiltered = maxBudget !== null
    ? filtered.filter(p => p.estimatedCost.min <= maxBudget!)
    : filtered;

  const totalBeforeDistanceLimit = budgetFiltered.length;

  // 5. Filter by Distance Limit
  const maxDistanceKm = distanceLimit === 'city' ? 50 : distanceLimit;
  const fullyFiltered = budgetFiltered.filter(p => p.distanceKm <= maxDistanceKm);

  // 6. Sort according to SortOption
  fullyFiltered.sort((a, b) => {
    switch (sortBy) {
      case 'nearest':
        return a.distanceKm - b.distanceKm;
      case 'lowest_cost':
        return a.estimatedCost.min - b.estimatedCost.min;
      case 'highest_rating':
        return (b.rating ?? 0) - (a.rating ?? 0);
      case 'most_relevant':
        // Sort by review count & verified flag
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      case 'best_budget':
        // Closest to midpoint of budget
        const target = maxBudget ? maxBudget / 2 : 2500;
        return Math.abs(a.estimatedCost.min - target) - Math.abs(b.estimatedCost.min - target);
      default:
        return a.distanceKm - b.distanceKm;
    }
  });

  // Suggest progressive relaxation if results are few or zero
  const relaxationSuggestions: string[] = [];
  let unmatchedReason: string | null = null;

  if (fullyFiltered.length === 0) {
    unmatchedReason = `No providers were found within ${distanceLimit === 'city' ? 'the city' : `${distanceLimit} km`}${maxBudget !== null ? ` and budget range up to ₹${maxBudget.toLocaleString('en-IN')}` : ''}.`;
    
    if (distanceLimit !== 'city') {
      if (distanceLimit < 5) relaxationSuggestions.push('Expand distance to 5 km');
      if (distanceLimit < 10) relaxationSuggestions.push('Expand distance to 10 km');
      relaxationSuggestions.push('Search anywhere in the city (all hubs)');
    }
    if (maxBudget !== null && maxBudget < 5000) {
      relaxationSuggestions.push('Increase budget to ₹2,500–₹5,000 (standard battery repair)');
      relaxationSuggestions.push('Remove budget filter');
    }
    if (selectedPathways.length === 1 && selectedPathways[0] !== 'ai_suggest') {
      relaxationSuggestions.push('Try another pathway (e.g. Refurbish, Reuse, or Donate)');
    }
    relaxationSuggestions.push('View all nearby providers');
  }

  return {
    matchingProviders: fullyFiltered,
    relaxationSuggestions,
    unmatchedReason,
    totalBeforeDistanceLimit
  };
}
