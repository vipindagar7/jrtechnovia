// Card-level data. Full specs/rules are in eventDetails.js (loaded lazily by the modal).
// Names follow the posters; rule-book codes JT01–JT08 are kept for reference.

export const zones = [
  {
    id: "speed",
    no: "01",
    name: "Speed & Precision",
    blurb: "Autonomous logic and pilot reflexes, raced against the clock on tracks built to punish mistakes.",
    icon: "speed",
  },
  {
    id: "combat",
    no: "02",
    name: "Combat & Strategy",
    blurb: "Head-to-head arenas where torque, traction and tactics decide who walks away with the win.",
    icon: "combat",
  },
  {
    id: "innovation",
    no: "03",
    name: "Innovation",
    blurb: "Ideas and builds judged on originality, execution and real-world impact.",
    icon: "innovation",
  },
];

export const events = [
  {
    code: "JT01",
    name: "Line Follower",
    zone: "speed",
    day: "d2",
    icon: "track",
    tagline: "Speed · Precision · Strategy",
    highlights: [
      ["Control", "Autonomous"],
      ["Max size", "25 cm cube"],
      ["Attempts", "2"],
    ],
  },
  {
    code: "JT02",
    name: "Robo Hurdle Challenge",
    zone: "speed",
    day: "d1",
    icon: "hurdle",
    tagline: "Speed · Precision · Agility",
    highlights: [
      ["Control", "Wireless"],
      ["Max weight", "5 kg"],
      ["Run", "Single"],
    ],
  },
  {
    code: "JT06",
    name: "Drone Obstacle Challenge",
    zone: "speed",
    day: "d2",
    icon: "drone",
    tagline: "Speed · Precision",
    highlights: [
      ["Frame", "≤ 450 mm"],
      ["Battery", "6S LiPo"],
      ["Attempts", "2"],
    ],
  },
  {
    code: "JT03",
    name: "Robo Soccer",
    zone: "combat",
    day: "d1",
    icon: "soccer",
    tagline: "Combat · Strategy",
    highlights: [
      ["Match", "2 × 5 min"],
      ["Max weight", "5 kg"],
      ["Arena", "8 × 4 ft"],
    ],
  },
  {
    code: "JT05",
    name: "Robo Tug of War",
    zone: "combat",
    day: "d1",
    icon: "tug",
    tagline: "Combat · Strategy",
    highlights: [
      ["Max weight", "5 kg"],
      ["Round", "1–2 min"],
      ["Knockouts", "Best of 3"],
    ],
  },
  {
    code: "JT04",
    name: "Robo War",
    zone: "combat",
    day: "d2",
    icon: "war",
    tagline: "Push · Ram · Out-manoeuvre",
    highlights: [
      ["Max weight", "10 kg"],
      ["Max size", "40 cm cube"],
      ["Match", "2–3 min"],
    ],
  },
  {
    code: "JT08",
    name: "Project Exhibition",
    zone: "innovation",
    day: "d2",
    icon: "exhibit",
    tagline: "Showcase · Innovate · Inspire",
    highlights: [
      ["Demo", "≈ 5 min"],
      ["Projects", "1 / team"],
      ["Score", "100 pts"],
    ],
  },
  {
    code: "JT07",
    name: "Business Model Canvas & Startup Pitch",
    short: "Startup Pitch",
    zone: "innovation",
    day: "d1",
    icon: "idea",
    tagline: "Ideas today · Startups tomorrow",
    highlights: [
      ["Pitch", "5 min"],
      ["Q&A", "3 min"],
      ["Score", "100 pts"],
    ],
  },
].map((e) => ({ ...e, image: `/events/${e.code.toLowerCase()}.webp`, poster: `/posters/${e.code.toLowerCase()}.webp` }));

export const eventsByZone = (zoneId) => events.filter((e) => e.zone === zoneId);
export const eventsByDay = (dayId) => events.filter((e) => e.day === dayId);
export const zoneById = (id) => zones.find((z) => z.id === id);
