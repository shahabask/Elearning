
import React from 'react'

function SessionShimmer() {
  return (
    <div className="flex flex-col bg-orange-50 rounded-3xl p-6  shimmer">
    <div className="shimmer-line h-4 mb-2 mx-5 pt-4"></div>
    <div className="shimmer-line w-1/2 h-8 mb-4 pt-4"></div>
    <div className="shimmer-line w-full h-4 mb-2 p-2"></div>
    <div className="shimmer-line w-full h-4 mb-2 p-2"></div>
    <div className="shimmer-line w-full h-4 mb-2 pt-4"></div>
    <div className="shimmer-line w-1/2 h-8"></div>
  </div>
  )
}

export default SessionShimmer