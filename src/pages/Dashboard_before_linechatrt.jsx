import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_customers: 0,
    total_engineers: 0,
    total_chats: 0,
    total_users: 0,
    engineers: [],  // Ensure engineers is initialized as an empty array
    customers: [],  // Ensure customers is initialized as an empty array
    users: [],      // Ensure users is initialized as an empty array
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
          `${dashboardData.total_chats} Chats`,
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

      {/* Engineers Table */}
      <TableSection title="Engineers" data={dashboardData.engineers || []} columns={["First Name", "Last Name","Phone Number", "Start Date", "End Date", "Standby Status"]} />

      {/* Customers Table */}
      <TableSection title="Customers" data={dashboardData.customers || []} columns={["Name", "Phone", "Email", "Created At"]} />

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