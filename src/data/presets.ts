import { DeviceInputData } from '../types';

export const PRESET_DEVICES: { id: string; label: string; tag: string; data: DeviceInputData }[] = [
  {
    id: 'dell-laptop-official',
    label: 'Dell Laptop — 5 Years (Official Brief Scenario)',
    tag: 'Battery degraded, core logic functional',
    data: {
      deviceType: 'Laptop',
      brand: 'Dell',
      model: 'Dell Inspiron 15 5000 / Latitude 5400',
      ageYears: 5,
      bootsNormally: true,
      batteryStatus: 'Does not hold charge (0% retention, operates on AC only)',
      displayStatus: 'Working (1080p FHD, no dead pixels)',
      keyboardStatus: 'Working (all keys & trackpad responsive)',
      storageStatus: 'Working (256GB NVMe SSD, boot disk intact)',
      motherboardStatus: 'Functional (POST passes, power rails stable)',
      performanceStatus: 'Moderate (Intel Core i5-8265U / 8GB RAM)',
      physicalBodyStatus: 'Minor damage (light lid scratches, no structural cracks)',
      portsStatus: 'Functional (USB-A, HDMI, audio jack, Type-C ok)',
      osStatus: 'Functional (Windows 10/11 Home, boots to desktop)',
      cpuRamSpecs: 'Intel Core i5 (8th Gen), 8GB DDR4 RAM, 256GB SSD',
      purchaseDate: '2021-03-15',
      userReportedFaults: 'Battery drained instantly upon unplugging charger. Sluggish boot with heavy apps. A few surface scratches on outer top lid.',
      diagnosticResults: 'Dell SupportAssist hardware scan: Battery health degraded (cycle count: 842, replace battery). CPU, Memory, Drive SMART: PASSED.',
      currency: 'INR'
    }
  },
  {
    id: 'broken-display-macbook',
    label: 'MacBook Pro 13" — Shattered Display',
    tag: 'Board works, internal display cracked',
    data: {
      deviceType: 'Laptop',
      brand: 'Apple',
      model: 'MacBook Pro 13" (Four Thunderbolt 3)',
      ageYears: 6,
      bootsNormally: true,
      batteryStatus: 'Moderate (Service recommended, ~68% health)',
      displayStatus: 'Faulty (Internal Retina panel cracked, vertical lines)',
      keyboardStatus: 'Working (Butterfly/Magic keyboard functioning)',
      storageStatus: 'Working (512GB Apple SSD)',
      motherboardStatus: 'Functional (boots, displays fine via external monitor)',
      performanceStatus: 'Good (Intel Core i5, 16GB RAM)',
      physicalBodyStatus: 'Minor damage (minor corner ding, cracked glass)',
      portsStatus: 'Functional (All 4 Thunderbolt ports working)',
      osStatus: 'Functional (macOS Monterey installed)',
      cpuRamSpecs: 'Intel Core i5 2.3GHz quad-core, 16GB LPDDR3, 512GB SSD',
      userReportedFaults: 'Dropped off a coffee table; display glass cracked internally. Boots up and functions normally when connected to an external HDMI/USB-C monitor.',
      diagnosticResults: 'Apple Diagnostics (D key at boot): VFD001 Display issue detected. All other sensors, logic board, and RAM pass test.',
      currency: 'INR'
    }
  },
  {
    id: 'fried-gaming-laptop',
    label: 'Gaming Laptop — Liquid Spilled Motherboard',
    tag: 'Dead motherboard, salvageable parts',
    data: {
      deviceType: 'Laptop',
      brand: 'ASUS',
      model: 'ASUS TUF Gaming FX505',
      ageYears: 4,
      bootsNormally: false,
      batteryStatus: 'Poor (unknown state)',
      displayStatus: 'Working (120Hz 15.6" panel visibly undamaged)',
      keyboardStatus: 'Faulty (Liquid residue on keys)',
      storageStatus: 'Working (512GB M.2 SSD + 1TB HDD intact)',
      motherboardStatus: 'Faulty (No power, burned MOSFET near DC jack)',
      performanceStatus: 'Poor (Non-bootable)',
      physicalBodyStatus: 'Major damage (Sticky spill residue, internal corrosion)',
      portsStatus: 'Faulty (Corroded USB ports)',
      osStatus: 'Problematic (Does not power on)',
      cpuRamSpecs: 'AMD Ryzen 5 3550H, 16GB DDR4, GTX 1650 4GB',
      userReportedFaults: 'Spilled sweetened soda on the keyboard while gaming. Shut off immediately. Smells faintly burnt. Repair shop quoted high board replacement fee.',
      diagnosticResults: 'Independent bench check: 19V rail shorted to ground. Logic board repair deemed non-economical.',
      currency: 'INR'
    }
  }
];
