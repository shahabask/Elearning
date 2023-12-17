import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/tutorAxios';
import { toast } from 'react-toastify';



function QuestionBank() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuestionAdded, setQuestionAdded] = useState(false);
  const [errors, setErrors] = useState({
    question: '',
    selectedSubcategory: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [isQuestionAdded]);

  const fetchQuestions = async () => {
    const response = await axiosInstance.get('/loadQuestion');
    setQuestions(response.data.questions);
    setSubjects(response.data.subCategories[0]?.allSubCategories);
  };

  const handleAddQuestionClick = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    resetFormData();
  };

  const handleOptionChange = (index, value) => {
    setFormData((prevData) => {
      const updatedOptions = [...prevData.options];
      updatedOptions[index] = value;
      return { ...prevData, options: updatedOptions };
    });
  };

  const handleCorrectAnswerChange = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      correctAnswer: option,
    }));
  };

  const validate = () => {
    let isValid = true;

    setErrors({
      question: '',
      selectedSubcategory: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    });

    if (!formData.question) {
      setErrors((prevErrors) => ({ ...prevErrors, question: 'Question is required' }));
      isValid = false;
    }

    if (!selectedSubcategory) {
      setErrors((prevErrors) => ({ ...prevErrors, selectedSubcategory: 'Subject is required' }));
      isValid = false;
    }

    formData.options.forEach((option, index) => {
      if (!option) {
        setErrors((prevErrors) => {
          const newOptionsErrors = [...prevErrors.options];
          newOptionsErrors[index] = 'Option is required';
          return { ...prevErrors, options: newOptionsErrors };
        });
        isValid = false;
      }
    });

    if (formData.correctAnswer === '') {
      setErrors((prevErrors) => ({ ...prevErrors, correctAnswer: 'Select a correct answer' }));
      isValid = false;
    }

    return isValid;
  };

  const handleAddQuestionSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axiosInstance.post('/addQuestion', { ...formData, selectedSubcategory });
   
      if (response.status === 200) {
        toast.success('Successfully uploaded');
      }
    } catch (error) {
      toast.error(`Can't upload question`);
    }

    setAddModalOpen(false);
    resetFormData();
    setQuestionAdded(!isQuestionAdded);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setFormData({
      question: questions[index].question,
      options: [questions[index].option1, questions[index].option2, questions[index].option3, questions[index].option4],
      correctAnswer: questions[index].correctAnswer,
    });
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditIndex(null);
    resetFormData();
  };

  const handleEditQuestionSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // Update the question using axiosInstance
      const response = await axiosInstance.put(`/updateQuestion/${questions[editIndex]._id}`, {
        ...formData,
        selectedSubcategory,
      });
      
      if (response.status === 200) {
        toast.success('Successfully updated');
      }
    } catch (error) {
      toast.error(`Can't update question`);
    }

    setEditModalOpen(false);
    resetFormData();
    setEditIndex(null);
    setQuestionAdded(!isQuestionAdded);
  };

  const resetFormData = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    });
    setSelectedSubcategory('');
    setErrors({
      question: '',
      selectedSubcategory: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={handleAddQuestionClick}
        >
          Add Question
        </button>
      </div>

      {/* Existing Question Cards */}
      <div className="flex flex-wrap -mx-4">
        {questions.map((question, index) => (
          <div
            className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md mb-4 w-full md:w-1/2 lg:w-1/3 px-4"
            key={index}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Question {index + 1}</div>
              <p className="text-gray-600 text-sm mb-2">Question: {question.question}</p>
              <p className="text-gray-600 text-sm mb-2">Subject: {question.subCategory}</p>
              <p className="text-gray-600 text-sm mb-2">Options:</p>
              <ul className="list-disc list-inside">
                <li>{question.option1}</li>
                <li>{question.option2}</li>
                <li>{question.option3}</li>
                <li>{question.option4}</li>
              </ul>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={() => openEditModal(index)}
              >
                Edit Question
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-8 rounded-lg"
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Add Question</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Question:</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Subject:</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  value={selectedSubcategory}
                >
                  <option value="">Select Subjects</option>
                  {subjects?.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Options:</label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2">{index + 1}.</span>
                    <input
                      type="text"
                      value={option}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={formData.correctAnswer === String(index)}
                      onChange={() => handleCorrectAnswerChange(option)}
                    />
                  </div>
                ))}
              </div>
              <div className="text-red-500">
                {errors.question && <p>{errors.question}</p>}
                {errors.selectedSubcategory && <p>{errors.selectedSubcategory}</p>}
                {errors.options.map((error, index) => error && <p key={index}>{error}</p>)}
                {errors.correctAnswer && <p>{errors.correctAnswer}</p>}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={handleAddQuestionSubmit}
              >
                Add Question
              </button>
              <button className="text-gray-500 px-4 py-2 ml-2" onClick={handleCloseAddModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-8 rounded-lg"
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Question:</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Subject:</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  value={selectedSubcategory}
                >
                  <option value="">Select Subjects</option>
                  {subjects?.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Options:</label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2">{index + 1}.</span>
                    <input
                      type="text"
                      value={option}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={formData.correctAnswer === String(index)}
                      onChange={() => handleCorrectAnswerChange(option)}
                    />
                  </div>
                ))}
              </div>
              <div className="text-red-500">
                {errors.question && <p>{errors.question}</p>}
                {errors.selectedSubcategory && <p>{errors.selectedSubcategory}</p>}
                {errors.options.map((error, index) => error && <p key={index}>{error}</p>)}
                {errors.correctAnswer && <p>{errors.correctAnswer}</p>}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={handleEditQuestionSubmit}
              >
                Edit Question
              </button>
              <button className="text-gray-500 px-4 py-2 ml-2" onClick={handleCloseEditModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionBank;
