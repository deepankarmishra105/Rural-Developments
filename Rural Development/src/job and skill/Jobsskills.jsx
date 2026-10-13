import { useMemo, useState, useEffect } from "react";
import {
  Search, MapPin, Briefcase, Clock, IndianRupee, Bookmark, BookmarkCheck,
  X, ArrowRight, GraduationCap, Award, PlayCircle, CheckCircle2, Filter,
  Sprout, Wrench, Laptop, HeartPulse, Users, BadgeCheck, Building2,
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

const TYPES = ["All types", "Full-time", "Part-time", "Contract"];
const SORTS = ["Newest", "Most openings", "Closing soon"];

export default function JobsSkills() {
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

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Jobs &amp; Skills</h1>
          <p className={styles.subtitle}>
            Find work near your village and free training that gets you hired.
          </p>

          <div className={styles.searchBar} role="search">
            <Search size={20} aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tab === "jobs" ? "Search jobs, employers, locations…" : "Search courses and training programs…"}
              aria-label="Search"
            />
            {query && (
              <button className={styles.clear} onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>
            )}
            <button className={styles.searchBtn}>Search</button>
          </div>

          <div className={styles.stats}>
            <div><strong>50K+</strong><span>Job opportunities</span></div>
            <div><strong>320</strong><span>Free training programs</span></div>
            <div><strong>1.2L</strong><span>Villagers placed</span></div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className={styles.shell}>
        <div className={styles.tabs} role="tablist">
          <button role="tab" aria-selected={tab === "jobs"} className={tab === "jobs" ? styles.tabOn : ""} onClick={() => setTab("jobs")}>
            <Briefcase size={18} /> Jobs <em>{JOBS.length}</em>
          </button>
          <button role="tab" aria-selected={tab === "skills"} className={tab === "skills" ? styles.tabOn : ""} onClick={() => setTab("skills")}>
            <GraduationCap size={18} /> Skill training <em>{SKILLS.length}</em>
          </button>
          <button role="tab" aria-selected={tab === "mine"} className={tab === "mine" ? styles.tabOn : ""} onClick={() => setTab("mine")}>
            <BookmarkCheck size={18} /> My activity <em>{saved.size + applied.size}</em>
          </button>
        </div>

        {tab !== "mine" && (
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
                <article key={j.id} className={styles.card}>
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
                  <ul className={styles.meta}>
                    <li><MapPin size={15} />{j.loc}</li>
                    <li><IndianRupee size={15} />{j.pay}</li>
                    <li><Clock size={15} />{j.type} · {j.posted}</li>
                  </ul>
                  <div className={styles.tags}>{j.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <footer>
                    <span className={styles.openings}><Users size={15} /> {j.openings} openings</span>
                    <button className={styles.primary} onClick={() => setActive(j)}>
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
                  <article key={s.id} className={styles.card}>
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