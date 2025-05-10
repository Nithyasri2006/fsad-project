
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/admin/AdminNavbar";
import DashboardCard from "@/components/DashboardCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { UserCog, Users, Calendar, UserRound, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { doctors, patients, appointments, users } = useData();

  // Count active vs inactive users
  const activeUsers = users.filter(u => u.active).length;
  const inactiveUsers = users.length - activeUsers;

  // Count appointments by status
  const scheduledAppointments = appointments.filter(a => a.status === "scheduled").length;
  const completedAppointments = appointments.filter(a => a.status === "completed").length;
  const cancelledAppointments = appointments.filter(a => a.status === "cancelled").length;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title={`Welcome, ${user?.name}`}
          description="System overview and management"
        >
          <div className="flex gap-3">
            <Link to="/admin/doctors/create">
              <Button size="sm" className="bg-health-blue-600 hover:bg-health-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </Link>
            <Link to="/admin/patients/create">
              <Button size="sm" variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </Link>
          </div>
        </PageHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <DashboardCard
            title="Total Doctors"
            icon={<UserCog className="h-8 w-8 text-purple-500" />}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{doctors.length}</p>
              <p className="text-sm text-gray-500 mt-1">Registered doctors</p>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Total Patients"
            icon={<Users className="h-8 w-8 text-blue-500" />}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{patients.length}</p>
              <p className="text-sm text-gray-500 mt-1">Registered patients</p>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Appointments"
            icon={<Calendar className="h-8 w-8 text-green-500" />}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{appointments.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total appointments</p>
            </div>
          </DashboardCard>

          <DashboardCard
            title="System Users"
            icon={<UserRound className="h-8 w-8 text-orange-500" />}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{users.length}</p>
              <p className="text-sm text-gray-500 mt-1">Registered users</p>
            </div>
          </DashboardCard>
        </div>

        {/* User Status and Appointments Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DashboardCard title="User Status Overview">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Users</span>
                <span className="text-sm font-bold">{activeUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(activeUsers / users.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Inactive Users</span>
                <span className="text-sm font-bold">{inactiveUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gray-500 h-2.5 rounded-full" 
                  style={{ width: `${(inactiveUsers / users.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="pt-4 text-center">
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full">
                    Manage User Accounts
                  </Button>
                </Link>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Appointments Overview">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Scheduled</span>
                <span className="text-sm font-bold">{scheduledAppointments}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${(scheduledAppointments / appointments.length) * 100 || 0}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-sm font-bold">{completedAppointments}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(completedAppointments / appointments.length) * 100 || 0}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cancelled</span>
                <span className="text-sm font-bold">{cancelledAppointments}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${(cancelledAppointments / appointments.length) * 100 || 0}%` }}
                ></div>
              </div>
              
              <div className="pt-4 text-center">
                <Link to="/admin/appointments">
                  <Button variant="outline" className="w-full">
                    View All Appointments
                  </Button>
                </Link>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <DashboardCard title="Quick Actions">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/admin/doctors">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Manage Doctors
                </Button>
              </Link>
              <Link to="/admin/patients">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Manage Patients
                </Button>
              </Link>
              <Link to="/admin/users/activate">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Activate Users
                </Button>
              </Link>
              <Link to="/admin/doctor-patient/assign">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Assign Doctors
                </Button>
              </Link>
            </div>
          </DashboardCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
