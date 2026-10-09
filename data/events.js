// Card-level data only. Full specs/rules live in rulebook.js and are loaded lazily by the modal.

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
    name: "Combat",
    blurb: "Head-to-head arenas where torque, traction and strategy decide who walks away with the win.",
    icon: "combat",
  },
  {
    id: "innovation",
    no: "03",
    name: "Innovation",
    blurb: "Ideas, builds and code, judged on originality, execution and real-world impact.",
    icon: "innovation",
  },
];

export const events = [
  {
    code: "ERL01",
    name: "Line Follower",
    zone: "speed",
    icon: "track",
    tagline: "Follow the path. Beat the challenge.",
    highlights: [
      ["Control", "Autonomous"],
      ["Max size", "25×25×20 cm"],
      ["Time", "3 min"],
    ],
  },
  {
    code: "ERL02",
    name: "Robo Race",
    zone: "speed",
    icon: "car",
    tagline: "Ramps, hurdles, tunnels. Fastest clean run takes it.",
    highlights: [
      ["Control", "Wired / wireless"],
      ["Max weight", "3 kg"],
      ["Time", "3 min / run"],
    ],
  },
  {
    code: "ERL06",
    name: "Drone Race",
    zone: "speed",
    icon: "drone",
    tagline: "Thread the gates. Stick the landing.",
    highlights: [
      ["Max weight", "500 g"],
      ["Prop guards", "Mandatory"],
      ["Attempts", "2"],
    ],
  },
  {
    code: "ERL05",
    name: "Tug of War",
    zone: "combat",
    icon: "tug",
    tagline: "Pure torque. Drag them past the line.",
    highlights: [
      ["Max weight", "3.5 kg"],
      ["Round", "1–2 min"],
      ["Knockouts", "Best of 3"],
    ],
  },
  {
    code: "ERL04",
    name: "Robo War",
    zone: "combat",
    icon: "war",
    tagline: "Push, ram, out-manoeuvre. Last bot in the ring wins.",
    highlights: [
      ["Arena", "Ø 1800 mm"],
      ["Max weight", "5 kg"],
      ["Match", "2–3 min"],
    ],
  },
  {
    code: "ERL03",
    name: "Robo Soccer",
    zone: "combat",
    icon: "soccer",
    tagline: "Two halves. One ball. Most goals wins.",
    highlights: [
      ["Match", "2 × 5 min"],
      ["Max weight", "3 kg"],
      ["Ball", "Foam, 10–15 cm"],
    ],
  },
  // PLACEHOLDER — Innovation zone rules are not in the rulebook yet.
  {
    code: "INV01",
    name: "Ideathon",
    zone: "innovation",
    icon: "idea",
    tba: true,
    tagline: "Pitch a tech-driven solution to a real problem.",
    summary: "Teams present an original idea backed by research, a feasibility plan and a short pitch to the jury.",
  },
  {
    code: "INV02",
    name: "Project Exhibition",
    zone: "innovation",
    icon: "exhibit",
    tba: true,
    tagline: "Bring a working build. Show the jury how it works.",
    summary: "Teams display a working model or prototype and demonstrate it to judges and visitors through the day.",
  },
  {
    code: "INV03",
    name: "Hackathon",
    zone: "innovation",
    icon: "code",
    tba: true,
    tagline: "Time-boxed sprint. Ship something that works.",
    summary: "Teams build a software or hardware solution to a problem statement revealed at the start of the sprint.",
  },
].map((e) =>
  e.tba
    ? {
        ...e,
        highlights: [
          ["Team", "2–4"],
          ["Format", "TBA"],
          ["Rules", "Coming soon"],
        ],
      }
    : e
);

export const eventsByZone = (zoneId) => events.filter((e) => e.zone === zoneId);
export const zoneById = (id) => zones.find((z) => z.id === id);
