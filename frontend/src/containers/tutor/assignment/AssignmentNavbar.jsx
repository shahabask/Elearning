

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function AssignmentNavbar({ onNavItemClick }) {
  return (
    <nav className="bg-gray-100 p-4" style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <button
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('Scheduled Assignments')}
              >
                <span className="mr-2">
                  {/* Add your icon or any other visual indicator here */}
                  {/* Example with an icon from FontAwesome */}
                  <i className="fas fa-calendar-alt"></i>
                </span>
                <span className='hidden md:inline'>Scheduled Assignments </span>
              </button>
            </li>
            <li>
              <button
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('Verify Assignments')}
              >
                <span className="mr-2">
                  {/* Add your icon or any other visual indicator here */}
                  {/* Example with an icon from FontAwesome */}
                  <FaCheckCircle className="text-black" />
                </span>
                <span className='hidden md:inline'>Verify Assignment </span>
              </button>
            </li>
            <li>
              <button
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('History')}
              >
                <span className="mr-2">
                  {/* Add your icon or any other visual indicator here */}
                  {/* Example with an icon from FontAwesome */}
                  <i className="fas fa-history"></i>
                </span>
                <span className='hidden md:inline'> History </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AssignmentNavbar;
