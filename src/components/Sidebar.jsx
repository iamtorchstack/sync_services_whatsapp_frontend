import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-blue-500">
      <div className="w-52 h-screen text-white flex flex-col p-3">
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-500 p-2 rounded"
                : "hover:bg-blue-600 p-2 rounded"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/chats"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-500 p-2 rounded"
                : "hover:bg-blue-600 p-2 rounded"
            }
          >
            Chats
          </NavLink>
          <NavLink
            to="/dashboard/engineer"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-500 p-2 rounded"
                : "hover:bg-blue-600 p-2 rounded"
            }
          >
            Engineers
          </NavLink>
          <NavLink
            to="/dashboard/customers"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-500 p-2 rounded"
                : "hover:bg-blue-600 p-2 rounded"
            }
          >
            Customers
          </NavLink>

          <NavLink
            to="/dashboard/sla"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-500 p-2 rounded"
                : "hover:bg-blue-600 p-2 rounded"
            }
          >
            SLA
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
