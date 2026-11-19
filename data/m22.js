OMNI.register({
  n: 22,
  certmap: [
    {"c": "AZ900", "o": "AZ-900: 1 Describe cloud concepts, 2 Describe Azure architecture and services, 3 Describe Azure management and governance"},
    {"c": "S", "o": "SY0-701: 3.1 cloud architecture and shared responsibility, 4.6 identity and access management (SSO, MFA, conditional access), 1.2 Zero Trust"},
    {"c": "GEN", "o": "Foundation for SC-900, AI-901, AZ-104, SC-200 and AZ-305."}
  ],
  glossary: [
    ["Region", "A geographic area where Azure has data centers.", "A set of data centers within a latency-defined perimeter connected by a dedicated low-latency network.", ""],
    ["Availability zone", "A separate building group inside a region.", "Physically separate locations within an Azure region, each with independent power, cooling and networking.", "AZ"],
    ["Region pair", "Two linked regions for disaster recovery.", "Two Azure regions in the same geography, updated one at a time and used for geo-redundant replication.", ""],
    ["Subscription", "Azure's billing and access boundary.", "A logical container linked to an account that groups resources for billing, quotas and access control.", ""],
    ["Resource group", "A folder for related Azure resources.", "A container that holds resources sharing a lifecycle; deleting it deletes everything inside.", ""],
    ["Management group", "A folder for subscriptions.", "A container above subscriptions used to apply policy and access at scale.", ""],
    ["Azure Resource Manager", "The front door for every Azure change.", "The deployment and management service that authenticates, authorises and applies every create, update and delete request.", "ARM"],
    ["Microsoft Entra ID", "Microsoft's cloud identity service.", "Cloud-based identity and access management for users, groups, devices and apps, formerly Azure Active Directory.", "Azure AD"],
    ["Conditional Access", "If-then rules for signing in.", "Entra ID policies that grant, require MFA for, or block sign-ins based on user, location, device, app and risk.", ""],
    ["Azure RBAC", "Who can do what, where.", "Role-based access control that assigns roles to users, groups or identities at a scope; permissions inherit down the hierarchy.", "role-based access control"],
    ["Azure Policy", "Rules resources must obey.", "A service that evaluates resources against rules and can audit, deny or remediate non-compliant ones.", ""],
    ["Resource lock", "A safety catch on a resource.", "A setting (CanNotDelete or ReadOnly) that prevents accidental deletion or modification.", ""],
    ["Geo-redundant storage", "Copies kept in a second region.", "Storage redundancy that replicates data to the paired region, protecting against a regional outage.", "GRS"],
    ["Archive tier", "The cheapest, slowest blob storage.", "An offline blob access tier for rarely used data, with hours of rehydration time and a 180-day minimum.", ""],
    ["Total cost of ownership calculator", "Compares on-premises with Azure.", "A Microsoft tool that estimates savings from moving on-premises workloads to Azure.", "TCO calculator"],
    ["Azure Arc", "Azure management for things outside Azure.", "A service that projects on-premises and multicloud servers, Kubernetes clusters and databases into Azure Resource Manager.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "Which Azure feature protects an application if an entire data center in a region fails?", "o": ["Adding tags", "Placing it in a resource group", "Deploying across availability zones", "Using a single larger VM"], "a": 2, "w": ["Tags are labels only.", "Resource groups are logical, not physical.", "Correct.", "Still one location."], "x": "Availability zones are physically separate within a region.", "c": "AZ900", "d": "2"},
    {"t": "mc", "q": "What happens when you delete a resource group?", "o": ["Resources move to another group", "All resources in it are deleted", "Only empty resources are deleted", "Nothing; resource groups can't be deleted"], "a": 1, "w": ["They aren't moved.", "Correct.", "Everything goes.", "They can."], "x": "That's why resources that share a lifecycle belong together.", "c": "AZ900", "d": "2"},
    {"t": "mc", "q": "Which storage redundancy option survives the loss of a whole region?", "o": ["LRS", "Premium SSD", "GRS", "ZRS"], "a": 2, "w": ["One data center only.", "A disk type, not redundancy.", "Correct.", "One region only."], "x": "GRS and GZRS copy data to the paired region.", "c": "AZ900", "d": "2"},
    {"t": "mc", "q": "A company must ensure no one creates resources outside approved regions. Which tool should they use?", "o": ["Azure Advisor", "Resource locks", "Azure RBAC", "Azure Policy"], "a": 3, "w": ["Only recommends.", "Stops deletion or change.", "Controls who, not what.", "Correct."], "x": "Allowed locations is a built-in policy.", "c": "AZ900", "d": "3"},
    {"t": "mc", "q": "Which statement about Microsoft Entra ID is TRUE?", "o": ["It is identical to on-premises Active Directory with Group Policy", "It stores virtual machine disks", "It is a cloud identity service that supports SSO, MFA and Conditional Access", "It only works with Azure, not Microsoft 365"], "a": 2, "w": ["Different protocols, no Group Policy.", "That's managed disks.", "Correct.", "It's the identity behind Microsoft 365 too."], "x": "Formerly Azure Active Directory.", "c": "AZ900", "d": "2"},
    {"t": "mc", "q": "Which cloud model is Microsoft 365?", "o": ["On-premises", "IaaS", "SaaS", "PaaS"], "a": 2, "w": ["It's hosted by Microsoft.", "You don't manage servers.", "Correct.", "You don't deploy code to it."], "x": "Microsoft runs the application; you manage users and data.", "c": "AZ900", "d": "1"},
    {"t": "mc", "q": "Under the shared responsibility model, which is ALWAYS the customer's responsibility?", "o": ["Their data and user accounts", "Physical data center security", "The hypervisor", "Network cabling in Azure data centers"], "a": 0, "w": ["Correct.", "Microsoft.", "Microsoft.", "Microsoft."], "x": "Information, data, devices, accounts and identities always stay with the customer.", "c": "AZ900", "d": "1"},
    {"t": "mc", "q": "Two services each have a 99.9% SLA and an application needs both. What is the composite SLA?", "o": ["99.99%", "About 99.8%", "100%", "99.9%"], "a": 1, "w": ["Higher, not lower.", "Correct.", "No SLA promises 100%.", "Too high."], "x": "Multiply: 0.999 × 0.999 ≈ 0.998.", "c": "AZ900", "d": "3"},
    {"t": "mc", "q": "Which tool estimates what you'd save by moving your server room to Azure?", "o": ["TCO calculator", "Azure Service Health", "Azure Monitor", "Pricing calculator"], "a": 0, "w": ["Correct.", "Outages.", "Monitoring.", "Estimates new Azure resources."], "x": "TCO = total cost of ownership.", "c": "AZ900", "d": "3"},
    {"t": "ms", "q": "Which TWO are serverless or PaaS compute options in Azure? (Choose two.)", "o": ["Azure Functions", "Azure App Service", "Azure Virtual Machines", "Azure Data Box"], "a": [0, 1], "w": ["Correct.", "Correct.", "IaaS.", "Data transfer device."], "x": "With Functions and App Service you don't manage the operating system.", "c": "AZ900", "d": "2"},
    {"t": "mc", "q": "Which service manages on-premises servers as if they were Azure resources?", "o": ["Azure Advisor", "Azure Files", "Azure Arc", "ExpressRoute"], "a": 2, "w": ["Recommendations.", "File shares.", "Correct.", "Private connectivity."], "x": "Arc extends Azure management to other locations.", "c": "AZ900", "d": "3"},
    {"t": "order", "q": "Put the Azure management hierarchy in order from top to bottom.", "o": ["Management group", "Subscription", "Resource group", "Resource"], "a": [0, 1, 2, 3], "x": "My Small Red Robot. Settings and permissions inherit downwards.", "c": "AZ900", "d": "2"}
  ],
  flashcards: [
    ["Azure vs Microsoft 365", "Azure is IaaS/PaaS you build on; Microsoft 365 is SaaS you use."],
    ["Availability zone", "Separate building group inside a region with its own power, cooling and network."],
    ["Region pair", "Two regions in one geography for disaster recovery; updated one at a time."],
    ["Management hierarchy", "Management group, subscription, resource group, resource."],
    ["Azure Resource Manager", "Every create or change request goes through ARM."],
    ["LRS, ZRS, GRS, GZRS", "One building, across zones, second region, zones plus second region."],
    ["Blob access tiers", "Hot, Cool (30 days), Cold (90), Archive (180, offline)."],
    ["Entra ID", "Microsoft's cloud identity service, formerly Azure Active Directory."],
    ["Conditional Access", "If-then sign-in rules based on user, location, device and risk."],
    ["RBAC vs Policy vs Locks", "Who can act; what resources may look like; stop accidents."],
    ["Pricing vs TCO calculator", "Cost of new Azure resources; savings from moving to Azure."],
    ["Composite SLA", "Multiply the SLAs; the result is lower than each one."],
    ["Azure Arc", "Manage on-premises and other clouds through Azure."],
    ["Microsoft cert renewal", "Fundamentals never expire; Associate and Expert renew yearly for free."],
    ["AI-900 status", "Retired June 30, 2026; replaced by AI-901."]
  ]
});
