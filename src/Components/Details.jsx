import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./Provider";
import Swal from "sweetalert2";

const Details = () => {
  const { user } = useContext(AuthContext);
  const visa = useLoaderData();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    appliedDate: formattedDate,
    fee: visa?.fee || "",
        name:user.
        displayName,
        countryName:visa.countryName,
        countryImage:visa.countryImage,
        visaType:visa.visaType,
        processingTime:visa.processingTime,
        requiredDocuments:visa.requiredDocuments.join(', '),
        description:visa.description,
        validity:visa.validity,
        applicationMethod:visa.applicationMethod
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    fetch("https://visa-server-bice.vercel.app/addApplyVisa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Application Submitted",
            text: "Your visa application has been submitted successfully.",
          });
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.error("Error applying for visa:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an issue submitting your application.",
        });
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Visa Details for {visa.countryName}</h1>
      <div className="bg-white p-6 shadow rounded-lg">
        <img
          src={visa.countryImage}
          alt={visa.countryName}
          className="w-64 h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{visa.countryName}</h2>
        <p className="text-gray-700 mb-2"><strong>Visa Type:</strong> {visa.visaType}</p>
        <p className="text-gray-700 mb-2"><strong>Processing Time:</strong> {visa.processingTime}</p>
        <p className="text-gray-700 mb-2"><strong>Required Documents:</strong> {visa.requiredDocuments.join(", ")}</p>
        <p className="text-gray-700 mb-2"><strong>Description:</strong> {visa.description}</p>
        <p className="text-gray-700 mb-2"><strong>Fee:</strong> ${visa.fee}</p>
        <p className="text-gray-700 mb-2"><strong>Applied Date:</strong> {formattedDate}</p>
        <p className="text-gray-700 mb-2"><strong>Validity:</strong> {visa.validity}</p>
        <p className="text-gray-700 mb-2"><strong>Application Method:</strong> {visa.applicationMethod}</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
        >
          Apply for the Visa
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Apply for Visa</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Applied Date</label>
                <input
                  type="text"
                  name="appliedDate"
                  value={formData.appliedDate}
                  readOnly
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fee</label>
                <input
                  type="text"
                  name="fee"
                  value={formData.fee}
                  readOnly
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleApply}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
