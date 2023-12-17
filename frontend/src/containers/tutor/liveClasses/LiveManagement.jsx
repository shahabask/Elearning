import LiveCard from '../../../components/tutor/cards/LiveCard';
import { Link } from 'react-router-dom';
import AddLiveModal from './AddLiveModal';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/tutorAxios';
import { toast } from 'react-toastify';
import socket from '../../utils/socket';


function   LiveManagement() {

  
  const [isAddLiveModalOpen, setAddLiveModalOpen] = useState(false);
 const [isLiveAdded,setLiveAdded]=useState(false)
 const [isLiveDeleted,setLiveDelete]=useState(false)
 const [subjects,setSubjects]=useState([])
 const [liveDetails,setLiveDetails]=useState([])

 
  const handleAddLive = () => {
    setAddLiveModalOpen(true);
    
  };
 
  const handleCloseModal = () => {
    setAddLiveModalOpen(false);
  };
 
  const handleCreateSession = async(sessionData) => {
   
    try {
      const response=await axiosInstance.post('/createLive',sessionData)
      setLiveAdded(!isLiveAdded)
      
     
        toast.success('successfully inserted')
    } catch (error) {
      toast.error('error')
    }

  };

  useEffect(()=>{
    fetchLivesData()
    
  },[isLiveAdded,isLiveDeleted])
 
  const fetchLivesData=async()=>{
    try{
      const status='Not started'
      const response=await axiosInstance.get(`/loadLiveDetails/${status}`)
        setLiveDetails(response.data.lives)
        
        setSubjects(response.data?.subCategories[0]?.specification)
        
    }catch(error){
      console.log(error)
    }
  }

  const handleDeleteCard=()=>{
    setLiveDelete(!isLiveDeleted)
    socket.emit('delete_live')
  }
  return (
    <div style={{ minHeight: "81vh", backgroundColor: 'rgba(224, 176, 255, 0.2)' }}>
      <div className='container' style={{ paddingTop: '2rem' }}>
        {/* Header Row */}
        <div className='row '>
          <div className='col'>
            <div className='header d-flex justify-content-between align-items-center'>
              <div>
                <Link to='/live' style={{ textDecoration: 'none' }}>Live</Link>
              </div>
              <button className='btn btn-primary' onClick={handleAddLive}>Add Live</button>
            </div>
          </div>
        </div>
  
        {/* Cards Row */}
        {liveDetails.length === 0 ? (
          <div className='text-center pt-20 mt-10'>
            <h1 style={{ fontSize: '30px', color: 'purple' }}>No live Scheduled</h1>
          </div>
        ) : (
          <div className='row mt-3'>
            {liveDetails?.map((live) => {
              return (
                <div className='col-lg-4 col-md-12 col-sm-12 py-4' key={live._id}>
                  <LiveCard liveDetails={live} handleDelete={handleDeleteCard} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AddLiveModal
        isOpen={isAddLiveModalOpen}
        handleCloseModal={handleCloseModal}
        handleCreateSession={handleCreateSession}
        subjects={subjects}
      />
    </div>
  );
  
}

export default LiveManagement