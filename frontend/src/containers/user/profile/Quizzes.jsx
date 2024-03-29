import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuizCard from '../../../components/user/cards/QuizCard'
import  axiosInstance  from '../../utils/axios'
import QuizShimmer from './shimmer/QuizShimmer'
function Quizzes() {
 const [quizzes,setQuizzes]=useState([])
 const [dataArrived,setDataArrived]=useState(false)
  useEffect(()=>{
    fetchQuizzes()
    
  },[])
  const fetchQuizzes=async()=>{
    const response=await axiosInstance.get('/loadQuizzes')
    setQuizzes(response.data.quizzes)
    setDataArrived(true)
  }
  return (
    <div style={{ height: ""}} className='bg-slate-200'>
    <div className='container'style={{paddingTop:'2rem'}}>
      {/* Header Row */}
      <div className='row '>
        <div className='col'>
        <div className='header d-flex justify-content-between align-items-center'>
            <div>
              <Link to='' style={{textDecoration:'none'}}>Quiz</Link>
            </div>
            {/* <button className='btn btn-primary'>Add Live</button>  */}
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className='row mt-3'>
      {!dataArrived?<>{Array.from({ length: 3 }, (_, index) => (<QuizShimmer key={index}/>))}</>:quizzes.map((quiz, index) => (
  <div className='col my-2' key={index}>
    <QuizCard quizData={quiz} />
  </div>
))}

      
      </div>
    </div>
    </div>
  )
}

export default Quizzes