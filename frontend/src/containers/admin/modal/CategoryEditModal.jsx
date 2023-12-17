import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes, FaImage, FaTrash } from "react-icons/fa";

Modal.setAppElement("#root");

export default function CategoryEditModal({
  isOpen,
  onRequestClose,
  onEditCategory,
  categoryData, // Data of the category being edited
}) {
  const [formError, setFormError] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (categoryData[0]) {
      setCategoryName(categoryData[0].categoryName);
      setSubCategories(categoryData[0].subCategories);
      setSelectedImage(modifiedImagePath)
     
    }
  }, [categoryData]);

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName, subCategories,selectedImage);
    setFormError(errors);
    const imageFileName = selectedImage instanceof File ? selectedImage: selectedImage.replace("https://www.skillsync.website/images/", "")
    if (Object.keys(errors).length === 0) {
      try {
        const updatedCategoryData = {
          _id: categoryData[0]._id,
          categoryName,
          subCategories,
          image:imageFileName,
        };
        const response = await onEditCategory(updatedCategoryData);

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

  const handleAddCourseField = () => {
    setSubCategories([...subCategories, ""]);
  };

  const handleDeleteCourseField = (index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories.splice(index, 1);
    setSubCategories(updatedSubCategories);
  };

  const handleCourseChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const validate = (categoryName, subCategories,image) => {
    const errors = {};

    if (!categoryName) {
      errors.categoryName = "Category name is required";
    } else if (categoryName.length < 3) {
      errors.categoryName = "Enter at least 3 characters";
    }
    if (subCategories.length === 0) {
      errors.subCategories = "At least add one subCategory";
    }
    if(!image){
      errors.image='Image is required'
    }
    return errors;
  };
  const imagePath = categoryData[0]?.image
  // const correctPath=`${imagePath.replace(/^backend\/public\//, '')}`

    const modifiedImagePath = imagePath
    ? `https://www.skillsync.website/images/${imagePath}`
    : '';
  return (
<Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel="Edit Category Modal"
  className="custom-modal mt-16"
  overlayClassName="custom-overlay"
>
  <div className="modal-content bg-white rounded-lg shadow-lg p-4">
    <div className="header">
      <div className="close-icon" onClick={onRequestClose}>
        <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
    <h2 className="text-2xl font-bold mt-2">Edit Category</h2>
    <input
      type="text"
      placeholder="Category Name"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
      className="w-full border rounded p-2 mt-2"
    />
    <span className="text-red-500">
      {formError?.categoryName ? formError.categoryName : ""}
    </span>

    <div className="image-input mt-2">
      {selectedImage ? (
        <div className="image-preview-container">
          {imagePath ? (
            <img
              src={modifiedImagePath}
              alt="Category Image"
              className="image-preview"
            />
          ) : (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              className="image-preview"
            />
          )}
          <div
            className="remove-image text-red-500 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <FaTrash />
          </div>
        </div>
      ) : (
        <>
          <label
            htmlFor="categoryImage"
            className="image-label bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            <FaImage className="mr-2" />
            Upload Image
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </>
      )}
    </div>

    <div>
      <h4 className="text-lg font-semibold mt-2">Subcategories</h4>
      {subCategories.map((subCategory, index) => (
        <div key={index} className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Subcategory"
            value={subCategory}
            onChange={(e) => handleCourseChange(index, e.target.value)}
            className="w-full border rounded p-2"
          />
          <span
            className="delete-icon text-red-500 cursor-pointer ml-2"
            onClick={() => handleDeleteCourseField(index)}
          >
            <FaTrash />
          </span>
        </div>
      ))}
      <button
        onClick={handleAddCourseField}
        className="add-course-button bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
      >
        Add more
      </button>
    </div>

    <div className="buttonDiv mt-2">
      <button
        onClick={handleEditCategory}
        className="edit-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Edit
      </button>
    </div>
  </div>
</Modal>


  );
}
