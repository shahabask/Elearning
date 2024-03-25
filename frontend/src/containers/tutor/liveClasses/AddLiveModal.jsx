// AddLiveModal.jsx

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineReload, AiOutlineClose } from 'react-icons/ai';
import socket from '../../utils/socket';

function AddLiveModal({ isOpen,handleCloseModal,handleCreateSession,subjects }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [roomId, setRoomId] = useState('');
  const [validationError, setValidationError] = useState('');

  const generateRoomId = () => {
    const randomId = uuidv4().substring(0, 3).toUpperCase();
    setRoomId(randomId);
  };

  const validateForm = () => {
    // Validate start time and end time
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (startDate <= new Date()) {
      setValidationError('Start time must be in the future.');
      return false;
    }

    if (endDate <= startDate) {
      setValidationError('End time must be after the start time.');
      return false;
    }

    const timeDifference = (endDate - startDate) / (1000 * 60); // in minutes
    if (timeDifference < 5) {
      setValidationError('End time must be at least 5 minutes after the start time.');
      return false;
    }

    // Reset validation error
    setValidationError('');
    return true;
  };
  
  const handleCreateSessionClick = () => {
    if (validateForm()) {
      const sessionData = {
        startTime,
        endTime,
        subject,
        name,
        description,
        roomId,
      };

      // Pass the session data to the parent component for handling
      handleCreateSession(sessionData);

      // Reset form fields
      setStartTime('');
      setEndTime('');
      setSubject('');
      setName('');
      setDescription('');
      setRoomId('');

      handleCloseModal();
      socket.emit('live_added')
    }
  };

  const handleCloseClick = () => {
    // Reset form fields and validation error
    setStartTime('');
    setEndTime('');
    setSubject('');
    setName('');
    setDescription('');
    setRoomId('');
    setValidationError('');

    handleCloseModal();
  };

  return (
    // Render modal only if it is open
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-96 p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex justify-end mb-2">
            <button
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
              onClick={handleCloseClick}
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Create Live Session</h2>

          <div className="flex mb-4">
            {/* Start Time */}
            <div className="mr-4 w-1/2">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Start Time</label>
              <input
                type="datetime-local"
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            {/* End Time */}
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-semibold mb-1">End Time</label>
              <input
                type="datetime-local"
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="text-red-500 mb-4">{validationError}</div>
          )}

          {/* Subject Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">Subject</label>
            <select
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>Select a subject</option>
              {subjects?.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div className="flex mb-4">
            {/* Name */}
            <div className="mr-4 w-1/2">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* RoomId with Generate Icon */}
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Room ID</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                  value={roomId}
                  readOnly
                />
                <button
                  className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={generateRoomId}
                >
                  <AiOutlineReload size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">Description</label>
            <textarea
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Create Session Button */}
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700"
            onClick={handleCreateSessionClick}
          >
            Create Session
          </button>
        </div>
      </div>
    )
  );
}

export default AddLiveModal;
