

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'; // Import the datepicker library
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { axiosInstance } from '../../utils/tutorAxios';
import { toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars';

const ScheduledAssignments = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    name: '',
    startDate: new Date(),
    endDate: '',
    totalMark:null,
    constraints: [''],
    subject: '',
  });

  // const scheduledAssignments1 = []; 

  const [scheduledAssignments, setScheduledAssignments] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [subjects, setSubjects] = useState(['Physics', 'Mathematics', 'Chemistry', 'Biology']);
   
  useEffect(() => {
    fetchAssignments();
  }, [deleted]);

  const fetchAssignments = async () => {
    try {
      const status = 'started';
      const response = await axiosInstance.get(`/loadassignments/${status}`)
      setScheduledAssignments(response.data.assignment)
      console.log(response.data.assignment,'assignment')
      setSubjects(response.data.subjects.specification)
      // console.log('res',response.data.subjects.specification)
    } catch (error) {
      console.log('error');
    }
  }

  const handleDeleteAssignmentClick = async (id) => {
    try {
      const response = await axiosInstance.delete(`/deleteassignment/${id}`);
      toast.success('Successfully deleted');
      setDeleted(!deleted);
    } catch (error) {
      toast.error('Error in deletion');
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prevAssignment) => ({ ...prevAssignment, [name]: value }));
  };

  const handleTotalMarkChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prevAssignment) => ({ ...prevAssignment, [name]: value }));
  };
  

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...newAssignment.constraints];
    newConstraints[index] = value;
    setNewAssignment((prevAssignment) => ({ ...prevAssignment, constraints: newConstraints }));
  };

  const handleAddConstraint = () => {
    setNewAssignment((prevAssignment) => ({
      ...prevAssignment,
      constraints: [...prevAssignment.constraints, ''],
    }));
  };

  const handleDeleteConstraint = (index) => {
    const newConstraints = [...newAssignment.constraints];
    newConstraints.splice(index, 1);
    setNewAssignment((prevAssignment) => ({ ...prevAssignment, constraints: newConstraints }));
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the newAssignment state when closing the modal
    setNewAssignment({
      name: '',
      startDate: new Date(),
      endDate: '',
      totalMark:null,
      constraints: [''],
      subject: '',
    });
  };

  const handleSaveAssignment = async() => {
      
    try {
      
      const response=await axiosInstance.post("/addassignment",newAssignment)

      toast.success('successfully added')
    } catch (error) {
      console.log(error)
      toast.error('error')
    }

    
    handleCloseModal();
  };
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  return (
    <div style={{ minHeight: '81vh' }}>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
          onClick={handleOpenModal}
        >
          <FaPlus className="mr-2" />
          Add Assignment
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 px-5 text-center">Scheduled Assignments</h2>

      {/* Render scheduled assignments */}
      <div className="flex flex-wrap justify-center gap-4 px-5">
        {scheduledAssignments.length!=0 ?
        scheduledAssignments?.map((scheduledAssignment, index) => (
          <div
            className="bg-purple-200 rounded-md overflow-hidden shadow-md w-64 max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105"
            key={index}
          >
            <Scrollbars style={{ height: 220 }} >
              <div className="px-6 py-4 h-auto">
                <div className="font-bold text-xl mb-2">{scheduledAssignment?.name}</div>
                <p className="text-gray-600 text-sm mb-2">
                Constraints:
                <ul className="list-disc ml-6">
                  {scheduledAssignment?.constraints.map((constraint, constraintIndex) => (
                    <li key={constraintIndex}>{constraint}</li>
                  ))}
                </ul>
              </p>
                    <p className="text-gray-600 text-sm mb-2">Subject: {scheduledAssignment?.subject}</p>

                <p className="text-gray-600 text-sm mb-2"> End Date: {formatDate(scheduledAssignment?.endingDate)}</p>
              </div>
            </Scrollbars>
            <div className="flex justify-end px-6 pb-4">
              <button
                className="bg-red-400 text-white px-2 py-1 rounded-full flex items-center hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteAssignmentClick(scheduledAssignment?._id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )) : <div style={{paddingTop:'100px', fontSize:'28px',}}> <h1 >No Assignment Scheduled</h1></div>}
      </div>

      {/* Modal for adding assignments */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 w-96 rounded-md">
            <h3 className="text-2xl font-bold mb-4">Add Assignment</h3>
            <Scrollbars style={{ height: 520 }}>
            <form >
             <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Assignment Name</label>
                <input
                  type="text"
                  name="name"
                  value={newAssignment.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
               
              {/* Start Date and End Date */}
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <DatePicker
                    selected={newAssignment.startDate}
                    onChange={(date) => setNewAssignment((prev) => ({ ...prev, startDate: date }))}
                    minDate={new Date()}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <DatePicker
                    selected={newAssignment.endDate}
                    onChange={(date) => setNewAssignment((prev) => ({ ...prev, endDate: date }))}
                    minDate={new Date(newAssignment.startDate.getTime() + 7 * 24 * 60 * 60 * 1000)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Total Mark</label>
                <input
  type="number"
  name="totalMark"
  value={newAssignment.totalMark }
  onChange={handleTotalMarkChange}
  className="mt-1 p-2 w-full border rounded-md"
  required
/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Constraints</label>
                {newAssignment.constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => handleConstraintChange(index, e.target.value)}
                      className="mt-1 p-2 border rounded-md flex-1"
                      required
                    />
                    {index === newAssignment.constraints.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddConstraint}
                        className="ml-2 p-2 bg-green-500 text-white rounded-md"
                      >
                        +
                      </button>
                    )}
                    {index !== newAssignment.constraints.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteConstraint(index)}
                        className="ml-2 p-2 bg-red-500 text-white rounded-md"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Subject dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  name="subject"
                  value={newAssignment.subject}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjects?.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
 
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAssignment}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledAssignments;
