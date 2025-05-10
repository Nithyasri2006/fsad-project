import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate, formatTime, getTodayDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/StatusBadge";
import { Appointment } from "@/types";

const DoctorAppointments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    getAppointmentsByDoctorId, 
    updateAppointment,
    getPatientById // We now use this from the context
  } = useData();

  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  // Get doctor's appointments
  const doctorAppointments = user ? getAppointmentsByDoctorId(user.id) : [];
  
  // Filter appointments by selected date
  const appointmentsForDate = doctorAppointments.filter(a => a.date === selectedDate);
  
  // Separate appointments by status
  const scheduledAppointments = doctorAppointments.filter(a => a.status === "scheduled");
  const completedAppointments = doctorAppointments.filter(a => a.status === "completed");
  const cancelledAppointments = doctorAppointments.filter(a => a.status === "cancelled");

  // Handle complete appointment
  const handleCompleteAppointment = (appointment: Appointment) => {
    updateAppointment(appointment.id, { status: "completed" });
    toast({
      title: "Appointment Completed",
      description: "The appointment has been marked as completed",
    });
  };

  // Handle cancel appointment
  const handleCancelAppointment = (appointment: Appointment) => {
    updateAppointment(appointment.id, { status: "cancelled" });
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been cancelled",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Appointments" 
          description="Manage your appointments"
        />

        <Tabs defaultValue="scheduled" className="mt-6">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled ({scheduledAppointments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          {/* Scheduled Appointments */}
          <TabsContent value="scheduled">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Scheduled Appointments</h2>
              
              {scheduledAppointments.length > 0 ? (
                <div className="space-y-4">
                  {scheduledAppointments.map((appointment) => {
                    const patient = getPatientById(appointment.patientId);
                    return (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{patient?.name || "Unknown Patient"}</p>
                              <p className="text-sm text-gray-600">
                                {formatDate(appointment.date)} at {formatTime(appointment.time)}
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Notes: {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleCompleteAppointment(appointment)}
                            >
                              <Check className="h-4 w-4 mr-1" /> Complete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleCancelAppointment(appointment)}
                            >
                              <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">No scheduled appointments</h3>
                  <p className="text-gray-500 mt-1">You don't have any upcoming appointments.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Completed Appointments */}
          <TabsContent value="completed">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Completed Appointments</h2>
              
              {completedAppointments.length > 0 ? (
                <div className="space-y-4">
                  {completedAppointments.map((appointment) => {
                    const patient = getPatientById(appointment.patientId);
                    return (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                              <Calendar className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">{patient?.name || "Unknown Patient"}</p>
                              <p className="text-sm text-gray-600">
                                {formatDate(appointment.date)} at {formatTime(appointment.time)}
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Notes: {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <StatusBadge status={appointment.status} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">No completed appointments</h3>
                  <p className="text-gray-500 mt-1">Completed appointments will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Cancelled Appointments */}
          <TabsContent value="cancelled">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Cancelled Appointments</h2>
              
              {cancelledAppointments.length > 0 ? (
                <div className="space-y-4">
                  {cancelledAppointments.map((appointment) => {
                    const patient = getPatientById(appointment.patientId);
                    return (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className="bg-red-100 p-3 rounded-full">
                              <Calendar className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">{patient?.name || "Unknown Patient"}</p>
                              <p className="text-sm text-gray-600">
                                {formatDate(appointment.date)} at {formatTime(appointment.time)}
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Notes: {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <StatusBadge status={appointment.status} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">No cancelled appointments</h3>
                  <p className="text-gray-500 mt-1">Cancelled appointments will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Calendar View</h2>
              
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="p-2 border rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-3">Appointments for {formatDate(selectedDate)}</h3>
                
                {appointmentsForDate.length > 0 ? (
                  <div className="space-y-4">
                    {appointmentsForDate
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => {
                        const patient = getPatientById(appointment.patientId);
                        return (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                  <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{patient?.name || "Unknown Patient"}</p>
                                  <p className="text-sm text-gray-600">
                                    {formatTime(appointment.time)}
                                  </p>
                                  {appointment.notes && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      Notes: {appointment.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <StatusBadge status={appointment.status} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No appointments for this date</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorAppointments;
