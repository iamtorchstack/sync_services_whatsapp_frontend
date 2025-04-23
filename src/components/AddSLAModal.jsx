import React, { useState } from "react";

const AddSLAModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    sla_type: "",
    description: "",
    response_time_minutes: "",
    resolution_time_minutes: "",
    response_window: "",
    sla_status: "active"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/add_sla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("SLA added successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      console.error("Error adding SLA:", error);
      alert("Failed to add SLA. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add SLA</h2>
        <div className="grid gap-4">
          <input
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="SLA Type"
            name="sla_type"
            value={formData.sla_type}
            onChange={handleChange}
          />
          <textarea
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Response Time (minutes)"
            name="response_time_minutes"
            value={formData.response_time_minutes}
            onChange={handleChange}
          />
          <input
            type="number"
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Resolution Time (minutes)"
            name="resolution_time_minutes"
            value={formData.resolution_time_minutes}
            onChange={handleChange}
          />
          <input
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Response Window (e.g., Mon-Fri 9am-5pm)"
            name="response_window"
            value={formData.response_window}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add SLA
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

export default AddSLAModal;
