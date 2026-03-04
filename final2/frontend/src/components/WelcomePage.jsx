import { useState, useEffect } from "react";
import styles from "./WelcomePage.module.css";

const STATS = [
  { label: "Total Projects",  value: "24",    sub: "+3 this week",   icon: "📁", color: "#3b82f6" },
  { label: "Tasks Completed", value: "142",   sub: "+12 today",      icon: "✅", color: "#22c55e" },
  { label: "Team Members",    value: "8",     sub: "2 active now",   icon: "👥", color: "#a855f7" },
  { label: "System Uptime",   value: "99.9%", sub: "Last 30 days",   icon: "📡", color: "#f59e0b" },
];

const ACTIVITY = [
  { icon: "🚀", color: "#22c55e", action: "Deployed",  detail: "v2.4.1 to production",         time: "2m ago"  },
  { icon: "🔀", color: "#3b82f6", action: "Merged",    detail: "feature/auth-improvements",    time: "18m ago" },
  { icon: "📝", color: "#a855f7", action: "Reviewed",  detail: "API documentation PR #88",     time: "1h ago"  },
  { icon: "🎯", color: "#f59e0b", action: "Created",   detail: "Q1 roadmap milestone",         time: "3h ago"  },
  { icon: "🔐", color: "#f87171", action: "Patched",   detail: "Critical security fix #441",   time: "5h ago"  },
];

export default function WelcomePage({ username, onLogout }) {
  const [mounted, setMounted]   = useState(false);
  const [time, setTime]         = useState(new Date());
  const [activeNav, setActiveNav] = useState("Dashboard");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const fmtTime = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const fmtDate = (d) =>
    d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const NAV = ["Dashboard", "Projects", "Analytics", "Team", "Settings"];

  return (
    <div className={styles.page}>
      <div className={styles.gridLines} />
      <div className={styles.blob1} /><div className={styles.blob2} />

      <div className={`${styles.shell} ${mounted ? styles.shellIn : ""}`}>

        {/* ══ SIDEBAR ══ */}
        <aside className={styles.sidebar}>
          <div>
            {/* Logo */}
            <div className={styles.sidebarLogo}>
              <div className={styles.logoBox}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="1" y="1" width="7.5" height="7.5" rx="2" fill="white"/>
                  <rect x="11.5" y="1" width="7.5" height="7.5" rx="2" fill="white" opacity="0.45"/>
                  <rect x="1" y="11.5" width="7.5" height="7.5" rx="2" fill="white" opacity="0.45"/>
                  <rect x="11.5" y="11.5" width="7.5" height="7.5" rx="2" fill="white"/>
                </svg>
              </div>
              <span className={styles.logoText}>NexusApp</span>
            </div>

            {/* Nav */}
            <nav className={styles.nav}>
              {NAV.map((item) => (
                <button
                  key={item}
                  className={`${styles.navBtn} ${activeNav === item ? styles.navBtnActive : ""}`}
                  onClick={() => setActiveNav(item)}
                >
                  <span className={styles.navDot} />
                  {item}
                  {item === "Team" && <span className={styles.navPill}>3</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* User + logout */}
          <div className={styles.sidebarFoot}>
            <div className={styles.sideUser}>
              <div className={styles.sideAvatar}>
                {username.charAt(0).toUpperCase()}
                <span className={styles.onlineDot} />
              </div>
              <div className={styles.sideUserInfo}>
                <span className={styles.sideUserName}>{username}</span>
                <span className={styles.sideUserRole}>Administrator</span>
              </div>
            </div>
            <button className={styles.logoutBtn} onClick={onLogout}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M5 1.5H2.5A1 1 0 001.5 2.5v10a1 1 0 001 1H5M10.5 10.5l3-3-3-3M13.5 7.5H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign out
            </button>
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <div className={styles.main}>

          {/* Top bar */}
          <header className={styles.topBar}>
            <div className={styles.topLeft}>
              <span className={styles.breadcrumb}>Home / {activeNav}</span>
              <h2 className={styles.pageTitle}>{activeNav}</h2>
            </div>
            <div className={styles.topRight}>
              <div className={styles.clockChip}>
                <span className={styles.clockDot} />
                {fmtTime(time)}
              </div>
              <div className={styles.notifChip}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5v2.5l-1 2h11l-1-2V6A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <span className={styles.notifBadge}>3</span>
              </div>
            </div>
          </header>

          {/* Scroll area */}
          <div className={styles.scrollArea}>

            {/* Hero banner */}
            <div className={styles.heroBanner}>
              <div className={styles.heroLeft}>
                <div className={styles.heroTag}>✦ Overview</div>
                <div className={styles.welcomeLabel}>— Welcome —</div>
                <h1 className={styles.heroTitle}>
                  {greeting()},<br />
                  <em>{username}.</em>
                </h1>
                <p className={styles.heroSub}>
                  You have <strong>5 pending tasks</strong> and <strong>2 unread messages</strong> today.
                </p>
                <div className={styles.heroDate}>{fmtDate(time)}</div>
                <div className={styles.heroActions}>
                  <button className={styles.heroCta}>View Tasks →</button>
                  <button className={styles.heroCtaGhost}>Open Inbox</button>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.heroGlow} />
                <span className={styles.heroEmoji}>🚀</span>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className={styles.statCard}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className={styles.statTop}>
                    <div
                      className={styles.statIcon}
                      style={{ background: `${s.color}18`, border: `1px solid ${s.color}28` }}
                    >
                      {s.icon}
                    </div>
                    <span className={styles.statSub}>{s.sub}</span>
                  </div>
                  <div className={styles.statVal} style={{ color: s.color }}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom two-col */}
            <div className={styles.twoCol}>

              {/* Activity */}
              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <h3 className={styles.panelTitle}>Recent Activity</h3>
                  <button className={styles.panelLink}>See all</button>
                </div>
                <div className={styles.activityList}>
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className={styles.activityRow} style={{ animationDelay: `${0.2 + i * 0.06}s` }}>
                      <div
                        className={styles.activityIcon}
                        style={{ background: `${a.color}15`, border: `1px solid ${a.color}22` }}
                      >
                        {a.icon}
                      </div>
                      <div className={styles.activityBody}>
                        <span className={styles.activityAction}>{a.action}</span>
                        <span className={styles.activityDetail}>{a.detail}</span>
                      </div>
                      <span className={styles.activityTime}>{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div className={styles.rightCol}>
                {/* Sprint */}
                <div className={styles.panel}>
                  <div className={styles.panelHead}>
                    <h3 className={styles.panelTitle}>Sprint Progress</h3>
                    <span className={styles.sprintPct}>68%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: "68%" }} />
                  </div>
                  <p className={styles.progressNote}>17 of 25 tasks · 4 days remaining</p>

                  <div className={styles.sprintMeta}>
                    {[
                      { label: "Done",        val: "17", color: "#22c55e" },
                      { label: "In Progress", val: "5",  color: "#f59e0b" },
                      { label: "To Do",       val: "3",  color: "#8896b3" },
                    ].map((m) => (
                      <div key={m.label} className={styles.sprintMetaItem}>
                        <span className={styles.sprintDot} style={{ background: m.color }} />
                        <span className={styles.sprintMetaVal}>{m.val}</span>
                        <span className={styles.sprintMetaLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle} style={{ marginBottom: "1rem" }}>Quick Actions</h3>
                  <div className={styles.quickGrid}>
                    {[
                      { icon: "➕", label: "New Project" },
                      { icon: "📊", label: "Analytics"  },
                      { icon: "👥", label: "Manage Team" },
                      { icon: "⚙️", label: "Settings"   },
                    ].map((q) => (
                      <button key={q.label} className={styles.quickBtn}>
                        <span className={styles.quickBtnIcon}>{q.icon}</span>
                        <span className={styles.quickBtnLabel}>{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end scrollArea */}
        </div>{/* end main */}
      </div>{/* end shell */}
    </div>
  );
}