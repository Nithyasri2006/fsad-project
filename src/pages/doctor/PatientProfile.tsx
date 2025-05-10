
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, ClipboardList, PillIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { 
    getPatientById, 
    getAppointmentsByPatientId, 
    getMedicalRecordsByPatientId,
    getPrescriptionsByPatientId
  } = useData();

  // Get patient information
  const patient = id ? getPatientById(id) : null;
  
  // Get patient's appointments
  const appointments = patient ? getAppointmentsByPatientId(patient.id) : [];
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get patient's medical records
  const medicalRecords = patient ? getMedicalRecordsByPatientId(patient.id) : [];
  const sortedMedicalRecords = [...medicalRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get patient's prescriptions
  const prescriptions = patient ? getPrescriptionsByPatientId(patient.id) : [];
  const sortedPrescriptions = [...prescriptions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Check if doctor has access to this patient
  const doctorObject = user ? { id: user.id, patients: (user as any).patients || [] } : { id: '', patients: [] };
  const hasAccess = patient && doctorObject.patients.includes(patient.id);

  // Redirect if no access
  useEffect(() => {
    if (id && (!patient || !hasAccess)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this patient's profile.",
        variant: "destructive",
      });
      navigate("/doctor/patients");
    }
  }, [id, patient, hasAccess, navigate, toast]);

  if (!patient) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title={`Patient: ${patient.name}`}
          description="Comprehensive patient overview"
        >
          <div className="flex gap-3">
            <Link to={`/doctor/medical-records/create?patientId=${patient.id}`}>
              <Button size="sm">
                <ClipboardList className="mr-2 h-4 w-4" />
                Add Medical Record
              </Button>
            </Link>
            <Link to={`/doctor/prescriptions/create?patientId=${patient.id}`}>
              <Button size="sm" variant="outline">
                <PillIcon className="mr-2 h-4 w-4" />
                Create Prescription
              </Button>
            </Link>
          </div>
        </PageHeader>

        {/* Patient Information Card */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex items-start gap-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p>{patient.age} years old</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p>{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{patient.email}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{patient.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Patient Data */}
        <Tabs defaultValue="medical-records" className="mt-6">
          <TabsList>
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Medical Records */}
          <TabsContent value="medical-records">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Medical Records</h2>
                <Link to={`/doctor/medical-records/create?patientId=${patient.id}`}>
                  <Button size="sm">Add New Record</Button>
                </Link>
              </div>
              
              {sortedMedicalRecords.length > 0 ? (
                <div className="space-y-4">
                  {sortedMedicalRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <ClipboardList className="h-5 w-5 mr-2 text-green-600" />
                        <h3 className="font-medium">{record.diagnosis}</h3>
                        <span className="ml-auto text-sm text-gray-500">
                          {formatDate(record.date)}
                        </span>
                      </div>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                        {record.notes}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <ClipboardList className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No medical records found</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Prescriptions */}
          <TabsContent value="prescriptions">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Prescriptions</h2>
                <Link to={`/doctor/prescriptions/create?patientId=${patient.id}`}>
                  <Button size="sm">Create New Prescription</Button>
                </Link>
              </div>
              
              {sortedPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {sortedPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <PillIcon className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Prescription</h3>
                        <span className="ml-auto text-sm text-gray-500">
                          {formatDate(prescription.date)}
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-md p-3 mb-3">
                        <h4 className="text-sm font-medium mb-2">Medications:</h4>
                        <ul className="space-y-2">
                          {prescription.medications.map((med, index) => (
                            <li key={index} className="text-sm">
                              <span className="font-medium">{med.name}</span>: {med.dosage}, {med.frequency}, for {med.duration}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {prescription.instructions && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                          <p className="text-sm text-gray-700">{prescription.instructions}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <PillIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No prescriptions found</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Appointments */}
          <TabsContent value="appointments">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Appointment History</h2>
              
              {sortedAppointments.length > 0 ? (
                <div className="space-y-4">
                  {sortedAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                        <div>
                          <p className="font-medium">
                            {formatDate(appointment.date)} at {appointment.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status: <span className={`font-medium ${
                              appointment.status === 'completed' ? 'text-green-600' : 
                              appointment.status === 'cancelled' ? 'text-red-600' : 
                              'text-blue-600'
                            }`}>{appointment.status}</span>
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-500 mt-1">
                              Notes: {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No appointments found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default PatientProfile;
