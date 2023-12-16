import React, { useEffect, useState } from 'react';
import {axiosInstance, axiosInstance as tutorAxiosInstance} from '../../utils/tutorAxios'
import { toast } from 'react-toastify';
import { FaPlus,FaEye } from 'react-icons/fa'; 
function ScheduledQuizzes() {
  const [isAddQuizModalOpen, setAddQuizModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(5);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizName,setQuizName]=useState('')
  const [scheduledQuizzes,setScheduledQuizzes]=useState([])
  const [subjects,setSubjects]=useState([])
  const [questions,setQuestions]=useState([])
  const [isQuizAdded,setQuizAdded]=useState(false)
  // Mock data for questions. Replace this with your actual data.
 useEffect(()=>{
  fetchQuizDetails()

 },[isQuizAdded])
  const fetchQuizDetails=async()=>{
    try{
      const response=await tutorAxiosInstance.get('/loadQuizDetails' )
         setScheduledQuizzes(response?.data?.quizzes)
         setSubjects(response?.data?.subCategories[0]?.allSubCategories)
         setQuestions(response?.data?.questions)
     

    }catch(error){
         console.log('error')
    }
  }
 

  const handleAddQuizClick = () => {
    setAddQuizModalOpen(true);
  };

  const handleAddQuizClose = () => {
    setAddQuizModalOpen(false);
    // Reset selected values
    setSelectedSubcategory('');
    setSelectedNumQuestions(5);
    setSelectedQuestions([]);
    setQuizName('')
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleNumQuestionsChange = (e) => {
    setSelectedNumQuestions(Number(e.target.value));
  };

  const handleQuestionCheckboxChange = (questionId) => {
    const isQuestionSelected = selectedQuestions.includes(questionId);
    let updatedSelectedQuestions;

    if (isQuestionSelected) {
      // Remove the question from the selected list
      updatedSelectedQuestions = selectedQuestions.filter((id) => id !== questionId);
    } else {
      // Add the question to the selected list
      updatedSelectedQuestions = [...selectedQuestions, questionId];
    }
    
    setSelectedQuestions(updatedSelectedQuestions);
  };

  // Function to handle submitting the quiz
  const handleAddQuizSubmit =async (e) => {
    // Handle the submission logic here
    e.preventDefault()
    try{
       
      const response=await axiosInstance.post('/addQuiz',{quizName,selectedSubcategory,selectedQuestions})
         
  
         toast.success('successfull')
         setQuizAdded(!isQuizAdded)
         
    }catch(error){
         toast.error('error')
        }
        
        handleAddQuizClose();

  
  };

  return (
    <div style={{backgroundColor:'rgba(224, 176, 255, 0.2)',minHeight: "81vh" ,}}>
     
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
          onClick={handleAddQuizClick}
        >
          <FaPlus className="mr-2 " />
          <span className='hidden md:inline'>Add Quiz</span>
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4 px-5 text-center">Scheduled Quizzes</h2>

      {/* Existing Quiz Cards */}
      <div className="flex flex-wrap justify-center gap-4 px-5">
        {/* Mock data, replace with actual quiz data */}
        {scheduledQuizzes?.map((scheduledQuiz, index) => (
          <div
            className="bg-white rounded-md overflow-hidden shadow-md w-64 max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105"
            key={index}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Name: {scheduledQuiz?.name}</div>
              <p className="text-gray-600 text-sm mb-2">Subject: {scheduledQuiz?.subCategory}</p>
              <p className="text-gray-600 text-sm mb-2">
                Time: {scheduledQuiz?.questions?.length} min
              </p>
              {/* <button className=" text-black px-2 py-1 rounded-full flex items-center hover:bg-blue-200 transition-colors">
                <FaEye className="mr-2" />
                details
              </button> */}
            </div>
          </div>
        ))}
        {/* Repeat this block for other quiz cards */}
      </div>
  


      {/* Add Quiz Modal */}
      {isAddQuizModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Quiz</h2>
            <form>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Quiz Name:</label>
            <input type="text" placeholder='Enter quiz name'
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={quizName} onChange={(e)=>setQuizName(e.target.value)}/>
               </div>
               
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Subject:</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleSubcategoryChange}
                  value={selectedSubcategory}
                >
                  <option value="">Select Subjects</option>
                  {/* Replace with your actual subcategories */}
                  {subjects?.map((subject) => (
  <option key={subject} value={subject}>
    {subject}
  </option>
))}
                 
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Number of Questions:</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleNumQuestionsChange}
                  value={selectedNumQuestions}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Select Questions:</label>
                {questions
                  .filter((question) => question.subCategory === selectedSubcategory)
                  .map((question) => (
                    <div key={question._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedQuestions.includes(question._id)}
                        onChange={() => handleQuestionCheckboxChange(question._id)}
                      />
                      <span>{question.question}</span>
                    </div>
                  ))}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={handleAddQuizSubmit}
                disabled={selectedQuestions.length !== selectedNumQuestions}
              >
                Add Quiz
              </button>
              <button className="text-gray-500 px-4 py-2 ml-2" onClick={handleAddQuizClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduledQuizzes;
