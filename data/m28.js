OMNI.register({
  n: 28,
  certmap: [
    {"c": "AZ104", "o": "AZ-104: 1 identities and governance, 2 storage, 3 compute, 4 virtual networking, 5 monitoring and maintenance"},
    {"c": "MS102", "o": "MS-102: 1 tenant, 2 Entra identity and access, 3 Defender XDR, 4 Purview compliance"}
  ],
  glossary: [
    ["Dynamic group", "A group that fills itself.", "An Entra ID group whose membership is set by rules on user or device attributes.", ""],
    ["Self-service password reset", "Users reset their own passwords.", "An Entra ID feature letting users reset passwords after verifying with registered methods.", "SSPR"],
    ["Shared access signature", "A time-limited link to storage.", "A signed URI granting limited permissions to Azure Storage resources for a set period.", "SAS"],
    ["Stored access policy", "A way to revoke many SAS links at once.", "A container-level policy that defines SAS permissions and expiry and can be changed or deleted.", ""],
    ["Availability set", "Spread VMs across racks.", "A grouping that distributes VMs across fault and update domains within one data center.", ""],
    ["Application security group", "Group VMs by role in firewall rules.", "A label for network interfaces that can be used as a source or destination in NSG rules.", "ASG"],
    ["User-defined route", "A custom route that overrides Azure's defaults.", "A route table entry that directs subnet traffic to a chosen next hop such as a firewall.", "UDR"],
    ["Azure Bastion", "Safe RDP/SSH without public IPs.", "A managed service providing browser-based RDP and SSH to VMs over TLS.", ""],
    ["Log Analytics workspace", "Where Azure logs are stored and searched.", "An Azure Monitor data store queried with KQL.", ""],
    ["Kusto Query Language", "The language for searching Azure logs.", "A read-only query language used by Azure Monitor, Sentinel and Data Explorer.", "KQL"],
    ["Recovery Services vault", "Where Azure backups live.", "A storage entity that holds backup data and recovery points for Azure Backup and Site Recovery.", ""],
    ["Password hash synchronization", "Sync password hashes to the cloud.", "A hybrid identity method that syncs a hash of on-premises password hashes to Entra ID.", "PHS"],
    ["Privileged Identity Management", "Admin rights only when needed.", "An Entra ID feature providing just-in-time, time-bound and approved privileged role activation.", "PIM"],
    ["Sensitivity label", "A tag that protects a document.", "A Purview label that classifies content and can apply encryption, markings and access restrictions.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "Which Azure role can create resources but cannot grant access to others?", "o": ["Contributor", "Owner", "User Access Administrator", "Global Administrator"], "a": 0, "x": "Contributor lacks role assignment rights.", "c": "AZ104", "d": "1"},
    {"t": "mc", "q": "What is the preferred way for applications to access Azure Blob storage?", "o": ["Sharing the account key", "A permanent SAS with no expiry", "Entra ID authentication with an RBAC data role", "Anonymous public access"], "a": 2, "x": "Identity-based access avoids shared secrets.", "c": "AZ104", "d": "2"},
    {"t": "mc", "q": "How can you revoke many SAS tokens issued for a container at once?", "o": ["Turn on soft delete", "Delete the resource group", "Restart the VM", "Change or delete the stored access policy they reference"], "a": 3, "x": "Ad-hoc SAS tokens can only be revoked by rotating the key.", "c": "AZ104", "d": "2"},
    {"t": "mc", "q": "Which option protects VMs from a whole data center failure in a region?", "o": ["Availability zones", "Premium disks", "Availability sets", "A larger VM size"], "a": 0, "x": "Sets protect against rack and update failures only.", "c": "AZ104", "d": "3"},
    {"t": "mc", "q": "NSG rules are processed in which order?", "o": ["Randomly", "Alphabetically", "By priority, lowest number first", "By creation date"], "a": 2, "x": "Processing stops at the first match.", "c": "AZ104", "d": "4"},
    {"t": "mc", "q": "Which service gives RDP access to VMs without public IP addresses?", "o": ["VPN Gateway only", "Azure DNS", "Azure Bastion", "Application Gateway"], "a": 2, "x": "Browser-based over TLS.", "c": "AZ104", "d": "4"},
    {"t": "mc", "q": "Which language queries a Log Analytics workspace?", "o": ["Python", "KQL", "SQL Server T-SQL only", "PowerShell DSC"], "a": 1, "x": "Kusto Query Language.", "c": "AZ104", "d": "5"},
    {"t": "mc", "q": "Which service replicates VMs to another region and orchestrates failover?", "o": ["Azure Advisor", "Azure Site Recovery", "Azure Backup", "Azure Policy"], "a": 1, "x": "Backup creates restore points; Site Recovery handles DR.", "c": "AZ104", "d": "5"},
    {"t": "mc", "q": "Which hybrid sign-in method keeps working if on-premises domain controllers are offline?", "o": ["Federation with AD FS", "Password hash synchronization", "Pass-through authentication", "None of them"], "a": 1, "x": "Authentication happens in the cloud.", "c": "MS102", "d": "2"},
    {"t": "mc", "q": "Which feature gives admins time-limited role activation with approval?", "o": ["Self-service password reset", "Privileged Identity Management", "Safe Links", "Dynamic groups"], "a": 1, "x": "Just-in-time privilege.", "c": "MS102", "d": "2"},
    {"t": "mc", "q": "Which Defender product protects email with Safe Links and Safe Attachments?", "o": ["Defender for Cloud Apps", "Defender for Endpoint", "Defender for Office 365", "Defender for Identity"], "a": 2, "x": "Also runs attack simulation training.", "c": "MS102", "d": "3"},
    {"t": "mc", "q": "Which Purview feature blocks users from emailing credit card numbers externally?", "o": ["Retention label", "Data loss prevention policy", "Secure Score", "eDiscovery hold"], "a": 1, "x": "DLP detects sensitive information types.", "c": "MS102", "d": "4"}
  ],
  flashcards: [
    ["AZ-104 domains", "Identity/governance, storage, compute, networking, monitoring."],
    ["MS-102 domains", "Tenant, Entra identity, Defender XDR, Purview."],
    ["Entra roles vs Azure RBAC", "Directory management vs resource management."],
    ["Contributor", "Can manage resources but can't assign roles."],
    ["SAS", "Time- and permission-limited storage URL."],
    ["Stored access policy", "Lets you revoke a group of SAS tokens."],
    ["Availability set vs zone", "Racks in one data center vs separate buildings."],
    ["NSG processing", "Lowest priority number first; first match wins."],
    ["UDR", "Custom route, e.g. force traffic through a firewall."],
    ["PHS / PTA / Federation", "Hash in cloud / live on-prem check / redirect to AD FS."],
    ["PIM", "Just-in-time, approved, time-limited admin roles."],
    ["Sensitivity vs retention labels", "Protect content vs keep or delete it on schedule."]
  ]
});
