OMNI.register({
  n: 19,
  certmap: [
    {"c": "PT", "o": "PT0-003: 1 Engagement Management (scoping, rules of engagement, reporting), 2 Reconnaissance and Enumeration, 3 Vulnerability Discovery and Analysis, 4 Attacks and Exploits (concepts), 5 Post-exploitation and Lateral Movement (concepts)"},
    {"c": "S", "o": "SY0-701: 1.2 and 5.5 penetration testing types and concepts, 2.1 threat actors and motivations, 5.1 legal and ethical considerations"},
    {"c": "CYSA", "o": "CS0-003: 1.4 threat actors, attack frameworks (ATT&CK, Kill Chain) and threat intelligence"},
    {"c": "GEN", "o": "Also the conceptual foundation for EC-Council CEH, OffSec OSCP and GIAC GPEN."}
  ],
  glossary: [
    ["Ethical hacker", "Someone paid to find weaknesses before criminals do.", "A security professional who tests systems with the owner's written authorisation and reports findings so they can be fixed.", ""],
    ["White hat", "A good-guy hacker with permission.", "An ethical hacker working with authorisation within an agreed scope.", ""],
    ["Black hat", "A criminal hacker.", "An attacker who accesses systems without authorisation for profit, disruption or other malicious goals.", ""],
    ["Grey hat", "Hacks without permission but claims good intentions.", "A person who probes systems without authorisation, often disclosing flaws afterwards; usually still illegal.", ""],
    ["Red team", "The pretend attackers.", "An authorised team that emulates real adversaries to test an organisation's detection and response.", ""],
    ["Blue team", "The defenders.", "The staff who defend systems: monitoring, incident response and hardening.", ""],
    ["Purple team", "Attackers and defenders working together.", "Collaboration where red-team techniques are used to directly improve blue-team detections.", ""],
    ["Penetration test", "An authorised fake attack to find weaknesses.", "A scoped, authorised simulated attack that identifies, exploits and reports vulnerabilities with remediation advice.", "pen test"],
    ["Rules of engagement", "The written rules for a test.", "A document defining scope, timing, methods, communication and limits for a security test.", "RoE"],
    ["Scope", "What you're allowed to test.", "The systems, locations, methods and dates that a test is authorised to cover.", ""],
    ["Bug bounty", "Rewards for reporting flaws.", "A program that invites researchers to find and report vulnerabilities under published rules in exchange for rewards.", ""],
    ["Coordinated vulnerability disclosure", "Tell the owner privately first.", "Reporting a vulnerability to the vendor and allowing time for a fix before public disclosure (see ISO/IEC 29147).", "CVD"],
    ["Black box test", "Testing with no inside information.", "A test where testers start with little or no knowledge of the target (unknown environment).", ""],
    ["White box test", "Testing with full inside information.", "A test where testers receive full details such as diagrams, code and credentials (known environment).", ""],
    ["Script kiddie", "An unskilled attacker using others' tools.", "A low-skill attacker who relies on tools and exploits written by others.", ""],
    ["Hacktivist", "A hacker with a political cause.", "An attacker motivated by political, social or ideological goals.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "What makes a hacking activity 'white hat'?", "o": ["Using only free tools", "Reporting the flaw after finding it", "Prior written authorisation within an agreed scope", "Not causing any damage"], "a": 2, "w": ["Tools are irrelevant.", "Reporting afterwards doesn't create permission.", "Correct.", "Lack of damage doesn't make unauthorised access legal."], "x": "Authorisation from someone with the right to give it is the line between ethical hacking and crime.", "c": "PT", "d": "1.1"},
    {"t": "mc", "q": "Which team works with defenders so each tested attack technique becomes a better detection?", "o": ["Blue team", "White team", "Red team", "Purple team"], "a": 3, "w": ["Blue defends.", "White teams referee exercises.", "Red emulates attackers.", "Correct."], "x": "Purple teaming combines red and blue for faster improvement.", "c": "S", "d": "5.5"},
    {"t": "mc", "q": "A tester receives network diagrams, source code and admin credentials before starting. What type of test is this?", "o": ["White box (known environment)", "Black box (unknown environment)", "Vulnerability scan", "Grey box"], "a": 0, "w": ["Correct.", "Black box starts with nothing.", "A scan is automated, not a test type by knowledge.", "Grey box gets partial information."], "x": "Known-environment tests find the most in the time available.", "c": "S", "d": "5.5"},
    {"t": "order", "q": "Put the phases of a professional penetration test in order.", "o": ["Planning and scoping", "Reconnaissance and enumeration", "Vulnerability discovery and analysis", "Exploitation", "Reporting"], "x": "Planning and paperwork come first; the report is the deliverable.", "c": "PT", "d": "1.1"},
    {"t": "mc", "q": "During an authorised test you discover a system that is not listed in the scope. What should you do?", "o": ["Ignore the rules of engagement", "Stop and notify the client contact", "Test it but leave it out of the report", "Test it quickly and include it"], "a": 1, "w": ["Never.", "Correct.", "Hiding work is unethical.", "Out-of-scope testing may be illegal."], "x": "Only the client can change scope, in writing.", "c": "PT", "d": "1.2"},
    {"t": "mc", "q": "Which document defines what testers may do, when, and who to contact in an emergency?", "o": ["Acceptable use policy", "Privacy notice", "Service level agreement", "Rules of engagement"], "a": 3, "w": ["AUP covers staff use of systems.", "Not related.", "SLA covers service targets.", "Correct."], "x": "Rules of engagement plus a contract and statement of work form the legal basis of a test.", "c": "PT", "d": "1.1"},
    {"t": "mc", "q": "What is the main difference between a vulnerability scan and a penetration test?", "o": ["A scan is always illegal", "There is no difference", "A pen test uses human judgement to prove real impact", "A pen test never finds new issues"], "a": 2, "w": ["Authorised scans are legal.", "They differ significantly.", "Correct.", "Pen tests often find chained issues scans miss."], "x": "Scans are automated and broad; pen tests are targeted and prove exploitability.", "c": "S", "d": "4.3"},
    {"t": "mc", "q": "Which US law makes it a crime to access a computer without authorisation?", "o": ["GDPR", "SOX", "HIPAA", "Computer Fraud and Abuse Act (CFAA)"], "a": 3, "w": ["EU data protection.", "Financial reporting.", "Health data privacy.", "Correct."], "x": "The UK equivalent is the Computer Misuse Act 1990.", "c": "PT", "d": "1.1"},
    {"t": "mc", "q": "A researcher finds a flaw in a vendor's product. What is the responsible next step?", "o": ["Report it privately to the vendor and allow time for a fix", "Publish exploit code immediately", "Sell it to the highest bidder", "Use it to prove the point on customers' systems"], "a": 0, "w": ["Correct: coordinated disclosure.", "Endangers users.", "Unethical and possibly illegal.", "Illegal."], "x": "Coordinated vulnerability disclosure is described in ISO/IEC 29147.", "c": "S", "d": "4.3"},
    {"t": "mc", "q": "Which is the MOST common way attackers first get into organisations, according to many national agency reports?", "o": ["Phishing, stolen passwords and unpatched internet-facing systems", "Breaking encryption", "Physical break-ins", "Zero-day exploits in every attack"], "a": 0, "w": ["Correct.", "Rarely needed.", "Uncommon compared with remote methods.", "Zero-days are relatively rare."], "x": "Basics like MFA and patching stop a large share of attacks.", "c": "CYSA", "d": "1.4"},
    {"t": "ms", "q": "Which statements are MYTHS? (Select all that apply.)", "o": ["Small businesses are too small to be attacked", "Good intentions make unauthorised hacking legal", "MFA blocks many password attacks", "A VPN makes you fully anonymous"], "a": [0, 1, 3], "w": ["Myth.", "Myth.", "This one is a fact.", "Myth."], "x": "Automation means everyone is a target, and authorisation, not intent, is what matters legally.", "c": "S", "d": "2.1"},
    {"t": "mc", "q": "What is the most important deliverable of a penetration test for the client?", "o": ["Screenshots of hacked screens", "A list of passwords found", "The tools the tester used", "A clear report with risk ratings and remediation steps"], "a": 3, "w": ["Evidence supports the report but isn't the deliverable.", "Passwords must be handled securely, not delivered as a trophy.", "Not the point.", "Correct."], "x": "The report turns findings into fixes; an executive summary explains business risk.", "c": "PT", "d": "1.3"}
  ],
  flashcards: [
    ["White vs black vs grey hat", "Authorised and ethical / criminal / unauthorised but claims good intent (usually still illegal)."],
    ["Red, blue, purple teams", "Emulated attackers / defenders / both working together."],
    ["What makes hacking ethical", "Prior written authorisation, staying in scope, reporting to the owner."],
    ["Rules of engagement", "Document defining scope, timing, methods, contacts and limits for a test."],
    ["Black, grey, white box", "No information / partial / full information."],
    ["Pen test phases", "Planning, recon, vulnerability analysis, exploitation, reporting (then retest)."],
    ["Scan vs pen test", "Automated known-issue check vs human-led proof of real impact."],
    ["CFAA", "US Computer Fraud and Abuse Act (1986): unauthorised access is a crime."],
    ["Computer Misuse Act", "UK law (1990) against unauthorised access and impairment."],
    ["Coordinated vulnerability disclosure", "Report privately, give time to fix, then publish."],
    ["security.txt", "A file on a website telling researchers how to report vulnerabilities."],
    ["Bug bounty", "Program inviting researchers to test under published rules for rewards."],
    ["Most common initial access", "Phishing, stolen passwords, unpatched internet-facing systems."],
    ["Out-of-scope finding during a test", "Stop and tell the client."],
    ["Entry offensive certs", "PenTest+, CEH; then OSCP or GPEN."]
  ]
});
