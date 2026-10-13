import { useState, useEffect, useMemo, useRef, Fragment } from 'react';
import './Farmer site.css';


const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const goTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const ICONS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
  bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/><path d="M3 13h18"/>',
  sprout: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 15c0-3-2-5-6-5 0 3 2 5 6 5z"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
  bell: '<path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 004 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z"/>',
  droplet: '<path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z"/>',
  cloud: '<path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.7 1.3A3.5 3.5 0 0117 18z"/>',
  rain: '<path d="M7 15a4 4 0 010-8 5.5 5.5 0 0110.7 1.3A3.5 3.5 0 0117 15z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
  wind: '<path d="M3 8h11a3 3 0 10-3-3M3 12h16a3 3 0 11-3 3M3 16h8"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2"/>',
  bug: '<ellipse cx="12" cy="14" rx="4" ry="5"/><path d="M12 9V6M8 11L5 9M16 11l3-2M8 15H4M16 15h4M8 19l-3 2M16 19l3 2M9 5l3 1 3-1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  landmark: '<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M9 9.5c0-1.2 1.3-2 3-2s3 .8 3 2-1.3 1.7-3 2-3 .8-3 2 1.3 2 3 2 3-.8 3-2M12 6v1.5M12 16.5V18"/>',
  sunpanel: '<path d="M4 14l3-8h10l3 8z"/><path d="M12 6v8M6 10h12M9 18l-1 3M15 18l1 3"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M8 15h8"/>',
  store: '<path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0M10 20v-6h4v6"/>',
};

function Icon({ n, s = 20 }) {
  return (
    <svg
      className="ic" width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[n] || '' }}
    />
  );
}

/* ---------- DATA ---------- */
const MARKET = [
  { n: 'Wheat', cat: 'Cereals', p: 2480, msp: 2425, m: 'Karnal Mandi', seed: 1, v: 0.008 },
  { n: 'Paddy (common)', cat: 'Cereals', p: 2290, msp: 2369, m: 'Cuttack Mandi', seed: 2, v: 0.007 },
  { n: 'Maize', cat: 'Cereals', p: 2150, msp: 2400, m: 'Davangere Mandi', seed: 3, v: 0.012 },
  { n: 'Mustard', cat: 'Oilseeds', p: 6020, msp: 6200, m: 'Alwar Mandi', seed: 4, v: 0.01 },
  { n: 'Soybean', cat: 'Oilseeds', p: 4620, msp: 5300, m: 'Indore Mandi', seed: 5, v: 0.011 },
  { n: 'Groundnut', cat: 'Oilseeds', p: 5900, msp: 6700, m: 'Rajkot Mandi', seed: 6, v: 0.01 },
  { n: 'Chana', cat: 'Pulses', p: 5450, msp: 5650, m: 'Akola Mandi', seed: 7, v: 0.009 },
  { n: 'Arhar (tur)', cat: 'Pulses', p: 7350, msp: 7550, m: 'Gulbarga Mandi', seed: 8, v: 0.01 },
  { n: 'Tomato', cat: 'Vegetables', p: 2200, msp: null, m: 'Kolar Mandi', seed: 9, v: 0.05 },
  { n: 'Onion', cat: 'Vegetables', p: 1650, msp: null, m: 'Lasalgaon Mandi', seed: 10, v: 0.03 },
  { n: 'Potato', cat: 'Vegetables', p: 1280, msp: null, m: 'Agra Mandi', seed: 11, v: 0.02 },
  { n: 'Cotton', cat: 'Oilseeds', p: 7150, msp: 7700, m: 'Adilabad Mandi', seed: 12, v: 0.008 },
].map((r) => {
  const R = rng(r.seed * 77), a = [];
  let v = r.p;
  for (let i = 29; i >= 0; i--) { a[i] = v; v = v * (1 + (R() - 0.5) * 2 * r.v + (i > 20 ? 0.001 : 0)); }
  return { ...r, s: a, chg: ((a[29] - a[22]) / a[22]) * 100, hi: Math.max(...a), lo: Math.min(...a) };
});

const SOILS = ['Alluvial', 'Black', 'Red', 'Sandy loam', 'Laterite'];
const SEASONS = ['Kharif', 'Rabi', 'Zaid'];
const WATER = ['Rain-fed', 'Limited irrigation', 'Assured irrigation'];

const CROPS = [
  { n: 'Rice', soil: ['Alluvial', 'Laterite', 'Black'], season: ['Kharif'], w: 3, dur: '120–150 days', yq: 22, pr: 2300, cost: 32000, risk: 'Medium', tip: 'Transplant 21-day seedlings and keep 2 to 5 cm of water in the field.' },
  { n: 'Wheat', soil: ['Alluvial', 'Black', 'Sandy loam'], season: ['Rabi'], w: 2, dur: '110–130 days', yq: 18, pr: 2450, cost: 22000, risk: 'Low', tip: 'Sow by the end of November. Late sowing cuts yield every week.' },
  { n: 'Maize', soil: ['Alluvial', 'Red', 'Sandy loam'], season: ['Kharif', 'Rabi'], w: 2, dur: '90–110 days', yq: 25, pr: 2100, cost: 32000, risk: 'Medium', tip: 'Scout for fall armyworm in the first month after germination.' },
  { n: 'Soybean', soil: ['Black', 'Red'], season: ['Kharif'], w: 1, dur: '95–110 days', yq: 7, pr: 4600, cost: 17000, risk: 'Medium', tip: 'Treat seed with rhizobium culture to cut fertiliser cost.' },
  { n: 'Cotton', soil: ['Black', 'Alluvial'], season: ['Kharif'], w: 2, dur: '160–180 days', yq: 8, pr: 7000, cost: 36000, risk: 'High', tip: 'Plan pest scouting every week from flowering onward.' },
  { n: 'Mustard', soil: ['Alluvial', 'Sandy loam'], season: ['Rabi'], w: 1, dur: '110–140 days', yq: 6, pr: 5800, cost: 17000, risk: 'Low', tip: 'Needs very little water, so one irrigation at flowering is often enough.' },
  { n: 'Chana', soil: ['Black', 'Red', 'Sandy loam'], season: ['Rabi'], w: 1, dur: '100–120 days', yq: 7, pr: 5400, cost: 19000, risk: 'Low', tip: 'Avoid waterlogging. Nip the top shoots at 30 days for more branches.' },
  { n: 'Groundnut', soil: ['Sandy loam', 'Red', 'Laterite'], season: ['Kharif', 'Zaid'], w: 2, dur: '100–120 days', yq: 9, pr: 5800, cost: 30000, risk: 'Medium', tip: 'Loose, well-drained soil lets pods form properly. Apply gypsum at flowering.' },
  { n: 'Moong', soil: ['Sandy loam', 'Alluvial', 'Red'], season: ['Zaid', 'Kharif'], w: 1, dur: '60–70 days', yq: 4, pr: 7200, cost: 12000, risk: 'Low', tip: 'A quick crop that also adds nitrogen to the soil before the next season.' },
  { n: 'Tomato', soil: ['Red', 'Alluvial', 'Sandy loam', 'Laterite'], season: ['Rabi', 'Zaid'], w: 3, dur: '100–120 days', yq: 90, pr: 1800, cost: 100000, risk: 'High', tip: 'Staking and drip irrigation raise quality. Prices swing a lot, so stagger planting.' },
  { n: 'Watermelon', soil: ['Sandy loam'], season: ['Zaid'], w: 2, dur: '80–90 days', yq: 100, pr: 1000, cost: 55000, risk: 'Medium', tip: 'Mulch to keep fruit clean and save water. Harvest when the tendril near the fruit dries.' },
  { n: 'Sugarcane', soil: ['Alluvial', 'Black'], season: ['Kharif', 'Rabi', 'Zaid'], w: 3, dur: '10–12 months', yq: 350, pr: 340, cost: 70000, risk: 'Low', tip: 'A long-duration crop with steady demand. Ratoon crops cut your next-year cost.' },
  { n: 'Arhar (tur)', soil: ['Red', 'Black', 'Laterite'], season: ['Kharif'], w: 1, dur: '150–180 days', yq: 5, pr: 7000, cost: 17000, risk: 'Medium', tip: 'Intercrop with soybean or maize to spread risk.' },
].map((c) => ({ ...c, profit: c.yq * c.pr - c.cost }));

const WD = (() => {
  const R = rng(2026), out = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    const rainy = R() > 0.62;
    const o = {
      name: i ? d.toLocaleDateString('en-IN', { weekday: 'short' }) : 'Today',
      hi: Math.round(28 + R() * 8), lo: Math.round(20 + R() * 5),
      rain: rainy ? Math.round(55 + R() * 40) : Math.round(R() * 28),
      wind: Math.round(6 + R() * 14), mm: 0,
    };
    o.mm = Math.round(o.rain > 50 ? o.rain / 4 + R() * 8 : o.rain / 10);
    out.push(o);
  }
  out[0] = { ...out[0], hi: 31, lo: 23, rain: 20, wind: 9, mm: 1 };
  return out;
})();

const NEEDS = [
  ['Money support', 'money'], ['Crop insurance', 'insure'], ['A crop loan', 'loan'],
  ['Test my soil', 'soil'], ['Irrigation or solar pump', 'water'], ['Better selling price', 'sell'],
];
const SCHEMES = [
  { n: 'PM-KISAN', ic: 'coin', tint: 't-g', tag: ['money'], big: 'Up to ₹6,000 a year in 3 installments', d: 'Direct income support paid to the bank account of landholding farmer families.', steps: ['Keep Aadhaar and land records ready', 'Register on the PM-KISAN portal or at a Common Service Centre', 'Complete e-KYC so payments are not held'], url: 'https://pmkisan.gov.in' },
  { n: 'PM Fasal Bima Yojana', ic: 'shield', tint: 't-b', tag: ['insure'], big: 'Farmer premium of 2% (Kharif) and 1.5% (Rabi)', d: 'Insurance against crop loss from drought, flood, hail, pests and disease.', steps: ['Enrol before the cut-off date for your crop', 'Apply through your bank, CSC or the portal', 'Report any loss within 72 hours'], url: 'https://pmfby.gov.in' },
  { n: 'Kisan Credit Card', ic: 'landmark', tint: 't-a', tag: ['loan'], big: 'Low-interest crop loans with interest subvention', d: 'Flexible credit for seed, fertiliser and other inputs, with prompt-repayment benefits.', steps: ['Visit your bank or cooperative society', 'Carry Aadhaar, land record and photos', 'Repay on time to keep the interest benefit'] },
  { n: 'Soil Health Card', ic: 'flask', tint: 't-g', tag: ['soil'], big: 'Free soil test and fertiliser advice', d: 'Know your soil nutrients and apply only what your field needs, saving money.', steps: ['Collect a soil sample from your field', 'Submit it at the nearest testing lab or KVK', 'Receive your card with crop-wise advice'], url: 'https://soilhealth.dac.gov.in' },
  { n: 'PM-KUSUM', ic: 'sunpanel', tint: 't-b', tag: ['water', 'money'], big: 'Subsidy on solar pumps', d: 'Replace diesel pumps with solar pumps and cut your irrigation cost.', steps: ['Check your state nodal agency for the current subsidy', 'Apply with land and bank details', 'Install through an approved vendor'], url: 'https://pmkusum.mnre.gov.in' },
  { n: 'eNAM', ic: 'store', tint: 't-a', tag: ['sell'], big: 'Sell online across mandis', d: 'Compare bids from many traders and get paid directly in your bank account.', steps: ['Register on the eNAM portal', 'Link bank account and upload ID', 'Take produce to a connected mandi and track bids online'], url: 'https://enam.gov.in' },
];

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// S = sowing, G = growing, H = harvest, - = off season (Jan to Dec)
const CAL = {
  Rice: '-----SSGGHH-', Maize: '-----SSGHH--', Soybean: '-----SSGGH--', Groundnut: '-----SSGGH--',
  Cotton: '---SSGGGGHHH', Wheat: 'GGHH------SS', Mustard: 'GHH------SGG', Chana: 'GHH------SSG',
  Potato: 'GHH------SGG', Tomato: 'HH------SSGH', Moong: '--SGHH------', Watermelon: '-SGGH-------',
};
const STAGE = { S: 'Sowing', G: 'Growing', H: 'Harvest', '-': 'Off season' };

const DOC = {
  Rice: [
    { s: 'Diamond-shaped grey spots on leaves', n: 'Rice blast', sev: 'High', a: ['Drain excess water and avoid heavy nitrogen', 'Remove badly affected plants', 'Get the right fungicide and dose from your KVK'], p: 'Use resistant varieties and treat seed before sowing.' },
    { s: 'Dead central shoot that pulls out easily', n: 'Stem borer (dead heart)', sev: 'Medium', a: ['Remove and destroy affected tillers', 'Set pheromone traps in the field', 'Ask your KVK about safe control in your area'], p: 'Plant on time and clear stubble after harvest.' },
    { s: 'Yellowing older leaves and stunted growth', n: 'Nitrogen shortage', sev: 'Low', a: ['Top-dress with nitrogen as per your soil test', 'Split the dose instead of applying all at once', 'Keep the field evenly irrigated'], p: 'Take a soil health card test every two years.' },
  ],
  Wheat: [
    { s: 'Orange-yellow powder on leaves in stripes', n: 'Yellow rust', sev: 'High', a: ['Inspect nearby fields and report early to your KVK', 'Spray the recommended fungicide quickly', 'Avoid late irrigation in humid weather'], p: 'Grow rust-resistant varieties.' },
    { s: 'White powdery patches on leaves', n: 'Powdery mildew', sev: 'Medium', a: ['Improve spacing and airflow', 'Avoid too much nitrogen', 'Use the fungicide recommended locally'], p: 'Sow on time with certified seed.' },
    { s: 'Pale patches and yellow tips on young leaves', n: 'Zinc or nitrogen deficiency', sev: 'Low', a: ['Check your soil test report', 'Apply zinc sulphate if advised', 'Avoid waterlogging'], p: 'Apply balanced fertiliser based on soil testing.' },
  ],
  Tomato: [
    { s: 'Dark rings on lower leaves', n: 'Early blight', sev: 'Medium', a: ['Remove infected lower leaves', 'Water at the base, not over leaves', 'Ask your KVK for the right fungicide'], p: 'Rotate crops and stake plants for airflow.' },
    { s: 'Curling, yellow, crinkled leaves', n: 'Leaf curl virus (spread by whitefly)', sev: 'High', a: ['Uproot and bury badly infected plants', 'Use yellow sticky traps for whitefly', 'Control whitefly early with advised measures'], p: 'Use net-covered nurseries and tolerant varieties.' },
    { s: 'Water-soaked brown patches with white fuzz', n: 'Late blight', sev: 'High', a: ['Act within a day or two, as it spreads fast', 'Remove infected plants and avoid overhead watering', 'Get the right fungicide from your KVK'], p: 'Avoid planting in cool, damp, crowded conditions.' },
  ],
  Cotton: [
    { s: 'Pink worms inside bolls, rosette flowers', n: 'Pink bollworm', sev: 'High', a: ['Scout 20 plants in different spots each week', 'Use pheromone traps to track moths', 'Follow KVK advice on timing of control'], p: 'Sow on time, avoid very long-duration varieties and destroy stalks after picking.' },
    { s: 'Upward curling leaves and stunted plants', n: 'Cotton leaf curl virus', sev: 'High', a: ['Remove early infected plants', 'Control whitefly with advised measures', 'Avoid planting near older cotton or okra'], p: 'Use tolerant hybrids and keep weeds down.' },
  ],
  Maize: [
    { s: 'Ragged holes in leaves, sawdust-like droppings in the whorl', n: 'Fall armyworm', sev: 'High', a: ['Check 5% of plants weekly in the first 6 weeks', 'Hand-pick egg masses and young larvae if few', 'Use the control your KVK recommends'], p: 'Sow early and together with neighbours so pests do not move between fields.' },
    { s: 'Long grey-green lesions on leaves', n: 'Turcicum leaf blight', sev: 'Medium', a: ['Remove crop residue from nearby fields', 'Avoid dense planting', 'Ask your KVK about a suitable fungicide'], p: 'Grow resistant hybrids and rotate crops.' },
  ],
  Potato: [
    { s: 'Brown water-soaked patches, white mould underneath', n: 'Late blight', sev: 'High', a: ['Act within a day or two, as it spreads fast', 'Cut and destroy infected haulms', 'Earth up well so tubers stay covered'], p: 'Use healthy certified seed and watch the weather in cool, foggy spells.' },
    { s: 'Small circular spots with rings on older leaves', n: 'Early blight', sev: 'Medium', a: ['Remove badly affected leaves', 'Keep plants well fed and watered', 'Ask your KVK about the right fungicide'], p: 'Rotate crops for 2 to 3 years.' },
  ],
};

/* ---------- small shared pieces ---------- */
function Chips({ items, value, onChange }) {
  return (
    <>
      {items.map((i) => (
        <button key={i} className="chip" aria-pressed={i === value} onClick={() => onChange(i)}>{i}</button>
      ))}
    </>
  );
}

function SectionHead({ id, icon, title, children }) {
  return (
    <div className="sec-h">
      <h2><span className="hi"><Icon n={icon} s={24} /></span>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function Count({ to, suffix = '', fmt }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf; const t0 = performance.now();
    const f = (t) => {
      const p = Math.min(1, (t - t0) / 1600);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{fmt ? fmt(v) : Math.round(v).toLocaleString('en-IN')}{suffix}</>;
}

function FarmerNav({ dark, onTheme }) {
  const [open, setOpen] = useState(false);
  const links = [['home', 'Home'], ['grid', 'Schemes'], ['cap', 'Students'], ['bag', 'Jobs'], ['sprout', 'Farmers'], ['cog', 'Services'], ['bell', 'Notifications']];
  return (
    <header className="nav">
      <div className="nav-in">
        <a className="brand" href="/" aria-label="Rural Development home">
          <span className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f4d24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19c0-9 5-14 15-14 0 10-5 15-15 15z" /><path d="M5 19l8-8" /></svg>
          </span>
          <span><b>Rural <i>Development</i></b><small>Connecting Villages to Opportunities</small></span>
        </a>
        <nav className={`menu ${open ? 'open' : ''}`} aria-label="Main">
          {links.map(([ic, t]) => (
            <a key={t} href="#" className={t === 'Farmers' ? 'on' : ''} aria-current={t === 'Farmers' ? 'page' : undefined} onClick={(e) => e.preventDefault()}>
              <Icon n={ic} s={18} />{t}
              {t === 'Notifications' && <span className="badge">3</span>}
            </a>
          ))}
        </nav>
        <div className="nav-act">
          <button className="round" onClick={onTheme} aria-label="Switch light or dark theme"><Icon n={dark ? 'sun' : 'moon'} /></button>
          
          <a className="btn-solid" href="#">Farmers</a>
          <button className="round burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><Icon n="menu" /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
  return (
    <section className="hero" id="fc-top">
      <svg className="scene" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fffbe0" stopOpacity=".95" />
            <stop offset=".35" stopColor="#ffe9a8" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffd18a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fb04a" /><stop offset=".5" stopColor="#3e8f3f" /><stop offset="1" stopColor="#1e6a33" />
          </linearGradient>
          <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9674a" stopOpacity=".75" /><stop offset="1" stopColor="#d98a5a" stopOpacity=".3" />
          </linearGradient>
        </defs>
        <g className="sun">
          <circle cx="1010" cy="400" r="300" fill="url(#glow)" />
          <circle cx="1010" cy="400" r="62" fill="#fffbe6" />
          <g stroke="#fff6cf" strokeWidth="3" strokeLinecap="round" opacity=".75">
            <path d="M1010 290v-70M1010 510v70M900 400h-70M1120 400h70M932 322l-50-50M1088 322l50-50M932 478l-50 50M1088 478l50 50" />
          </g>
        </g>
        <path d="M300 440 L520 330 L640 400 L820 300 L1010 420 L1200 320 L1440 430 L1440 470 L300 470Z" fill="url(#far)" />
        <path d="M0 470 Q220 400 420 450 T820 440 T1180 430 T1440 450 L1440 640 L0 640Z" fill="#6f9f4c" opacity=".85" />
        <path d="M0 500 L1440 480 L1440 640 L0 640Z" fill="url(#field)" />
        <g stroke="#fff" strokeOpacity=".2" strokeWidth="2">
          <path d="M900 490 L-500 640M900 490 L-300 640M900 490 L-100 640M900 490 L100 640M900 490 L300 640M900 490 L500 640M900 490 L700 640M900 490 L900 640M900 490 L1100 640M900 490 L1300 640M900 490 L1500 640M900 490 L1700 640M900 490 L1900 640M900 490 L2100 640" />
        </g>
        <g stroke="#12284a" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".55">
          <path d="M520 150q12-12 24 0q12-12 24 0M600 110q9-9 18 0q9-9 18 0M470 210q9-9 18 0q9-9 18 0" />
        </g>
      </svg>

      <p className="hand">Healthy soil,<br />happy farmer</p>

      <div className="hero-in">
        <div>
          <span className="pill"><Icon n="sprout" s={16} />Farmer Corner</span>
          <h1>Smarter farming,<br />better harvests</h1>
          <p className="lead">Live mandi prices, weather advisories, crop guidance and government support. Everything a farmer needs, in one place.</p>
          <div className="cta">
            <a className="btn-solid lg" href="#prices" onClick={(e) => goTo(e, 'prices')}>Check mandi prices</a>
            <a className="btn-light lg" href="#advisor" onClick={(e) => goTo(e, 'advisor')}>Find the right crop</a>
          </div>
        </div>

        <aside className="glass" aria-label="Field conditions today">
          <div className="fh"><span>{today} in your field</span><span className="tag">Sample data</span></div>
          <div className="temp"><strong>31°</strong><span>Partly cloudy<br />Feels like 34°C</span></div>
          <div className="mini">
            <div><Icon n="droplet" /><b>68%</b><small>Humidity</small></div>
            <div><Icon n="wind" /><b>9 km/h</b><small>Wind</small></div>
            <div><Icon n="cloud" /><b>20%</b><small>Rain chance</small></div>
          </div>
          <div className="soil">Soil moisture: 62%<div className="bar"><i /></div></div>
          <div className="adv"><Icon n="check" s={18} /><span>Good day to spray. Finish before 10 AM when the wind is calm.</span></div>
        </aside>
      </div>
    </section>
  );
}

function StatsAndTicker() {
  const stats = [
    { ic: 'sprout', bg: 'var(--green-soft)', c: 'var(--green)', to: 2000000, suf: '+', fmt: (v) => (v / 1e6).toFixed(1) + 'M', l: 'Farmers connected' },
    { ic: 'landmark', bg: 'var(--amber-soft)', c: 'var(--amber)', to: 48, suf: '', l: 'Farmer schemes' },
    { ic: 'trend', bg: 'var(--blue-soft)', c: 'var(--blue)', to: 1200, suf: '+', l: 'Mandis tracked' },
    { ic: 'phone', bg: 'var(--rose-soft)', c: 'var(--rose)', to: 35, suf: 'K+', l: 'Advisories sent daily' },
  ];
  return (
    <div className="stats">
      <div className="wrap">
        <div className="stats-in">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <span className="ci" style={{ background: s.bg, color: s.c }}><Icon n={s.ic} s={24} /></span>
              <div><b><Count to={s.to} suffix={s.suf} fmt={s.fmt} /></b><small>{s.l}</small></div>
            </div>
          ))}
        </div>
        <div className="ticker" aria-label="Mandi price ticker">
          <span className="live">Mandi live</span>
          <div className="tk-view">
            <div className="tk-track">
              {[...MARKET, ...MARKET].map((r, i) => (
                <span className="tk" key={i}>
                  <span>{r.n}</span><span>{inr(r.p)}</span>
                  <span className={r.chg >= 0 ? 'up' : 'dn'}>{r.chg >= 0 ? '▲' : '▼'} {Math.abs(r.chg).toFixed(1)}%</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SUB = [
  ['prices', 'trend', 'Mandi prices'], ['advisor', 'sprout', 'Crop advisor'], ['weather', 'cloud', 'Weather'],
  ['schemes', 'landmark', 'Schemes'], ['calc', 'calc', 'Calculators'], ['calendar', 'calendar', 'Crop calendar'], ['doctor', 'bug', 'Crop doctor'],
];

function SubNav() {
  const [active, setActive] = useState('prices');
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SUB.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <div className="subnav">
      <div className="wrap">
        {SUB.map(([id, ic, t]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={(e) => goTo(e, id)}><Icon n={ic} s={16} />{t}</a>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MANDI PRICES
   ========================================================= */
function Spark({ a, up }) {
  const w = 84, h = 28, mn = Math.min(...a), mx = Math.max(...a);
  const pts = a.map((v, i) => `${((i * w) / (a.length - 1)).toFixed(1)},${(h - 3 - ((v - mn) / (mx - mn || 1)) * (h - 6)).toFixed(1)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? 'var(--green)' : 'var(--rose)'} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function PriceChart({ r }) {
  const [hov, setHov] = useState(null);
  const ref = useRef(null);
  const W = 640, H = 260, p = { l: 54, r: 14, t: 16, b: 28 }, s = r.s;
  const lo = Math.min(...s, r.msp ?? 1e9) * 0.97, hi = Math.max(...s, r.msp ?? 0) * 1.03;
  const x = (i) => p.l + (i * (W - p.l - p.r)) / (s.length - 1);
  const y = (v) => p.t + (1 - (v - lo) / (hi - lo)) * (H - p.t - p.b);
  const line = s.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join('');
  const area = `${line}L${x(s.length - 1)} ${H - p.b}L${x(0)} ${H - p.b}Z`;
  const dl = (i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); };
  const onMove = (e) => {
    const b = ref.current.getBoundingClientRect();
    const px = ((e.clientX - b.left) / b.width) * W;
    setHov(Math.max(0, Math.min(s.length - 1, Math.round((px - p.l) / ((W - p.l - p.r) / (s.length - 1))))));
  };
  const idx = hov ?? s.length - 1;
  return (
    <div className="chart">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`30 day price chart for ${r.n}`} onPointerMove={onMove} onPointerLeave={() => setHov(null)}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#17803d" stopOpacity=".3" /><stop offset="1" stopColor="#17803d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => {
          const v = lo + ((hi - lo) * i) / 3, yy = y(v);
          return (
            <g key={i}>
              <line x1={p.l} x2={W - p.r} y1={yy} y2={yy} stroke="var(--line)" />
              <text x={p.l - 8} y={yy + 4} textAnchor="end" fontSize="11" fill="var(--muted)" fontWeight="600">{Math.round(v).toLocaleString('en-IN')}</text>
            </g>
          );
        })}
        {[0, 10, 20, 29].map((i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === 29 ? 'end' : 'middle'} fontSize="11" fill="var(--muted)" fontWeight="600">{dl(i)}</text>
        ))}
        {r.msp && (
          <>
            <line x1={p.l} x2={W - p.r} y1={y(r.msp)} y2={y(r.msp)} stroke="var(--amber)" strokeWidth="2" strokeDasharray="6 5" />
            <text x={W - p.r} y={y(r.msp) - 6} textAnchor="end" fontSize="11" fill="var(--amber)" fontWeight="700">MSP {inr(r.msp)}</text>
          </>
        )}
        <path d={area} fill="url(#ag)" />
        <path d={line} fill="none" stroke="var(--green)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <circle r="6" fill="var(--green)" stroke="var(--surface)" strokeWidth="3" cx={x(idx)} cy={y(s[idx])} />
      </svg>
      {hov !== null && (
        <div className="tip" style={{ left: `${(x(hov) / W) * 100}%`, top: `${(y(s[hov]) / H) * 100}%` }}>{dl(hov)}: {inr(s[hov])}</div>
      )}
    </div>
  );
}

function MandiPrices({ toast }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(MARKET[0].n);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(-1);

  const rows = useMemo(() => {
    const list = MARKET.filter((r) => (cat === 'All' || r.cat === cat) && r.n.toLowerCase().includes(q.toLowerCase()));
    return sortKey ? [...list].sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir) : list;
  }, [cat, q, sortKey, sortDir]);

  const toggleSort = (k) => {
    if (sortKey === k) setSortDir((d) => -d);
    else { setSortKey(k); setSortDir(-1); }
  };

  const r = MARKET.find((x) => x.n === sel);
  const diff = r.msp ? ((r.p - r.msp) / r.msp) * 100 : null;

  return (
    <section className="sec" id="prices">
      <SectionHead icon="trend" title="Mandi prices">Compare today's market rate with the government minimum support price (MSP). Select any crop to see its 30-day trend.</SectionHead>
      <div className="g2">
        <div className="card">
          <div className="row">
            <div className="row"><Chips items={['All', 'Cereals', 'Pulses', 'Oilseeds', 'Vegetables']} value={cat} onChange={setCat} /></div>
            <span className="sp" />
            <label className="search"><Icon n="search" s={16} /><input placeholder="Search crop" aria-label="Search crop" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          </div>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Crop</th>
                  <th><button onClick={() => toggleSort('p')}>Price per quintal ⇅</button></th>
                  <th><button onClick={() => toggleSort('chg')}>7-day ⇅</button></th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {rows.length ? rows.map((m) => (
                  <tr key={m.n} className={`rowc ${m.n === sel ? 'sel' : ''}`} tabIndex={0} onClick={() => setSel(m.n)} onKeyDown={(e) => e.key === 'Enter' && setSel(m.n)}>
                    <td>{m.n}<small>{m.m}</small></td>
                    <td>{inr(m.p)}</td>
                    <td className={m.chg >= 0 ? 'up' : 'dn'}>{m.chg >= 0 ? '▲' : '▼'} {Math.abs(m.chg).toFixed(1)}%</td>
                    <td><Spark a={m.s.slice(-14)} up={m.chg >= 0} /></td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="note" style={{ padding: 24 }}>No crop found. Try a different name or category.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="note" style={{ marginTop: 12 }}>Sample figures for demonstration. Connect the Agmarknet or eNAM open data API for live rates.</p>
        </div>

        <div className="card">
          <div className="row">
            <h3 style={{ fontSize: 22, letterSpacing: '-.02em' }}>{r.n}</h3>
            <span className="sp" />
            <button className="btn-solid" style={{ padding: '9px 16px' }} onClick={() => toast(`Alert set: we will tell you when ${r.n} crosses ${inr(r.p * 1.03)}`)}>
              <Icon n="bell" s={16} />Set price alert
            </button>
          </div>
          <p className="note">{r.m} · 30-day price trend</p>
          <PriceChart key={r.n} r={r} />
          <div className="kpis">
            <div><small>Today</small><b>{inr(r.p)}</b></div>
            <div><small>30-day high / low</small><b>{inr(r.hi)} / {inr(r.lo)}</b></div>
            <div><small>vs MSP</small><b className={diff == null ? '' : diff >= 0 ? 'up' : 'dn'}>{diff == null ? 'No MSP' : `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`}</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CROP ADVISOR
   ========================================================= */
function Ring({ p }) {
  const r = 32, c = 2 * Math.PI * r;
  const col = p >= 80 ? 'var(--green)' : p >= 55 ? 'var(--amber)' : 'var(--rose)';
  return (
    <div className="ring">
      <svg width="78" height="78" viewBox="0 0 78 78">
        <circle cx="39" cy="39" r={r} fill="none" stroke="var(--line)" strokeWidth="8" />
        <circle cx="39" cy="39" r={r} fill="none" stroke={col} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(c * p) / 100} ${c}`} transform="rotate(-90 39 39)" />
      </svg>
      <b>{p}%</b>
    </div>
  );
}

function CropAdvisor() {
  const [soil, setSoil] = useState('Alluvial');
  const [season, setSeason] = useState('Rabi');
  const [water, setWater] = useState('Limited irrigation');
  const [acres, setAcres] = useState(3);

  const { top, more } = useMemo(() => {
    const wi = WATER.indexOf(water) + 1;
    const list = CROPS.map((c) => {
      let s = 0; const why = [], warn = [];
      if (c.season.includes(season)) { s += 40; why.push(`grows well in ${season}`); } else warn.push(`is normally grown in ${c.season.join(' or ')}`);
      if (c.soil.includes(soil)) { s += 40; why.push(`suits ${soil.toLowerCase()} soil`); } else { s += 8; warn.push(`prefers ${c.soil.join(', ').toLowerCase()} soil`); }
      if (wi >= c.w) { s += 20; why.push('your water supply is enough'); }
      else if (wi === c.w - 1) { s += 10; warn.push('needs a little more water than you have'); }
      else { s += 2; warn.push('needs much more water than you have'); }
      return { ...c, score: s, why, warn };
    }).sort((a, b) => b.score - a.score || b.profit - a.profit);
    return { top: list.slice(0, 3), more: list.slice(3, 6) };
  }, [soil, season, water]);

  return (
    <section className="sec" id="advisor">
      <SectionHead icon="sprout" title="Crop advisor">Tell us about your land and we will rank the crops that fit best, with expected profit for your acreage.</SectionHead>
      <div className="g2b">
        <div className="card stack">
          <div className="field"><span className="lab">Soil type</span><div className="opts"><Chips items={SOILS} value={soil} onChange={setSoil} /></div></div>
          <div className="field"><span className="lab">Season</span><div className="opts"><Chips items={SEASONS} value={season} onChange={setSeason} /></div></div>
          <div className="field"><span className="lab">Water available</span><div className="opts"><Chips items={WATER} value={water} onChange={setWater} /></div></div>
          <div className="field">
            <span className="lab">Land size: {acres} acres</span>
            <input type="range" min="1" max="25" value={acres} onChange={(e) => setAcres(+e.target.value)} aria-label="Land size in acres" />
          </div>
        </div>
        <div className="res">
          {top.map((c, i) => (
            <div key={c.n} className={`crop ${i ? '' : 'first'}`}>
              <Ring p={c.score} />
              <div>
                <h4>{c.n}{i === 0 && <span className="risk r-Low">Best match</span>}<span className={`risk r-${c.risk}`}>{c.risk} risk</span></h4>
                <p>
                  {c.why.length > 0 && `Why: ${c.why.join(', ')}. `}
                  {c.warn.length > 0 && `Note: this crop ${c.warn.join(', and ')}.`}
                </p>
                <div className="facts"><span>{c.dur}</span><span>{c.yq} q per acre</span><span>Est. profit {inr(c.profit * acres)}</span></div>
                <p style={{ marginTop: 10 }}><b style={{ color: 'var(--ink)' }}>Tip:</b> {c.tip}</p>
              </div>
            </div>
          ))}
          <p className="note">Also consider: {more.map((m) => m.n).join(', ')}. Profit is an estimate for {acres} acre{acres > 1 ? 's' : ''} using sample prices and costs.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WEATHER
   ========================================================= */
const wIcon = (d) => (d.rain > 50 ? 'rain' : d.rain > 25 ? 'cloud' : 'sun');

function Weather() {
  const [sel, setSel] = useState(0);
  const d = WD[sel];
  const spray = d.rain < 30 && d.wind < 13
    ? ['Good spray window', 'Rain chance is low and wind is calm. Spray early morning and avoid midday heat.']
    : d.rain >= 50
      ? ['Do not spray', 'Rain will wash the spray off. Wait for a dry, calm day.']
      : ['Spray with care', 'Wind or rain risk is moderate. Spray in the calm early hours only.'];
  const irr = d.rain >= 50
    ? ['Skip irrigation', 'Expected rain will water the crop. Clear field drains to avoid waterlogging.']
    : d.hi >= 34
      ? ['Irrigate early or late', 'High heat. Water at dawn or evening to cut evaporation loss.']
      : ['Irrigate if soil is dry', 'Check moisture 5 cm deep. Water only if it feels dry.'];
  const work = d.rain >= 50
    ? ['Protect harvested grain', 'Cover or move produce under shelter. Delay harvesting and drying.']
    : ['Good for field work', 'Dry weather suits weeding, harvesting and drying grain in the open.'];
  const tiles = [[spray, 't-g', 'flask'], [irr, 't-b', 'droplet'], [work, 't-a', 'sprout']];

  return (
    <section className="sec" id="weather">
      <SectionHead icon="cloud" title="Weather and field advice">Pick a day to see what to do in the field. Advice changes with rain, wind and heat.</SectionHead>
      <div className="days">
        {WD.map((w, i) => (
          <button key={i} className="day" aria-pressed={i === sel} onClick={() => setSel(i)}>
            <b>{w.name}</b><Icon n={wIcon(w)} s={30} /><span>{w.hi}°</span><small>{w.lo}° · {w.rain}%</small>
          </button>
        ))}
      </div>
      <div className="adv-grid">
        {tiles.map(([t, c, ic]) => (
          <div key={c} className={`tile ${c}`}><div className="ci"><Icon n={ic} s={22} /></div><h3>{t[0]}</h3><p>{t[1]}</p></div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <div className="row"><h3 style={{ fontSize: 17 }}>Expected rainfall this week</h3><span className="sp" /><span className="tag" style={{ background: 'var(--surface-2)' }}>Sample data</span></div>
        <div className="rain">
          {WD.map((w, i) => (
            <div key={i}><span>{w.mm} mm</span><i style={{ height: Math.max(4, w.mm * 3.2) }} />{w.name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SCHEMES
   ========================================================= */
function Schemes() {
  const [need, setNeed] = useState(null);
  return (
    <section className="sec" id="schemes">
      <SectionHead icon="landmark" title="Schemes for farmers">What do you need right now? Choose an option and we will highlight the schemes that can help.</SectionHead>
      <div className="row">
        {NEEDS.map(([label, key]) => (
          <button key={key} className="chip" aria-pressed={need === key} onClick={() => setNeed(need === key ? null : key)}>{label}</button>
        ))}
      </div>
      <div className="sg">
        {SCHEMES.map((s) => {
          const hit = need && s.tag.includes(need);
          return (
            <article key={s.n} className={`sc ${s.tint} ${hit ? 'hit' : ''} ${need && !hit ? 'dim' : ''}`}>
              {hit && <span className="match">Likely match</span>}
              <div className="ci"><Icon n={s.ic} s={24} /></div>
              <h3>{s.n}</h3>
              <div className="big">{s.big}</div>
              <p>{s.d}</p>
              <details>
                <summary>How to apply</summary>
                <ol>{s.steps.map((x) => <li key={x}>{x}</li>)}</ol>
              </details>
              {s.url && <a className="lk" href={s.url} target="_blank" rel="noopener noreferrer">Official portal <Icon n="arrow" s={15} /></a>}
            </article>
          );
        })}
      </div>
      <p className="note" style={{ marginTop: 14 }}>Benefits and rules change. Always confirm details on the official portal or at your nearest Krishi Vigyan Kendra.</p>
    </section>
  );
}

/* =========================================================
   CALCULATORS
   ========================================================= */
const COST_SPLIT = [0.08, 0.25, 0.35, 0.15, 0.17];
const COST_NAMES = ['Seed', 'Fertiliser', 'Labour', 'Irrigation', 'Other'];
const COST_COLORS = ['#4f8ef0', '#6fc489', '#f2a93b', '#7c6ff0', '#c8a0c8'];
const costsFor = (c) => COST_SPLIT.map((r) => Math.round((c.cost * r) / 100) * 100);

function ProfitCalc() {
  const [crop, setCrop] = useState(CROPS[0].n);
  const [acres, setAcres] = useState(3);
  const [yq, setYq] = useState(CROPS[0].yq);
  const [price, setPrice] = useState(CROPS[0].pr);
  const [ks, setKs] = useState(costsFor(CROPS[0]));

  const onCrop = (n) => {
    const c = CROPS.find((x) => x.n === n);
    setCrop(n); setYq(c.yq); setPrice(c.pr); setKs(costsFor(c));
  };
  const setK = (i, v) => setKs((arr) => arr.map((x, j) => (j === i ? v : x)));

  const ac = +acres || 0, y = +yq || 0, pr = +price || 0, kn = ks.map((k) => +k || 0);
  const rev = ac * y * pr, cost = ac * kn.reduce((a, b) => a + b, 0), net = rev - cost, tot = Math.max(cost, 1);
  const labels = ['Seed (₹ per acre)', 'Fertiliser and spray', 'Labour', 'Irrigation and fuel', 'Other costs (transport, rent)'];

  return (
    <div className="g2b" style={{ gap: 26 }}>
      <div className="form2">
        <div className="field full"><label htmlFor="cCrop">Crop</label>
          <select id="cCrop" className="input" value={crop} onChange={(e) => onCrop(e.target.value)}>{CROPS.map((c) => <option key={c.n}>{c.n}</option>)}</select>
        </div>
        <div className="field"><label htmlFor="cAcres">Land (acres)</label><input id="cAcres" className="input" type="number" min="0.5" step="0.5" value={acres} onChange={(e) => setAcres(e.target.value)} /></div>
        <div className="field"><label htmlFor="cYield">Yield (quintal per acre)</label><input id="cYield" className="input" type="number" min="0" step="0.5" value={yq} onChange={(e) => setYq(e.target.value)} /></div>
        <div className="field full"><label htmlFor="cPrice">Selling price (₹ per quintal)</label><input id="cPrice" className="input" type="number" min="0" step="50" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        {labels.map((l, i) => (
          <div key={l} className={`field ${i === 4 ? 'full' : ''}`}>
            <label htmlFor={`k${i}`}>{l}</label>
            <input id={`k${i}`} className="input" type="number" min="0" value={ks[i]} onChange={(e) => setK(i, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="out">
        <div className={`net ${net < 0 ? 'loss' : ''}`}>
          <small>{net < 0 ? 'Estimated loss' : 'Estimated profit'}</small>
          <b>{inr(Math.abs(net))}</b>
          <small>{ac ? `${inr(net / ac)} per acre` : ''}{cost && y * ac ? ` · break-even price ${inr(cost / (ac * y))} per quintal` : ''}</small>
        </div>
        <div className="cmp">
          <div><span>Income</span><i style={{ width: `${rev ? 100 : 0}%`, background: 'var(--green)' }} /><b>{inr(rev)}</b></div>
          <div><span>Cost</span><i style={{ width: `${rev ? Math.min(100, (cost / rev) * 100) : 100}%`, background: 'var(--amber)' }} /><b>{inr(cost)}</b></div>
        </div>
        <div>
          <span className="lab">Where the cost goes</span>
          <div className="seg" style={{ marginTop: 8 }}>
            {kn.map((k, i) => <i key={i} style={{ width: `${((k * ac) / tot) * 100}%`, background: COST_COLORS[i] }} />)}
          </div>
          <div className="leg">{kn.map((k, i) => <span key={i} style={{ '--c': COST_COLORS[i] }}>{COST_NAMES[i]} {inr(k * ac)}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function LoanCalc() {
  const [amt, setAmt] = useState(100000);
  const [rate, setRate] = useState(7);
  const [mon, setMon] = useState(9);
  const [sub, setSub] = useState(3);

  const r = +rate || 0, m = +mon || 1, s = +sub || 0, eff = Math.max(0, r - s);
  const full = ((amt * r) / 100 * m) / 12, withSub = ((amt * eff) / 100 * m) / 12;

  return (
    <div className="g2b" style={{ gap: 26 }}>
      <div className="form2">
        <div className="field full"><label htmlFor="lAmt">Loan amount: {inr(amt)}</label><input id="lAmt" type="range" min="10000" max="500000" step="5000" value={amt} onChange={(e) => setAmt(+e.target.value)} /></div>
        <div className="field"><label htmlFor="lRate">Interest rate (% a year)</label><input id="lRate" className="input" type="number" min="0" step="0.25" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
        <div className="field"><label htmlFor="lMon">Repay in (months)</label><input id="lMon" className="input" type="number" min="1" max="60" value={mon} onChange={(e) => setMon(e.target.value)} /></div>
        <div className="field full"><label htmlFor="lSub">Interest subvention (% off)</label><input id="lSub" className="input" type="number" min="0" step="0.5" value={sub} onChange={(e) => setSub(e.target.value)} /></div>
        <p className="note full">Rates differ by bank and scheme. Ask your bank which subvention applies to you.</p>
      </div>
      <div className="out">
        <div className="net">
          <small>Interest you pay with subvention ({eff}%)</small>
          <b>{inr(withSub)}</b>
          <small>Total to repay {inr(amt + withSub)} in {m} months</small>
        </div>
        <div className="cmp">
          <div><span>No subsidy</span><i style={{ width: '100%', background: 'var(--rose)' }} /><b>{inr(full)}</b></div>
          <div><span>With it</span><i style={{ width: `${full ? (withSub / full) * 100 : 0}%`, background: 'var(--green)' }} /><b>{inr(withSub)}</b></div>
        </div>
        <p className="note">Simple interest estimate. Your bank's final figure may differ.</p>
      </div>
    </div>
  );
}

function Calculators() {
  const [tab, setTab] = useState('profit');
  return (
    <section className="sec" id="calc">
      <SectionHead icon="calc" title="Farm calculators">Plan before you sow. Estimate your profit, or work out what a crop loan will cost.</SectionHead>
      <div className="card">
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'profit'} onClick={() => setTab('profit')}>Profit</button>
          <button role="tab" aria-selected={tab === 'loan'} onClick={() => setTab('loan')}>Crop loan</button>
        </div>
        {tab === 'profit' ? <ProfitCalc /> : <LoanCalc />}
      </div>
    </section>
  );
}

/* =========================================================
   CROP CALENDAR
   ========================================================= */
function CropCalendar() {
  const NOW = new Date().getMonth();
  const sow = Object.entries(CAL).filter(([, s]) => s[NOW] === 'S').map(([n]) => n);
  const har = Object.entries(CAL).filter(([, s]) => s[NOW] === 'H').map(([n]) => n);
  return (
    <section className="sec" id="calendar">
      <SectionHead icon="calendar" title="Crop calendar">See when to sow, when crops grow and when to harvest. The current month is marked.</SectionHead>
      <div className="todo">
        <div className="tile t-b"><div className="ci"><Icon n="sprout" s={22} /></div><h3>Sow in {MON[NOW]}</h3>
          <p>{sow.length ? <b>{sow.join(', ')}</b> : 'No major sowing this month. A good time to prepare land and test soil.'}</p></div>
        <div className="tile t-a"><div className="ci"><Icon n="check" s={22} /></div><h3>Harvest in {MON[NOW]}</h3>
          <p>{har.length ? <b>{har.join(', ')}</b> : 'No major harvest this month. Check stored grain and plan sales.'}</p></div>
      </div>
      <div className="card cal">
        <div className="cal-g">
          <span />
          {MON.map((m, i) => <span key={m} className={`m ${i === NOW ? 'now' : ''}`}>{m}</span>)}
          {Object.entries(CAL).map(([n, s]) => (
            <Fragment key={n}>
              <span className="cn">{n}</span>
              {[...s].map((ch, i) => (
                <span key={i} className={`c ${ch === '-' ? '' : ch} ${i === NOW ? 'now' : ''}`} title={`${n}, ${MON[i]}: ${STAGE[ch]}`} />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="lg2">
          <span style={{ '--c': '#4f8ef0' }}>Sowing</span><span style={{ '--c': '#6fc489' }}>Growing</span><span style={{ '--c': '#f2a93b' }}>Harvest</span>
        </div>
        <p className="note" style={{ marginTop: 10 }}>General guide for the plains. Local sowing dates vary by variety and rainfall.</p>
      </div>
    </section>
  );
}

/* =========================================================
   CROP DOCTOR
   ========================================================= */
function CropDoctor() {
  const [crop, setCrop] = useState('Rice');
  const [sym, setSym] = useState(null);
  const x = sym == null ? null : DOC[crop][sym];
  return (
    <section className="sec" id="doctor">
      <SectionHead icon="bug" title="Crop doctor">Notice something wrong with your plants? Pick the crop and what you see to find the likely cause.</SectionHead>
      <div className="g2b">
        <div className="card">
          <span className="lab">Your crop</span>
          <div className="opts" style={{ margin: '8px 0 16px' }}>
            <Chips items={Object.keys(DOC)} value={crop} onChange={(c) => { setCrop(c); setSym(null); }} />
          </div>
          <span className="lab">What do you see?</span>
          <div className="sym">
            {DOC[crop].map((d, i) => <button key={d.s} aria-pressed={sym === i} onClick={() => setSym(i)}>{d.s}</button>)}
          </div>
        </div>
        <div className="dx">
          {x ? (
            <>
              <span className={`risk r-${x.sev}`}>{x.sev} concern</span>
              <h3 style={{ marginTop: 10 }}>{x.n}</h3>
              <h4>What to do now</h4>
              <ul>{x.a.map((i) => <li key={i}>{i}</li>)}</ul>
              <h4>How to prevent it next time</h4>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>{x.p}</p>
              <p className="note" style={{ marginTop: 16 }}>This is a guide, not a diagnosis. Confirm with your Krishi Vigyan Kendra or call 1800-180-1551 before spraying anything.</p>
            </>
          ) : (
            <div className="empty"><div><Icon n="bug" s={34} /><p style={{ marginTop: 10 }}>Pick a symptom on the left to see what it may be and what to do.</p></div></div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
   ========================================================= */
export default function Farmer() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('rd-theme'); } catch { return null; }
  });
  const [msg, setMsg] = useState('');
  const timer = useRef(null);

  const toast = (m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2600);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const systemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = theme ? theme === 'dark' : systemDark;
  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('rd-theme', next); } catch { /* ignore */ }
  };

  return (
    <div className="fc" data-theme={theme || undefined}>
      <FarmerNav dark={dark} onTheme={toggleTheme} />
      <Hero />
      <StatsAndTicker />
      <SubNav />

      <main className="wrap">
        <MandiPrices toast={toast} />
        <CropAdvisor />
        <Weather />
        <Schemes />
        <Calculators />
        <CropCalendar />
        <CropDoctor />

        <div className="help">
          <div className="sp" style={{ minWidth: 260 }}>
            <h2>Talk to an agriculture expert</h2>
            <p>Free advice in your language on crops, pests, schemes and market rates through the Kisan Call Centre.</p>
          </div>
          <div><small style={{ opacity: 0.85 }}>Toll free</small><div className="num">1800-180-1551</div></div>
          <a className="btn-light lg" href="tel:18001801551"><Icon n="phone" s={18} />Call now</a>
        </div>
      </main>

      <footer className="foot">
        <div className="wrap">Rural Development, Farmer Corner. Prices, weather and advisories shown here are sample data for demonstration.</div>
      </footer>

      <div className={`toast ${msg ? 'show' : ''}`} role="status" aria-live="polite">{msg}</div>
    </div>
  );
}