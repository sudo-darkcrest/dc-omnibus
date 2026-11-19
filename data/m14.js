OMNI.register({
  n: 14,
  certmap: [
    {"c": "CCNA", "o": "200-301: 1 Network Fundamentals, 2 Network Access, 3 IP Connectivity, 4 IP Services, 5 Security Fundamentals, 6 Automation and Programmability"},
    {"c": "N", "o": "N10-009: 2.1 routing (static, OSPF, administrative distance), 2.2 switching (VLANs, trunks, STP), 4.1 ACLs and port security, 3.2 syslog and SNMP"},
    {"c": "GEN", "o": "Foundation for CCNP Enterprise, CCNP Security and Cisco CyberOps."}
  ],
  glossary: [
    ["Cisco IOS", "The operating system on Cisco routers and switches.", "Cisco's Internetwork Operating System (and IOS XE), managed through a mode-based command-line interface.", "IOS"],
    ["Running configuration", "The settings in use right now.", "The active configuration held in RAM; lost on reboot unless saved.", "running-config"],
    ["Startup configuration", "The settings loaded at boot.", "The saved configuration in NVRAM used when the device starts.", "startup-config"],
    ["Privileged EXEC mode", "The # prompt with full access.", "IOS mode, entered with enable, that allows show, debug, copy and reload commands.", ""],
    ["Administrative distance", "How much a router trusts a route source.", "A value from 0 to 255 used to choose between routes to the same prefix from different sources; lower is preferred.", "AD"],
    ["Floating static route", "A backup static route.", "A static route with a higher administrative distance than the primary route, used only if the primary disappears.", ""],
    ["Router ID", "An OSPF router's name tag.", "A 32-bit identifier (written like an IPv4 address) that uniquely identifies an OSPF router.", "RID"],
    ["Designated router", "The OSPF router that coordinates a shared segment.", "The router elected on a multi-access OSPF network to reduce adjacencies and flooding; a BDR is the backup.", "DR"],
    ["HSRP", "Two routers share one gateway address.", "Hot Standby Router Protocol: Cisco first-hop redundancy using a virtual IP and MAC.", "Hot Standby Router Protocol"],
    ["Wildcard mask", "The upside-down subnet mask used in ACLs.", "A mask where 0 bits must match and 1 bits are ignored, e.g., 0.0.0.255 for a /24.", ""],
    ["Implicit deny", "The invisible last rule that blocks everything else.", "The unseen deny-all statement at the end of every ACL.", ""],
    ["ip helper-address", "Lets DHCP requests cross a router.", "An interface command that relays broadcast DHCP requests to a server on another subnet.", ""],
    ["PortFast", "Brings a PC port up instantly.", "A spanning-tree feature that moves access ports straight to forwarding.", ""],
    ["BPDU Guard", "Shuts a port if a switch is plugged in.", "Disables a PortFast port that receives a spanning-tree BPDU, preventing loops and rogue switches.", ""],
    ["Northbound API", "How apps talk to the controller.", "The interface between an SDN controller and applications or administrators (often REST).", ""],
    ["Southbound API", "How the controller talks to devices.", "The interface between an SDN controller and network devices (for example NETCONF or OpenFlow).", ""]
  ],
  quiz: [
    {"t": "mc", "q": "Which prompt shows global configuration mode?", "o": ["Router#", "Router>", "Router(config-if)#", "Router(config)#"], "a": 3, "w": ["Privileged EXEC.", "User EXEC.", "Interface configuration.", "Correct."], "x": "Enter it with configure terminal from privileged EXEC.", "c": "CCNA", "d": "1.1"},
    {"t": "mc", "q": "Which command saves the configuration so it survives a reboot?", "o": ["erase startup-config", "reload", "copy running-config startup-config", "show running-config"], "a": 2, "w": ["Deletes the saved config.", "Reboots, losing unsaved changes.", "Correct.", "Only displays it."], "x": "write memory is an older equivalent.", "c": "CCNA", "d": "1.1"},
    {"t": "mc", "q": "A router has routes to 10.0.0.0/8 (OSPF) and 10.1.1.0/24 (RIP). Which is used for 10.1.1.20?", "o": ["10.0.0.0/8 via OSPF", "Both, load-balanced", "Neither", "10.1.1.0/24 via RIP"], "a": 3, "w": ["AD only compares identical prefixes.", "Different prefixes don't load-balance.", "A match exists.", "Correct: longest prefix match."], "x": "Longest prefix first, then administrative distance.", "c": "CCNA", "d": "3.2"},
    {"t": "mc", "q": "What is the default administrative distance of OSPF?", "o": ["90", "120", "110", "1"], "a": 2, "w": ["EIGRP.", "RIP.", "Correct.", "Static."], "x": "Lower administrative distance is more trusted.", "c": "CCNA", "d": "3.1"},
    {"t": "mc", "q": "Where should a standard ACL normally be placed?", "o": ["As close to the source as possible", "On every interface", "Only on the internet link", "As close to the destination as possible"], "a": 3, "w": ["That is for extended ACLs.", "Unnecessary.", "Not a rule.", "Correct."], "x": "Standard ACLs match only source addresses, so placing them near the source could block too much.", "c": "CCNA", "d": "5.6"},
    {"t": "mc", "q": "Which wildcard mask matches all hosts in 192.168.5.0/24?", "o": ["255.255.255.0", "255.255.255.255", "0.0.0.0", "0.0.0.255"], "a": 3, "w": ["That's the subnet mask.", "Matches anything.", "Matches one host.", "Correct."], "x": "A wildcard is the inverse of the subnet mask.", "c": "CCNA", "d": "5.6"},
    {"t": "mc", "q": "Clients can't reach a DHCP server located on a different subnet. What should be configured on their gateway interface?", "o": ["spanning-tree portfast", "ip nat inside", "ip helper-address", "switchport mode trunk"], "a": 2, "w": ["Port startup, unrelated.", "NAT is unrelated.", "Correct.", "Trunking is unrelated."], "x": "Routers don't forward broadcasts unless relaying is configured.", "c": "CCNA", "d": "4.6"},
    {"t": "mc", "q": "Which syslog severity level is 'Warning'?", "o": ["2", "7", "4", "6"], "a": 2, "w": ["Critical.", "Debugging.", "Correct.", "Informational."], "x": "0 Emergency to 7 Debugging; lower numbers are more severe.", "c": "CCNA", "d": "4.5"},
    {"t": "mc", "q": "Which HTTP verb is used in a REST API to read data?", "o": ["GET", "DELETE", "POST", "PUT"], "a": 0, "w": ["Correct.", "Delete.", "Create.", "Update/replace."], "x": "CRUD maps to POST, GET, PUT/PATCH and DELETE.", "c": "CCNA", "d": "6.5"},
    {"t": "mc", "q": "Which tool is agentless and uses SSH with YAML playbooks?", "o": ["Chef", "SNMPv1", "Ansible", "Puppet"], "a": 2, "w": ["Agent-based.", "A monitoring protocol.", "Correct.", "Agent-based."], "x": "Agentless tools need nothing installed on managed devices.", "c": "CCNA", "d": "6.6"},
    {"t": "mc", "q": "Two switches won't pass VLAN 20 traffic across their link. Both ends show the link up. What should you check FIRST?", "o": ["The NTP server", "The routing table", "The syslog level", "Both ends are trunking, the native VLAN matches, and VLAN 20 is allowed"], "a": 3, "w": ["Unrelated.", "Layer 2 issue first.", "Unrelated.", "Correct."], "x": "show interfaces trunk shows mode, native VLAN and allowed VLANs.", "c": "CCNA", "d": "2.2"},
    {"t": "mc", "q": "Which feature shuts down a PortFast port if it receives a BPDU?", "o": ["DHCP snooping", "Port security", "Root Guard", "BPDU Guard"], "a": 3, "w": ["Blocks rogue DHCP servers.", "Limits MAC addresses.", "Prevents a port becoming a root port.", "Correct."], "x": "It prevents someone plugging in a switch and causing a loop.", "c": "CCNA", "d": "2.5"}
  ],
  flashcards: [
    ["IOS mode prompts", "> user EXEC, # privileged EXEC, (config)# global, (config-if)# interface."],
    ["Save a Cisco config", "copy running-config startup-config (or write memory)."],
    ["Quick interface summary", "show ip interface brief."],
    ["Administrative distances", "Connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120, iBGP 200."],
    ["Route selection order", "Longest prefix, then lowest administrative distance, then lowest metric."],
    ["Floating static route", "Static route with a higher AD, used as a backup."],
    ["OSPF DR election", "Highest priority, then highest router ID; priority 0 never becomes DR."],
    ["OSPF cost", "Reference bandwidth ÷ interface bandwidth (default reference 100 Mbps)."],
    ["Standard vs extended ACL", "Standard: source only, place near destination. Extended: source, destination, port, place near source."],
    ["Implicit deny", "Every ACL ends with an invisible deny any."],
    ["Wildcard for /24", "0.0.0.255."],
    ["DHCP relay command", "ip helper-address."],
    ["Syslog levels 0 to 7", "Emergency, Alert, Critical, Error, Warning, Notification, Informational, Debugging."],
    ["REST verbs and CRUD", "POST create, GET read, PUT/PATCH update, DELETE delete."],
    ["SDN APIs", "Northbound to apps; southbound to devices."]
  ]
});
