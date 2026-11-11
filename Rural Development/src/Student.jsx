import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Award,
  Clock3,
  IndianRupee,
  MapPin,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  X,
  Sparkles,
  ArrowUpDown,
  ChevronDown,
  FileText,
  UserRound,
  Phone,
  Mail,
  Upload,
  ShieldCheck,
  TrendingUp,
  Check,
  ArrowLeft,
} from "lucide-react";

import styles from "./Student.module.css";

/* ---------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const scholarships = [
  {
    id: 1,
    title: "National Scholarship Portal",
    provider: "Government of India",
    category: "Government",
    level: "College",
    amount: "₹50,000 / year",
    amountValue: 50000,
    deadline: "30 Oct 2026",
    deadlineISO: "2026-10-30",
    location: "All India",
    eligibility: "Class 12 passed students",
    description:
      "Financial assistance for eligible students pursuing undergraduate and higher education.",
    featured: true,
    color: "blue",
  },
  {
    id: 2,
    title: "Post Matric Scholarship",
    provider: "Ministry of Social Justice",
    category: "Government",
    level: "College",
    amount: "Up to ₹25,000",
    amountValue: 25000,
    deadline: "15 Nov 2026",
    deadlineISO: "2026-11-15",
    location: "All India",
    eligibility: "Class 10+ students",
    description:
      "Scholarship support for students continuing education after secondary school.",
    featured: true,
    color: "green",
  },
  {
    id: 3,
    title: "AICTE Pragati Scholarship",
    provider: "AICTE",
    category: "Technical",
    level: "College",
    amount: "₹50,000 / year",
    amountValue: 50000,
    deadline: "20 Nov 2026",
    deadlineISO: "2026-11-20",
    location: "All India",
    eligibility: "Girl students in technical courses",
    description:
      "Support for women pursuing diploma and undergraduate technical education.",
    featured: false,
    color: "purple",
  },
  {
    id: 4,
    title: "Central Sector Scholarship",
    provider: "Department of Higher Education",
    category: "Merit",
    level: "College",
    amount: "₹20,000 / year",
    amountValue: 20000,
    deadline: "10 Dec 2026",
    deadlineISO: "2026-12-10",
    location: "All India",
    eligibility: "Top-performing Class 12 students",
    description:
      "Merit-based financial assistance for academically strong students.",
    featured: true,
    color: "orange",
  },
  {
    id: 5,
    title: "INSPIRE Scholarship",
    provider: "Department of Science & Technology",
    category: "Science",
    level: "College",
    amount: "₹80,000 / year",
    amountValue: 80000,
    deadline: "25 Dec 2026",
    deadlineISO: "2026-12-25",
    location: "All India",
    eligibility: "Students pursuing basic sciences",
    description:
      "Encouraging young students to pursue careers in science and research.",
    featured: false,
    color: "teal",
  },
  {
    id: 6,
    title: "Reliance Foundation Scholarship",
    provider: "Reliance Foundation",
    category: "Private",
    level: "College",
    amount: "Up to ₹2,00,000",
    amountValue: 200000,
    deadline: "05 Jan 2027",
    deadlineISO: "2027-01-05",
    location: "All India",
    eligibility: "Undergraduate students",
    description:
      "Merit-cum-means scholarship for talented undergraduate students.",
    featured: true,
    color: "pink",
  },
];

const courses = [
  {
    id: 1,
    title: "Digital Skills for Rural Youth",
    provider: "GramNexa Academy",
    type: "Free",
    duration: "8 Weeks",
    students: "12K+",
    level: "Beginner",
    category: "Technology",
    color: "green",
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    provider: "Skill India",
    type: "Free",
    duration: "12 Weeks",
    students: "18K+",
    level: "Beginner",
    category: "Technology",
    color: "blue",
  },
  {
    id: 3,
    title: "Agriculture & Modern Farming",
    provider: "AgriSkill India",
    type: "Free",
    duration: "6 Weeks",
    students: "9K+",
    level: "Beginner",
    category: "Agriculture",
    color: "orange",
  },
  {
    id: 4,
    title: "Entrepreneurship & Small Business",
    provider: "MSME Academy",
    type: "Free",
    duration: "10 Weeks",
    students: "7K+",
    level: "Intermediate",
    category: "Business",
    color: "purple",
  },
];

const categories = ["All", "Government", "Merit", "Technical", "Science", "Private"];

const sortOptions = [
  { id: "featured", label: "Featured first" },
  { id: "deadline", label: "Deadline, soonest" },
  { id: "amount", label: "Amount, highest" },
];

/* ---------------------------------------------------------------
   SMALL HELPERS
---------------------------------------------------------------- */
function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: keep working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ---------------------------------------------------------------
   3D PRIMITIVES
---------------------------------------------------------------- */

/** Solid box made from CSS 3D faces. Position is relative to its Group. */
function Block({ x = 0, y = 0, z = 0, w, d, h, color = "#888", className = "" }) {
  return (
    <div
      className={`${styles.blk} ${className}`}
      style={{
        "--w": `${w}px`,
        "--d": `${d}px`,
        "--h": `${h}px`,
        "--c": color,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
      }}
    >
      <i className={`${styles.face} ${styles.fTop}`} />
      <i className={`${styles.face} ${styles.fFront}`} />
      <i className={`${styles.face} ${styles.fBack}`} />
      <i className={`${styles.face} ${styles.fLeft}`} />
      <i className={`${styles.face} ${styles.fRight}`} />
    </div>
  );
}

/** Positions and rotates a set of blocks together. `bob` makes it float. */
function Group({ x = 0, y = 0, z = 0, rot = 0, bob, children }) {
  return (
    <div
      className={styles.group}
      style={{ transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rot}deg)` }}
    >
      {bob !== undefined ? (
        <div className={styles.bob} style={{ animationDelay: `${bob}s` }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/** The hero: graduation cap on a stack of books, on a study desk. */
function StudyScene() {
  const stageRef = useRef(null);

  const move = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };

  const leave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <div
      className={styles.stage}
      ref={stageRef}
      onPointerMove={move}
      onPointerLeave={leave}
      aria-hidden="true"
    >
      <div className={styles.glowDisc} />
      <div className={styles.stageShadow} />

      <div className={styles.tilt3d}>
        <div className={styles.sway}>
          <div className={styles.world}>
            {/* desk */}
            <Block w={440} d={440} h={16} color="#14424a" className={styles.desk} />

            {/* book stack */}
            <Group x={220} y={230} z={16} rot={-6}>
              <Block x={-95} y={-65} w={190} d={130} h={30} color="#2a5bd7" className={styles.bookBlk} />
            </Group>
            <Group x={220} y={230} z={46} rot={8}>
              <Block x={-80} y={-58} w={160} d={116} h={26} color="#e0562f" className={styles.bookBlk} />
            </Group>
            <Group x={220} y={230} z={72} rot={-3}>
              <Block x={-70} y={-52} w={140} d={104} h={22} color="#2f9e5b" className={styles.bookBlk} />
            </Group>

            {/* graduation cap, floating above the books */}
            <Group x={220} y={230} z={100} rot={24} bob={0}>
              <Block x={-42} y={-42} w={84} d={84} h={30} color="#1d2c33" />
              <Block x={-108} y={-108} z={30} w={216} d={216} h={9} color="#0e1a20" className={styles.board} />
              <Block x={-8} y={-8} z={39} w={16} d={16} h={8} color="#f2b53a" />
              <Block x={-2} y={0} z={39} w={4} d={108} h={3} color="#f2b53a" />
              <Block x={-5} y={104} z={-10} w={10} d={10} h={50} color="#f2b53a" />
              <Block x={-7} y={102} z={-24} w={14} d={14} h={16} color="#d99a1b" />
            </Group>

            {/* pencil */}
            <Group x={340} y={345} z={16} rot={-32}>
              <Block x={-92} y={-7} w={12} d={14} h={14} color="#e86a7a" />
              <Block x={-80} y={-7} w={130} d={14} h={14} color="#f2b53a" />
              <Block x={50} y={-7} w={26} d={14} h={14} color="#f0d6b0" />
              <Block x={76} y={-3} w={10} d={6} h={6} color="#2b2b2b" />
            </Group>

            {/* floating certificate */}
            <Group x={100} y={335} z={64} rot={14} bob={0.9}>
              <Block x={-62} y={-44} w={124} d={88} h={4} color="#fffaf0" className={styles.cert} />
              <Block x={22} y={10} z={4} w={24} d={24} h={5} color="#d6455d" />
            </Group>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card that tilts in 3D towards the pointer. */
function Tilt({ as: Tag = "article", className = "", children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 11).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag
      ref={ref}
      className={`${styles.tilt} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------
   PAGE
---------------------------------------------------------------- */
function Student() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);

  const [saved, setSaved] = usePersisted("gramnexa:saved", []);
  const [applications, setApplications] = usePersisted("gramnexa:applications", []);
  const [enrolled, setEnrolled] = usePersisted("gramnexa:enrolled", []);

  const [selected, setSelected] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [toast, setToast] = useState("");

  const sortRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    const list = scholarships.filter((item) => {
      const matchesSearch =
        !q ||
        `${item.title} ${item.provider} ${item.category} ${item.eligibility}`
          .toLowerCase()
          .includes(q);
      const matchesCategory = category === "All" || item.category === category;
      const matchesSaved = !savedOnly || saved.includes(item.id);
      return matchesSearch && matchesCategory && matchesSaved;
    });

    const sorted = [...list];
    if (sortBy === "deadline") {
      sorted.sort((a, b) => a.deadlineISO.localeCompare(b.deadlineISO));
    } else if (sortBy === "amount") {
      sorted.sort((a, b) => b.amountValue - a.amountValue);
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [search, category, sortBy, savedOnly, saved]);

  const toggleSaved = (item) => {
    const isSaved = saved.includes(item.id);
    setSaved((prev) => (isSaved ? prev.filter((id) => id !== item.id) : [...prev, item.id]));
    showToast(isSaved ? "Removed from saved" : "Saved to your list");
  };

  const toggleEnrolled = (course) => {
    const isIn = enrolled.includes(course.id);
    setEnrolled((prev) => (isIn ? prev.filter((id) => id !== course.id) : [...prev, course.id]));
    showToast(isIn ? `Left ${course.title}` : `Enrolled in ${course.title}`);
  };

  const openApplication = (item) => {
    setSelected(item);
    setShowApplication(true);
  };

  const closeAll = () => {
    setShowApplication(false);
    setSelected(null);
  };

  // close sort menu on outside click
  useEffect(() => {
    if (!sortOpen) return undefined;
    const onDown = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [sortOpen]);

  // Escape closes modals, and the page behind does not scroll
  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (e) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [selected]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const activeSort = sortOptions.find((o) => o.id === sortBy);

  return (
    <div className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <a className={styles.backBtn} href="/dashboard">
  <ArrowLeft size={16} />
  Back to Dashboard
</a>
             <p className={styles.heroKicker}>
              <span className={styles.kickerDot} />
              For students in rural India
            </p>

            <h1 className={styles.heroTitle}>
              Scholarships, courses and careers, all in one place.
            </h1>

            <p className={styles.heroText}>
              Find money for your education, learn skills that employers want,
              and apply without visiting a dozen different portals.
            </p>

            <form
              className={styles.heroSearch}
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                scrollToId("scholarships");
              }}
            >
              <Search size={20} className={styles.heroSearchIcon} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scholarships, providers, subjects"
                aria-label="Search scholarships"
              />
              {search && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className={styles.heroSearchSubmit}>
                Search
              </button>
            </form>

            <div className={styles.popular}>
              <span>Popular</span>
              {["Government", "Technical", "Science"].map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => {
                    setCategory(word);
                    setSearch("");
                    scrollToId("scholarships");
                  }}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <StudyScene />
        </div>

        <div className={styles.stats}>
          <Stat icon={<Award size={20} />} number="500+" label="Scholarships" />
          <Stat icon={<BookOpen size={20} />} number="1,200+" label="Courses" />
          <Stat icon={<BriefcaseBusiness size={20} />} number="850+" label="Career opportunities" />
          <Stat icon={<UserRound size={20} />} number="2M+" label="Students reached" />
        </div>
      </section>

      <main className={styles.container}>
        {/* ================= JUMP LINKS ================= */}
        <section className={styles.jumpRow} aria-label="Quick links">
          <Jump
            icon={<Award size={22} />}
            title="Scholarships"
            text="Find financial support"
            color="green"
            onClick={() => scrollToId("scholarships")}
          />
          <Jump
            icon={<BookOpen size={22} />}
            title="Courses"
            text="Learn new skills"
            color="blue"
            onClick={() => scrollToId("courses")}
          />
          <Jump
            icon={<FileText size={22} />}
            title="My applications"
            text={
              applications.length
                ? `${applications.length} submitted`
                : "Track your progress"
            }
            color="orange"
            onClick={() => scrollToId("applications")}
          />
          <Jump
            icon={<TrendingUp size={22} />}
            title="Why GramNexa"
            text="How we help"
            color="purple"
            onClick={() => scrollToId("why")}
          />
        </section>

        {/* ================= SCHOLARSHIPS ================= */}
        <section className={styles.section} id="scholarships">
          <div className={styles.sectionHead}>
            <h2>Scholarships for you</h2>
            <p>Browse scholarships, save the ones you like, and apply directly.</p>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.pills} role="group" aria-label="Scholarship categories">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`${styles.pill} ${category === item ? styles.pillActive : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.filterTools}>
              <button
                type="button"
                aria-pressed={savedOnly}
                onClick={() => setSavedOnly((v) => !v)}
                className={`${styles.toolBtn} ${savedOnly ? styles.toolBtnOn : ""}`}
              >
                <BookmarkCheck size={16} />
                Saved{saved.length ? ` (${saved.length})` : ""}
              </button>

              <div className={styles.sortWrap} ref={sortRef}>
                <button
                  type="button"
                  className={styles.toolBtn}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  onClick={() => setSortOpen((v) => !v)}
                >
                  <ArrowUpDown size={16} />
                  {activeSort.label}
                  <ChevronDown size={15} />
                </button>

                {sortOpen && (
                  <div className={styles.sortMenu} role="listbox">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        role="option"
                        aria-selected={sortBy === option.id}
                        className={sortBy === option.id ? styles.sortItemOn : ""}
                        onClick={() => {
                          setSortBy(option.id);
                          setSortOpen(false);
                        }}
                      >
                        {option.label}
                        {sortBy === option.id && <Check size={15} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className={styles.resultCount} aria-live="polite">
            Showing <strong>{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "scholarship" : "scholarships"}
          </p>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((item) => (
                <ScholarshipCard
                  key={item.id}
                  scholarship={item}
                  saved={saved.includes(item.id)}
                  applied={applications.some((a) => a.scholarshipId === item.id)}
                  onSave={() => toggleSaved(item)}
                  onApply={() => openApplication(item)}
                  onDetails={() => setSelected(item)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <Search size={34} />
              <h3>
                {savedOnly && !saved.length
                  ? "You have not saved any scholarships yet"
                  : "No scholarships match your search"}
              </h3>
              <p>
                {savedOnly && !saved.length
                  ? "Tap the bookmark on a scholarship to keep it here."
                  : "Try another word or choose a different category."}
              </p>
              <button
                type="button"
                className={styles.solidBtn}
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSavedOnly(false);
                }}
              >
                Clear search and filters
              </button>
            </div>
          )}
        </section>

        {/* ================= COURSES ================= */}
        <section className={styles.section} id="courses">
          <div className={styles.sectionHead}>
            <h2>Recommended courses</h2>
            <p>Free courses that build skills you can use in your next job or study.</p>
          </div>

          <div className={styles.courseGrid}>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrolled={enrolled.includes(course.id)}
                onToggle={() => toggleEnrolled(course)}
              />
            ))}
          </div>
        </section>

        {/* ================= APPLICATIONS ================= */}
        <section className={styles.section} id="applications">
          <div className={styles.sectionHead}>
            <h2>Your applications</h2>
            <p>Every scholarship you apply for appears here with its status.</p>
          </div>

          {applications.length === 0 ? (
            <div className={styles.trackerEmpty}>
              <div className={styles.trackerEmptyIcon}>
                <FileText size={26} />
              </div>
              <div>
                <h3>No applications yet</h3>
                <p>Pick a scholarship above and choose Apply now. It will show up here.</p>
              </div>
              <button
                type="button"
                className={styles.goldBtn}
                onClick={() => scrollToId("scholarships")}
              >
                Browse scholarships
              </button>
            </div>
          ) : (
            <ul className={styles.appList}>
              {applications.map((app) => (
                <ApplicationRow key={app.id} app={app} />
              ))}
            </ul>
          )}
        </section>

        {/* ================= WHY ================= */}
        <section className={styles.section} id="why">
          <div className={styles.sectionHead}>
            <h2>A simpler way to find opportunities</h2>
          </div>

          <div className={styles.whyGrid}>
            <Feature
              icon={<ShieldCheck size={26} />}
              title="Trusted information"
              text="Scholarship and course details gathered in one place, with the provider named."
            />
            <Feature
              icon={<Search size={26} />}
              title="Easy discovery"
              text="Search and filter by category, deadline and amount."
            />
            <Feature
              icon={<FileText size={26} />}
              title="Simple applications"
              text="Apply in a few fields without getting lost between portals."
            />
            <Feature
              icon={<TrendingUp size={26} />}
              title="Grow your career"
              text="Pair a scholarship with a free course that matches your goals."
            />
          </div>
        </section>
      </main>

      {/* ================= MODALS ================= */}
      {selected && !showApplication && (
        <ScholarshipDetails
          scholarship={selected}
          saved={saved.includes(selected.id)}
          onSave={() => toggleSaved(selected)}
          onClose={closeAll}
          onApply={() => setShowApplication(true)}
        />
      )}

      {selected && showApplication && (
        <ApplicationModal
          scholarship={selected}
          onClose={closeAll}
          onSubmitted={(app) => setApplications((prev) => [app, ...prev])}
          onViewApplications={() => {
            closeAll();
            setTimeout(() => scrollToId("applications"), 50);
          }}
        />
      )}

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   COMPONENTS
---------------------------------------------------------------- */
function Stat({ icon, number, label }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statIcon}>{icon}</div>
      <div>
        <strong>{number}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Jump({ icon, title, text, color, onClick }) {
  return (
    <button type="button" className={`${styles.jumpBtn} ${styles[color]}`} onClick={onClick}>
      <span className={styles.jumpIcon}>{icon}</span>
      <span className={styles.jumpText}>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <ArrowRight size={18} className={styles.jumpArrow} />
    </button>
  );
}

function ScholarshipCard({ scholarship, saved, applied, onSave, onApply, onDetails }) {
  return (
    <Tilt className={`${styles.card} ${styles[scholarship.color]}`}>
      <div className={styles.glare} />

      <div className={`${styles.cardTop} ${styles.layer2}`}>
        <div className={styles.iconTile}>
          <Award size={24} />
        </div>

        <div className={styles.cardTopRight}>
          {scholarship.featured && (
            <span className={styles.featuredTag}>
              <Sparkles size={12} />
              Featured
            </span>
          )}
          <button
            type="button"
            className={`${styles.saveBtn} ${saved ? styles.saveBtnOn : ""}`}
            onClick={onSave}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save scholarship"}
          >
            {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
      </div>

      <div className={styles.layer1}>
        <div className={styles.provider}>{scholarship.provider}</div>
        <h3 className={styles.cardTitle}>{scholarship.title}</h3>
        <p className={styles.cardDesc}>{scholarship.description}</p>
      </div>

      <div className={`${styles.amountBox} ${styles.layer2}`}>
        <span>Amount</span>
        <strong>{scholarship.amount}</strong>
      </div>

      <ul className={`${styles.infoList} ${styles.layer1}`}>
        <li>
          <CalendarDays size={15} />
          Apply by {scholarship.deadline}
        </li>
        <li>
          <MapPin size={15} />
          {scholarship.location}
        </li>
        <li>
          <CheckCircle2 size={15} />
          {scholarship.eligibility}
        </li>
      </ul>

      <div className={`${styles.cardActions} ${styles.layer1}`}>
        <button type="button" className={styles.ghostBtn} onClick={onDetails}>
          Details
        </button>
        <button type="button" className={styles.solidBtn} onClick={onApply}>
          {applied ? "Applied, apply again" : "Apply now"}
          <ArrowRight size={15} />
        </button>
      </div>
    </Tilt>
  );
}

function CourseCard({ course, enrolled, onToggle }) {
  return (
    <Tilt className={`${styles.courseCard} ${styles[course.color]}`}>
      <div className={styles.glare} />

      <div className={styles.courseCover}>
        <div className={styles.book3d}>
          <span className={styles.bookFront}>
            <BookOpen size={26} />
          </span>
          <span className={styles.bookSpine} />
          <span className={styles.bookPages} />
        </div>
        <span className={styles.freeTag}>{course.type}</span>
      </div>

      <div className={`${styles.courseBody} ${styles.layer1}`}>
        <small className={styles.courseProvider}>{course.provider}</small>
        <h3>{course.title}</h3>

        <div className={styles.courseMeta}>
          <span>
            <Clock3 size={14} />
            {course.duration}
          </span>
          <span>
            <UserRound size={14} />
            {course.students} learners
          </span>
        </div>

        <div className={styles.courseFooter}>
          <span className={styles.levelTag}>{course.level}</span>
          <button
            type="button"
            className={enrolled ? styles.enrolledBtn : styles.solidBtn}
            onClick={onToggle}
            aria-pressed={enrolled}
          >
            {enrolled ? (
              <>
                <Check size={15} />
                Enrolled
              </>
            ) : (
              <>
                Start learning
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </Tilt>
  );
}

function ApplicationRow({ app }) {
  const steps = ["Submitted", "Documents checked", "Decision"];
  return (
    <li className={styles.appRow}>
      <div className={styles.appMain}>
        <strong>{app.title}</strong>
        <span>{app.provider}</span>
        <span className={styles.appId}>
          {app.id} · Submitted {app.date}
        </span>
      </div>

      <ol className={styles.appSteps} aria-label="Application progress">
        {steps.map((label, index) => (
          <li key={label} className={index === 0 ? styles.stepDone : ""}>
            <span>{index === 0 ? <Check size={13} /> : index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </li>
  );
}

function Feature({ icon, title, text }) {
  return (
    <Tilt as="div" className={styles.feature}>
      <div className={styles.glare} />
      <div className={`${styles.featureIcon} ${styles.layer2}`}>{icon}</div>
      <h3 className={styles.layer1}>{title}</h3>
      <p className={styles.layer1}>{text}</p>
    </Tilt>
  );
}

function Modal({ onClose, labelledBy, className = "", children }) {
  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={`${styles.sheet} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

function ScholarshipDetails({ scholarship, saved, onSave, onClose, onApply }) {
  return (
    <Modal onClose={onClose} labelledBy="details-title" className={styles[scholarship.color]}>
      <div className={styles.modalHead}>
        <div className={styles.iconTile}>
          <Award size={28} />
        </div>
        <div>
          <span>{scholarship.provider}</span>
          <h2 id="details-title">{scholarship.title}</h2>
        </div>
      </div>

      <div className={styles.detailStats}>
        <div>
          <span>Amount</span>
          <strong>{scholarship.amount}</strong>
        </div>
        <div>
          <span>Apply by</span>
          <strong>{scholarship.deadline}</strong>
        </div>
        <div>
          <span>Location</span>
          <strong>{scholarship.location}</strong>
        </div>
      </div>

      <div className={styles.detailBody}>
        <h3>About this scholarship</h3>
        <p>{scholarship.description}</p>

        <h3>Who can apply</h3>
        <ul className={styles.checkList}>
          <li>
            <CheckCircle2 size={16} />
            {scholarship.eligibility}
          </li>
          <li>
            <CheckCircle2 size={16} />
            You have valid education documents.
          </li>
          <li>
            <CheckCircle2 size={16} />
            You meet the provider's requirements.
          </li>
        </ul>
      </div>

      <div className={styles.modalActions}>
        <button type="button" className={styles.solidBtn} onClick={onApply}>
          Apply for this scholarship
          <ArrowRight size={17} />
        </button>
        <button type="button" className={styles.ghostBtn} onClick={onSave}>
          {saved ? (
            <>
              <BookmarkCheck size={16} />
              Saved
            </>
          ) : (
            <>
              <Bookmark size={16} />
              Save
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}

const MAX_FILE_BYTES = 5 * 1024 * 1024;

function ApplicationModal({ scholarship, onClose, onSubmitted, onViewApplications }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    education: "",
    agree: false,
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [done, setDone] = useState(null);

  const setField = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const onFile = (e) => {
    const chosen = e.target.files?.[0];
    if (!chosen) {
      setFile(null);
      setFileError("");
      return;
    }
    if (chosen.size > MAX_FILE_BYTES) {
      setFile(null);
      setFileError("This file is larger than 5 MB. Choose a smaller PDF, JPG or PNG.");
      e.target.value = "";
      return;
    }
    setFileError("");
    setFile(chosen);
  };

  const submit = (e) => {
    e.preventDefault();
    const app = {
      id: `GNX-${new Date().getFullYear()}-${String(Math.floor(10000 + Math.random() * 90000))}`,
      scholarshipId: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      applicant: form.name.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      fileName: file ? file.name : "",
    };
    onSubmitted(app);
    setDone(app);
  };

  if (done) {
    return (
      <Modal onClose={onClose} labelledBy="success-title" className={styles.centerSheet}>
        <div className={styles.successIcon}>
          <CheckCircle2 size={44} />
        </div>
        <h2 id="success-title">Application submitted</h2>
        <p className={styles.successText}>
          Thank you, {done.applicant.split(" ")[0] || "student"}. Your application for{" "}
          <strong>{done.title}</strong> has been recorded.
        </p>
        <div className={styles.appNumber}>
          Application ID <strong>{done.id}</strong>
        </div>
        <button type="button" className={styles.solidBtn} onClick={onViewApplications}>
          View my applications
          <ArrowRight size={17} />
        </button>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} labelledBy="apply-title" className={styles[scholarship.color]}>
      <div className={styles.modalHead}>
        <div className={styles.iconTile}>
          <FileText size={26} />
        </div>
        <div>
          <span>Applying for</span>
          <h2 id="apply-title">{scholarship.title}</h2>
        </div>
      </div>

      <form onSubmit={submit} className={styles.form}>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            Full name
            <div className={styles.inputWrap}>
              <UserRound size={17} />
              <input
                required
                value={form.name}
                onChange={setField("name")}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
          </label>

          <label className={styles.field}>
            Mobile number
            <div className={styles.inputWrap}>
              <Phone size={17} />
              <input
                required
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                title="Enter a 10 digit mobile number"
                value={form.phone}
                onChange={setField("phone")}
                placeholder="10 digit mobile number"
                autoComplete="tel"
              />
            </div>
          </label>

          <label className={styles.field}>
            Email address
            <div className={styles.inputWrap}>
              <Mail size={17} />
              <input
                required
                type="email"
                value={form.email}
                onChange={setField("email")}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>
          </label>

          <label className={styles.field}>
            Education level
            <div className={styles.inputWrap}>
              <GraduationCap size={17} />
              <select required value={form.education} onChange={setField("education")}>
                <option value="" disabled>
                  Select education
                </option>
                <option>Class 10</option>
                <option>Class 12</option>
                <option>Diploma</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
              </select>
            </div>
          </label>
        </div>

        <label className={styles.field}>
          Supporting document
          <div className={styles.uploadBox}>
            <Upload size={24} />
            <strong>{file ? file.name : "Choose a document"}</strong>
            <span>PDF, JPG or PNG, up to 5 MB</span>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onFile} />
          </div>
          {fileError && (
            <span className={styles.errorText} role="alert">
              {fileError}
            </span>
          )}
        </label>

        <label className={styles.checkRow}>
          <input type="checkbox" required checked={form.agree} onChange={setField("agree")} />
          <span>I confirm that the information I have provided is accurate.</span>
        </label>

        <button type="submit" className={styles.solidBtn}>
          Submit application
          <ArrowRight size={17} />
        </button>
      </form>
    </Modal>
  );
}

export default Student;