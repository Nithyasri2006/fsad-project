import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientNavbar from "@/components/patient/PatientNavbar";
import PageHeader from "@/components/PageHeader";
import { ClipboardList } from "lucide-react";

const PatientMedicalHistory = () => {
  const { user } = useAuth();

  // Example medical records for demo/testing
  const exampleDoctors = {
    "doc1": { name: "Alice Smith" },
    "doc2": { name: "Robert Chen" },
  };

  const exampleMedicalRecords = [
    {
      id: "rec1",
      date: "2024-11-10",
      diagnosis: "Hypertension",
      notes: "Patient reports dizziness and frequent headaches. Recommended lifestyle changes and prescribed medication.",
      doctorId: "doc1",
    },
    {
      id: "rec2",
      date: "2023-06-18",
      diagnosis: "Seasonal Allergies",
      notes: "Prescribed antihistamines. Advised to avoid pollen-heavy areas.",
      doctorId: "doc2",
    },
    {
      id: "rec3",
      date: "2022-01-25",
      diagnosis: "Flu",
      notes: "Symptoms include fever, fatigue, and body aches. Advised rest and fluids.",
      doctorId: "doc1",
    },
  ];

  // Fallback to example records if user exists
  const medicalRecords = user ? exampleMedicalRecords : [];

  // Sort records by date (newest first)
  const sortedRecords = [...medicalRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getDoctorById = (id) => exampleDoctors[id];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PatientNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader title="Medical History" description="Your complete medical record" />

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">Medical Records</h2>
          
          {sortedRecords.length > 0 ? (
            <div className="space-y-6">
              {sortedRecords.map((record) => {
                const doctor = getDoctorById(record.doctorId);
                return (
                  <div key={record.id} className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <ClipboardList className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{record.diagnosis}</h3>
                        <p className="text-sm text-gray-600">
                          Dr. {doctor?.name || "Unknown"} on {formatDate(record.date)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-md p-4">
                      <h4 className="font-medium mb-2">Clinical Notes:</h4>
                      <p className="text-gray-700">{record.notes}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <ClipboardList className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No medical records</h3>
              <p className="text-gray-500 mt-1">Your medical history will appear here.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientMedicalHistory;
