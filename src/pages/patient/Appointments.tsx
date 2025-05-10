import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientNavbar from "@/components/patient/PatientNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateId } from "@/utils/helpers";
import { Appointment } from "@/types";

const PatientAppointments = () => {
  const { user } = useAuth();
  const { 
    getAppointmentsByPatientId, 
    addAppointment,
    updateAppointment, 
    deleteAppointment, 
    doctors
  } = useData();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentNotes, setAppointmentNotes] = useState("");

  // Sample past appointments (replace with real data from API)
  const samplePastAppointments: Appointment[] = [
    {
      id: '1',
      patientId: '123',
      doctorId: '101',
      date: '2025-04-10',
      time: '10:00',
      status: 'completed',
      notes: 'Follow-up on blood pressure medication',
    },
    {
      id: '2',
      patientId: '123',
      doctorId: '102',
      date: '2025-03-15',
      time: '14:30',
      status: 'completed',
      notes: 'Annual check-up, all tests normal',
    },
  ];

  // Fetch appointments for the user when the component is mounted
  useEffect(() => {
    if (user) {
      const fetchedAppointments = getAppointmentsByPatientId(user.id);
      setAppointments(fetchedAppointments);
    }
  }, [user, getAppointmentsByPatientId]);

  // Sort appointments by date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= today
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastAppointments = samplePastAppointments.filter(
    (appointment) => new Date(appointment.date) < today
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Handle new appointment
  const handleBookAppointment = () => {
    if (user && selectedDate && selectedTime && selectedDoctor) {
      const newAppointment: Appointment = {
        id: generateId(),
        patientId: user.id,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        status: "scheduled",
        notes: appointmentNotes
      };
      
      addAppointment(newAppointment);
      
      // Reset form fields
      setSelectedDate("");
      setSelectedTime("");
      setSelectedDoctor("");
      setAppointmentNotes("");
    }
  };

  // Handle cancel appointment
  const handleCancelAppointment = (appointmentId: string) => {
    updateAppointment(appointmentId, { status: "cancelled" });
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      slots.push(`${i}:00`);
      if (i < 17) slots.push(`${i}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PatientNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Appointments" 
          description="Schedule and manage your appointments"
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>Book Appointment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="doctor">Select Doctor</label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          Dr. {doctor.name} - {doctor.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="date">Select Date</label>
                  <Input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="time">Select Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="notes">Notes (Optional)</label>
                  <Input
                    id="notes"
                    placeholder="Any additional information"
                    value={appointmentNotes}
                    onChange={(e) => setAppointmentNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleBookAppointment}>Book Appointment</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </PageHeader>

        <div className="mt-6 space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  return (
                    <div
                      key={appointment.id}
                      className={`border rounded-lg p-4 ${appointment.status === "cancelled" ? "bg-gray-100" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              Appointment with Dr. {doctor?.name || "Unknown"}
                            </h3>
                            <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                            <div className="flex items-center mt-2">
                              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm">{formatDate(appointment.date)}</span>
                              <Clock className="h-4 w-4 ml-3 mr-1 text-gray-500" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                            {appointment.notes && (
                              <p className="text-sm mt-2 text-gray-700">
                                Notes: {appointment.notes}
                              </p>
                            )}
                            <p className="text-sm mt-2">
                              Status: <span className={`font-medium ${appointment.status === "scheduled" ? "text-blue-600" : appointment.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </p>
                          </div>
                        </div>
                        {appointment.status === "scheduled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">No upcoming appointments</h3>
                <p className="text-gray-500 mt-1">
                  You don't have any upcoming appointments scheduled.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
            {pastAppointments.length > 0 ? (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  return (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Calendar className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Appointment with Dr. {doctor?.name || "Unknown"}
                          </h3>
                          <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                          <div className="flex items-center mt-2">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">{formatDate(appointment.date)}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1 text-gray-500" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm mt-2 text-gray-700">
                              Notes: {appointment.notes}
                            </p>
                          )}
                          <p className="text-sm mt-2">
                            Status: <span className={`font-medium ${appointment.status === "completed" ? "text-green-600" : "text-gray-600"}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">No past appointments</h3>
                <p className="text-gray-500 mt-1">
                  Your appointment history will be shown here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientAppointments;
