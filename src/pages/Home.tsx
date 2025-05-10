
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, UserRound, UserCog } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-health-blue-600 to-health-blue-800 text-white py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                  Your Health Records, <br />
                  Simplified
                </h1>
                <p className="md:text-xl">
                  Secure, efficient health record management for patients, doctors, and administrators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button size="lg" className="bg-white text-health-blue-600 hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="border-white text-health-blue-600 hover:bg-white/20">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Health Records"
                  className="rounded-lg shadow-xl object-cover w-full max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* User Role Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tailored for Everyone in Healthcare
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Patient Card */}
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-health-blue-100 p-4 rounded-full">
                    <UserRound className="h-8 w-8 text-health-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Patients</h3>
                  <p className="text-gray-500">
                    Access your medical history, book appointments with doctors, and view prescriptions all in one place.
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2 w-full">
                    <li className="flex items-center">
                      <div className="bg-health-blue-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-health-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      View your complete medical history
                    </li>
                    <li className="flex items-center">
                      <div className="bg-health-blue-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-health-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Schedule appointments online
                    </li>
                    <li className="flex items-center">
                      <div className="bg-health-blue-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-health-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Receive prescription notifications
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Doctor Card */}
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-health-green-100 p-4 rounded-full">
                    <UserCog className="h-8 w-8 text-health-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Doctors</h3>
                  <p className="text-gray-500">
                    Manage patient records, schedule appointments, and issue prescriptions efficiently.
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2 w-full">
                    <li className="flex items-center">
                      <div className="bg-health-green-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-health-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Access patient medical histories
                    </li>
                    <li className="flex items-center">
                      <div className="bg-health-green-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-health-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Create prescriptions digitally
                    </li>
                    <li className="flex items-center">
                      <div className="bg-health-green-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-health-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Manage appointment schedules
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Admin Card */}
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Administrators</h3>
                  <p className="text-gray-500">
                    Oversee the entire system, manage users, and ensure smooth operations.
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2 w-full">
                    <li className="flex items-center">
                      <div className="bg-purple-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Manage doctor and patient accounts
                    </li>
                    <li className="flex items-center">
                      <div className="bg-purple-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Assign doctors to patients
                    </li>
                    <li className="flex items-center">
                      <div className="bg-purple-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Monitor system activity
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our health record management system today for a more organized and efficient healthcare experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-health-blue-600 hover:bg-health-blue-700">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-health-blue-600 text-health-blue-600 hover:bg-health-blue-50">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
