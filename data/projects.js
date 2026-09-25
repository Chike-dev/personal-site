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
    description: "Building…",
    tags: ["Docker", "CI/CD", "GitHub Actions"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "003",
    title: "Third project",
    description: "In Planning…",
    tags: ["Kubernetes", "AWS EKS"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "004",
    title: "Fourth project",
    description: "In Planning…",
    tags: ["Security", "IAM", "AWS"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "005",
    title: "Fifth project",
    description: "In Planning…",
    tags: ["Serverless", "Lambda"],
    image: null,
    github: null,
    live: null
  },
  {
    number: "006",
    title: "Sixth project",
    description: "In Planning…",
    tags: ["Networking", "VPC"],
    image: null,
    github: null,
    live: null
  }
];
