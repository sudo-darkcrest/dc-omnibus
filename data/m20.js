OMNI.register({
  n: 20,
  certmap: [
    {"c": "CISSP", "o": "All eight domains: 1 Security and Risk Management to 8 Software Development Security"},
    {"c": "CCSP", "o": "All six domains: Cloud Concepts to Legal, Risk and Compliance"},
    {"c": "S", "o": "SY0-701: 5 Security Program Management and Oversight, extended"}
  ],
  glossary: [
    ["CISSP", "ISC2's senior security certification.", "Certified Information Systems Security Professional: eight-domain certification requiring five years of experience.", "Certified Information Systems Security Professional"],
    ["CCSP", "ISC2's cloud security certification.", "Certified Cloud Security Professional: six-domain cloud security certification.", "Certified Cloud Security Professional"],
    ["Associate of ISC2", "Passed the exam, still earning the experience.", "Status for candidates who pass an ISC2 exam without yet meeting the experience requirement.", ""],
    ["Annualized loss expectancy", "Expected yearly cost of a risk.", "SLE multiplied by the annual rate of occurrence.", "ALE"],
    ["Single loss expectancy", "Cost of one incident.", "Asset value multiplied by exposure factor.", "SLE"],
    ["Due care", "Doing the right thing.", "Taking reasonable steps to protect assets, as a prudent person would.", ""],
    ["Due diligence", "Checking the right thing is done.", "Investigating and verifying that controls and partners meet expectations.", ""],
    ["Bell-LaPadula model", "No read up, no write down.", "A confidentiality model using security labels and clearances.", ""],
    ["Biba model", "No read down, no write up.", "An integrity model that prevents corruption by lower-integrity data.", ""],
    ["Crossover error rate", "Where false accepts equal false rejects.", "The biometric accuracy point where FAR equals FRR; lower is better.", "CER"],
    ["SOC 2 Type II", "An audit of controls over time.", "An attestation report testing the operating effectiveness of controls over a period.", ""],
    ["Chain of custody", "A record of who handled evidence.", "Documentation of evidence collection, transfer and storage to prove integrity.", ""],
    ["Hot site", "A ready-to-run backup location.", "A recovery site with equipment and current data, ready within hours.", ""],
    ["Crypto-shredding", "Destroy the keys to destroy the data.", "Making encrypted data unrecoverable by securely deleting its encryption keys.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "How much paid experience does CISSP require?", "o": ["10 years in management", "5 years in at least 2 of the 8 domains", "None", "1 year in any IT role"], "a": 1, "x": "A degree or approved certification can waive one year.", "c": "CISSP", "d": "1"},
    {"t": "mc", "q": "An asset is worth $200,000 and a fire would destroy 25% of it. Fires happen once every 10 years. What is the ALE?", "o": ["$50,000", "$5,000", "$500", "$20,000"], "a": 1, "x": "SLE = 200,000 × 0.25 = 50,000; ALE = 50,000 × 0.1 = 5,000.", "c": "CISSP", "d": "1"},
    {"t": "mc", "q": "Which model enforces 'no read up, no write down'?", "o": ["Brewer-Nash", "Clark-Wilson", "Biba", "Bell-LaPadula"], "a": 3, "x": "It protects confidentiality.", "c": "CISSP", "d": "3"},
    {"t": "mc", "q": "Who is responsible for deciding a data set's classification?", "o": ["The data custodian", "The end user", "The auditor", "The data owner"], "a": 3, "x": "Custodians implement protection.", "c": "CISSP", "d": "2"},
    {"t": "mc", "q": "Which access control model lets the data owner decide who gets access?", "o": ["Discretionary access control", "Attribute-based access control", "Mandatory access control", "Rule-based access control"], "a": 0, "x": "MAC uses system-enforced labels.", "c": "CISSP", "d": "5"},
    {"t": "mc", "q": "Which report tests whether a provider's controls operated effectively over months?", "o": ["SOC 2 Type I", "SOC 1 Type I", "SOC 2 Type II", "A marketing brochure"], "a": 2, "x": "Type I covers design at a point in time.", "c": "CISSP", "d": "6"},
    {"t": "mc", "q": "When collecting digital evidence, what should be captured first?", "o": ["The most volatile data, such as memory", "Archived backups", "The hard drive", "Printed reports"], "a": 0, "x": "Order of volatility.", "c": "CISSP", "d": "7"},
    {"t": "mc", "q": "Which recovery site has power and space but no equipment?", "o": ["Mirrored site", "Cold site", "Hot site", "Warm site"], "a": 1, "x": "Cheapest and slowest.", "c": "CISSP", "d": "7"},
    {"t": "mc", "q": "When two ISC2 canons conflict, which takes priority?", "o": ["Advance the profession", "Protect society, the common good and the infrastructure", "Provide service to principals", "Act in your employer's financial interest"], "a": 1, "x": "Canons are in priority order.", "c": "CISSP", "d": "1"},
    {"t": "mc", "q": "What is crypto-shredding?", "o": ["Hashing passwords", "Destroying encryption keys so cloud data is unreadable", "Compressing data", "Physically shredding cloud disks"], "a": 1, "x": "Used because customers can't destroy provider hardware.", "c": "CCSP", "d": "2"},
    {"t": "order", "q": "Put the cloud data lifecycle in order.", "o": ["Create", "Store", "Use", "Share", "Archive", "Destroy"], "a": [0, 1, 2, 3, 4, 5], "x": "Used by the CCSP and the Cloud Security Alliance.", "c": "CCSP", "d": "2"},
    {"t": "ms", "q": "Which TWO are valid risk responses? (Choose two.)", "o": ["Mitigate", "Ignore", "Hide", "Transfer"], "a": [0, 3], "x": "The four responses are avoid, mitigate, transfer and accept.", "c": "CISSP", "d": "1"}
  ],
  flashcards: [
    ["CISSP experience", "5 years paid, 2 of 8 domains; 1-year waiver possible."],
    ["Associate of ISC2", "Passed without experience; 6 years to earn it."],
    ["SLE and ALE", "SLE = AV × EF. ALE = SLE × ARO."],
    ["Risk responses", "Avoid, mitigate, transfer, accept."],
    ["Bell-LaPadula vs Biba", "Confidentiality: no read up/no write down. Integrity: no read down/no write up."],
    ["Data owner vs custodian", "Owner decides classification; custodian implements protection."],
    ["DAC / MAC / RBAC / ABAC", "Owner decides / labels decide / roles decide / attributes decide."],
    ["CER", "Biometric point where FAR = FRR; lower is better."],
    ["SOC 2 Type I vs II", "Design at a point in time vs effectiveness over a period."],
    ["Recovery sites", "Hot (hours), warm (days), cold (weeks)."],
    ["Cloud data lifecycle", "Create, store, use, share, archive, destroy."],
    ["Crypto-shredding", "Destroy keys to make encrypted data unrecoverable."]
  ]
});
