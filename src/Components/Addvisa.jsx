import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";
import Swal from 'sweetalert2';


const Addvisa = () => {
  const [countryImage, setCountryImage] = useState("");
  const [countryName, setCountryName] = useState("");
  const [visaType, setVisaType] = useState("Tourist visa");
  const [processingTime, setProcessingTime] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [fee, setFee] = useState("");
  const [validity, setValidity] = useState("");
  const [applicationMethod, setApplicationMethod] = useState("");

  const navigate = useNavigate();

  let {user}= useContext(AuthContext)

  const handleAddVisa = (e) => {
    e.preventDefault();

    const newVisa = {
     email:user.email,
      countryImage,
      countryName,
      visaType,
      processingTime,
      requiredDocuments,
      description,
      ageRestriction: parseInt(ageRestriction, 10),
      fee: parseInt(fee, 10),
      validity,
      applicationMethod,
    };
    // console.log(newVisa)

    // Save the newVisa data to the database (replace with your API endpoint)
    fetch("https://visa-server-bice.vercel.app/addvisa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVisa),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data.insertedId) {
          // Show success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Campaign Added',
            text: 'The campaign added successfully!',
          });
       
        navigate("/allvisa"); 
        }// Navigate to the All Visas page
      })
      .catch((error) => {
        console.error("Error adding visa:", error);
       
      });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRequiredDocuments((prev) => [...prev, value]);
    } else {
      setRequiredDocuments((prev) =>
        prev.filter((document) => document !== value)
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Visa</h1>
      <form onSubmit={handleAddVisa} className="bg-white p-6 shadow rounded">
        <div className="mb-4">
          <label className="block font-bold mb-2">Country Image URL</label>
          <input
            type="url"
            value={countryImage}
            onChange={(e) => setCountryImage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Country Name</label>
          <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Visa Type</label>
          <select
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Tourist visa">Tourist visa</option>
            <option value="Student visa">Student visa</option>
            <option value="Official visa">Official visa</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Processing Time</label>
          <input
            type="text"
            value={processingTime}
            onChange={(e) => setProcessingTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Required Documents</label>
          <div className="flex flex-col space-y-2">
            <label>
              <input
                type="checkbox"
                value="Valid passport"
                onChange={handleCheckboxChange}
              />
              Valid passport
            </label>
            <label>
              <input
                type="checkbox"
                value="Visa application form"
                onChange={handleCheckboxChange}
              />
              Visa application form
            </label>
            <label>
              <input
                type="checkbox"
                value="Recent passport-sized photograph"
                onChange={handleCheckboxChange}
              />
              Recent passport-sized photograph
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Age Restriction</label>
          <input
            type="number"
            value={ageRestriction}
            onChange={(e) => setAgeRestriction(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Fee</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Validity</label>
          <input
            type="text"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Application Method</label>
          <input
            type="text"
            value={applicationMethod}
            onChange={(e) => setApplicationMethod(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default Addvisa;
