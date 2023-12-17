import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'react-feather'; // Import Feather icons
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const videos = [
  {
    id: 1,
    title: 'Video 1',
    description: 'This is the first video description.',
    thumbnail: 'https://example.com/thumbnail1.jpg', // Replace with actual thumbnail URL
  },
  {
    id: 2,
    title: 'Video 2',
    description: 'This is the second video description.',
    thumbnail: 'https://example.com/thumbnail2.jpg', // Replace with actual thumbnail URL
  },
  {
    id: 1,
    title: 'Video 1',
    description: 'This is the first video description.',
    thumbnail: 'https://example.com/thumbnail1.jpg', // Replace with actual thumbnail URL
  },
  {
    id: 2,
    title: 'Video 2',
    description: 'This is the second video description.',
    thumbnail: 'https://example.com/thumbnail2.jpg', // Replace with actual thumbnail URL
  },
  // Add more videos as needed
];



function WatchHistory() {

    const [videoDetails,setVideoDetails]=useState([])
    const [isDeleted,setIsDeleted]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        fetchWatchHistory()
    },[isDeleted])
    
    const fetchWatchHistory=async()=>{
       try {
        const response=await axiosInstance.get('/loadWatchHistory')
    //   console.log(response.data,'res')
        if(response.data=='No History'){
             setVideoDetails([])
        }else{
            setVideoDetails(response.data.videoDetails)
        }
       } catch(error) {
        console.log(error)
       }
    }
  const handleDeleteVideo = async(videoUrl) => {
    
    try {
          const items='single'
         
       await axiosInstance.delete(`/deleteHistory/${items}/${videoUrl}`)
      setIsDeleted(!isDeleted)
    } catch (error) {
       console.log(`can't delete`) 
    }

  };

  const handleClearHistory = async() => {
     try {
        const items='all'
        await axiosInstance.delete(`/deleteHistory/${items}/''`)

        setIsDeleted(!isDeleted)
     } catch (error) {
        console.log(`can't delete`)
     }
  };

  const handleVideoClick=(courseId)=>{
    
    navigate(`/playlist/${courseId}`)
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 ">
       <div className="flex items-center">
        <FontAwesomeIcon icon={faHistory} className="text-xl mr-2" />
        <h1 className="text-3xl font-bold">Watch History</h1>
      </div>
      {videoDetails.length > 0 ? (
        <>
         <div className="mt-4 flex justify-end">
         <button onClick={handleClearHistory} className="text-red-500 hover:text-red-700 flex">
           <Trash2 size={18} />
           <span className="ml-2">Clear All History</span>
         </button>
       </div>
        <div className='overflow-x-auto '>
           
          <div className="flex space-x-4 p-5">
            {videoDetails.map((video,index) => (
              <div key={index} className="relative flex-none w-64 bg-white p-4 shadow-md rounded-md">
                <button
                  onClick={() => handleDeleteVideo(video.videoUrl)}
                  className="absolute top-2 right-2 focus:outline-none"
                >
                  <X size={18} color="#718096" />
                </button>
                <div onClick={()=>handleVideoClick(video.courseId)}>
                <img
                  src={`https://www.skillsync.website/images/${video.thumbnail}`}
                  alt={video.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <h3 className='text-l mb-2 font-semibold'>Subject: {video.courseName}</h3>
                <p className="text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div> </>
      ) : (
        <div className="bg-white p-8 shadow-md rounded-md mt-5 text-center flex-col item-center justify-content-center" style={{ minHeight: '300px', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}>
        <svg className="mx-auto mt-5" width="64" height="64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="30" />
          <path d="M17 34l6-6 6 6M12 22h20" />
        </svg>
        <p className="text-xl text-gray-600 pt-3">No watch history available.</p>
      </div>
      
      )}
      {/* {videos.length > 0 && (
        
      )} */}
    </div>
  );
}

export default WatchHistory;
