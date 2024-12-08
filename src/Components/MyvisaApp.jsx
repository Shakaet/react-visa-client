import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Provider';

const MyvisaApp = () => {
  let { user } = useContext(AuthContext);
  let [data, setData] = useState([]);
  let [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  let [filteredData, setFilteredData] = useState([]); // State to store the filtered visa applications

  useEffect(() => {
    if (user?.email) { // Ensure email exists
      fetch(`https://visa-server-bice.vercel.app/addApplyVisa?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setFilteredData(data); // Initialize filtered data with all visa applications
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user?.email]);

  // Handle cancellation of an application
  const handleCancel = (id) => {
    fetch(`https://visa-server-bice.vercel.app/cancelApplication/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Update the applications state
        setData((prev) => prev.filter((app) => app._id !== id));
        setFilteredData((prev) => prev.filter((app) => app._id !== id)); // Also update filtered data
      })
      .catch((error) => console.error("Error canceling application:", error));
  };

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredData(data); // If search term is empty, show all applications
    } else {
      const filtered = data.filter((app) =>
        app.countryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered); // Update filtered data based on the search term
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Visa Applications</h1>

        {/* Search input and button */}
        <div className="mb-6 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search by Country Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Display filtered visa applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((app) => (
            <div
              key={app._id}
              className="border rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <img
                src={app.countryImage}
                alt={app.countryName}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-4">{app.countryName}</h2>
              <p className="text-gray-600">Visa Type: {app.visaType}</p>
              <p className="text-gray-600">Processing Time: {app.processingTime}</p>
              <p className="text-gray-600">Fee: ${app.fee}</p>
              <p className="text-gray-600">Validity: {app.validity}</p>
              <p className="text-gray-600">
                Application Method: {app.applicationMethod}
              </p>
              <p className="text-gray-600">Applied Date: {app.appliedDate}</p>
              <p className="text-gray-600">
                Applicant Name: {app.firstName + ' ' + app.lastName}
              </p>
              <p className="text-gray-600">Applicant Email: {app.email}</p>
              <button
                onClick={() => handleCancel(app._id)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyvisaApp;
