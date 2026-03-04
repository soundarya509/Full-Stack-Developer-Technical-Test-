import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage({ onLogin, error, isLoading, rememberedUsername }) {
  const [username, setUsername] = useState(rememberedUsername || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (rememberedUsername) setUsername(rememberedUsername);
  }, [rememberedUsername]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!username.trim() || !password) return;
    onLogin(username.trim(), password);
  };

  const fieldErr = (f) => {
    if (!touched[f]) return "";
    if (f === "username" && !username.trim()) return "Username is required";
    if (f === "password" && !password) return "Password is required";
    return "";
  };

  return (
    <div className={styles.page}>
      {/* Background blobs */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.blobC} />

      {/* Login Card */}
      <div className={`${styles.card} ${mounted ? styles.cardIn : ""}`}>

        {/* Top accent bar */}
        <div className={styles.accentBar} />

        {/* Logo + heading */}
        <div className={styles.cardHead}>
          <div className={styles.logo}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="9" height="9" rx="2.5" fill="white"/>
              <rect x="12" y="1" width="9" height="9" rx="2.5" fill="white" opacity="0.4"/>
              <rect x="1" y="12" width="9" height="9" rx="2.5" fill="white" opacity="0.4"/>
              <rect x="12" y="12" width="9" height="9" rx="2.5" fill="white"/>
            </svg>
          </div>
          <h1 className={styles.heading}>Sign in</h1>
          <p className={styles.subheading}>Enter your credentials to continue</p>
        </div>

        {/* Error message */}
        {error && (
          <div className={styles.errorBox} role="alert">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7.5 4.5v3.5M7.5 10v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Username field */}
          <div className={styles.fieldWrap}>
            <label className={styles.label} htmlFor="username">Username</label>
            <div className={`${styles.inputRow} ${fieldErr("username") ? styles.inputRowErr : ""}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.fieldIcon}>
                <circle cx="8" cy="5.5" r="2.8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2.5 14c0-3 2.5-4.8 5.5-4.8s5.5 1.8 5.5 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                id="username"
                className={styles.input}
                type="text"
                placeholder="admin"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, username: true }))}
              />
            </div>
            {fieldErr("username") && (
              <span className={styles.errMsg}>{fieldErr("username")}</span>
            )}
          </div>

          {/* Password field */}
          <div className={styles.fieldWrap}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">Password</label>
              <span className={styles.forgotLink}>Forgot password?</span>
            </div>
            <div className={`${styles.inputRow} ${fieldErr("password") ? styles.inputRowErr : ""}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.fieldIcon}>
                <rect x="2.5" y="7.5" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 7.5V5a3 3 0 016 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                id="password"
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              />
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l12 12M6.5 6.6a2 2 0 002.8 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M4 4.2C2.7 5.3 1.8 6.6 1.5 8c1 4 6 6 9.5 3.8M6.5 2.5C7 2.2 7.5 2 8 2c4 0 6.5 4 6.5 6-.2 1-.8 2-1.5 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="8" rx="6.5" ry="4.5" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                )}
              </button>
            </div>
            {fieldErr("password") && (
              <span className={styles.errMsg}>{fieldErr("password")}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer hint */}
        <p className={styles.hint}>
          Use <code>admin</code> / <code>admin</code> to log in
        </p>
      </div>
    </div>
  );
}
