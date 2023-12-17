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
// import Assignment from "./Assignment.jsx";
export default function Profile() {
  const [userData,setUserData]=useState()
   const [showForm, setShowForm] = useState(false);
   const [showQuiz,setShowQuiz]=useState(false)
   const [showMarkSheet,setShowMarkSheet]=useState(false)
   const [showAssignment,setShowAssignment]=useState(false)
   const [showWatchHistory,setShowWatchHistory]=useState(false)
   const [subcategories,setSubcategories]=useState('')

  useEffect(()=>{
    
  fetchUser()
 
  },[])
  const fetchUser=async()=>{
   try {
    
     const response=await axiosInstance.get('/loadProfile')
   setUserData(response.data.myProfile)
   console.log('myProfile',response.data.myProfile)

   } catch (error) {
     console.log('error',error.response||error.error)
   }
   
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
   ? `https://www.skillsync.website/${imagePath.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
   : '';
   console.log('img',modifiedImagePath)
   return (
     <div style={{ minHeight: "100vh", backgroundColor: "	#fcdad1" }}>
       <div className="container ">
         <div className="row gutters row-with-padding ">
           <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
             <div className="card h-100">
               <div className="card-body rounded-lg shadow-lg">
                 <div className="account-settings">
                   <div className="user-profile">
                     <div className="user-avatar  with-border flex justify-center">
                       <img
                         src={modifiedImagePath}
                         alt="Maxwell Admin"
                       />
                     </div>
                     <h5 className="user-name font-semibold" style={{ textTransform: 'uppercase' }}>{userData?.firstName} {userData?.secondName}</h5>
                     {/* <h6 className="user-email">{userData?.secondName}</h6> */}
                   </div>
                   <div className="centered-container">
                     <div className="row-container">
                       <div className="colum" onClick={handleEditClick}>
                         <i className="fas fa-edit pt-1" style={{color:"purple"}}></i>
                         <span className="icon"style={{marginLeft:"10px"}}>Edit</span>
                       </div>
                       <div className="colum flex" onClick={handleWatchHistoryClick}>
      <FontAwesomeIcon style={{ color: 'purple' }} icon={faHistory} className=" pt-1" />
      <span className="icon" style={{ paddingLeft: '5px' }}>
      Watch History
      </span>
    </div>
                        <div className="colum" onClick={handleQuizClick}>
                        <i className="fas fa-certificate pt-1"style={{color:"purple"}}></i> 
                       <span className="icon"style={{marginLeft:"10px"}}>
                        Quiz
                       </span>
                       </div>
                       <div className="colum" onClick={handleAssignmentClick}>
  <FontAwesomeIcon style={{color:'purple'}}  icon={faPaperPlane} className="pt-1" />
  <span className="icon" style={{ paddingLeft: "5px" }}>
    Assignment
  </span>
</div>
                       <div className="colum" onClick={handleMarkSheetClick}>
                       <i className="fas fa-clipboard" style={{color:'purple'}}></i>
                       <span className="icon"style={{marginLeft:"10px"}}>
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
           {showForm ? <EditUser userData={userData}  />:showQuiz?<div ><Quizzes quizData={'quizData'} className=''/></div>
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


