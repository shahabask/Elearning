

import React from 'react'

function CourseShimmer() {
  return (
    <div className="w-60 h-96 bg-neutral-50 rounded-3xl text-black p-4 flex flex-col items-start justify-between gap-3 hover:bg-sky-50 hover:shadow-2xl hover:text-white hover:shadow-sky-50 transition-shadow mx-3 my-5 shimmer">
      <div className="w-52 h-40 bg-sky-300 rounded-2xl shimmer"></div>

      <div className="flex-1 overflow-hidden">
        <h5 className="fw-bolder shimmer"></h5>
        <span style={{ fontSize: '14px' }} className="shimmer"></span>

        <div className='flex shimmer'>
          {/* Star rating component */}
          <span style={{ fontSize: '13px' }} className="shimmer"></span>
        </div>
      </div>

      <div className="shimmer">
        {/* View Details button */}
      </div>
    </div>
  )
}

export default CourseShimmer