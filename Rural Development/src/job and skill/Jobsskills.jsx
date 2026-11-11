import { useMemo, useState, useEffect } from "react";
import {
  Search, MapPin, Briefcase, Clock, IndianRupee, Bookmark, BookmarkCheck,
  X, ArrowRight, GraduationCap, Award, PlayCircle, CheckCircle2, Filter,
  Sprout, Wrench, Laptop, HeartPulse, Users, BadgeCheck, Building2,
  Sun, Moon, LayoutDashboard, Wheat, TrendingUp, TrendingDown, Minus,
  Landmark, CloudRain, Droplets, Flame, Menu,
} from "lucide-react";
import styles from "./JobsSkills.module.css";

const CATEGORIES = [
  { id: "all", label: "All", icon: Briefcase },
  { id: "agri", label: "Agriculture", icon: Sprout },
  { id: "skilled", label: "Skilled Trades", icon: Wrench },
  { id: "digital", label: "Digital & Office", icon: Laptop },
  { id: "health", label: "Health & Care", icon: HeartPulse },
  { id: "govt", label: "Government", icon: Building2 },
];

const JOBS = [
  { id: 1, title: "Agriculture Extension Officer", org: "State Agriculture Dept.", cat: "govt", loc: "Balasore, Odisha", type: "Full-time", pay: "₹28,000 – ₹35,000 / month", posted: "2 days ago", openings: 12, last: "Oct 30, 2026", edu: "B.Sc Agriculture", tags: ["Government", "Field work"], desc: "Guide farmers on crop planning, soil health and scheme enrolment across assigned blocks." },
  { id: 2, title: "Solar Pump Technician", org: "GreenGrid Rural Energy", cat: "skilled", loc: "Bhadrak, Odisha", type: "Full-time", pay: "₹16,000 – ₹22,000 / month", posted: "3 days ago", openings: 40, last: "Nov 05, 2026", edu: "ITI Electrical", tags: ["Training provided", "Hiring now"], desc: "Install and maintain solar irrigation pumps in nearby villages. Two-wheeler preferred." },
  { id: 3, title: "Common Service Centre Operator", org: "Digital Seva Kendra", cat: "digital", loc: "Remote / Village", type: "Part-time", pay: "₹8,000 – ₹14,000 / month", posted: "1 week ago", openings: 25, last: "Nov 12, 2026", edu: "12th Pass", tags: ["Work near home"], desc: "Help villagers with certificates, bill payments and online scheme applications." },
  { id: 4, title: "ASHA Health Worker", org: "National Health Mission", cat: "health", loc: "Soro, Odisha", type: "Full-time", pay: "₹10,000 + incentives", posted: "4 days ago", openings: 60, last: "Oct 28, 2026", edu: "10th Pass", tags: ["Women preferred", "Government"], desc: "Community health outreach, maternal care support and immunisation awareness." },
  { id: 5, title: "Farm Produce Quality Inspector", org: "KisanMart Pvt. Ltd.", cat: "agri", loc: "Jaleswar, Odisha", type: "Contract", pay: "₹14,000 – ₹18,000 / month", posted: "5 days ago", openings: 8, last: "Nov 02, 2026", edu: "Diploma / 12th", tags: ["Seasonal"], desc: "Grade and record vegetable and grain produce at collection points before dispatch." },
  { id: 6, title: "Data Entry Operator", org: "Odisha e-Governance Cell", cat: "digital", loc: "Balasore, Odisha", type: "Full-time", pay: "₹12,000 – ₹16,000 / month", posted: "Today", openings: 15, last: "Nov 15, 2026", edu: "Graduate", tags: ["Hiring now", "Government"], desc: "Digitise land, census and welfare records with accuracy and speed." },
  { id: 7, title: "Electrician (Rural Electrification)", org: "TPNODL Contractors", cat: "skilled", loc: "Remuna, Odisha", type: "Full-time", pay: "₹15,000 – ₹20,000 / month", posted: "6 days ago", openings: 30, last: "Nov 08, 2026", edu: "ITI", tags: ["Training provided"], desc: "Line fitting, meter installation and fault repair for village connections." },
  { id: 8, title: "Mobile Anganwadi Assistant", org: "Women & Child Dept.", cat: "health", loc: "Nilgiri, Odisha", type: "Part-time", pay: "₹7,500 / month", posted: "1 week ago", openings: 20, last: "Nov 01, 2026", edu: "10th Pass", tags: ["Women preferred"], desc: "Support nutrition programmes and early childhood activities in your own village." },
];

const SKILLS = [
  { id: 1, title: "Smart Farming Basics", by: "PMKVY", cat: "agri", hours: 40, level: "Beginner", free: true, progress: 0, cert: "Govt. certificate", desc: "Drip irrigation, soil testing and organic inputs." },
  { id: 2, title: "Solar Installation & Repair", by: "Skill India", cat: "skilled", hours: 120, level: "Intermediate", free: true, progress: 45, cert: "NSDC certificate", desc: "Panel mounting, wiring and pump maintenance." },
  { id: 3, title: "Computer & Digital Literacy", by: "NIELIT", cat: "digital", hours: 60, level: "Beginner", free: true, progress: 0, cert: "NIELIT CCC", desc: "Typing, email, UPI, forms and online services." },
  { id: 4, title: "Home Health Aide", by: "NSDC", cat: "health", hours: 90, level: "Beginner", free: true, progress: 0, cert: "NSDC certificate", desc: "Patient care, hygiene and first-aid basics." },
  { id: 5, title: "Tailoring & Garment Making", by: "PMKVY", cat: "skilled", hours: 150, level: "Beginner", free: true, progress: 80, cert: "Govt. certificate", desc: "Stitching, pattern cutting and starting a small unit." },
  { id: 6, title: "Spoken English for Jobs", by: "GramNexa Academy", cat: "digital", hours: 30, level: "Beginner", free: false, progress: 0, cert: "Completion badge", desc: "Interview practice and everyday workplace English." },
];

/* Sample data for Farmer Corner. Replace with your API. */
const MANDI = [
  { crop: "Paddy (common)", mandi: "Balasore", price: 2300, unit: "quintal", change: 1.8 },
  { crop: "Potato", mandi: "Bhadrak", price: 1850, unit: "quintal", change: -3.2 },
  { crop: "Tomato", mandi: "Jaleswar", price: 2600, unit: "quintal", change: 6.4 },
  { crop: "Onion", mandi: "Soro", price: 2200, unit: "quintal", change: 0 },
  { crop: "Green gram (moong)", mandi: "Balasore", price: 8400, unit: "quintal", change: 0.9 },
];

const SCHEMES = [
  { name: "PM-KISAN", note: "Income support of ₹6,000 a year in three instalments.", docs: "Aadhaar, land record, bank passbook" },
  { name: "Pradhan Mantri Fasal Bima Yojana", note: "Crop insurance against flood, drought and pests.", docs: "Land record, sowing certificate" },
  { name: "Kisan Credit Card", note: "Low-interest crop loans from your bank.", docs: "Aadhaar, land record, photo" },
  { name: "Soil Health Card", note: "Free soil test with advice on the right fertiliser.", docs: "Visit your nearest Krushak Sathi" },
];

const CROP_CALENDAR = [
  { month: "Oct", task: "Harvest early kharif paddy", on: true },
  { month: "Nov", task: "Sow pulses and mustard", on: true },
  { month: "Dec", task: "Irrigate wheat, vegetable beds", on: false },
  { month: "Jan", task: "Plant potato, apply compost", on: false },
];

const WEEK = [
  { d: "Mon", h: 1.5 }, { d: "Tue", h: 2 }, { d: "Wed", h: 0.5 }, { d: "Thu", h: 3 },
  { d: "Fri", h: 2.5 }, { d: "Sat", h: 4 }, { d: "Sun", h: 1 },
];

const TYPES = ["All types", "Full-time", "Part-time", "Contract"];
const SORTS = ["Newest", "Most openings", "Closing soon"];

const rupee = (n) => "₹" + n.toLocaleString("en-IN");

function initialTheme() {
  try {
    const s = localStorage.getItem("rd-theme");
    if (s) return s === "dark";
  } catch (e) { /* ignore */ }
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;
}

export default function JobsSkills() {
  const [dark, setDark] = useState(initialTheme);
  const [tab, setTab] = useState("jobs");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [type, setType] = useState("All types");
  const [sort, setSort] = useState("Newest");
  const [saved, setSaved] = useState(() => new Set());
  const [applied, setApplied] = useState(() => new Set());
  const [enrolled, setEnrolled] = useState(() => new Set([2, 5]));
  const [active, setActive] = useState(null);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id) => {
    setTab(id);
    setMenuOpen(false);
    setTimeout(() => document.getElementById("content")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try { localStorage.setItem("rd-theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ }
  }, [dark]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (setter, id, msgOn, msgOff) =>
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); msgOff && setToast(msgOff); }
      else { next.add(id); msgOn && setToast(msgOn); }
      return next;
    });

  const q = query.trim().toLowerCase();

  const jobs = useMemo(() => {
    let list = JOBS.filter((j) =>
      (cat === "all" || j.cat === cat) &&
      (type === "All types" || j.type === type) &&
      (!q || `${j.title} ${j.org} ${j.loc}`.toLowerCase().includes(q))
    );
    if (sort === "Most openings") list = [...list].sort((a, b) => b.openings - a.openings);
    if (sort === "Closing soon") list = [...list].sort((a, b) => new Date(a.last) - new Date(b.last));
    return list;
  }, [q, cat, type, sort]);

  const skills = useMemo(
    () => SKILLS.filter((s) => (cat === "all" || s.cat === cat) && (!q || `${s.title} ${s.by}`.toLowerCase().includes(q))),
    [q, cat]
  );

  const reset = () => { setQuery(""); setCat("all"); setType("All types"); };
  const count = tab === "jobs" ? jobs.length : skills.length;
  const showFilters = tab === "jobs" || tab === "skills";

  const TABS = [
    { id: "jobs", label: "Jobs", icon: Briefcase, n: JOBS.length },
    { id: "skills", label: "Skill training", icon: GraduationCap, n: SKILLS.length },
    { id: "farmer", label: "Farmer Corner", icon: Wheat },
    { id: "dash", label: "Dashboard", icon: LayoutDashboard },
    { id: "mine", label: "My activity", icon: BookmarkCheck, n: saved.size + applied.size },
  ];

  return (
    <main className={styles.page}>
      {/* NAV */}
      
            <button
              className={styles.burger}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Work and training, close to your village</h1>
          <p className={styles.subtitle}>
            Find jobs near home, learn free skills, and track your farm prices in one place.
          </p>

          <div className={styles.searchBar} role="search">
            <Search size={20} aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tab === "skills" ? "Search courses and training programs…" : "Search jobs, employers, locations…"}
              aria-label="Search"
            />
            {query && (
              <button className={styles.clear} onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>
            )}
            <button className={styles.searchBtn} onClick={() => !showFilters && setTab("jobs")}>Search</button>
          </div>

          <div className={styles.stats}>
            <div><strong>50K+</strong><span>Job opportunities</span></div>
            <div><strong>320</strong><span>Free training programs</span></div>
            <div><strong>1.2L</strong><span>Villagers placed</span></div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className={styles.shell} id="content">
        {showFilters && (
          <>
            <div className={styles.chips}>
              {CATEGORIES.map(({ id, label, icon: Icon }) => (
                <button key={id} className={`${styles.chip} ${cat === id ? styles.chipOn : ""}`} onClick={() => setCat(id)}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>

            <div className={styles.toolbar}>
              <p><strong>{count}</strong> {tab === "jobs" ? "jobs" : "programs"} found</p>
              {tab === "jobs" && (
                <div className={styles.selects}>
                  <label><Filter size={15} />
                    <select value={type} onChange={(e) => setType(e.target.value)}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
                  </label>
                  <label>Sort
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>{SORTS.map((s) => <option key={s}>{s}</option>)}</select>
                  </label>
                </div>
              )}
            </div>
          </>
        )}

        {/* JOBS */}
        {tab === "jobs" && (
          jobs.length ? (
            <div className={styles.grid}>
              {jobs.map((j) => (
                <article key={j.id} className={`${styles.card} ${styles[`a_${j.cat}`]}`}>
                  <header>
                    <div className={`${styles.logo} ${styles[`c_${j.cat}`]}`}><Briefcase size={22} /></div>
                    <div className={styles.cardHead}>
                      <h3>{j.title}</h3>
                      <p>{j.org}</p>
                    </div>
                    <button
                      className={`${styles.save} ${saved.has(j.id) ? styles.saved : ""}`}
                      onClick={() => toggle(setSaved, j.id, "Job saved", "Removed from saved")}
                      aria-label={saved.has(j.id) ? "Remove saved job" : "Save job"}
                      aria-pressed={saved.has(j.id)}
                    >
                      {saved.has(j.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                  </header>
                  <div className={styles.pay}><IndianRupee size={16} />{j.pay.replace("₹", "")}</div>
                  <ul className={styles.meta}>
                    <li><MapPin size={15} />{j.loc}</li>
                    <li><Clock size={15} />{j.type} · {j.posted}</li>
                  </ul>
                  <div className={styles.tags}>{j.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <footer>
                    <span className={styles.openings}><Users size={15} /> {j.openings} openings</span>
                    <button className={applied.has(j.id) ? styles.ghost : styles.primary} onClick={() => setActive(j)}>
                      {applied.has(j.id) ? "Applied" : "View details"} <ArrowRight size={15} />
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : <Empty onReset={reset} />
        )}

        {/* SKILLS */}
        {tab === "skills" && (
          skills.length ? (
            <div className={styles.grid}>
              {skills.map((s) => {
                const on = enrolled.has(s.id);
                return (
                  <article key={s.id} className={`${styles.card} ${styles[`a_${s.cat}`]}`}>
                    <header>
                      <div className={`${styles.logo} ${styles[`c_${s.cat}`]}`}><GraduationCap size={22} /></div>
                      <div className={styles.cardHead}>
                        <h3>{s.title}</h3>
                        <p>by {s.by}</p>
                      </div>
                      <span className={s.free ? styles.free : styles.paid}>{s.free ? "Free" : "₹499"}</span>
                    </header>
                    <p className={styles.desc}>{s.desc}</p>
                    <ul className={styles.meta}>
                      <li><Clock size={15} />{s.hours} hours · {s.level}</li>
                      <li><Award size={15} />{s.cert}</li>
                    </ul>
                    {on && s.progress > 0 && (
                      <div className={styles.progress} aria-label={`${s.progress}% complete`}>
                        <div><i style={{ width: `${s.progress}%` }} /></div>
                        <span>{s.progress}% complete</span>
                      </div>
                    )}
                    <footer>
                      <span className={styles.openings}>{on ? <><CheckCircle2 size={15} /> Enrolled</> : "Certificate on completion"}</span>
                      <button
                        className={on ? styles.ghost : styles.primary}
                        onClick={() => toggle(setEnrolled, s.id, "Enrolled. Good luck!", "Enrollment cancelled")}
                      >
                        {on ? (s.progress ? <><PlayCircle size={15} /> Continue</> : "Cancel") : <>Enroll now <ArrowRight size={15} /></>}
                      </button>
                    </footer>
                  </article>
                );
              })}
            </div>
          ) : <Empty onReset={reset} />
        )}

        {/* FARMER CORNER */}
        {tab === "farmer" && (
          <div className={styles.farmer}>
            <div className={styles.advisory}>
              <div>
                <h2>Today’s farm advisory</h2>
                <p>Light rain expected this evening in Balasore. Hold off on spraying and cover harvested paddy.</p>
              </div>
              <ul>
                <li><CloudRain size={18} /> 70% rain</li>
                <li><Droplets size={18} /> 82% humidity</li>
                <li><Flame size={18} /> 31°C high</li>
              </ul>
            </div>

            <section className={styles.panel}>
              <h2><TrendingUp size={18} /> Mandi prices</h2>
              <p className={styles.note}>Sample prices. Connect your mandi data source to show live rates.</p>
              <div className={styles.table}>
                {MANDI.map((m) => {
                  const Tr = m.change > 0 ? TrendingUp : m.change < 0 ? TrendingDown : Minus;
                  const tone = m.change > 0 ? styles.up : m.change < 0 ? styles.down : styles.flat;
                  return (
                    <div key={m.crop} className={styles.trow}>
                      <div><strong>{m.crop}</strong><span>{m.mandi} mandi</span></div>
                      <div className={styles.price}>{rupee(m.price)}<small>/{m.unit}</small></div>
                      <span className={`${styles.delta} ${tone}`}><Tr size={14} /> {Math.abs(m.change)}%</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={styles.panel}>
              <h2><Landmark size={18} /> Schemes you can apply for</h2>
              <div className={styles.schemes}>
                {SCHEMES.map((s) => (
                  <div key={s.name} className={styles.scheme}>
                    <h3>{s.name}</h3>
                    <p>{s.note}</p>
                    <span>Keep ready: {s.docs}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.panel}>
              <h2><Sprout size={18} /> Crop calendar</h2>
              <ol className={styles.calendar}>
                {CROP_CALENDAR.map((c) => (
                  <li key={c.month} className={c.on ? styles.now : ""}>
                    <b>{c.month}</b><span>{c.task}</span>
                  </li>
                ))}
              </ol>
              <button className={styles.primary} onClick={() => { setCat("agri"); setTab("jobs"); }}>
                See farm jobs <ArrowRight size={15} />
              </button>
            </section>
          </div>
        )}

        {/* DASHBOARD */}
        {tab === "dash" && <Dashboard
          applied={applied.size} saved={saved.size}
          enrolled={SKILLS.filter((s) => enrolled.has(s.id))}
          onOpen={setActive}
        />}

        {/* MY ACTIVITY */}
        {tab === "mine" && (
          <div className={styles.activity}>
            <section>
              <h2>Saved jobs</h2>
              {JOBS.filter((j) => saved.has(j.id)).map((j) => (
                <div key={j.id} className={styles.row}>
                  <div><strong>{j.title}</strong><span>{j.org} · {j.loc}</span></div>
                  <button className={styles.ghost} onClick={() => setActive(j)}>View</button>
                </div>
              )).concat(!saved.size ? [<p key="e" className={styles.note}>Tap the bookmark on any job to save it here.</p>] : [])}
            </section>
            <section>
              <h2>Applications</h2>
              {JOBS.filter((j) => applied.has(j.id)).map((j) => (
                <div key={j.id} className={styles.row}>
                  <div><strong>{j.title}</strong><span>{j.org}</span></div>
                  <span className={styles.status}><BadgeCheck size={15} /> Submitted</span>
                </div>
              )).concat(!applied.size ? [<p key="e" className={styles.note}>You haven’t applied to any jobs yet.</p>] : [])}
            </section>
            <section>
              <h2>My training</h2>
              {SKILLS.filter((s) => enrolled.has(s.id)).map((s) => (
                <div key={s.id} className={styles.row}>
                  <div><strong>{s.title}</strong><span>{s.progress}% complete</span></div>
                  <div className={styles.miniBar}><i style={{ width: `${s.progress}%` }} /></div>
                </div>
              )).concat(!enrolled.size ? [<p key="e" className={styles.note}>Enroll in a program to track progress here.</p>] : [])}
            </section>
          </div>
        )}
      </section>

      {/* DETAIL DRAWER */}
      {active && (
        <div className={styles.overlay} onClick={() => setActive(null)}>
          <aside className={styles.drawer} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={active.title}>
            <button className={styles.close} onClick={() => setActive(null)} aria-label="Close"><X size={20} /></button>
            <div className={`${styles.logo} ${styles.big} ${styles[`c_${active.cat}`]}`}><Briefcase size={28} /></div>
            <h2>{active.title}</h2>
            <p className={styles.org}>{active.org}</p>
            <dl className={styles.facts}>
              <div><dt>Location</dt><dd>{active.loc}</dd></div>
              <div><dt>Pay</dt><dd>{active.pay}</dd></div>
              <div><dt>Job type</dt><dd>{active.type}</dd></div>
              <div><dt>Education</dt><dd>{active.edu}</dd></div>
              <div><dt>Openings</dt><dd>{active.openings}</dd></div>
              <div><dt>Apply by</dt><dd>{active.last}</dd></div>
            </dl>
            <h3>About this job</h3>
            <p>{active.desc}</p>
            <div className={styles.drawerActions}>
              <button
                className={styles.primaryLg}
                disabled={applied.has(active.id)}
                onClick={() => toggle(setApplied, active.id, "Application submitted")}
              >
                {applied.has(active.id) ? <><CheckCircle2 size={18} /> Application submitted</> : "Apply now"}
              </button>
              <button className={styles.ghostLg} onClick={() => toggle(setSaved, active.id, "Job saved", "Removed from saved")}>
                {saved.has(active.id) ? "Saved" : "Save for later"}
              </button>
            </div>
          </aside>
        </div>
      )}

      {toast && <div className={styles.toast} role="status">{toast}</div>}
    </main>
  );
}

function Dashboard({ applied, saved, enrolled, onOpen }) {
  const profile = 72;
  const R = 44, C = 2 * Math.PI * R;
  const max = Math.max(...WEEK.map((w) => w.h));
  const total = WEEK.reduce((a, w) => a + w.h, 0);
  const picks = [...JOBS].sort((a, b) => b.openings - a.openings).slice(0, 3);
  const kpis = [
    { label: "Applications", value: applied, icon: BadgeCheck },
    { label: "Saved jobs", value: saved, icon: Bookmark },
    { label: "Courses running", value: enrolled.length, icon: GraduationCap },
    { label: "Hours this week", value: total, icon: Clock },
  ];
  return (
    <div className={styles.dash}>
      <div className={styles.kpis}>
        {kpis.map(({ label, value, icon: Icon }) => (
          <div key={label} className={styles.kpi}>
            <Icon size={20} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <section className={`${styles.panel} ${styles.chart}`}>
        <h2>Learning hours this week</h2>
        <svg viewBox="0 0 280 130" role="img" aria-label="Bar chart of daily learning hours">
          {WEEK.map((w, i) => {
            const h = (w.h / max) * 88;
            return (
              <g key={w.d}>
                <rect x={10 + i * 38} y={100 - h} width="26" height={h} rx="6" className={w.h === max ? styles.barTop : styles.bar} />
                <text x={23 + i * 38} y="120" textAnchor="middle">{w.d}</text>
              </g>
            );
          })}
        </svg>
      </section>

      <section className={`${styles.panel} ${styles.ringBox}`}>
        <svg viewBox="0 0 110 110" role="img" aria-label={`Profile ${profile}% complete`}>
          <circle cx="55" cy="55" r={R} className={styles.ringBg} />
          <circle cx="55" cy="55" r={R} className={styles.ringFg} strokeDasharray={C} strokeDashoffset={C * (1 - profile / 100)} transform="rotate(-90 55 55)" />
          <text x="55" y="61" textAnchor="middle">{profile}%</text>
        </svg>
        <div>
          <h2>Profile strength</h2>
          <p>Add your skills and a phone number to reach 100%. Employers reply faster to complete profiles.</p>
        </div>
      </section>

      <section className={`${styles.panel} ${styles.picks}`}>
        <h2>Jobs hiring the most people</h2>
        {picks.map((j) => (
          <div key={j.id} className={styles.row}>
            <div><strong>{j.title}</strong><span>{j.loc} · {j.openings} openings</span></div>
            <button className={styles.ghost} onClick={() => onOpen(j)}>View</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function Empty({ onReset }) {
  return (
    <div className={styles.empty}>
      <Search size={32} />
      <h3>No results found</h3>
      <p>Try a different keyword or clear the filters.</p>
      <button className={styles.primary} onClick={onReset}>Clear filters</button>
    </div>
  );
}