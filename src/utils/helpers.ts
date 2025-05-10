
import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID
export const generateId = () => uuidv4();

// Format date to readable string
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time (e.g., "14:30" to "2:30 PM")
export const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get role-based dashboard route
export const getDashboardRoute = (role: string) => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'doctor':
      return '/doctor/dashboard';
    case 'patient':
      return '/patient/dashboard';
    default:
      return '/';
  }
};

// Filter and search array of objects
export const filterItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm) return items;
  
  const lowercasedTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowercasedTerm);
      }
      return false;
    });
  });
};

// Group appointments by date
export const groupByDate = <T extends { date: string }>(items: T[]): Record<string, T[]> => {
  return items.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

// Sort array of objects by date
export const sortByDate = <T extends { date: string }>(items: T[], ascending = true): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Add days to a date and return in YYYY-MM-DD format
export const addDays = (date: string, days: number): string => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password strength
export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8;
};

// Capitalize first letter of each word
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Generate time slots for appointments
export const generateTimeSlots = (
  startHour = 9,
  endHour = 17,
  intervalMinutes = 30
): string[] => {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return slots;
};

// Check if a time slot is available
export const isTimeSlotAvailable = (
  date: string,
  time: string,
  doctorId: string,
  appointments: { date: string; time: string; doctorId: string; }[]
): boolean => {
  return !appointments.some(
    appointment => 
      appointment.date === date && 
      appointment.time === time && 
      appointment.doctorId === doctorId
  );
};
