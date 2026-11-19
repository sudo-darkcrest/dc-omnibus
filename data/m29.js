OMNI.register({
  n: 29,
  certmap: [
    {"c": "ACE", "o": "ACE: 1 environment setup, 2 planning and implementing, 3 operations, 4 access and security"},
    {"c": "PCA", "o": "PCA: 1 design, 2 provisioning, 3 security and compliance, 4 process optimization, 5 implementation, 6 reliability"}
  ],
  glossary: [
    ["Project", "Google Cloud's basic container.", "The unit that holds resources, enabled APIs, quotas, IAM policies and billing linkage.", ""],
    ["Folder", "A grouping of projects.", "A node in the Google Cloud resource hierarchy that groups projects and other folders.", ""],
    ["Service account", "An identity for a workload.", "A Google Cloud identity used by applications and VMs rather than people.", ""],
    ["Organization policy", "A guardrail for the whole company.", "A constraint applied in the resource hierarchy that restricts how resources can be configured.", ""],
    ["Managed instance group", "A self-healing set of identical VMs.", "A group of Compute Engine VMs from one template with autoscaling, autohealing and rolling updates.", "MIG"],
    ["Google Kubernetes Engine", "Google's managed Kubernetes.", "A managed Kubernetes service with Standard and Autopilot modes.", "GKE"],
    ["Cloud Run", "Run containers without servers.", "A serverless platform for running stateless containers that scales to zero.", ""],
    ["BigQuery", "Google's serverless data warehouse.", "A fully managed, serverless SQL analytics data warehouse.", ""],
    ["Spanner", "A global SQL database.", "A horizontally scalable, strongly consistent, globally distributed relational database.", ""],
    ["Bigtable", "Huge, fast NoSQL storage.", "A wide-column NoSQL database for very large, low-latency workloads.", ""],
    ["Shared VPC", "One network used by many projects.", "A design where a host project shares its VPC subnets with service projects.", ""],
    ["Cloud NAT", "Outbound internet for private VMs.", "Managed network address translation for resources without external IPs.", ""],
    ["Identity-Aware Proxy", "Access by identity, not network.", "A service that controls access to apps and VMs based on user identity and context.", "IAP"],
    ["VPC Service Controls", "A fence against data leaks.", "Service perimeters that restrict data movement to and from Google Cloud services.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "What is the correct Google Cloud hierarchy from top to bottom?", "o": ["Projects, folders, organization, resources", "Accounts, OUs, resources", "Subscriptions, resource groups, resources", "Organization, folders, projects, resources"], "a": 3, "x": "Policies inherit downward.", "c": "ACE", "d": "1"},
    {"t": "mc", "q": "What is the recommended way to give a VM access to a bucket?", "o": ["Give the VM's users Owner", "Make the bucket public", "Attach a service account with a predefined role", "Embed a downloaded key file"], "a": 2, "x": "No long-lived keys.", "c": "ACE", "d": "4"},
    {"t": "mc", "q": "Which role type is too broad for most production use?", "o": ["Custom roles", "Basic roles such as Editor", "Predefined roles", "Service agent roles"], "a": 1, "x": "Basic roles grant wide access across services.", "c": "ACE", "d": "4"},
    {"t": "mc", "q": "Which service runs stateless containers and scales to zero?", "o": ["Bigtable", "Filestore", "Cloud Run", "Compute Engine"], "a": 2, "x": "Pay only when requests run.", "c": "ACE", "d": "2"},
    {"t": "mc", "q": "Which Cloud Storage class has a 90-day minimum storage duration?", "o": ["Standard", "Archive", "Coldline", "Nearline"], "a": 2, "x": "Nearline 30, Archive 365.", "c": "ACE", "d": "2"},
    {"t": "mc", "q": "What is the scope of a Google Cloud VPC network?", "o": ["Regional only", "One per project per zone", "Global, with regional subnets", "Zonal"], "a": 2, "x": "Different from AWS and Azure.", "c": "ACE", "d": "2"},
    {"t": "mc", "q": "Which service gives private VMs outbound internet access?", "o": ["Cloud KMS", "Cloud CDN", "Cloud NAT", "Cloud Armor"], "a": 2, "x": "No external IPs needed.", "c": "ACE", "d": "2"},
    {"t": "mc", "q": "Which database is globally distributed, relational and strongly consistent?", "o": ["Firestore", "Spanner", "Cloud SQL", "Memorystore"], "a": 1, "x": "Cloud SQL is regional.", "c": "PCA", "d": "1"},
    {"t": "mc", "q": "Which product is a serverless data warehouse?", "o": ["BigQuery", "Dataproc", "Cloud SQL", "Bigtable"], "a": 0, "x": "SQL analytics at petabyte scale.", "c": "PCA", "d": "1"},
    {"t": "mc", "q": "Which design lets a central team manage networking for many projects?", "o": ["Shared VPC", "Object Lifecycle Management", "Cloud Run", "A VPC per project"], "a": 0, "x": "Host and service projects.", "c": "PCA", "d": "2"},
    {"t": "mc", "q": "Which control helps stop data being copied out of BigQuery to unauthorized projects?", "o": ["Managed instance groups", "Cloud CDN", "VPC Service Controls", "Cloud NAT"], "a": 2, "x": "Service perimeters.", "c": "PCA", "d": "3"},
    {"t": "ms", "q": "Which TWO are true of IAM policy inheritance in Google Cloud? (Choose two.)", "o": ["A role granted on a folder applies to its projects", "Allow policies are additive", "Policies only apply to the exact resource", "Removing a role at a project cancels a folder grant"], "a": [0, 1], "x": "Use deny policies to block inherited access.", "c": "ACE", "d": "4"}
  ],
  flashcards: [
    ["Hierarchy", "Organization > folders > projects > resources."],
    ["Project", "Holds resources, APIs, quotas, IAM, billing link."],
    ["Role types", "Basic (too broad), predefined, custom."],
    ["Service accounts", "Workload identities; attach, don't download keys."],
    ["Compute choices", "Compute Engine, GKE, Cloud Run, functions, App Engine."],
    ["Storage class minimums", "Nearline 30, Coldline 90, Archive 365 days."],
    ["Database picks", "Cloud SQL, Spanner, Firestore, Bigtable, BigQuery."],
    ["VPC scope", "Global network, regional subnets."],
    ["Shared VPC", "Host project shares subnets with service projects."],
    ["IAP", "Identity-based access without a VPN."],
    ["VPC Service Controls", "Perimeters against data exfiltration."],
    ["ACE vs PCA", "Operate and deploy vs design (with case studies)."]
  ]
});
