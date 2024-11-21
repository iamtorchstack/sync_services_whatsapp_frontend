import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 p-10 bg-blue-50 max-h-screen">
      <div>
        <h1 className="font-bold text-2xl">Welcome Admin </h1>
        <p>Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {["112 Clients", "44 Engineers", "108 Charts", "63 Users"].map(
          (stat, index) => (
            <div
              key={index}
              className="bg-white px-4 py-6 rounded-lg shadow-md flex items-center justify-center space-x-10"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
              <p className="text-xl font-semibold">{stat}</p>
            </div>
          )
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-14">
        <h3 className="text-lg font-semibold mb-4">Orders</h3>
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="border-b-2">
            <tr>
              <th className="py-2">Name</th>
              <th>Engineer ID</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">Name</td>
                  <td>Engineer ID</td>
                  <td>Email</td>
                  <td>Phone Number</td>
                  <td>Start Date</td>
                  <td>End Date</td>
                  <td>
                    <button className="text-blue-500">View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
