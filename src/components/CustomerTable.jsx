import React, { useState } from "react";
import EditCustomerModal from "./EditCustomerModal";

const CustomerTable = ({ customers, rowsPerPage, onCustomerUpdated }) => {
  const [editingCustomer, setEditingCustomer] = useState(null);

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
  };

  const closeEditModal = () => {
    setEditingCustomer(null);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 text-sm">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Customer ID</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone Number</th>
            <th className="py-3 px-4 text-left">SLA Number</th>
            <th className="py-3 px-4 text-left">SLA Type</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {customers.slice(0, rowsPerPage).map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="py-3 px-4">{customer.name}</td>
              <td className="py-3 px-4">{customer.id}</td>
              <td className="py-3 px-4">{customer.email || "N/A"}</td>
              <td className="py-3 px-4">{customer.phone_number}</td>
              <td className="py-3 px-4">{customer.sla_number}</td>
              <td className="py-3 px-4">{customer.sla_type}</td>
              <td className="py-3 px-4">
                <button 
                  onClick={() => openEditModal(customer)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCustomer && (
        <EditCustomerModal 
          customer={editingCustomer} 
          onClose={closeEditModal} 
          onCustomerUpdated={onCustomerUpdated} 
        />
      )}
    </div>
  );
};

export default CustomerTable;