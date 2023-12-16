import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaLock, FaUnlock } from 'react-icons/fa';
import './UserManagement.css' 
import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';
function CourseManagement() {
  const columns = [
    {field: '_id',headerName: 'Course Id',width: 160,}, 
    { field: 'course', headerName: 'Course', width: 130},
    { field: 'subCategory', headerName: 'Subcategory', width: 130},
    { field: 'categoryName', headerName: 'Category', width: 130},
    { field: 'tutor', headerName: 'Tutor', width: 130},
    // {
    //   headerName: 'Videos',
    //   field: 'videos', // The field itself doesn't matter here
    //   width: 130,
    //   valueGetter: (params) => params.row.videos.length, // Get the length of the 'videos' array
    // },
    { field: 'isActive', headerName: 'Active', width: 130 ,renderCell: (params) => (
      <div className={`pill ${params.row.isActive ? 'active': 'inactive' }`}>
      {params.row.isActive ? 'Active' : 'Inactive'}
    </div>
    ),},
    {
      field: 'action',
      headerName: 'Action',
      width: 100,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button${params.row.isActive ?'-active': '-inactive'}`} onClick={(e) => handleBlockClick(e,params.row._id,params.row.isActive)}>
          {params.row.isActive ?<FaLock size={18} /> :  <FaUnlock size={18} /> }
        </button >
      )},
    }
    
  ]
const [rows,setRows]=useState('')

const [blocked, setBlocked] = useState(false)

const handleBlockClick = async (e,courseId,isActive) => {
  e.stopPropagation();
  try {
    isActive = !isActive;
    setBlocked(!blocked)
  
    const response = await axiosInstance.patch(`/blockUnblockCourse`,{courseId,isActive});
    if(response.data=='successfull'){
      toast.success('status updated')
    }
    // fetchData();
 
  } catch (error) {
   
    toast.error(error?.response?.data||error.error)
  }
};
 
useEffect(()=>{
  fetchCourses()
},[blocked])

 const fetchCourses=async()=>{
  let response=await axiosInstance.get('/loadCourses')

    setRows([...response.data.courses])
   
 }
 return (
  <div className=" mx-auto px-4" style={{ minHeight: "90vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
    <div className="text-2xl font-bold mb-4">Course Management</div>
    <div className="bg-white rounded shadow-lg">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        checkboxSelection
      />
    </div>
  </div>
);

}

export default CourseManagement