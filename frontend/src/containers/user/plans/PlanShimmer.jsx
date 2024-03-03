
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import './planShimmer.css'
function PlanShimmer() {
  return (
    <div className="columns" style={{ minHeight: '500px' }}>
    <ul className="price shimmer">
      <li className="header shimmer-line-plan"></li>
      <li className="grey text-purple shimmer-line-plan"></li>
      <Scrollbars style={{ height: '220px' }}>
        <ul>
          <li className="shimmer-line-plan"></li>
          <li className="shimmer-line-plan"></li>
          <li className="shimmer-line-plan"></li>
          {/* Repeat shimmer lines for the number of benefits you want to show */}
        </ul>
      </Scrollbars>
      <li className="grey shimmer-line-plan">
        <button className="button shimmer-line-plan"></button>
      </li>
    </ul>
  </div>
  )
}

export default PlanShimmer