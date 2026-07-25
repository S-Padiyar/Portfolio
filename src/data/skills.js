// Skill Tree nodes stay general, while the evidence lines point to concrete resume-backed work.
export const SKILL_NODES = [
  {
    id: "core",
    label: "Engineering\nCore",
    branch: "core",
    icon: "bolt",
    requires: [],
    xp: 20,
    desc: "The center of the tree: technical curiosity, systems thinking, communication, and the habit of turning vague requirements into working products.",
    experiences: [
      "Georgia Tech CS: data structures, algorithms, discrete math, computer organization, and computing and society",
      "Portfolio Website: React, Vite, Cloudflare Worker, Gemini API, tests, settings, achievements, mailbox, and GitHub activity",
      "Engineering range: cloud software, AI research, robotics controls, and full-stack product work"
    ]
  },
  {
    id: "programming-languages",
    label: "Programming\nLanguages",
    branch: "code",
    icon: "monitor",
    requires: ["core"],
    xp: 40,
    desc: "Practical programming across Java, Python, JavaScript, TypeScript, C/C++, and SQL in research, robotics, web applications, and coursework.",
    experiences: [
      "Java: FTC SDK autonomous routines, Road Runner pathing, launcher control, and arm mechanism logic",
      "Python: Codeforces AI evaluation automation, statistical analysis, and research data handling",
      "JavaScript and TypeScript: React/Vite portfolio UI, Cloudflare Worker integration, and browser-side interactions",
      "C/C++ and SQL: systems and database foundation from coursework and technical practice"
    ]
  },
  {
    id: "web-applications",
    label: "Web\nApplications",
    branch: "code",
    icon: "monitor",
    requires: ["programming-languages"],
    xp: 60,
    desc: "Frontend product work with reusable components, responsive layouts, persistent preferences, accessible modals, and interaction-heavy UI.",
    experiences: [
      "Portfolio Website: game-inspired React interface with Skill Tree, Trophy Case, Guild Hall, mailbox, settings, achievements, and Botmay",
      "Stateful UX: saved font, theme, mail-read, achievement, and portfolio preference behavior in local storage",
      "Readable interface polish: responsive layouts, hover titles, clickable links, modal details, and mobile-safe content"
    ]
  },
  {
    id: "backend-apis",
    label: "Backend &\nAPIs",
    branch: "code",
    icon: "monitor",
    requires: ["web-applications"],
    xp: 90,
    desc: "Backend boundaries, API validation, environment configuration, secret handling, and service integrations that keep browser code safe.",
    experiences: [
      "Botmay Worker: Cloudflare endpoint that keeps the Gemini API key out of frontend code",
      "Assistant backend: CORS validation, JSON-only requests, transcript limiting, high-demand error handling, and rate-limit checks",
      "Contact flow: Formspree-backed message submission with normalized sender fields",
      "GitHub Quest Log: one latest commit per repository with graceful fallback when one repo request fails"
    ]
  },
  {
    id: "cloud-platforms",
    label: "Cloud\nPlatforms",
    branch: "cloud",
    icon: "cloud",
    requires: ["core"],
    xp: 50,
    desc: "Cloud tooling, hosted services, environment variables, local Worker testing, and production-minded deployment boundaries.",
    experiences: [
      "NOVA Cloud LLC: Vue.js, Node.js, Express, Redis, DynamoDB, AWS services, Docker, and Selenium in a cloud-management platform",
      "AWS service context: work involving data across more than 40 AWS services for usage and cost-analysis workflows",
      "Portfolio deployment: Cloudflare Worker configuration, local Wrangler testing, and protected Gemini access"
    ]
  },
  {
    id: "automation-testing",
    label: "Automation &\nTesting",
    branch: "cloud",
    icon: "gear",
    requires: ["cloud-platforms"],
    xp: 75,
    desc: "Automated checks that make UI, backend, and external-service code safer to change without breaking hidden behavior.",
    experiences: [
      "NOVA Cloud LLC: mock backend for about 100 endpoints and Selenium coverage for more than 50 routes",
      "Testing stack: Selenium Grid, Healenium, Docker, Vitest, React Testing Library, and Node test runner",
      "Portfolio tests: XP math, contact validation, commit fetching, assistant errors, CORS, rate limiting, and UI components"
    ]
  },
  {
    id: "cloud-systems",
    label: "Cloud\nSystems",
    branch: "cloud",
    icon: "cloud",
    requires: ["automation-testing"],
    xp: 105,
    desc: "End-to-end cloud system thinking: frontend UX, backend APIs, provider services, protected secrets, and reliable integration testing.",
    experiences: [
      "NOVA Cloud LLC: client-facing cloud platform work across frontend, backend, cache, database, and AWS-service data",
      "AWS Bedrock context: AI-assisted cloud analysis workflows inside the internship stack",
      "Botmay assistant: browser chat routed through a rate-limited Worker instead of exposing provider credentials"
    ]
  },
  {
    id: "hardware-integration",
    label: "Hardware\nIntegration",
    branch: "robotics",
    icon: "gear",
    requires: ["core"],
    xp: 45,
    desc: "Connecting motors, sensors, mechanisms, controls, and software so a physical robot behaves like one coordinated system.",
    experiences: [
      "CyberSages FTC Team #23541: custom mecanum-drive robot with motors, sensors, servos, control hubs, and power system",
      "Arm mechanism: robot software coordinated with physical constraints and mechanism behavior",
      "Competition experience: more than 30 official matches and State Championship qualification"
    ]
  },
  {
    id: "control-systems",
    label: "Control\nSystems",
    branch: "robotics",
    icon: "gear",
    requires: ["hardware-integration"],
    xp: 80,
    desc: "Telemetry-driven control work with PID/PIDF tuning, odometry, autonomous movement, and repeatable mechanism behavior.",
    experiences: [
      "Road Runner: autonomous field trajectories with three-wheel dead-wheel odometry",
      "PID/PIDF: launcher velocity tuning, telemetry analysis, and repeatable ball launches",
      "Robot reliability: position-hold behavior and autonomous consistency improved by about 30%",
      "Math foundation: linear algebra and multivariable calculus for motion and systems reasoning"
    ]
  },
  {
    id: "technical-leadership",
    label: "Technical\nLeadership",
    branch: "robotics",
    icon: "briefcase",
    requires: ["control-systems"],
    xp: 110,
    desc: "Leading technical decisions, coordinating teammates, raising support, documenting work, and shipping under competition deadlines.",
    experiences: [
      "CyberSages FTC Team #23541: founder, captain, and software lead across three seasons",
      "Team resources: secured more than $4,000 in grants and sponsorships",
      "Recognition: Think Award, State Championship qualification, and National Center for Simulation scholarship"
    ]
  },
  {
    id: "ai-research",
    label: "AI\nResearch",
    branch: "research",
    icon: "bolt",
    requires: ["core"],
    xp: 50,
    desc: "Turning questions about model behavior into measurable experiments with clear methodology, results, and limitations.",
    experiences: [
      "George Mason University: AI/ML research internship under Dr. Mihai Boicu",
      "Codeforces study: 90 problems rated 1600-2400 comparing No Prompt, Zero-Shot Chain-of-Thought, Prompt Chaining, and Structured Chain-of-Thought",
      "Research result: Structured Chain-of-Thought reached 56.67% accuracy compared with 44.44% for No Prompt"
    ]
  },
  {
    id: "ai-engineering",
    label: "AI\nEngineering",
    branch: "research",
    icon: "monitor",
    requires: ["ai-research"],
    xp: 80,
    desc: "Building repeatable AI workflows that collect inputs, call model APIs, preserve outputs, and evaluate results against real judges.",
    experiences: [
      "Evaluation pipeline: problem extraction, prompt execution, conversation history, result saving, and official verdict tracking",
      "Automated grading: browser submission to Codeforces with Java 21 outputs and recorded time, memory, and verdicts",
      "Revision workflow: two-model critique process with up to five revision rounds"
    ]
  },
  {
    id: "research-communication",
    label: "Research\nCommunication",
    branch: "research",
    icon: "briefcase",
    requires: ["ai-engineering"],
    xp: 100,
    desc: "Explaining technical research through papers, diagrams, charts, abstracts, presentations, and reviewer-friendly writing.",
    experiences: [
      "IEEE paper: first author on peer-reviewed LLM prompting research",
      "MIT URTC 2025: presented the prompting-strategy research to a formal research audience",
      "GMU Research Symposium: communicated methodology, results, and implications through presentation materials",
      "Research visuals: process diagram, accuracy chart, submission table, and abstract included in the portfolio"
    ]
  }
];
