import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/dashboard":
        return "Dashboard";
      case "/employees":
        return "Employees";
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      case "/register-employee":
        return "Register Employee";
      case location.pathname.startsWith("/edit-employee/") && location.pathname:
        return "Edit Employee";
      case location.pathname.startsWith("/employee-cv-preview/") && location.pathname:
        return "CV Preview";
      default:
        return "Taugor";
    }
  };
  

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src="/images/taugor_logo.png" alt="Logo" className="w-24 h-auto" />
        </Link>
        <div className="h-6 border-l-2 border-gray-300"></div>
        <h1 className="text-xl font-semibold text-gray-600">
          {getTitle()}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-6 border-l-2 border-gray-300"></div>
        <Link to="/dashboard" className="text-cyan-800 font-medium hover:text-cyan-700">
          <HomeIcon className="mr-1" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
