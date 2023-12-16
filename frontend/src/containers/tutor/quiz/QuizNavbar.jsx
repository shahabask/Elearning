import React from 'react';
// Import necessary styles
import 'tailwindcss/tailwind.css'; // Assuming you have Tailwind CSS configured
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome

// Your React component code here

function QuizNavbar({ onNavItemClick }) {
  return (
    <nav className="bg-gray-100 p-4"  style={{backgroundColor:"white"}}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
        <ul className="flex space-x-4">
      <li>
        <a
          href="#"
          className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
          onClick={() => onNavItemClick('Scheduled Quizzes')}
        >
          <span className="mr-2">
            <i className="fas fa-calendar-alt"></i>
          </span>
          <span className="hidden md:inline">Scheduled Quizzes</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
          onClick={() => onNavItemClick('Question Bank')}
        >
          <span className="mr-2">
            <i className="fas fa-book"></i>
          </span>
          <span className="hidden md:inline">Question Bank</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
          onClick={() => onNavItemClick('History')}
        >
          <span className="mr-2">
            <i className="fas fa-history"></i>
          </span>
          <span className="hidden md:inline">History</span>
        </a>
      </li>
    </ul>
        </div>
      </div>
    </nav>
  );
}

export default QuizNavbar;
