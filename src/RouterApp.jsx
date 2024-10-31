import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import EmployeeRegistrationPage from './pages/EmployeeRegistrationPage';
import DashboardPage from './pages/Dashoard';
import EmployeeCVPreviewPage from './components/EmployeeCVPreviewPage';

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/register-employee" element={<EmployeeRegistrationPage />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/employee-cv-preview/:id" element={<EmployeeCVPreviewPage />} />
    </Routes>
  );
};

export default RouterApp;
