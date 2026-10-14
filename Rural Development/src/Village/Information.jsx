import { useState, useEffect, useMemo, useRef } from 'react';
import './Information.css';

/* ---------- helpers ---------- */
const fmt = (n) => Math.round(n).toLocaleString('en-IN');
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const goTo = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

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
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  landmark: '<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M9 9.5c0-1.2 1.3-2 3-2s3 .8 3 2-1.3 1.7-3 2-3 .8-3 2 1.3 2 3 2 3-.8 3-2M12 6v1.5M12 16.5V18"/>',
  store: '<path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0M10 20v-6h4v6"/>',
  cross: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M8 21v-3M16 21v-3"/><circle cx="8.5" cy="14.5" r=".8"/><circle cx="15.5" cy="14.5" r=".8"/>',
  paw: '<circle cx="7" cy="9" r="1.8"/><circle cx="12" cy="6" r="1.8"/><circle cx="17" cy="9" r="1.8"/><path d="M12 12c-3 0-5 3-5 5 0 2 2 2 5 1 3 1 5 1 5-1 0-2-2-5-5-5z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><path d="M16 5a3.5 3.5 0 010 7M18 14c2.5.6 4 2.6 4 5"/>',
  wifi: '<path d="M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0"/><circle cx="12" cy="19" r=".8"/>',
  zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
  download: '<path d="M12 3v12M7 11l5 5 5-5M4 21h16"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  thumb: '<path d="M7 11v9H3v-9zM7 11l4-8c2 0 3 1 3 3v3h6l-1.5 8a2 2 0 01-2 1.5H7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 005 5L21 13l-8 8-4-4 8-8zM3 21l5-5"/>',
};

function Icon({ n, s = 20 }) {
  return (
    <svg className="ic" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[n] || '' }} />
  );
}

/* ---------- DATA (SAMPLE) ---------- */
const VILLAGES = [
  { id: 'v1', name: 'Rampur Kalan', state: 'Uttar Pradesh', district: 'Barabanki', block: 'Fatehpur', pop: 3420, hh: 640, area: 612, sexRatio: 921, sarpanch: 'Smt. Sunita Devi', town: 'Barabanki', townKm: 18, rail: 'Barabanki Jn', railKm: 21, q: 0.55, seed: 1 },
  { id: 'v2', name: 'Nuagaon', state: 'Odisha', district: 'Khordha', block: 'Balianta', pop: 2150, hh: 468, area: 402, sexRatio: 978, sarpanch: 'Shri Bijay Behera', town: 'Bhubaneswar', townKm: 16, rail: 'Bhubaneswar', railKm: 19, q: 0.72, seed: 2 },
  { id: 'v3', name: 'Shivapur', state: 'Maharashtra', district: 'Satara', block: 'Koregaon', pop: 4105, hh: 812, area: 745, sexRatio: 954, sarpanch: 'Shri Ganesh Pawar', town: 'Satara', townKm: 14, rail: 'Satara', railKm: 16, q: 0.82, seed: 3 },
  { id: 'v4', name: 'Dhani Meena', state: 'Rajasthan', district: 'Alwar', block: 'Rajgarh', pop: 1890, hh: 351, area: 528, sexRatio: 905, sarpanch: 'Smt. Kamla Meena', town: 'Alwar', townKm: 32, rail: 'Alwar Jn', railKm: 34, q: 0.45, seed: 4 },
  { id: 'v5', name: 'Keezhur', state: 'Tamil Nadu', district: 'Thanjavur', block: 'Orathanadu', pop: 2760, hh: 690, area: 436, sexRatio: 1012, sarpanch: 'Thiru M. Selvam', town: 'Thanjavur', townKm: 22, rail: 'Thanjavur Jn', railKm: 23, q: 0.9, seed: 5 },
  { id: 'v6', name: 'Chak Mohri', state: 'Punjab', district: 'Ludhiana', block: 'Khanna', pop: 3280, hh: 590, area: 690, sexRatio: 897, sarpanch: 'S. Harjinder Singh', town: 'Khanna', townKm: 9, rail: 'Khanna', railKm: 10, q: 0.88, seed: 6 },
  { id: 'v7', name: 'Joypur', state: 'West Bengal', district: 'Bankura', block: 'Onda', pop: 2540, hh: 540, area: 488, sexRatio: 962, sarpanch: 'Smt. Mamata Mondal', town: 'Bankura', townKm: 26, rail: 'Bankura', railKm: 27, q: 0.6, seed: 7 },
  { id: 'v8', name: 'Hosahalli', state: 'Karnataka', district: 'Mandya', block: 'Maddur', pop: 2980, hh: 640, area: 572, sexRatio: 975, sarpanch: 'Shri Nagaraj Gowda', town: 'Mandya', townKm: 15, rail: 'Maddur', railKm: 6, q: 0.76, seed: 8 },
];

const IND = [
  { k: 'literacy', n: 'Literacy' },
  { k: 'toilet', n: 'Household toilets' },
  { k: 'power', n: 'Electrified homes' },
  { k: 'tap', n: 'Tap water' },
  { k: 'bank', n: 'Bank access' },
  { k: 'net', n: 'Internet (4G)' },
];

const CAT_COLOR = { Health: '#e5484d', Education: '#2f63c4', Government: '#17803d', Finance: '#d98a06', Utilities: '#0e8fa0', Transport: '#6b5fe0', Market: '#c2410c' };
const CAT_SOFT = { Health: 'var(--rose-soft)', Education: 'var(--blue-soft)', Government: 'var(--green-soft)', Finance: 'var(--amber-soft)', Utilities: 'var(--teal-soft)', Transport: 'var(--violet-soft)', Market: 'var(--amber-soft)' };

const MS = [1, 2, 3, 4, 5, 6], MF = [1, 2, 3, 4, 5];
const FACS = [
  { id: 'panchayat', n: 'Gram Panchayat office', ic: 'home', cat: 'Government', always: true, hours: [10, 17], days: MS, note: 'Certificates, scheme forms and grievances' },
  { id: 'school', n: 'Primary and upper-primary school', ic: 'cap', cat: 'Education', p: 0.9, hours: [8, 14], days: MS, note: 'Classes 1 to 8 with mid-day meal' },
  { id: 'anganwadi', n: 'Anganwadi centre', ic: 'users', cat: 'Education', p: 0.92, hours: [9, 15], days: MS, note: 'Nutrition and early learning for children under 6' },
  { id: 'phc', n: 'Health sub-centre or PHC', ic: 'cross', cat: 'Health', p: 0.45, hours: [9, 16], days: MS, note: 'Primary care, vaccination and ANM visits' },
  { id: 'bank', n: 'Bank branch, Bank Mitra or ATM', ic: 'landmark', cat: 'Finance', p: 0.35, hours: [10, 16], days: MF, note: 'Savings, loans and scheme payments' },
  { id: 'post', n: 'Post office', ic: 'mail', cat: 'Government', p: 0.55, hours: [10, 17], days: MS, note: 'Savings schemes, speed post and money orders' },
  { id: 'pds', n: 'Ration (PDS) shop', ic: 'bag', cat: 'Government', p: 0.8, hours: [8, 13], days: MS, note: 'Subsidised grain on ration card' },
  { id: 'csc', n: 'Common Service Centre', ic: 'cog', cat: 'Government', p: 0.4, hours: [9, 18], days: MS, note: 'Online forms, bill payment and digital services' },
  { id: 'water', n: 'Water tank and tap supply', ic: 'droplet', cat: 'Utilities', p: 0.85, hours: null, days: null, note: 'Overhead tank with household tap connections' },
  { id: 'bus', n: 'Bus or shared-auto stop', ic: 'bus', cat: 'Transport', p: 0.6, hours: null, days: null, note: 'Regular service to the block headquarters' },
  { id: 'market', n: 'Weekly market (haat)', ic: 'store', cat: 'Market', p: 0.3, hours: [6, 13], days: [2, 5], note: 'Held twice a week, Tuesday and Friday' },
  { id: 'vet', n: 'Veterinary centre', ic: 'paw', cat: 'Health', p: 0.3, hours: [9, 16], days: MS, note: 'Livestock care and vaccination' },
];

const PROJ = [
  { n: 'Village road construction', s: 'PMGSY', by: 'Gram Panchayat and PWD' },
  { n: 'Piped water to every home', s: 'Jal Jeevan Mission', by: 'Public Health Engineering' },
  { n: 'School building repair', s: 'Samagra Shiksha', by: 'School Management Committee' },
  { n: 'Community toilet and waste pits', s: 'Swachh Bharat (Grameen)', by: 'Gram Panchayat' },
  { n: 'Solar street lights', s: 'Panchayat fund', by: 'Gram Panchayat' },
  { n: 'Village pond renovation', s: 'MGNREGA', by: 'Gram Panchayat' },
];
const AGES = ['0 to 14', '15 to 29', '30 to 44', '45 to 59', '60+'];
const NEEDS = ['Drinking water', 'Road', 'Street light', 'Electricity', 'Sanitation', 'Health', 'School', 'Other'];
const EMERGENCY = [['112', 'Emergency'], ['108', 'Ambulance'], ['181', 'Women helpline'], ['1098', 'Childline']];

function shares(R, base) {
  const w = base.map((b, i) => b + R() * (i === 0 ? 0.25 : 0.1));
  const t = w.reduce((a, b) => a + b, 0);
  const out = w.map((x) => Math.round((x / t) * 100));
  out[0] += 100 - out.reduce((a, b) => a + b, 0);
  return out;
}

const cache = {};
function build(v) {
  if (cache[v.id]) return cache[v.id];
  const R = rng(v.seed * 101);
  const ind = IND.map((i) => ({ ...i, val: Math.round(clamp(52 + v.q * 42 + (R() - 0.5) * 14, 34, 99)) }));
  const dist = IND.map(() => Math.round(clamp(62 + (v.q - 0.5) * 18 + (R() - 0.5) * 10, 45, 92)));
  const state = IND.map(() => Math.round(clamp(66 + (R() - 0.5) * 14, 50, 90)));
  const score = Math.round(ind.reduce((a, b) => a + b.val, 0) / ind.length);
  const facs = FACS.map((f) => {
    const p = f.always ? 1 : clamp(f.p + (v.q - 0.5) * 0.7, 0.1, 0.97);
    const inV = R() < p;
    const km = inV ? 0 : Math.round((1 + R() * (13 - v.q * 7)) * 2) / 2;
    return { ...f, inV, km };
  });
  const fFrac = v.sexRatio / (1000 + v.sexRatio);
  const pyr = [0.25, 0.27, 0.22, 0.15, 0.11].map((s, i) => {
    const t = Math.round(v.pop * s * (1 + (R() - 0.5) * 0.1));
    const f = Math.round(t * fFrac);
    return { age: AGES[i], m: t - f, f };
  });
  const occ = shares(R, [0.35, 0.12, 0.08, 0.06, 0.05]);
  const land = shares(R, [0.3, 0.15, 0.1, 0.05, 0.03]);

  const order = [...PROJ].map((p) => ({ p, k: R() })).sort((a, b) => a.k - b.k).slice(0, 4).map((x) => x.p);
  const projects = order.map((p, i) => {
    const budget = Math.round(6 + R() * 42);
    const status = i === 0 ? 'Completed' : i === 3 ? 'Planned' : 'Ongoing';
    const progress = status === 'Completed' ? 100 : status === 'Planned' ? 0 : Math.round(25 + R() * 60);
    const spent = Math.round(budget * (progress / 100) * (0.9 + R() * 0.15) * 10) / 10;
    const due = new Date(); due.setMonth(due.getMonth() + (status === 'Completed' ? -2 : status === 'Planned' ? 9 : 2 + Math.round(R() * 6)));
    return { ...p, budget, status, progress, spent, due: due.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) };
  });

  // schematic map layout
  const houses = Array.from({ length: Math.min(130, Math.round(60 + v.pop / 60)) }, () => {
    const a = R() * 6.283, r = Math.sqrt(R()) * 115;
    return [320 + Math.cos(a) * r * 1.35, 190 + Math.sin(a) * r * 0.82];
  });
  const inV = facs.filter((f) => f.inV && f.id !== 'panchayat');
  const pins = { panchayat: [320, 190] };
  inV.forEach((f, i) => {
    const a = (i / inV.length) * 6.283 + R() * 0.4, r = 55 + R() * 55;
    pins[f.id] = [320 + Math.cos(a) * r * 1.3, 190 + Math.sin(a) * r * 0.8];
  });
  const yr = 318 + R() * 22;
  const river = `M-10 ${yr} C 150 ${yr - 50}, 300 ${yr + 45}, 460 ${yr - 10} S 620 ${yr + 18}, 660 ${yr - 22}`;
  const road = `M-10 ${185 + R() * 30} Q 320 ${140 + R() * 40} 660 ${200 + R() * 30}`;

  return (cache[v.id] = { ind, dist, state, score, facs, pyr, occ, land, projects, houses, pins, river, road });
}

const grade = (s) => (s >= 85 ? ['A', 'Excellent', 'g-A'] : s >= 75 ? ['B', 'Good', 'g-B'] : s >= 65 ? ['C', 'Developing', 'g-C'] : ['D', 'Needs attention', 'g-D']);

function isOpen(f) {
  if (!f.hours) return true;
  const n = new Date(), h = n.getHours() + n.getMinutes() / 60;
  return f.days.includes(n.getDay()) && h >= f.hours[0] && h < f.hours[1];
}
const hoursText = (f) => {
  if (!f.hours) return 'Always available';
  const t = (h) => `${h > 12 ? h - 12 : h}${h >= 12 ? ' PM' : ' AM'}`;
  const days = f.days.length === 6 ? 'Mon to Sat' : f.days.length === 5 ? 'Mon to Fri' : 'Tue, Fri';
  return `${days}, ${t(f.hours[0])} to ${t(f.hours[1])}`;
};
const statusOf = (f) => (f.inV ? ['In village', 's-in'] : f.km <= 5 ? [`${f.km} km away`, 's-near'] : [`${f.km} km away`, 's-far']);

/* ---------- small shared pieces ---------- */
function SectionHead({ icon, title, children }) {
  return (
    <div className="sec-h">
      <h2><span className="hi"><Icon n={icon} s={24} /></span>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function Count({ to, suffix = '', fmtFn }) {
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
  return <>{fmtFn ? fmtFn(v) : Math.round(v).toLocaleString('en-IN')}{suffix}</>;
}

function Ring({ p, size = 180, stroke = 14 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const col = p >= 80 ? 'var(--green)' : p >= 65 ? 'var(--amber)' : 'var(--rose)';
  const [a, setA] = useState(0);
  useEffect(() => { const t = setTimeout(() => setA(p), 60); return () => clearTimeout(t); }, [p]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${(c * a) / 100} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dasharray 1s cubic-bezier(.2,.7,.2,1)' }} />
    </svg>
  );
}

function Donut({ data, label, sub }) {
  const r = 52, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg viewBox="0 0 140 140" width="150" height="150" role="img" aria-label={`${sub} chart`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="18" />
      {data.map((d) => {
        const len = (c * d.v) / 100;
        const el = <circle key={d.l} cx="70" cy="70" r={r} fill="none" stroke={d.c} strokeWidth="18" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} transform="rotate(-90 70 70)" />;
        off += len;
        return el;
      })}
      <text x="70" y="69" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--ink)">{label}</text>
      <text x="70" y="86" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">{sub}</text>
    </svg>
  );
}

function Radar({ series }) {
  const S = 340, cx = S / 2, cy = S / 2, R = 108, n = IND.length;
  const pt = (i, v) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + Math.cos(a) * ((R * v) / 100), cy + Math.sin(a) * ((R * v) / 100)]; };
  const poly = (vals) => vals.map((v, i) => pt(i, v).join(',')).join(' ');
  return (
    <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label="Development radar chart">
      {[25, 50, 75, 100].map((l) => (
        <polygon key={l} points={IND.map((_, i) => pt(i, l).join(',')).join(' ')} fill="none" stroke="var(--line)" strokeWidth="1.2" />
      ))}
      {IND.map((it, i) => {
        const [x, y] = pt(i, 100), [lx, ly] = pt(i, 128);
        return (
          <g key={it.k}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" />
            <text x={lx} y={ly + 4} textAnchor={lx < cx - 8 ? 'end' : lx > cx + 8 ? 'start' : 'middle'} fontSize="11.5" fontWeight="700" fill="var(--muted)">{it.n}</text>
          </g>
        );
      })}
      {series.map((s) => (
        <g key={s.label}>
          <polygon points={poly(s.vals)} fill={s.color} fillOpacity={s.fill ?? 0.18} stroke={s.color} strokeWidth="2.6" strokeDasharray={s.dash} strokeLinejoin="round" />
          {!s.dash && s.vals.map((v, i) => { const [x, y] = pt(i, v); return <circle key={i} cx={x} cy={y} r="4" fill={s.color} stroke="var(--surface)" strokeWidth="2" />; })}
        </g>
      ))}
    </svg>
  );
}

/* =========================================================
   NAVBAR  (replace with your dashboard Navbar if you like)
   ========================================================= */
function InfoNav({ dark, onTheme }) {
  const [open, setOpen] = useState(false);
  const links = [['home', 'Home'], ['grid', 'Schemes'], ['cap', 'Students'], ['bag', 'Jobs'], ['sprout', 'Farmers'], ['cog', 'Services']];
  return (
    <header className="nav">
      <div className="nav-in">
        <a className="brand" href="/" aria-label="Rural Development home">
          <span className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f4d24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19c0-9 5-14 15-14 0 10-5 15-15 15z" /><path d="M5 19l8-8" /></svg>
          </span>
          <span><b><i>Rural</i> Development</b><small>Connecting Villages to Opportunities</small></span>
        </a>
        <nav className={`menu ${open ? 'open' : ''}`} aria-label="Main">
          {links.map(([ic, t]) => (
            <a key={t} href="#" className={t === 'Home' ? 'on' : ''} aria-current={t === 'Home' ? 'page' : undefined} onClick={(e) => e.preventDefault()}>
              <Icon n={ic} s={18} />{t}
            </a>
          ))}
        </nav>
        <div className="nav-act">
          <button className="round" aria-label="Notifications, 3 new"><Icon n="bell" /><span className="badge">3</span></button>
          <button className="round" onClick={onTheme} aria-label="Switch light or dark theme"><Icon n={dark ? 'sun' : 'moon'} /></button>
                    
          <a className="btn-solid" href="#">Villagers</a>
          <button className="round burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><Icon n="menu" /></button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HERO + STATS + SUBNAV
   ========================================================= */
const HOUSES = [[170, 520, 1, '#c2553f'], [262, 536, 1.25, '#b8472f'], [380, 514, 0.85, '#d0683f'], [470, 530, 1.1, '#c2553f'], [590, 518, 0.9, '#a94632'],
  [700, 534, 1.2, '#c2553f'], [815, 516, 0.85, '#d0683f'], [1180, 520, 1, '#b8472f'], [1285, 536, 1.2, '#c2553f'], [1390, 516, 0.9, '#d0683f']];
const TREES = [[120, 510, 1], [330, 506, 0.8], [545, 512, 1.1], [760, 508, 0.9], [1120, 512, 1.1], [1235, 506, 0.85], [1350, 512, 1]];

function Hero({ v, d, states, list, onState, onVillage }) {
  const [g, label] = grade(d.score);
  return (
    <section className="hero" id="vi-top">
      <svg className="scene" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <radialGradient id="vglow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fffbe0" stopOpacity=".95" /><stop offset=".4" stopColor="#ffd9a8" stopOpacity=".5" /><stop offset="1" stopColor="#ffb08a" stopOpacity="0" /></radialGradient>
          <linearGradient id="vfield" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86b552" /><stop offset=".5" stopColor="#47963f" /><stop offset="1" stopColor="#1e6a33" /></linearGradient>
          <linearGradient id="vfar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b25b5b" stopOpacity=".7" /><stop offset="1" stopColor="#d98a6a" stopOpacity=".25" /></linearGradient>
        </defs>
        <g className="sun">
          <circle cx="1000" cy="390" r="300" fill="url(#vglow)" />
          <g stroke="#fff" strokeOpacity=".3" strokeWidth="4" strokeLinecap="round">
            {Array.from({ length: 34 }, (_, i) => { const a = (i * Math.PI * 2) / 34; return <line key={i} x1={1000 + Math.cos(a) * 90} y1={390 + Math.sin(a) * 90} x2={1000 + Math.cos(a) * 1200} y2={390 + Math.sin(a) * 1200} />; })}
          </g>
          <circle cx="1000" cy="390" r="60" fill="#fffbe6" />
        </g>
        <path d="M0 440 L180 360 L330 420 L520 330 L700 420 L860 350 L1010 430 L1200 340 L1440 440 L1440 480 L0 480Z" fill="url(#vfar)" />
        <path d="M0 480 Q240 420 440 468 T860 458 T1220 450 T1440 468 L1440 640 L0 640Z" fill="#7aa857" opacity=".9" />
        <path d="M0 520 L1440 504 L1440 640 L0 640Z" fill="url(#vfield)" />
        <path d="M-50 612 Q 300 570 640 600 T 1500 580" fill="none" stroke="#9fd0ee" strokeWidth="26" strokeLinecap="round" opacity=".85" />
        <path d="M-50 608 Q 300 566 640 596 T 1500 576" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".5" />
        {TREES.map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <rect x="-4" y="-22" width="8" height="24" fill="#6b4a32" />
            <circle cx="0" cy="-36" r="22" fill="#2f7d3b" /><circle cx="-14" cy="-26" r="14" fill="#3f8f45" /><circle cx="14" cy="-27" r="15" fill="#2a7336" />
          </g>
        ))}
        {HOUSES.map(([x, y, s, roof], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <rect x="-24" y="-28" width="48" height="28" fill="#f6e3c4" />
            <path d="M-31 -28 L0 -54 L31 -28Z" fill={roof} />
            <rect x="-5" y="-17" width="10" height="17" fill="#8a5a3c" />
            <rect x="-19" y="-22" width="9" height="9" fill="#ffd978" /><rect x="10" y="-22" width="9" height="9" fill="#ffd978" />
          </g>
        ))}
        <g className="birds" stroke="#12284a" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".55">
          <path d="M520 150q12-12 24 0q12-12 24 0M610 112q9-9 18 0q9-9 18 0M470 212q9-9 18 0q9-9 18 0" />
        </g>
      </svg>

      <p className="hand">Every village,<br />a story worth knowing</p>

      <div className="hero-in">
        <div>
          <div className="crumb"><Icon n="home" s={15} />Home<span>/</span><b>Village Information</b></div>
          <span className="pill"><Icon n="home" s={16} />Village Information</span>
          <h1>Know your village,<br />inside out</h1>
          <p className="lead">People, facilities, development score, ongoing projects and a live map. Find out where your village stands and what it needs next.</p>
          <div className="cta">
            <a className="btn-solid lg" href="#facilities" onClick={(e) => goTo(e, 'facilities')}>Explore facilities</a>
            <a className="btn-light lg" href="#report" onClick={(e) => goTo(e, 'report')}>Report a problem</a>
          </div>
        </div>

        <aside className="glass" aria-label="Choose your village">
          <h3><Icon n="pin" s={18} />Choose your village</h3>
          <label htmlFor="selState">State</label>
          <select id="selState" value={v.state} onChange={(e) => onState(e.target.value)}>{states.map((s) => <option key={s}>{s}</option>)}</select>
          <label htmlFor="selVil">Village</label>
          <select id="selVil" value={v.id} onChange={(e) => onVillage(e.target.value)}>{list.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.district})</option>)}</select>
          <div className="gq">
            <div><b>{fmt(v.pop)}</b><small>People</small></div>
            <div><b>{fmt(v.hh)}</b><small>Households</small></div>
            <div><b>{d.score} ({g})</b><small>{label}</small></div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { ic: 'home', bg: 'var(--rose-soft)', c: 'var(--rose)', to: 6.4, suf: 'L+', f: (x) => x.toFixed(1), l: 'Villages covered' },
    { ic: 'landmark', bg: 'var(--green-soft)', c: 'var(--green)', to: 2.6, suf: 'L+', f: (x) => x.toFixed(1), l: 'Gram Panchayats' },
    { ic: 'users', bg: 'var(--blue-soft)', c: 'var(--blue)', to: 1.2, suf: 'M+', f: (x) => x.toFixed(1), l: 'People benefited' },
    { ic: 'check', bg: 'var(--amber-soft)', c: 'var(--amber)', to: 92, suf: '%', l: 'Issues resolved' },
  ];
  return (
    <div className="stats"><div className="wrap"><div className="stats-in">
      {items.map((s) => (
        <div className="stat" key={s.l}>
          <span className="ci" style={{ background: s.bg, color: s.c }}><Icon n={s.ic} s={24} /></span>
          <div><b><Count to={s.to} suffix={s.suf} fmtFn={s.f} /></b><small>{s.l}</small></div>
        </div>
      ))}
    </div></div></div>
  );
}

const SUB = [['overview', 'home', 'Overview'], ['facilities', 'store', 'Facilities'], ['map', 'map', 'Village map'], ['people', 'users', 'People'], ['scorecard', 'trend', 'Scorecard'], ['projects', 'wrench', 'Projects'], ['report', 'alert', 'Report an issue']];

function SubNav() {
  const [active, setActive] = useState('overview');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-30% 0px -60% 0px' });
    SUB.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <div className="subnav"><div className="wrap">
      {SUB.map(([id, ic, t]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={(e) => goTo(e, id)}><Icon n={ic} s={16} />{t}</a>)}
    </div></div>
  );
}

/* =========================================================
   OVERVIEW
   ========================================================= */
function Overview({ v, d, toast }) {
  const [g, label, gc] = grade(d.score);
  const sorted = [...d.ind].sort((a, b) => b.val - a.val);
  const lit = d.ind[0].val;
  const facts = [
    ['users', 'Population', fmt(v.pop)], ['home', 'Households', fmt(v.hh)], ['map', 'Area', `${fmt(v.area)} hectares`], ['cap', 'Literacy', `${lit}%`],
    ['users', 'Sex ratio', `${v.sexRatio} women per 1,000 men`], ['landmark', 'Gram Panchayat', v.name], ['pin', 'Nearest town', `${v.town}, ${v.townKm} km`], ['bus', 'Railway station', `${v.rail}, ${v.railKm} km`],
  ];
  const share = async () => {
    const text = `${v.name}, ${v.block}, ${v.district}, ${v.state}. Population ${fmt(v.pop)}, ${fmt(v.hh)} households, development score ${d.score}/100 (${label}). Rural Development portal (sample data).`;
    try { await navigator.clipboard.writeText(text); toast('Village summary copied to clipboard'); } catch { toast('Could not copy. Please select and copy manually.'); }
  };
  return (
    <section className="sec" id="overview">
      <SectionHead icon="home" title="Village overview">The essentials at a glance, with an overall development score built from six key indicators.</SectionHead>
      <div className="profile">
        <div className="card">
          <div className="ph">
            <div className="sp">
              <span className="tag">Sample data</span>
              <h3 style={{ marginTop: 8 }}>{v.name}</h3>
              <div className="loc"><span><Icon n="pin" s={14} />{v.block} block</span><span>{v.district} district</span><span>{v.state}</span><span><Icon n="landmark" s={14} />Sarpanch: {v.sarpanch}</span></div>
            </div>
            <div className="row">
              <button className="btn-line" onClick={share}><Icon n="share" s={16} />Share</button>
              <button className="btn-line" onClick={() => window.print()}><Icon n="download" s={16} />Download report</button>
            </div>
          </div>
          <div className="fgrid">
            {facts.map(([ic, k, val]) => <div className="ft" key={k}><Icon n={ic} s={20} /><small>{k}</small><b>{val}</b></div>)}
          </div>
        </div>

        <div className="card score">
          <h3>Development score</h3>
          <div className="ringL"><Ring p={d.score} /><b>{d.score}<small>out of 100</small></b></div>
          <span className={`grade ${gc}`}>Grade {g} · {label}</span>
          <div className="hl">
            <div className="good"><Icon n="check" s={16} /><span>Strongest: {sorted[0].n} ({sorted[0].val}%) and {sorted[1].n} ({sorted[1].val}%)</span></div>
            <div className="need"><Icon n="alert" s={16} /><span>Needs work: {sorted[5].n} ({sorted[5].val}%) and {sorted[4].n} ({sorted[4].val}%)</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FACILITIES
   ========================================================= */
function Facilities({ d }) {
  const [filter, setFilter] = useState('All');
  const [openOnly, setOpenOnly] = useState(false);
  const list = d.facs
    .filter((f) => filter === 'All' || (filter === 'In village' && f.inV) || (filter === 'Nearby' && !f.inV && f.km <= 5) || (filter === 'Far away' && !f.inV && f.km > 5))
    .filter((f) => !openOnly || isOpen(f))
    .sort((a, b) => a.km - b.km);
  const inCount = d.facs.filter((f) => f.inV).length;
  return (
    <section className="sec" id="facilities">
      <SectionHead icon="store" title="Facilities and services">{inCount} of {d.facs.length} key services are available inside the village. The rest show the distance to the nearest one.</SectionHead>
      <div className="tools">
        {['All', 'In village', 'Nearby', 'Far away'].map((f) => <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
        <span className="sp" />
        <button className="chip" aria-pressed={openOnly} onClick={() => setOpenOnly((o) => !o)}><Icon n="clock" s={14} /> Open right now</button>
      </div>
      <div className="fg">
        {list.map((f) => {
          const [st, sc] = statusOf(f), open = isOpen(f);
          return (
            <article className="fc2 fade" key={f.id}>
              <div className="top">
                <span className="ci" style={{ background: CAT_SOFT[f.cat], color: CAT_COLOR[f.cat] }}><Icon n={f.ic} s={22} /></span>
                <span className={`risk ${sc}`}>{st}</span>
              </div>
              <h4>{f.n}</h4>
              <p>{f.note}</p>
              <div className="dist"><i style={{ width: `${f.inV ? 100 : clamp(100 - f.km * 7, 8, 90)}%`, background: f.inV ? 'var(--green)' : f.km <= 5 ? 'var(--amber)' : 'var(--rose)' }} /></div>
              <div className="hrs"><Icon n="clock" s={14} />{hoursText(f)}<span className="sp" /><span className={`risk ${open ? 's-open' : 's-closed'}`}>{open ? 'Open now' : 'Closed'}</span></div>
            </article>
          );
        })}
        {!list.length && <p className="note">Nothing matches these filters right now.</p>}
      </div>
    </section>
  );
}

/* =========================================================
   VILLAGE MAP (schematic)
   ========================================================= */
function VillageMap({ v, d }) {
  const [layers, setLayers] = useState({ roads: true, water: true, fields: true, pins: true });
  const [sel, setSel] = useState('panchayat');
  const f = d.facs.find((x) => x.id === sel) || d.facs[0];
  const [st, sc] = statusOf(f);
  const toggle = (k) => setLayers((l) => ({ ...l, [k]: !l[k] }));
  const onMap = d.facs.filter((x) => d.pins[x.id]);
  return (
    <section className="sec" id="map">
      <SectionHead icon="map" title="Village map">A schematic map of {v.name}. Tap a pin to see what it is. Facilities that are not in the village are listed in the facilities section.</SectionHead>
      <div className="g2">
        <div className="card mapcard">
          <div className="layers">
            {[['fields', 'Farmland'], ['water', 'River and pond'], ['roads', 'Roads'], ['pins', 'Facility pins']].map(([k, l]) => (
              <button key={k} className="chip" aria-pressed={layers[k]} onClick={() => toggle(k)}>{l}</button>
            ))}
          </div>
          <svg className="mapsvg" viewBox="0 0 640 400" role="img" aria-label={`Schematic map of ${v.name}`}>
            <defs>
              <pattern id="stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)"><rect width="10" height="10" fill="var(--field-a)" /><rect width="5" height="10" fill="var(--field-b)" /></pattern>
            </defs>
            {layers.fields && (
              <g>
                <rect x="12" y="14" width="170" height="104" rx="18" fill="url(#stripes)" />
                <rect x="470" y="18" width="158" height="112" rx="18" fill="url(#stripes)" />
                <rect x="14" y="238" width="150" height="70" rx="18" fill="url(#stripes)" />
                <rect x="486" y="236" width="140" height="62" rx="18" fill="url(#stripes)" />
              </g>
            )}
            {layers.water && (
              <g>
                <path d={d.river} fill="none" stroke="var(--water)" strokeWidth="26" strokeLinecap="round" />
                <path d={d.river} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="520" cy="190" rx="30" ry="16" fill="var(--water)" />
              </g>
            )}
            {layers.roads && (
              <g fill="none" strokeLinecap="round">
                <path d={d.road} stroke="#cbb98f" strokeWidth="14" /><path d={d.road} stroke="#fff" strokeWidth="9" />
                <path d="M320 190 L320 112" stroke="#cbb98f" strokeWidth="10" /><path d="M320 190 L320 112" stroke="#fff" strokeWidth="6" />
                <path d="M320 190 L250 290" stroke="#cbb98f" strokeWidth="10" /><path d="M320 190 L250 290" stroke="#fff" strokeWidth="6" />
              </g>
            )}
            {d.houses.map((h, i) => <g key={i}><rect x={h[0] - 5} y={h[1] - 4} width="10" height="8" rx="1.5" fill="var(--house)" /><path d={`M${h[0] - 6} ${h[1] - 4} L${h[0]} ${h[1] - 9} L${h[0] + 6} ${h[1] - 4}Z`} fill="var(--roof)" /></g>)}
            {layers.pins && onMap.map((x) => {
              const [px, py] = d.pins[x.id], on = x.id === sel, col = CAT_COLOR[x.cat];
              return (
                <g key={x.id} transform={`translate(${px} ${py})`}>
                  <g className="pin" onClick={() => setSel(x.id)} role="button" tabIndex={0} aria-label={x.n} onKeyDown={(e) => e.key === 'Enter' && setSel(x.id)} style={{ color: col }}>
                    {on && <circle className="pingr" r="15" />}
                    <circle r="15" fill={col} stroke="#fff" strokeWidth="3" />
                    <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICONS[x.ic] }} />
                    {on && <circle className="ring" r="20" stroke={col} />}
                  </g>
                </g>
              );
            })}
            <g transform="translate(600 370)" fill="var(--muted)" fontWeight="800" fontSize="11" textAnchor="middle">
              <circle r="15" fill="var(--surface)" opacity=".85" /><path d="M0 -10 L4 2 L0 0 L-4 2Z" fill="var(--rose)" /><text y="13">N</text>
            </g>
            <g transform="translate(20 380)" fill="var(--muted)" fontSize="10" fontWeight="700"><rect width="60" height="4" rx="2" fill="var(--muted)" opacity=".7" /><text y="-4">500 m</text></g>
          </svg>
        </div>

        <div className="card sel-info fade" key={f.id}>
          <span className="ci" style={{ background: CAT_SOFT[f.cat], color: CAT_COLOR[f.cat] }}><Icon n={f.ic} s={28} /></span>
          <div><h3>{f.n}</h3><p className="note" style={{ marginTop: 4 }}>{f.note}</p></div>
          <div className="kv">
            <div><span>Category</span><b>{f.cat}</b></div>
            <div><span>Location</span><b><span className={`risk ${sc}`} style={{ color: undefined }}>{st}</span></b></div>
            <div><span>Timings</span><b>{hoursText(f)}</b></div>
            <div><span>Right now</span><b className={isOpen(f) ? 'up' : ''} style={{ color: isOpen(f) ? 'var(--green)' : 'var(--muted)' }}>{isOpen(f) ? 'Open' : 'Closed'}</b></div>
          </div>
          <div>
            <span className="lab">On this map</span>
            <div className="mlist" style={{ marginTop: 8 }}>
              {onMap.map((x) => <button key={x.id} aria-pressed={x.id === sel} onClick={() => setSel(x.id)}><i style={{ background: CAT_COLOR[x.cat] }} />{x.n.split(' ').slice(0, 2).join(' ')}</button>)}
            </div>
          </div>
          <p className="note">Schematic layout for demonstration, not to scale. Use real GIS data to place actual locations.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PEOPLE
   ========================================================= */
function People({ v, d }) {
  const maxP = Math.max(...d.pyr.flatMap((r) => [r.m, r.f]));
  const OCC = [['Farmers (own land)', '#17803d'], ['Agricultural labour', '#8ac26a'], ['Trade and business', '#d98a06'], ['Salaried and services', '#2f63c4'], ['Other work', '#9aa7b8']];
  const LAND = [['Irrigated farmland', '#2f9b4f'], ['Rain-fed farmland', '#b9d86a'], ['Forest and common land', '#0e8fa0'], ['Homes and roads', '#d98f6b'], ['Water bodies', '#6fb3e6']];
  const men = d.pyr.reduce((a, r) => a + r.m, 0), women = d.pyr.reduce((a, r) => a + r.f, 0);
  return (
    <section className="sec" id="people">
      <SectionHead icon="users" title="People and land">How the population is spread by age, what people do for a living and how the land is used.</SectionHead>
      <div className="g3">
        <div className="card">
          <h3>Population by age</h3>
          <div className="pyr-h"><span>Men {fmt(men)}</span><span /><span>Women {fmt(women)}</span></div>
          <div className="pyr">
            {d.pyr.map((r) => (
              <div className="r" key={r.age}>
                <div className="wm"><div className="b m" style={{ width: `${(r.m / maxP) * 100}%` }}>{fmt(r.m)}</div></div>
                <span>{r.age}</span>
                <div><div className="b f" style={{ width: `${(r.f / maxP) * 100}%` }}>{fmt(r.f)}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>How people earn a living</h3>
          <div className="donutw">
            <Donut data={d.occ.map((x, i) => ({ l: OCC[i][0], v: x, c: OCC[i][1] }))} label={`${d.occ[0] + d.occ[1]}%`} sub="farm based" />
            <div className="legl">{d.occ.map((x, i) => <span key={i} style={{ '--c': OCC[i][1] }}>{OCC[i][0]}<b>{x}%</b></span>)}</div>
          </div>
        </div>
        <div className="card">
          <h3>Land use ({fmt(v.area)} hectares)</h3>
          <div className="seg">{d.land.map((x, i) => <i key={i} style={{ width: `${x}%`, background: LAND[i][1] }} title={`${LAND[i][0]} ${x}%`} />)}</div>
          <div className="legl" style={{ marginTop: 16 }}>{d.land.map((x, i) => <span key={i} style={{ '--c': LAND[i][1] }}>{LAND[i][0]}<b>{x}% · {fmt((v.area * x) / 100)} ha</b></span>)}</div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SCORECARD (radar + compare)
   ========================================================= */
function Scorecard({ v, d, dc, cmpV, others, onCompare }) {
  const series = [
    { label: `${v.name}`, vals: d.ind.map((i) => i.val), color: '#17803d' },
    { label: `${v.district} district average`, vals: d.dist, color: '#d98a06', dash: '6 5', fill: 0 },
  ];
  if (dc) series.push({ label: cmpV.name, vals: dc.ind.map((i) => i.val), color: '#2f63c4', fill: 0.12 });
  return (
    <section className="sec" id="scorecard">
      <SectionHead icon="trend" title="Development scorecard">See how {v.name} compares with its district and state, or put it side by side with another village.</SectionHead>
      <div className="g2b">
        <div className="card">
          <div className="cmpsel">
            <label className="lab" htmlFor="cmp">Compare with</label>
            <select id="cmp" value={cmpV?.id || ''} onChange={(e) => onCompare(e.target.value)}>
              <option value="">No village</option>
              {others.map((o) => <option key={o.id} value={o.id}>{o.name} ({o.state})</option>)}
            </select>
          </div>
          <div className="radarw"><Radar series={series} /></div>
          <div className="keyl">{series.map((s) => <span key={s.label} style={{ '--c': s.color }}>{s.label}</span>)}</div>
        </div>
        <div className="card">
          <div className="ind">
            {d.ind.map((i, k) => (
              <div className="it" key={i.k}>
                <h4>{i.n}<b>{i.val}%</b></h4>
                <div className="tr"><i style={{ width: `${i.val}%`, background: i.val >= d.dist[k] ? 'var(--green)' : 'var(--rose)' }} /></div>
                <div className="mini3"><span>District <b>{d.dist[k]}%</b></span><span>State <b>{d.state[k]}%</b></span>{dc && <span>{cmpV.name} <b>{dc.ind[k].val}%</b></span>}
                  <span className="sp" /><span style={{ color: i.val >= d.dist[k] ? 'var(--green)' : 'var(--rose)' }}>{i.val >= d.dist[k] ? '+' : ''}{i.val - d.dist[k]} vs district</span></div>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 16 }}>District and state averages are sample figures. Green means the village is at or above the district average.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS
   ========================================================= */
function Projects({ d }) {
  const tot = d.projects.reduce((a, p) => a + p.budget, 0), spent = d.projects.reduce((a, p) => a + p.spent, 0);
  const done = d.projects.filter((p) => p.status === 'Completed').length;
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(false); const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t); }, [d]);
  return (
    <section className="sec" id="projects">
      <SectionHead icon="wrench" title="Development projects">Works planned and under way in the village, with budget, spending and progress.</SectionHead>
      <div className="sum">
        <div style={{ background: 'var(--blue-soft)' }}><small>Total budget</small><b>₹{tot.toFixed(1)} lakh</b></div>
        <div style={{ background: 'var(--green-soft)' }}><small>Spent so far</small><b>₹{spent.toFixed(1)} lakh</b></div>
        <div style={{ background: 'var(--amber-soft)' }}><small>Completed</small><b>{done} of {d.projects.length}</b></div>
      </div>
      <div className="pj">
        {d.projects.map((p) => (
          <article className="pr fade" key={p.n}>
            <div>
              <div className="row"><h4>{p.n}</h4><span className={`risk st-${p.status}`}>{p.status}</span></div>
              <p>Run by {p.by}</p>
              <div className="meta"><span>{p.s}</span><span>Budget ₹{p.budget} lakh</span><span>{p.status === 'Completed' ? 'Finished' : 'Due'} {p.due}</span></div>
            </div>
            <div>
              <div className="pnum"><span>Progress</span><span>{p.progress}%</span></div>
              <div className="pbar"><i style={{ width: on ? `${p.progress}%` : '0%', background: p.status === 'Completed' ? 'var(--green)' : 'var(--blue)' }} /></div>
              <p className="note" style={{ marginTop: 8 }}>₹{p.spent.toFixed(1)} lakh spent of ₹{p.budget} lakh</p>
            </div>
          </article>
        ))}
      </div>
      <p className="note" style={{ marginTop: 14 }}>Sample projects for demonstration. Real project data is public on Gram Panchayat and scheme portals.</p>
    </section>
  );
}

/* =========================================================
   REPORT AN ISSUE
   ========================================================= */
const STEPS = ['Received', 'Assigned', 'In progress', 'Resolved'];
const COMMUNITY = [
  { id: 1, cat: 'Road', t: 'Potholes on the road to the bus stop', votes: 42 },
  { id: 2, cat: 'Street light', t: 'Three street lights not working near the school', votes: 27 },
  { id: 3, cat: 'Drinking water', t: 'Low tap pressure in the lower ward in the evening', votes: 19 },
];

function Report({ v, toast }) {
  const [cat, setCat] = useState(NEEDS[0]);
  const [text, setText] = useState('');
  const [mine, setMine] = useState([]);
  const [issues, setIssues] = useState(COMMUNITY.map((i) => ({ ...i, voted: false })));
  const submit = () => {
    if (text.trim().length < 10) { toast('Please describe the problem in a few words'); return; }
    const id = `VIL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setMine((m) => [{ id, cat, text: text.trim(), step: 0, at: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }, ...m]);
    setText('');
    toast(`Report submitted. Your ticket is ${id}`);
  };
  const vote = (id) => setIssues((l) => l.map((i) => (i.id === id ? { ...i, voted: !i.voted, votes: i.votes + (i.voted ? -1 : 1) } : i)).sort((a, b) => b.votes - a.votes));
  return (
    <section className="sec" id="report">
      <SectionHead icon="alert" title="Report an issue">See something broken in {v.name}? Tell the Gram Panchayat, and back the problems your neighbours have already raised.</SectionHead>
      <div className="g2 eq">
        <div className="card">
          <h3>New report</h3>
          <div className="form" style={{ marginTop: 14 }}>
            <div className="field"><label htmlFor="rcat">What is the problem about?</label>
              <select id="rcat" className="input" value={cat} onChange={(e) => setCat(e.target.value)}>{NEEDS.map((n) => <option key={n}>{n}</option>)}</select></div>
            <div className="field"><label htmlFor="rtxt">Describe it</label>
              <textarea id="rtxt" className="input" placeholder="For example: the hand pump near the temple has not worked for two weeks." value={text} onChange={(e) => setText(e.target.value)} /></div>
            <button className="btn-solid" onClick={submit}><Icon n="plus" s={18} />Submit report</button>
            <p className="note">Demo only: reports stay on this page and are not sent anywhere. Connect the form to your backend or your state's grievance portal.</p>
          </div>
          {mine.length > 0 && (
            <div className="iss">
              {mine.map((t) => (
                <div className="tk fade" key={t.id}>
                  <div className="row"><span className="id">{t.id}</span><span className="sp" /><span className="tag">{t.cat} · {t.at}</span></div>
                  <p style={{ fontSize: 13.5, marginTop: 6, fontWeight: 600 }}>{t.text}</p>
                  <div className="steps">{STEPS.map((s, i) => <div key={s} className={i <= t.step ? 'done' : ''}>{s}</div>)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h3>Raised by neighbours</h3>
          <p className="note" style={{ marginTop: 4 }}>Tap the button if you face the same problem. The most common issues rise to the top.</p>
          <div className="iss">
            {issues.map((i) => (
              <div className="is" key={i.id}>
                <button className="vote" aria-pressed={i.voted} onClick={() => vote(i.id)} aria-label={`Me too, ${i.votes} votes`}><Icon n="thumb" s={16} />{i.votes}</button>
                <div><p>{i.t}</p><small>{i.cat}</small></div>
              </div>
            ))}
          </div>
          <div className="emg">
            {EMERGENCY.map(([n, l]) => (
              <a key={n} href={`tel:${n}`} style={{ gridColumn: 'span 2' }}><Icon n="phone" s={20} /><div><b>{n}</b><small>{l}</small></div></a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
   ========================================================= */
export default function Information() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('rd-theme'); } catch { return null; } });
  const [vid, setVid] = useState('v2');
  const [cmp, setCmp] = useState('');
  const [msg, setMsg] = useState('');
  const timer = useRef(null);

  const v = VILLAGES.find((x) => x.id === vid);
  const d = build(v);
  const cmpV = cmp && cmp !== vid ? VILLAGES.find((x) => x.id === cmp) : null;
  const dc = cmpV ? build(cmpV) : null;
  const states = useMemo(() => [...new Set(VILLAGES.map((x) => x.state))], []);
  const list = VILLAGES.filter((x) => x.state === v.state);
  const others = VILLAGES.filter((x) => x.id !== vid);

  const toast = (m) => { setMsg(m); clearTimeout(timer.current); timer.current = setTimeout(() => setMsg(''), 2800); };
  useEffect(() => () => clearTimeout(timer.current), []);

  const systemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = theme ? theme === 'dark' : systemDark;
  const toggleTheme = () => { const n = dark ? 'light' : 'dark'; setTheme(n); try { localStorage.setItem('rd-theme', n); } catch { /* ignore */ } };

  return (
    <div className="vi" data-theme={theme || undefined}>
      <InfoNav dark={dark} onTheme={toggleTheme} />
      <Hero v={v} d={d} states={states} list={list} onState={(s) => setVid(VILLAGES.find((x) => x.state === s).id)} onVillage={setVid} />
      <Stats />
      <SubNav />

      <main className="wrap" key={v.id}>
        <Overview v={v} d={d} toast={toast} />
        <Facilities d={d} />
        <VillageMap v={v} d={d} />
        <People v={v} d={d} />
        <Scorecard v={v} d={d} dc={dc} cmpV={cmpV} others={others} onCompare={setCmp} />
        <Projects d={d} />
        <Report v={v} toast={toast} />

        <div className="help-line">
          <div className="sp" style={{ minWidth: 260 }}>
            <h2>Is your village missing from the list?</h2>
            <p>Ask your Gram Panchayat to register its details so people can find facilities, projects and services near them.</p>
          </div>
          <a className="btn-light lg" href="#">Request to add my village</a>
        </div>
      </main>

      <footer className="foot"><div className="wrap">Rural Development, Village Information. Village names, figures, projects and averages shown here are sample data for demonstration.</div></footer>
      <div className={`toast ${msg ? 'show' : ''}`} role="status" aria-live="polite">{msg}</div>
    </div>
  );
}