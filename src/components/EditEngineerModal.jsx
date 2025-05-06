import React, { useState, useEffect } from "react";

const EditCustomerModal = ({ customer, onClose, onCustomerUpdated }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({ ...customer });
  const [slaTypes, setSlaTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch available SLA types
  useEffect(() => {
    
    // fetch("http://localhost:5000/get_sla_types")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/get_sla_types")
      .then((response) => response.json())
      .then((data) => setSlaTypes(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching SLA types:", error));
  }, []);

  const handleChange = (e) => {
    setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // const response = await fetch(`http://localhost:5000/update_customer/${customer.id}`, {
      const response = await fetch(`https://syncserviceswhatsappbackend-production.up.railway.app/${customer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
      });

      const data = await response.json();
      if (response.ok) {
        onCustomerUpdated(data.customer); // Refresh customer list
        onClose();
      } else {
        setError(data.message || "Failed to update customer");
      }
    } catch (error) {
      setError("Error updating customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedCustomer.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={updatedCustomer.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={updatedCustomer.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">SLA Type</label>
            <select
              name="sla_type"
              value={updatedCustomer.sla_type}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select SLA Type</option>
              {slaTypes.map((sla) => (
                <option key={sla.id} value={sla.sla_type}>
                  {sla.sla_type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;