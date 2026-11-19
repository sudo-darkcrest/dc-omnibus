/* Datacenter Omnibus: site catalog. Every page loads this first. */
window.OMNI = window.OMNI || {};
OMNI.parts = [
  { n: 1, name: "Foundations" },
  { n: 2, name: "Hardware, OS and Home" },
  { n: 3, name: "Networking and Fiber" },
  { n: 4, name: "Security, Cloud and Data Center" },
  { n: 5, name: "Service, Governance and Audit" },
  { n: 6, name: "Standards and Study Tools" }
];
/* cat: hw (blue), net (green), sec (red), gov (purple), dc (orange), gen (gray) */
OMNI.catalog = [
  { n: 1,  part: 1, cat: "gen", title: "The Big Picture", sub: "What technology is and how it all fits together", certs: ["GEN"] },
  { n: 2,  part: 1, cat: "gen", title: "The Language of Tech", sub: "Core terms, numbers and units", certs: ["A1", "N", "S"] },
  { n: 3,  part: 1, cat: "gen", title: "How We Got Here", sub: "A history of computing, networking and the internet", certs: ["GEN"] },
  { n: 4,  part: 1, cat: "hw",  title: "Inside the Machine", sub: "How a computer actually works", certs: ["A1"] },
  { n: 5,  part: 2, cat: "hw",  title: "PC Hardware", sub: "Every part and how it connects", certs: ["A1"] },
  { n: 6,  part: 2, cat: "hw",  title: "Operating Systems", sub: "Windows, macOS, Linux, mobile", certs: ["A2"] },
  { n: 7,  part: 2, cat: "hw",  title: "Home Computing", sub: "Home networks, smart home and consumer tech", certs: ["A1", "A2"] },
  { n: 8,  part: 2, cat: "hw",  title: "Support Like a Pro", sub: "Troubleshooting, virtualization and operational procedures", certs: ["A1", "A2"] },
  { n: 9,  part: 3, cat: "net", title: "How Networks Talk", sub: "The OSI and TCP/IP models", certs: ["N", "A1"] },
  { n: 10, part: 3, cat: "net", title: "IP Addressing and Subnetting", sub: "IPv4, IPv6, DHCP and DNS made visual", certs: ["N", "A1"] },
  { n: 11, part: 3, cat: "net", title: "Light and Copper", sub: "Cabling, fiber optics, wavelengths and WDM", certs: ["N", "DCCA", "A1"] },
  { n: 12, part: 3, cat: "net", title: "Switches, Routers and Services", sub: "Switching, routing and the services that run networks", certs: ["N"] },
  { n: 13, part: 3, cat: "net", title: "Wireless, Cellular and Operations", sub: "Radio, Wi-Fi and keeping networks healthy", certs: ["N", "A1", "S"] },
  { n: 14, part: 4, cat: "sec", title: "Security Foundations and Cryptography", sub: "Principles, identity and crypto", certs: ["S"] },
  { n: 15, part: 4, cat: "sec", title: "Know the Enemy", sub: "Threats, attacks and vulnerabilities", certs: ["S"] },
  { n: 16, part: 4, cat: "sec", title: "Defending the Organization", sub: "Architecture, operations and incident response", certs: ["S"] },
  { n: 17, part: 4, cat: "hw",  title: "Cloud, Containers and Storage", sub: "Virtualization, cloud models and storage", certs: ["N", "S", "A1", "DCCA"] },
  { n: 18, part: 4, cat: "dc",  title: "The Data Center", sub: "Power, cooling, space, cabling and safety", certs: ["DCCA", "N", "S"] },
  { n: 19, part: 5, cat: "gov", title: "Running IT as a Service", sub: "ITIL 4 Foundation", certs: ["ITIL"] },
  { n: 20, part: 5, cat: "gov", title: "Frameworks That Run the Enterprise", sub: "Governance, risk and compliance", certs: ["S", "CISM", "CISA"] },
  { n: 21, part: 5, cat: "gov", title: "Leading Security", sub: "Information security management (CISM)", certs: ["CISM"] },
  { n: 22, part: 5, cat: "gov", title: "Checking the System", sub: "Information systems auditing (CISA)", certs: ["CISA"] },
  { n: 23, part: 6, cat: "gen", title: "Who Sets the Rules", sub: "Technology standards and standards bodies", certs: ["GEN", "N", "DCCA"] },
  { n: 24, part: 6, cat: "gen", title: "Study Hub", sub: "Plans, crosswalk and practice exams", certs: ["A1", "A2", "N", "S", "ITIL", "DCCA", "CISM", "CISA"] }
];
/* Certs, exam codes and domains used for tagging and domain scoring.
   Exam codes and weights as published at time of writing (Nov 2026). Always verify on the vendor site. */
OMNI.certs = {
  A1:   { name: "A+ Core 1", code: "220-1201", vendor: "CompTIA", url: "https://www.comptia.org/en-us/certifications/a/",
          domains: { "1": "Mobile Devices", "2": "Networking", "3": "Hardware", "4": "Virtualization and Cloud Computing", "5": "Hardware and Network Troubleshooting" } },
  A2:   { name: "A+ Core 2", code: "220-1202", vendor: "CompTIA", url: "https://www.comptia.org/en-us/certifications/a/",
          domains: { "1": "Operating Systems", "2": "Security", "3": "Software Troubleshooting", "4": "Operational Procedures" } },
  N:    { name: "Network+", code: "N10-009", vendor: "CompTIA", url: "https://www.comptia.org/en-us/certifications/network/",
          domains: { "1": "Networking Concepts", "2": "Network Implementation", "3": "Network Operations", "4": "Network Security", "5": "Network Troubleshooting" } },
  S:    { name: "Security+", code: "SY0-701", vendor: "CompTIA", url: "https://www.comptia.org/en-us/certifications/security/",
          domains: { "1": "General Security Concepts", "2": "Threats, Vulnerabilities and Mitigations", "3": "Security Architecture", "4": "Security Operations", "5": "Security Program Management and Oversight" } },
  ITIL: { name: "ITIL 4 Foundation", code: "ITIL 4 FND", vendor: "PeopleCert", url: "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1",
          domains: { "1": "Key concepts of service management", "2": "Guiding principles", "3": "Four dimensions", "4": "Service value system", "5": "Service value chain", "6": "ITIL practices (purpose)", "7": "ITIL practices (in detail)" } },
  DCCA: { name: "DCCA", code: "EPI DCCA", vendor: "EPI", url: "https://www.epi-ap.com/",
          domains: { "1": "Data center standards and site", "2": "Power", "3": "Cooling", "4": "Cabling and racks", "5": "Fire safety", "6": "Physical security", "7": "Operations and safety" } },
  CISM: { name: "CISM", code: "CISM 2022 JP", vendor: "ISACA", url: "https://www.isaca.org/credentialing/cism",
          domains: { "1": "Information Security Governance", "2": "Information Security Risk Management", "3": "Information Security Program", "4": "Incident Management" } },
  CISA: { name: "CISA", code: "CISA 2024 JP", vendor: "ISACA", url: "https://www.isaca.org/credentialing/cisa",
          domains: { "1": "Information System Auditing Process", "2": "Governance and Management of IT", "3": "IS Acquisition, Development and Implementation", "4": "IS Operations and Business Resilience", "5": "Protection of Information Assets" } },
  GEN:  { name: "General", code: "All certs", vendor: "", url: "", domains: { "0": "General knowledge" } }
};
OMNI.certOrder = ["A1", "A2", "N", "S", "ITIL", "DCCA", "CISM", "CISA", "GEN"];
OMNI.pad = function (n) { return (n < 10 ? "0" : "") + n; };
OMNI.file = function (n) { return "module-" + OMNI.pad(n) + ".html"; };
