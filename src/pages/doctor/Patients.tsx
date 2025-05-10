
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Search } from "lucide-react";
import { Patient } from "@/types";

const DoctorPatients = () => {
  const { user } = useAuth();
  const { patients } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  // Get doctor's assigned patients
  const doctorObject = user ? { id: user.id, patients: (user as any).patients || [] } : { id: '', patients: [] };
  const doctorPatients = patients.filter(p => doctorObject.patients.includes(p.id));

  // Filter patients based on search term
  const filteredPatients = doctorPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DoctorNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="My Patients" 
          description="View and manage your patients"
        />

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <h2 className="text-xl font-semibold mb-4 md:mb-0">Patient List</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredPatients.length > 0 ? (
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-600">
                          {patient.age} years old, {patient.gender}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{patient.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link to={`/doctor/patients/${patient.id}`}>
                        <Button size="sm">View Profile</Button>
                      </Link>
                      <Link to={`/doctor/medical-records/create?patientId=${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Add Medical Record
                        </Button>
                      </Link>
                      <Link to={`/doctor/prescriptions/create?patientId=${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Create Prescription
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No patients found</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm 
                  ? "No patients match your search criteria." 
                  : "You don't have any patients assigned yet."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorPatients;
