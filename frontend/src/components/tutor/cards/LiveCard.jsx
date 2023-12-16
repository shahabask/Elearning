import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { axiosInstance } from '../../../containers/utils/tutorAxios';
import { toast } from 'react-toastify';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import socket from '../../../containers/utils/socket';
// const socket =io.connect('http://localhost:5001')
const LiveCard = ({ liveDetails, handleDelete }) => {

  const navigate=useNavigate()
  const handleDeleteClick = async () => {
    try {
      const id = liveDetails?._id;
      const response = await axiosInstance.delete(`/deleteLive/${id}`);
      handleDelete();
      toast.success('Successfully deleted');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const changeStatus=async(id)=>{
    const response=await axiosInstance.patch('/updateLiveStatus',{id,status:'On-going'})
  }
  const handleJoinClick=(roomId,id)=>{
    changeStatus(id)
    navigate(`/tutor/tutorRoom/${roomId}/${id}`)
    
    socket.emit('live_started',{id:id})
  }
  const formatToAMPM = (dateTimeString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', options);
    return formattedTime;
  };

  const formatToDate = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <Card style={{ width: '18rem', backgroundColor: '#CF9FFF', position: 'relative' }}>
      <Button
        variant="outline-secondary"
        onClick={handleDeleteClick}
        style={{ position: 'absolute', top: '0', right: '0', padding: '8px', cursor: 'pointer' }}
      >
       <AiFillDelete size={20} />
      </Button>
      <Card.Body>
        <Card.Title className="fw-bold">{liveDetails?.name}</Card.Title>
        <Card.Text>
          <div>
            <span className="fw-bold">Subject:</span> {liveDetails?.subCategory}
          </div>
          <div style={{ color: 'green', textDecoration: 'bold' }}>
            <span className="fw-bold" style={{ color: 'black' }}>
              Time:
            </span>{' '}
            {formatToAMPM(liveDetails?.startingTime)} - {formatToAMPM(liveDetails?.endingTime)}
          </div>
          <div>
            <span className="fw-bold">Date:</span> {formatToDate(liveDetails?.startingTime)}
          </div>
          <div style={{ backgroundColor: '#09ead55e', borderRadius: '5px', color: 'black' }}>
            <span className="fw-bold" style={{ color: 'green' }}>
              Status :
            </span>{' '}
            <span>{liveDetails?.status}</span>
          </div>
        </Card.Text>
        <Button variant="dark" style={{ width: '100%' }} onClick={()=>handleJoinClick(liveDetails?.roomId,liveDetails?._id)}>
          Join Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LiveCard;
