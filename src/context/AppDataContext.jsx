import { createContext, useContext, useState } from 'react';

import slidingWindowImg from '../assets/sliding window.jpg';

// ---- Initial Mock Data ----
const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'UPVC Sliding Window',
    category: 'windows',
    description: 'Smooth-gliding UPVC sliding window. Perfect for balconies and living rooms.',
    features: ['Multi-point lock', 'UV resistant', 'Low maintenance'],
    pricePerSqft: 380,
    minSize: '2×2 ft',
    popular: true,
    image: slidingWindowImg,
  },
  {
    id: 'p2',
    name: 'UPVC Open Window',
    category: 'windows',
    description: 'Outward-opening UPVC casement window offering maximum ventilation and unobstructed views.',
    features: ['Full ventilation', 'Weather sealed', 'Sound insulation'],
    pricePerSqft: 420,
    minSize: '2×3 ft',
    popular: true,
  },
  {
    id: 'p3',
    name: 'UPVC Toilet Door',
    category: 'doors',
    description: 'Water-resistant UPVC toilet door, completely immune to rotting and warping.',
    features: ['100% Waterproof', 'Easy to clean', 'Frosted glass option'],
    pricePerSqft: 250,
    minSize: '2.5×6.5 ft',
    popular: true,
  },
  {
    id: 'p4',
    name: 'UPVC Office Main Door',
    category: 'doors',
    description: 'Premium UPVC main door for office entrances with secure locking and professional finish.',
    features: ['High security lock', 'Soundproof', 'Heavy-duty hinges'],
    pricePerSqft: 650,
    minSize: '3×7 ft',
    popular: false,
  },
  {
    id: 'p5',
    name: 'Steel Door',
    category: 'doors',
    description: 'High-strength steel security door for ultimate protection against forced entry.',
    features: ['Core steel structure', 'Multi-point locking', 'Wood-grain finish'],
    pricePerSqft: 850,
    minSize: '3×7 ft',
    popular: true,
  },
  {
    id: 'p6',
    name: 'PVC Door',
    category: 'doors',
    description: 'Lightweight and economical PVC door, suitable for internal rooms and bathrooms.',
    features: ['Cost effective', 'Termite proof', 'Various colors'],
    pricePerSqft: 180,
    minSize: '2.5×6.5 ft',
    popular: false,
  },
  {
    id: 'p7',
    name: 'FRP Door',
    category: 'doors',
    description: 'Fiber Reinforced Plastic door, extremely durable and weather resistant for exterior use.',
    features: ['Impact resistant', 'Weatherproof', 'Wood-like texture'],
    pricePerSqft: 450,
    minSize: '3×7 ft',
    popular: false,
  },
  {
    id: 'p8',
    name: 'WPC Door',
    category: 'doors',
    description: 'Wood Plastic Composite door blending the natural look of wood with the durability of plastic.',
    features: ['Eco-friendly', 'Moisture resistant', 'Highly durable'],
    pricePerSqft: 520,
    minSize: '3×7 ft',
    popular: true,
  },
  {
    id: 'p9',
    name: 'UPVC Partition Work',
    category: 'interiors',
    description: 'Quick-installation UPVC partition walls for offices and commercial spaces.',
    features: ['Fast installation', 'Sound reduction', 'Glass options'],
    pricePerSqft: 320,
    minSize: 'Customizable',
    popular: false,
  },
  {
    id: 'p10',
    name: 'Cupboard Works',
    category: 'interiors',
    description: 'Custom interior cupboard works and modular storage solutions.',
    features: ['Custom design', 'Premium finish', 'Space maximizing'],
    pricePerSqft: 600,
    minSize: 'Customizable',
    popular: true,
  },
];

const INITIAL_MATERIALS = [
  {
    id: 'm1',
    name: 'UPVC Profile',
    icon: '🪟',
    description: 'Unplasticized Polyvinyl Chloride — our primary frame material. Chemically inert, rot-proof, and impact-resistant.',
    specs: ['5-chamber profile', '60mm–80mm depth', 'Lead-free formulation', 'RAL color coating option'],
    benefit: 'Lifetime performance without painting or maintenance',
  },
  {
    id: 'm2',
    name: 'Double Glazing Glass',
    icon: '🔲',
    description: 'Two panes of toughened glass separated by an Argon-filled spacer — providing thermal and acoustic insulation.',
    specs: ['4mm–6mm glass panes', '16mm argon spacer', 'U-value 1.1 W/m²K', 'Safety toughened option'],
    benefit: 'Up to 50% energy saving vs single glazing',
  },
  {
    id: 'm4',
    name: 'EPDM Gaskets & Seals',
    icon: '🔄',
    description: 'Ethylene propylene diene monomer rubber seals provide airtight, watertight barrier against the elements.',
    specs: ['Triple point sealing', 'UV resistant compound', '-40°C to +120°C range', 'Flexible memory seal'],
    benefit: 'Zero water ingress, superior draught protection',
  },
  {
    id: 'm5',
    name: 'Multi-Point Locking Hardware',
    icon: '🔐',
    description: 'European-grade stainless steel locking systems with multiple locking points across the sash perimeter.',
    specs: ['Stainless steel grade 316', '3–7 locking points', 'Anti-pick cylinders', 'PAS 24 tested'],
    benefit: 'Certified security against forced entry',
  },
];

const SAMPLE_QUERIES = [
  {
    id: 'q1',
    clientId: 'client-1',
    clientName: 'Rahul Sharma',
    clientEmail: 'client@upvc.com',
    clientPhone: '+91 98765 43210',
    productType: 'Sliding Window',
    width: 4,
    height: 3,
    quantity: 6,
    address: '14/B MG Road, Bengaluru 560001',
    message: 'I need sliding windows for my 2BHK apartment on 5th floor. Please include flyscreen.',
    status: 'replied',
    reply: 'Thank you for your enquiry! For 6 units of 4×3 ft sliding windows with flyscreen, our estimated price is ₹55,000 (including hardware and installation). We can visit your site for a free measurement survey. Please confirm a convenient time.',
    submittedAt: '2026-03-10T10:30:00',
    repliedAt: '2026-03-10T15:00:00',
    estimatedPrice: 55000,
  },
  {
    id: 'q2',
    clientId: 'client-1',
    clientName: 'Rahul Sharma',
    clientEmail: 'client@upvc.com',
    clientPhone: '+91 98765 43210',
    productType: 'French Door',
    width: 6,
    height: 7,
    quantity: 1,
    address: '14/B MG Road, Bengaluru 560001',
    message: 'Need a French door for my garden. Want frosted glass on the lower panels.',
    status: 'pending',
    reply: '',
    submittedAt: '2026-03-12T09:15:00',
    repliedAt: null,
    estimatedPrice: null,
  },
];

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [products] = useState(INITIAL_PRODUCTS);
  const [materials] = useState(INITIAL_MATERIALS);
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem('upvc_queries');
    return saved ? JSON.parse(saved) : SAMPLE_QUERIES;
  });

  const submitQuery = (queryData) => {
    const newQuery = {
      ...queryData,
      id: `q${Date.now()}`,
      status: 'pending',
      reply: '',
      submittedAt: new Date().toISOString(),
      repliedAt: null,
      estimatedPrice: null,
    };
    const updated = [newQuery, ...queries];
    setQueries(updated);
    localStorage.setItem('upvc_queries', JSON.stringify(updated));
    return newQuery;
  };

  const replyToQuery = (queryId, reply, estimatedPrice) => {
    const updated = queries.map(q =>
      q.id === queryId
        ? { ...q, reply, estimatedPrice: Number(estimatedPrice) || null, status: 'replied', repliedAt: new Date().toISOString() }
        : q
    );
    setQueries(updated);
    localStorage.setItem('upvc_queries', JSON.stringify(updated));
  };

  const getClientQueries = (clientId) => queries.filter(q => q.clientId === clientId);

  return (
    <AppDataContext.Provider value={{ products, materials, queries, submitQuery, replyToQuery, getClientQueries }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be inside AppDataProvider');
  return ctx;
}
