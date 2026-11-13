import { useEffect, useRef } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const icons = {
  water: <path d="M12 3c3 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-6.5 6-11z" />,
  farm: <path d="M12 21v-9M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />,
  school: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM8 7h7" />,
  health: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10zM12 9v5M9.5 11.5h5" />,
  energy: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </>
  ),
  road: <path d="M8 3L5 21M16 3l3 18M12 4v3M12 11v3M12 18v3" />,
};

const foundations = [
  { icon: "water", color: "#5ec8f2", title: "Clean water", text: "Wells, pipelines and storage that reach every home." },
  { icon: "farm", color: "#b9e36b", title: "Smart farming", text: "Better seeds, soil care and fair access to markets." },
  { icon: "school", color: "#c9a2ff", title: "Education", text: "Schools, teachers and digital learning for every child." },
  { icon: "health", color: "#ff7a8a", title: "Healthcare", text: "Local clinics and health workers close to home." },
  { icon: "energy", color: "#f4b942", title: "Clean energy", text: "Solar power for homes, pumps and classrooms." },
  { icon: "road", color: "#ff9f5a", title: "Roads and links", text: "All-weather roads and connectivity to nearby towns." },
];

const promise = [
  ["#5ec8f2", "Water for every home"],
  ["#b9e36b", "Farms that earn more"],
  ["#c9a2ff", "Schools that inspire"],
  ["#ff7a8a", "Care close to home"],
  ["#f4b942", "Power from the sun"],
  ["#ff9f5a", "Roads that connect"],
];

const steps = [
  { title: "Listen", text: "We meet communities and map what they need most." },
  { title: "Plan", text: "Villagers and experts shape the project together." },
  { title: "Build", text: "Local people build, learn and own the work." },
  { title: "Sustain", text: "We train local teams to maintain it for years." },
];

const flies = Array.from({ length: 22 }, (_, i) => ({
  l: `${(i * 47) % 100}%`,
  sz: 3 + (i % 4),
  d: `${9 + ((i * 3) % 9)}s`,
  dl: `-${(i * 1.7) % 10}s`,
  dx: `${((i % 5) - 2) * 40}px`,
}));

const headline = ["Building", "villages", "that", "thrive."];

export default function Landing() {
  const sceneRef = useRef(null);

  // Mouse parallax for the 3D hero scene
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll progress, glass nav, scroll reveals and card spotlight
  useEffect(() => {
    const bar = document.querySelector(".landing .progress");
    const nav = document.querySelector(".landing nav");
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".landing .reveal").forEach((el) => io.observe(el));

    const spot = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--gn-mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--gn-my", `${e.clientY - r.top}px`);
    };
    const stepEls = [...document.querySelectorAll(".landing .step")];
    stepEls.forEach((s) => s.addEventListener("mousemove", spot));

    return () => {
      window.removeEventListener("scroll", onScroll);
      stepEls.forEach((s) => s.removeEventListener("mousemove", spot));
      io.disconnect();
    };
  }, []);

  return (
    <div className="landing">
      <div className="progress"></div>
      <nav>
        <a className="logo" href="#top"><i></i>GramNexa</a>
        <ul>
          <li><a href="#focus">Focus areas</a></li>
          <li><a href="#path">Our approach</a></li>
          <li><a href="#join">Get involved</a></li>
        </ul>
        <div className="nav-actions">
          <a className="nbtn login" href="/login">
            <svg viewBox="0 0 24 24"><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 8l4 4-4 4M14 12H4" /></svg>
            Login
          </a>
          <a className="nbtn admin" href="/admin">
            <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4" /></svg>
            Admin
          </a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="stars"></div>
        <div className="aurora" aria-hidden="true">
          <span className="au a1"></span>
          <span className="au a2"></span>
          <span className="au a3"></span>
        </div>
        <div className="flies" aria-hidden="true">
          {flies.map((f, i) => (
            <span
              key={i}
              className="fly"
              style={{ "--gn-l": f.l, "--gn-sz": `${f.sz}px`, "--gn-d": f.d, "--gn-dl": f.dl, "--gn-dx": f.dx }}
            ></span>
          ))}
        </div>

        <div className="scene" ref={sceneRef}>
          <div className="sun"></div>
          <div className="layer l1">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none">
              <path d="M0 260 Q180 140 360 230 T720 200 T1080 220 T1440 170 V400 H0Z" fill="#3b7a63" opacity=".75" />
            </svg>
          </div>
          <div className="layer l2">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none">
              <path d="M0 300 Q240 190 480 280 T960 250 T1440 260 V400 H0Z" fill="#2a6b4c" />
              <g stroke="#4fa573" strokeWidth="3" fill="none" opacity=".6">
                <path d="M80 330 Q300 300 520 335" />
                <path d="M700 320 Q950 285 1200 325" />
              </g>
            </svg>
          </div>
          <div className="layer l3">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none">
              <path d="M0 340 Q300 270 620 330 T1240 310 T1440 330 V400 H0Z" fill="#1d5a3c" />
              <g fill="#f4b942">
                <path d="M300 305 l60 0 l-30 -34z" />
                <rect x="310" y="305" width="40" height="26" fill="#8a5a2b" />
                <path d="M1000 300 l70 0 l-35 -38z" />
                <rect x="1010" y="300" width="50" height="30" fill="#8a5a2b" />
              </g>
            </svg>
          </div>
          <div className="layer l4">
            <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
              <path d="M0 220 Q360 150 720 215 T1440 190 V300 H0Z" fill="#0f3d29" />
              <g stroke="#b9e36b" strokeWidth="2.5" opacity=".8">
                <path d="M120 240l0-34M132 240l0-40M144 240l0-34M156 240l0-38M900 232l0-36M912 232l0-42M924 232l0-36M936 232l0-40M1260 225l0-34M1272 225l0-40M1284 225l0-34" />
              </g>
            </svg>
          </div>
          <div className="village3d">
            <div className="cloud c1"></div>
            <div className="cloud c2"></div>
            <div className="cloud c3"></div>
            {[0, 1, 2].map((n) => (
              <svg key={n} className={`bird b${n}`} viewBox="0 0 24 10" aria-hidden="true">
                <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" />
              </svg>
            ))}
            <svg className="windmill" viewBox="0 0 100 140" aria-hidden="true">
              <path d="M42 52 L58 52 L66 138 L34 138Z" fill="#e8dcc4" />
              <path d="M42 52 L58 52 L60 70 L40 70Z" fill="#c9b894" />
              <g className="blades">
                <path d="M50 50 L44 6 L56 6Z" fill="#fdf6e3" />
                <path d="M50 50 L44 6 L56 6Z" fill="#fdf6e3" transform="rotate(120 50 50)" />
                <path d="M50 50 L44 6 L56 6Z" fill="#fdf6e3" transform="rotate(240 50 50)" />
                <circle cx="50" cy="50" r="5" fill="#8a5a2b" />
              </g>
            </svg>
          </div>
        </div>

        <div className="hero-copy">
          <span className="tag">GramNexa Rural Development Project</span>
          <h1>
            {headline.map((w, i) => (
              <span key={w} className="w" style={{ "--gn-w": i }}>{w}</span>
            ))}
          </h1>
          <p>
            Clean water, resilient farms, good schools and reliable energy, brought together so
            every rural family can grow.
          </p>
          <div className="row">
            <a className="btn" href="#focus">Explore the project</a>
            <a className="btn ghost" href="#path">How we work</a>
          </div>
        </div>

        <aside className="hero-card" aria-label="GramNexa promise">
          <h4>The GramNexa promise</h4>
          <p>One connected plan for every village.</p>
          <ul>
            {promise.map(([color, label]) => (
              <li key={label} style={{ "--gn-c": color }}>{label}</li>
            ))}
          </ul>
        </aside>
        <div className="cue" aria-hidden="true"></div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[0, 1].map((n) =>
            foundations.map((f) => (
              <span key={n + f.title} className="mq" style={{ "--gn-c": f.color }}>{f.title}</span>
            ))
          )}
        </div>
      </div>

      <section className="focus" id="focus">
        <h2>Six foundations of a stronger village</h2>
        <p className="lead">
          Each area supports the others, turning one improvement into many. Hover to pause the ring.
        </p>
        <div className="stage">
          <div className="ring">
            {foundations.map((f, i) => (
              <div key={f.title} className="card" style={{ "--gn-i": i, "--gn-c": f.color }}>
                <span className="ic">
                  <svg viewBox="0 0 24 24">{icons[f.icon]}</svg>
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="path" id="path">
        <h2>From listening to lasting change</h2>
        <p className="lead">A clear path that keeps villagers in charge at every stage.</p>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.title} className="step reveal" style={{ "--gn-d": i }}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta" id="join">
        <h2>Every village has a future worth building.</h2>
        <p className="lead" style={{ marginInline: "auto" }}>
          Be part of the work that turns small places into strong ones.
        </p>
        <div className="row">
          <a className="btn" href="#top">Join the project</a>
          <a className="btn ghost" href="#top">Back to top</a>
        </div>
      </section>

      <footer>
        <div className="foot">
          <a className="logo" href="#top" style={{ color: "red" }}><i></i>GramNexa</a>
          <p>Connecting villages to water, learning, health, energy and opportunity.</p>
          <div className="fl">
            <a href="#focus">Focus areas</a>
            <a href="#path">Our approach</a>
            <a href="#join">Get involved</a>
          </div>
        </div>
        <div>© 2026 GramNexa Rural Development Project</div>
      </footer>
    </div>
  );
}