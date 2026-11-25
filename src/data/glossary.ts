export interface GlossaryTerm {
  term: string;
  meaning: string;
  example: string;
  category: 'Access' | 'Visibility' | 'Protection' | 'Response';
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Cloud Security',
    meaning: 'The discipline of protecting cloud accounts, resources, data, and configurations while detecting and investigating suspicious activity.',
    example: 'Enforcing MFA, locking storage to Private 🔒, and reviewing audit logs continuously.',
    category: 'Protection',
  },
  {
    term: 'Shared Responsibility',
    meaning: 'The security model where the cloud vendor protects the infrastructure ("OF the cloud"), while the customer secures accounts, data, and configurations ("IN the cloud").',
    example: 'The cloud vendor protects data center physical hardware; the customer configures bucket permissions.',
    category: 'Protection',
  },
  {
    term: 'Identity',
    meaning: 'The digital representation of a person, application, or service within the cloud.',
    example: 'rahul@example.com or a payment microservice service account.',
    category: 'Access',
  },
  {
    term: 'Authentication (AuthN)',
    meaning: 'The process of verifying that an entity is who they claim to be ("Who are you?").',
    example: 'Signing in with a password and a 6-digit OTP code on your phone.',
    category: 'Access',
  },
  {
    term: 'Authorization (AuthZ)',
    meaning: 'The process of determining what an authenticated entity is allowed to access and do ("What can you do?").',
    example: 'Permitting Rahul to Read test code, but blocking him from deleting production databases.',
    category: 'Access',
  },
  {
    term: 'Multi-Factor Authentication (MFA)',
    meaning: 'Requiring two or more independent factors (knowledge, possession, inherence) before granting access.',
    example: 'Entering a password (knowledge) + entering a code from an Authenticator app (possession).',
    category: 'Access',
  },
  {
    term: 'Least Privilege',
    meaning: 'The security principle of granting only the absolute minimum permissions necessary to accomplish a job.',
    example: 'Giving a software developer developer access instead of Full Cloud Admin keys.',
    category: 'Access',
  },
  {
    term: 'Access Review',
    meaning: 'A periodic audit of all user accounts and permissions to remove obsolete, departed, or excessive privileges.',
    example: 'Revoking Master Admin access from User B, who left the company 3 months ago.',
    category: 'Access',
  },
  {
    term: 'Cloud Logging',
    meaning: 'The automatic recording of actions, requests, and events happening across all cloud systems.',
    example: 'Recording Who logged in, What resource was touched, When it happened, and Source IP.',
    category: 'Visibility',
  },
  {
    term: 'Audit Log',
    meaning: 'An immutable, tamper-proof record specifically detailing administrative actions and security configuration changes.',
    example: 'alex@example.com | DeleteObject | 02:30 AM | 198.51.100.45 | SUCCESS.',
    category: 'Visibility',
  },
  {
    term: 'Monitoring',
    meaning: 'The continuous automated surveillance of cloud logs, metrics, and network traffic to detect anomalies.',
    example: 'A dashboard tracking login attempts, highlighting a sudden spike of 20 failed logins.',
    category: 'Visibility',
  },
  {
    term: 'Security Alert',
    meaning: 'An automated notification triggered when a security rule detects suspicious or high-risk activity.',
    example: 'Alert: "Admin Role Granted Outside Business Hours (02:14 AM)".',
    category: 'Visibility',
  },
  {
    term: 'Secret',
    meaning: 'Confidential digital credentials such as passwords, API keys, certificates, and database connection strings.',
    example: 'API_KEY or Database Password fetched at runtime from a Secret Manager.',
    category: 'Protection',
  },
  {
    term: 'Secret Manager',
    meaning: 'A specialized encrypted cloud vault designed to safely store, control, and automatically rotate credentials.',
    example: 'Cloud Secret Vault keeping API keys out of public GitHub repositories.',
    category: 'Protection',
  },
  {
    term: 'Cloud Misconfiguration',
    meaning: 'An incorrect security setting or policy mistake that inadvertently leaves cloud data or services exposed.',
    example: 'A private customer database backup bucket mistakenly set to "Public Access: ON 🔓".',
    category: 'Protection',
  },
  {
    term: 'Security Assessment',
    meaning: 'A systematic audit and vulnerability review across cloud identities, storage, secrets, and configurations.',
    example: 'Running an automated scanner to verify that all admin accounts have MFA and all buckets are private.',
    category: 'Protection',
  },
  {
    term: 'Security Investigation',
    meaning: 'The forensic process of analyzing timelines and correlating evidence across multiple logs to understand an incident.',
    example: 'Connecting midnight failed logins to a privilege escalation and 2.4 GB data exfiltration.',
    category: 'Response',
  },
  {
    term: 'Incident Response (IR)',
    meaning: 'The structured protocol to handle security incidents: Identify, Contain, Investigate, Remediate, Recover, and Review.',
    example: 'Immediately suspending a compromised account (Contain) and rotating leaked secrets (Remediate).',
    category: 'Response',
  },
];
