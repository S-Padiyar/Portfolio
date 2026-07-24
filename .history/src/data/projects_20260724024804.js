// Technical builds drawn from the resume and rewritten for a portfolio audience.
export const PROJECTS = [
  {
    title: "Interactive Portfolio Website",
    images: [
      { src: "/images/portfolio/skill-tree.png", alt: "The portfolio Skill Tree with connected software, cloud, research, and robotics branches" },
      { src: "/images/portfolio/guild-hall.png", alt: "The portfolio Guild Hall showing software, research, and robotics experience cards" }
    ],
    desc: "A game-inspired portfolio that presents my work without losing accessibility, clarity, and reliability.",
    tags: "React / Vite / Cloudflare Workers / Gemini API",
    icon: "monitor",
    year: "2026",
    role: "Designer and full-stack developer",
    highlights: [
      "Designed a responsive component system with accessible modals, keyboard interactions, multiple themes, readable-font preferences, and persistent user settings.",
      "Built portfolio-specific systems for XP progression, achievements, GitHub commit activity, contact delivery, calendar booking, and the interactive Botmay guide.",
      "Protected the Gemini API key behind a rate-limited Cloudflare Worker and added automated unit, interface, accessibility-oriented, and backend tests."
    ]
  },
  {
    title: "Codeforces AI Evaluation Pipeline",
    desc: "An automated research pipeline that tests how different prompting strategies perform on competitive-programming problems.",
    tags: "Python / Selenium / OpenAI API / Pandas",
    icon: "monitor",
    year: "2025–2026",
    role: "Research lead and first author",
    highlights: [
      "Collected more than 90 Codeforces problems and organized reproducible datasets with ratings, tags, and cached problem statements.",
      "Automated solution generation, browser submission, official judging, and verdict collection without manually editing model output.",
      "Compared four prompting strategies; Structured Chain-of-Thought raised accepted solutions from 44.44% to 56.67%, with statistical testing in Python."
    ]
  },
  {
    title: "FTC Autonomous Navigation System",
    desc: "A reusable Java control system for reliable autonomous movement, mechanism control, and driver-assist features on competition robots.",
    tags: "Java / FTC SDK / Road Runner / PIDF",
    icon: "robot",
    year: "2023–2026",
    role: "Founder, captain, and software lead",
    highlights: [
      "Built mecanum-drive autonomous navigation with three-wheel dead-wheel odometry and a position-hold feature that corrects the robot after it is pushed.",
      "Created one-button goal alignment and tuned a PIDF-controlled launcher for fast, repeatable ball launches.",
      "Improved autonomous consistency by about 30% and cut runtime by about 40% through telemetry, trajectory tuning, and field testing."
    ]
  }
];
