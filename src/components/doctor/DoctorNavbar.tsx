
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home,
  Calendar,
  Users,
  User
} from "lucide-react";

const DoctorNavbar = () => {
  const { pathname } = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/doctor/dashboard",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      name: "Appointments",
      href: "/doctor/appointments",
      icon: <Calendar className="h-5 w-5 mr-2" />,
    },
    {
      name: "Patients",
      href: "/doctor/patients",
      icon: <Users className="h-5 w-5 mr-2" />,
    },
    {
      name: "Profile",
      href: "/doctor/profile",
      icon: <User className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-x-auto py-2">
          {navigationItems.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "mr-2 whitespace-nowrap",
                  pathname === item.href && "bg-gray-100"
                )}
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
