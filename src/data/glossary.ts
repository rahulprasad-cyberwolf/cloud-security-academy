export interface GlossaryTerm {
  term: string;
  analogy: string;
  definition: string;
  category: 'Cloud Basics' | 'Visibility' | 'Protection' | 'Response';
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Cloud',
    analogy: 'Rented digital building',
    definition: 'Computing power, storage, and services you rent over the internet instead of buying your own hardware.',
    category: 'Cloud Basics',
  },
  {
    term: 'Server',
    analogy: 'Powerful always-on computer',
    definition: 'A dedicated computer that stores websites, apps, or files and sends them to users when asked.',
    category: 'Cloud Basics',
  },
  {
    term: 'Storage',
    analogy: 'Digital warehouse',
    definition: 'A place in the cloud to save files, photos, backups, and documents safely.',
    category: 'Cloud Basics',
  },
  {
    term: 'Database',
    analogy: 'Organized digital filing cabinet',
    definition: 'A system that stores structured data like student names, grades, and orders so apps can search it fast.',
    category: 'Cloud Basics',
  },
  {
    term: 'Log',
    analogy: 'CCTV recording',
    definition: 'A timestamped written record of something that happened in a system.',
    category: 'Visibility',
  },
  {
    term: 'Audit Log',
    analogy: 'Visitor sign-in book',
    definition: 'A special security log recording who did what, when, from where, and whether it succeeded or failed.',
    category: 'Visibility',
  },
  {
    term: 'Monitoring',
    analogy: 'Security guard watching CCTV',
    definition: 'Continuously watching logs, health, and activity to notice problems or unusual behavior early.',
    category: 'Visibility',
  },
  {
    term: 'Alert',
    analogy: 'Alarm bell',
    definition: 'An automatic notification sent to the team when monitoring detects something suspicious or broken.',
    category: 'Visibility',
  },
  {
    term: 'Secret',
    analogy: 'House key',
    definition: 'A private password, key, or token that proves identity and must never be shared publicly.',
    category: 'Protection',
  },
  {
    term: 'API Key',
    analogy: 'VIP pass for an app',
    definition: 'A secret code an application uses to identify itself when talking to another cloud service.',
    category: 'Protection',
  },
  {
    term: 'Authentication',
    analogy: 'Showing your ID card ("Who are you?")',
    definition: 'Checking who a user is—usually with a password and a second verification step.',
    category: 'Protection',
  },
  {
    term: 'Authorization',
    analogy: 'Checking your room key ("What can you do?")',
    definition: 'Deciding which files, pages, or actions an authenticated user is allowed to access.',
    category: 'Protection',
  },
  {
    term: 'Permission',
    analogy: 'Access rule on a door',
    definition: 'A rule saying whether a user can Read, Write, or Administer a resource.',
    category: 'Protection',
  },
  {
    term: 'Least Privilege',
    analogy: 'Giving only the keys you need',
    definition: 'Giving every user only the minimum permissions needed to do their job—nothing extra.',
    category: 'Protection',
  },
  {
    term: 'Misconfiguration',
    analogy: 'Leaving a door unlocked by accident',
    definition: 'A mistake in cloud settings—like making private storage public or turning off logs.',
    category: 'Protection',
  },
  {
    term: 'Incident',
    analogy: 'Security emergency',
    definition: 'An unexpected security event—like an unauthorized login or exposed secret—that needs action.',
    category: 'Response',
  },
  {
    term: 'Investigation',
    analogy: 'Detective checking clues',
    definition: 'Reviewing audit logs and timelines step by step to find out what happened and how.',
    category: 'Response',
  },
  {
    term: 'Containment',
    analogy: 'Locking the doors to stop the spread',
    definition: 'Taking quick action—like disabling a compromised account—so an incident cannot cause more harm.',
    category: 'Response',
  },
  {
    term: 'Recovery',
    analogy: 'Changing locks and reopening safely',
    definition: 'Resetting secrets, fixing settings, and safely restoring normal operations after an incident.',
    category: 'Response',
  },
];
