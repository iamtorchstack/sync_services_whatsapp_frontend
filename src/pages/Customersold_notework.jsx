import React, { useState, useEffect } from "react";

import CustomerTable from "../components/CustomerTable";
import AddCustomerModal from "../components/AddCustomerModal";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
    const [addCustomer, setAddCustomer] = useState(false);

  useEffect(() => {
    // fetch("http://localhost:5000/get_customers")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/get_customers")
      .then((response) => response.json())
      .then((data) => setCustomers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleClose = () => setAddCustomer(false);
  const openModal = () => setAddCustomer(true);


  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id.includes(searchId) &&
      customer.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-100 min-h-screen px-5">
      <div className="mt-5">
        <p className="text-2xl font-semibold text-gray-800 mb-1">Customers</p>
        <p className="text-sm text-gray-500 mb-4">Dashboard/Customers</p>
      </div>
      <div className="mb-5 flex justify-end p-4">
        <button 
        onClick={openModal}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
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
      {/* <div className="mt-5">
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
      </div> */}

      {/* Thtis is hte code to display users */}
      <CustomerTable customers={filteredCustomers} rowsPerPage={rowsPerPage} />
      {/* {addEngineer && <AddEngineerModal text={"Hello world"} onClose={handleClose} />} */}
      {addCustomer && <AddCustomerModal onClose={handleClose} />}
    </div>
  );
};

export default Customers;