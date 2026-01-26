# 📈 Paper Trading Platform (Real-Time)
---
```
          ██████╗ █████╗ ██████╗ ███████╗██████╗ ████████╗██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗
          ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝
          ██████╔╝███████║██████╔╝█████╗  ██████╔╝   ██║   ██████╔╝███████║██║  ██║██║██╔██╗ ██║██║  ███╗
          ██╔═══╝ ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗   ██║   ██╔══██╗██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
          ██║     ██║  ██║██║     ███████╗██║  ██║   ██║   ██║  ██║██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
          ╚═╝     ╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝
          
                  REAL-TIME TRADING SYSTEM • SIMULATOR • SYSTEM DESIGN PROJECT

```
---
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Checkpoint](https://img.shields.io/badge/checkpoint-11-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)
![WebSocket](https://img.shields.io/badge/realtime-WebSocket-orange)
![Frontend](https://img.shields.io/badge/frontend-Vanilla_JS-yellow)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---
> 🧠 **An educational, real-time paper trading platform built to understand how professional trading systems actually work — not just how charts look.**

---

## 🚀 Project Overview

This project is a **real-time paper trading platform** inspired by platforms like TradingView Paper Trading — but built **from first principles**, focusing on:

- Correct system architecture
- Real-time data flow
- Server-authoritative trading logic
- Clean separation of responsibilities
- Incremental, checkpoint-based development

💡 **No real money is involved.**  
🎓 This project is built for **learning, experimentation, and system design clarity**.

---

## 🧩 Key Features (Current – Checkpoint 11)

✅ Live market price feed (WebSocket)  
✅ Real-time candlestick chart  
✅ BUY / SELL paper trades  
✅ Virtual balance & PnL tracking  
✅ Multiple open positions  
✅ Trade history  
✅ Multi-tab sync (shared account state)  
✅ Runs fully locally (no cloud, no paid APIs)  

---

## 🏗️ System Architecture
### High-Level Design
```
┌────────────────────────┐
│ Crypto Exchange Feed │
│ (WebSocket, Free API) │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Backend (Node.js) │
│ ───────────────────── │
│ • Market data intake │
│ • Trade execution │
│ • Account state │
│ • PnL calculation │
│ • WebSocket broadcast │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Frontend (Web App) │
│ ───────────────────── │
│ • Charts & UI │
│ • Trade buttons │
│ • Render-only logic │
│ • No financial logic │
└────────────────────────┘
```

---

## 🔑 Core Architectural Principles

### 🧠 Server-Authoritative Design
- Backend is the **single source of truth**
- Frontend never controls money, positions, or logic
- Prevents desync, cheating, and inconsistent state

### 🔄 Real-Time Communication
- WebSockets instead of REST
- Backend pushes updates instantly
- All clients see the same state

### 🧱 Separation of Concerns
| Layer | Responsibility |
|------|---------------|
| Backend | Trading logic, state, execution |
| Frontend | Visualization & user input |
| Exchange | Market data only |

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **WebSocket (`ws`)**
- Free crypto market data (exchange feed)

### Frontend
- **HTML / CSS / JavaScript**
- **Lightweight Charts**
- Progressive Web App ready
- Runs on low-end hardware

### Tooling
- Git & GitHub
- VS Code + Live Server
- No Docker
- No paid services

---

## 📂 Project Structure
```
paper-trading-platform/
│
├── backend/
│ ├── server.js # WebSocket server & trade engine
│ ├── marketFeed.js # Exchange data connection
│ └── storage.js # In-memory state (Checkpoint 11)
│
├── frontend/
│ ├── index.html # UI structure
│ ├── styles.css # Dark trading UI
│ ├── app.js # Frontend controller
│ ├── chart.js # Chart initialization
│ ├── candles.js # (Frontend candles – to be refactored)
│ └── state.js # UI state handling
│
├── shared/
│ └── constants.js
│
├── package.json
└── README.md
```

---

## ▶️ How to Run Locally

### 1️⃣ Backend

```
cd backend
npm install
npm start
```
## 2️⃣ Frontend

### How to Run
1. Open `frontend/index.html` in **VS Code**
2. Right-click → **Open with Live Server**

### ✅ Health Check
- Live price updates ✔
- Chart moving ✔
- Buy / Sell works ✔
- Balance & PnL update ✔

---

## 🧪 What This Project Is (and Is Not)

### ✔️ It **IS**
- A real-time trading system simulator  
- An educational platform  
- A system-design learning project  
- A strong portfolio project  

### ❌ It **is NOT**
- A real money trading app  
- A get-rich-quick tool  
- A black-box bot system  

---

## 🗺️ Roadmap (Planned Checkpoints)

### 🔜 Checkpoint 12 — Backend-Owned Candles
- Backend builds OHLC candles  
- Candle history persistence  
- Consistent charts across refresh & tabs  

### 🔜 Checkpoint 13 — Indicator Engine
- EMA, RSI, VWAP, MACD  
- Backend computes, frontend renders  
- Strategy-ready architecture  

### 🔜 Checkpoint 14 — Strategy Playground
- Signal generation (manual)  
- Alerts & annotations  

### 🔜 Checkpoint 15 — Persistence Layer
- Save candles & trades  
- Restore state on restart  

### 🔜 Checkpoint 16 — Multi-User Support
- Separate accounts  
- Same engine, multiple clients  

### 🔜 Checkpoint 17 — Bots & Backtesting
- Strategy execution  
- Replay historical data  

---

## 🎯 Why This Project Matters

### Most beginner trading apps:
- Mix frontend & backend logic  
- Break on refresh  
- Are not scalable  

### This project:
- Teaches where logic belongs  
- Follows real trading infrastructure patterns  
- Builds confidence in system design  
- Scales naturally without rewrites  

---

## 🙌 Final Note

This project is intentionally built **slowly, cleanly, and correctly**.

Every checkpoint answers one question:

> **“Who should own this responsibility?”**

That mindset is the real learning outcome.

⭐ If you find this project useful, feel free to **star** it or **fork** it.  
📚 Built for learning. Designed like production.



