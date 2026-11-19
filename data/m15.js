OMNI.register({
  n: 15,
  certmap: [
    {"c": "CCNPS", "o": "SCOR 350-701 v2.0: 1 Security Concepts, 2 Network Security, 3 Cloud Security, 4 Secure Service Edge, 5 Endpoint Protection and Detection, 6 Network Access, Visibility and Enforcement"},
    {"c": "CCNA", "o": "200-301: 5 Security Fundamentals and 6 Automation, extended"},
    {"c": "GEN", "o": "Background for CCNP Enterprise (ENCOR 350-401) and the CCIE lab exams."}
  ],
  glossary: [
    ["CCNP", "Cisco's professional-level certification.", "Cisco Certified Network Professional: a core exam plus one concentration exam in a technology track.", "Cisco Certified Network Professional"],
    ["CCIE", "Cisco's expert-level certification.", "Cisco Certified Internetwork Expert: a qualifying core exam plus an 8-hour hands-on lab exam.", "Cisco Certified Internetwork Expert"],
    ["IKEv2", "The modern way IPsec peers agree keys.", "Internet Key Exchange version 2: negotiates and authenticates IPsec security associations.", "Internet Key Exchange version 2"],
    ["DMVPN", "VPN where branches build tunnels to each other on demand.", "Dynamic Multipoint VPN: a hub-and-spoke IPsec design with dynamic spoke-to-spoke tunnels.", "Dynamic Multipoint VPN"],
    ["Perfect forward secrecy", "One stolen key doesn't unlock old sessions.", "Use of fresh ephemeral key exchanges so compromise of a long-term key doesn't expose past session keys.", "PFS"],
    ["NGFW", "A firewall that understands apps and users.", "Next-generation firewall: stateful inspection plus application and user identity, IPS and malware protection.", "next-generation firewall"],
    ["NetFlow", "A record of who talked to whom.", "A Cisco-developed protocol that exports metadata about traffic flows for analysis.", ""],
    ["802.1X", "Log in before the port opens.", "IEEE standard for port-based network access control using a supplicant, authenticator and authentication server.", ""],
    ["MAB", "Lets devices without 802.1X join by MAC address.", "MAC Authentication Bypass: uses a device's MAC address as its identity for network access control.", "MAC Authentication Bypass"],
    ["Posture assessment", "Is this device healthy enough to join?", "A check of patch level, endpoint protection and settings before granting full network access.", ""],
    ["Change of Authorization", "Change a connected device's access instantly.", "RADIUS extension that lets a policy server re-authenticate, re-authorize or disconnect an active session.", "CoA"],
    ["Security group tag", "A role label used for firewall rules.", "A TrustSec tag assigned to traffic based on identity and used for role-based enforcement.", "SGT"],
    ["DMARC", "Tells mail servers what to do with spoofed mail.", "Domain-based Message Authentication, Reporting and Conformance: a DNS-published policy building on SPF and DKIM.", "Domain-based Message Authentication, Reporting and Conformance"],
    ["SSE", "Security delivered from the cloud.", "Security service edge: cloud-delivered secure web gateway, CASB, ZTNA and firewall as a service.", "security service edge"]
  ],
  quiz: [
    {"t": "mc", "q": "What does a candidate need for CCNP Security?", "o": ["Three core exams", "An 8-hour lab exam only", "The SCOR core exam plus one security concentration exam", "Only the CCNA"], "a": 2, "x": "Core plus concentration is the CCNP pattern across tracks.", "c": "CCNPS", "d": "1"},
    {"t": "mc", "q": "Which IPsec protocol provides encryption?", "o": ["GRE", "IKE phase 1 only", "ESP", "AH"], "a": 2, "x": "AH authenticates but doesn't encrypt.", "c": "CCNPS", "d": "1"},
    {"t": "mc", "q": "Which VPN design lets branch sites build tunnels to each other on demand?", "o": ["Static point-to-point GRE", "PPTP", "SSL portal only", "DMVPN"], "a": 3, "x": "Dynamic Multipoint VPN uses a hub for discovery.", "c": "CCNPS", "d": "1"},
    {"t": "mc", "q": "What is the main difference between an IDS and an IPS?", "o": ["An IDS encrypts traffic", "There is no difference", "An IPS sits inline and can block; an IDS alerts", "An IPS only reads logs"], "a": 2, "x": "Placement determines whether it can block.", "c": "CCNPS", "d": "2"},
    {"t": "mc", "q": "Which technology records flow metadata (who, when, how much) without capturing content?", "o": ["NetFlow", "MAB", "SPAN with full packet capture", "DKIM"], "a": 0, "x": "Flow data feeds behavioural analytics.", "c": "CCNPS", "d": "2"},
    {"t": "mc", "q": "In 802.1X, which device relays credentials to the RADIUS server?", "o": ["The authenticator (switch or access point)", "The DNS server", "The supplicant", "The DHCP server"], "a": 0, "x": "The supplicant is the client; the server decides.", "c": "CCNPS", "d": "6"},
    {"t": "mc", "q": "A printer can't run an 802.1X client. What is the usual option?", "o": ["Disable authentication on the whole switch", "Use DMARC", "MAC Authentication Bypass with limited access", "Put it in the management VLAN"], "a": 2, "x": "MAB plus profiling; restrict it because MACs can be spoofed.", "c": "CCNPS", "d": "6"},
    {"t": "mc", "q": "Which feature lets ISE quarantine an already-connected device?", "o": ["SPF", "Change of Authorization (CoA)", "PortFast", "NetFlow"], "a": 1, "x": "CoA updates a live session.", "c": "CCNPS", "d": "6"},
    {"t": "mc", "q": "Which DNS record tells receivers what to do when SPF and DKIM checks fail?", "o": ["DMARC", "MX", "AAAA", "PTR"], "a": 0, "x": "DMARC also requests aggregate reports.", "c": "CCNPS", "d": "4"},
    {"t": "mc", "q": "Which control records endpoint behaviour so analysts can investigate and isolate a host?", "o": ["EDR", "SNMP", "An email gateway", "A packet filter"], "a": 0, "x": "Endpoint detection and response.", "c": "CCNPS", "d": "5"},
    {"t": "mc", "q": "Which HTTP status code means the client is authenticated but not allowed?", "o": ["200", "403", "401", "201"], "a": 1, "x": "401 means authentication is missing or failed.", "c": "CCNPS", "d": "1"},
    {"t": "ms", "q": "Which TWO are part of earning a CCIE? (Choose two.)", "o": ["Passing the track's core (qualifying) exam", "Passing an 8-hour hands-on lab exam", "Passing the CCNA twice", "Holding a CISSP"], "a": [0, 1], "x": "The core exam qualifies you for the lab.", "c": "GEN", "d": "0"}
  ],
  flashcards: [
    ["CCNP structure", "One core exam plus one concentration exam."],
    ["CCIE structure", "Core exam (qualifier) plus an 8-hour lab: design, then deploy/operate/optimize."],
    ["SCOR 350-701", "CCNP Security core exam, 120 minutes, six domains."],
    ["ESP vs AH", "ESP encrypts and authenticates; AH authenticates only and breaks with NAT."],
    ["IKE phases", "Phase 1: secure management channel. Phase 2: IPsec SAs for data."],
    ["DMVPN", "Hub-and-spoke with on-demand spoke-to-spoke tunnels."],
    ["IDS vs IPS", "IDS alerts out of band; IPS blocks inline."],
    ["802.1X roles", "Supplicant, authenticator, authentication server (RADIUS)."],
    ["MAB", "MAC address used as identity for devices without 802.1X."],
    ["CoA", "RADIUS Change of Authorization: quarantine or re-authorize a live session."],
    ["TrustSec SGT", "Role tag used to enforce policy independent of IP address."],
    ["SPF / DKIM / DMARC", "Who may send / message signature / policy and reports."]
  ]
});
