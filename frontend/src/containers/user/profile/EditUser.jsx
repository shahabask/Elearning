import React, { useEffect, useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";

function EditUser({ userData }) {
  const [firstName, setFirstName] = useState(userData?.firstName || ""); // Initialize with an empty string
  const [secondName, setSecondName] = useState(userData?.secondName || ""); // Initialize with an empty string
  const [phone, setPhone] = useState(userData?.phone || ""); // Initialize with an empty string
  const [selectedImage, setSelectedImage] = useState(userData?.image || null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const imageFileName =
      selectedImage instanceof File
        ? selectedImage
        : selectedImage
            .replace("https://www.skillsync.website/images/", "")
            .replace("backend\\public\\images\\", "");
    const updatedUserInfo = {
      firstName,
      secondName,
      phone,
      image: imageFileName,
    };

    try {
      const response = await axiosInstance.post(
        "/updateProfile",
        updatedUserInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data === "updated") {
        toast.success("updated successfully");
      } else {
        toast.success("i dont know");
      }
    } catch (error) {
      toast.error(error?.response?.data || error.error);
    }
  };

  const imagePath = userData?.image;

  const modifiedImagePath = imagePath
    ? `https://www.skillsync.website/${imagePath
        .replace(/\\/g, "/")
        .replace(/^backend\/public\//, "")}`
    : "";



  const handleImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
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
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    style={{ zIndex: 10 }}
                    value={firstName}
                    placeholder="Enter first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="lastName">lastName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="secondName"
                    placeholder="Enter second name"
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="image-input" style={{ width: "500px" }}>
              {selectedImage ? (
                <div className="image-preview-container">
                  {imagePath ? ( // Display category image if available
                    <img
                      src={modifiedImagePath}
                      alt="Category Image"
                      className="image-preview"
                    />
                  ) : (
                    // Display the selected image if no category image is available
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Image"
                      className="image-preview"
                    />
                  )}
                  <div className="remove-image" onClick={handleRemoveImage}>
                    <FaTrash />
                  </div>
                </div>
              ) : (
                <>
                  <label htmlFor="image" className="image-label">
                    <FaImage />
                    <input
                      type="file"
                      id="image"
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
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
