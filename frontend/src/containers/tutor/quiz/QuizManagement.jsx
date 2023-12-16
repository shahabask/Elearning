import React, { useState } from 'react';
import QuestionBank from './QuestionBank';
import QuizHistory from './QuizHistory';
import QuizNavbar from './QuizNavbar';
import ScheduledQuizzes from './ScheduledQuizzes';

function QuizManagement() {
  const [selectedNavItem, setSelectedNavItem] = useState('Scheduled Quizzes');

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  return (
    <>
      <QuizNavbar onNavItemClick={handleNavItemClick} />
      <div className="" style={{backgroundColor:'#FDF8EE'}}>
        {selectedNavItem === 'Scheduled Quizzes' && <ScheduledQuizzes />}
        {selectedNavItem === 'Question Bank' && <QuestionBank />}
        {selectedNavItem === 'History' && <QuizHistory />}
      </div>
    </>
  );
}

export default QuizManagement;
