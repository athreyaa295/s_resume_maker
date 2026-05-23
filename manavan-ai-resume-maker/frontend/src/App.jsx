import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingPage from './pages/LoadingPage';
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import Templates from './pages/Templates';
import QuestionsPage from './pages/QuestionsPage';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <Routes>
        {/* Startup Flow */}
        <Route path="/resume-start" element={<LoadingPage />} />

        {/* Main Application with Sidebar/Navbar */}
        <Route path="/" element={<Navigate to="/resume-start" replace />} />

        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />

        <Route path="/resume-upload" element={
          <Layout>
            <UploadResume />
          </Layout>
        } />

        <Route path="/resume-template" element={
          <Layout>
            <Templates />
          </Layout>
        } />

        <Route path="/resume-questions" element={
          <Layout>
            <QuestionsPage />
          </Layout>
        } />

        <Route path="/resume-result" element={
          <Layout>
            <Analysis />
          </Layout>
        } />

        {/* Catch-all to Dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
