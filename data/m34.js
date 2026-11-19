OMNI.register({
  n: 34,
  certmap: [
    {"c": "CRISC", "o": "1 Governance, 2 Risk Assessment, 3 Risk Response and Reporting, 4 Technology and Security"},
    {"c": "CGEIT", "o": "1 Governance of Enterprise IT, 2 IT Resources, 3 Benefits Realization, 4 Risk Optimization"},
    {"c": "CISM", "o": "Domain 2 Information Security Risk Management, extended"}
  ],
  glossary: [
    ["CRISC", "ISACA's IT risk certification.", "Certified in Risk and Information Systems Control.", "Certified in Risk and Information Systems Control"],
    ["CGEIT", "ISACA's IT governance certification.", "Certified in the Governance of Enterprise IT.", "Certified in the Governance of Enterprise IT"],
    ["Risk appetite", "How much risk the organisation will take.", "The broad amount of risk an organisation is willing to accept in pursuit of its objectives.", ""],
    ["Risk tolerance", "Acceptable wiggle room for one objective.", "The acceptable level of variation relative to achieving a specific objective.", ""],
    ["Risk capacity", "The most risk it can survive.", "The maximum risk an organisation can bear without threatening its existence.", ""],
    ["Inherent risk", "Risk before controls.", "The level of risk before any action is taken to alter its likelihood or impact.", ""],
    ["Residual risk", "Risk left after controls.", "The risk remaining after risk responses have been applied.", ""],
    ["Risk scenario", "A story of how a risk could happen.", "A description of a possible event involving a threat, asset, time and business impact.", ""],
    ["Key risk indicator", "An early warning sign.", "A metric that signals increasing risk exposure, with thresholds for action.", "KRI"],
    ["Key control indicator", "Is the control working?", "A metric showing how well a control is operating.", "KCI"],
    ["Three lines model", "Do it, watch it, check it.", "A model dividing risk roles among operational management, oversight functions and internal audit.", ""],
    ["FAIR", "A way to put money on cyber risk.", "Factor Analysis of Information Risk: a quantitative model for estimating loss exposure.", "Factor Analysis of Information Risk"],
    ["Benefits realization", "Making sure promised value arrives.", "Managing and measuring investments so expected business benefits are delivered.", ""],
    ["Balanced scorecard", "Four views of performance.", "A strategic measurement framework using financial, customer, internal process, and learning and growth perspectives.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "Who should formally accept residual risk?", "o": ["The vendor", "The risk practitioner", "The risk owner in the business", "The internal auditor"], "a": 2, "x": "Practitioners advise.", "c": "CRISC", "d": "1"},
    {"t": "mc", "q": "What is risk left after controls called?", "o": ["Residual risk", "Risk capacity", "Risk appetite", "Inherent risk"], "a": 0, "x": "Inherent is before controls.", "c": "CRISC", "d": "2"},
    {"t": "mc", "q": "Which is the BEST key risk indicator?", "o": ["Number of employees", "Number of critical vulnerabilities older than 30 days", "Number of meetings held", "Last year's revenue"], "a": 1, "x": "Leading and actionable.", "c": "CRISC", "d": "3"},
    {"t": "mc", "q": "Which describes the maximum risk an organisation can bear before failing?", "o": ["Risk capacity", "Risk appetite", "Residual risk", "Risk tolerance"], "a": 0, "x": "Appetite should sit well below capacity.", "c": "CRISC", "d": "1"},
    {"t": "mc", "q": "Which analysis method uses high/medium/low ratings on a heat map?", "o": ["Monte Carlo only", "FAIR only", "Quantitative", "Qualitative"], "a": 3, "x": "Quick but subjective.", "c": "CRISC", "d": "2"},
    {"t": "mc", "q": "Outsourcing a process with strong contract clauses and insurance is an example of what?", "o": ["Risk acceptance", "Risk avoidance", "Ignoring risk", "Risk transfer (sharing)"], "a": 3, "x": "Accountability can't be fully transferred, though.", "c": "CRISC", "d": "3"},
    {"t": "mc", "q": "Which line provides independent assurance to the board?", "o": ["First line: operations", "Third line: internal audit", "External vendors", "Second line: risk management"], "a": 1, "x": "Independence is key.", "c": "CRISC", "d": "1"},
    {"t": "mc", "q": "In COBIT, what does EDM stand for?", "o": ["Evaluate, Direct, Monitor", "Execute, Deliver, Measure", "Enable, Defend, Mitigate", "Engineer, Deploy, Maintain"], "a": 0, "x": "Governance objectives.", "c": "CGEIT", "d": "1"},
    {"t": "mc", "q": "Who is primarily responsible for governance of enterprise IT?", "o": ["The help desk", "Individual developers", "Vendors", "The board and executive management"], "a": 3, "x": "Management executes within that direction.", "c": "CGEIT", "d": "1"},
    {"t": "mc", "q": "A project's business case no longer shows positive value. What is the BEST action?", "o": ["Continue as planned", "Add more scope", "Re-evaluate and consider stopping or changing the project", "Remove the business case"], "a": 2, "x": "Portfolio governance.", "c": "CGEIT", "d": "3"},
    {"t": "mc", "q": "Which tool measures performance across financial, customer, internal process and learning perspectives?", "o": ["Risk register", "Network diagram", "Balanced scorecard", "Gantt chart"], "a": 2, "x": "Links IT to business goals.", "c": "CGEIT", "d": "3"},
    {"t": "ms", "q": "Which TWO are good characteristics of a KRI? (Choose two.)", "o": ["It only measures past losses", "It is leading (predicts trouble)", "It has a threshold that triggers action", "It is impossible to measure"], "a": [1, 2], "x": "KRIs should be measurable, timely and actionable.", "c": "CRISC", "d": "3"}
  ],
  flashcards: [
    ["CRISC domains", "Governance, risk assessment, response and reporting, IT and security."],
    ["CGEIT domains", "Governance of EIT, IT resources, benefits realization, risk optimization."],
    ["Appetite vs tolerance vs capacity", "Overall willingness / acceptable variation / maximum survivable."],
    ["Inherent vs residual", "Before controls vs after controls."],
    ["KRI / KPI / KCI", "Risk rising / process performing / control working."],
    ["Risk scenario", "Threat + event + asset + time + impact."],
    ["Risk responses", "Accept, transfer, mitigate, avoid."],
    ["Risk owner", "Business person accountable for a risk; accepts it."],
    ["Three lines", "Operations, oversight functions, internal audit."],
    ["COBIT EDM", "Evaluate, Direct, Monitor (governance)."],
    ["Business case", "Living document revisited through and after delivery."],
    ["Balanced scorecard", "Financial, customer, internal process, learning and growth."]
  ]
});
