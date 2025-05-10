
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, Patient, Doctor, Admin, Appointment, MedicalRecord, Prescription, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface DataContextType {
  users: User[];
  patients: Patient[];
  doctors: Doctor[];
  admins: Admin[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  prescriptions: Prescription[];
  
  // User CRUD
  addUser: (user: User) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  getUsersByRole: (role: UserRole) => User[];
  
  // Patient CRUD
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patientData: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  
  // Doctor CRUD
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, doctorData: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  getDoctorById: (id: string) => Doctor | undefined;
  
  // Appointment CRUD
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointmentData: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentsByPatientId: (patientId: string) => Appointment[];
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[];
  
  // Medical Record CRUD
  addMedicalRecord: (record: MedicalRecord) => void;
  updateMedicalRecord: (id: string, recordData: Partial<MedicalRecord>) => void;
  deleteMedicalRecord: (id: string) => void;
  getMedicalRecordsByPatientId: (patientId: string) => MedicalRecord[];
  
  // Prescription CRUD
  addPrescription: (prescription: Prescription) => void;
  updatePrescription: (id: string, prescriptionData: Partial<Prescription>) => void;
  deletePrescription: (id: string) => void;
  getPrescriptionsByPatientId: (patientId: string) => Prescription[];
  
  // Doctor-Patient Assignment
  assignDoctorToPatient: (doctorId: string, patientId: string) => void;
  removeDoctorFromPatient: (patientId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = (key: string, setter: (data: any[]) => void) => {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        setter(JSON.parse(storedData));
      }
    };

    loadData("users", setUsers);
    loadData("patients", setPatients);
    loadData("doctors", setDoctors);
    loadData("admins", setAdmins);
    loadData("appointments", setAppointments);
    loadData("medicalRecords", setMedicalRecords);
    loadData("prescriptions", setPrescriptions);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("medicalRecords", JSON.stringify(medicalRecords));
  }, [medicalRecords]);

  useEffect(() => {
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
  }, [prescriptions]);

  // User CRUD
  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
    toast({
      title: "User created",
      description: `${user.name} has been added to the system.`,
    });
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
    );
    toast({
      title: "User updated",
      description: "User information has been updated.",
    });
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast({
      title: "User deleted",
      description: "User has been removed from the system.",
      variant: "destructive",
    });
  };

  const getUserById = (id: string) => {
    return users.find((user) => user.id === id);
  };

  const getUsersByRole = (role: UserRole) => {
    return users.filter((user) => user.role === role);
  };

  // Patient CRUD
  const addPatient = (patient: Patient) => {
    setPatients((prev) => [...prev, patient]);
    addUser(patient);
    toast({
      title: "Patient created",
      description: `${patient.name} has been added to the system.`,
    });
  };

  const updatePatient = (id: string, patientData: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((patient) => (patient.id === id ? { ...patient, ...patientData } : patient))
    );
    updateUser(id, patientData);
    toast({
      title: "Patient updated",
      description: "Patient information has been updated.",
    });
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
    deleteUser(id);
    toast({
      title: "Patient deleted",
      description: "Patient has been removed from the system.",
      variant: "destructive",
    });
  };

  const getPatientById = (id: string) => {
    return patients.find((patient) => patient.id === id);
  };

  // Doctor CRUD
  const addDoctor = (doctor: Doctor) => {
    setDoctors((prev) => [...prev, doctor]);
    addUser(doctor);
    toast({
      title: "Doctor created",
      description: `Dr. ${doctor.name} has been added to the system.`,
    });
  };

  const updateDoctor = (id: string, doctorData: Partial<Doctor>) => {
    setDoctors((prev) =>
      prev.map((doctor) => (doctor.id === id ? { ...doctor, ...doctorData } : doctor))
    );
    updateUser(id, doctorData);
    toast({
      title: "Doctor updated",
      description: "Doctor information has been updated.",
    });
  };

  const deleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    deleteUser(id);
    toast({
      title: "Doctor deleted",
      description: "Doctor has been removed from the system.",
      variant: "destructive",
    });
  };

  const getDoctorById = (id: string) => {
    return doctors.find((doctor) => doctor.id === id);
  };

  // Appointment CRUD
  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
    toast({
      title: "Appointment created",
      description: `Appointment on ${appointment.date} at ${appointment.time} has been scheduled.`,
    });
  };

  const updateAppointment = (id: string, appointmentData: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, ...appointmentData } : appointment
      )
    );
    toast({
      title: "Appointment updated",
      description: "Appointment details have been updated.",
    });
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    toast({
      title: "Appointment deleted",
      description: "Appointment has been removed from the system.",
      variant: "destructive",
    });
  };

  const getAppointmentsByPatientId = (patientId: string) => {
    return appointments.filter((appointment) => appointment.patientId === patientId);
  };

  const getAppointmentsByDoctorId = (doctorId: string) => {
    return appointments.filter((appointment) => appointment.doctorId === doctorId);
  };

  // Medical Record CRUD
  const addMedicalRecord = (record: MedicalRecord) => {
    setMedicalRecords((prev) => [...prev, record]);
    toast({
      title: "Medical record added",
      description: `New medical record dated ${record.date} has been added.`,
    });
  };

  const updateMedicalRecord = (id: string, recordData: Partial<MedicalRecord>) => {
    setMedicalRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, ...recordData } : record))
    );
    toast({
      title: "Medical record updated",
      description: "Medical record has been updated.",
    });
  };

  const deleteMedicalRecord = (id: string) => {
    setMedicalRecords((prev) => prev.filter((record) => record.id !== id));
    toast({
      title: "Medical record deleted",
      description: "Medical record has been removed from the system.",
      variant: "destructive",
    });
  };

  const getMedicalRecordsByPatientId = (patientId: string) => {
    return medicalRecords.filter((record) => record.patientId === patientId);
  };

  // Prescription CRUD
  const addPrescription = (prescription: Prescription) => {
    setPrescriptions((prev) => [...prev, prescription]);
    toast({
      title: "Prescription added",
      description: `New prescription dated ${prescription.date} has been added.`,
    });
  };

  const updatePrescription = (id: string, prescriptionData: Partial<Prescription>) => {
    setPrescriptions((prev) =>
      prev.map((prescription) =>
        prescription.id === id ? { ...prescription, ...prescriptionData } : prescription
      )
    );
    toast({
      title: "Prescription updated",
      description: "Prescription has been updated.",
    });
  };

  const deletePrescription = (id: string) => {
    setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id));
    toast({
      title: "Prescription deleted",
      description: "Prescription has been removed from the system.",
      variant: "destructive",
    });
  };

  const getPrescriptionsByPatientId = (patientId: string) => {
    return prescriptions.filter((prescription) => prescription.patientId === patientId);
  };

  // Doctor-Patient Assignment
  const assignDoctorToPatient = (doctorId: string, patientId: string) => {
    // Update patient
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === patientId ? { ...patient, assignedDoctorId: doctorId } : patient
      )
    );

    // Update doctor
    setDoctors((prev) =>
      prev.map((doctor) => {
        if (doctor.id === doctorId) {
          return {
            ...doctor,
            patients: doctor.patients.includes(patientId)
              ? doctor.patients
              : [...doctor.patients, patientId],
          };
        }
        return doctor;
      })
    );

    toast({
      title: "Doctor assigned",
      description: "Doctor has been assigned to the patient.",
    });
  };

  const removeDoctorFromPatient = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    const doctorId = patient?.assignedDoctorId;

    if (doctorId) {
      // Update patient
      setPatients((prev) =>
        prev.map((p) => (p.id === patientId ? { ...p, assignedDoctorId: undefined } : p))
      );

      // Update doctor
      setDoctors((prev) =>
        prev.map((d) => {
          if (d.id === doctorId) {
            return {
              ...d,
              patients: d.patients.filter((id) => id !== patientId),
            };
          }
          return d;
        })
      );

      toast({
        title: "Doctor unassigned",
        description: "Doctor has been unassigned from the patient.",
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        users,
        patients,
        doctors,
        admins,
        appointments,
        medicalRecords,
        prescriptions,

        addUser,
        updateUser,
        deleteUser,
        getUserById,
        getUsersByRole,

        addPatient,
        updatePatient,
        deletePatient,
        getPatientById,

        addDoctor,
        updateDoctor,
        deleteDoctor,
        getDoctorById,

        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByPatientId,
        getAppointmentsByDoctorId,

        addMedicalRecord,
        updateMedicalRecord,
        deleteMedicalRecord,
        getMedicalRecordsByPatientId,

        addPrescription,
        updatePrescription,
        deletePrescription,
        getPrescriptionsByPatientId,

        assignDoctorToPatient,
        removeDoctorFromPatient,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
