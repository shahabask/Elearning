import { useEffect, useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function EditCourse({
    isOpen,
    onRequestClose,
    onEditCourse,
    courseData,
  }) {
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [category,setCategory]=useState('')
    const [subCategroy,setSubCategory]=useState('')
    const [formError, setFormError] = useState({});
    // Add a new state to track deleted video URLs
const [deletedVideoUrls, setDeletedVideoUrls] = useState([]);
const [localVideos, setLocalVideos] = useState([]);

// Function to handle video deletion
const handleDeleteVideo = (videoUrl) => {
  // Add the video URL to the array of deleted video URLs
  setDeletedVideoUrls((prevUrls) => [...prevUrls, videoUrl]);
  setLocalVideos((prevVideos) =>
  prevVideos.filter((video) => video.videoUrl !== videoUrl)
);
};

    useEffect(()=>{
      if(courseData){
        console.log(courseData[0],'courseData')
      setLocalVideos(courseData[0]?.videos)
      setCategory(courseData[0]?.categoryName)
      setSubCategory(courseData[0]?.subCategory)
      setCourse(courseData[0]?.course)
      setDescription(courseData[0]?.description)
      setSelectedImage(modifiedImagePath)
      }
    },[courseData])
  //edit course function in modal
  const handleEditCourse = async (e) => {
    e.preventDefault();
    const errors = validate(course, description, selectedImage);
    setFormError(errors);
  
    const imageFileName = selectedImage instanceof File ? selectedImage : selectedImage.replace("https://www.skillsync.website/images/", "");
  
    if (Object.keys(errors).length === 0) {
      try {
        const updatedCourseData = {
          id: courseData[0]._id,
          course,
          description,
          image: imageFileName,
          deletedVideoUrls: deletedVideoUrls, // Pass the deleted video URLs
        };
        const response = await onEditCourse(updatedCourseData);
  
        if (response === null) {
          setFormError({});
          setSelectedImage(null);
          onRequestClose();
        }
      } catch (error) {
        console.log("Consoled error of axios:", error);
      }
    }
  };
  
//validate function for field
    const validate = (course, description,image) => {
      const errors = {};
  
      if (!course) {
        errors.course = "Course name is required";
      } else if (course.length < 3) {
        errors.course = "Enter at least 3 characters";
      }
      if (!description) {
        errors.description = "Description is required";
      }
      if(!image){
        errors.image='Image is required'
      }
      return errors;
    };


  //to handle image changes
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
    };
  
    const handleRemoveImage = () => {
      setSelectedImage(null);
    };

    const imagePath = courseData[0]?.image
    // const correctPath=`${imagePath.replace(/^backend\/public\//, '')}`
  
      const modifiedImagePath = imagePath
      ? `https://www.skillsync.website/images/${imagePath}`
      : '';

    return (
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Course Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4 bg-white rounded shadow-lg">
        {/* Display Category and SubCategory */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold">Category: {category}</label>
          <label className="block text-gray-700 text-sm font-bold">SubCategory: {subCategroy}</label>
        </div>
        {/* Editable Fields */}
        <input
          type="text"
          placeholder="Edit Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
         <span className="error-message">
          {formError?.course ? formError.course : ""}
        </span>
         <div className="image-input">
          {selectedImage ? (
            <div className="image-preview-container">
              {imagePath ? ( // Display category image if available
        <img src={modifiedImagePath} alt="Category Image" className="image-preview"/>
      ) : ( // Display the selected image if no category image is available
        <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="image-preview"/>
      )}
              <div className="remove-image" onClick={handleRemoveImage}>
                <FaTrash />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="categoryImage" className="image-label">
                <FaImage />
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </>
          )}
        </div>
        <span className="error-message">
          {formError?.image ? formError.image : ""}
        </span>
        <input
          type="text"
          placeholder="Edit Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
     <span className="error-message">
          {formError?.description ? formError.description : ""}
        </span>

        <div className="videos-section mt-4">
  <h3>Videos:</h3>
  {localVideos?.map((video, index) => (
    <div key={index} className="video-pill">
      <span>{video.title}</span>
      <button onClick={() => handleDeleteVideo(video?.videoUrl)}>
        <FaTrash />
      </button>
    </div>
  ))}
</div>
        {/* Buttons for Save and Cancel */}
        <div className="mt-4">
          <button
            onClick={handleEditCourse}
            className="bg-blue-500 text-white rounded p-2 mr-2 hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-gray-700 rounded p-2 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
    
    );
  }
  