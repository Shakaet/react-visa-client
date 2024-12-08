import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Allvisa = () => {
  let visaData = useLoaderData();
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [filteredVisas, setFilteredVisas] = useState(visaData);

  // Handle the visa type change
  const handleVisaTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedVisaType(selectedType);

    if (selectedType === '') {
      // Show all visas if no type is selected
      setFilteredVisas(visaData);
    } else {
      // Filter visas based on selected type
      setFilteredVisas(visaData.filter(visa => visa.visaType === selectedType));
    }
  };

  // Extract unique visa types from the data to populate the dropdown options
  const visaTypes = [...new Set(visaData.map(visa => visa.visaType))];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Visas</h1>

      {/* Dropdown for filtering visa types */}
      <div className="mb-6">
        <label htmlFor="visaType" className="mr-2 text-lg font-medium">Filter by Visa Type:</label>
        <select
          id="visaType"
          value={selectedVisaType}
          onChange={handleVisaTypeChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Visa Types</option>
          {visaTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Display the filtered visas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVisas.map((visa) => (
          <div key={visa._id} className="bg-white p-4 shadow rounded-lg">
            <img
              src={visa.countryImage} // Assuming the image URL is in visa.countryImage
              alt={visa.countryName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{visa.countryName}</h2>
            <p className="text-gray-700 mb-2"><strong>Visa Type:</strong> {visa.visaType}</p>
            <p className="text-gray-700 mb-2"><strong>Processing Time:</strong> {visa.processingTime}</p>
            <p className="text-gray-700 mb-4"><strong>Fee:</strong> ${visa.fee}</p>
            <Link
              to={`/visa/${visa._id}`} // Adjust the link to your visa details page
              className="text-blue-500 hover:underline"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allvisa;
