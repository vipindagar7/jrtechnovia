// Central event details. Source: official rule book, sponsorship proposal and posters (Nov 2026).

export const site = {
  name: "Junior Technovia",
  year: "2026",
  level: "National Level",
  subtitle: "National Level Robotic and Innovation Challenge",
  motto: ["Idea", "Innovation", "Impact"],
  eligibility: "Grade 9–12",
  audience: ["Students", "Innovators", "Makers", "Problem Solvers"],

  venue: "Echelon Institute of Technology, Faridabad, Haryana",
  venueShort: "EIT, Faridabad",
  mapUrl: "https://maps.google.com/?q=Echelon+Institute+of+Technology+Faridabad",
  dateLabel: "20 & 21 November 2026",
  days: [
    { id: "d1", label: "Day 1", date: "20 Nov 2026", weekday: "Friday" },
    { id: "d2", label: "Day 2", date: "21 Nov 2026", weekday: "Saturday" },
  ],
  // Used only by the countdown (start time assumed 9:00 AM IST).
  eventStart: "2026-11-20T09:00:00+05:30",

  prizePool: 200000,
  prizePoolLabel: "₹2,00,000",
  fee: "₹100",
  feeUnit: "per student, per event",
  teamSize: "1–4",

  registerUrl: "https://forms.gle/dYBtXaZfTVJAxJkM6",
  qrUrl: "/qr-register.svg",
  rulebookUrl: "/Junior_Technovia_2026_Rule_Book.pdf",
  sponsorDeckUrl: "/Junior_Technovia_2026_Sponsorship_Proposal.pdf",

  email: "jrtechnovia26@eitfaridabad.co.in",
  coordinators: [
    { name: "Dev Prakash", phone: "+91 99533 29791", tel: "+919953329791" },
    { name: "Aalekh Sharma", phone: "+91 96430 28814", tel: "+919643028814" },
  ],
  sponsorContact: { name: "Neeraj Joshi", role: "Organizing Committee", phone: "+91 90275 88815", tel: "+919027588815" },

  partners: [
    { name: "Echelon Institute of Technology — An initiative by The Last Centre", src: "/logos/echelon.webp", w: 372, h: 151 },
    { name: "Guru Gobind Singh Indraprastha University", src: "/logos/ggsipu.webp", w: 337, h: 140 },
    { name: "IEEE Student Branch STB13981, EIT Faridabad", src: "/logos/ieee.webp", w: 322, h: 127 },
  ],
  organiser: "IEEE Student Branch (STB13981), Echelon Institute of Technology, Faridabad",

  // PLACEHOLDER — add real profile URLs or remove.
  social: { instagram: "#", linkedin: "#", youtube: "#" },
};
