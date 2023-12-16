import { useState } from 'react'


function PlanCard({plan,onEditClick}) {

  return (
    <div className="group relative overflow-hidden h-72 w-64 bg-sky-300 rounded-xl m-5 flex">
      <div className="absolute w-56 h-64 bg-gray-50 z-4 top-4 left-4 opacity-50 rounded-2xl blur duration-300 group-hover:blur-none transform:rotate3d(1,-1,1,30deg) duration-500 group-hover:transform:rotate3d(1,-1,1,0deg)"></div>
      <div className="absolute w-56 h-64 z-4 top-4 left-4 p-3 rounded-2xl flex flex-col  items-start  transform:rotate3d(1,-1,1,30deg) duration-500 group-hover:transform:rotate3d(1,-1,1,0deg)">
        <span className="text-red-800 text-2xl font-extrabold">{plan?.subscriptionMode}</span>
       {plan?.benifits?.map((benefit,index)=>(<span className="text-gray-800 font-bold z-5" key={index}>
        {benefit}
        </span>))} 
        <span className="bg-black-100 text-black px-2 py-1 rounded-full text-xs font-semibold my-2">
  ₹ {plan.price}
</span>
<button
        className="bg-gray-50 px-3 py-2 rounded-xl hover:bg-sky-600 duration-300"
        onClick={() => onEditClick(plan)}
      >          Edit
        </button>
      </div>

      {/* <svg
        y="0"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        width="100"
        viewBox="0 0 10 10"
        preserveAspectRatio="xMidYMid meet"
        height="100"
        className="fill-sky-400 w-64 h-64 absolute -bottom-20 -left-32"
      >
        <path
          d="M0,5A5,5,0,1,0,5,0,5,5,0,0,0,0,5ZM8.12,5A3.12,3.12,0,1,1,5,1.88,3.12,3.12,0,0,1,8.12,5Z"
        ></path>
      </svg> */}
      
    </div>

  )
}

export default PlanCard