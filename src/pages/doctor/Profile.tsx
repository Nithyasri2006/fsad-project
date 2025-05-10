
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Briefcase, Calendar, Users } from "lucide-react";

const DoctorProfile = () => {
  const { user } = useAuth();
  const { 
    updateUser, 
    getAppointmentsByDoctorId,
    patients,
    updateDoctor
  } = useData();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    specialization: (user as any)?.specialization || "",
  });

  // Get doctor data
  const appointments = user ? getAppointmentsByDoctorId(user.id) : [];
  const doctorPatients = user ? patients.filter(p => (user as any).patients?.includes(p.id)) : [];
  
  // Sort appointments by date (newest first)
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
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
        email: formData.email
      });
      
      if (user.role === "doctor") {
        updateDoctor(user.id, {
          specialization: formData.specialization
        });
      }
      
      setIsEditing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader title="Doctor Profile" description="View and manage your profile information" />
        
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
                        <p>Dr. {user.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Specialization</p>
                        <p>{(user as any).specialization}</p>
                      </div>
                    </div>
                    
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
                    
                    <div>
                      <label className="text-sm text-gray-500">Specialization</label>
                      <Input
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
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
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">Patients</span>
                    <p className="text-2xl font-bold">{doctorPatients.length}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Appointments</span>
                    <p className="text-2xl font-bold">{appointments.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Overview */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="appointments">
                <TabsList className="mb-6">
                  <TabsTrigger value="appointments">Recent Appointments</TabsTrigger>
                  <TabsTrigger value="patients">My Patients</TabsTrigger>
                </TabsList>
                
                <TabsContent value="appointments">
                  {recentAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {recentAppointments.map(appointment => {
                        const patient = patients.find(p => p.id === appointment.patientId);
                        return (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                                <div>
                                  <h3 className="font-medium">{patient?.name || "Unknown Patient"}</h3>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(appointment.date)} at {appointment.time}
                                  </p>
                                </div>
                              </div>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                appointment.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                                appointment.status === "completed" ? "bg-green-100 text-green-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <Button variant="outline" className="w-full">
                        <a href="/doctor/appointments">View All Appointments</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No appointments found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="patients">
                  {doctorPatients.length > 0 ? (
                    <div className="space-y-4">
                      {doctorPatients.slice(0, 5).map(patient => (
                        <div key={patient.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start">
                              <Users className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                              <div>
                                <h3 className="font-medium">{patient.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {patient.age} years, {patient.gender}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" asChild>
                              <a href={`/doctor/patients/${patient.id}`}>View</a>
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <a href="/doctor/patients">View All Patients</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No patients assigned yet</p>
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

export default DoctorProfile;
