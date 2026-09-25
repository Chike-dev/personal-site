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
    title: "Enterprise AD & IT Help Desk Lab",
    status: "Building",
    description: "Windows Server 2022 Active Directory environment on AWS, deployed via Terraform for 25 users across five departments. Full AD DS, DNS, OUs, Group Policy, and file-share permissions; PowerShell provisioning runbooks; Jira Service Management help desk with SLAs, and 20 simulated Tier 1/2 tickets resolved.",
    tags: ["AWS", "Windows Server 2022", "Active Directory", "Terraform", "PowerShell", "Jira"],
    image: null,
    cover: "ad-helpdesk",
    github: null,
    live: null
  },
  {
    number: "003",
    title: "In Planning…",
    description: "",
    tags: [],
    image: null,
    github: null,
    live: null
  },
  {
    number: "004",
    title: "In Planning…",
    description: "",
    tags: [],
    image: null,
    github: null,
    live: null
  },
  {
    number: "005",
    title: "In Planning…",
    description: "",
    tags: [],
    image: null,
    github: null,
    live: null
  },
  {
    number: "006",
    title: "In Planning…",
    description: "",
    tags: [],
    image: null,
    github: null,
    live: null
  }
];
