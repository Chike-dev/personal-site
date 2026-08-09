// PROJECTS — cloud portfolio entries.
// Edit this file to add, remove, or update projects on the portfolio page.
//
// Each entry supports:
//   number      — a display index like "001"
//   title       — the project name
//   description — 2-3 sentences about what it does
//   tags        — array of short tag strings (tech stack, category)
//   image       — path or URL to a screenshot, or null for the "Nº XXX" placeholder
//   github      — full GitHub URL, or null to hide the link
//   live        — live demo URL, or null to hide the link

window.PROJECTS = [
  {
    number: "001",
    title: "CloudSentinel SOC",
    description: "AWS-native detection and response pipeline. Routes GuardDuty findings through EventBridge and Lambda into Security Hub with SNS alerting. Validated against synthetic test cases and a real credential-exfiltration attack on EC2.",
    tags: ["AWS", "Security", "GuardDuty", "Lambda", "Python"],
    image: "https://raw.githubusercontent.com/Chike-dev/CloudSentinel-SOC-Project/main/architecture/cloudsentinel-architecture.png",
    github: "https://github.com/Chike-dev/CloudSentinel-SOC-Project",
    live: null
  },
  {
    number: "002",
    title: "Another project",
    description: "Placeholder description. Each card lives in data/projects.js and renders here automatically. Swap this text for your real project details.",
    tags: ["Docker", "CI/CD", "GitHub Actions"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "003",
    title: "Third project",
    description: "You can add screenshots by dropping images into images/projects/ and referencing them in the image field of this entry.",
    tags: ["Kubernetes", "AWS EKS"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "004",
    title: "Fourth project",
    description: "Each card supports a title, description, tag list, and optional GitHub and live-demo links.",
    tags: ["Security", "IAM", "AWS"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "005",
    title: "Fifth project",
    description: "Placeholder copy. When you have real projects to add, delete these entries and add new ones in the same shape.",
    tags: ["Serverless", "Lambda"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "006",
    title: "Sixth project",
    description: "The grid grows or shrinks with the number of entries you have here. Six is a good starting point for a full deck.",
    tags: ["Networking", "VPC"],
    image: null,
    github: null,
    live: null
  }
];
