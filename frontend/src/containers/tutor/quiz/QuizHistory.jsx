import React from 'react';
import { FaEye } from 'react-icons/fa'

function QuizHistory() {
  return (



<div style={{backgroundColor:'rgba(224, 176, 255, 0.2)',minHeight: "81vh" }}>
<h1 className="text-2xl font-bold mb-4 text-center">History</h1>
<div className="flex flex-wrap justify-between px-5">
  {/* Repeat this block for other quiz history cards */}
  <div
    className="bg-white rounded-md overflow-hidden shadow-md w-30% max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105 mb-4 "
  >
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">Quiz History 1</div>
      <p className="text-gray-600 text-sm mb-2">Score: 90%</p>
      <p className="text-gray-600 text-sm mb-2">Date: January 1, 2023</p>
      <button className=" text-black px-4 py-2 rounded-full flex items-center hover:bg-blue-200 transition-colors">
        <FaEye className="mr-2" />
        Review
      </button>
    </div>
  </div>
  <div
    className="bg-white rounded-md overflow-hidden shadow-md w-30% max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105 mb-4 "
  >
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">Quiz History 1</div>
      <p className="text-gray-600 text-sm mb-2">Score: 90%</p>
      <p className="text-gray-600 text-sm mb-2">Date: January 1, 2023</p>
      <button className=" text-black px-4 py-2 rounded-full flex items-center hover:bg-blue-200 transition-colors">
        <FaEye className="mr-2" />
        Review
      </button>
    </div>
  </div>
  <div
    className="bg-white rounded-md overflow-hidden shadow-md w-30% max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105 mb-4 "
  >
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">Quiz History 1</div>
      <p className="text-gray-600 text-sm mb-2">Score: 90%</p>
      <p className="text-gray-600 text-sm mb-2">Date: January 1, 2023</p>
      <button className=" text-black px-4 py-2 rounded-full flex items-center hover:bg-blue-200 transition-colors">
        <FaEye className="mr-2" />
        Review
      </button>
    </div>
  </div> 
  {/* Repeat this block for other quiz history cards */}
  </div>
{/* Add more cards for other quiz histories */}
</div>
  );
}

export default QuizHistory;
