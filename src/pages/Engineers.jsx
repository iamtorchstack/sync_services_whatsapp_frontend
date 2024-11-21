import React, { useState } from "react";
import { Modalpopup } from "../components/Modal";

const dummyEngineers = Array(20)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    name: `Engineer ${index + 1}`,
    email: `engineer${index + 1}@company.com`,
    phone: `+123456789${index}`,
    startDate: "2022-01-01",
    endDate: "2023-01-01",
  }));

const Engineers = () => {
  const [engineers] = useState(dummyEngineers);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addEngineer, setEngineer] = useState(false);
  const handleclose = () => setEngineer(false);
  const OpenModal = () => setEngineer(true);

  const filteredEngineers = engineers.filter(
    (engineer) =>
      engineer.id.toString().includes(searchId) &&
      engineer.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="px-5">
          <div className="mt-5">
            <p className="text-2xl font-semibold text-gray-800 mb-1">
              Engineers
            </p>
            <p className="text-sm text-gray-500 mb-4">Dashboard/Engineers</p>
          </div>
          <div className="flex justify-end p-4">
            <button
              onClick={OpenModal}
              className="bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              + Add Engineer
            </button>
          </div>

          <div className="flex items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Engineer ID"
              className="border border-gray-300 rounded-md p-2 w-1/4"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Engineer Name"
              className="border border-gray-300 rounded-md p-2 w-1/4"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Engineer Location"
              className="border border-gray-300 rounded-md p-2 w-1/4"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
              SEARCH
            </button>
          </div>

          <div className="flex items-center mb-4">
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

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Engineer ID</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone Number</th>
                  <th className="py-3 px-4 text-left">Start Date</th>
                  <th className="py-3 px-4 text-left">End Date</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {filteredEngineers.slice(0, rowsPerPage).map((engineer) => (
                  <tr key={engineer.id} className="border-b">
                    <td className="py-3 px-4">{engineer.name}</td>
                    <td className="py-3 px-4">{engineer.id}</td>
                    <td className="py-3 px-4">{engineer.email}</td>
                    <td className="py-3 px-4">{engineer.phone}</td>
                    <td className="py-3 px-4">{engineer.startDate}</td>
                    <td className="py-3 px-4">{engineer.endDate}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {addEngineer && <Modalpopup text={"Hello world"} onClose={handleclose} />}
    </>
  );
};

export default Engineers;
