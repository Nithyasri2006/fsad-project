
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { useEffect } from "react";
import { initializeSampleData } from "@/utils/sampleData";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/Appointments";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import PatientMedicalHistory from "./pages/patient/MedicalHistory";
import PatientProfile from "./pages/patient/Profile";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorPatients from "./pages/doctor/Patients";
import DoctorProfile from "./pages/doctor/Profile";
import DoctorPatientProfile from "./pages/doctor/PatientProfile";
import CreatePrescription from "./pages/doctor/CreatePrescription";
import CreateMedicalRecord from "./pages/doctor/CreateMedicalRecord";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDoctors from "./pages/admin/Doctors";
import AdminPatients from "./pages/admin/Patients";
import AdminProfile from "./pages/admin/Profile";

const queryClient = new QueryClient();

const App = () => {
  // Initialize sample data
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/appointments"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/prescriptions"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientPrescriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/medical-history"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientMedicalHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/profile"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientProfile />
                  </ProtectedRoute>
                }
              />
              
              {/* Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/appointments"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/patients"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorPatients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/profile"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/patients/:id"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorPatientProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/prescriptions/create"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <CreatePrescription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/medical-records/create"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <CreateMedicalRecord />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/doctors"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDoctors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/patients"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminPatients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
