import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from 'react-star-rating-component';// Make sure to import or define your StarRating component
import axiosInstance from '../../utils/axios';
import { FaArrowLeft } from 'react-icons/fa';

// Sample data for reviews
const sampleReviews = [
  { id: 1, user: 'John Doe', rating: 4, comment: 'Great course! Highly recommended.' },
  { id: 2, user: 'Jane Smith', rating: 5, comment: 'Excellent content and well explained.' },
  // Add more sample reviews as needed
];

function CourseReviews() {
  // State to manage reviews
  const {courseId}=useParams()
  const [reviews, setReviews] = useState([]);
 const navigate=useNavigate()
  useEffect(()=>{
    fetchReviews()

  },[])
  const fetchReviews=async()=>{
    try {
        const response=await axiosInstance.get(`/loadCourseReviews/${courseId}`)

        setReviews(response?.data?.reviews)
    } catch (error) {
        console.log(error)
    }
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.value, 0);
  const averageRating = reviews.length === 0 ? 0 : totalRating / reviews.length;

 const handleGoBack=()=>{
    navigate(`/courseDetails/${courseId}`)
 }
  return (
    <>
      <div style={{ height: '72px' }}></div>
      <div className='bg-slate-200'>

        <button className="text-black text-sm px-4 py-2 rounded-full flex items-center hover:bg-white transition-colors" onClick={handleGoBack}>
      <FaArrowLeft className="mr-2" /> {/* Assuming you have an arrow-left icon */}
      Go Back
    </button>
        <h2 className="text-2xl font-bold mb-4 p-5 text-uppercase" >Course Reviews</h2>
      <div className="container mx-auto p-4" style={{minHeight:'90vh',maxWidth:'1000px'}}>
        {reviews.length === 0 ? (
          <h1>No reviews available for this course.</h1>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-center">
              <StarRating
                name="rating"
                starCount={5}
                value={averageRating} // Use the average rating
                editing={false}
              />
              <span className="ml-2">{averageRating.toFixed(1)}</span>
            </div>
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 mb-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="font-bold mr-2">{`${review?.user?.firstName} ${review?.user?.lastName}`}</div>
                  <StarRating
                    name={`rating-${review._id}`}
                    starCount={5}
                    value={review.value}
                    editing={false}
                  />
                </div>
                <div className="text-gray-700">{review.review}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default CourseReviews;
