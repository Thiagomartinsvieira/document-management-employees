import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import DashboardPage from './pages/Dashoard';
import PrivateRoute from './components/PrivateRoute';

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path='dashboard' element={<PrivateRoute> <DashboardPage /> </PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
