import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md group-hover:shadow-glow-ai transition-shadow duration-300">
              <span className="text-xl">♻</span>
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              AI Waste Segregation
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium transition-all duration-200"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
