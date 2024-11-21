export const Modalpopup = ({ onClose, text }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center">
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="Name"
        />
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="Engineer ID"
        />
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="Email"
        />
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="Phone Number"
        />
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="Start Date"
        />
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="End Date"
        />
        <input
          className="py-3 px-4 text-left border border-gray-300 rounded"
          placeholder="Action"
        />
        <div className="flex justify-between">
          {/* Handle add engineer api */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Add
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
