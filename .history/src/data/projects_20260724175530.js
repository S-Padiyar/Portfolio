// Technical builds drawn from the resume and rewritten for a portfolio audience.
export const PROJECTS = [
  {
    title: "Interactive Portfolio Website",
    images: [
      { src: "/images/portfolio/skill-tree-current.png", alt: "The portfolio Skill Tree with connected software, cloud, research, and robotics branches", caption: "The Skill Tree maps the technical areas behind the portfolio." },
      { src: "/images/portfolio/quest-log.png", alt: "The portfolio Quest Log showing recent GitHub commit activity", caption: "The Quest Log turns recent GitHub activity into a readable project timeline." },
      { src: "/images/portfolio/botmay-companion.png", alt: "Botmay, the portfolio companion", caption: "Botmay is the friendly guide for exploring the portfolio." }
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
    images: [
      { src: "/images/projects/ai-pipeline-results.png", alt: "Bar chart comparing accuracy by prompting strategy", caption: "Overall accuracy by prompting type across the evaluation set." },
      { src: "/images/projects/ai-pipeline-process.png", alt: "Prompting process diagram for the evaluation pipeline", caption: "The process diagram shows initialization, prompting, chaining, and saved results." },
      { src: "/images/projects/ai-pipeline-submissions.png", alt: "Codeforces submissions table with verdicts and runtimes", caption: "The submission log records official verdicts, runtime, memory, and problem metadata." }
    ],
    desc: "An automated research pipeline that tests how different prompting strategies perform on competitive-programming problems.",
    tags: "Python / Selenium / OpenAI API / Pandas",
    icon: "monitor",
    year: "2025-2026",
    role: "Research lead and first author",
    highlights: [
      "Collected more than 90 Codeforces problems and organized reproducible datasets with ratings, tags, and cached problem statements.",
      "Automated solution generation, browser submission, official judging, and verdict collection without manually editing model output.",
      "Compared four prompting strategies; Structured Chain-of-Thought raised accepted solutions from 44.44% to 56.67%, with statistical testing in Python."
    ]
  },
  {
    title: "FTC Autonomous Navigation System",
    images: [
      { src: "/images/projects/ftc-pid-tuning.png", alt: "PID tuning graph for the FTC robot drivetrain", caption: "PID tuning traces show how the drivetrain responds while constants are adjusted." },
      { src: "/images/projects/ftc-field-visualization-cropped.png", alt: "FTC autonomous field visualization with robot trajectory", caption: "The field visualization shows the planned autonomous trajectory and robot pose." },
      { src: "/images/projects/ftc-arm-mechanism.jpeg", alt: "FTC robot with its arm mechanism extended", caption: "The robot picture shows the arm mechanism integrated with the competition robot." }
    ],
    desc: "A reusable Java control system for reliable autonomous movement, mechanism control, and driver-assist features on competition robots.",
    tags: "Java / FTC SDK / Road Runner / PIDF",
    icon: "robot",
    year: "2023-2026",
    role: "Founder, captain, and software lead",
    highlights: [
      "Built mecanum-drive autonomous navigation with three-wheel dead-wheel odometry and a position-hold feature that corrects the robot after it is pushed.",
      "Created one-button goal alignment and tuned a PIDF-controlled launcher for fast, repeatable ball launches.",
      "Improved autonomous consistency by about 30% and implemented code for telemetry collection and arm mechanism control."
    ]
  }
];