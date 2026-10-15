import { useEffect, useMemo, useRef, useState } from "react";
import "./Deepankar.css";
import Auth from "./Auth";
import Admin from "./Admin pannel/Admin"
import Government from "./Government File/Government"
import Student from "./Student"
import Farmer from "./Farmer corner/Farmer"
import Jobsskill from "./job and skill/Jobsskills"
import Village from "./Village/Information"
import Information from "./Village/Information";


const PATHS = {
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  cap: <><path d="M22 9L12 4 2 9l10 5 10-5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /><path d="M22 9v6" /></>,
  brief: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" /><path d="M3 13h18" /></>,
  sprout: <><path d="M12 21v-8" /><path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z" /><path d="M12 15c0-3-2.5-5-6-5 0 3.5 2.5 5 6 5z" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  bell: <><path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 20a2 2 0 004 0" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /><path d="M16 4.5a3.5 3.5 0 010 7M18 14.3c2.3.7 4 2.4 4 5.7" /></>,
  file: <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  leaf: <path d="M20 4C9 4 4 9 4 15c0 2 .8 3.7 2 5 1.3-4 4-7 8-9-3 3-5 6-5.5 10C16 21 20 15 20 4z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />,
  mega: <><path d="M3 11v2a1 1 0 001 1h3l8 4V6L7 10H4a1 1 0 00-1 1z" /><path d="M19 9a4 4 0 010 6" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  pin: <><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
};

function Icon({ name, size, style }) {
  return (
    <svg
      className="i"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={size ? { width: size, height: size, ...style } : style}
    >
      {PATHS[name]}
    </svg>
  );
}

/* ---------------------------------------------------------------
   Data (replace these with your real data or API responses)
---------------------------------------------------------------- */
const NAV = [
  { key: "home", label: "Home", drawer: "Home", href: "#home", icon: "home" },
  { key: "schemes", label: "Schemes", drawer: "Government schemes", href: "#access", icon: "grid" },
  { key: "students", label: "Students", drawer: "Students", href: "#access", icon: "cap" },
  { key: "jobs", label: "Jobs", drawer: "Jobs and skills", href: "#updates", icon: "brief" },
  { key: "farmers", label: "Farmers", drawer: "Farmers", href: "#farmers", icon: "sprout" },
  { key: "services", label: "Services", drawer: "Services", href: "#checker", icon: "cog" },
];
const TABBAR = ["home", "schemes", "jobs", "farmers", "services"];
const SECTION_TO_NAV = { home: "home", access: "schemes", updates: "jobs", farmers: "farmers", checker: "services" };

const NOTIFICATIONS = [
  { icon: "sprout", bg: "#e5f4ea", fg: "#1e8a4c", title: "Crop insurance window is open", sub: "Enrol before the last date in your district" },
  { icon: "cap", bg: "#e3ecfb", fg: "#2c58a3", title: "Scholarship applications reopened", sub: "Check your eligibility and apply online" },
  { icon: "brief", bg: "#fdecd9", fg: "#c25f1a", title: "New skill training batches", sub: "Free courses starting near you" },
];

const STATS = [
  { icon: "users", bg: "#e3f3e8", fg: "#1e8a4c", end: 1.2, dec: 1, suffix: "M+", label: "People Benefited" },
  { icon: "file", bg: "#fdeccb", fg: "#d8860f", end: 500, dec: 0, suffix: "+", label: "Government Schemes" },
  { icon: "brief", bg: "#e1eafb", fg: "#2c58a3", end: 50, dec: 0, suffix: "K+", label: "Job Opportunities" },
  { icon: "leaf", bg: "#e0f3e3", fg: "#168044", end: 2, dec: 0, suffix: "M+", label: "Farmers Connected" },
];

const QUICK = [
  { title: "Government Schemes", desc: "Explore central and state schemes for rural development", href: "#updates", icon: "grid", t: "#e2f5e8", a: "#1e8a4c" },
  { title: "Student Corner", desc: "Scholarships, education resources and more", href: "#updates", icon: "cap", t: "#e3eafc", a: "#2c58a3" },
  { title: "Jobs & Skills", desc: "Find job opportunities and skill development programs", href: "#updates", icon: "brief", t: "#fdf0d6", a: "#c26a14" },
  { title: "Farmer Corner", desc: "Agriculture support, subsidies and expert guidance", href: "#farmers", icon: "sprout", t: "#dff4e4", a: "#16803f" },
  { title: "Village Information", desc: "Know about your village, facilities and development", href: "#checker", icon: "pin", t: "#fde5e5", a: "#cf2f3f" },
];

const TAG_STYLE = {
  Farmers: ["#dff4e4", "#16803f"],
  Scholarships: ["#e3eafc", "#2c58a3"],
  Jobs: ["#fdf0d6", "#a95a0f"],
  Schemes: ["#e2f5e8", "#1e8a4c"],
  Services: ["#e4e9fb", "#3a5bc7"],
};

const SEARCH_DATA = [
  { t: "PM-KISAN Samman Nidhi", c: "Farmers" },
  { t: "Kisan Credit Card", c: "Farmers" },
  { t: "Crop insurance (PMFBY)", c: "Farmers" },
  { t: "National Scholarship Portal", c: "Scholarships" },
  { t: "Education loan for rural students", c: "Scholarships" },
  { t: "MGNREGA work and wages", c: "Jobs" },
  { t: "Skill India training centres", c: "Jobs" },
  { t: "Rural youth placement programme", c: "Jobs" },
  { t: "Ayushman Bharat health cover", c: "Schemes" },
  { t: "PM Awas Yojana (Gramin)", c: "Schemes" },
  { t: "Self-help group loans", c: "Schemes" },
  { t: "Download income certificate", c: "Services" },
  { t: "Apply for ration card", c: "Services" },
  { t: "Check land records", c: "Services" },
];
const SEARCH_CHIPS = ["All", "Schemes", "Scholarships", "Jobs", "Farmers", "Services"];
const POPULAR = ["PM-KISAN", "Scholarship", "Skill training", "Crop insurance"];

const UPDATES = [
  { c: "Farmers", t: "Crop insurance enrolment is open for the current season", d: "Protect your harvest against weather and pest damage. Enrol through your bank or common service centre.", date: "Today", i: "sprout" },
  { c: "Scholarships", t: "Scholarship applications reopened for school and college students", d: "Apply on the national portal with your Aadhaar, marksheet and income certificate.", date: "Yesterday", i: "cap" },
  { c: "Jobs", t: "Free skill training batches starting in nearby training centres", d: "Short courses with certificates and placement support for rural youth.", date: "2 days ago", i: "brief" },
  { c: "Schemes", t: "Health cover enrolment camps are being held in villages", d: "Bring your family ID and mobile number to get your health card the same day.", date: "3 days ago", i: "shield" },
  { c: "Farmers", t: "Update your land and bank details for direct income support", d: "Complete the e-KYC step so that instalments reach your account without delay.", date: "4 days ago", i: "sprout" },
  { c: "Jobs", t: "Village wage-work demand registration is open", d: "Register your household for guaranteed wage work under the rural employment scheme.", date: "This week", i: "brief" },
];
const UPDATE_TABS = ["All", "Schemes", "Scholarships", "Jobs", "Farmers"];

const MANDI = [
  { name: "Wheat", unit: "Per quintal", price: "₹2,425", change: "+1.2%", up: true, trend: [8, 9, 8, 10, 11, 11, 13] },
  { name: "Paddy", unit: "Per quintal", price: "₹2,320", change: "+0.6%", up: true, trend: [9, 9, 10, 9, 10, 11, 11] },
  { name: "Mustard", unit: "Per quintal", price: "₹5,950", change: "-0.8%", up: false, trend: [13, 12, 13, 11, 11, 10, 10] },
  { name: "Tomato", unit: "Per kg", price: "₹28", change: "-4.1%", up: false, trend: [14, 13, 11, 12, 9, 8, 7] },
];

// [name, description, highest income level that still qualifies: 0 = below 1L, 1 = 1-3L, 2 = above 3L]
const SCHEMES = {
  farmer: [
    ["PM-KISAN", "Income support for farmer families, paid in three instalments a year.", 2],
    ["Kisan Credit Card", "Low-interest credit for seeds, inputs and equipment.", 2],
    ["Crop insurance (PMFBY)", "Cover for crop loss caused by weather, pests and disease.", 2],
  ],
  student: [
    ["National Scholarship Portal", "One place to apply for central and state scholarships.", 1],
    ["PM Vidyalaxmi", "Education loans for eligible students without extra guarantors.", 2],
    ["Skill India courses", "Free skill courses with certificates alongside your studies.", 2],
  ],
  job: [
    ["MGNREGA", "Guaranteed wage work for rural households, up to 100 days a year.", 2],
    ["Skill India (PMKVY)", "Short-term training with certification and job support.", 2],
    ["DDU-GKY", "Placement-linked training for rural youth from low-income families.", 1],
  ],
  woman: [
    ["Mudra loans", "Collateral-free loans to start or grow a small business.", 2],
    ["DAY-NRLM self-help groups", "Group credit, training and market links for rural women.", 1],
    ["Skill India (PMKVY)", "Training in trades with growing local demand.", 2],
  ],
  senior: [
    ["Old age pension (NSAP)", "Monthly pension for senior citizens from low-income households.", 0],
    ["Ayushman Bharat", "Health cover for hospital care for eligible families.", 1],
  ],
};
const EXTRA_LOW_INCOME = [
  ["PM Awas Yojana (Gramin)", "Help to build a pucca house for eligible rural families."],
  ["Ayushman Bharat", "Health cover for hospital care for eligible families."],
];

/* ---------------------------------------------------------------
   Small components
---------------------------------------------------------------- */
function Counter({ end, dec, suffix }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(end);
      return;
    }
    let raf;
    let t0 = null;
    const dur = 1600;
    const step = (t) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / dur, 1);
      setVal(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <b>{val.toFixed(dec)}{suffix}</b>;
}

function Tag({ category, icon }) {
  const [tb, tf] = TAG_STYLE[category];
  return (
    <span className="tag" style={{ "--tb": tb, "--tf": tf }}>
      {icon && <Icon name={icon} size={14} />}
      {category}
    </span>
  );
}

function SunRays() {
  const polys = useMemo(() => {
    const cx = 470, cy = 210, out = [];
    for (let k = 0; k < 24; k++) {
      const a = (k * 15 * Math.PI) / 180;
      const w = (2.2 * Math.PI) / 180;
      const r1 = 60;
      const r2 = k % 2 ? 300 : 420;
      const pts = [
        [cx + r1 * Math.cos(a - w), cy + r1 * Math.sin(a - w)],
        [cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)],
        [cx + r1 * Math.cos(a + w), cy + r1 * Math.sin(a + w)],
      ].map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
      out.push({ pts, o: k % 2 ? 0.28 : 0.4 });
    }
    return out;
  }, []);
  return (
    <g className="rays">
      {polys.map((p, i) => <polygon key={i} points={p.pts} fill="#fff" opacity={p.o} />)}
    </g>
  );
}

/* ---------------------------------------------------------------
   Dashboard
---------------------------------------------------------------- */
export default function Deepankar() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("rd-theme");
      if (saved) return saved === "dark";
    } catch (e) { /* storage unavailable */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
 
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const [heroText, setHeroText] = useState("");
  const [heroChip, setHeroChip] = useState("All");
  const [updTab, setUpdTab] = useState("All");
  const [who, setWho] = useState("farmer");
  const [income, setIncome] = useState("1");
  const [login,setlogin]=useState(false);
   const[dashboard,setdashboard]=useState(false)
   const [student,setstudent]=useState(false)
   const[job,setjob]=useState(false)
   const[farmer,setfarmer]=useState(false)
   const[village,setvillage]=useState(false)
  

  const bellRef = useRef(null);
  const searchInputRef = useRef(null);
  const lastFocus = useRef(null);

function Click(c){
    if( c.title === "Government Schemes"){
    setdashboard(true)
    
  }
  if(c.title === "Student Corner"){
   setstudent(true)
  }
   if(c.title === "Jobs & Skills" ){
   setjob(true)
  }
   if(c.title === "Farmer Corner" ){
   setfarmer(true)
  }
   if(c.title === "Village Information" ){
   setvillage(true)
  }

}




  /* theme */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try { localStorage.setItem("rd-theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ }
  }, [dark]);

  /* header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll spy */
  useEffect(() => {
 
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && SECTION_TO_NAV[e.target.id]) setActive(SECTION_TO_NAV[e.target.id]);
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(SECTION_TO_NAV).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* close notification popup on outside click */
  useEffect(() => {
    const onClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* keyboard: / or Ctrl+K opens search, Esc closes things */
  useEffect(() => {
    const onKey = (e) => {
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      const typing = /INPUT|SELECT|TEXTAREA/.test(tag);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        openSearch("", "");
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setDrawerOpen(false);
        setBellOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* focus the search box when the popup opens */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  function openSearch(text, cat) {
    lastFocus.current = document.activeElement;
    setSearchText(text || "");
    setSearchCat(cat || "");
    setSearchOpen(true);
  }
  function closeSearch() {
    setSearchOpen(false);
    if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
  }

  const searchRows = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return SEARCH_DATA.filter(
      (d) => (!searchCat || d.c === searchCat) &&
        (!q || d.t.toLowerCase().includes(q) || d.c.toLowerCase().includes(q))
    );
  }, [searchText, searchCat]);

  const updRows = UPDATES.filter((u) => updTab === "All" || u.c === updTab);

  const results = useMemo(() => {
    const lvl = Number(income);
    let list = SCHEMES[who].filter((s) => lvl <= s[2]).map((s) => [s[0], s[1]]);
    if (lvl === 0) {
      EXTRA_LOW_INCOME.forEach((x) => {
        if (!list.some((y) => y[0] === x[0])) list.push(x);
      });
    }
    if (!list.length) list = [["Skill India courses", "Free training open to everyone, whatever your income."]];
    return list.slice(0, 4);
  }, [who, income]);

  const noJump = (e)=>{
    e.preventDefault();
    setlogin(true)
  }  // replace with <Link to="/login"> when you add react-router
 if(login){
  return <Auth/>
 }
 if(dashboard){
  return <Government/>;
}
if(student){
  return <Student/>
}
if(job){
  return <Jobsskill/>
}
if(village){
  return <Information/>
}
if(farmer){
  return <Farmer/>
}

  return (
    <div className="rd">
      {/* ============ HEADER ============ */}
      <header className={"header" + (scrolled ? " scrolled" : "")} id="top">
        <div className="wrap header-in">
          <a href="#home" className="brand" aria-label="Rural Development home">
            <span className="brand-mark" role="img" aria-label="Rural Development logo" />
            <span>
              <span className="brand-name"><b>Rural</b> Development</span>
              <span className="brand-sub">Connecting Villages to Opportunities</span>
            </span>
          </a>

          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.key} href={n.href} className={active === n.key ? "active" : ""} onClick={() => setActive(n.key)}>
                <Icon name={n.icon} />{n.label}
              </a>
            ))}
          </nav>

          <div className="actions">
            

            <div className="rel" ref={bellRef}>
              <button
                className="icon-btn ghost"
                aria-label="Notifications, 3 new"
                aria-expanded={bellOpen}
                onClick={() => setBellOpen((o) => !o)}
              >
                <Icon name="bell" /><span className="badge">3</span>
              </button>
              <div className={"pop" + (bellOpen ? " open" : "")} role="dialog" aria-label="Notifications">
                <h4>Notifications</h4>
                {NOTIFICATIONS.map((n) => (
                  <a key={n.title} href="#updates" className="pop-item" onClick={() => setBellOpen(false)}>
                    <span className="pop-dot" style={{ background: n.bg, color: n.fg }}><Icon name={n.icon} /></span>
                    <p><b>{n.title}</b><br /><small>{n.sub}</small></p>
                  </a>
                ))}
              </div>
            </div>

            <button className="icon-btn ghost" onClick={() => setDark((d) => !d)} aria-label="Switch colour theme">
              <Icon name={dark ? "sun" : "moon"} />
            </button>
            <a href="#login" className="btn btn-login" onClick={noJump}>Login</a>
            <a href="#register" className="btn btn-reg" onClick={noJump}>Register</a>
            <button className="icon-btn ghost menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div className={"scrim" + (drawerOpen ? " open" : "")} onClick={() => setDrawerOpen(false)} />
      <aside className={"drawer" + (drawerOpen ? " open" : "")} aria-label="Menu">
        <div className="drawer-top">
          <strong>Menu</strong>
          <button className="icon-btn" style={{ background: "var(--surface-2)" }} onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <Icon name="x" />
          </button>
        </div>
        {NAV.map((n) => (
          <a
            key={n.key}
            href={n.href}
            className={"dl" + (active === n.key ? " active" : "")}
            onClick={() => { setActive(n.key); setDrawerOpen(false); }}
          >
            <span className="ic"><Icon name={n.icon} /></span>{n.drawer}
          </a>
        ))}
        <div className="btns">
          <a href="#login" className="btn btn-login" onClick={noJump}>Login</a>
          <a href="#register" className="btn btn-reg" onClick={noJump}>Register</a>
        </div>
      </aside>

      {/* search popup */}
      <div className={"sx" + (searchOpen ? " open" : "")} role="dialog" aria-modal="true" aria-label="Search"
        onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}>
        <div className="sx-box">
          <div className="sx-in">
            <Icon name="search" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search schemes, scholarships, jobs, services"
              autoComplete="off"
            />
            <kbd>Esc</kbd>
          </div>
          <div className="sx-list">
            {searchRows.length ? (
              searchRows.map((d) => (
                <button key={d.t} className="sx-row" type="button" onClick={closeSearch}>
                  <Icon name="search" style={{ color: "var(--green)" }} />
                  {d.t}
                  <Tag category={d.c} />
                </button>
              ))
            ) : (
              <div className="sx-empty">No results for "{searchText}". Try a shorter word like "loan" or "scholarship".</div>
            )}
          </div>
        </div>
      </div>

      <main id="home">
        {/* ============ HERO ============ */}
        <section className="hero">
          <svg className="leaf-deco" style={{ top: 46 }} viewBox="0 0 90 60" fill="none" aria-hidden="true">
            <path d="M0 40C20 10 50 4 86 14 70 44 30 58 0 40z" fill="#2f8f4e" opacity=".85" />
            <path d="M0 40C25 28 50 20 80 16" stroke="#d3e66b" strokeWidth="2" />
          </svg>
          <svg className="leaf-deco" style={{ top: 180 }} viewBox="0 0 90 60" fill="none" aria-hidden="true">
            <path d="M0 30C20 4 50 0 80 14 66 42 26 54 0 30z" fill="#7bbf5a" opacity=".8" />
          </svg>

          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 800 520" preserveAspectRatio="xMaxYMax slice">
              <defs>
                <radialGradient id="glow" cx="470" cy="210" r="330" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fff" stopOpacity=".95" />
                  <stop offset=".25" stopColor="#ffe9b0" stopOpacity=".6" />
                  <stop offset="1" stopColor="#ffb066" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c98355" /><stop offset="1" stopColor="#a5694b" /></linearGradient>
                <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9b6350" /><stop offset="1" stopColor="#6e4a4a" /></linearGradient>
                <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d4651" /><stop offset="1" stopColor="#3d3342" /></linearGradient>
              </defs>
              <g className="sun-rise">
                <circle cx="470" cy="210" r="330" fill="url(#glow)" />
                <SunRays />
                <circle cx="470" cy="210" r="34" fill="#fff" />
                <circle cx="470" cy="210" r="52" fill="#fff" opacity=".35" />
              </g>
              <path d="M0 360C90 330 170 350 260 318S430 270 520 300 700 330 800 290V520H0z" fill="url(#h1)" opacity=".92" />
              <path d="M0 420C120 380 210 410 320 372S520 350 620 384 740 400 800 380V520H0z" fill="url(#h2)" />
              <path d="M0 470C100 440 220 462 340 446S560 430 680 452 770 460 800 450V520H0z" fill="url(#h3)" />
              <g fill="#2a2234" opacity=".85"><path d="M610 452l8-30 8 30zM628 454l6-22 6 22zM660 450l7-26 7 26z" /></g>
            </svg>
          </div>

          <div className="wrap hero-in">
            <div>
              <h1><span>Empowering</span><span>Rural India</span></h1>
              <h2>Connecting Villages to Opportunities</h2>
              <p className="lead">
                Access government schemes, education, jobs, agriculture support and essential services, all in one place for a brighter tomorrow.
              </p>

              <form
                className="finder"
                role="search"
                onSubmit={(e) => { e.preventDefault(); openSearch(heroText, heroChip === "All" ? "" : heroChip); }}
              >
                <div className="chips" role="group" aria-label="Search in">
                  {SEARCH_CHIPS.map((c) => (
                    <button key={c} type="button" className="chip" aria-pressed={heroChip === c} onClick={() => setHeroChip(c)}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="finder-row">
                  <Icon name="search" style={{ color: "#10243f" }} />
                  <label className="sr" htmlFor="q">Search</label>
                  <input
                    id="q"
                    type="text"
                    value={heroText}
                    onChange={(e) => setHeroText(e.target.value)}
                    placeholder="Search for schemes, scholarships, jobs, farmers, services..."
                    autoComplete="off"
                  />
                  <button className="btn" type="submit">Search</button>
                </div>
              </form>

              <div className="popular">
                Popular:
                {POPULAR.map((p) => (
                  <button key={p} type="button" onClick={() => openSearch(p, "")}>{p}</button>
                ))}
              </div>

              <div className="stats">
                {STATS.map((s) => (
                  <div className="stat" key={s.label} style={{ "--bgc": s.bg, "--fgc": s.fg }}>
                    <span className="ic"><Icon name={s.icon} /></span>
                    <div><Counter end={s.end} dec={s.dec} suffix={s.suffix} /><small>{s.label}</small></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tagline" aria-hidden="true">Stronger<br />Villages<br />Brighter<br />Tomorrow</div>
          </div>
        </section>

        {/* ============ QUICK ACCESS ============ */}
        <section className="access" id="access">
          <div className="wrap access-grid">
            {QUICK.map((c) => (
              <div key={c.title} className="qa" href={c.href} style={{ "--t": c.t, "--a": c.a }} onClick={()=>Click(c)}>
                <span  className="go"><Icon name="arrow" /></span>
                <span className="ic"><Icon name={c.icon} /></span>
                <div><h3>{c.title}</h3><p>{c.desc}</p>
              
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ LATEST UPDATES ============ */}
        <section className="block" id="updates">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2><Icon name="mega" />Latest Updates</h2>
                <p>New schemes, openings and deadlines, sorted so you see what matters first.</p>
              </div>
              <a href="#updates" className="btn-outline btn" onClick={()=>Click()}>View All <Icon name="arrow" /></a>
            </div>
            <div className="tabs" role="tablist">
              {UPDATE_TABS.map((t) => (
                <button key={t} className="tab" role="tab" aria-selected={updTab === t} onClick={() => setUpdTab(t)}>{t}</button>
              ))}
            </div>
            <div className="upd-grid">
              {updRows.length ? updRows.map((u) => (
                <article className="upd" key={u.t}>
                  <div className="upd-top"><Tag category={u.c} icon={u.i} /><time>{u.date}</time></div>
                  <h3>{u.t}</h3>
                  <p>{u.d}</p>
                  <a className="more" href="#updates">Read details <Icon name="arrow" size={16} /></a>
                </article>
              )) : <p style={{ color: "var(--muted)" }}>No updates in this category yet.</p>}
            </div>
          </div>
        </section>

        {/* ============ FARMERS ============ */}
        <section className="block" id="farmers">
          <div className="wrap">
            <div className="farm">
              <div className="farm-l">
                <h2>Farmer Corner</h2>
                <p>Support that follows the seasons: subsidies, insurance, credit and daily market rates in one place.</p>
                <ul className="farm-list">
                  {["Check subsidy and insurance eligibility", "See today's crop prices before you sell", "Ask agriculture experts for advice"].map((t) => (
                    <li key={t}><span className="ck"><Icon name="check" /></span>{t}</li>
                  ))}
                </ul>
                <a href="#checker" className="btn btn-white">Explore Farmer Corner <Icon name="arrow" /></a>
              </div>
              <div className="farm-r">
                <div className="mandi">
                  <div className="mandi-h"><h3>Today's crop prices</h3><small>Sample data</small></div>
                  {MANDI.map((m) => (
                    <div className="row" key={m.name}>
                      <div><b>{m.name}</b><small>{m.unit}</small></div>
                      <svg className="spark" viewBox="0 0 84 30" aria-hidden="true">
                        <polyline
                          points={m.trend.map((v, i) => i * 14 + "," + (30 - v * 2)).join(" ")}
                          fill="none"
                          stroke={m.up ? "#17803f" : "#d33b3b"}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="pr">{m.price}<em className={m.up ? "up" : "down"}>{m.change}</em></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="block" id="how">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2>Get started in three steps</h2>
                <p>No agents and no queues. Everything happens from your phone.</p>
              </div>
            </div>
            <div className="steps">
              <div className="step"><div className="n">1</div><h3>Create your account</h3><p>Register with your mobile number and basic village details.</p></div>
              <div className="step"><div className="n">2</div><h3>Find what fits you</h3><p>Answer a few questions and see only the schemes and jobs you qualify for.</p></div>
              <div className="step"><div className="n">3</div><h3>Apply and track</h3><p>Submit documents online and follow your application status in real time.</p></div>
            </div>
          </div>
        </section>

        {/* ============ ELIGIBILITY CHECKER ============ */}
        <section className="block" id="checker">
          <div className="wrap">
            <div className="check">
              <div className="check-l">
                <h2>Which schemes are meant for you?</h2>
                <p>Tell us a little about yourself. We will list the schemes worth looking at.</p>
                <div className="field">
                  <label htmlFor="who">I am a</label>
                  <select id="who" value={who} onChange={(e) => setWho(e.target.value)}>
                    <option value="farmer">Farmer</option>
                    <option value="student">Student</option>
                    <option value="job">Job seeker</option>
                    <option value="woman">Woman entrepreneur</option>
                    <option value="senior">Senior citizen</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="inc">Yearly family income</label>
                  <select id="inc" value={income} onChange={(e) => setIncome(e.target.value)}>
                    <option value="0">Below ₹1 lakh</option>
                    <option value="1">₹1 to ₹3 lakh</option>
                    <option value="2">Above ₹3 lakh</option>
                  </select>
                </div>
              </div>
              <div className="check-r" aria-live="polite">
                {results.map((s, i) => (
                  <div className="res" key={who + income + s[0]} style={{ animationDelay: i * 0.07 + "s" }}>
                    <span className="ic"><Icon name="check" /></span>
                    <div><b>{s[0]}</b><span>{s[1]}</span></div>
                  </div>
                ))}
                <p className="note">This list is a guide only. Confirm the rules on the official scheme page before you apply.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="cta">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2>Stronger villages start with one sign-up.</h2>
              <p>Join over a million people already using Rural Development.</p>
            </div>
            <div className="btns">
              <a href="#register" className="btn btn-white" onClick={noJump}>Register free</a>
              <a href="#login" className="btn" onClick={noJump}
                style={{ background: "rgba(255,255,255,.14)", color: "#fff", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.5)" }}>
                Login
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="brand-name" style={{ color: "#fff", fontSize: "1.3rem" }}><b>Rural</b> Development</div>
              <p>Connecting villages to schemes, education, jobs and services.</p>
            </div>
            <div><h4>Explore</h4><a href="#access">Government Schemes</a><a href="#access">Student Corner</a><a href="#updates">Jobs &amp; Skills</a></div>
            <div><h4>Support</h4><a href="#farmers">Farmer Corner</a><a href="#checker">Documents &amp; Services</a><a href="#how">How it works</a></div>
            <div><h4>Account</h4><a href="#login" onClick={noJump}>Login</a><a href="#register" onClick={noJump}>Register</a><a href="#top">Back to top</a></div>
          </div>
          <div className="copy">
            <span>&copy; 2026 Rural Development. All rights reserved.</span>
            <span>Stronger Villages, Brighter Tomorrow</span>
          </div>
        </div>
      </footer>

      {/* mobile bottom bar */}
      <nav className="tabbar" aria-label="Quick navigation">
        {TABBAR.map((key) => {
          const n = NAV.find((x) => x.key === key);
          return (
            <a key={key} href={n.href} className={active === key ? "active" : ""} onClick={() => setActive(key)}>
              <Icon name={n.icon} />{n.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}