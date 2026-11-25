import React, { createContext, useContext, useEffect, useState } from 'react';
import { MODULES, PAGE_ORDER, PAGE_TITLES } from '../data/curriculum';
import type { ClassroomMode, CourseProgress, PageId } from '../types/course';

const STORAGE_KEY = 'cloudsec-classroom-v3';

const DEFAULT_PROGRESS: CourseProgress = {
  currentPage: 'home',
  mode: 'student',
  projectorMode: false,
  animationsPaused: false,
  completedModules: [],
  completedLabs: [],
  earnedPoints: 0,
  assessmentScore: 0,
  finalSecurityScore: 0,
  answeredChallenges: {},
  finalQuizAnswers: {},
  finalQuizSubmitted: false,
  studentName: '',
};

interface CourseContextValue {
  progress: CourseProgress;
  completionPercentage: number;
  navigateTo: (page: PageId) => void;
  goNext: () => void;
  goBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  setMode: (mode: ClassroomMode) => void;
  toggleProjectorMode: () => void;
  toggleAnimations: () => void;
  markModuleComplete: (moduleId: PageId) => void;
  recordChallengeSuccess: (challengeId: string, points?: number, labId?: string) => void;
  setAssessmentScore: (score: number) => void;
  setFinalSecurityScore: (score: number) => void;
  setFinalQuizAnswer: (questionId: string, optionIndex: number) => void;
  submitFinalQuiz: () => void;
  resetFinalQuiz: () => void;
  setStudentName: (name: string) => void;
  resetAllProgress: () => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

function loadInitialProgress(): CourseProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
      completedLabs: Array.isArray(parsed.completedLabs) ? parsed.completedLabs : [],
      answeredChallenges: parsed.answeredChallenges ?? {},
      finalQuizAnswers: parsed.finalQuizAnswers ?? {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>(loadInitialProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    document.title = PAGE_TITLES[progress.currentPage] ?? 'CloudSec Classroom';
  }, [progress.currentPage]);

  const currentIndex = PAGE_ORDER.indexOf(progress.currentPage);
  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < PAGE_ORDER.length - 1;

  const navigateTo = (page: PageId) => {
    setProgress((prev) => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (!canGoNext) return;
    const current = PAGE_ORDER[currentIndex];
    const next = PAGE_ORDER[currentIndex + 1];
    setProgress((prev) => {
      const isModule = MODULES.some((m) => m.id === current);
      const completedModules =
        isModule && !prev.completedModules.includes(current)
          ? [...prev.completedModules, current]
          : prev.completedModules;
      return {
        ...prev,
        currentPage: next,
        completedModules,
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (!canGoBack) return;
    const prevPage = PAGE_ORDER[currentIndex - 1];
    setProgress((prev) => ({ ...prev, currentPage: prevPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setMode = (mode: ClassroomMode) => {
    setProgress((prev) => ({ ...prev, mode }));
  };

  const toggleProjectorMode = () => {
    setProgress((prev) => ({ ...prev, projectorMode: !prev.projectorMode }));
  };

  const toggleAnimations = () => {
    setProgress((prev) => ({ ...prev, animationsPaused: !prev.animationsPaused }));
  };

  const markModuleComplete = (moduleId: PageId) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      };
    });
  };

  const recordChallengeSuccess = (challengeId: string, points = 10, labId?: string) => {
    setProgress((prev) => {
      const alreadyAnswered = Boolean(prev.answeredChallenges[challengeId]);
      const completedLabs =
        labId && !prev.completedLabs.includes(labId)
          ? [...prev.completedLabs, labId]
          : prev.completedLabs;
      if (alreadyAnswered && (!labId || prev.completedLabs.includes(labId))) {
        return prev;
      }
      return {
        ...prev,
        earnedPoints: alreadyAnswered ? prev.earnedPoints : prev.earnedPoints + points,
        answeredChallenges: {
          ...prev.answeredChallenges,
          [challengeId]: true,
        },
        completedLabs,
      };
    });
  };

  const setAssessmentScore = (assessmentScore: number) => {
    setProgress((prev) => ({ ...prev, assessmentScore }));
  };

  const setFinalSecurityScore = (finalSecurityScore: number) => {
    setProgress((prev) => ({ ...prev, finalSecurityScore }));
  };

  const setFinalQuizAnswer = (questionId: string, optionIndex: number) => {
    setProgress((prev) => ({
      ...prev,
      finalQuizAnswers: {
        ...prev.finalQuizAnswers,
        [questionId]: optionIndex,
      },
    }));
  };

  const submitFinalQuiz = () => {
    setProgress((prev) => ({ ...prev, finalQuizSubmitted: true }));
  };

  const resetFinalQuiz = () => {
    setProgress((prev) => ({
      ...prev,
      finalQuizAnswers: {},
      finalQuizSubmitted: false,
    }));
  };

  const setStudentName = (studentName: string) => {
    setProgress((prev) => ({ ...prev, studentName }));
  };

  const resetAllProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const totalMilestones = MODULES.length + 2;
  const completedCount =
    progress.completedModules.length +
    (progress.finalSecurityScore === 100 ? 1 : 0) +
    (progress.finalQuizSubmitted ? 1 : 0);
  const completionPercentage = Math.min(
    100,
    Math.round((completedCount / totalMilestones) * 100)
  );

  return (
    <CourseContext.Provider
      value={{
        progress,
        completionPercentage,
        navigateTo,
        goNext,
        goBack,
        canGoNext,
        canGoBack,
        setMode,
        toggleProjectorMode,
        toggleAnimations,
        markModuleComplete,
        recordChallengeSuccess,
        setAssessmentScore,
        setFinalSecurityScore,
        setFinalQuizAnswer,
        submitFinalQuiz,
        resetFinalQuiz,
        setStudentName,
        resetAllProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) {
    throw new Error('useCourse must be used inside CourseProvider');
  }
  return ctx;
}
