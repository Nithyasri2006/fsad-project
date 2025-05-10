
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { generateId } from "@/utils/helpers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/admin/AdminNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCog, Search, Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Doctor } from "@/types";

const AdminDoctors = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle add doctor
  const handleAddDoctor = () => {
    if (!name || !email || !specialization) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if email already exists
    if (doctors.some(doctor => doctor.email === email)) {
      toast({
        title: "Error",
        description: "A doctor with this email already exists",
        variant: "destructive",
      });
      return;
    }

    const newDoctor: Doctor = {
      id: generateId(),
      name,
      email,
      role: "doctor",
      specialization,
      patients: [],
      appointments: [],
      active: true
    };

    addDoctor(newDoctor);
    toast({
      title: "Success",
      description: `Dr. ${name} has been added successfully`,
    });

    // Reset form
    setName("");
    setEmail("");
    setSpecialization("");
    setIsAddDialogOpen(false);
  };

  // Handle edit doctor
  const handleEditDoctor = () => {
    if (!selectedDoctor || !name || !email || !specialization) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if email already exists (but not the current doctor)
    if (doctors.some(doctor => doctor.email === email && doctor.id !== selectedDoctor.id)) {
      toast({
        title: "Error",
        description: "Another doctor with this email already exists",
        variant: "destructive",
      });
      return;
    }

    updateDoctor(selectedDoctor.id, {
      name,
      email,
      specialization
    });

    toast({
      title: "Success",
      description: `Dr. ${name} has been updated successfully`,
    });

    // Reset form
    setSelectedDoctor(null);
    setName("");
    setEmail("");
    setSpecialization("");
    setIsEditDialogOpen(false);
  };

  // Handle delete doctor
  const handleDeleteDoctor = () => {
    if (!selectedDoctor) return;

    deleteDoctor(selectedDoctor.id);
    toast({
      title: "Doctor Deleted",
      description: `Dr. ${selectedDoctor.name} has been removed from the system`,
      variant: "destructive",
    });

    setSelectedDoctor(null);
    setIsDeleteDialogOpen(false);
  };

  // Set up doctor for editing
  const setupEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setName(doctor.name);
    setEmail(doctor.email);
    setSpecialization(doctor.specialization);
    setIsEditDialogOpen(true);
  };

  // Set up doctor for deletion
  const setupDeleteDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Manage Doctors" 
          description="Add, edit, and remove doctors from the system"
        >
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                    placeholder="Dr. Full Name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="col-span-3"
                    placeholder="doctor@example.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialization" className="text-right">
                    Specialization
                  </Label>
                  <Input
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., Cardiology"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDoctor}>Add Doctor</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PageHeader>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <h2 className="text-xl font-semibold mb-4 md:mb-0">Doctor List</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search doctors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredDoctors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2 px-2">Name</th>
                    <th className="pb-2 px-2">Email</th>
                    <th className="pb-2 px-2">Specialization</th>
                    <th className="pb-2 px-2">Patients</th>
                    <th className="pb-2 px-2">Status</th>
                    <th className="pb-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-b">
                      <td className="py-3 px-2">Dr. {doctor.name}</td>
                      <td className="py-3 px-2">{doctor.email}</td>
                      <td className="py-3 px-2">{doctor.specialization}</td>
                      <td className="py-3 px-2">{doctor.patients.length}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          doctor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setupEditDoctor(doctor)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => setupDeleteDoctor(doctor)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <UserCog className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No doctors found</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm 
                  ? "No doctors match your search criteria." 
                  : "No doctors have been added yet."}
              </p>
            </div>
          )}
        </div>

        {/* Edit Doctor Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Doctor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-specialization" className="text-right">
                  Specialization
                </Label>
                <Input
                  id="edit-specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditDoctor}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Doctor Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete Dr. {selectedDoctor?.name}? This action cannot be undone.
              </p>
              <p className="text-red-500 mt-2">
                Warning: This will remove all references to this doctor, including appointments, medical records, and prescriptions.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteDoctor}
              >
                Delete Doctor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDoctors;
