
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DashboardCard from "@/components/DashboardCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Users, ClipboardList } from "lucide-react";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { getAppointmentsByDoctorId, patients, getPatientById } = useData();

  // Get doctor's appointments
  const appointments = user ? getAppointmentsByDoctorId(user.id) : [];
  const upcomingAppointments = appointments
    .filter((appointment) => new Date(appointment.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Get doctor's patients
  const doctorObject = user ? { id: user.id, patients: (user as any).patients || [] } : { id: '', patients: [] };
  const doctorPatients = doctorObject.patients
    .map((patientId: string) => getPatientById(patientId))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title={`Welcome, Dr. ${user?.name}`}
          description="Manage your patients and appointments"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Today's Appointments */}
          <DashboardCard
            title="Today's Appointments"
            icon={<Calendar className="h-5 w-5" />}
          >
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.slice(0, 3).map((appointment) => {
                  const patient = getPatientById(appointment.patientId);
                  return (
                    <div
                      key={appointment.id}
                      className="bg-gray-50 p-3 rounded-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{patient?.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(appointment.date)} at {appointment.time}
                          </p>
                        </div>
                        <StatusBadge status={appointment.status} />
                      </div>
                    </div>
                  );
                })}
                <Link to="/doctor/appointments">
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
                <Link to="/doctor/appointments" className="block mt-4">
                  <Button>Schedule an Appointment</Button>
                </Link>
              </div>
            )}
          </DashboardCard>

          {/* My Patients */}
          <DashboardCard
            title="My Patients"
            icon={<Users className="h-5 w-5" />}
          >
            {doctorPatients.length > 0 ? (
              <div className="space-y-3">
                {doctorPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-gray-50 p-3 rounded-md"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">
                          {patient.age} years old, {patient.gender}
                        </p>
                      </div>
                      <Link to={`/doctor/patients/${patient.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-health-blue-600 hover:text-health-blue-700 hover:bg-health-blue-50"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                <Link to="/doctor/patients">
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-health-blue-600 border-health-blue-600 hover:bg-health-blue-50"
                  >
                    View All Patients
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No patients assigned yet</p>
              </div>
            )}
          </DashboardCard>

          {/* Quick Actions */}
          <DashboardCard
            title="Quick Actions"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/doctor/medical-records/create">
                <Button className="w-full bg-health-blue-600 hover:bg-health-blue-700">
                  Add Medical Record
                </Button>
              </Link>
              <Link to="/doctor/prescriptions/create">
                <Button className="w-full bg-health-green-600 hover:bg-health-green-700">
                  Create Prescription
                </Button>
              </Link>
              <Link to="/doctor/appointments/schedule">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Schedule Appointment
                </Button>
              </Link>
              <Link to="/doctor/patients">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  View All Patients
                </Button>
              </Link>
            </div>
          </DashboardCard>
        </div>

        <div className="mt-6">
          <DashboardCard
            title="Recent Medical Records"
            icon={<ClipboardList className="h-5 w-5" />}
          >
            <div className="text-center py-6">
              <p className="text-gray-500">Access and manage patient medical records</p>
              <Link to="/doctor/medical-records" className="block mt-4">
                <Button>View Medical Records</Button>
              </Link>
            </div>
          </DashboardCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
