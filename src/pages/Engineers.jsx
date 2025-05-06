import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
// import "./styles.css"; // Import custom scrollbar styles
// import { Modalpopup } from "../components/Modal";
import EngineersTable from "../components/EngineersTable";
import AddEngineerModal from "../components/AddEngineerModal";

const Engineers = () => {
  const [engineers, setEngineers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addEngineer, setAddEngineer] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:5000/get_engineers")
  //     .then((response) => response.json())
  //     .then((data) => setEngineers(data))
  //     .catch((error) => console.error("Error fetching engineers:", error));
  // }, []);

  useEffect(() => {
    // fetch("http://localhost:5000/get_engineers")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/get_engineers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched engineers:", data);
        setEngineers(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching engineers:", error));
  }, []);

  const handleClose = () => setAddEngineer(false);
  const openModal = () => setAddEngineer(true);

  // console.log("engineers",engineers)

  // const filteredEngineers = engineers.filter(
  //   (engineer) =>
  //     engineer.id.includes(searchId) &&
  //     engineer.first_name.toLowerCase().includes(searchName.toLowerCase())
  // );

  const filteredEngineers = Array.isArray(engineers)
  ? engineers.filter(
      (engineer) =>
        engineer.id.includes(searchId) &&
        engineer.first_name.toLowerCase().includes(searchName.toLowerCase())
    )
  : [];

  return (
    <div className="flex-1 bg-gray-100 min-h-screen px-5">
      <div className="mt-5">
        <p className="text-2xl font-semibold text-gray-800 mb-1">Engineers</p>
        <p className="text-sm text-gray-500 mb-4">Dashboard/Engineers</p>
      </div>
      <div className="flex justify-end p-4">
        <button
          onClick={openModal}
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
      <EngineersTable engineers={filteredEngineers} rowsPerPage={rowsPerPage} />
      {/* {addEngineer && <AddEngineerModal text={"Hello world"} onClose={handleClose} />} */}
      {addEngineer && <AddEngineerModal onClose={handleClose} />}
    </div>
  );
};

export default Engineers;