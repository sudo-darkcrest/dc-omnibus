OMNI.register({
  n: 33,
  certmap: [
    {"c": "CIPP", "o": "Privacy concepts, laws and regulators, applying the law (CIPP/E and CIPP/US)"},
    {"c": "CIPM", "o": "Privacy program governance and operations"},
    {"c": "CDPSE", "o": "1 Privacy Governance, 2 Privacy Architecture, 3 Data Lifecycle"}
  ],
  glossary: [
    ["Personal data", "Information about an identifiable person.", "Any information relating to an identified or identifiable natural person.", "PII"],
    ["Special category data", "Extra-sensitive personal data.", "Data such as health, biometrics, genetics, religion or sexual orientation that receives stricter protection.", ""],
    ["Privacy by design", "Build privacy in from the start.", "An approach embedding privacy into systems and processes by default, based on seven foundational principles.", ""],
    ["Lawful basis", "The legal reason for processing.", "One of six GDPR grounds that make processing personal data lawful.", ""],
    ["Data controller", "Decides why and how data is used.", "The organisation that determines the purposes and means of processing personal data.", ""],
    ["Data processor", "Processes data for someone else.", "An organisation that processes personal data on behalf of a controller.", ""],
    ["DPIA", "A risk check for high-risk processing.", "Data protection impact assessment: a documented assessment of privacy risks and mitigations.", "data protection impact assessment"],
    ["Data protection officer", "The organisation's privacy watchdog.", "An independent role required by GDPR in certain organisations to advise on and monitor compliance.", "DPO"],
    ["Standard contractual clauses", "Template contracts for data transfers.", "European Commission-approved clauses that provide safeguards for transferring personal data outside the EEA.", "SCCs"],
    ["Pseudonymisation", "Swap names for codes, keep the key separate.", "Processing so data can't be attributed to a person without separately held additional information.", ""],
    ["Anonymisation", "Make data impossible to link to anyone.", "Irreversibly removing the ability to identify individuals, taking data outside privacy law.", ""],
    ["Data inventory", "A list of all the personal data you hold.", "A record of personal data assets, their location, purpose, owners and flows.", ""],
    ["Data subject request", "A person asking about their data.", "A request by an individual to exercise privacy rights such as access or erasure.", "DSR"],
    ["Differential privacy", "Add noise to protect individuals in statistics.", "A mathematical technique that limits what can be learned about any individual from aggregate results.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "Which certification focuses on privacy law for a specific region?", "o": ["CIPM", "CISSP", "CIPP", "CDPSE"], "a": 2, "x": "CIPP/E, CIPP/US and others.", "c": "CIPP", "d": "2"},
    {"t": "mc", "q": "Under GDPR, how quickly must a reportable breach be notified to the supervisory authority?", "o": ["Within 30 days", "Only if the press finds out", "Within 72 hours of becoming aware", "Within 1 year"], "a": 2, "x": "Individuals too when risk is high.", "c": "CIPP", "d": "3"},
    {"t": "mc", "q": "Which is NOT one of the six GDPR lawful bases?", "o": ["Legal obligation", "Legitimate interests", "Commercial convenience", "Contract"], "a": 2, "x": "The six: consent, contract, legal obligation, vital interests, public task, legitimate interests.", "c": "CIPP", "d": "2"},
    {"t": "mc", "q": "Who decides the purposes and means of processing personal data?", "o": ["The controller", "The data subject", "The processor", "The regulator"], "a": 0, "x": "Processors act on instructions.", "c": "CIPP", "d": "1"},
    {"t": "mc", "q": "Which US law protects online data of children under 13?", "o": ["FERPA", "HIPAA", "GLBA", "COPPA"], "a": 3, "x": "Children's Online Privacy Protection Act.", "c": "CIPP", "d": "2"},
    {"t": "mc", "q": "Which mechanism allows transfers of personal data from the EU when no adequacy decision exists?", "o": ["Standard contractual clauses", "An NDA", "A privacy notice only", "Encryption alone"], "a": 0, "x": "Binding corporate rules are another option.", "c": "CIPP", "d": "3"},
    {"t": "mc", "q": "What is the foundation of a privacy program?", "o": ["A marketing campaign", "A new firewall", "A data inventory and data map", "A larger IT budget"], "a": 2, "x": "You can't protect what you don't know you have.", "c": "CIPM", "d": "1"},
    {"t": "mc", "q": "When is a DPIA required under GDPR?", "o": ["Only after a breach", "Never", "When processing is likely to result in high risk to individuals", "For every email"], "a": 2, "x": "For example large-scale monitoring or sensitive data.", "c": "CIPM", "d": "2"},
    {"t": "mc", "q": "Pseudonymised data is best described as what?", "o": ["Still personal data, because it can be re-identified with the key", "Encrypted data", "Not covered by any law", "Fully anonymous"], "a": 0, "x": "Keep the key separate and protected.", "c": "CDPSE", "d": "3"},
    {"t": "mc", "q": "Which principle means collecting only what the purpose needs?", "o": ["Data minimisation", "Portability", "Accuracy", "Accountability"], "a": 0, "x": "Less data means less risk.", "c": "CDPSE", "d": "1"},
    {"t": "mc", "q": "Which privacy-by-design principle says privacy should be on without the user doing anything?", "o": ["Positive-sum", "End-to-end security", "Privacy as the default setting", "Visibility and transparency"], "a": 2, "x": "Defaults matter because most people never change them.", "c": "CDPSE", "d": "2"},
    {"t": "ms", "q": "Which TWO are rights under the GDPR? (Choose two.)", "o": ["Right to data portability", "Right to free products", "Right to erasure", "Right to see other customers' data"], "a": [0, 2], "x": "Also access, rectification, restriction, objection and more.", "c": "CIPP", "d": "3"}
  ],
  flashcards: [
    ["CIPP / CIPM / CDPSE", "Law / program management / engineering."],
    ["Personal data", "Any info about an identified or identifiable person."],
    ["Privacy by design", "Seven principles: proactive, default, embedded, positive-sum, end-to-end, visible, user-centric."],
    ["GDPR principles", "Lawfulness, purpose limitation, minimisation, accuracy, storage limitation, security, accountability."],
    ["Six lawful bases", "Consent, contract, legal obligation, vital interests, public task, legitimate interests."],
    ["GDPR breach timing", "Regulator within 72 hours; individuals if high risk."],
    ["Controller vs processor", "Decides purposes vs acts on instructions."],
    ["Transfer tools", "Adequacy, SCCs, BCRs (and the EU-US Data Privacy Framework)."],
    ["US sector laws", "HIPAA, GLBA, COPPA, FERPA, FCRA; FTC Section 5; state laws."],
    ["DPIA", "Assessment for high-risk processing."],
    ["Pseudonymised vs anonymised", "Re-identifiable with a key vs irreversibly not."],
    ["Data inventory", "Where personal data is, why, who, and where it flows."]
  ]
});
