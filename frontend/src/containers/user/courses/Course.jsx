import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import StarRating from 'react-star-rating-component';

function CourseCard({_id,image,course,description,categoryName,rating}) {
  const modifiedImagePath = image
      ? `https://www.skillsync.website/images/${image}`
      : '';
    
      
      const [totalAverageRating,setTotalAverageRating]=useState(0)
      const [isSubscriptionActive,setSubscriptionActive]=useState(false)
      useEffect(()=>{
          fetchUserDetails()  
          const AverageRating = rating?.length > 0
          ? rating.reduce((sum, item) => sum + item.value, 0) / rating.length
          : 0;
          setTotalAverageRating(AverageRating)
          
      },[rating])

      const fetchUserDetails=async()=>{
        try{
         const response=await axiosInstance.get('/getUserDetails')
         
         const endDateISO = Date.parse(response.data.plan.endDate);
     const endDate = new Date(endDateISO);
       
   
     if(endDate> Date.now()){
        setSubscriptionActive(true)
        
     }
        }catch(error){
          console.log('error')
        }
      }
  return (
    <div className="w-60 h-96 bg-neutral-100 rounded-3xl text-black p-4 flex flex-col items-start justify-between gap-3 hover:bg-pink-200 hover:shadow-2xl hover:text-white hover:shadow-purple-200 transition-shadow mx-3 my-5">
    <div className="w-52 h-40 bg-sky-300 rounded-2xl overflow-hidden">
      <img className="w-full h-full object-cover" src={modifiedImagePath} alt="Course Image" />
    </div>
  
    <div className="flex-1 overflow-hidden"> {/* Use flex-1 and overflow-hidden to control the description size */}
      <h5 className="fw-bolder">{course}</h5>
      <span style={{fontSize:'14px'}}>{description.length > 15 ? `${description.slice(0, 15)}...` : description}</span>

      <div className='flex'>
          <StarRating
                name="totalRating"
                starCount={5}
                value={totalAverageRating} // Use your variable with the total average rating
                editing={false} // Set to false to disable user interaction
              /> <span style={{fontSize:'13px'}}>({rating?rating?.length:0})</span>
              </div>
    </div>
  
    {isSubscriptionActive ? (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/courseDetails/${_id}`}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        View Details
      </Link>
    ) : (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/courseDetails/${_id}`}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        View Details
      </Link>
    )}
  </div>
  

  //   <div className="col mb-5">
  //   <div className="card h-100">
   
  //     <img className="card-img-top" src={modifiedImagePath} alt="..." style={{height:'200px'}}/>
  //     <div className="card-body p-4">
  //       <div className="text-center">
  //         <h5 className="fw-bolder">{course}</h5>
  //         <p>{description}</p>
  //       </div>
  //     </div>
  //     <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
  //       <div className="text-center">
  //       <Link style={{textDecoration:'none'}} to={`/plans`} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
  //     Subscribe Now
  //   </Link>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  
  
  )
}

export default CourseCard
