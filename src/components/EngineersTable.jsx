import React from "react";

const EngineersTable = ({ engineers, rowsPerPage }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 text-sm">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Engineer ID</th>
            <th className="py-3 px-4 text-left">Specialization</th>
            <th className="py-3 px-4 text-left">Phone Number</th>
            <th className="py-3 px-4 text-left">Start Date</th>
            <th className="py-3 px-4 text-left">End Date</th>
            <th className="py-3 px-4 text-left">Standby Status</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {engineers.slice(0, rowsPerPage).map((engineer) => (
            <tr key={engineer.id} className="border-b">
              <td className="py-3 px-4">{engineer.first_name} {engineer.last_name}</td>
              <td className="py-3 px-4">{engineer.id}</td>
              <td className="py-3 px-4">{engineer.specialization}</td>
              <td className="py-3 px-4">{engineer.phone_number}</td>
              <td className="py-3 px-4">{engineer.start_date || "N/A"}</td>
              <td className="py-3 px-4">{engineer.end_date || "N/A"}</td>
              <td className="py-3 px-4">{engineer.standby_status}</td>
              <td className="py-3 px-4">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EngineersTable;