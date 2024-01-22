import { DataGrid } from '@mui/x-data-grid';
import { FaUnlock, FaLock } from 'react-icons/fa'
import './UserManagement.css'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';

import DetailsModal from './DetailsModal';


export default function UserManagement() {

  
  // const [buttonClicked,setButtonClicked] = useState(false)
  const columns = [
    { field: 'index', headerName: 'Index', width: 20 },
    { field: 'email', headerName: 'Email', width: 130},
    { field: 'firstName', headerName: 'First name', width: 90 },
    { field: 'secondName', headerName: 'Last name', width: 90 },
    { field: 'subscriptionMode', headerName: 'Subscribtion', width: 130 },
    { field: 'phone', headerName: 'Phone No', width: 130 },
    
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
          {params.row.isBlocked ? <FaUnlock size={18} />:  <FaLock size={18} /> }
        </button>
      )},
    },
    
   

    
   
  
  
  ];
  const [openModals, setOpenModals] = useState({});
  const [modalDetails, setModalDetails] = useState('');
  const [blocked, setBlocked] = useState(false)
  const handleBlockClick = async (e,userId,isBlocked) => {
    e.stopPropagation();
    try {
      isBlocked = !isBlocked;
      setBlocked(!blocked)

      const response = await axiosInstance.put(`/blockUnblockUser`,{userId,isBlocked});
      // fetchData();
   
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };
  useEffect(() => {


    fetchData();
    // setBlocked(!blocked)
  }, [blocked])
  const handleDetailsClick = (e, row) => {
    e.stopPropagation();
    const userId = row._id;
    setModalDetails(row.details);
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [userId]: true,
    }));
  };

  const closeDetailsModal = (userId) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [userId]: false, // Close the modal for the specific user
    }));
  };

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/loadUsers');
        const rowsWithIndex = res.data.users.map((user, index) => ({ ...user, index: index + 1,subscriptionMode:user.subscription?.mode?.subscriptionMode }));
         console.log(rowsWithIndex[0])
        setRows(rowsWithIndex);
       
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    const [rows,setRows]=useState([])
  

return (
  <div className=" mx-auto py-6 px-4" style={{ height: "90vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
    <div className="bg-white rounded shadow-lg">
      <DataGrid style={{minHeight:'500px'}}
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