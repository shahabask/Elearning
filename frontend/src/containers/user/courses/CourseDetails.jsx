


import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import StarRating from 'react-star-rating-component';
// index.js or your main stylesheet
import '@fortawesome/fontawesome-free/css/all.css';
import { FaEye } from 'react-icons/fa';

function CourseDetails() {
  const [courseInfo, setCourseInfo] = useState('');
  const [isSubscriptionActive, setSubscriptionActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRated,setIsRated]=useState(false)
  const { courseId } = useParams();
  const [error,setError]=useState({})
  const [ratingSubmitted,setRatingSubmitted]=useState(false)
  const [totalAverageRating,setTotalAverageRating]=useState(0)
  const [review,setReview]=useState('')
  useEffect(() => {
    fetchCourseDetails();
  }, [ratingSubmitted]);

  const navigate=useNavigate()
  const fetchCourseDetails = async () => {
    try {
      let response = await axiosInstance.get(`/loadCourseDetails/${courseId}`);
    
      response.data.courseDetails.image = `https://www.skillsync.website/${response.data.courseDetails.image.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`;
      setCourseInfo(response.data.courseDetails);
      setRating(response.data.rating[0]?.value)
      setReview(response.data.rating[0]?.review)
       setIsRated(response.data.rated)
       setTotalAverageRating(response.data?.avgRating)
      const endDateISO = Date.parse(response.data.plan.endDate);
      const endDate = new Date(endDateISO);
    // console.log('endDate',response.data.plan.endDate)
      if (endDate > Date.now()) {
        setSubscriptionActive(true);
        
      }
    } catch (error) {
      toast.error(error?.courseDetails?.data || error.error);
    }
  };

  const handleRatingSubmit = async() => {
    try {
         if(rating==0){
            setError({message:'please rate'})
            return;
         }
      const response =await axiosInstance.post('/rateCourse',{rating,review,courseId})
      // console.log('Rating submitted:', rating);
    setIsModalOpen(false);
    setError({})
    setRatingSubmitted(!ratingSubmitted)
    } catch (error) {
      console.log(error)
    }
    
  };
  const handleReviewDetails=()=>{
    navigate(`/review/${courseId}`)
  }

  return (
    <div>
      <section className="py-5" style={{minHeight: '100vh', backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
      <div className="container px-4 px-lg-5 my-5" >
          <div style={{ height: '40px' }}></div>
          <div className="row gx-4 gx-lg-5 align-items-center  pt-5">
            <div className="col-md-6">
              <img className="card-img-top mb-5 mb-md-0" src={courseInfo.image} alt="..." style={{ height: '400px', borderRadius: '8px', border: '1px solid black' }} />
            </div>

        <div className="col-md-6">
          <h1 className="text-3xl font-extrabold text-gray-900">{courseInfo.course}</h1>
          <p className="lead ">{courseInfo.description}</p>
          <div className='flex-col'>
            <div className='flex'>
          <StarRating
                name="totalRating"
                starCount={5}
                value={totalAverageRating} // Use your variable with the total average rating
                editing={false} // Set to false to disable user interaction
              /> <span style={{fontSize:'13px'}}>({courseInfo.rating?courseInfo.rating?.length:0})</span></div>
               <button className=" text-black text-sm px-4 py-2 rounded-full flex items-center hover:bg-white transition-colors" onClick={handleReviewDetails}>
        <FaEye className="mr-2" />
        View Reviews
      </button>
              </div>
          <div className="d-flex mt-5">
            {isSubscriptionActive ? (
              <>
              <Link
                to={`/playlist/${courseId}`}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <i className="bi-cart-fill me-1"></i>Watch videos
              </Link>
               {isRated?<button
                 onClick={() => setIsModalOpen(true)}
                 className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
               >
                 <i className="bi-star-fill me-1"></i>Edit Rating
               </button> :<button
                 onClick={() => setIsModalOpen(true)}
                 className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
               >
                 <i className="bi-star-fill me-1"></i>Rate Course
               </button>}  </>
            ) : (
              <>
                <Link
                  to="/plans"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <i className="bi-cart-fill me-1"></i>Subscribe Now
                </Link>
             
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Rate Course Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '300px', // Adjust the width as needed
    },
  }}
>
  <h2>Rate the Course</h2>
  <div className='flex-col'>
  <StarRating
    name="rating"
    starCount={5}
    className="text-3xl"
    value={rating}
    onStarClick={(value) => setRating(value)}
  />
  {error?<span style={{color:'red',fontSize:'14px' }}>{error.message}</span>:''}
  <div className="mt-4">
      <label htmlFor="review" className="block text-sm font-medium text-gray-700">
        Write a Review:
      </label>
      <textarea
        id="review"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        className="mt-1 p-2 border rounded-md w-full"
      />
    </div>
  </div>
  <div className="mt-4 flex justify-center space-x-4">
  <button
      onClick={() => setIsModalOpen(false)}
      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
    >
      <i className="fas fa-times"></i> {/* Font Awesome times icon */}
    </button>
    <button
      onClick={() => handleRatingSubmit()}
      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
    >
      <i className="fas fa-check"></i> {/* Font Awesome check icon */}
    </button>
  </div>
</Modal>

  </section>
</div>
);
}

export default CourseDetails;
