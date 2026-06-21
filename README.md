<div align="center">

# 🌿 Verdant — Campus Sustainability Intelligence Platform

### *Track. Compete. Conserve.*

[![Challenge Vertical](https://img.shields.io/badge/Vertical-Environment%20%26%20Sustainability-green?style=for-the-badge)](.)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite%20%2B%20TypeScript-blue?style=for-the-badge)](.)
[![AI Powered](https://img.shields.io/badge/AI-Gemini%20Powered-orange?style=for-the-badge&logo=google)](.)

> A smart, AI-assisted carbon footprint tracker designed for Indian college campuses — helping students measure, reduce, and compete on their environmental impact in real time.

</div>

---

## 📌 Chosen Vertical

**Environment & Sustainability — Campus Carbon Intelligence**

Verdant is built around the **student sustainability persona** at Indian universities (IITs, NITs, BITS). The platform empowers students to track and reduce their personal carbon footprint through data-driven insights, gamified competition, and AI-powered reduction recommendations — all tailored to the unique context of Indian campus life.

---

## 🧠 Approach & Logic

### Problem Statement

Indian campuses collectively house millions of students whose daily choices — food, transport, energy, and waste — generate significant but *unmeasured* carbon emissions. Without granular, localized data, students cannot make informed decisions or feel motivated to change.

### Solution Architecture

Verdant is a **context-aware sustainability assistant** built on four pillars:

```
┌─────────────────────────────────────────────────────┐
│                   Verdant Platform                  │
├─────────────┬──────────────┬──────────┬─────────────┤
│  Footprint  │  AI Insights │  Campus  │  Knowledge  │
│  Tracking   │  & Targets   │  Compete │    Quiz     │
│   Engine    │    (Gemini)  │  Board   │   Engine    │
└─────────────┴──────────────┴──────────┴─────────────┘
```

### Decision Logic

1. **Baseline Profiling**: On first launch, a 3-question quiz determines the user's starting footprint profile (commute style, diet pattern, energy habits). This enables personalized, localized carbon math from day one.

2. **Emission Calculation**: Uses India-specific emission factors (IPCC + CEA grid data) — NOT generic Western averages:
   - Indian grid: ~0.82 kg CO2/kWh (coal-heavy mix)
   - Plant-based meal offset: ~0.9 kg CO2e vs meat thali (~2.5 kg CO2e)
   - Public transit vs solo drive: ~1.8 kg CO2e saved per campus trip

3. **AI Recommendations (Gemini)**: The Insights engine analyzes a user's footprint breakdown across 4 categories (Travel, Food, Energy, Waste) and generates ranked reduction targets with ROI (points + kg CO2 saved).

4. **Gamification Loop**: Every logged action awards Stewardship Points → levels → leaderboard rank. This drives consistent daily engagement rather than one-off logging.

5. **Campus Map Explorer**: Students discover eco-friendly spots on campus (solar zones, composting points, EV charging), rewarding exploration.

---

## 🏗️ How the Solution Works

### User Journey

```
Landing Page → Baseline Quiz (3 Qs) → Dashboard
     │                                     │
     │                          ┌──────────┴──────────┐
     │                          │                     │
     │                    Quick Log               AI Insights
     │                  (one-tap actions)     (Gemini analysis)
     │                          │                     │
     │                    Points Earned         Reduction Targets
     └──────────────────── Leaderboard ◄─────────────┘
                              │
                         Campus Map
                       (Eco-spot rewards)
```

### Core Features

| Feature | Description | AI Component |
|---|---|---|
| **Footprint Dashboard** | Real-time carbon gauge, weekly trend chart, activity feed | — |
| **Quick Log** | One-tap logging for common eco-actions (bottle, transit, vegan meal) | — |
| **AI Insights** | Personalized carbon reduction targets with ROI scoring | ✅ Gemini API |
| **Sustainability Quiz** | 5-question eco-intelligence quiz with explanations | — |
| **Campus Leaderboard** | Student & campus-level rankings with real-time position | — |
| **Map Explorer** | Interactive campus eco-spot discovery with point rewards | — |
| **Profile System** | Persistent user profile with level progression (localStorage) | — |
| **Baseline Quiz** | First-time onboarding profiler for personalized starting footprint | ✅ Logic-driven |

### Smart Decision Making

The platform makes contextual decisions at every step:

- **Adaptive starting footprint**: Answers to baseline quiz directly shape CO2 values across 4 categories
- **Level progression**: Points threshold scales (every 100 pts = +1 level beyond Level 12 baseline)
- **Daily goal tracking**: Score gauge resets daily, showing remaining points to unlock active stewardship badge
- **AI target locking**: Applied recommendations are one-time-locked to prevent point farming
- **Cumulative savings tracker**: Running CO2 total is updated across all logged activities

---

## 🛠️ Tech Stack

```
Frontend:    React 19 + TypeScript + Vite 6
Styling:     Tailwind CSS v4 (utility-first, claymorphism design system)
Icons:       Lucide React
Animation:   Motion (Framer Motion v12)
AI:          Google Gemini API (via @google/generative-ai)
Storage:     localStorage (client-side persistence, no backend required)
Build:       Vite ESBuild (< 3s hot reload)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **Google Gemini API Key** (free at [aistudio.google.com](https://aistudio.google.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/verdant.git
cd verdant

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Gemini API key:
# GEMINI_API_KEY="your_actual_key_here"

# 4. Start development server
npm run dev
# → App runs at http://localhost:3000
```

### Build for Production

```bash
npm run build
# → Outputs optimized bundle to /dist
npm run preview
# → Preview production build locally
```

---

## 📁 Project Structure

```
verdant/
├── src/
│   ├── components/
│   │   ├── BaselineQuiz.tsx      # Onboarding footprint profiler
│   │   ├── BottomNav.tsx         # Mobile navigation bar
│   │   ├── HeroSection.tsx       # Landing page with feature bento grid
│   │   ├── InsightsView.tsx      # AI-powered carbon reduction recommendations
│   │   ├── LeaderboardView.tsx   # Student & campus rankings
│   │   ├── MapExplorer.tsx       # Campus eco-spot interactive map
│   │   ├── ProfileEditModal.tsx  # User profile editor with avatar
│   │   ├── QuickLogModal.tsx     # Activity logging modal
│   │   ├── QuizView.tsx          # Sustainability knowledge quiz
│   │   └── Sidebar.tsx           # Desktop navigation sidebar
│   ├── App.tsx                   # Main app shell, state management, router
│   ├── data.ts                   # Static data: leaderboards, quiz questions
│   ├── index.css                 # Global styles, clay design tokens
│   ├── main.tsx                  # React entry point
│   └── types.ts                  # TypeScript interfaces & enums
├── .env.example                  # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎯 Key Assumptions

1. **Single-user, client-side**: The app runs entirely in the browser. No backend or database — state is persisted via `localStorage`. A real deployment would use a proper backend (Firebase, Supabase) for multi-user leaderboards.

2. **Localized emission factors**: Carbon calculations use India-specific values (CEA grid data, ICMR dietary guidelines) rather than generic global averages.

3. **Simulated leaderboard**: Campus-wide rankings are populated with seed data to demonstrate the UI. In production, these would be aggregated from real user accounts.

4. **AI insights are contextual**: The Gemini API integration provides personalized reduction recommendations based on the user's current footprint profile, not generic tips.

5. **Gamification over accuracy**: Points and levels are designed to maximize engagement and behavior change. Exact CO2 precision is secondary to consistent daily action logging.

6. **India-first design**: All examples, campus names, food items, and transit references are India-specific (IIT/NIT campuses, plant-based vs meat thali, auto rickshaws, etc.)

---

## 📊 Evaluation Criteria Alignment

| Criteria | Implementation |
|---|---|
| **Code Quality** | TypeScript throughout, component-based architecture, clear separation of concerns, consistent naming |
| **Security** | API key via environment variables only (never in code), `.env*` in `.gitignore`, no PII stored |
| **Efficiency** | Vite for fast builds, lazy component loading, localStorage for zero-latency persistence, no unnecessary re-renders |
| **Testing** | TypeScript strict mode catches type errors; component logic is pure and testable |
| **Accessibility** | Semantic HTML5, `alt` text on all images, keyboard-navigable buttons, ARIA-compatible structure |
| **Smart Assistant** | Baseline quiz drives personalized footprint; AI Insights provide contextual, ranked recommendations |
| **Logical Decisions** | Context-aware starting values, one-time reduction locks, adaptive point scaling, daily score reset |
| **Real-world Usability** | India-specific data, mobile-first responsive design, one-tap quick logging for daily habits |

---

## 🌱 Impact Potential

> **If 10,000 students on a single campus each reduce their footprint by just 1 kg CO2e/day through Verdant's guided actions, that's 3,650 tonnes of CO2 avoided per year — equivalent to taking ~790 cars off the road.**

Verdant is designed to make this not just possible, but *engaging and competitive*.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Made with 🌿 for a greener campus India
</div>
