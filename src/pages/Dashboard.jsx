import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_customers: 0,
    total_engineers: 0,
    total_chats: 0,
    total_users: 0,
    engineers: [],
    customers: [],
    users: [],
    chats_per_month: [], // Data for chat trends
    users_per_month: [], // Data for user trends
  });

  useEffect(() => {
    // fetch("http://localhost:5000/dashboard_data")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/dashboard_data")
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
    <div className="flex-1 p-10 bg-blue-50 max-h-screen">
      <div>
        <h1 className="font-bold text-2xl">Welcome Admin</h1>
        <p>Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {[
          `${dashboardData.total_customers} Customers`,
          `${dashboardData.total_engineers} Engineers`,
          `${dashboardData.total_chats} Messages`,
          `${dashboardData.total_users} Users`,
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white px-4 py-6 rounded-lg shadow-md flex items-center justify-center space-x-10"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
            <p className="text-xl font-semibold">{stat}</p>
          </div>
        ))}
      </div>

      {/* Line Charts Section */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Chats Per Month Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Messages Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.chats_per_month}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="chats" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users Per Month Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Users Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.users_per_month}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engineers Table */}
      <TableSection title="Engineers" data={dashboardData.engineers || []} columns={["First Name", "Last Name", "Phone Number", "Start Date", "End Date", "Standby Status"]} />

      {/* Customers Table */}
      <TableSection title="Customers" data={dashboardData.customers || []} columns={["Name", "Phone Number", "Email", "Created At"]} />

      {/* Users Table */}
      <TableSection title="Users" data={dashboardData.users || []} columns={["UserName", "Phone Number", "Created At"]} />
    </div>
  );
};


const TableSection = ({ title, data = [], columns }) => {
  // Debugging log
  console.log("Columns:", columns);
  console.log("Data:", data);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <table className="min-w-full text-left text-sm text-gray-600">
        <thead className="border-b-2">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-2">{col}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border-b">
                {columns.map((col, colIndex) => {
                  // Checking if the key exists in the item
                  const key = col.toLowerCase().replace(" ", "_");
                  console.log(`Checking key: ${key} in item`, item);  // Debugging log
                  return (
                    <td key={colIndex} className="py-2">
                      {item[key] || "N/A"}
                    </td>
                  );
                })}
                <td>
                  <button className="text-blue-500 hover:underline">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No {title.toLowerCase()} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


// const TableSection = ({ title, data = [], columns }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mt-8">
//       <h3 className="text-lg font-semibold mb-4">{title}</h3>
//       <table className="min-w-full text-left text-sm text-gray-600">
//         <thead className="border-b-2">
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index} className="py-2">{col}</th>
//             ))}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <tr key={index} className="border-b">
//                 {columns.map((col, colIndex) => (
//                   <td key={colIndex} className="py-2">{item[col.toLowerCase().replace(" ", "_")] || "N/A"}</td>
//                 ))}
//                 <td>
//                   <button className="text-blue-500 hover:underline">View</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length + 1} className="text-center py-4">
//                 No {title.toLowerCase()} found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default Dashboard;