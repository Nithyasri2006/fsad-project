
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientNavbar from "@/components/patient/PatientNavbar";
import DashboardCard from "@/components/DashboardCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Bell, PillIcon } from "lucide-react";

const PatientDashboard = () => {
  const { user } = useAuth();
  const { getAppointmentsByPatientId, getPrescriptionsByPatientId } = useData();

  // Get upcoming appointments
  const appointments = user ? getAppointmentsByPatientId(user.id) : [];
  const upcomingAppointments = appointments
    .filter((appointment) => new Date(appointment.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get recent prescriptions
  const prescriptions = user ? getPrescriptionsByPatientId(user.id) : [];
  const recentPrescriptions = prescriptions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Count unread prescriptions
  const unreadPrescriptions = prescriptions.filter((p) => !p.isViewed).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PatientNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title={`Welcome, ${user?.name}`}
          description="Manage your health records and appointments"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Upcoming Appointments Card */}
          <DashboardCard
            title="Upcoming Appointments"
            icon={<Calendar className="h-5 w-5" />}
          >
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-50 p-3 rounded-md text-sm"
                  >
                    <p className="font-medium">{formatDate(appointment.date)}</p>
                    <p className="text-gray-500">
                      Time: {appointment.time}
                    </p>
                  </div>
                ))}
                <Link to="/patient/appointments">
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-health-blue-600 border-health-blue-600 hover:bg-health-blue-50"
                  >
                    View All Appointments
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming appointments</p>
                <Link to="/patient/appointments" className="block mt-4">
                  <Button>Book an Appointment</Button>
                </Link>
              </div>
            )}
          </DashboardCard>

          {/* Recent Prescriptions Card */}
          <DashboardCard
            title="Recent Prescriptions"
            icon={<PillIcon className="h-5 w-5" />}
          >
            {recentPrescriptions.length > 0 ? (
              <div className="space-y-3">
                {recentPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="bg-gray-50 p-3 rounded-md text-sm"
                  >
                    <p className="font-medium">{formatDate(prescription.date)}</p>
                    <p className="text-gray-500">
                      {prescription.medications.length} medication(s)
                    </p>
                  </div>
                ))}
                <Link to="/patient/prescriptions">
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-health-blue-600 border-health-blue-600 hover:bg-health-blue-50"
                  >
                    View All Prescriptions
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No prescriptions yet</p>
              </div>
            )}
          </DashboardCard>

          {/* Medical History Card */}
          <DashboardCard
            title="Medical History"
            icon={<ClipboardList className="h-5 w-5" />}
          >
            <div className="text-center py-6">
              <p className="text-gray-500">Access your complete medical records</p>
              <Link to="/patient/medical-history" className="block mt-4">
                <Button>View Medical History</Button>
              </Link>
            </div>
          </DashboardCard>

          {/* Notifications Card */}
          <DashboardCard
            title="Notifications"
            icon={<Bell className="h-5 w-5" />}
            className="md:col-span-2 lg:col-span-3"
          >
            <div className="space-y-4">
              {unreadPrescriptions > 0 && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <PillIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        You have {unreadPrescriptions} unread prescription{unreadPrescriptions > 1 ? 's' : ''}.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {upcomingAppointments.length > 0 && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Calendar className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        You have an upcoming appointment on {formatDate(upcomingAppointments[0].date)} at {upcomingAppointments[0].time}.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {unreadPrescriptions === 0 && upcomingAppointments.length === 0 && (
                <p className="text-center text-gray-500">No new notifications</p>
              )}
            </div>
          </DashboardCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
