
import { DataGrid } from '@mui/x-data-grid';
import './UserManagement.css'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';
import { FaUnlock, FaLock } from 'react-icons/fa'


  
 
function TutorManagement() {
  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 130},
    { field: 'userName', headerName: 'User Name', width: 130 },
    { field: 'specification', headerName: 'Specification', width: 130 },
    { field: 'isBlocked', headerName: 'Active', width: 130 ,renderCell: (params) => (
      <div className={`pill ${params.row.isBlocked ? 'inactive' : 'active'}`}>
      {params.row.isBlocked ? 'Inactive' : 'Active'}
    </div>
    ),},
    {
      field: 'action',
      headerName: 'Action',
      width: 100,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button${params.row.isBlocked ?'-inactive':'-active' }`} onClick={(e) => handleBlockClick(e,params.row._id,params.row.isBlocked)}>
          {params.row.isBlocked ? <FaUnlock size={18} />:   <FaLock size={18} />}
        </button>
      )},
    },
    
    
    
    // {
    //   field: 'details',
    //   headerName: 'Details',
    //   width: 100,
    //   renderCell: (params) => (
    //     <button className="button-pill" onClick={() => handleDetailsClick(params.row.id)}>
    //       View
    //     </button>
    //   ),   
    // },
    
    
   
  
  
  ];
  const [rows,setRows]=useState([])
  const [blocked, setBlocked] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState('');
  const handleBlockClick= async(e,userId,isBlocked)=>{
    e.stopPropagation()
    try {
      isBlocked = !isBlocked;
      

      const response = await axiosInstance.put(`/blockUnblockTutor`,{userId,isBlocked});
      
      setBlocked(!blocked)
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  }
  // const handleDetailsClick = (details) => {
  //   setModalDetails(details); // Set the details content
  //   setModalOpen(true); // Open the modal
  // };

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/loadTutors');
     
        setRows([...res.data.tutors]);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };
 
  useEffect(() => {
    fetchData()
  }, [blocked])

  return (
    <div className="container mx-auto p-4" style={{ height: "90vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
      <div className="bg-white shadow-lg rounded">
        <DataGrid style={{ minHeight: '500px'}}
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          checkboxSelection
          className="w-full"
        />
      </div>
    </div>
  );
  
            }

export default TutorManagement