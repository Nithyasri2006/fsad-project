
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-50 border-t">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">HealthRecord</h3>
            <p className="text-sm text-gray-500">
              Secure, efficient health record management for patients, doctors, and administrators.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Pages</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-health-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-health-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-health-blue-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Account</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/login" className="text-sm text-gray-500 hover:text-health-blue-500">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-500 hover:text-health-blue-500">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-6 mt-6 border-t md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HealthRecord. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-health-blue-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-health-blue-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
