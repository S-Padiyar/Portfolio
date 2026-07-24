// Skill Tree nodes stay general, while examples point back to real portfolio work.
export const SKILL_NODES = [
  {
    id: "core",
    label: "Engineering\nCore",
    branch: "core",
    icon: "bolt",
    requires: [],
    xp: 20,
    desc: "The center of the tree: curiosity, problem-solving, communication, and the habit of turning messy requirements into working systems.",
    experiences: [
      "Georgia Tech CS foundation - data structures, algorithms, discrete math, and computing systems",
      "Built this portfolio as a production-style React project",
      "Combined software, robotics, research, and cloud experience into one coherent system"
    ]
  },
  {
    id: "programming-languages",
    label: "Programming\nLanguages",
    branch: "code",
    icon: "monitor",
    requires: ["core"],
    xp: 40,
    desc: "Java, Python, JavaScript, TypeScript, C/C++, and SQL used across web apps, robotics code, research scripts, and coursework.",
    experiences: [
      "Georgia Tech coursework - object-oriented programming, data structures, and algorithms",
      "FTC Code - Java robot control and autonomous routines",
      "AI Evaluation Pipeline - Python research automation",
      "Sunmay Portfolio - React and JavaScript frontend work"
    ]
  },
  {
    id: "web-applications",
    label: "Web\nApplications",
    branch: "code",
    icon: "monitor",
    requires: ["programming-languages"],
    xp: 60,
    desc: "Frontend application development with reusable components, responsive layouts, stateful interactions, and user-focused polish.",
    experiences: [
      "Sunmay Portfolio - game-inspired interface with settings, achievements, mailbox, and GitHub activity",
      "NOVA Cloud LLC - cloud-services internship context for client-facing software"
    ]
  },
  {
    id: "backend-apis",
    label: "Backend &\nAPIs",
    branch: "code",
    icon: "monitor",
    requires: ["web-applications"],
    xp: 90,
    desc: "API wiring, environment configuration, request validation, and backend boundaries that keep sensitive keys out of the browser.",
    experiences: [
      "Georgia Tech coursework - computer organization and systems-level thinking",
      "Botmay Worker - Cloudflare endpoint for the Gemini assistant",
      "Contact form - Formspree-backed message submission",
      "GitHub Quest Log - fetches recent repository commit history"
    ]
  },
  {
    id: "cloud-platforms",
    label: "Cloud\nPlatforms",
    branch: "cloud",
    icon: "cloud",
    requires: ["core"],
    xp: 50,
    desc: "Hosted services, environment variables, production builds, and the practical parts of deploying software safely.",
    experiences: [
      "NOVA Cloud LLC - internship centered on cloud-services engineering",
      "Sunmay Portfolio - Cloudflare Worker configuration and local Worker testing"
    ]
  },
  {
    id: "automation-testing",
    label: "Automation &\nTesting",
    branch: "cloud",
    icon: "gear",
    requires: ["cloud-platforms"],
    xp: 75,
    desc: "Testing and automation habits that make code safer to change, especially when UI, backend, and external APIs meet.",
    experiences: [
      "Georgia Tech coursework - algorithms and discrete math habits for reasoning about edge cases",
      "React component tests for contact, character, companion, and frame behavior",
      "Worker tests for CORS, validation, rate limiting, and high-demand assistant responses"
    ]
  },
  {
    id: "cloud-systems",
    label: "Cloud\nSystems",
    branch: "cloud",
    icon: "cloud",
    requires: ["automation-testing"],
    xp: 105,
    desc: "Designing deployed systems with boundaries between frontend UX, backend requests, secrets, and provider APIs.",
    experiences: [
      "Botmay assistant - frontend chat routed through a Worker instead of exposing the Gemini key",
      "NOVA Cloud LLC - continued cloud-services learning in a professional setting"
    ]
  },
  {
    id: "hardware-integration",
    label: "Hardware\nIntegration",
    branch: "robotics",
    icon: "gear",
    requires: ["core"],
    xp: 45,
    desc: "Connecting real hardware, sensors, motors, mechanisms, and software so the robot behaves as one system.",
    experiences: [
      "CyberSages FTC Team #23541 - competition robot build and integration",
      "FTC arm mechanism - software had to coordinate with physical constraints"
    ]
  },
  {
    id: "control-systems",
    label: "Control\nSystems",
    branch: "robotics",
    icon: "gear",
    requires: ["hardware-integration"],
    xp: 80,
    desc: "PID/PIDF tuning, telemetry, autonomous movement, and iterative debugging for repeatable robot behavior.",
    experiences: [
      "Georgia Tech math foundation - linear algebra and multivariable calculus for modeling motion and systems",
      "FTC Code - velocity tuning and telemetry analysis",
      "Road Runner pathing - autonomous field trajectories"
    ]
  },
  {
    id: "technical-leadership",
    label: "Technical\nLeadership",
    branch: "robotics",
    icon: "briefcase",
    requires: ["control-systems"],
    xp: 110,
    desc: "Leading technical decisions, coordinating teammates, preparing for competition, and keeping work moving under deadlines.",
    experiences: [
      "Founder and captain of CyberSages FTC Team #23541",
      "National Center for Simulation scholarship recognition"
    ]
  },
  {
    id: "ai-research",
    label: "AI\nResearch",
    branch: "research",
    icon: "bolt",
    requires: ["core"],
    xp: 50,
    desc: "Turning questions about model behavior into experiments that can be measured, compared, and explained clearly.",
    experiences: [
      "Georgia Tech coursework - discrete math and algorithms for formal problem solving",
      "AI Evaluation Pipeline - compared prompting strategies on Codeforces problems",
      "George Mason University - research presentation and paper materials"
    ]
  },
  {
    id: "ai-engineering",
    label: "AI\nEngineering",
    branch: "research",
    icon: "monitor",
    requires: ["ai-research"],
    xp: 80,
    desc: "Building practical AI workflows that collect data, call model APIs, preserve results, and make evaluation repeatable.",
    experiences: [
      "Prompting workflow - initialized clients, generated runs, saved outputs, and tracked grader results",
      "Botmay companion - applied assistant UX, safety boundaries, and portfolio-specific knowledge"
    ]
  },
  {
    id: "research-communication",
    label: "Research\nCommunication",
    branch: "research",
    icon: "briefcase",
    requires: ["ai-engineering"],
    xp: 100,
    desc: "Explaining technical work through diagrams, results charts, abstracts, presentations, and human-readable writing.",
    experiences: [
      "Georgia Tech coursework - computing and society for connecting technical work to human impact",
      "George Mason University - presented AI research to a formal audience",
      "AI Evaluation Pipeline - charts and process diagrams made the methodology easier to review"
    ]
  }
];
