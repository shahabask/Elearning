import { useState } from 'react';
// import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button } from 'react-bootstrap';
import { FaImage, FaTrash } from 'react-icons/fa';
import { axiosInstance as tutorAxiosInstance } from '../../utils/tutorAxios';

import { toast } from 'react-toastify';
function AddForm({tutorData,subCategories}) {

  const [userName, setUserName] = useState(tutorData[0]?.userName || ''); // Initialize with an empty string
const [city, setCity] = useState(tutorData[0]?.address?.city || ''); // Initialize with an empty string
const [state, setState] = useState(tutorData[0]?.address?.state || ''); // Initialize with an empty string
const [country, setCountry] = useState(tutorData[0]?.address?.country || ''); // Initialize with an empty string
const [degree, setDegree] = useState(tutorData[0]?.degree || ''); // Initialize with an empty string
const [description, setDescription] = useState(tutorData[0]?.description || ''); // Initialize with an empty string

  const [selectedImage, setSelectedImage] = useState(tutorData[0]?.image||null);
const handleUpdate=async(e)=>{
  e.preventDefault();
  const imageFileName = selectedImage instanceof File ? selectedImage: selectedImage.replace("https://www.skillsync.website/images/", "")
  const updatedTutorInfo = {
    userName,
    city,
    state,
    country,
    degree,
    skills,
    description,
    image:imageFileName,
  };
  try{
    const response =await tutorAxiosInstance.post('/updateTutorProfile',updatedTutorInfo,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },})
      if(response.data==='updated'){
        toast.success('updated successfully')
      }else{
        toast.success('i dont know')
      }

  }catch(error){
   
      toast.error(error?.response?.data ||error.error)
  }
  
}


const [isModalOpen, setIsModalOpen] = useState(false);
const [skills, setSkills] = useState(tutorData[0]?.specification || []);

const [selectedSkill, setSelectedSkill] = useState('');
const [subcategories, setSubcategories] = useState(subCategories);
const imagePath = tutorData[0]?.image
// const correctPath=`${imagePath.replace(/^backend\/public\//, '')}`

const modifiedImagePath = imagePath
? `https://www.skillsync.website/images/${imagePath}`
: '';


const handleAddSkill = () => {
  if (selectedSkill) {
    setSkills([...skills, selectedSkill]);
    setSubcategories(subcategories.filter((skill) => skill !== selectedSkill));
    setSelectedSkill('');
  }
};

const handleRemoveSkill = (index) => {
  const updatedSkills = skills.filter((_, i) => i !== index);
  setSkills(updatedSkills);
};
const handleImageChange = (e) => {
  const file = e.target.files[0];
  setSelectedImage(file);
};

const handleRemoveImage = () => {
  setSelectedImage(null);
};
  return (
    <>
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-3 text-primary">Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      style={{ zIndex: 10 }}
                      value={userName}
                      placeholder="Enter User name"
                      onChange={(e)=>setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e)=>setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="State">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="State"
                      placeholder="Enter State"
                      value={state}
                      onChange={(e)=>setState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="url"
                      className="form-control"
                      id="country"
                      value={country}
                      placeholder="enter country"
                      onChange={(e)=>setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-3 text-primary mt-2">Qualification</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="degree">Degree</label>
                    <input
                      type="name"
                      className="form-control"
                      id="Degree"
                      placeholder="Enter degree"
                      value={degree}
                      onChange={(e)=>setDegree(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label htmlFor="ciTy">Skills</label>
                <div className="flex flex-wrap">
                  {skills?.map((skill, index) => (
                    <div key={index} className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 m-1">
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="ml-2 text-red-600 cursor-pointer"
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-400 text-white rounded-full px-2 py-1 m-1 cursor-pointer"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>
               
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </div>
                </div>
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
          {/* {formError?.image ? formError.image : ""} */}
        </span>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right d-flex justify-content-center">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary mt-3"
                    onClick={handleUpdate}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {subcategories.map((skill, index) => (
              <li
                key={index}
                className={`cursor-pointer text-blue-500 ${
                  selectedSkill === skill ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddSkill}
            disabled={!selectedSkill}
          >
            Add Selected Skill
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    </>
  )
}

export default AddForm