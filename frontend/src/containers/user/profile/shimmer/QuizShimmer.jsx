

import React from 'react'
import { Button, Card } from 'react-bootstrap'

function QuizShimmer() {
  return (
    <div className='col my-2 shimmer'>
    <Card style={{ width: '18rem', backgroundColor: '#edf7f7', height:'10rem'}}>
      <Card.Body>
        <Card.Title className="fw-bold shimmer-line-quiz"></Card.Title>
        <Card.Text>
          <div className="shimmer-line-quiz shimmer-content"></div>
          <div className="shimmer-line-quiz shimmer-content"></div>
          <div className="shimmer-line-quiz shimmer-content"></div>
          <div className="shimmer-line-quiz shimmer-content"></div>
        </Card.Text>
        <Button variant="dark" style={{ width: '100%', color: 'white', backgroundColor: 'grey' }} className="shimmer-line-quiz shimmer-content"></Button>
      </Card.Body>
    </Card>
  </div>
  )
}

export default QuizShimmer