import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaImage, FaTimes, FaTrash, FaVideo } from 'react-icons/fa';
import { axiosInstance } from '../../utils/adminAxios';

Modal.setAppElement('#root');

export default function AddCourse({
  isOpen,
  onRequestClose,
  onAddCourse,
  categories,
 
 
}) {
  // const [formError, setFormError] = useState({});
  const [categoryName, setCategoryName] = useState([]);
 const [subCategories,setSubCategories]=useState([])
  const [course, setCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory,setSelectedSubCategory]=useState('')
  const [description,setDescription]=useState('')
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryError,setSubCategoryError]=useState('')
  const [courseError, setCourseError] = useState('');
  const [descriptionError,setDescriptionError]=useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo,setSelectedVideo] =useState(null)
useEffect(()=>{
  
    const categoryNames = categories.map((category) => category.categoryName);
    setCategoryName(categoryNames);
   
 

},[categories])
  
useEffect(()=>{
  if(selectedCategory){
   setSubCategories( categories
  .filter((category) => category.categoryName === selectedCategory)
  .map((category) => category.subCategories)); 
    
  }
},[selectedCategory])

  

  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setCategoryError('');
    setSubCategoryError('');
    setCourseError('');
    setDescriptionError('')

    // Validate selections
    if (!selectedCategory) {
      setCategoryError('Category is required');
      return;
    }
    if (!course) {
      setCourseError('Course is required');
      return;
    }
  if(!selectedSubCategory){
    setSubCategoryError('subCategory is required')
    return; 
  }
 
  if(!description){
    setDescriptionError('Description is required')
    return;
  }
    // If all selections are valid, proceed to add the course
    try {
      const formData = new FormData();
      formData.append('course', course);
      formData.append('subCategory',selectedSubCategory)
      formData.append('category', selectedCategory);
       formData.append('description',description)
      //  formData.append('video',selectedVideo)
       formData.append('image',selectedImage)
       
      const response = await onAddCourse(formData);

      if (response === null) {
        setSelectedCategory('');
        setSelectedSubCategory('')
        setCourse('');
        setDescription('');
        setSelectedImage(null);
        setSelectedVideo(null)
        onRequestClose();
      }
    } catch (error) {
      console.log('Consoled error of axios:', error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };
 
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
  };
  const handleRemoveVideo = () => {
    setSelectedVideo(null);
  };
 return (
  <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel="Add Category Modal"
  className="custom-modal"
  overlayClassName="custom-overlay"
>
  <div className="modal-content p-4 bg-white overflow-y-auto">
    <div className="flex justify-end">
      <button onClick={onRequestClose} className="text-gray-600 hover:text-red-500">
        <FaTimes className="text-2xl" />
      </button>
    </div>
    <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
    <div className="mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select Category</option>
        {categoryName.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <span className="text-red-500">{categoryError}</span>
    </div>
    <div className="mb-4">
      <select
        value={selectedSubCategory}
        onChange={(e) => setSelectedSubCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select Subcategory</option>
        {subCategories.map((subCategory, index) => (
          <option key={index} value={subCategory}>
            {subCategory}
          </option>
        ))}
      </select>
      <span className="text-red-500">{subCategoryError}</span>
    </div>
    <div className="mb-4">
      <label htmlFor="categoryImage" className="block text-gray-600">Upload Image:</label>
      {selectedImage ? (
        <div className="image-preview-container">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="image-preview" />
          <div className="cursor-pointer text-red-500" onClick={handleRemoveImage}>
            <FaTrash className="text-xl" />
          </div>
        </div>
      ) : (
        <>
          <label htmlFor="categoryImage" className="image-label flex items-center cursor-pointer">
            <FaImage className="text-2xl" />
            <input type="file" id="categoryImage" accept="image/*" onChange={handleImageChange} className="hidden" />
            <span className="ml-2">+ Add image</span>
          </label>
        </>
      )}
    </div>

    {/* <div className="mb-4">
  <label htmlFor="categoryVideo" className="block text-gray-600">Upload Video:</label>
  {selectedVideo ? (
    <div className="video-preview-container overflow-auto max-h-48">
      <video controls className="w-full max-w-full">
        <source src={URL.createObjectURL(selectedVideo)} type="file" />
        Your browser does not support the video tag.
      </video>
      <div className="cursor-pointer text-red-500" onClick={handleRemoveVideo}>
        <FaTrash className="text-xl" />
      </div>
    </div>
  ) : (
    <>
      <label htmlFor="categoryVideo" className="video-label flex items-center cursor-pointer">
        <FaVideo className="text-2xl" />
        <input type="file" id="categoryVideo" accept="video/*" onChange={handleVideoChange} className="hidden" />
        <span className="ml-2">+ Add video</span>
      </label>
    </>
  )}
</div> */}


    <input
      type="text"
      placeholder="Enter Course Name"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-2"
    />
    <span className="text-red-500">{courseError}</span>
    <input
      type="text"
      placeholder="Enter Course Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-2"
    />
    <span className="text-red-500">{descriptionError}</span>
    <button onClick={handleAddCourse} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4">
      Add
    </button>
  </div>
</Modal>

);

}
