
import { generateId } from './helpers';
import { User, Patient, Doctor, Admin, Appointment, MedicalRecord, Prescription, UserRole } from '@/types';

export const initializeSampleData = () => {
  // Check if data already exists in localStorage
  if (localStorage.getItem('dataInitialized')) {
    return;
  }

  // Create sample users
  const adminUser: Admin = {
    id: generateId(),
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    active: true
  };

  const doctorUsers: Doctor[] = [
    {
      id: generateId(),
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'doctor',
      specialization: 'Cardiology',
      patients: [],
      appointments: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'doctor',
      specialization: 'Pediatrics',
      patients: [],
      appointments: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      role: 'doctor',
      specialization: 'Neurology',
      patients: [],
      appointments: [],
      active: true
    },
    {
      id: generateId(),
      name: 'David Williams',
      email: 'david@example.com',
      role: 'doctor',
      specialization: 'Orthopedics',
      patients: [],
      appointments: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Jennifer Lee',
      email: 'jennifer@example.com',
      role: 'doctor',
      specialization: 'Dermatology',
      patients: [],
      appointments: [],
      active: true
    }
  ];

  const patientUsers: Patient[] = [
    {
      id: generateId(),
      name: 'John Smith',
      email: 'john@example.com',
      role: 'patient',
      age: 42,
      gender: 'male',
      address: '123 Main St, Anytown, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Alice Williams',
      email: 'alice@example.com',
      role: 'patient',
      age: 35,
      gender: 'female',
      address: '456 Oak Ave, Somewhere, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Robert Brown',
      email: 'robert@example.com',
      role: 'patient',
      age: 65,
      gender: 'male',
      address: '789 Pine Rd, Elsewhere, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'patient',
      age: 28,
      gender: 'female',
      address: '101 Cedar Lane, Nowhere, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    },
    {
      id: generateId(),
      name: 'James Johnson',
      email: 'james@example.com',
      role: 'patient',
      age: 52,
      gender: 'male',
      address: '202 Maple Street, Anywhere, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Sofia Rodriguez',
      email: 'sofia@example.com',
      role: 'patient',
      age: 31,
      gender: 'female',
      address: '303 Birch Blvd, Someplace, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    },
    {
      id: generateId(),
      name: 'Michael Thompson',
      email: 'michael.t@example.com',
      role: 'patient',
      age: 47,
      gender: 'male',
      address: '404 Elm Court, Othertown, USA',
      medicalHistory: [],
      prescriptions: [],
      active: true
    }
  ];

  // Assign doctors to patients
  patientUsers[0].assignedDoctorId = doctorUsers[0].id;
  patientUsers[1].assignedDoctorId = doctorUsers[1].id;
  patientUsers[2].assignedDoctorId = doctorUsers[0].id;
  patientUsers[3].assignedDoctorId = doctorUsers[2].id;
  patientUsers[4].assignedDoctorId = doctorUsers[3].id;
  patientUsers[5].assignedDoctorId = doctorUsers[4].id;
  patientUsers[6].assignedDoctorId = doctorUsers[1].id;

  // Add patient IDs to doctors
  doctorUsers[0].patients = [patientUsers[0].id, patientUsers[2].id];
  doctorUsers[1].patients = [patientUsers[1].id, patientUsers[6].id];
  doctorUsers[2].patients = [patientUsers[3].id];
  doctorUsers[3].patients = [patientUsers[4].id];
  doctorUsers[4].patients = [patientUsers[5].id];

  // Create sample appointments - include past, current, and future appointments
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const appointments: Appointment[] = [
    // John's appointments
    {
      id: generateId(),
      patientId: patientUsers[0].id,
      doctorId: doctorUsers[0].id,
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      status: 'scheduled',
      notes: 'Follow-up appointment for blood pressure check'
    },
    {
      id: generateId(),
      patientId: patientUsers[0].id,
      doctorId: doctorUsers[0].id,
      date: lastWeek.toISOString().split('T')[0],
      time: '14:30',
      status: 'completed',
      notes: 'Initial consultation for heart palpitations'
    },
    
    // Alice's appointments
    {
      id: generateId(),
      patientId: patientUsers[1].id,
      doctorId: doctorUsers[1].id,
      date: nextWeek.toISOString().split('T')[0],
      time: '09:15',
      status: 'scheduled',
      notes: 'Annual check-up'
    },
    {
      id: generateId(),
      patientId: patientUsers[1].id,
      doctorId: doctorUsers[1].id,
      date: lastMonth.toISOString().split('T')[0],
      time: '11:45',
      status: 'completed',
      notes: 'Vaccination appointment'
    },
    
    // Robert's appointments
    {
      id: generateId(),
      patientId: patientUsers[2].id,
      doctorId: doctorUsers[0].id,
      date: today.toISOString().split('T')[0],
      time: '16:00',
      status: 'scheduled',
      notes: 'Discuss test results'
    },
    {
      id: generateId(),
      patientId: patientUsers[2].id,
      doctorId: doctorUsers[0].id,
      date: yesterday.toISOString().split('T')[0],
      time: '13:30',
      status: 'cancelled',
      notes: 'Follow-up for arthritis treatment'
    },
    
    // Maria's appointments
    {
      id: generateId(),
      patientId: patientUsers[3].id,
      doctorId: doctorUsers[2].id,
      date: tomorrow.toISOString().split('T')[0],
      time: '15:30',
      status: 'scheduled',
      notes: 'Headache consultation'
    },
    
    // James's appointments
    {
      id: generateId(),
      patientId: patientUsers[4].id,
      doctorId: doctorUsers[3].id,
      date: nextWeek.toISOString().split('T')[0],
      time: '10:30',
      status: 'scheduled',
      notes: 'Knee pain evaluation'
    },
    
    // Sofia's appointments
    {
      id: generateId(),
      patientId: patientUsers[5].id,
      doctorId: doctorUsers[4].id,
      date: today.toISOString().split('T')[0],
      time: '13:00',
      status: 'scheduled',
      notes: 'Skin rash examination'
    },
    
    // Michael's appointments
    {
      id: generateId(),
      patientId: patientUsers[6].id,
      doctorId: doctorUsers[1].id,
      date: yesterday.toISOString().split('T')[0],
      time: '09:00',
      status: 'completed',
      notes: 'Regular check-up'
    }
  ];

  // Create sample medical records
  const medicalRecords: MedicalRecord[] = [
    // John's medical records
    {
      id: generateId(),
      patientId: patientUsers[0].id,
      doctorId: doctorUsers[0].id,
      date: lastWeek.toISOString().split('T')[0],
      diagnosis: 'Hypertension',
      notes: 'Patient presented with elevated blood pressure (150/90). Recommended lifestyle changes including reduced sodium intake, increased physical activity, and stress management techniques. Scheduled follow-up in one week for blood pressure check.'
    },
    {
      id: generateId(),
      patientId: patientUsers[0].id,
      doctorId: doctorUsers[0].id,
      date: lastMonth.toISOString().split('T')[0],
      diagnosis: 'Seasonal Allergies',
      notes: 'Patient reported nasal congestion, sneezing, and itchy eyes. Symptoms consistent with seasonal allergies. Prescribed non-sedating antihistamine and advised to avoid known allergens. Symptoms should improve within 1-2 weeks of treatment.'
    },
    
    // Alice's medical records
    {
      id: generateId(),
      patientId: patientUsers[1].id,
      doctorId: doctorUsers[1].id,
      date: lastMonth.toISOString().split('T')[0],
      diagnosis: 'Upper Respiratory Infection',
      notes: 'Patient presented with sore throat, cough, and low-grade fever for 3 days. Lungs clear on auscultation. Diagnosed with viral URI. Recommended rest, fluids, and over-the-counter symptom relief. Should resolve within 7-10 days.'
    },
    
    // Robert's medical records
    {
      id: generateId(),
      patientId: patientUsers[2].id,
      doctorId: doctorUsers[0].id,
      date: lastWeek.toISOString().split('T')[0],
      diagnosis: 'Arthritis',
      notes: 'Patient has joint pain in knees and hands, worse in the morning. X-rays show moderate osteoarthritis. Recommended physical therapy twice weekly and prescribed anti-inflammatory medication. Will reassess in one month.'
    },
    {
      id: generateId(),
      patientId: patientUsers[2].id,
      doctorId: doctorUsers[0].id,
      date: '2025-03-10',
      diagnosis: 'Hypercholesterolemia',
      notes: 'Routine bloodwork showed elevated LDL cholesterol (162 mg/dL). Recommended dietary changes including increased fiber intake and reduced saturated fat. Will recheck lipid panel in 3 months to assess if medication needed.'
    },
    
    // Maria's medical records
    {
      id: generateId(),
      patientId: patientUsers[3].id,
      doctorId: doctorUsers[2].id,
      date: '2025-04-05',
      diagnosis: 'Migraine',
      notes: 'Patient reports recurring headaches with aura, nausea, and light sensitivity. Symptoms consistent with migraine. Prescribed abortive medication for acute episodes and discussed potential triggers including stress and certain foods.'
    },
    
    // James's medical records
    {
      id: generateId(),
      patientId: patientUsers[4].id,
      doctorId: doctorUsers[3].id,
      date: '2025-04-18',
      diagnosis: 'Knee Osteoarthritis',
      notes: 'MRI confirms moderate osteoarthritis in the right knee. Discussed conservative management including weight loss, low-impact exercise, and anti-inflammatory medications. Will reassess in 6 weeks to determine if referral to orthopedic specialist is needed.'
    },
    
    // Sofia's medical records
    {
      id: generateId(),
      patientId: patientUsers[5].id,
      doctorId: doctorUsers[4].id,
      date: '2025-04-20',
      diagnosis: 'Contact Dermatitis',
      notes: 'Patient presented with itchy rash on hands and forearms. History reveals recent use of new cleaning product. Diagnosed with contact dermatitis. Prescribed topical steroid cream and advised to avoid the irritant. Should resolve within 1-2 weeks.'
    },
    
    // Michael's medical records
    {
      id: generateId(),
      patientId: patientUsers[6].id,
      doctorId: doctorUsers[1].id,
      date: yesterday.toISOString().split('T')[0],
      diagnosis: 'Type 2 Diabetes',
      notes: 'Initial diagnosis of Type 2 diabetes based on elevated fasting blood glucose (142 mg/dL) and HbA1c (7.2%). Started on oral medication and provided education on diet, exercise, and glucose monitoring. Will follow up in 3 months with repeat HbA1c.'
    }
  ];

  // Create sample prescriptions
  const prescriptions: Prescription[] = [
    // John's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[0].id,
      doctorId: doctorUsers[0].id,
      date: lastWeek.toISOString().split('T')[0],
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days'
        }
      ],
      instructions: 'Take in the morning with food. Monitor blood pressure twice daily. Avoid grapefruit juice while on this medication.',
      isViewed: true
    },
    {
      id: generateId(),
      patientId: patientUsers[0].id,
      doctorId: doctorUsers[0].id,
      date: lastMonth.toISOString().split('T')[0],
      medications: [
        {
          name: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '14 days'
        }
      ],
      instructions: 'Take as needed for allergy symptoms. May cause drowsiness; avoid driving until you know how this medication affects you.',
      isViewed: true
    },
    
    // Alice's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[1].id,
      doctorId: doctorUsers[1].id,
      date: lastMonth.toISOString().split('T')[0],
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7 days'
        }
      ],
      instructions: 'Take with food. Complete entire course even if symptoms improve. Call if symptoms worsen or do not improve in 3 days.',
      isViewed: false
    },
    
    // Robert's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[2].id,
      doctorId: doctorUsers[0].id,
      date: lastWeek.toISOString().split('T')[0],
      medications: [
        {
          name: 'Ibuprofen',
          dosage: '600mg',
          frequency: 'Three times daily',
          duration: '14 days'
        },
        {
          name: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours as needed',
          duration: '14 days'
        }
      ],
      instructions: 'Take ibuprofen with food. Do not exceed maximum daily dose of acetaminophen (4000mg). Discontinue if stomach upset occurs.',
      isViewed: true
    },
    
    // Maria's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[3].id,
      doctorId: doctorUsers[2].id,
      date: '2025-04-05',
      medications: [
        {
          name: 'Sumatriptan',
          dosage: '50mg',
          frequency: 'As needed for migraine',
          duration: '6 tablets'
        }
      ],
      instructions: 'Take one tablet at onset of migraine. May repeat after 2 hours if needed. Do not take more than 2 tablets in 24 hours.',
      isViewed: false
    },
    
    // James's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[4].id,
      doctorId: doctorUsers[3].id,
      date: '2025-04-18',
      medications: [
        {
          name: 'Naproxen',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days'
        }
      ],
      instructions: 'Take with food or milk. Rest and apply ice to affected knee for 20 minutes 3 times daily.',
      isViewed: true
    },
    
    // Sofia's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[5].id,
      doctorId: doctorUsers[4].id,
      date: '2025-04-20',
      medications: [
        {
          name: 'Hydrocortisone Cream',
          dosage: '1%',
          frequency: 'Apply twice daily',
          duration: '7 days'
        }
      ],
      instructions: 'Apply a thin layer to affected areas. Do not cover with bandages unless directed. Avoid contact with eyes.',
      isViewed: false
    },
    
    // Michael's prescriptions
    {
      id: generateId(),
      patientId: patientUsers[6].id,
      doctorId: doctorUsers[1].id,
      date: yesterday.toISOString().split('T')[0],
      medications: [
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days'
        }
      ],
      instructions: 'Take with meals to minimize gastrointestinal side effects. Monitor blood glucose levels daily and log readings.',
      isViewed: true
    }
  ];

  // Update patient medical history with records
  patientUsers.forEach(patient => {
    patient.medicalHistory = medicalRecords.filter(record => record.patientId === patient.id);
    patient.prescriptions = prescriptions.filter(prescription => prescription.patientId === patient.id);
  });

  // Store all users
  const allUsers: User[] = [
    adminUser,
    ...doctorUsers,
    ...patientUsers
  ];

  // Save to localStorage
  localStorage.setItem('users', JSON.stringify(allUsers));
  localStorage.setItem('patients', JSON.stringify(patientUsers));
  localStorage.setItem('doctors', JSON.stringify(doctorUsers));
  localStorage.setItem('admins', JSON.stringify([adminUser]));
  localStorage.setItem('appointments', JSON.stringify(appointments));
  localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
  localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
  
  // Mark as initialized
  localStorage.setItem('dataInitialized', 'true');
};
