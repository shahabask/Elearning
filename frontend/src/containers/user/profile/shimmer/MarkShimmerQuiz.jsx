
import React from 'react'

function MarkShimmerQuiz() {
    const shimmerRows = Array.from({ length: 3 }, (_, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : ''}>
          <td className="py-2 px-4 shimmer-line-marksheet" ></td>
          <td className="py-2 px-4 shimmer-line-marksheet"></td>
          <td className="py-2 px-4 shimmer-line-marksheet"></td>
          <td className="py-2 px-4 shimmer-line-marksheet"></td>
          <td className="py-2 px-4 shimmer-line-marksheet"></td>
          <td className="py-2 px-4 shimmer-line-marksheet"></td>
        </tr>
      ));
    
      return (
        <table className="bg-white mb-6">
          <thead>
            <tr>
              <th className="py-2 px-4 shimmer-line-marksheet"></th>
              <th className="py-2 px-4 shimmer-line-marksheet"></th>
              <th className="py-2 px-4 shimmer-line-marksheet"></th>
              <th className="py-2 px-4 shimmer-line-marksheet"></th>
              <th className="py-2 px-4 shimmer-line-marksheet"></th>
              <th className="py-2 px-4 shimmer-line-marksheet"></th>
            </tr>
          </thead>
          <tbody>{shimmerRows}</tbody>
        </table>
  )
}

export default MarkShimmerQuiz