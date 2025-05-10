import { useEffect, useState } from "react";
import { formatDate } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientNavbar from "@/components/patient/PatientNavbar";
import PageHeader from "@/components/PageHeader";
import { PillIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockUser = { id: "user123", name: "John Doe" };

const mockDoctors = [
  { id: "doc1", name: "Alice Smith" },
  { id: "doc2", name: "Bob Johnson" },
];

const mockPrescriptions = [
  {
    id: "presc1",
    patientId: "user123",
    doctorId: "doc1",
    date: "2025-05-08",
    isViewed: false,
    medications: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "2 times a day",
        duration: "5 days",
      },
    ],
    instructions: "Take after meals.",
  },
  {
    id: "presc2",
    patientId: "user123",
    doctorId: "doc2",
    date: "2025-05-04",
    isViewed: true,
    medications: [
      {
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "3 times a day",
        duration: "3 days",
      },
    ],
    instructions: "Avoid alcohol.",
  },
];

const PatientPrescriptions = () => {
  const [user] = useState(mockUser);
  const [prescriptions, setPrescriptions] = useState(
    mockPrescriptions.filter((p) => p.patientId === mockUser.id)
  );

  const getDoctorById = (id: string) =>
    mockDoctors.find((doc) => doc.id === id);

  const updatePrescription = (id: string, updates: Partial<typeof mockPrescriptions[0]>) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  useEffect(() => {
    prescriptions.forEach((prescription) => {
      if (!prescription.isViewed) {
        updatePrescription(prescription.id, { isViewed: true });
      }
    });
  }, [prescriptions]);

  const sortedPrescriptions = [...prescriptions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handlePrintPrescription = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PatientNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader title="Prescriptions" description="View your prescriptions" />
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">Your Prescriptions</h2>

          {sortedPrescriptions.length > 0 ? (
            <div className="space-y-6">
              {sortedPrescriptions.map((prescription) => {
                const doctor = getDoctorById(prescription.doctorId);
                return (
                  <div key={prescription.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <PillIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Prescription</h3>
                          <p className="text-sm text-gray-600">
                            Prescribed by Dr. {doctor?.name || "Unknown"} on{" "}
                            {formatDate(prescription.date)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={handlePrintPrescription}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                    </div>

                    <div className="bg-gray-50 rounded-md p-4 mb-4">
                      <h4 className="font-medium mb-2">Medications:</h4>
                      <ul className="space-y-3">
                        {prescription.medications.map((med, index) => (
                          <li key={index} className="bg-white p-3 rounded border">
                            <p className="font-medium">{med.name}</p>
                            <div className="text-sm text-gray-600 mt-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <span>Dosage: {med.dosage}</span>
                              <span>Frequency: {med.frequency}</span>
                              <span>Duration: {med.duration}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {prescription.instructions && (
                      <div>
                        <h4 className="font-medium mb-1">Instructions:</h4>
                        <p className="text-gray-700 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                          {prescription.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <PillIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No prescriptions</h3>
              <p className="text-gray-500 mt-1">You don't have any prescriptions yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientPrescriptions;
