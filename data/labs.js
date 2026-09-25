// LABS — the polished class-lab entries that appear in the #labs section of index.html.
// Each entry supports:
//   number       — display index like "001"
//   title        — the lab name (portfolio-quality, not class-syllabus style)
//   subtitle     — one-line topic / short descriptor
//   course       — course code / name
//   date         — when the lab was completed
//   description  — 2-3 sentence blurb for the card
//   tags         — array of short tag strings
//   coverType    — key for the themed animated cover
//                   (aws-compliance, aws-storage, aws-ha, azure-cloud, network-scale, network-tiered, security-analysis, packet-tracer, docker)
//   pdf          — path to the polished PDF, or null if not yet published
//   downloads    — optional array of file paths to offer as downloads
//   credit       — group-project attribution, or null

window.LABS = [
  {
    number: "001",
    title: "PayBridge",
    subtitle: "Fintech Compliance Build on AWS",
    course: "CIT 360",
    date: "June 2026",
    description: "Compliance-focused AWS environment for a fictional fintech. Centralized IAM with MFA and least-privilege groups, EC2 inside a locked-down VPC, S3 encrypted with a customer-managed KMS key, CloudTrail audit logging, and CloudWatch alarms. Every control mapped to PCI-DSS and SOX obligations.",
    tags: ["AWS", "IAM", "KMS", "CloudTrail", "PCI-DSS", "SOX"],
    coverType: "aws-compliance",
    pdf: "labs/paybridge.pdf",
    credit: null
  },
  {
    number: "002",
    title: "ChartPath Medical",
    subtitle: "EMR Platform on Azure",
    course: "CIT 360",
    date: "June 2026",
    description: "Electronic medical records platform for a fictional clinical network. Azure Cosmos DB with continuous backup for patient records, geo-redundant blob storage for uploads, archive-tier retention for older records, and role-based access for two subsidiary clinics.",
    tags: ["Azure", "Cosmos DB", "RBAC", "Geo-Redundancy", "Healthcare"],
    coverType: "azure-cloud",
    pdf: "labs/chartpath-medical.pdf",
    credit: null
  },
  {
    number: "003",
    title: "EVIL Airport",
    subtitle: "Multi-Region DR on Azure",
    course: "CIT 360",
    date: "June 2026",
    description: "Cloud environment for a fictional overflow airport serving airline and shipping partners. Geo-redundant storage, private routes between VMs, RBAC for FedEx and Delta partner identities, archive-tier document retention, and a hardened public interface.",
    tags: ["Azure", "VMs", "RBAC", "DR", "Networking"],
    coverType: "azure-cloud",
    pdf: "labs/evil-airport.pdf",
    credit: null
  },
  {
    number: "004",
    title: "CSUN Campus IT Specification",
    subtitle: "Environment Design for 41,000 Users",
    course: "CIT 360",
    date: "June 2026",
    description: "Full computing environment specification for a large public university. Bandwidth vs. throughput, SLA math with error budgets, MTBF/MTTR analysis, HA design, and M/M/c queuing models for capacity planning.",
    tags: ["Enterprise Architecture", "SLA Design", "Queuing Models", "HA"],
    coverType: "network-scale",
    pdf: "labs/csun-campus-it.pdf",
    credit: null
  },
  {
    number: "005",
    title: "MSU Enterprise Network Design",
    subtitle: "Scalable Hybrid Campus Architecture",
    course: "Enterprise System Architecture",
    date: "June 2026",
    description: "Three-tier network design for a fictional public university (20,000 students, 12 buildings). Core / distribution / access hierarchy behind a redundant internet edge, tied to a data-center block, with segmentation and 802.1X authentication throughout.",
    tags: ["Network Architecture", "3-Tier", "802.1X", "Redundancy"],
    coverType: "network-tiered",
    pdf: "labs/msu-network-design.pdf",
    credit: null
  },
  {
    number: "006",
    title: "CSUN Network Security Analysis",
    subtitle: "Threat Model & Controls (NIST CSF)",
    course: "IS 435 — Network & Security in Business",
    date: "May 2026",
    description: "Full network security analysis of California State University Northridge. Nine threats modeled (T-01 through T-09), risk matrix, and managerial + technical controls per threat, mapped to NIST CSF, ISO 27001, and CIS Controls.",
    tags: ["Security", "NIST CSF", "ISO 27001", "Risk Modeling", "Threat Analysis"],
    coverType: "security-analysis",
    pdf: "labs/csun-security-analysis.pdf",
    credit: "Group project with T. Takahashi, A. Moreira, E. Bazuaye. My contributions: threat modeling & risk analysis (T-01 to T-09), security controls & NIST CSF framework mapping, and report structure / editorial lead."
  },
  {
    number: "007",
    title: "Networking Fundamentals",
    subtitle: "ACLs, Switching, TCP/IP, WPA2 (Cisco Packet Tracer)",
    course: "Networking Fundamentals",
    date: "April 2026",
    description: "Four hands-on Packet Tracer exercises. Configuring standard and extended ACLs, observing MAC-table population and frame forwarding, inspecting TCP/IP layer headers packet-by-packet, and standing up a wireless AP secured with WPA2-PSK.",
    tags: ["Cisco", "Networking", "ACL", "WPA2", "Layer 2/3"],
    coverType: "packet-tracer",
    pdf: null,
    downloads: [
      { label: "ACL configuration (.pka)", path: "labs/packet-tracer/acl.pka" },
      { label: "Switch MAC table (.pka)", path: "labs/packet-tracer/switch-mac-table.pka" },
      { label: "TCP/IP layer inspection (.pka)", path: "labs/packet-tracer/tcpip-layers.pka" },
      { label: "WPA2 wireless setup (.pka)", path: "labs/packet-tracer/wpa2-setup.pka" }
    ],
    credit: null
  },
  {
    number: "008",
    title: "Denial-of-Service in Docker",
    subtitle: "Containerized DoS Simulation & Analysis",
    course: "COMP 424 — Computer Security",
    date: "August 2026",
    description: "Docker Compose stack (Nginx web server, client, and monitor). Ran Apache Bench load tests at light / medium / heavy concurrency (500 → 5,000 requests), captured the TCP three-way handshake in Wireshark, and monitored container CPU + network I/O under stress via docker stats.",
    tags: ["Docker", "Docker Compose", "Nginx", "DoS", "Apache Bench", "Wireshark", "Security"],
    coverType: "docker",
    pdf: "labs/docker-dos-lab.pdf",
    credit: null
  },
  {
    number: "009",
    title: "VitalLiving",
    subtitle: "Cloud Health Platform on AWS",
    course: "CIT 360",
    date: "June 2026",
    description: "Cloud platform for a fictional health and fitness service. DynamoDB with point-in-time recovery for user and workout records, S3 with lifecycle rules moving cold data to Glacier for long-term archival, and IAM users for two subsidiary organizations with controlled access. All data encrypted at rest.",
    tags: ["AWS", "DynamoDB", "S3 Glacier", "IAM", "Lifecycle", "Healthcare"],
    coverType: "aws-storage",
    pdf: "labs/vitalliving.pdf",
    credit: null
  },
  {
    number: "010",
    title: "EVIL Bank",
    subtitle: "HA & Disaster Recovery on AWS",
    course: "CIT 360",
    date: "June 2026",
    description: "Highly available banking environment on AWS. Custom VPC across multiple availability zones with paired public and private subnets, an Application Load Balancer distributing traffic to Apache EC2 instances behind a hardened security group, NAT Gateway for outbound traffic from private subnets, and Internet Gateway for the public interface.",
    tags: ["AWS", "VPC", "ALB", "Multi-AZ", "HA", "DR"],
    coverType: "aws-ha",
    pdf: "labs/evil-bank.pdf",
    credit: null
  }
];
