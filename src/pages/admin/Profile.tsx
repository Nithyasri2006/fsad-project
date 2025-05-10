
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/admin/AdminNavbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Users, Calendar } from "lucide-react";

const AdminProfile = () => {
  const { user } = useAuth();
  const { updateUser, doctors, patients } = useData();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

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
      setIsEditing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader title="Admin Profile" description="View and manage your profile information" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Shield className="h-12 w-12 text-purple-600" />
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
                    
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="capitalize">System Administrator</p>
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

          {/* System Overview */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-blue-800">Doctors</h3>
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-900">{doctors.length}</p>
                  <p className="text-sm text-blue-800 mt-2">Active healthcare providers</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <a href="/admin/doctors">Manage Doctors</a>
                  </Button>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-green-800">Patients</h3>
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-900">{patients.length}</p>
                  <p className="text-sm text-green-800 mt-2">Registered patients</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <a href="/admin/patients">Manage Patients</a>
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" asChild>
                    <a href="/admin/doctors">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Doctors
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/admin/patients">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Patients
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/admin/appointments">
                      <Calendar className="mr-2 h-4 w-4" />
                      Manage Appointments
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/admin/settings">
                      <User className="mr-2 h-4 w-4" />
                      System Settings
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProfile;
