import { useEffect, useState } from "react";
import axiosInstance from '../../utils/axios.js'

import EditUser from "./EditUser.jsx";
import Quiz from "./Quizzes.jsx";
import Quizzes from "./Quizzes.jsx";
import MarkSheet from "./MarkSheet.jsx";
import { faHistory, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Assignment from "./Assignment.jsx";
import WatchHistory from "./WatchHistory.jsx";
import './ProfileShimmer.css'
// import Assignment from "./Assignment.jsx";
export default function Profile() {
  const [userData,setUserData]=useState()
   const [showForm, setShowForm] = useState(false);
   const [showQuiz,setShowQuiz]=useState(false)
   const [showMarkSheet,setShowMarkSheet]=useState(false)
   const [showAssignment,setShowAssignment]=useState(false)
   const [showWatchHistory,setShowWatchHistory]=useState(false)
   const [subcategories,setSubcategories]=useState('')
   const [userUpdated,setUserUpdated]=useState(false)
  useEffect(()=>{
    
  fetchUser()
 
  },[userUpdated])
  const fetchUser=async()=>{
   try {
    
     const response=await axiosInstance.get('/loadProfile')
   setUserData(response.data.myProfile)
  

   } catch (error) {
     console.log('error',error.response||error.error)
   }
   
  }
  const checkProfileUpdate=()=>{
     setUserUpdated(!userUpdated)
  }
   const handleEditClick = () => {
     setShowForm((prevShowForm) => !prevShowForm);
     setShowQuiz(false)
     setShowMarkSheet(false)
     setShowAssignment(false)
     setShowWatchHistory(false)
   };

  const handleQuizClick=()=>{
      setShowQuiz((prevShowQuiz)=>!prevShowQuiz)
      setShowForm(false)
      setShowMarkSheet(false)
      setShowAssignment(false)
      setShowWatchHistory(false)
  }
  const handleMarkSheetClick=()=>{
    setShowMarkSheet(!showMarkSheet)
    setShowForm(false)
    setShowQuiz(false)
    setShowAssignment(false)
    setShowWatchHistory(false)
  }

  const handleAssignmentClick=()=>{
    
     setShowAssignment(!showAssignment)
    setShowMarkSheet(false)
    setShowForm(false)
    setShowQuiz(false)
    setShowWatchHistory(false)
  }

  const handleWatchHistoryClick=()=>{

    setShowWatchHistory(!showWatchHistory)
    setShowMarkSheet(false)
    setShowForm(false)
    setShowQuiz(false)
    setShowAssignment(false)
  }
  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    return formattedDate;
  };
   const imagePath = userData?.image
  const modifiedImagePath = imagePath
   ? `https://www.skillsync.website/images/${imagePath}`
   : '';
   
   return (
     <div style={{ minHeight: "100vh"}} className="bg-slate-200">
       <div className="container ">
         <div className="row gutters row-with-padding ">
         <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
             <div className="card h-100 bg-white">
               <div className="card-body rounded-lg shadow-lg">
                 <div className="account-settings">
                   <div className="user-profile ">
                     <div className="user-avatar flex justify-center ">
                       <img
                         src={modifiedImagePath}
                         alt="Maxwell Admin"
                       />
                     </div>
                     <h5 className="user-name font-semibold" style={{ textTransform: 'uppercase' }}>{userData?.firstName} {userData?.secondName}</h5>
                     {/* <h6 className="user-email">{userData?.secondName}</h6> */}
                   </div>
                   <div className="centered-container ">
                     <div className="row-container cursor-pointer w-full  ">
                       <div className="flex my-2 hover:bg-violet-900 text-purple-900 hover:text-white rounded-lg p-2 " onClick={handleEditClick}>
                         <i className="fas fa-edit pt-1 ml-6"></i>
                         {/* <FaEdit className="pt-1 ml-6 w-4 h-4"/> */}
                         <span className="icon ml-4 font-semibold">Edit</span>
                       </div>
                       <div className=" flex my-2 hover:bg-violet-900 text-purple-900 hover:text-white rounded-lg p-2" onClick={handleWatchHistoryClick}>
      <FontAwesomeIcon  icon={faHistory} className=" pt-1 ml-6  " />
      <span className="icon ml-4 font-semibold">
      Watch History
      </span>
    </div>
                        <div className="flex my-2 hover:bg-violet-900 hover:text-white rounded-lg p-2 text-purple-900" onClick={handleQuizClick}>
                        <i className="fas fa-certificate pt-1 ml-6  "></i> 
                       <span className="icon ml-4 font-semibold">
                        Quiz
                       </span>
                       </div>
                       <div className="flex my-2 hover:bg-violet-900 hover:text-white rounded-lg p-2 text-purple-900" onClick={handleAssignmentClick}>
  <FontAwesomeIcon  icon={faPaperPlane} className="pt-1 ml-6 " />
  <span className="icon ml-4 font-semibold" >
    Assignment
  </span>
</div>
                       <div className="flex my-2 hover:bg-violet-900 hover:text-white rounded-lg p-2 text-purple-900" onClick={handleMarkSheetClick}>
                       <i className="fas fa-clipboard ml-6 " ></i>
                       <span className="icon ml-4 font-semibold">
                          MarkSheet
                       </span>
                       </div>
                       
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mb-5 mt-5">
           {showForm ? <EditUser userData={userData}  conformUpdation={checkProfileUpdate}/>:showQuiz?<div ><Quizzes quizData={'quizData'} className=''/></div>
           :showMarkSheet?<MarkSheet/>:showAssignment?<Assignment/> :showWatchHistory?<WatchHistory/>:( 
       <div className="bg-white shadow-md p-4 rounded-lg" style={{minHeight:'50vh'}}>
         <h1 className="text-3xl font-bold mb-4 text-purple-800" style={{ textTransform: 'uppercase' }}>{userData?.firstName}</h1>
         {/* <p className="text-gray-600 text-sm mb-2">
           {userData?.address?.city}, {userData?.address?.state}, {userData?.address?.country}
         </p> */}
         <p className="text-gray-600 text-m mb-2 pt-2 font-semibold text-purple-800">Email: <span>{userData?.email}</span></p>
         <div className="mb-4">
           <p className="text-gray-600 text-m mb-2 pt-2 font-semibold text-purple-800">Phone:{userData?.phone}</p>
           {/* <ul className="list-disc list-inside">
             {userData?.skills?.map((skill, index) => (
               <li key={index}>{skill}</li>
             ))}
           </ul> */}
         {userData?.subscription?.endDate? <p className="text-gray-600 text-m font-semibold mb-2 pt-2 text-purple-800">Subscription EndDate:{formatDate(userData.subscription?.endDate)}</p> :''} 
         </div>
         <div className="mb-4">
           {/* <p className="text-gray-700 font-semibold">About Me:</p> */}
           {/* <p className="text-gray-600">{userData?.description}</p> */}
         </div>
       </div>
    
   )} </div>
         </div>
       </div>
     </div>
   );
 }


