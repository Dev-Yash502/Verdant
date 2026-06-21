import { StudentRank, CampusRank, QuizQuestion, ActivityLog } from "./types";

export const INITIAL_STUDENT_RANKS: StudentRank[] = [
  {
    id: "aria",
    rank: 1,
    name: "Aria M.",
    campus: "IIT Bombay",
    points: 1200,
    level: 15,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "james",
    rank: 2,
    name: "James D.",
    campus: "NIT Trichy",
    points: 980,
    level: 14,
    initials: "JD"
  },
  {
    id: "sam",
    rank: 3,
    name: "Sam R.",
    campus: "BITS Pilani",
    points: 850,
    level: 12,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "ananya",
    rank: 4,
    name: "Ananya T.",
    campus: "IIT Delhi",
    points: 760,
    level: 12,
    initials: "AT"
  },
  {
    id: "vikram",
    rank: 5,
    name: "Vikram R.",
    campus: "IIT Bombay",
    points: 710,
    level: 12,
    initials: "VR"
  },
  {
    id: "sneha",
    rank: 6,
    name: "Sneha P.",
    campus: "NIT Surathkal",
    points: 680,
    level: 12,
    initials: "SP"
  },
  {
    id: "user",
    rank: 12,
    name: "You (Green Steward)",
    campus: "IIT Bombay",
    points: 420,
    level: 12,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    isCurrentUser: true
  }
];

export const INITIAL_CAMPUS_RANKS: CampusRank[] = [
  { name: "IIT Bombay", rank: 1, co2ReducedKg: 4250, percentageChange: -12 },
  { name: "NIT Trichy", rank: 2, co2ReducedKg: 3820, percentageChange: -10 },
  { name: "BITS Pilani", rank: 3, co2ReducedKg: 3510, percentageChange: -8 },
  { name: "IIT Delhi", rank: 4, co2ReducedKg: 3100, percentageChange: -7 },
  { name: "IIT Madras", rank: 5, co2ReducedKg: 2890, percentageChange: -5 }
];

export const DEFAULT_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "log1",
    timestamp: "10:30 AM",
    title: "Reusable Bottle",
    points: 5,
    co2SavedKg: 0.3,
    category: "waste"
  },
  {
    id: "log2",
    timestamp: "01:15 PM",
    title: "Plant-based Meal",
    points: 10,
    co2SavedKg: 0.9,
    category: "food"
  },
  {
    id: "log3",
    timestamp: "04:45 PM",
    title: "Public Transit",
    points: 15,
    co2SavedKg: 1.8,
    category: "travel"
  }
];

export const SUSTAINABILITY_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these travel modes on an Indian college campus emits the lowest carbon footprints?",
    options: ["Walking or Cycling", "Electric Scooter Chat", "Rideshare Auto", "Campus Gas Shuttle"],
    correctIndex: 0,
    points: 10,
    explanation: "Walking or cycling has close to absolute zero carbon footprint, and acts as a major wellness boost!"
  },
  {
    id: 2,
    question: "How much greenhouse gas emissions (CO2e) can switching to a plant-based meal save on average per meal?",
    options: ["0.1 kg", "approx 0.8 to 1.2 kg", "5.0 kg", "Nothing significant"],
    correctIndex: 1,
    points: 10,
    explanation: "Switching from beef or mutton thali to a plant-based veg thali cuts about 0.8 to 1.2 kg CO2e emissions."
  },
  {
    id: 3,
    question: "What is 'phantom power loss' in hostels/dorms?",
    options: [
      "Electricity lost through ghost stories",
      "Power consumed by plugged-in devices turned off or on standby",
      "Power outages during hot Indian summers",
      "Voltage spikes from generator backups"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "Phantom power loss is the standby current drawn by devices left plugged into sockets (e.g. laptop chargers, fans, TVs on standby)."
  },
  {
    id: 4,
    question: "Why are localized carbon emission factors essential for calculating footprints in India?",
    options: [
      "India's grids rely heavily on coal compared to solar/hydro, requiring tailored offsets",
      "Traffic patterns match standard European equations",
      "Indian food lists are completely identical to Western fast-foods",
      "It is simpler to do math with standard numbers"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "Localized factors take India's specific energy grid profile (coal mix) and transit habits into active account."
  },
  {
    id: 5,
    question: "Which campus initiative has the most long-term sustainability impact?",
    options: [
      "Painting student benches green",
      "Retrofitting LED grids and rooftop solar micro-generation",
      "Buying paper straws periodically",
      "Turning off hallway lights for 10 minutes"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "Rooftop solar and LED grids secure structural energy resource efficiency for decades."
  }
];
