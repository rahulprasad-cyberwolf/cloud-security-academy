export interface GlossaryTerm {
  term: string;
  meaning: string;
  example: string;
  category: 'Access' | 'Visibility' | 'Protection' | 'Response';
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Cloud Security',
    meaning: 'Making sure the right people get the right access to the right cloud resources while suspicious activity is detected.',
    example: 'Locking private storage, checking logins, and keeping audit logs enabled.',
    category: 'Protection',
  },
  {
    term: 'Identity',
    meaning: 'The digital profile representing a user or application in the cloud.',
    example: 'rahul@example.com or a service account for an app.',
    category: 'Access',
  },
  {
    term: 'Authentication',
    meaning: 'Proving who you are ("Are you really Rahul?").',
    example: 'Signing in with a password and a one-time verification code.',
    category: 'Access',
  },
  {
    term: 'Authorization',
    meaning: 'Deciding what an authenticated user is allowed to access or do.',
    example: 'Allowing Arun (Tester) to Read files, but not delete them.',
    category: 'Access',
  },
  {
    term: 'Permission',
    meaning: 'A specific rule saying what action is allowed on a resource.',
    example: 'Read, Write, or Full Admin Access.',
    category: 'Access',
  },
  {
    term: 'Role',
    meaning: 'A named group of permissions assigned to a job function.',
    example: 'Developer role, Tester role, or Admin role.',
    category: 'Access',
  },
  {
    term: 'Least Privilege',
    meaning: 'Giving users only the permissions required for their job—nothing extra.',
    example: 'A developer gets dev access instead of full administrator keys.',
    category: 'Access',
  },
  {
    term: 'Log',
    meaning: 'A timestamped record of something that happened in the cloud.',
    example: '10:42 AM | Rahul | Login | SUCCESS.',
    category: 'Visibility',
  },
  {
    term: 'Audit Log',
    meaning: 'A security log showing Who performed What action, When, Where, and the Result.',
    example: 'UnknownUser | Permission Change | 02:14 AM | Unknown | SUCCESS.',
    category: 'Visibility',
  },
  {
    term: 'Monitoring',
    meaning: 'Continuously watching logs and activity to spot unusual behavior.',
    example: 'A dashboard graph showing a sudden spike in failed logins.',
    category: 'Visibility',
  },
  {
    term: 'Alert',
    meaning: 'A notification telling the team that something needs attention.',
    example: 'Alert triggered after 5 failed login attempts in 2 minutes.',
    category: 'Visibility',
  },
  {
    term: 'Secret',
    meaning: 'Sensitive credential information that must stay private.',
    example: 'Passwords, API keys, access tokens, and database credentials.',
    category: 'Protection',
  },
  {
    term: 'API Key',
    meaning: 'A secret code an application uses to identify itself to a service.',
    example: 'Fetched from a Secret Manager instead of written in code.',
    category: 'Protection',
  },
  {
    term: 'Access Token',
    meaning: 'A temporary digital pass proving an app or user is authorized.',
    example: 'A short-lived session pass issued after login.',
    category: 'Protection',
  },
  {
    term: 'Misconfiguration',
    meaning: 'A cloud security setting configured incorrectly by mistake.',
    example: 'Sensitive storage left Public 🔓 or logging turned OFF.',
    category: 'Protection',
  },
  {
    term: 'Security Event',
    meaning: 'A notable action or change recorded in logs that may need review.',
    example: 'A login from a new location or a permission change.',
    category: 'Response',
  },
  {
    term: 'Incident',
    meaning: 'A confirmed or suspected security problem that requires response.',
    example: 'Unauthorized login followed by large data access.',
    category: 'Response',
  },
  {
    term: 'Investigation',
    meaning: 'Checking logs, timelines, and evidence to understand what happened.',
    example: 'Tracing 01:58 failed logins through 02:18 large data access.',
    category: 'Response',
  },
  {
    term: 'Containment',
    meaning: 'Stopping suspicious access so it cannot continue causing harm.',
    example: 'Restricting a compromised account while investigating.',
    category: 'Response',
  },
  {
    term: 'Recovery',
    meaning: 'Fixing the root cause and returning the cloud to safe normal operation.',
    example: 'Rotating exposed secrets, fixing settings, and verifying access.',
    category: 'Response',
  },
];
