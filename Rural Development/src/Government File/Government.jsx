import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Government.css";
import ApplyForm from "./ApplyForm";

/* ---------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const schemes = [
  {
    id: 1,
    title: "PM-KISAN",
    shortTitle: "PM-KISAN",
    category: "Farmers",
    tag: "Agriculture",
    description:
      "Financial support for eligible farmer families to help meet agricultural and household needs.",
    icon: "🌾",
    color: "green",
    eligibility: "Eligible farmer families as per scheme guidelines.",
    benefit: "Direct financial assistance",
    featured: true,
  },
  {
    id: 2,
    title: "Ayushman Bharat",
    shortTitle: "Ayushman Bharat",
    category: "Health",
    tag: "Healthcare",
    description:
      "A major healthcare initiative designed to improve access to quality medical services.",
    icon: "❤️",
    color: "red",
    eligibility: "Eligible families identified under applicable government criteria.",
    benefit: "Healthcare support",
    featured: true,
  },
  {
    id: 3,
    title: "PMAY - Gramin",
    shortTitle: "PMAY-G",
    category: "Housing",
    tag: "Rural Housing",
    description:
      "Support for eligible rural households to build safer and better permanent homes.",
    icon: "🏠",
    color: "orange",
    eligibility: "Eligible rural households under applicable guidelines.",
    benefit: "Housing assistance",
    featured: false,
  },
  {
    id: 4,
    title: "MGNREGA",
    shortTitle: "MGNREGA",
    category: "Employment",
    tag: "Jobs",
    description:
      "Provides a framework for rural employment and livelihood opportunities.",
    icon: "🧑‍🌾",
    color: "blue",
    eligibility: "Rural households seeking employment under the programme.",
    benefit: "Rural employment opportunity",
    featured: false,
  },
  {
    id: 5,
    title: "PM SVANidhi",
    shortTitle: "PM SVANidhi",
    category: "Business",
    tag: "Entrepreneurship",
    description:
      "Support for eligible street vendors to strengthen and expand their small businesses.",
    icon: "🛍️",
    color: "purple",
    eligibility: "Eligible street vendors according to programme criteria.",
    benefit: "Business support",
    featured: false,
  },
  {
    id: 6,
    title: "Jal Jeevan Mission",
    shortTitle: "Jal Jeevan",
    category: "Services",
    tag: "Water",
    description:
      "An initiative focused on improving access to safe and reliable drinking water.",
    icon: "💧",
    color: "cyan",
    eligibility: "Coverage and implementation depend on location and programme guidelines.",
    benefit: "Drinking water access",
    featured: false,
  },
  {
    id: 7,
    title: "PM Ujjwala Yojana",
    shortTitle: "Ujjwala Yojana",
    category: "Women",
    tag: "Clean Energy",
    description:
      "An initiative supporting access to cleaner cooking fuel for eligible households.",
    icon: "🔥",
    color: "yellow",
    eligibility: "Eligible households according to current scheme guidelines.",
    benefit: "Clean cooking fuel support",
    featured: false,
  },
  {
    id: 8,
    title: "PM Mudra Yojana",
    shortTitle: "PM Mudra",
    category: "Business",
    tag: "Loans",
    description:
      "Financial support framework for eligible micro and small business activities.",
    icon: "💼",
    color: "indigo",
    eligibility: "Eligible micro-enterprises and applicants as per lending rules.",
    benefit: "Business finance",
    featured: false,
  },
];

const categories = [
  "All",
  "Farmers",
  "Employment",
  "Health",
  "Housing",
  "Business",
  "Women",
  "Services",
];

const categoryIcons = {
  All: "✦",
  Farmers: "🌾",
  Employment: "💼",
  Health: "💖",
  Housing: "🏠",
  Business: "🛍️",
  Women: "👩‍🎓",
  Services: "⚙️",
};

/* ---------------------------------------------------------------
   3D HELPERS
---------------------------------------------------------------- */

/** A solid box built from CSS 3D faces. x/y = ground position, z = height off ground. */
function Block({ x = 0, y = 0, z = 0, w, d, h, tone = "soil", className = "" }) {
  return (
    <div
      className={`blk tone-${tone} ${className}`}
      style={{
        "--w": `${w}px`,
        "--d": `${d}px`,
        "--h": `${h}px`,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
      }}
    >
      <i className="face top" />
      <i className="face front" />
      <i className="face back" />
      <i className="face left" />
      <i className="face right" />
    </div>
  );
}

function Tree({ x, y }) {
  return (
    <>
      <Block x={x + 20} y={y + 20} z={22} w={10} d={10} h={36} tone="wood" />
      <Block x={x} y={y} z={52} w={50} d={50} h={36} tone="leaf" />
      <Block x={x + 10} y={y + 10} z={88} w={30} d={30} h={26} tone="leafLight" />
    </>
  );
}

function VillageScene() {
  const stageRef = useRef(null);

  const handleMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
  };

  const handleLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <div
      className="scene-stage"
      ref={stageRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-hidden="true"
    >
      <div className="scene-sun" />
      <div className="scene-shadow" />

      <div className="scene-tilt">
        <div className="scene-sway">
          <div className="world">
            {/* ground + river */}
            <Block x={0} y={0} z={0} w={480} d={480} h={22} tone="soil" className="ground" />
            <Block x={0} y={330} z={22} w={480} d={46} h={2} tone="water" className="river" />
            <Block x={200} y={322} z={22} w={60} d={62} h={9} tone="wood" />

            {/* farm fields */}
            <Block x={30} y={40} z={22} w={170} d={120} h={4} tone="wheat" className="field" />
            <Block x={30} y={180} z={22} w={170} d={110} h={4} tone="sprout" className="field" />

            {/* main house */}
            <Block x={260} y={60} z={22} w={120} d={96} h={70} tone="wall" />
            <Block x={250} y={50} z={92} w={140} d={116} h={14} tone="roof" />
            <Block x={275} y={64} z={106} w={90} d={88} h={12} tone="roof" />
            <Block x={305} y={155} z={22} w={28} d={4} h={42} tone="dark" />
            <Block x={346} y={155} z={50} w={22} d={3} h={22} tone="gold" />
            <Block x={270} y={155} z={50} w={22} d={3} h={22} tone="gold" />

            {/* second house */}
            <Block x={300} y={210} z={22} w={90} d={80} h={56} tone="wall" />
            <Block x={292} y={202} z={78} w={106} d={96} h={12} tone="roof" />
            <Block x={312} y={214} z={90} w={66} d={72} h={10} tone="roof" />
            <Block x={332} y={289} z={22} w={24} d={4} h={34} tone="dark" />

            {/* water tank */}
            <Block x={430} y={70} z={22} w={14} d={14} h={50} tone="wood" />
            <Block x={416} y={56} z={72} w={42} d={42} h={40} tone="water" />

            {/* trees */}
            <Tree x={225} y={235} />
            <Tree x={415} y={150} />
            <Tree x={50} y={400} />
            <Tree x={130} y={415} />
            <Tree x={390} y={405} />
          </div>
        </div>
      </div>

      <span className="scene-hint">Move your cursor to turn the village</span>
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
    el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
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
      className={`tilt ${className}`}
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
function Government() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const toastTimer = useRef(null);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesCategory =
        activeCategory === "All" || scheme.category === activeCategory;

      const searchText =
        `${scheme.title} ${scheme.description} ${scheme.category} ${scheme.tag}`.toLowerCase();

      return matchesCategory && searchText.includes(search.toLowerCase());
    });
  }, [search, activeCategory]);

  const showSuccess = (message) => {
    setSuccessMsg(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setSuccessMsg(""), 2500);
  };

  const toggleFavorite = (scheme) => {
    const isSaved = favorites.includes(scheme.id);
    setFavorites((prev) =>
      isSaved ? prev.filter((item) => item !== scheme.id) : [...prev, scheme.id]
    );
    showSuccess(isSaved ? `${scheme.shortTitle} removed from saved` : `${scheme.shortTitle} saved`);
  };

  const scrollToSchemes = () => {
    document.getElementById("all-schemes")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  // Close modal with Escape
  useEffect(() => {
    if (!selectedScheme) return undefined;
    const onKey = (e) => e.key === "Escape" && setSelectedScheme(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedScheme]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  if (showApplyForm) {
    return (
      <ApplyForm
        schemeName={selectedScheme?.title || "Government Scheme"}
        onBack={() => {
          setShowApplyForm(false);
          setSelectedScheme(null);
        }}
      />
    );
  }

  const featured = schemes.filter((s) => s.featured);

  return (
    <div className="gov-page">
      {/* ================= HERO ================= */}
      <section className="gov-hero">
        <div className="gov-hero-inner">
          <div className="gov-hero-copy">
            <p className="gov-hero-kicker">
              <span className="gov-live-dot" />
              Government schemes for rural India
            </p>

            <h1>Government schemes for every rural dream.</h1>

            <p className="gov-hero-text">
              Find programmes for farmers, students, workers and families,
              see who is eligible, and apply from one place.
            </p>

            <form
              className="gov-search"
              onSubmit={(e) => {
                e.preventDefault();
                scrollToSchemes();
              }}
              role="search"
            >
              <span className="gov-search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                placeholder="Search schemes, farming, jobs, housing, health"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search schemes"
              />
              {search && (
                <button
                  type="button"
                  className="gov-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
              <button type="submit" className="gov-search-submit">
                Search
              </button>
            </form>

            <dl className="gov-stats">
              <div>
                <dt>500+</dt>
                <dd>Government schemes</dd>
              </div>
              <div>
                <dt>50+</dt>
                <dd>Farmer initiatives</dd>
              </div>
              <div>
                <dt>100+</dt>
                <dd>Employment programmes</dd>
              </div>
            </dl>
          </div>

          <VillageScene />
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="gov-section" id="categories">
        <div className="gov-heading">
          <h2>Find the right scheme for you</h2>
          <p>
            Choose a category to see schemes that match your family, work and
            community.
          </p>
        </div>

        <div className="gov-categories" role="group" aria-label="Scheme categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`gov-cat-btn ${activeCategory === category ? "is-active" : ""}`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              <span aria-hidden="true">{categoryIcons[category]}</span>
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="gov-section gov-section-tight">
        <div className="gov-heading">
          <h2>Popular schemes</h2>
          <p>The programmes most families start with.</p>
        </div>

        <div className="gov-featured-grid">
          {featured.map((scheme) => (
            <Tilt className={`gov-featured c-${scheme.color}`} key={scheme.id}>
              <div className="gov-glare" />

              <div className="gov-featured-top gov-layer-1">
                <span className="gov-badge">Featured</span>
                <button
                  type="button"
                  className={`gov-heart ${favorites.includes(scheme.id) ? "is-saved" : ""}`}
                  onClick={() => toggleFavorite(scheme)}
                  aria-label={
                    favorites.includes(scheme.id) ? "Remove from saved" : "Save scheme"
                  }
                  aria-pressed={favorites.includes(scheme.id)}
                >
                  {favorites.includes(scheme.id) ? "♥" : "♡"}
                </button>
              </div>

              <div className="gov-featured-icon gov-layer-3" aria-hidden="true">
                {scheme.icon}
              </div>

              <div className="gov-layer-2">
                <span className="gov-tag">{scheme.tag}</span>
                <h3>{scheme.title}</h3>
                <p>{scheme.description}</p>
              </div>

              <div className="gov-featured-bottom gov-layer-2">
                <span>{scheme.benefit}</span>
                <button
                  type="button"
                  className="gov-btn-light"
                  onClick={() => setSelectedScheme(scheme)}
                >
                  View details
                </button>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ================= ALL SCHEMES ================= */}
      <section className="gov-section" id="all-schemes">
        <div className="gov-heading gov-heading-row">
          <div>
            <h2>All government schemes</h2>
            <p>
              Showing <strong>{filteredSchemes.length}</strong>{" "}
              {filteredSchemes.length === 1 ? "scheme" : "schemes"}
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </p>
          </div>
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="gov-empty">
            <div aria-hidden="true">🔎</div>
            <h3>No schemes match your search</h3>
            <p>Try a different word or choose another category.</p>
            <button
              type="button"
              className="gov-btn-solid"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear search and filters
            </button>
          </div>
        ) : (
          <div className="gov-grid">
            {filteredSchemes.map((scheme) => (
              <Tilt className={`gov-card c-${scheme.color}`} key={scheme.id}>
                <div className="gov-glare" />

                <div className="gov-card-top gov-layer-2">
                  <div className="gov-icon-3d" aria-hidden="true">
                    {scheme.icon}
                  </div>
                  <button
                    type="button"
                    className={`gov-heart gov-heart-dark ${
                      favorites.includes(scheme.id) ? "is-saved" : ""
                    }`}
                    onClick={() => toggleFavorite(scheme)}
                    aria-label={
                      favorites.includes(scheme.id) ? "Remove from saved" : "Save scheme"
                    }
                    aria-pressed={favorites.includes(scheme.id)}
                  >
                    {favorites.includes(scheme.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="gov-layer-1">
                  <span className="gov-category">{scheme.category}</span>
                  <h3>{scheme.shortTitle}</h3>
                  <p>{scheme.description}</p>
                </div>

                <div className="gov-card-footer gov-layer-1">
                  <span className="gov-benefit">{scheme.benefit}</span>
                  <div className="gov-card-actions">
                    <button
                      type="button"
                      className="gov-btn-ghost"
                      onClick={() => setSelectedScheme(scheme)}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="gov-btn-solid"
                      onClick={() => {
                        setSelectedScheme(scheme);
                        setShowApplyForm(true);
                      }}
                    >
                      Apply now
                    </button>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </section>

      {/* ================= CTA ================= */}
      <section className="gov-cta">
        <div className="gov-cta-inner">
          <div className="gov-cta-copy">
            <h2>Not sure where to start? Start with what you do.</h2>
            <p>
              Pick the category that fits your work or family, and we will show
              the schemes open to you.
            </p>
            <button type="button" className="gov-btn-gold" onClick={scrollToCategories}>
              Browse by category
            </button>
          </div>

          <div className="gov-cube-stage" aria-hidden="true">
            <div className="gov-cube">
              <span className="cube-face cf-front">🌾</span>
              <span className="cube-face cf-back">💧</span>
              <span className="cube-face cf-right">🏠</span>
              <span className="cube-face cf-left">❤️</span>
              <span className="cube-face cf-top">💼</span>
              <span className="cube-face cf-bottom">🔥</span>
            </div>
            <div className="gov-cube-shadow" />
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedScheme && (
        <div
          className="gov-overlay"
          onClick={() => setSelectedScheme(null)}
          role="presentation"
        >
          <div
            className={`gov-modal c-${selectedScheme.color}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheme-modal-title"
          >
            <button
              type="button"
              className="gov-modal-close"
              onClick={() => setSelectedScheme(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="gov-icon-3d gov-icon-lg" aria-hidden="true">
              {selectedScheme.icon}
            </div>

            <span className="gov-category">{selectedScheme.category}</span>
            <h2 id="scheme-modal-title">{selectedScheme.title}</h2>
            <p className="gov-modal-text">{selectedScheme.description}</p>

            <div className="gov-modal-info">
              <div>
                <span>Benefit</span>
                <strong>{selectedScheme.benefit}</strong>
              </div>
              <div>
                <span>Who can apply</span>
                <strong>{selectedScheme.eligibility}</strong>
              </div>
            </div>

            <div className="gov-modal-actions">
              <button
                type="button"
                className="gov-btn-solid gov-btn-wide"
                onClick={() => setShowApplyForm(true)}
              >
                Apply now
              </button>
              <button
                type="button"
                className="gov-btn-ghost gov-btn-wide"
                onClick={() => toggleFavorite(selectedScheme)}
              >
                {favorites.includes(selectedScheme.id) ? "Saved ♥" : "Save scheme"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {successMsg && (
        <div className="gov-toast" role="status">
          {successMsg}
        </div>
      )}
    </div>
  );
}

export default Government;