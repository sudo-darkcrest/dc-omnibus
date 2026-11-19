OMNI.register({
  n: 26,
  certmap: [
    {"c": "SAA", "o": "SAA-C03: 1 Secure, 2 Resilient, 3 High-Performing, 4 Cost-Optimized architectures"},
    {"c": "DVA", "o": "DVA-C03: 1 Development with AWS Services, 2 Security, 3 Testing and Deployment, 4 Troubleshooting and Optimization"},
    {"c": "SCS", "o": "Security Specialty: detection and response, logging, infrastructure security, IAM, data protection, governance"}
  ],
  glossary: [
    ["Well-Architected Framework", "AWS's checklist for good design.", "AWS guidance organized into six pillars for evaluating cloud architectures.", ""],
    ["NAT gateway", "Lets private servers reach out, not in.", "A managed service that lets instances in private subnets initiate outbound internet connections.", ""],
    ["Network ACL", "A stateless subnet firewall.", "Numbered, stateless allow and deny rules applied at the subnet boundary.", "NACL"],
    ["VPC endpoint", "Private path to an AWS service.", "A gateway or interface endpoint that connects a VPC to AWS services without the internet.", ""],
    ["Transit Gateway", "A hub connecting many networks.", "A regional router that connects VPCs and on-premises networks in a hub-and-spoke design.", ""],
    ["Multi-AZ deployment", "A standby copy in another zone.", "An RDS configuration with a synchronous standby in another Availability Zone and automatic failover.", ""],
    ["Read replica", "An extra copy for reads.", "An asynchronously updated database copy used to scale read traffic.", ""],
    ["Pilot light", "Keep the core running, the rest switched off.", "A DR strategy that replicates core data with minimal running infrastructure until failover.", ""],
    ["Amazon SQS", "A queue between parts of an app.", "Simple Queue Service: managed message queuing that decouples producers and consumers.", "Simple Queue Service"],
    ["Dead-letter queue", "Where failed messages go.", "A queue that receives messages that couldn't be processed after a set number of attempts.", "DLQ"],
    ["Partition key", "DynamoDB's main lookup value.", "The attribute DynamoDB hashes to distribute items across partitions.", ""],
    ["Service control policy", "Account-wide permission ceiling.", "An AWS Organizations policy that limits the maximum permissions available in member accounts.", "SCP"],
    ["Envelope encryption", "Encrypt data with a key, then encrypt that key.", "Encrypting data with a data key that is itself encrypted by a master key in KMS.", ""],
    ["Spot Instance", "Cheap spare capacity that can be taken back.", "EC2 capacity at a large discount that AWS can reclaim with two minutes' notice.", ""]
  ],
  quiz: [
    {"t": "mc", "q": "Which AWS feature lets private-subnet instances reach the internet outbound only?", "o": ["Internet gateway on the private route table", "VPC peering", "NAT gateway", "A gateway endpoint"], "a": 2, "x": "Place it in a public subnet.", "c": "SAA", "d": "1"},
    {"t": "mc", "q": "Which is TRUE of security groups?", "o": ["They are stateful and have allow rules only", "They are stateless", "They support deny rules", "They attach to subnets"], "a": 0, "x": "NACLs are stateless with deny rules.", "c": "SAA", "d": "1"},
    {"t": "mc", "q": "Which RDS option scales read traffic?", "o": ["Larger storage", "Snapshots", "Multi-AZ standby", "Read replicas"], "a": 3, "x": "The Multi-AZ standby doesn't serve reads in the classic setup.", "c": "SAA", "d": "3"},
    {"t": "mc", "q": "Which DR strategy has the lowest cost and longest recovery time?", "o": ["Backup and restore", "Pilot light", "Multi-site active/active", "Warm standby"], "a": 0, "x": "Restore everything from backups when needed.", "c": "SAA", "d": "2"},
    {"t": "mc", "q": "Which service decouples tiers by buffering messages?", "o": ["Amazon Route 53", "Amazon EBS", "AWS Shield", "Amazon SQS"], "a": 3, "x": "Consumers process messages at their own pace.", "c": "SAA", "d": "2"},
    {"t": "mc", "q": "Which storage service provides a shared NFS file system across many Linux instances in multiple AZs?", "o": ["Amazon EFS", "S3 Glacier Deep Archive", "Instance store", "Amazon EBS"], "a": 0, "x": "EBS attaches to instances in one AZ.", "c": "SAA", "d": "3"},
    {"t": "mc", "q": "What is the BEST way for code on EC2 to get AWS credentials?", "o": ["An IAM role (instance profile)", "A shared password file", "The root user's keys", "Access keys in the source code"], "a": 0, "x": "Roles provide rotating temporary credentials.", "c": "DVA", "d": "2"},
    {"t": "mc", "q": "Which service traces requests through distributed microservices?", "o": ["Amazon Macie", "AWS X-Ray", "AWS Config", "Amazon Inspector"], "a": 1, "x": "Shows latency per segment.", "c": "DVA", "d": "4"},
    {"t": "mc", "q": "Which DynamoDB operation is usually more efficient?", "o": ["Export to S3 first", "Scan of the whole table", "Delete and recreate", "Query using the partition key"], "a": 3, "x": "Scan reads every item.", "c": "DVA", "d": "1"},
    {"t": "mc", "q": "In IAM policy evaluation, what happens if one policy allows an action and another explicitly denies it?", "o": ["The newest policy wins", "The action is denied", "The action is allowed", "The user is prompted"], "a": 1, "x": "Explicit deny always wins.", "c": "SCS", "d": "4"},
    {"t": "mc", "q": "Which service detects threats using CloudTrail, VPC Flow Logs and DNS logs?", "o": ["Amazon GuardDuty", "Amazon CloudFront", "AWS Budgets", "Amazon Macie"], "a": 0, "x": "Macie finds sensitive data in S3.", "c": "SCS", "d": "1"},
    {"t": "ms", "q": "Which TWO help prevent S3 data from being deleted or overwritten by ransomware? (Choose two.)", "o": ["Making the bucket public", "S3 Object Lock", "Disabling CloudTrail", "S3 Versioning"], "a": [1, 3], "x": "Object Lock makes objects immutable for a retention period.", "c": "SCS", "d": "5"}
  ],
  flashcards: [
    ["SAA-C03 domains", "Secure 30, Resilient 26, High-Performing 24, Cost-Optimized 20."],
    ["Well-Architected pillars", "Ops excellence, security, reliability, performance, cost, sustainability."],
    ["Public vs private subnet", "Route to internet gateway vs none (outbound via NAT)."],
    ["SG vs NACL", "Stateful allow-only on ENI vs stateless allow/deny on subnet."],
    ["Gateway endpoints", "S3 and DynamoDB, free, via route tables."],
    ["ALB vs NLB", "Layer 7 routing vs Layer 4 performance and static IPs."],
    ["Multi-AZ vs read replica", "Availability vs read scaling."],
    ["DR strategies", "Backup/restore, pilot light, warm standby, active/active."],
    ["SQS vs SNS", "Queue (pull) vs fan-out (push)."],
    ["IAM evaluation", "Explicit deny > explicit allow > implicit deny."],
    ["SCP", "Caps permissions for whole accounts in an organization."],
    ["Spot", "Up to ~90% off; interruptible; for fault-tolerant work."]
  ]
});
