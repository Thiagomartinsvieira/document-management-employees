import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <img src="/images/taugor_logo.png" alt="Taugor Logo" className="h-12 mr-2" />
          <h1 className="text-2xl font-bold text-blue-500">Taugor</h1>
        </div>

        <p className="text-gray-700 text-center mb-6">
          Welcome to Taugor! Our platform helps connect job seekers with employers quickly and easily.
          Get started by creating an account or log in to access your profile.
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/login" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-center">
            Login
          </Link>
          <Link to="/register" className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-100 transition text-center">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
