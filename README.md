# FlytBase Art Security Dashboard

Mission-critical security dashboard for **Le Musée d'Art Précieux** in Paris. This interactive prototype controls autonomous drone security systems protecting €2 billion in art.

## Features

### Two Operational Modes

1. **Crisis Mode** - Real-time crisis response with minimal cognitive load
   - Screen 1: Crisis Alert Card (Marc's view)
   - Screen 2: Drone Response Monitoring (Isabelle's view)
   - Screen 3: Threat Assessment Interface (Luc's view)
   - Screen 4: Guard Coordination Interface (Sophie's view)

2. **Analysis Mode** - Post-incident review and evidence documentation
   - Screen 5: Post-Incident Timeline
   - Screen 6: Evidence Detail & Annotation

### Key Features

- ✅ Interactive mode switching (Crisis/Analysis)
- ✅ Real-time data updates with mock data
- ✅ Clickable navigation between screens
- ✅ Production-ready UI with specified color palette
- ✅ Responsive design (320px - 1920px)
- ✅ Smooth animations and micro-interactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Color Palette

- **Alert/Urgent:** `#DC2626` (red)
- **Warning/Caution:** `#F59E0B` (amber)
- **Success/Clear:** `#22C55E` (green)
- **Neutral/Background:** `#0F172A` (dark blue)
- **Secondary:** `#3B82F6` (blue)
- **Text:** `#F1F5F9` (off-white)

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with mode switching
├── components/
│   ├── ModeToggle.tsx       # Crisis/Analysis mode toggle
│   └── screens/
│       ├── CrisisAlertCard.tsx
│       ├── DroneResponseMonitoring.tsx
│       ├── ThreatAssessment.tsx
│       ├── GuardCoordination.tsx
│       ├── PostIncidentTimeline.tsx
│       └── EvidenceDetail.tsx
└── data/
    └── mockData.ts          # Mock data for real-time simulation
```

## Usage

### Crisis Mode Flow

1. **Alert Card** → Click "Deploy Drone" or "Manual Review"
2. **Drone Monitoring** → Monitor live feed, optionally take manual control
3. **Threat Assessment** → Select threat category and broadcast
4. **Guard Coordination** → Send message to guards and monitor status

### Analysis Mode Flow

1. **Timeline** → Click any timeline event to view evidence
2. **Evidence Detail** → Review video, sensor data, and add annotations

## Design Philosophy

This interface prioritizes:
- **Signal-to-Noise Clarity** - Every pixel reduces cognitive load
- **User Context Awareness** - Information shifts based on mode and persona
- **Decision Documentation** - Every action leaves a trail
- **Trust Through Transparency** - Confidence scores and sensor health visible
- **Authentic Problem-Solving** - Born from real user pain points

## Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## License

This is a prototype for demonstration purposes.

