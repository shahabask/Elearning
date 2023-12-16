import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function QuizCard({quizData}) {

  const navigate=useNavigate()
const handleAttendQuiz=(quizId)=>{
    
  navigate(`/quiz/${quizId}`)
}

  return (
    <Card style={{ width: '18rem', backgroundColor:'#edf7f7'}}>
    <Card.Body>
      <Card.Title className="fw-bold">{quizData?.name}</Card.Title>
      <Card.Text>
      <div>
          <span className="fw-bold">Subject:</span> {quizData?.subCategory}
        </div>
        {/* <div style={{color:'green',textDecoration:'bold'}}>
          <span className="fw-bold" style={{color:'black'}} >Time:</span> 10:00 AM - 11:30 AM
        </div> */}
        <div>
          <span className="fw-bold">Time Limit:</span> {quizData?.time} min
        </div>
        {/* <div style={{backgroundColor:'#09ead55e',borderRadius:'5px',color:'red'}}>
          <span className="fw-bold" >Status</span>: Ongoing
        </div> */}
      </Card.Text>
      <Button variant="dark" style={{width:"100%",color:'white',backgroundColor:'grey'}} onClick={()=>handleAttendQuiz(quizData?._id)}>Attend</Button>
    </Card.Body>
  </Card>
  )
}

export default QuizCard