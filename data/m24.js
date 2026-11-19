OMNI.register({
  n: 24,
  certmap: [
    {"c": "NCP", "o": "NCP-MCI topics: cluster configuration, storage, networking, VM management, data protection, monitoring and troubleshooting"},
    {"c": "N", "o": "N10-009: 1.8 virtualization and storage concepts, extended"}
  ],
  glossary: [
    ["Hyperconverged infrastructure", "Compute and storage in the same boxes.", "An architecture where software pools local storage across identical compute nodes into a shared, managed storage system.", "HCI"],
    ["Three-tier architecture", "Separate servers, storage network and storage array.", "Traditional design with compute hosts, a SAN fabric and dedicated storage arrays.", ""],
    ["Replication factor", "How many copies of data the cluster keeps.", "The number of copies of each data block stored across nodes; RF2 keeps two, RF3 keeps three.", "RF"],
    ["Erasure coding", "Space-saving protection using parity.", "A data protection method that stores parity fragments instead of full replicas.", ""],
    ["Data locality", "Keeping a VM's data on its own node.", "Placing a VM's primary data copy on the node where it runs to reduce network I/O.", ""],
    ["Controller VM", "Nutanix's storage brain on each node.", "The VM on each Nutanix node that runs the distributed storage software and serves I/O to the hypervisor.", "CVM"],
    ["AHV", "Nutanix's own hypervisor.", "Nutanix's KVM-based Type 1 hypervisor included with its platform.", "Acropolis Hypervisor"],
    ["Prism Central", "One console for many Nutanix clusters.", "Nutanix's multi-cluster management, automation and reporting plane.", ""],
    ["High availability", "Restart VMs elsewhere if a host dies.", "A cluster feature that automatically restarts VMs on surviving hosts after a host failure.", "HA"],
    ["Live migration", "Move a running VM with no downtime.", "Transfer of a running VM's memory and state between hosts without interruption.", ""],
    ["Overcommitment", "Promising more than you have.", "Allocating more virtual CPU or memory than physical resources, relying on not all VMs peaking together.", ""],
    ["CPU ready time", "How long a VM waits for a CPU.", "The time a virtual CPU is ready to run but waiting for a physical core.", ""],
    ["Anti-affinity rule", "Keep these VMs apart.", "A placement rule that keeps specified VMs on different hosts.", ""],
    ["N+1", "One spare unit of capacity.", "Design with enough spare capacity to tolerate one component failure.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "What is the main idea of hyperconverged infrastructure?", "o": ["Separate SAN arrays for every server", "Using only physical servers", "Compute and storage combined in identical nodes, managed by software", "Running everything in a public cloud"], "a": 2, "x": "Storage is pooled from local disks across nodes.", "c": "NCP", "d": "1"},
    {"t": "mc", "q": "How many node failures can an RF2 cluster survive without losing data?", "o": ["One", "Three", "Two", "None"], "a": 0, "x": "Two copies means one can be lost.", "c": "NCP", "d": "2"},
    {"t": "mc", "q": "Which Nutanix component runs on every node and serves storage I/O?", "o": ["Prism Central", "Move", "Controller VM (CVM)", "Foundation"], "a": 2, "x": "It runs the distributed storage software.", "c": "NCP", "d": "1"},
    {"t": "mc", "q": "Which tool manages many Nutanix clusters from one place?", "o": ["LCM", "Prism Central", "Prism Element", "Foundation"], "a": 1, "x": "Prism Element manages a single cluster.", "c": "NCP", "d": "6"},
    {"t": "mc", "q": "What is the difference between HA and live migration?", "o": ["HA restarts VMs after a failure; live migration moves running VMs with no downtime", "Live migration only works after a failure", "HA moves running VMs", "They are the same"], "a": 0, "x": "HA involves a reboot.", "c": "NCP", "d": "4"},
    {"t": "mc", "q": "High CPU ready time usually indicates what?", "o": ["Full disks", "A DNS problem", "Too much free memory", "Too much vCPU overcommitment"], "a": 3, "x": "VMs wait for physical cores.", "c": "NCP", "d": "6"},
    {"t": "mc", "q": "Which rule keeps two VMs on different hosts?", "o": ["Reservation", "Anti-affinity", "Affinity", "Share"], "a": 1, "x": "Protects redundant pairs from a single host failure.", "c": "NCP", "d": "4"},
    {"t": "mc", "q": "Why are backups still needed with RF3 replication?", "o": ["Backups make VMs faster", "Replication copies deletions, corruption and ransomware too", "RF3 is slower", "They aren't needed"], "a": 1, "x": "Backups give point-in-time recovery.", "c": "NCP", "d": "5"},
    {"t": "mc", "q": "Which storage protocol provides block access over IP?", "o": ["SMB", "S3", "iSCSI", "NFS"], "a": 2, "x": "NFS and SMB are file protocols; S3 is object.", "c": "NCP", "d": "2"},
    {"t": "mc", "q": "Which Nutanix tool performs rolling firmware and software upgrades?", "o": ["Foundation", "Life Cycle Manager", "Flow", "Move"], "a": 1, "x": "One node at a time, no downtime.", "c": "NCP", "d": "1"},
    {"t": "mc", "q": "A 4-node cluster must tolerate one host failure. Roughly what is the safe maximum load?", "o": ["About 75%", "100%", "25%", "95%"], "a": 0, "x": "One node of four is 25% of capacity.", "c": "NCP", "d": "6"},
    {"t": "ms", "q": "Which TWO are benefits of erasure coding and deduplication? (Choose two.)", "o": ["Less storage space used", "More usable capacity from the same disks", "Removal of the need for backups", "Faster boot for every VM"], "a": [0, 1], "x": "They trade some CPU and performance for capacity.", "c": "NCP", "d": "2"}
  ],
  flashcards: [
    ["HCI", "Identical nodes; software pools local storage across them."],
    ["Three-tier", "Servers + SAN fabric + storage array."],
    ["RF2 / RF3", "Two copies (one failure) / three copies (two failures, 5+ nodes)."],
    ["Erasure coding", "Parity instead of replicas; saves space, best for cold data."],
    ["Data locality", "VM data kept on the node where it runs."],
    ["CVM", "Nutanix Controller VM: storage software on every node."],
    ["Prism Element vs Central", "One cluster vs many clusters."],
    ["HA vs live migration", "Restart after failure vs move with no downtime."],
    ["CPU ready", "Time a vCPU waits for a physical core."],
    ["Affinity / anti-affinity", "Keep together / keep apart."],
    ["N+1", "Spare capacity for one failure."],
    ["Replication isn't backup", "Deletion and ransomware replicate instantly."]
  ]
});
