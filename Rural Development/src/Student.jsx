import React, { useMemo, useState } from "react";
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
  Filter,
  ChevronDown,
  FileText,
  UserRound,
  Phone,
  Mail,
  Upload,
  Menu,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import styles from "./Student.module.css";

const scholarships = [
  {
    id: 1,
    title: "National Scholarship Portal",
    provider: "Government of India",
    category: "Government",
    level: "College",
    amount: "₹50,000 / year",
    deadline: "30 Oct 2026",
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
    deadline: "15 Nov 2026",
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
    deadline: "20 Nov 2026",
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
    deadline: "10 Dec 2026",
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
    deadline: "25 Dec 2026",
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
    deadline: "05 Jan 2027",
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

const categories = [
  "All",
  "Government",
  "Merit",
  "Technical",
  "Science",
  "Private",
];

function Student() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.provider.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleSaved = (id) => {
    setSaved((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const openApplication = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowApplication(true);
  };

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <GraduationCap size={25} />
            </div>

            <div>
              <div className={styles.logoText}>GramNexa</div>
              <div className={styles.logoSub}>Connecting Villages to Opportunities</div>
            </div>
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <Menu />
          </button>

          <nav
            className={`${styles.navLinks} ${
              mobileMenu ? styles.navMobileOpen : ""
            }`}
          >
            <a href="#home">Home</a>
            <a href="#schemes">Schemes</a>
            <a className={styles.activeNav} href="#students">
              Students
            </a>
            <a href="#jobs">Jobs</a>
            <a href="#farmers">Farmers</a>
            <a href="#services">Services</a>
          </nav>

          <div className={styles.navActions}>
            <button className={styles.searchIcon}>
              <Search size={18} />
            </button>

            <button className={styles.loginBtn}>Login</button>
            <button className={styles.registerBtn}>Register</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero} id="students">
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.eyebrow}>
              <Sparkles size={15} />
              STUDENT OPPORTUNITY HUB
            </div>

            <h1>
              Build Your
              <span> Brighter Future</span>
            </h1>

            <p>
              Discover scholarships, courses, internships and career
              opportunities designed to help every student move forward.
            </p>

            <div className={styles.heroSearch}>
              <Search size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scholarships, courses, skills..."
              />

              <button>
                Search
                <ArrowRight size={17} />
              </button>
            </div>

            <div className={styles.quickLinks}>
              <span>Popular:</span>
              <button onClick={() => setSearch("Government")}>
                Government Scholarships
              </button>
              <button onClick={() => setSearch("Technical")}>
                Technical
              </button>
              <button onClick={() => setSearch("Science")}>
                Science
              </button>
            </div>
          </div>

          <div className={styles.heroIllustration}>
            <div className={styles.studentCircle}>
              <GraduationCap size={78} strokeWidth={1.5} />
            </div>

            <div className={`${styles.floatingCard} ${styles.floatOne}`}>
              <Award size={20} />
              <div>
                <strong>500+</strong>
                <small>Scholarships</small>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatTwo}`}>
              <BookOpen size={20} />
              <div>
                <strong>1,200+</strong>
                <small>Courses</small>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatThree}`}>
              <CheckCircle2 size={20} />
              <div>
                <strong>98%</strong>
                <small>Verified</small>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className={styles.stats}>
          <Stat
            icon={<Award />}
            number="500+"
            label="Scholarships"
          />

          <Stat
            icon={<BookOpen />}
            number="1,200+"
            label="Courses"
          />

          <Stat
            icon={<BriefcaseBusiness />}
            number="850+"
            label="Career Opportunities"
          />

          <Stat
            icon={<UserRound />}
            number="2M+"
            label="Students Reached"
          />
        </div>
      </section>

      <main className={styles.container}>
        {/* SHORTCUTS */}
        <section className={styles.shortcuts}>
          <Shortcut
            icon={<Award />}
            title="Scholarships"
            text="Find financial support"
            color="green"
          />

          <Shortcut
            icon={<BookOpen />}
            title="Courses"
            text="Learn new skills"
            color="blue"
          />

          <Shortcut
            icon={<BriefcaseBusiness />}
            title="Internships"
            text="Gain experience"
            color="orange"
          />

          <Shortcut
            icon={<TrendingUp />}
            title="Career Guide"
            text="Plan your future"
            color="purple"
          />
        </section>

        {/* SCHOLARSHIPS */}
        <section className={styles.section} id="scholarships">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionKicker}>
                <Award size={17} />
                FINANCIAL SUPPORT
              </div>

              <h2>Scholarships for You</h2>
              <p>
                Explore verified scholarships and apply directly from GramNexa.
              </p>
            </div>

            <button className={styles.viewAll}>
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          {/* FILTER */}
          <div className={styles.filterBar}>
            <div className={styles.categoryList}>
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={
                    category === item
                      ? styles.categoryActive
                      : styles.categoryButton
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.sortWrapper}>
              <button
                className={styles.sortButton}
                onClick={() => setSortOpen(!sortOpen)}
              >
                <Filter size={16} />
                Sort by
                <ChevronDown size={15} />
              </button>

              {sortOpen && (
                <div className={styles.sortDropdown}>
                  <button>Deadline</button>
                  <button>Amount</button>
                  <button>Newest</button>
                </div>
              )}
            </div>
          </div>

          {/* CARDS */}
          <div className={styles.scholarshipGrid}>
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                saved={saved.includes(scholarship.id)}
                onSave={() => toggleSaved(scholarship.id)}
                onApply={() => openApplication(scholarship)}
                onDetails={() => setSelectedScholarship(scholarship)}
              />
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className={styles.emptyState}>
              <Search size={35} />
              <h3>No scholarships found</h3>
              <p>Try another keyword or category.</p>
            </div>
          )}
        </section>

        {/* COURSES */}
        <section className={styles.courseSection}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionKicker}>
                <BookOpen size={17} />
                LEARN & GROW
              </div>

              <h2>Recommended Courses</h2>
              <p>
                Build practical skills that can help you get your next
                opportunity.
              </p>
            </div>

            <button className={styles.viewAll}>
              Explore Courses
              <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.courseGrid}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* APPLICATION TRACKER */}
        <section className={styles.tracker}>
          <div className={styles.trackerIcon}>
            <FileText size={27} />
          </div>

          <div className={styles.trackerContent}>
            <span>YOUR APPLICATIONS</span>
            <h2>Track every application in one place</h2>
            <p>
              Check scholarship applications, deadlines and document status
              without visiting multiple portals.
            </p>
          </div>

          <button className={styles.trackerButton}>
            View Applications
            <ArrowRight size={17} />
          </button>
        </section>

        {/* WHY US */}
        <section className={styles.whySection}>
          <div className={styles.whyHeading}>
            <div className={styles.sectionKicker}>
              <ShieldCheck size={17} />
              WHY GRAMNEXA
            </div>

            <h2>A simpler way to find opportunities</h2>
          </div>

          <div className={styles.whyGrid}>
            <Feature
              icon={<ShieldCheck />}
              title="Verified Opportunities"
              text="We organize trusted scholarship and course information in one place."
            />

            <Feature
              icon={<Search />}
              title="Easy Discovery"
              text="Search and filter opportunities based on your education and interests."
            />

            <Feature
              icon={<FileText />}
              title="Simple Applications"
              text="Apply without getting lost between complicated government portals."
            />

            <Feature
              icon={<TrendingUp />}
              title="Grow Your Career"
              text="Discover learning programs and opportunities matched to your goals."
            />
          </div>
        </section>
      </main>

      {/* DETAILS MODAL */}
      {selectedScholarship && !showApplication && (
        <ScholarshipDetails
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          onApply={() => setShowApplication(true)}
        />
      )}

      {/* APPLICATION MODAL */}
      {showApplication && selectedScholarship && (
        <ApplicationModal
          scholarship={selectedScholarship}
          onClose={() => {
            setShowApplication(false);
            setSelectedScholarship(null);
          }}
        />
      )}
    </div>
  );
}

/* ----------------------------------
   COMPONENTS
----------------------------------- */

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

function Shortcut({ icon, title, text, color }) {
  return (
    <button className={`${styles.shortcut} ${styles[color]}`}>
      <div className={styles.shortcutIcon}>{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <ArrowRight size={17} />
    </button>
  );
}

function ScholarshipCard({
  scholarship,
  saved,
  onSave,
  onApply,
  onDetails,
}) {
  return (
    <article className={styles.scholarshipCard}>
      {scholarship.featured && (
        <div className={styles.featuredBadge}>
          <Sparkles size={12} />
          Featured
        </div>
      )}

      <div className={styles.cardTop}>
        <div
          className={`${styles.scholarshipIcon} ${
            styles[scholarship.color]
          }`}
        >
          <Award size={23} />
        </div>

        <button className={styles.saveBtn} onClick={onSave}>
          {saved ? (
            <BookmarkCheck size={20} />
          ) : (
            <Bookmark size={20} />
          )}
        </button>
      </div>

      <div className={styles.provider}>{scholarship.provider}</div>

      <h3>{scholarship.title}</h3>

      <p className={styles.cardDescription}>
        {scholarship.description}
      </p>

      <div className={styles.tags}>
        <span>{scholarship.category}</span>
        <span>{scholarship.level}</span>
      </div>

      <div className={styles.cardInfo}>
        <div>
          <IndianRupee size={15} />
          <span>{scholarship.amount}</span>
        </div>

        <div>
          <CalendarDays size={15} />
          <span>{scholarship.deadline}</span>
        </div>

        <div>
          <MapPin size={15} />
          <span>{scholarship.location}</span>
        </div>
      </div>

      <div className={styles.eligibility}>
        <CheckCircle2 size={15} />
        <span>{scholarship.eligibility}</span>
      </div>

      <div className={styles.cardActions}>
        <button className={styles.detailsBtn} onClick={onDetails}>
          Details
        </button>

        <button className={styles.applyBtn} onClick={onApply}>
          Apply Now
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

function CourseCard({ course }) {
  return (
    <article className={styles.courseCard}>
      <div className={`${styles.courseCover} ${styles[course.color]}`}>
        <div className={styles.courseIcon}>
          <BookOpen size={27} />
        </div>

        <span>{course.type}</span>
      </div>

      <div className={styles.courseBody}>
        <small>{course.provider}</small>

        <h3>{course.title}</h3>

        <div className={styles.courseMeta}>
          <span>
            <Clock3 size={14} />
            {course.duration}
          </span>

          <span>
            <UserRound size={14} />
            {course.students}
          </span>
        </div>

        <div className={styles.courseFooter}>
          <span>{course.level}</span>

          <button>
            Start Learning
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ScholarshipDetails({
  scholarship,
  onClose,
  onApply,
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.detailsModal}>
        <button className={styles.modalClose} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.modalAwardIcon}>
            <Award size={32} />
          </div>

          <div>
            <span>{scholarship.provider}</span>
            <h2>{scholarship.title}</h2>
          </div>
        </div>

        <div className={styles.detailStats}>
          <div>
            <span>Scholarship Amount</span>
            <strong>{scholarship.amount}</strong>
          </div>

          <div>
            <span>Application Deadline</span>
            <strong>{scholarship.deadline}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{scholarship.location}</strong>
          </div>
        </div>

        <div className={styles.detailContent}>
          <h3>About this scholarship</h3>
          <p>{scholarship.description}</p>

          <h3>Eligibility</h3>

          <ul>
            <li>
              <CheckCircle2 size={16} />
              {scholarship.eligibility}
            </li>
            <li>
              <CheckCircle2 size={16} />
              Applicant must have valid education documents.
            </li>
            <li>
              <CheckCircle2 size={16} />
              Applicant must meet the scholarship provider's requirements.
            </li>
          </ul>
        </div>

        <button className={styles.modalApply} onClick={onApply}>
          Apply for this Scholarship
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

function ApplicationModal({ scholarship, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.successModal}>
          <div className={styles.successIcon}>
            <CheckCircle2 size={42} />
          </div>

          <h2>Application Started!</h2>

          <p>
            Your application for{" "}
            <strong>{scholarship.title}</strong> has been
            successfully initiated.
          </p>

          <div className={styles.applicationNumber}>
            Application ID: <strong>GNX-2026-10824</strong>
          </div>

          <button onClick={onClose} className={styles.modalApply}>
            Go to My Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.applicationModal}>
        <button className={styles.modalClose} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.applicationHeading}>
          <div className={styles.modalAwardIcon}>
            <FileText size={28} />
          </div>

          <div>
            <span>APPLYING FOR</span>
            <h2>{scholarship.title}</h2>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className={styles.formGrid}>
            <label>
              Full Name
              <div className={styles.inputWrapper}>
                <UserRound size={17} />
                <input required placeholder="Enter your full name" />
              </div>
            </label>

            <label>
              Mobile Number
              <div className={styles.inputWrapper}>
                <Phone size={17} />
                <input
                  required
                  type="tel"
                  placeholder="Enter mobile number"
                />
              </div>
            </label>

            <label>
              Email Address
              <div className={styles.inputWrapper}>
                <Mail size={17} />
                <input
                  required
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
            </label>

            <label>
              Education Level
              <div className={styles.inputWrapper}>
                <GraduationCap size={17} />
                <select required defaultValue="">
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

          <label>
            Upload Supporting Document
            <div className={styles.uploadBox}>
              <Upload size={24} />
              <strong>Upload document</strong>
              <span>PDF, JPG or PNG · Max 5MB</span>
              <input type="file" />
            </div>
          </label>

          <label className={styles.checkbox}>
            <input type="checkbox" required />
            <span>
              I confirm that the information provided is accurate.
            </span>
          </label>

          <button type="submit" className={styles.submitApplication}>
            Submit Application
            <ArrowRight size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Student;
