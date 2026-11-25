export type PageId =
  | 'home'
  | 'overview'
  | 'module-0'
  | 'module-1'
  | 'module-2'
  | 'module-3'
  | 'module-4'
  | 'module-5'
  | 'module-6'
  | 'module-7'
  | 'detective-challenge'
  | 'module-8'
  | 'module-9'
  | 'module-10'
  | 'final-challenge'
  | 'final-recap'
  | 'glossary'
  | 'final-quiz';

export type ClassroomMode = 'student' | 'teacher';

export interface ModuleMeta {
  id: PageId;
  number: number;
  title: string;
  shortTitle: string;
  analogy: string;
  duration: string;
  topicTag: string;
  summary: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  type: 'mcq' | 'tf' | 'scenario';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  teacherNote: string;
}

export interface CourseProgress {
  currentPage: PageId;
  mode: ClassroomMode;
  projectorMode: boolean;
  animationsPaused: boolean;
  completedModules: PageId[];
  completedLabs: string[];
  earnedPoints: number;
  assessmentScore: number;
  finalSecurityScore: number;
  answeredChallenges: Record<string, boolean>;
  finalQuizAnswers: Record<string, number>;
  finalQuizSubmitted: boolean;
  studentName: string;
}
