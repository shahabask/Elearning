
import React from 'react'

function AssignmentShimmer() {
  return (
    <div className='flex'>
      <div>
        <div className="mb-6 shimmer">
          {/* Shimmer label */}
          <div className="shimmer-line w-2/3 h-5 mb-2"></div>
          {/* Shimmer select */}
          <div className="shimmer-line w-full h-8 mb-2"></div>
        </div>

        <div className="mb-6 shimmer">
          {/* Shimmer label */}
          <div className="shimmer-line w-2/3 h-5 mb-2"></div>
          {/* Shimmer file input */}
          <div className="shimmer-line w-full h-8 mb-2"></div>
        </div>

        <button
          
          className="w-full md:w-48 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300 ease-in-out shimmer"
        >
          Submit Assignment
        </button>
      </div>

      <div className='flex'>
        <div className="mb-6 ml-12 pl-5 shimmer">
          {/* Shimmer end date */}
          <div className="shimmer-line w-2/3 h-5 mb-2"></div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentShimmer