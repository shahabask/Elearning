import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { Scrollbars } from 'react-custom-scrollbars';
import MarkShimmerAssignment from './shimmer/MarkShimmerAssignment';
import MarkShimmerQuiz from './shimmer/MarkShimmerQuiz';


function MarkSheet() {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [dataArrived,setDataArrived]=useState(false)



  // Calculate total average for quizzes
  const quizAverage =
    (quizzes.reduce((acc, quiz) => acc + (quiz.correctAnswers / quiz.totalQuestions), 0) / quizzes.length) * 100;

  

  useEffect(() => {
    fetchMarkSheet();
  }, []);

  const fetchMarkSheet = async () => {
    try {
      // Fetch quiz and assignment data from the server using axios
      const response = await axiosInstance.get('/loadMarkSheet');
     
         const quizzesData = response.data.result;

         // Sort quizzes based on the 'time' field in descending order
         const sortedQuizzes = [...quizzesData].sort((a, b) => {
           const timeA = new Date(a.time).getTime(); // Convert time to milliseconds
           const timeB = new Date(b.time).getTime();
           return timeB - timeA; // Sort in descending order
         });
         
         setQuizzes(sortedQuizzes);
      setAssignments(response.data.assignments);
      setDataArrived(true)
    } catch (error) {
      console.error('Error fetching mark sheet data:', error);
    }
  };

  function formatStandardDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg" style={{minHeight:'50vh'}}>
      <h1 className="text-3xl font-bold mb-6">Mark Sheet</h1>


  {/* Table of Assignment Results */}
 {!dataArrived?<MarkShimmerAssignment/>:assignments.length!=0 ?<table className=" bg-white mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4">Assignment Name</th>
            <th className="py-2 px-4">Subject</th>
            <th className="py-2 px-4">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : ''}>
              <td className="py-2 px-4">{assignment.name}</td>
              <td className="py-2 px-4">{assignment.subject}</td>
              <td className="py-2 px-4">{assignment.markScored}</td>
            </tr>
          ))}
        </tbody>
      </table>:""} 
      {/* Table of Quiz Results */}

      <Scrollbars style={{ height: 220 }}>
    {!dataArrived?<MarkShimmerQuiz/>:quizzes.length!=0? <table className=" bg-white  mb-6 ">
        <thead>
          <tr>
            <th className="py-2 px-4 ">Quiz Name</th>
            <th className="py-2 px-4 ">Course</th>
            <th className="py-2 px-4">Number of Questions</th>
            <th className="py-2 px-4">Total Score</th>
            <th className="py-2 px-4">Wrong Answers</th>
            <th className="py-2 px-4 ">Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : ''}>
              <td className="py-2 px-4">{quiz.quizName}</td>
              <td className="py-2 px-4">{quiz.subCategory}</td>
              <td className="py-2 px-4">{quiz.totalQuestions}</td>
              <td className="py-2 px-4">{quiz.correctAnswers}</td>
              <td className="py-2 px-4">{quiz.totalQuestions-quiz.correctAnswers}</td>
              <td className="py-2 px-4">{formatStandardDate(quiz?.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>:''} 
      </Scrollbars>
    
 
      {/* Total Averages */}
      <div className="mt-6 flex mx-5 pl-5">
    { quizzes.length===0?<div className='text-align-center'><p className="text-xl font-bold pr-5 text-red-600">Not Attended Any Quizz !!</p></div>:   <p className="text-xl font-bold pr-5">Total Average: <span className="text-green-500">{quizAverage.toFixed(2)}%</span></p>}
        {/* <p className="text-xl font-bold pr-5">Assignment Average: <span className="text-green-500">{assignmentAverage.toFixed(2)}%</span></p> */}
        {/* <p className="text-xl font-bold">Total Average: <span className="text-green-500">{totalAverage}%</span></p> */}
      </div>
    </div>
  );
}

export default MarkSheet;
