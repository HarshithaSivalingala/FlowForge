import { useApp } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { WorkOrderPage } from './pages/WorkOrderPage';

function App() {
  const { currentPage } = useApp();

  return (
    <>
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'workorder' && <WorkOrderPage />}
    </>
  );
}

export default App;
