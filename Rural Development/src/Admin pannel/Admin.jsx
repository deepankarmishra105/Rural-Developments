
import React, { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";

import styles from "./Admin.module.css";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage(
      "UI ready! Connect your backend API for real authentication."
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.ambientGlow} />
      <div className={styles.gridOverlay} />

      <section className={styles.loginShell}>
        {/* LEFT PANEL */}
        <div className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={`${styles.orbit} ${styles.orbitOne}`} />
          <div className={`${styles.orbit} ${styles.orbitTwo}`} />

          <div className={styles.securityPill}>
            <span className={styles.pulseDot} />
            Secure Admin Environment
          </div>

          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Sparkles size={15} /> YOUR CONTROL CENTER
            </div>

            <h1>
              Welcome
              <br />
              to the
              <br />
              <span>Future.</span>
            </h1>

            <p>
              Manage your business, monitor performance,
              and take control of everything from one
              powerful dashboard.
            </p>

            <div className={styles.heroFeatures}>
              <div>
                <Check size={16} />
                Real-time insights
              </div>
              <span className={styles.featureDivider} />
              <div>
                <Check size={16} />
                Secure access
              </div>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.secureCard}`}>
            <div className={styles.successIcon}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong>System Protected</strong>
              <span>All systems operational</span>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.welcomeCard}`}>
            <div className={styles.miniAvatar}>AD</div>
            <div>
              <strong>Admin Portal</strong>
              <span>Welcome back, Admin</span>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <ShieldCheck size={15} />
            Enterprise-grade security
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.formSide}>
          <div className={styles.formInner}>
            <div className={styles.formBrandIcon}>
              <ShieldCheck size={27} />
            </div>

            <div className={styles.formHeading}>
              <h2>Admin Login</h2>
              <p>
                Welcome back! Enter your credentials to
                access your dashboard.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.field}>
                <label htmlFor="admin-email">Email Address</label>

                <div className={styles.inputWrap}>
                  <Mail size={19} />

                  <input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.labelRow}>
                  <label htmlFor="admin-password">Password</label>

                  <button
                    type="button"
                    className={styles.textButton}
                    onClick={() =>
                      setMessage(
                        "Connect your password reset API to enable recovery."
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className={styles.inputWrap}>
                  <LockKeyhole size={19} />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className={styles.customCheck}>
                  <Check size={12} />
                </span>
                Remember me for 30 days
              </label>

              {message && (
                <div
                  className={styles.feedback}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </div>
              )}

              <button className={styles.submitButton} type="submit">
                Sign In to Dashboard
                <ArrowRight size={18} />
              </button>
            </form>

            <div className={styles.formFooter}>
              <span>
                <ShieldCheck size={14} />
                Protected admin access
              </span>
              <span>© {new Date().getFullYear()} Admin Portal</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.pageCaption}>
        <span className={styles.captionDot} />
        All systems operational
      </div>
    </main>
  );
}