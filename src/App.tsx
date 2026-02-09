import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { DataProvider } from './context/DataContext';
import { LoadingProvider } from './context/LoadingContext';
import GoLoader from './components/GoLoader';
import AiAssistant from './components/AiAssistant';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <DataProvider>
      <LoadingProvider>
        <Router>
          <GoLoader />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <AiAssistant />
          <BackToTop />
        </Router>
      </LoadingProvider>
    </DataProvider>
  );
}

export default App;
