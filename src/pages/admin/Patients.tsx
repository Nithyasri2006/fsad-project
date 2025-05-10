
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/admin/AdminNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Search, UserPlus } from "lucide-react";

const AdminPatients = () => {
  const { patients, doctors, deletePatient, assignDoctorToPatient } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignDoctor = () => {
    if (selectedPatient && selectedDoctor) {
      assignDoctorToPatient(selectedDoctor, selectedPatient);
      setSelectedPatient(null);
      setSelectedDoctor("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Patients Management" 
          description="View and manage patient accounts"
        >
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> 
            Add New Patient
          </Button>
        </PageHeader>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <h2 className="text-xl font-semibold mb-4 md:mb-0">Patients List</h2>
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
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 pl-4">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Age</th>
                    <th className="pb-3">Gender</th>
                    <th className="pb-3">Assigned Doctor</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => {
                    const assignedDoctor = patient.assignedDoctorId 
                      ? doctors.find(d => d.id === patient.assignedDoctorId) 
                      : null;
                      
                    return (
                      <tr key={patient.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 pl-4">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            {patient.name}
                          </div>
                        </td>
                        <td className="py-4">{patient.email}</td>
                        <td className="py-4">{patient.age}</td>
                        <td className="py-4 capitalize">{patient.gender}</td>
                        <td className="py-4">
                          {assignedDoctor ? (
                            <span>Dr. {assignedDoctor.name}</span>
                          ) : (
                            <span className="text-gray-500">Not assigned</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedPatient(patient.id)}
                              >
                                Assign Doctor
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Assign Doctor to {patient.name}</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <Select 
                                  value={selectedDoctor} 
                                  onValueChange={setSelectedDoctor}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a doctor" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {doctors.map(doctor => (
                                      <SelectItem key={doctor.id} value={doctor.id}>
                                        Dr. {doctor.name} - {doctor.specialization}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end gap-3">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button onClick={handleAssignDoctor}>Assign</Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="ml-2"
                            onClick={() => deletePatient(patient.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No patients found</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm 
                  ? "No patients match your search criteria." 
                  : "There are no patients in the system yet."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPatients;
