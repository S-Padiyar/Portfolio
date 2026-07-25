import { largeAssetUrl } from "./largeAssetUrl.js";

export const BLOG_POSTS = [
  {
    id: "cybersages-engineering-portfolio",
    title: "CyberSages Engineering Portfolio",
    date: "Robotics archive",
    readTime: "PDF",
    tags: ["Robotics", "Engineering", "FTC"],
    excerpt: "A robotics-team engineering portfolio documenting CyberSages design, build, and iteration work.",
    href: largeAssetUrl("CyberSages-Engineering-Portfolio.pdf", { raw: false }),
    paragraphs: [
      "This archive comes from my robotics work with CyberSages. It documents how the team approached engineering tradeoffs, robot design, mechanisms, software, testing, and iteration across the season.",
      "I keep it in the Dungeon Journal because it is a deeper artifact than a normal project card: it shows process, not just the final result."
    ]
  }
];
