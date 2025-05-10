
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-6xl font-bold text-health-blue-600">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-gray-600">
            We couldn't find the page you're looking for. The page might have been removed, renamed, or might be temporarily unavailable.
          </p>
          <div className="pt-4">
            <Link to="/">
              <Button className="bg-health-blue-600 hover:bg-health-blue-700">
                Return to Home Page
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
