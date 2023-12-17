import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import axios from 'axios';
import Assignments from '../../../../../backend/models/assignmentModel';
import { toast } from 'react-toastify';
// import {axiosInstance} from '../../utils/axios';




function Assignment() {

  const [assignments,setAssignments]=useState([])
  const [submitted,setSubmitted]=useState(false)
 function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAssignmentChange = (event) => {
    const assignmentId = event.target.value
    const selected = assignments.find((assignment) => assignment._id === assignmentId);
    setSelectedAssignment(selected);
  };

  useEffect(()=>{
    loadAssignments()
  },[submitted])
  const loadAssignments=async()=>{

   const response=await axiosInstance.get('/loadAssignmentsData') 
     setAssignments(response.data.pendingAssignment)
    
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async(e) => {
  e.preventDefault()
    try{



const response = await axiosInstance.post('/submitassignment', { selectedAssignment, selectedFile }, {
 headers: {
   "Content-Type": "multipart/form-data",
 },

  });
  setSubmitted(!submitted)

toast.success('successfully submitted')
      // console.log(response)
     
      // console.log(`Submitting ${selectedAssignment.name}: ${selectedFile.name}`);
   
  }catch(error){
    console.log('error',error)
  }
  };
  
  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6">Assignment Submission</h2>
      {assignments.length > 0 ? (
       <div className='flex'>
        <div>
       <div className="mb-6">
         <label htmlFor="assignmentSelect" className="block text-sm font-medium text-gray-600 mb-2">
           Select Assignment:
         </label>
         <select
           id="assignmentSelect"
           onChange={handleAssignmentChange}
           value={selectedAssignment?._id}
           className="w-full md:w-96 p-2 border rounded-md"
         >
          <option>select Assignment</option>
           {assignments.map((assignment) => (
             <option key={assignment?._id} value={assignment?._id}>
               {assignment?.name}
             </option>
           ))}
         </select>
       </div>
    
       <div className="mb-6">
         <label htmlFor="fileInput" className="block text-sm font-medium text-gray-600 mb-2">
           Select PDF File:
         </label>
         <input
           type="file"
           id="fileInput"
           accept=".pdf"
           onChange={handleFileChange}
           className="w-full md:w-96 p-2 border rounded-md"
         />
       </div>
      
     
       
       <button
         onClick={(e)=>handleSubmit(e)}
         className="w-full md:w-48 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300 ease-in-out"
       >
         Submit Assignment
       </button>
       </div>
       <div className='flex'>
  <div className="mb-6 ml-12 pl-5">
    {selectedAssignment?.endingDate && (
      <p className="text-xl text-gray-700 mb-10 px-5 font-semibold">
        Assignment End Date: <span className='text-gray-700 font-bold'>{formatDate(selectedAssignment?.endingDate)}</span>
      </p>
    )}
  </div>
</div>

     </div>
     
      
      ) : (

        <div style={{minHeight:'300px',fontSize:'20px',color:'gray'}} className='text-center'>
        <h1 className=" pt-5">No assignments available for submission.</h1>
         <h1>Everything completed</h1>
        </div>
      )}
    </div>
  );
}

export default Assignment;
