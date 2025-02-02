import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 fixed top-0 w-full z-50 h-[12vh] shadow-md">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="navbar-left">
          <ul className="flex list-none p-0 m-0">
            <li className="mr-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black rounded-md px-3 py-2"
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black rounded-md px-3 py-2"
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                }
              >
                Phones
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black rounded-md px-3 py-2"
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                }
              >
                Features
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;