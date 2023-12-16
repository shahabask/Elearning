import React, { useEffect, useState } from 'react';
// import { Document, Page } from 'react-pdf';
import PDFViewer from 'react-pdf-js'
import {axiosInstance} from '../../utils/tutorAxios'



function VerifyAssignment() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedStudentData,setSelectedStudentData]=useState([])
  const [mark, setMark] = useState('');
  const [studentsData,setStudentsData]=useState([])
  const [selectedAssignmentData,setSelectedAssignmentData]=useState({})
  const [submitted,setSubmitted]=useState(false)
  // Placeholder for the pdfFile state
  const [pdfFile, setPdfFile] = useState(null);

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
    const selectedStudent = studentsData.filter((student) => student._id === event.target.value)
    setSelectedStudentData(selectedStudent[0].assignments)
   
  };

 useEffect(()=>{
  fetchStudentsData()
 },[submitted])

 const fetchStudentsData=async()=>{
   
  try {
    const response=await axiosInstance.get('/loadAssignmentData')
  //  console.log('do',response.data.assignments)
    setStudentsData(response.data.assignments)
  } catch (error) {
    console.log(error)
  }
 }
 const handleAssignmentChange = (event) => {
  const selectedAssignmentId = event.target.value;
  
  setSelectedAssignment(selectedAssignmentId);
  // Find the selected assignment in the student data
  const selectedAssignment = selectedStudentData.find(
    (assignment) => assignment.assignmentId === selectedAssignmentId
  );
  setSelectedAssignmentData(selectedAssignment)

  // Set the PDF file based on the found assignment
  if (selectedAssignment) {
    setPdfFile(selectedAssignment.pdf);
  } else {
    setPdfFile(null); // Set to null if no matching assignment is found
  }

};

  const handleMarkChange = (event) => {
    setMark(event.target.value);
  };

  const handleEvaluate = async(e) => {
    e.preventDefault()
   try {

    console.log('coming')
       const response=await axiosInstance.post('/evalutedAssignment',{selectedStudent,selectedAssignment,mark})
       
       
         setSubmitted(!submitted)
       
   } catch (error) {
    console.log('is error is there',error)
   }
  };

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  return (
    <>
  {  studentsData.length!=0 ? <div className="container mx-auto" style={{ minHeight: '92vh' }}>
      <div className="mb-4">
        <label className=" text-sm font-medium text-gray-600">Select Student:</label>
        <select onChange={handleStudentChange} className="mt-1 p-2 border rounded-md w-full">
          <option value="">Select a student</option>
          {studentsData.map((student) => (
            <option key={student._id} value={student._id}>
              {student.studentFirstName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className=" text-sm font-medium text-gray-600">Select Assignment:</label>
        <select onChange={handleAssignmentChange} className="mt-1 p-2 border rounded-md w-full">
          <option value="">Select an assignment</option>
          {selectedStudentData?.map((assignment) => (
            <option key={assignment.assignmentId} value={assignment.assignmentId}>
             {assignment.name}
            </option>
          ))}
        </select>
      </div>

      {pdfFile ? (
        <div className="mb-4 flex" >
          <div className='border rounded-md overflow-hidden shadow-lg'>
          <PDFViewer file={`http://localhost:5000/backend/public/pdf/${encodeURIComponent(pdfFile)}`} />

          </div>
          <div className="flex-1 mb-4 ml-4 p-4 border rounded-md bg-white">
          <h2 className="text-lg font-medium text-gray-800">Assignment Details</h2>
          <p>Total Marks: {selectedAssignmentData.totalMark}</p>
          <p>Constraints:</p>
          <ul className="list-disc pl-4">
            {selectedAssignmentData.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
        </div>
      ) : (
        <div className="mb-4 p-4 border rounded-md bg-gray-100">
          <p className="text-gray-500">Please select an assignment to view the PDF.</p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Enter Mark:</label>
        <input
          type="text"
          value={mark}
          onChange={handleMarkChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <button onClick={(e)=>handleEvaluate(e)} className="bg-blue-500 text-white px-2 py-1 rounded-md" >
  Evaluate Assignment
</button>
    </div> : <div className='text-center' style={{paddingTop:'140px', fontSize:'28px',minHeight:'81vh'}}> <h1 >Nothing For Correction</h1></div> }</>
  );
}

export default VerifyAssignment;
