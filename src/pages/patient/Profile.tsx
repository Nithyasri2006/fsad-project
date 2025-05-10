
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientNavbar from "@/components/patient/PatientNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, MapPin, Calendar, ClipboardList, PillIcon } from "lucide-react";

const PatientProfile = () => {
  const { user } = useAuth();
  const { 
    updateUser, 
    getAppointmentsByPatientId, 
    getMedicalRecordsByPatientId,
    getPrescriptionsByPatientId,
    getDoctorById
  } = useData();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: (user as any)?.address || "",
  });

  // Get patient data
  const appointments = user ? getAppointmentsByPatientId(user.id) : [];
  const medicalRecords = user ? getMedicalRecordsByPatientId(user.id) : [];
  const prescriptions = user ? getPrescriptionsByPatientId(user.id) : [];
  
  // Sort data by date (newest first)
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);
  
  const sortedRecords = [...medicalRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);
  
  const sortedPrescriptions = [...prescriptions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle save profile
  const handleSaveProfile = () => {
    if (user) {
      updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        ...(user.role === "patient" && { address: formData.address }),
      });
      setIsEditing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PatientNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader title="My Profile" description="View and manage your profile information" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                {!isEditing ? (
                  <div className="space-y-4 w-full">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p>{user.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    
                    {user.role === "patient" && (
                      <>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p>{(user as any).address}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Age & Gender</p>
                            <p>{(user as any).age} years, {(user as any).gender}</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <Button onClick={() => setIsEditing(true)} className="w-full mt-4">
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 w-full">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    {user.role === "patient" && (
                      <div>
                        <label className="text-sm text-gray-500">Address</label>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    )}
                    
                    <div className="flex space-x-2 mt-4">
                      <Button onClick={() => setIsEditing(false)} variant="outline" className="w-full">
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* History Overview */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Health Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="appointments">
                <TabsList className="mb-6">
                  <TabsTrigger value="appointments">Recent Appointments</TabsTrigger>
                  <TabsTrigger value="records">Medical Records</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="appointments">
                  {sortedAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {sortedAppointments.map(appointment => {
                        const doctor = getDoctorById(appointment.doctorId);
                        return (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                              <div>
                                <h3 className="font-medium">Dr. {doctor?.name || "Unknown"}</h3>
                                <p className="text-sm text-gray-500">
                                  {formatDate(appointment.date)} at {appointment.time}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Status: <span className={`font-medium ${
                                    appointment.status === "scheduled" ? "text-blue-600" :
                                    appointment.status === "completed" ? "text-green-600" :
                                    "text-red-600"
                                  }`}>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <Button variant="outline" className="w-full">
                        <a href="/patient/appointments">View All Appointments</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No appointments found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="records">
                  {sortedRecords.length > 0 ? (
                    <div className="space-y-4">
                      {sortedRecords.map(record => {
                        const doctor = getDoctorById(record.doctorId);
                        return (
                          <div key={record.id} className="border rounded-lg p-4">
                            <div className="flex items-start">
                              <ClipboardList className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                              <div>
                                <h3 className="font-medium">{record.diagnosis}</h3>
                                <p className="text-sm text-gray-500">
                                  Dr. {doctor?.name || "Unknown"} on {formatDate(record.date)}
                                </p>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {record.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <Button variant="outline" className="w-full">
                        <a href="/patient/medical-history">View Full Medical History</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <ClipboardList className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No medical records found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="prescriptions">
                  {sortedPrescriptions.length > 0 ? (
                    <div className="space-y-4">
                      {sortedPrescriptions.map(prescription => {
                        const doctor = getDoctorById(prescription.doctorId);
                        return (
                          <div key={prescription.id} className="border rounded-lg p-4">
                            <div className="flex items-start">
                              <PillIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                              <div>
                                <h3 className="font-medium">Prescription</h3>
                                <p className="text-sm text-gray-500">
                                  Dr. {doctor?.name || "Unknown"} on {formatDate(prescription.date)}
                                </p>
                                <ul className="text-sm text-gray-600 mt-1">
                                  {prescription.medications.map((med, idx) => (
                                    <li key={idx}>{med.name}: {med.dosage}, {med.frequency}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <Button variant="outline" className="w-full">
                        <a href="/patient/prescriptions">View All Prescriptions</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <PillIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No prescriptions found</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientProfile;
