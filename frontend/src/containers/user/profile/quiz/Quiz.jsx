// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import axiosInstance from '../../../utils/axios';

// const Quiz = () => {
//   const { quizId } = useParams();

//   const [quizData, setQuizData] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

//   useEffect(() => {
//     fetchQuizData();
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, [quizId]);

//   const fetchQuizData = async () => {
//     const response = await axiosInstance.get(`/quizDetails/${quizId}`);
//     setQuizData(response?.data?.quiz);
//     setTimeLeft(response?.data?.quiz.length * 60);
//   };

//   const handleOptionChange = (selectedOption) => {
//     const answerObject = {
//       id: quizData[currentQuestion]._id,
//       selectedOption: selectedOption,
//     };

//     setSelectedAnswers((prevSelectedAnswers) => [
//       ...prevSelectedAnswers.filter((answer) => answer.id !== answerObject.id),
//       answerObject,
//     ]);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//     }
//   };

//   const handleSubmit = () => {
//     // Evaluate answers using selectedAnswers array of objects
//     console.log('Selected Answers:', selectedAnswers);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="container mx-auto mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-lg mb-10" style={{ minHeight: '80vh' }}>
//       <div className="flex items-center justify-between mb-4 mt-20">
//         <div className="flex items-center">
//           <h1 className="text-2xl font-bold">{quizData[0]?.quizName}</h1>
//         </div>
//         <div className="border-2 border-blue-500 p-2 rounded-lg">
//           <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-2" />
//           <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
//         </div>
//       </div>
//       <div className="mb-4 p-4 border-2 border-blue-500 rounded-lg shadow-md">
//         <p className="font-bold">{quizData[currentQuestion]?.question}</p>
//         <div className="flex flex-col mt-4">
//           <label key={quizData[currentQuestion]?.option1} className="mb-2">
//             <input
//               type="radio"
//               name={`question${quizData[currentQuestion]?._id}`}
//               value={quizData[currentQuestion]?.option1}
//               checked={selectedAnswers.some((answer) => answer.id === quizData[currentQuestion]._id && answer.selectedOption === quizData[currentQuestion]?.option1)}
//               onChange={() => handleOptionChange(quizData[currentQuestion]?.option1)}
//               className="mr-2"
//             />
//             {quizData[currentQuestion]?.option1}
//           </label>
//           <label key={quizData[currentQuestion]?.option2} className="mb-2">
//             <input
//               type="radio"
//               name={`question${quizData[currentQuestion]?._id}`}
//               value={quizData[currentQuestion]?.option2}
//               checked={selectedAnswers.some((answer) => answer.id === quizData[currentQuestion]._id && answer.selectedOption === quizData[currentQuestion]?.option2)}
//               onChange={() => handleOptionChange(quizData[currentQuestion]?.option2)}
//               className="mr-2"
//             />
//             {quizData[currentQuestion]?.option2}
//           </label>
         
//           {/* Add similar labels for option3 and option4 */}
//         </div>
//       </div>
//       <div className="mt-4">
//         <button
//           onClick={handlePreviousQuestion}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
//           Previous
//         </button>
//         <button
//           onClick={handleNextQuestion}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
//         >
//           Next
//           <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
//         </button>
//         {currentQuestion === quizData?.length - 1 && (
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Submit
//           </button>
//         )}
//       </div>
//       <div style={{ marginTop: '30px' }}></div>
//     </div>
//   );
// };

// export default Quiz;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faArrowRight, faCheckCircle, faTimesCircle, faQuestion, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../utils/axios';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate=useNavigate()
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0); // 10 minutes in seconds
  const [submitted, setSubmitted] = useState(false);
  //  const [percentage,setPercentage]=useState(0)
   
  useEffect(() => {
    fetchQuizData();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [quizId]);

  const fetchQuizData = async () => {
    const response = await axiosInstance.get(`/quizDetails/${quizId}`);
    setQuizData(response?.data?.quiz);
    setTimeLeft(response?.data?.quiz.length * 60);
  };

  const handleOptionChange = (selectedOption) => {
    const answerObject = {
      id: quizData[currentQuestion]._id,
      selectedOption: selectedOption,
    };

    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers.filter((answer) => answer.id !== answerObject.id),
      answerObject,
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleSubmit = async() => {
    
    setSubmitted(true);
    const correctAnswers=calculateScore()
    const response=await axiosInstance.post('/addQuizResult',{correctAnswers,quizId})
  };

  const calculateScore = () => {
  const correctAnswers = quizData.reduce((acc, question) => {
    const selectedAnswer = selectedAnswers.find((answer) => answer.id === question._id);
    // console.log(selectedAnswer.selectedOption,'selectedOption',question.answer,'answer')
    if (selectedAnswer && selectedAnswer.selectedOption === question.answer) {
      return acc + 1;
    }
    return acc;
  }, 0);
 
   return correctAnswers 
  // Return the score as a percentage with two decimal places
};
const calculatePercentage = () => {
  const correctAnswers = quizData.reduce((acc, question) => {
    const selectedAnswer = selectedAnswers.find((answer) => answer.id === question._id);
    // console.log(selectedAnswer.selectedOption,'selectedOption',question.answer,'answer')
    if (selectedAnswer && selectedAnswer.selectedOption === question.answer) {
      return acc + 1;
    }
    return acc;
  }, 0);
 
  const scorePercentage = (correctAnswers / quizData.length) * 100;
  
  return scorePercentage.toFixed(2); // Return the score as a percentage with two decimal places
};


  const getScoreColor = () => {
    const percentage = calculatePercentage();
    if (percentage < 20) {
      return 'text-red-500';
    } else if (percentage < 50) {
      return 'text-orange-500';
    } else if (percentage < 70) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };

  function getScoreIcon() {
    const userScore = calculatePercentage();
  
    if (userScore >= 50) {
      return faThumbsUp; // Thumbs up icon for a passing score
    } else {
      return faThumbsDown; // Thumbs down icon for a failing score
    }
  }
 const handleGoBack=()=>{
  navigate('/profile')
 }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-lg mb-10" style={{ minHeight: '80vh' }}>
      {submitted ? (
      <div className="text-center border-2 border-gray-300 p-10 mt-20 rounded-md hover:border-blue-500 hover:shadow-md transition duration-300 ease-in-out">
      <h1 className="text-2xl font-bold mb-4 ">{quizData[0]?.quizName} Quiz</h1>
      <p className={`text-xl font-bold mb-4 ${getScoreColor()}`}>
        Your Score: {calculateScore()} out of {quizData.length}
      </p>
      <div className="flex items-center justify-center mb-4">
        <FontAwesomeIcon
          icon={getScoreIcon()}
          className={`text-5xl mr-2 ${getScoreColor()}`}
        />
        <div>
          <p className="text-green-500">
            Correct Answers: {calculateScore()}
          </p>
          <p className="text-red-500">
            Wrong Answers: {quizData.length - calculateScore()}
          </p>
        </div>
      </div>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Go Back
      </button>
    </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4 mt-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{quizData[0]?.quizName}</h1>
            </div>
            <div className="flex items-center text-black border-2 border-gray-400 p-4 rounded-lg">
  <div className="flex items-center mr-4">
    <FontAwesomeIcon icon={faQuestion} className="text-gray-500 mr-2" />
    <p className="text-xl font-bold">
      {`Question ${currentQuestion + 1} of ${quizData.length}`}
    </p>
  </div>
  <div className="flex items-center">
    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
    <p className="text-xl font-bold">
      {`Attended: ${selectedAnswers.length}`}
    </p>
  </div>
</div>
            <div className="border-2 border-gray-400 p-2 rounded-lg">
              <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-2" />
              <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
            </div>
             
          </div>
          <div className="mb-4 p-4 border-2 border-gray-400 rounded-lg shadow-md">
            <p className="font-bold">{quizData[currentQuestion]?.question}</p>
            <div className="flex flex-col mt-4">
              <label key={quizData[currentQuestion]?.option1} className="mb-2">
                <input
                  type="radio"
                  name={`question${quizData[currentQuestion]?._id}`}
                  value={quizData[currentQuestion]?.option1}
                  checked={selectedAnswers.some((answer) => answer.id === quizData[currentQuestion]._id && answer.selectedOption === quizData[currentQuestion]?.option1)}
                  onChange={() => handleOptionChange(quizData[currentQuestion]?.option1)}
                  className="mr-2"
                />
                {quizData[currentQuestion]?.option1}
              </label>
              <label key={quizData[currentQuestion]?.option2} className="mb-2">
                <input
                  type="radio"
                  name={`question${quizData[currentQuestion]?._id}`}
                  value={quizData[currentQuestion]?.option2}
                  checked={selectedAnswers.some((answer) => answer.id === quizData[currentQuestion]._id && answer.selectedOption === quizData[currentQuestion]?.option2)}
                  onChange={() => handleOptionChange(quizData[currentQuestion]?.option2)}
                  className="mr-2"
                />
                {quizData[currentQuestion]?.option2}
              </label>
              <label key={quizData[currentQuestion]?.option3} className="mb-2">
            <input
              type="radio"
              name={`question${quizData[currentQuestion]?._id}`}
              value={quizData[currentQuestion]?.option3}
              checked={selectedAnswers.some((answer) => answer.id === quizData[currentQuestion]._id && answer.selectedOption === quizData[currentQuestion]?.option3)}
              onChange={() => handleOptionChange(quizData[currentQuestion]?.option3)}
              className="mr-2"
            />
            {quizData[currentQuestion]?.option3}
          </label>
          <label key={quizData[currentQuestion]?.option4} className="mb-2">
            <input
              type="radio"
              name={`question${quizData[currentQuestion]?._id}`}
              value={quizData[currentQuestion]?.option4}
              checked={selectedAnswers.some((answer) => answer.id === quizData[currentQuestion]._id && answer.selectedOption === quizData[currentQuestion]?.option4)}
              onChange={() => handleOptionChange(quizData[currentQuestion]?.option4)}
              className="mr-2"
            />
            {quizData[currentQuestion]?.option4}
          </label>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handlePreviousQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
            {currentQuestion === quizData?.length - 1 && (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
          <div style={{ marginTop: '30px' }}></div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
