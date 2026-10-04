import { useState } from "react";
import styles from "./Auth.module.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.page}>
      {/* Background decorations */}
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      <div className={styles.grid} />

      <section className={styles.authWrapper}>
        {/* Visual Section */}
        <div className={styles.visual}>
          <div className={styles.visualGlow} />

          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Secure authentication
          </div>

          <div className={styles.visualContent}>
            <p className={styles.eyebrow}>WELCOME TO THE FUTURE</p>

            <h1>
              Your journey
              <br />
              <span>starts here.</span>
            </h1>

            <p className={styles.description}>
              A simple, secure and beautiful way to access your account
              from anywhere.
            </p>
          </div>

          {/* Floating cards */}
          <div className={`${styles.floatingCard} ${styles.cardOne}`}>
            <div className={styles.icon}>✓</div>
            <div>
              <strong>Account secured</strong>
              <small>Everything looks good</small>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.cardTwo}`}>
            <div className={styles.avatar}>JD</div>
            <div>
              <strong>Welcome back!</strong>
              <small>Good to see you again</small>
            </div>
          </div>

          <div className={styles.circleShape} />
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.logo}>
              <span>✦</span>
            </div>

            <div className={styles.heading}>
              <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
              <p>
                {isLogin
                  ? "Enter your details to continue."
                  : "Join us and get started today."}
              </p>
            </div>

            <form className={styles.form}>
              {!isLogin && (
                <div className={styles.inputGroup}>
                  <label>Full name</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>♙</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>Email address</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>@</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Password</label>

                  {isLogin && (
                    <button
                      type="button"
                      className={styles.forgot}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>⌑</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete={
                      isLogin ? "current-password" : "new-password"
                    }
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "◉" : "○"}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className={styles.terms}>
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    I agree to the <a href="/">Terms & Conditions</a>
                  </label>
                </div>
              )}

              <button type="submit" className={styles.submit}>
                <span>{isLogin ? "Sign in" : "Create account"}</span>
                <span className={styles.arrow}>→</span>
              </button>
            </form>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <div className={styles.socials}>
              <button type="button">
                <span className={styles.google}>G</span>
                Google
              </button>

              <button type="button">
                <span className={styles.github}>◉</span>
                GitHub
              </button>
            </div>

            <p className={styles.switchText}>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowPassword(false);
                }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
