
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto md:px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">About HealthRecord</h1>
              
              <div className="prose max-w-none">
                <p className="lead">
                  HealthRecord is a comprehensive health record management system designed to streamline and enhance healthcare services for patients, doctors, and administrators.
                </p>
                
                <h2>Our Mission</h2>
                <p>
                  Our mission is to revolutionize healthcare record-keeping by providing a user-friendly, secure, and efficient platform that connects patients with healthcare providers, ensuring seamless access to medical information when and where it's needed most.
                </p>
                
                <h2>What We Offer</h2>
                <p>
                  HealthRecord offers a complete solution for managing health records, appointments, and prescriptions. Our platform empowers:
                </p>
                
                <ul>
                  <li><strong>Patients</strong> to access their complete medical history, schedule appointments, and receive timely prescription notifications.</li>
                  <li><strong>Doctors</strong> to efficiently manage patient records, create digital prescriptions, and organize their appointment schedules.</li>
                  <li><strong>Administrators</strong> to oversee the entire system, manage user accounts, and ensure smooth operations.</li>
                </ul>
                
                <h2>Key Features</h2>
                <ul>
                  <li>Secure storage of medical records</li>
                  <li>Intuitive appointment scheduling system</li>
                  <li>Digital prescription management</li>
                  <li>Real-time notifications</li>
                  <li>Role-based access control</li>
                  <li>User-friendly interfaces for all user types</li>
                </ul>
                
                <h2>Data Security</h2>
                <p>
                  At HealthRecord, we take the security and privacy of your medical information seriously. Our platform implements industry-standard security measures to protect your data.
                </p>
                
                <h2>Getting Started</h2>
                <p>
                  Whether you're a patient seeking better management of your health records, a doctor looking to streamline your practice, or an administrator aiming to improve healthcare services, HealthRecord has the tools you need. Register today to experience the future of health record management.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
