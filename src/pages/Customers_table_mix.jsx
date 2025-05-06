import React, { useState, useEffect } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone_number: "",
    email: "",
    sla_type: ""
  });

  useEffect(() => {
    // fetch("http://localhost:5000/get_customers")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/get_customers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched customers:", data);
        setCustomers(Array.isArray(data) ? data : []);
    })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id.includes(searchId) &&
      customer.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleAddCustomer = () => {
    // fetch("http://localhost:5000/add_customer", {
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/add_customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomers([...customers, data]);
        setShowModal(false);
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  return (
    <div className="flex-1 bg-gray-100 min-h-screen px-5">
      <div className="mt-5">
        <p className="text-2xl font-semibold text-gray-800 mb-1">Customers</p>
        <p className="text-sm text-gray-500 mb-4">Dashboard/Customers</p>
      </div>
      <div className="mb-5 flex justify-end">
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          + Add Customer
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
        <input
          type="text"
          placeholder="Customer ID"
          className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="w-full lg:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>
      {
        customers.map((customer)=>{
          return(
            <div>
              {customer.id}
            </div>
          )
        })
      }
      <div className="flex items-center my-4">
        <label className="text-sm text-gray-600 mr-2">Show</label>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <div className="mt-5">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Customer Name", "Customer ID", "Email", "Phone Number", "SLA Type", "Action"].map((heading) => (
                <th
                  key={heading}
                  className="text-left text-gray-600 font-medium px-4 py-2 border border-gray-200"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.slice(0, rowsPerPage).map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">{customer.name}</td>
                <td className="px-4 py-2 border border-gray-200">{customer.id}</td>
                <td className="px-4 py-2 border border-gray-200">{customer.email || "N/A"}</td>
                <td className="px-4 py-2 border border-gray-200">{customer.phone_number}</td>
                <td className="px-4 py-2 border border-gray-200">{customer.sla_type}</td>
                <td className="px-4 py-2 border border-gray-200 text-blue-500 cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              value={newCustomer.phone_number}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone_number: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="SLA Type"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              value={newCustomer.sla_type}
              onChange={(e) => setNewCustomer({ ...newCustomer, sla_type: e.target.value })}
            />
            <button onClick={handleAddCustomer} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Save</button>
            <button onClick={() => setShowModal(false)} className="ml-2 bg-gray-300 px-6 py-2 rounded-md">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;