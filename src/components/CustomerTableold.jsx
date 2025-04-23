import React from "react";

const CustomerTable = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Filters */}
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

      {/* Add Customer Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          + Add Customer
        </button>
      </div>

      {/* Table */}
      <div>
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

export default CustomerTable;
