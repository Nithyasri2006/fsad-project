
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
import { PillIcon, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Medication } from "@/types";

const CreatePrescription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const { user } = useAuth();
  const { toast } = useToast();
  const { getPatientById, addPrescription } = useData();

  // Get patient information
  const patient = patientId ? getPatientById(patientId) : null;

  // State for prescription form
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);
  const [instructions, setInstructions] = useState("");

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

  // Handle adding new medication
  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  // Handle removing medication
  const handleRemoveMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setMedications(newMedications);
  };

  // Handle medication field change
  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  // Handle submitting the prescription
  const handleSubmitPrescription = () => {
    // Validate form
    if (!user || !patient) {
      toast({
        title: "Error",
        description: "Doctor or patient information is missing.",
        variant: "destructive",
      });
      return;
    }

    const validMedications = medications.filter(
      med => med.name.trim() && med.dosage.trim() && med.frequency.trim() && med.duration.trim()
    );

    if (validMedications.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one complete medication.",
        variant: "destructive",
      });
      return;
    }

    // Create the prescription
    const newPrescription = {
      id: generateId(),
      patientId: patient.id,
      doctorId: user.id,
      date: getTodayDate(),
      medications: validMedications,
      instructions: instructions.trim(),
      isViewed: false
    };

    addPrescription(newPrescription);
    toast({
      title: "Prescription Created",
      description: `Prescription for ${patient.name} has been created successfully.`,
    });
    navigate("/doctor/patients");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Create Prescription" 
          description={patient ? `Prescribing for ${patient.name}` : "Create a new prescription"}
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

              {/* Medications */}
              <div>
                <h3 className="text-lg font-medium mb-3">Medications</h3>
                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Medication {index + 1}</h4>
                        {medications.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMedication(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medication Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                            placeholder="e.g., Amoxicillin"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dosage
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                            placeholder="e.g., 500mg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Frequency
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={medication.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                            placeholder="e.g., Three times daily"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={medication.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                            placeholder="e.g., 7 days"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleAddMedication}
                  >
                    <Plus className="h-4 w-4" /> Add Another Medication
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Special Instructions
                </label>
                <textarea
                  className="w-full p-3 border rounded-md h-32"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Enter any special instructions or warnings..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleSubmitPrescription}
                >
                  <PillIcon className="h-5 w-5" /> Create Prescription
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <PillIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Patient Not Selected</h3>
              <p className="text-gray-500 mt-1">Please select a patient to create a prescription.</p>
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

export default CreatePrescription;
