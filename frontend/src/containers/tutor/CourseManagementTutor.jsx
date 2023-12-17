import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaPlus } from 'react-icons/fa';
import './CourseManagementTutor.css'
import { axiosInstance } from '../utils/adminAxios';
import { axiosInstance as tutorAxiosInstance } from '../utils/tutorAxios.js';
import { useEffect, useState } from 'react';
import AddCourse from './modal/AddCourse'
import { toast} from 'react-toastify';
import EditCourse from './modal/EditCourse';
import axios from 'axios';
import VideoModal from './modal/VideoModal.jsx';
function CourseManagementTutor() {

  //image rendering function in table
  function ImageCellRenderer(params) {
    const { value } = params;
    
    if (value) {
    const imagePath = `${value.replace(/\\/g, '/')}`;

    const modifiedImagePath = imagePath
    ? `https://www.skillsync.website/${imagePath.replace(/^backend\/public\//, '')}`
    : '';


    return (  
      <div style={{borderRadius:'2px' ,width: '80px', height: '40px',alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <img
        src={modifiedImagePath}
          alt="Image" // Provide an alternative text for the image
          style={{ width: '80px', height: '40px' }} // Adjust the width and height as needed
        /></div>
      );
    }
    return <div>No Image</div>;
  }
  //columns for table
  const columns = [
    {field: '_id',headerName: 'Course Id',width: 160,},
    { field: 'course', headerName: 'Course', width: 150},
    { field: 'categoryName', headerName: 'Category', width: 130},
    {field:'description',headerName:'Description',width:150},
    { field: 'image', headerName: 'Image', width: 130, renderCell: ImageCellRenderer },
    {
      headerName: 'Videos',
      field: 'videos', // The field itself doesn't matter here
      width: 130,
      valueGetter: (params) => params.row.videos?params.row.videos?.length:0, // Get the length of the 'videos' array
    },
    {field: 'add',
      headerName: 'Add Videos',
      width: 130,  
      disableSelectionOnClick: true,
      renderCell: (params) => {  return(
        
        <button className={`custom-button-active' }`} onClick={(e) => handleAddVideoClick(e,params.row._id)}>
          {<FaPlus size={18} />}
        </button>
      )},},
    {field: 'edit',
      headerName: 'Edit',
      width: 130,  
      disableSelectionOnClick: true,
      renderCell: (params) => {  return(
        
        <button className={`custom-button-active' }`} onClick={(e) => handleEditClick(e,params.row._id)}>
          {<FaEdit size={18} />}
        </button>
      )},}
  ]
  //state
  const [rows,setRows]=useState([])
const [isModalOpen, setModalOpen] = useState(false);
const [categories,setCategories]=useState([])
const [isCourseAdded,setIsCourseAdded]=useState(false)
 const [isEditModalOpen,setIsEditModalOpen] =useState(false)
 const [editCourseData,setEditCourseData]=useState('')
 const [edited,setEdited] =useState(false)
 const [isVideoModalOpen, setVideoModalOpen] = useState(false);
 const [videoData, setVideoData] = useState(''); 
const [courseId,setCourseId]=useState('')

//  const openVideoModal = (video) => {
   
//    setVideoModalOpen(true);
   

//  };


 const closeVideoModal = () => {
   setVideoData(''); 
   setVideoModalOpen(false);
 };


 const onSaveVideo = async(updatedVideo,id) => {

try{

  const response=await tutorAxiosInstance.patch('/addVideo',{...updatedVideo,id},{
    headers: {
      'Content-Type': 'multipart/form-data', 
    },})
    setEdited(!edited)
toast.success('successfully added video')
}catch(error){
toast.error('some error')
}
      
 }

const openModal = () => {
  setModalOpen(true);
  setIsCourseAdded(false)
};

const closeModal = () => {
  setModalOpen(false);
};


const handleAddCourse = async (formData) => {
  try {
    const response = await tutorAxiosInstance.post('addCourse', formData,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },});
    
     toast.success(response.data)
     setModalOpen(false)
     setIsCourseAdded(true)
  } catch (error) {
    toast.error(error?.response?.data||error.error)
      
  }
};

const handleAddVideoClick=(e,id)=>{
  e.stopPropagation();
  setVideoModalOpen(true);
  const courseToEdit=rows.filter((course)=>{
    if(course._id==id){
        return course
    }
   })
   
   setCourseId(id)
   setVideoData(courseToEdit[0]?.videos);
 
   
}

const handleEditClick=(e,id)=>{
  e.stopPropagation();
  setIsEditModalOpen(true)
 const courseToEdit=rows.filter((course)=>{
  if(course._id==id){
      return course
  }
 })

 setEditCourseData(courseToEdit)
}

//fetch courses to list in the table
useEffect(()=>{
  fetchCourses()
},[isCourseAdded,edited])
//fetchCourse function definition
const fetchCourses=async()=>{
  
  try {
    
 
  const courses=await tutorAxiosInstance.get('/loadCourses')
  setRows([...courses.data]);
  
} catch (error) {
  toast.error(error?.courses?.data||error.error)  
}
}

//fetchModalCourseData for

useEffect(()=>{
 fetchModalCourseData()

},[])
  const handleEditCourse=async(formData)=>{
    try {
      
    
    const response=await tutorAxiosInstance.patch('/editCourse',formData,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },})
      
    if(response.data=='edited successfully'){
      toast.success('course edited successfully')
      setEdited(!edited) 
      return null;
    } 
  } catch (error) {
      toast.error(error?.response?.data||error.error)
    }
    
  }


const fetchModalCourseData=async()=>{
  try{
    const  courseData= await tutorAxiosInstance.get('/courseData')
    setCategories([...courseData.data])

    
    
   
  }catch(error){
    toast.error(error.error)
  }
  }


  return (
    <div className="container mx-auto py-6 px-4" style={{backgroundColor:'rgba(224, 176, 255, 0.2)'}}>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Course Management</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Add Course
        </button>
      </div>
      <div className="mt-4 bg-white rounded shadow-lg">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <AddCourse
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAddCourse={handleAddCourse}
        categories={categories}
      />
      <EditCourse
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onEditCourse={handleEditCourse}
        courseData={editCourseData}
      />
       <VideoModal
        isOpen={isVideoModalOpen}
        onRequestClose={closeVideoModal}
        videoData={videoData}
        onSaveVideo={onSaveVideo}
        id={courseId} 
      />
    </div>
  );
  
}

export default CourseManagementTutor