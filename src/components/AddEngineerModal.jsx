import React, { useState } from "react";

export const AddEngineerModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    specialization: "",
    phone_number: "",
    start_date: "",
    end_date: "",
    standby_status: "Primary"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // const response = await fetch("http://localhost:5000/add_engineer", {
      const response = await fetch("https://syncserviceswhatsappbackend-production.up.railway.app/add_engineer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Engineer added successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error adding engineer:", error);
      alert("Failed to add engineer. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Engineer</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
          <input
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            type="date"
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Start Date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
          <input
            type="date"
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="End Date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Engineer
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEngineerModal;

// const AddEngineerModal = ({ onClose }) => {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg w-96">
//           <h2 className="text-xl font-semibold mb-4">Add Engineer</h2>
//           <button onClick={onClose} className="bg-red-500 text-white p-2 rounded">
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   };
  
//   export default AddEngineerModal;
