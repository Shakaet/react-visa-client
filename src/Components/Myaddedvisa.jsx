import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Provider';

const Myaddedvisa = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [updatedVisa, setUpdatedVisa] = useState({});
  const [visas, setVisas] = useState(data);

  useEffect(() => {
    if (user?.email) { // Ensure email exists
      fetch(`https://visa-server-bice.vercel.app/addAddedVisa?email=${user.email}`)
        .then((res) => res.json()) // Fix the parentheses placement
        .then((data) => setData(data)) // Fix the parentheses placement
        .catch((error) => console.error("Error fetching data:", error)); // Add error handling
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    fetch(`https://visa-server-bice.vercel.app/delete-visa/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Delete response:", data);
        setData((prevData) => prevData.filter((visa) => visa._id !== id)); // Update state
      })
      .catch((error) => console.error("Error deleting visa:", error));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    fetch(`https://visa-server-bice.vercel.app/update-visa/${selectedVisa._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVisa),
    })
      .then((res) => res.json())
      .then(() => {
        // Update the local data to reflect changes
        setData((prevData) =>
          prevData.map((visa) =>
            visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
          )
        );
        setSelectedVisa(null); // Close modal
      })
      .catch((error) => console.error("Error updating visa:", error));
  };

  const openUpdateModal = (visa) => {
    setSelectedVisa(visa);
    setUpdatedVisa({ ...visa }); // Ensure the updatedVisa state is a copy of the selectedVisa
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Added Visas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((visa) => (
            <div key={visa._id} className="border p-4 shadow rounded">
              <img
                src={visa.countryImage}
                alt={visa.country}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold">{visa.country}</h2>
              <p>Visa Type: {visa.visaType}</p>
              <p>Processing Time: {visa.processingTime}</p>
              <p>Fee: ${visa.fee}</p>
              <p>Validity: {visa.validity}</p>
              <p>Application Method: {visa.applicationMethod}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openUpdateModal(visa)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(visa._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedVisa && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Update Visa</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Country</label>
                  <input
                    type="text"
                    value={updatedVisa.country}
                    onChange={(e) =>
                      setUpdatedVisa({ ...updatedVisa, country: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Visa Type</label>
                  <input
                    type="text"
                    value={updatedVisa.visaType}
                    onChange={(e) =>
                      setUpdatedVisa({ ...updatedVisa, visaType: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Processing Time</label>
                  <input
                    type="text"
                    value={updatedVisa.processingTime}
                    onChange={(e) =>
                      setUpdatedVisa({ ...updatedVisa, processingTime: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Fee</label>
                  <input
                    type="number"
                    value={updatedVisa.fee}
                    onChange={(e) =>
                      setUpdatedVisa({ ...updatedVisa, fee: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVisa(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Myaddedvisa;
