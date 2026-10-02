import React from "react";
import "./DashboardPage.css";

const Icon = ({ type, size = 24 }) => {
  const icons = {
    home: (
      <>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10.5V20h14v-9.5" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    student: (
      <>
        <path d="m3 9 9-4 9 4-9 4-9-4Z" />
        <path d="M7 11v4c2 2 8 2 10 0v-4" />
        <path d="M21 9v6" />
      </>
    ),
    jobs: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5h8v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </>
    ),
    farmer: (
      <>
        <path d="M12 20V9" />
        <path d="M12 12c-5 0-7-3-7-7 5 0 7 2 7 7Z" />
        <path d="M12 15c5 0 7-3 7-7-5 0-7 2-7 7Z" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4.4h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V13h-.1a1.7 1.7 0 0 0-1.5 1Z" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    megaphone: (
      <>
        <path d="m4 12 14-6v12L4 12Z" />
        <path d="M4 12v5a2 2 0 0 0 2 2h1" />
        <path d="M18 10h2v4h-2" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4M9 12h6M9 16h6" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
        <path d="M15 15c3 0 5 2 5 5" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C10 4 5 9 5 16c0 2 1 4 3 4 7 0 11-6 12-16Z" />
        <path d="M5 20c3-5 7-8 12-11" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[type] || icons.grid}
    </svg>
  );
};

const featureCards = [
  {
    type: "government",
    icon: "grid",
    title: "Government",
    title2: "Schemes",
    description: "Explore central & state schemes for rural development"
  },
  {
    type: "student",
    icon: "student",
    title: "Student",
    title2: "Corner",
    description: "Scholarships, education resources and more"
  },
  {
    type: "jobs",
    icon: "jobs",
    title: "Jobs & Skills",
    title2: "",
    description: "Find job opportunities and skill development programs"
  },
  {
    type: "farmer",
    icon: "farmer",
    title: "Farmer",
    title2: "Corner",
    description: "Agriculture support, subsidies and expert guidance"
  },
  {
    type: "village",
    icon: "home",
    title: "Village",
    title2: "Information",
    description: "Know about your village, facilities and development"
  },
  {
    type: "documents",
    icon: "document",
    title: "Documents &",
    title2: "Services",
    description: "Access important documents and online services"
  }
];

const updates = [
  {
    category: "Schemes",
    categoryClass: "green",
    title: "PM-KISAN 19th Installment",
    description: "Farmers can check their payment status now.",
    date: "Sep 19, 2025",
    image:
      "https://images.unsplash.com/photo-1557234195-bd9f2906fe8b?auto=format&fit=crop&w=500&q=80"
  },
  {
    category: "Education",
    categoryClass: "blue",
    title: "National Scholarship Portal",
    description: "Fresh applications for 2025-26 are open for eligible students.",
    date: "Sep 08, 2025",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80"
  },
  {
    category: "Jobs",
    categoryClass: "orange",
    title: "Employment Fair 2025",
    description: "District level job fair on Sep 20. Register now!",
    date: "Sep 05, 2025",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80"
  }
];

function DashboardPage(){
  return (
    <div className="dashboard">

      <header className="navbar">

        <div className="brand">
          <div className="brand-logo">
           <span>
            <img src="https://cdn-icons-png.flaticon.com/128/7299/7299508.png" alt="" />
           </span>
          </div>

          <div className="brand-text">
            <h1>
              Rural <span><b><i>Development</i></b></span>
            </h1>
            <p>Connecting Villages to Opportunities</p>
          </div>
        </div>

        <nav className="nav-links">

          <a className="nav-link active">
            <Icon type="home" size={20} />
            <span>Home</span>
          </a>

          <a className="nav-link">
            <Icon type="grid" size={20} />
            <span>Schemes</span>
          </a>

          <a className="nav-link">
            <Icon type="student" size={20} />
            <span>Students</span>
          </a>

          <a className="nav-link">
            <Icon type="jobs" size={20} />
            <span>Jobs</span>
          </a>

          <a className="nav-link">
            <Icon type="farmer" size={20} />
            <span>Farmers</span>
          </a>

          <a className="nav-link">
            <Icon type="settings" size={20} />
            <span>Services</span>
          </a>
    
          <a className="nav-link notification-link">
            <Icon type="bell" size={21} />
            <span>Notifications</span>
            <b>3</b>
          </a>

        </nav>

        <div className="nav-actions">

          <button className="search-circle">
            <Icon type="search" size={21} />
          </button>

          <button className="login-btn">
            Login
          </button>

          <button className="register-btn">
            Register
          </button>

        </div>

      </header>
                
      <section className="hero">

        <div className="hero-background"></div>

        <div className="hero-leaves left-leaves">
          <span>🌿</span>
          <span>🍃</span>
          <span>🌱</span>
        </div>

        <div className="hero-content">

          <div className="hero-copy">

            <h2>
              Empowering
              <br />
              Rural India
            </h2>

            <div className="hero-title-leaf">
              
            </div>

            <h3>
              Connecting Villages to Opportunities
            </h3>

            <p>
              Access government schemes, education, jobs, agriculture support
              and essential services – all in one place for a brighter tomorrow.
            </p>

            <div className="search-box">

              <Icon type="search" size={23} />

              <input
                type="text"
                placeholder="Search for schemes, scholarships, jobs, farmers, services..."
              />

              <button>
                Search
              </button>

            </div>

          </div>

          <div className="hero-stats">

            <div className="stat-item">

              <div className="stat-icon people">
                <Icon type="people" size={30} />
              </div>

              <div>
                <strong>1.2M+</strong>
                <span>People Benefited</span>
              </div>

            </div>

            <div className="stat-item">

              <div className="stat-icon schemes">
                <Icon type="document" size={30} />
              </div>

              <div>
                <strong>500+</strong>
                <span>Government Schemes</span>
              </div>

            </div>

            <div className="stat-item">

              <div className="stat-icon jobs">
                <Icon type="jobs" size={30} />
              </div>

              <div>
                <strong>50K+</strong>
                <span>Job Opportunities</span>
              </div>

            </div>

            <div className="stat-item">

              <div className="stat-icon farmers">
                <Icon type="leaf" size={30} />
              </div>

              <div>
                <strong>2M+</strong>
                <span>Farmers Connected</span>
              </div>

            </div>

          </div>

        </div>

        <div className="hero-slogan">
          <span>Stronger</span>
          <span>Villages</span>
          <span>Brighter</span>
          <span>Tomorrow</span>
          <i></i>
        </div>

      </section>

      <section className="feature-section">

        <div className="feature-grid">

          {featureCards.map((card) => (

            <article
              className={`feature-card ${card.type}`}
              key={card.type}
            >
              <div className="feature-icon">
                <Icon type={card.icon} size={38} />
              </div>

              <div className="feature-content">

                <h3>
                  {card.title}
                  {card.title2 && (
                    <>
                      <br />
                      {card.title2}
                    </>
                  )}
                </h3>

                <p>
                  {card.description}
                </p>

              </div>

              <button className="feature-arrow">
                <Icon type="arrow" size={18} />
              </button>

              <div className="card-decoration">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </article>

          ))}

        </div>

      </section>

      <section className="updates-section">

        <div className="section-heading">

          <div className="heading-left">

            <div className="heading-icon">
              <Icon type="megaphone" size={25} />
            </div>

            <div>
              <h2>Latest Updates</h2>
              <div className="heading-line"></div>
            </div>

          </div>

          <button className="view-all">
            View All
            <Icon type="arrow" size={17} />
          </button>

        </div>

        <div className="updates-grid">

          {updates.map((item) => (

            <article className="update-card" key={item.title}>

              <div className="update-image">
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>

              <div className="update-content">

                <span className={`update-category ${item.categoryClass}`}>
                  {item.category}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

                <div className="update-bottom">

                  <span className="update-date">
                    <span className="calendar-dot">▣</span>
                    {item.date}
                  </span>

                  <button className="details-btn">
                    View Details
                    <Icon type="arrow" size={15} />
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

    </div>
  );
}

export default DashboardPage;