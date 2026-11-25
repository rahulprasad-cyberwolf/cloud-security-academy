import { ClassroomShell } from './components/ClassroomShell';
import { CourseProvider, useCourse } from './context/CourseContext';
import { DetectiveChallengePage } from './pages/DetectiveChallengePage';
import { FinalChallengePage } from './pages/FinalChallengePage';
import { FinalQuizPage } from './pages/FinalQuizPage';
import { FinalRecapPage } from './pages/FinalRecapPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { Module0Page } from './pages/Module0Page';
import { Module1Page } from './pages/Module1Page';
import { Module2Page } from './pages/Module2Page';
import { Module3Page } from './pages/Module3Page';
import { Module4Page } from './pages/Module4Page';
import { Module5Page } from './pages/Module5Page';
import { Module6Page } from './pages/Module6Page';
import { Module7Page } from './pages/Module7Page';
import { Module8Page } from './pages/Module8Page';
import { Module9Page } from './pages/Module9Page';
import { Module10Page } from './pages/Module10Page';
import { OverviewPage } from './pages/OverviewPage';

function ClassroomRouter() {
  const { progress } = useCourse();

  switch (progress.currentPage) {
    case 'home':
      return <HomePage />;
    case 'overview':
      return <OverviewPage />;
    case 'module-0':
      return <Module0Page />;
    case 'module-1':
      return <Module1Page />;
    case 'module-2':
      return <Module2Page />;
    case 'module-3':
      return <Module3Page />;
    case 'module-4':
      return <Module4Page />;
    case 'module-5':
      return <Module5Page />;
    case 'module-6':
      return <Module6Page />;
    case 'module-7':
      return <Module7Page />;
    case 'detective-challenge':
      return <DetectiveChallengePage />;
    case 'module-8':
      return <Module8Page />;
    case 'module-9':
      return <Module9Page />;
    case 'module-10':
      return <Module10Page />;
    case 'final-challenge':
      return <FinalChallengePage />;
    case 'final-recap':
      return <FinalRecapPage />;
    case 'glossary':
      return <GlossaryPage />;
    case 'final-quiz':
      return <FinalQuizPage />;
    default:
      return <HomePage />;
  }
}

export function App() {
  return (
    <CourseProvider>
      <ClassroomShell>
        <ClassroomRouter />
      </ClassroomShell>
    </CourseProvider>
  );
}

export default App;
