// Resume-backed experience entries for the Guild Hall.
export const GUILD_QUESTS = [
  {
    id: "nova-cloud",
    logo: { src: "/images/experiences/nova-cloud-logo.png", alt: "NOVA Cloud logo", href: "https://gonovacloud.com/", background: "#ffffff", objectFit: "contain", objectPosition: "center" },
    rank: "S",
    title: "Software Engineering Intern",
    org: "NOVA Cloud LLC",
    duration: "March 2026 - Present - Remote",
    summary: "Building and testing a client-facing cloud management platform alongside senior developers.",
    media: [
      { type: "image", src: "/images/experiences/nova-cloud-public-homepage.png", alt: "Public NOVA Cloud homepage", caption: "A public NOVA Cloud homepage screenshot provides product context without exposing private internship work." }
    ],
    bullets: [
      "Developing with Vue.js, Node.js, Express, Redis, and DynamoDB across a production cloud-management stack.",
      "Bringing together data from more than 40 AWS services so customers can understand usage and find cost-saving opportunities across multiple accounts.",
      "Built a mock backend for roughly 100 endpoints and end-to-end Selenium coverage for more than 50 application routes.",
      "Using Docker, Selenium Grid, Healenium, and AWS Bedrock to support resilient testing and AI-assisted cloud analysis."
    ],
    tags: "Vue.js / Node.js / AWS / Selenium / Docker",
    reward: 40
  },
  {
    id: "gmu-research",
    logo: { src: "/images/experiences/gmu-logo.jpg", alt: "George Mason University logo", href: "https://www.gmu.edu/", background: "#005239", objectFit: "contain" },
    rank: "S",
    title: "AI/ML Research Intern",
    org: "George Mason University",
    duration: "June 2025 - March 2026 - Fairfax, VA",
    summary: "Led research on how prompting strategies affect LLM performance on advanced competitive-programming problems.",
    media: [
      { type: "image", src: "/images/experiences/gmu-research-presentation-wide.jpeg", alt: "Sunmay speaking during the AI research presentation at MIT URTC", objectPosition: "center 42%", caption: "Sunmay presenting the prompting-strategy research at the MIT Undergraduate Research Technology Conference." },
      { type: "image", src: "/images/experiences/gmu-research-slide.webp", alt: "Prompt-engineering research background slide presented at MIT URTC", objectPosition: "center", caption: "A research slide introducing the motivation and prompt-engineering techniques evaluated." },
      { type: "image", src: "/images/experiences/gmu-paper-abstract.png", alt: "Abstract of the paper evaluating four prompting techniques on advanced Codeforces problems", objectPosition: "top", objectFit: "contain", caption: "The published abstract summarizes the study design and accuracy results." }
    ],
    bullets: [
      "Evaluated four prompting approaches across 90 Codeforces problems rated from 1600 to 2400 under Dr. Mihai Boicu.",
      "Built an automated Java-generation and official-grading workflow, including a two-model critique process with as many as five revision rounds.",
      "Led methodology, experiments, statistical analysis, and paper writing as first author.",
      "Presented the peer-reviewed IEEE paper at the 2025 MIT Undergraduate Research Technology Conference and the GMU Research Symposium."
    ],
    tags: "Python / AI Research / Java / Statistical Analysis",
    reward: 40
  },
  {
    id: "cybersages",
    logo: { src: "/images/experiences/first-logo.jpg", alt: "FIRST logo", href: "https://www.firstinspires.org/", objectFit: "contain" },
    rank: "A",
    title: "Founder & Captain",
    org: "FTC Team #23541 - CyberSages",
    duration: "June 2023 - January 2026 - Ashburn, VA",
    summary: "Founded and led a robotics team through three competition seasons, combining engineering leadership with hands-on software and hardware work.",
    media: [
      { type: "image", src: "/images/experiences/cybersages-team.jpeg", alt: "CyberSages robotics team together at a FIRST Chesapeake competition", caption: "The CyberSages team at a FIRST Chesapeake competition." },
      { type: "video", src: "/videos/experiences/cybersages-robot-demo.mp4", label: "CyberSages robot demonstration" },
      { type: "image", src: "/images/experiences/cybersages-robot.jpeg", alt: "CyberSages competition robot on a practice field", objectPosition: "center 32%", caption: "The competition robot working on the practice field." }
    ],
    bullets: [
      "Secured more than $4,000 in grants and sponsorships while coordinating software, mechanical, and electrical development.",
      "Helped the team reach the State Championship and earn the Think Award.",
      "Designed a custom mecanum-drive robot, integrated its motors, sensors, servos, control hubs, and power system, and competed across more than 30 official matches.",
      "Built modular Java autonomous software with Road Runner and PID/PIDF control, improving consistency by about 30% and reducing runtime by about 40%."
    ],
    tags: "Leadership / Java / Robotics / Controls",
    reward: 35
  }
];
