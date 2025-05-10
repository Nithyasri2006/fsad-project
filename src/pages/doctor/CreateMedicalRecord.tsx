
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { generateId, getTodayDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateMedicalRecord = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const { user } = useAuth();
  const { toast } = useToast();
  const { getPatientById, addMedicalRecord } = useData();

  // Get patient information
  const patient = patientId ? getPatientById(patientId) : null;

  // State for medical record form
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  // Redirect if patient not found
  useEffect(() => {
    if (patientId && !patient) {
      toast({
        title: "Patient Not Found",
        description: "The selected patient was not found.",
        variant: "destructive",
      });
      navigate("/doctor/patients");
    }
  }, [patientId, patient, navigate, toast]);

  // Handle submitting the medical record
  const handleSubmitRecord = () => {
    // Validate form
    if (!user || !patient) {
      toast({
        title: "Error",
        description: "Doctor or patient information is missing.",
        variant: "destructive",
      });
      return;
    }

    if (!diagnosis.trim()) {
      toast({
        title: "Error",
        description: "Please enter a diagnosis.",
        variant: "destructive",
      });
      return;
    }

    if (!notes.trim()) {
      toast({
        title: "Error",
        description: "Please enter clinical notes.",
        variant: "destructive",
      });
      return;
    }

    // Create the medical record
    const newRecord = {
      id: generateId(),
      patientId: patient.id,
      doctorId: user.id,
      date: getTodayDate(),
      diagnosis: diagnosis.trim(),
      notes: notes.trim()
    };

    addMedicalRecord(newRecord);
    toast({
      title: "Medical Record Created",
      description: `Medical record for ${patient.name} has been created successfully.`,
    });
    navigate("/doctor/patients");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Create Medical Record" 
          description={patient ? `Recording for ${patient.name}` : "Create a new medical record"}
        />

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          {patient ? (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-blue-700">Name</p>
                    <p className="font-medium">{patient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Age</p>
                    <p className="font-medium">{patient.age} years old</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Gender</p>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Enter primary diagnosis"
                  required
                />
              </div>

              {/* Clinical Notes */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Clinical Notes
                </label>
                <textarea
                  className="w-full p-3 border rounded-md h-40"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter detailed clinical notes, observations, and treatment plan..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleSubmitRecord}
                >
                  <ClipboardList className="h-5 w-5" /> Create Medical Record
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ClipboardList className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Patient Not Selected</h3>
              <p className="text-gray-500 mt-1">Please select a patient to create a medical record.</p>
              <Button 
                className="mt-4"
                onClick={() => navigate("/doctor/patients")}
              >
                Select Patient
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateMedicalRecord;
