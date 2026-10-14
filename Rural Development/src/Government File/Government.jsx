import React, { useMemo, useState } from "react";
import "./Government.css";
import ApplyForm from "./ApplyForm";
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

function Government() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesCategory =
        activeCategory === "All" || scheme.category === activeCategory;

      const searchText =
        `${scheme.title} ${scheme.description} ${scheme.category} ${scheme.tag}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

if (showApplyForm) {
  return (
    <ApplyForm
      schemeName={selectedScheme?.title || "Government Scheme"}
    />
  );
}
  return (
    <div className="government-page">
    {/* =====================================================
    TOP NAVIGATION BAR
===================================================== */}

<nav className="government-navbar">

  {/* LOGO */}
  <a href="/" className="government-logo">

    <div className="logo-symbol">
      <img src="https://cdn-icons-png.flaticon.com/128/10822/10822418.png" alt="" />
    </div>

    <div className="logo-text">
      <strong>
        Rural <span>Development</span>
      </strong>

      <small>
        Connecting Villages to Opportunities
      </small>
    </div>

  </a>


  {/* NAVIGATION LINKS */}
  <div className="government-nav-links">

    <a href="/" className="nav-link active">
      <span className="nav-icon">⌂</span>
      <span>Home</span>
    </a>

    <a href="/government" className="nav-link">
      <span className="nav-icon">▦</span>
      <span>Schemes</span>
    </a>

    <a href="/students" className="nav-link">
      <span className="nav-icon">♢</span>
      <span>Students</span>
    </a>

    <a href="/jobs" className="nav-link">
      <span className="nav-icon">▣</span>
      <span>Jobs</span>
    </a>

    <a href="/farmers" className="nav-link">
      <span className="nav-icon">♧</span>
      <span>Farmers</span>
    </a>

    <a href="/services" className="nav-link">
      <span className="nav-icon">⚙</span>
      <span>Services</span>
    </a>

    {/* NOTIFICATIONS */}
    <button className="notification-button">

      <span className="nav-icon">♧</span>

      <span>Notifications</span>

      <span className="notification-count">
        3
      </span>

    </button>

  </div>


  {/* RIGHT SIDE */}
  <div className="government-nav-right">
    {/* REGISTER */}
    <a
      href="/register"
      className="nav-register-button"
    >
      Schemes
    </a>

  </div>

</nav>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="gov-hero">

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        {/* Animated cinematic landscape */}
        <div className="animated-village">

          <div className="sky-stars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="sun">
            <div className="sun-core"></div>
            <div className="sun-ray ray-one"></div>
            <div className="sun-ray ray-two"></div>
            <div className="sun-ray ray-three"></div>
            <div className="sun-ray ray-four"></div>
          </div>

          <div className="cloud cloud-one"></div>
          <div className="cloud cloud-two"></div>

          <div className="mountain mountain-back"></div>
          <div className="mountain mountain-middle"></div>
          <div className="mountain mountain-front"></div>

          <div className="field field-back"></div>
          <div className="field field-front"></div>

          <div className="village-house house-one">
            <div className="house-roof"></div>
            <div className="house-body"></div>
            <div className="house-door"></div>
            <div className="house-window"></div>
          </div>

          <div className="village-house house-two">
            <div className="house-roof"></div>
            <div className="house-body"></div>
            <div className="house-window"></div>
            <div className="house-door"></div>
          </div>

          <div className="tree tree-one">
            <div className="tree-top"></div>
            <div className="tree-trunk"></div>
          </div>

            

          <div className="tree tree-two">
            <div className="tree-top"></div>
            <div className="tree-trunk"></div>
          </div>

           <div className="tree tree-three">
            <div className="tree-top"></div>
            <div className="tree-trunk"></div>
          </div>
          <div className="tree tree-four">
            <div className="tree-top"></div>
            <div className="tree-trunk"></div>
          </div>


          <div className="farmer-silhouette">🧑‍🌾</div>

          <div className="floating-leaf leaf-one">🍃</div>
          <div className="floating-leaf leaf-two">🌿</div>
          <div className="floating-leaf leaf-three">🍃</div>

          <div className="video-badge">
            <span className="live-dot"></span>
            Rural India • Progress in Motion
          </div>
        </div>

        {/* Hero content */}
        <div className="gov-hero-content">

          <div className="hero-pill">
            <span className="pill-dot"></span>
            Government Schemes • One Place
          </div>

          <h1>
            Government Schemes
            <span>For Every Rural Dream.</span>
          </h1>

          <p className="hero-description">
            Discover government initiatives, benefits and opportunities
            designed to empower farmers, students, workers, families and
            rural communities.
          </p>

          {/* Search */}
          <div className="premium-search">

            <div className="search-icon">⌕</div>

            <input
              type="text"
              placeholder="Search schemes, farmers, jobs, housing, healthcare..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

            <button className="search-button">
              Search
              <span>→</span>
            </button>

          </div>

          {/* Stats */}
          <div className="hero-stats">

            <div className="hero-stat">
              <div className="stat-icon">🏛️</div>
              <div>
                <strong>500+</strong>
                <span>Government Schemes</span>
              </div>
            </div>

            <div className="hero-stat">
              <div className="stat-icon">🌾</div>
              <div>
                <strong>50+</strong>
                <span>Farmer Initiatives</span>
              </div>
            </div>

            <div className="hero-stat">
              <div className="stat-icon">💼</div>
              <div>
                <strong>100+</strong>
                <span>Employment Programs</span>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-scroll">
          <span>Explore schemes</span>
          <div className="scroll-line"></div>
        </div>

      </section>


      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}
      <section className="scheme-navigation">

        <div className="section-heading">
          <div>
            <span className="small-label">DISCOVER OPPORTUNITIES</span>
            <h2>Find the right scheme for you</h2>
          </div>

          <p>
            Explore schemes by category and discover opportunities
            relevant to your family, work and community.
          </p>
        </div>

        <div className="category-list">

          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="category-symbol">
                {category === "All" && "✦"}
                {category === "Farmers" && "🌾"}
                {category === "Employment" && "💼"}
                {category === "Health" && "💖"}
                {category === "Housing" && "⏹"}
                {category === "Business" && "🎌"}
                {category === "Women" && "👩‍🎓"}
                {category === "Services" && "⚙"}
              </span>

              {category}

              {activeCategory === category && (
                <span className="category-arrow">→</span>
              )}
            </button>
          ))}

        </div>
      </section>


      {/* =====================================================
          FEATURED SCHEMES
      ===================================================== */}
      <section className="featured-section">

        <div className="section-top">

          <div>
            <span className="small-label">FEATURED</span>
            <h2>Popular Government Schemes</h2>
          </div>

          <div className="result-count">
            {filteredSchemes.length} schemes found
          </div>

        </div>

        <div className="featured-grid">

          {schemes
            .filter((scheme) => scheme.featured)
            .map((scheme) => (
              <article
                className={`featured-card ${scheme.color}`}
                key={scheme.id}
              >

                <div className="featured-card-glow"></div>

                <div className="featured-top">
                  <span className="featured-label">
                    ★ Featured
                  </span>

                  <button
                    className={`favorite ${
                      favorites.includes(scheme.id) ? "saved" : ""

                    }`}
                    onClick={() => toggleFavorite(scheme.id)}
                  >
                    {favorites.includes(scheme.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="featured-icon">
                  {scheme.icon}
                </div>

                <span className="scheme-tag">{scheme.tag}</span>

                <h3>{scheme.title}</h3>

                <p>{scheme.description}</p>

                <div className="featured-bottom">

                  <span>
                    {scheme.benefit}
                  </span>

                  <button
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    Explore
                    <span>↗</span>
                  </button>

                </div>

              </article>
            ))}

        </div>
      </section>


      {/* =====================================================
          ALL SCHEMES
      ===================================================== */}
      <section className="all-schemes">

        <div className="all-schemes-header">

          <div>
            <span className="small-label">ALL OPPORTUNITIES</span>
            <h2>Government Schemes</h2>
          </div>

          <div className="scheme-count">
            Showing <strong>{filteredSchemes.length}</strong> schemes
          </div>

        </div>

        {filteredSchemes.length === 0 ? (
          <div className="empty-state">
            <div>🔎</div>
            <h3>No schemes found</h3>
            <p>
              Try another search term or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="scheme-grid">

            {filteredSchemes.map((scheme, index) => (

              <article
                className={`scheme-card ${scheme.color}`}
                key={scheme.id}
                style={{ "--delay": `${index * 70}ms` }}
              >

                <div className="card-shine"></div>

                <div className="scheme-card-top">

                  <div className="scheme-icon">
                    {scheme.icon}
                  </div>

                  <button
                    className={`card-favorite ${
                      favorites.includes(scheme.id) ? "saved" : ""
                    }`}
                    onClick={() => toggleFavorite(scheme.id)}
                  >
                    {favorites.includes(scheme.id) ? "♥" : "♡"}
                  </button>

                </div>

                <span className="scheme-category">
                  {scheme.category}
                </span>

                <h3>{scheme.shortTitle}</h3>

                <p>{scheme.description}</p>

                <div className="scheme-card-footer">

                  <span className="benefit-label">
                    {scheme.benefit}
                  </span>

             
                    <button
                     className="apply-btn"
                       onClick={() => {
                        setSelectedScheme(scheme);
                        setShowApplyForm(true);
                              }}
                              >
                            Apply Now →
                          </button>
                  
                </div>

              </article>

            ))}

          </div>
        )}

      </section>


      {/* =====================================================
          PREMIUM CTA
      ===================================================== */}
      <section className="scheme-cta">

        <div className="cta-orb orb-one"></div>
        <div className="cta-orb orb-two"></div>

        <div className="cta-content">

          <span className="cta-label">
            NOT SURE WHERE TO START?
          </span>

          <h2>
            Find schemes made
            <span>for you.</span>
          </h2>

          <p>
            Answer a few simple questions and discover government
            schemes that may match your needs.
          </p>

          <button className="eligibility-button">
             HAVE A FUN
            <span>→</span>
          </button>

        </div>

        <div className="cta-visual">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="orbit-core">✓</div>
        </div>

      </section>


      {/* =====================================================
          MODAL
      ===================================================== */}
      {selectedScheme && (

        <div
          className="scheme-modal-overlay"
          onClick={() => setSelectedScheme(null)}
        >

          <div
            className="scheme-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedScheme(null)}
            >
              ×
            </button>

            <div className={`modal-icon ${selectedScheme.color}`}>
              {selectedScheme.icon}
            </div>

            <span className="modal-category">
              {selectedScheme.category}
            </span>

            <h2>{selectedScheme.title}</h2>

            <p className="modal-description">
              {selectedScheme.description}
            </p>

            <div className="modal-information">

              <div>
                <span>Potential Benefit</span>
                <strong>{selectedScheme.benefit}</strong>
              </div>

              <div>
                <span>Eligibility</span>
                <strong>{selectedScheme.eligibility}</strong>
              </div>

            </div>

            <div className="modal-actions">

              <button className="modal-primary" onClick={()=> setSelectedScheme(nulls)}>
               APPLY
                <span>→</span>
              </button>

              <button className="modal-secondary"onClick={() => setSelectedScheme(null)}>
                Save Scheme
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Government;