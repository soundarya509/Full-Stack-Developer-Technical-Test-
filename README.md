# 🔐 Login Application — React + Node.js

A full-stack Login Application built as a technical assignment demonstrating proficiency in **React** (frontend) and **Node.js + Express** (backend).

---

## 🚀 Live Demo Credentials

```
Username: admin
Password: admin
```

---

## 📁 Folder Structure

```
final2/
├── backend/
│   ├── server.js          ← Express API server
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── package.json
    └── src/
        ├── App.js             ← Root component (routing)
        ├── App.css
        ├── api.js             ← All HTTP fetch calls
        ├── index.js
        ├── hooks/
        │   └── useAuth.js     ← Login/logout/state logic
        └── components/
            ├── LoginPage.jsx          ← Login form UI
            ├── LoginPage.module.css
            ├── WelcomePage.jsx        ← Dashboard UI
            └── WelcomePage.module.css
```

---

## ⚙️ How to Run

> You need **two terminal windows** open at the same time.

### Terminal 1 — Backend

```bash
cd final2/backend
npm install
npm start
```

✅ You should see: `Login API running at http://localhost:3001`

### Terminal 2 — Frontend

```bash
cd final2/frontend
npm install
npm start
```

✅ Browser opens automatically at `http://localhost:3000`

---

## 📡 API Reference

| Method | Endpoint  | Status        | Description                        |
|--------|-----------|---------------|------------------------------------|
| POST   | `/login`  | 200 / 401 / 400 | Validate credentials (admin/admin) |
| GET    | `/health` | 200           | Health check — returns `{ status: "ok" }` |

### POST `/login` — Request Body

```json
{
  "username": "admin",
  "password": "admin"
}
```

### Responses

| Status | Meaning              |
|--------|----------------------|
| `200`  | Login successful     |
| `400`  | Missing fields       |
| `401`  | Invalid credentials  |

---

## ✅ Features

- ⚛️ **Functional components** and React Hooks (`useState`, `useEffect`, `useCallback`)
- 🪝 **Custom `useAuth` hook** — encapsulates all auth state, login, logout, error, loading
- 🌐 **`api.js` service module** — isolates all HTTP fetch calls in one place
- 💾 **Remember username** — stored in `localStorage`, pre-filled on next visit
- 🔢 **Proper HTTP status codes** — 200, 400, 401
- ⚠️ **Client-side validation** — inline field errors with shake animation on wrong credentials
- 👁️ **Password visibility toggle** — accessible show/hide button
- ⏳ **Loading state** — spinner shown during API call, button disabled to prevent double submit
- 📊 **Professional dashboard** — sidebar navigation, stat cards, activity feed, sprint progress
- 📱 **Fully responsive** — mobile-friendly with CSS Modules for scoped styles

---

## 🏗️ Architecture

| File | Responsibility |
|------|---------------|
| `App.js` | Root component — renders `LoginPage` or `WelcomePage` based on auth state |
| `api.js` | All HTTP calls in one place — fetch wrapper with error handling |
| `hooks/useAuth.js` | Custom hook: `login()`, `logout()`, `error`, `isLoading`, `localStorage` |
| `LoginPage.jsx` | Controlled form with validation, error display, loading spinner |
| `WelcomePage.jsx` | Dashboard with sidebar, stats, activity feed, and sign out |
| `backend/server.js` | Express server with `POST /login` and `GET /health` endpoints |

---

## 🛠️ Tech Stack

| Layer    | Technology         | Purpose                        |
|----------|--------------------|--------------------------------|
| Frontend | React 18           | UI library with hooks          |
| Frontend | CSS Modules        | Scoped component styling       |
| Backend  | Node.js + Express  | REST API server                |
| Backend  | CORS middleware    | Cross-origin request handling  |
| Storage  | localStorage       | Persist username across sessions |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| `EADDRINUSE port 3001` | Run `netstat -ano \| findstr :3001` then `taskkill /PID <number> /F` |
| Login not working | Make sure backend is running in a **separate** terminal |
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org) |
| Page stays on login | Open browser console (`F12`) and check for red errors |

---

## 📸 Screenshots

### Login Page
> Dark professional UI with animated background, username/password fields, inline validation, and error messages.

### Welcome Dashboard
> Full dashboard with sidebar navigation, live clock, stat cards (Projects, Tasks, Team, Uptime), recent activity feed, sprint progress, and quick actions.

---

## 👨‍💻 Built With

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-264DE4?style=flat&logo=css3)
