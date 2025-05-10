
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { getDashboardRoute } from "@/utils/helpers";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-health-blue-600">
            HealthRecord
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-health-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-health-blue-500">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-health-blue-500">
            Contact
          </Link>
          
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to={getDashboardRoute(user.role)} 
                className="text-sm font-medium hover:text-health-blue-500"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{user.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px]">
              <nav className="flex flex-col h-full py-6">
                <div className="flex-1 space-y-4">
                  <Link to="/" className="block py-2 text-lg font-medium">
                    Home
                  </Link>
                  <Link to="/about" className="block py-2 text-lg font-medium">
                    About Us
                  </Link>
                  <Link to="/contact" className="block py-2 text-lg font-medium">
                    Contact
                  </Link>

                  {isAuthenticated && user && (
                    <>
                      <div className="my-4 border-t pt-4">
                        <Link 
                          to={getDashboardRoute(user.role)} 
                          className="block py-2 text-lg font-medium"
                        >
                          Dashboard
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center space-x-2 mb-4">
                        <User size={16} />
                        <span>{user.name}</span>
                      </div>
                      <Button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <Link to="/login" className="block">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register" className="block">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
