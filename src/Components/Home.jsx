import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from 'react-simple-typewriter'; // Import the Typewriter component
import { Fade } from 'react-awesome-reveal'; // Import React Awesome Reveal components

const Home = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Fetch latest visas
  useEffect(() => {
    fetch("https://visa-server-bice.vercel.app/latest-visas?limit=6")
      .then((res) => res.json())
      .then((data) => setLatestVisas(data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className="overflow-x-hidden">
      <div className={isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
        {/* Navbar */}
        <div className="flex justify-between items-center px-6 py-4 text-white">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        </div>

        {/* Banner */}
        <div className="container mx-auto mt-4">
          <Slider {...sliderSettings}>
            <div className="p-10 text-center rounded shadow-lg bg-blue-300">
              <h2 className="text-2xl md:text-3xl font-bold">
                <Typewriter words={['Explore New Destinations']} loop={1} cursor cursorStyle='|' typeSpeed={100} />
              </h2>
              <p className="mt-2 text-sm md:text-base">
                Discover the easiest visa options for your favorite countries!
              </p>
            </div>
            <div className="p-10 text-center rounded shadow-lg bg-green-300">
              <h2 className="text-2xl md:text-3xl font-bold">
                <Typewriter words={['Quick Processing']} loop={1} cursor cursorStyle='|' typeSpeed={100} />
              </h2>
              <p className="mt-2 text-sm md:text-base">
                Get your visa approved faster than ever with our services.
              </p>
            </div>
            <div className="p-10 text-center rounded shadow-lg bg-yellow-300">
              <h2 className="text-2xl md:text-3xl font-bold">
                <Typewriter words={['Reliable Information']} loop={1} cursor cursorStyle='|' typeSpeed={100} />
              </h2>
              <p className="mt-2 text-sm md:text-base">
                Stay updated with the latest visa requirements worldwide.
              </p>
            </div>
          </Slider>
        </div>

        {/* Latest Visas Section */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <Typewriter words={['Latest Visas']} loop={1} cursor cursorStyle='|' typeSpeed={100} />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVisas.map((visa) => (
              <Fade key={visa._id} duration={6000} triggerOnce>
                <div
                  className={`p-4 shadow rounded ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}
                >
                  <img
                    src={visa.countryImage}
                    alt={visa.country}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-bold">{visa.country}</h3>
                  <p>Visa Type: {visa.visaType}</p>
                  <p>Processing Time: {visa.processingTime}</p>
                  <p>Fee: ${visa.fee}</p>
                  <p>Validity: {visa.validity}</p>
                  <p>Application Method: {visa.applicationMethod}</p>
                  <Link
                    to={`/visa/${visa._id}`}
                    className={`px-4 py-2 rounded block text-center mt-4 ${
                      isDarkTheme ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    See Details
                  </Link>
                </div>
              </Fade>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/allvisa">
              <button className={`px-6 py-3 rounded ${isDarkTheme ? "bg-green-600" : "bg-green-500"} text-white hover:bg-green-700`}>
                See All Visas
              </button>
            </Link>
          </div>
        </div>

        {/* Extra Sections */}
        <div className="container mx-auto py-8">
          {/* Extra Section 1 */}
          <div className={`p-6 rounded mb-6 ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <Typewriter words={['Popular Visa Guides']} loop={1} cursor cursorStyle='|' typeSpeed={100} />
            </h2>
            <p className="text-sm md:text-base">
              Learn about the most sought-after visas and the steps to apply for them. Our visa guides
              offer detailed instructions and tips for a hassle-free application process.
            </p>
          </div>
          {/* Extra Section 2 */}
          <div className={`p-6 rounded ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <Typewriter words={['Customer Testimonials']} loop={1} cursor cursorStyle='|' typeSpeed={100} />
            </h2>
            <p className="text-sm md:text-base">
              See what our satisfied customers have to say about our services. Your success stories
              inspire us to keep improving and helping travelers like you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
