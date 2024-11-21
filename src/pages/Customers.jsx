import React, { useState } from "react";

const Customers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  return (
    <div className="flex-1 bg-gray-100 min-h-screen px-5">
      <div className="mt-5">
        <p className="text-2xl font-semibold text-gray-800 mb-1">Customers</p>
        <p className="text-sm text-gray-500 mb-4">Dashboard/Customer</p>
      </div>
      <div>
        <div className="mb-5 flex justify-end">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            + Add Customer
          </button>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
          <input
            type="text"
            placeholder="CustomerID"
            className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select Companies</option>
            <option value="company1">Company 1</option>
            <option value="company2">Company 2</option>
          </select>
          <button className="w-full lg:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Search
          </button>
        </div>
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
      <div className="mt-5">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Name",
                "Customer ID",
                "Contact Person",
                "Email",
                "Phone Number",
                "Status",
                "Action",
              ].map((heading) => (
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
            {[...Array(20)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">Name</td>
                <td className="px-4 py-2 border border-gray-200">
                  Engineer ID
                </td>
                <td className="px-4 py-2 border border-gray-200">Email</td>
                <td className="px-4 py-2 border border-gray-200">
                  Phone Number
                </td>
                <td className="px-4 py-2 border border-gray-200">Start Date</td>
                <td className="px-4 py-2 border border-gray-200">End Date</td>
                <td className="px-4 py-2 border border-gray-200 text-blue-500 cursor-pointer">
                  Action
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
