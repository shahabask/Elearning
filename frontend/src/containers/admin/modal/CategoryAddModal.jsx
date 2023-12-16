import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes, FaImage, FaTrash } from "react-icons/fa"; // Import the trash icon
import "./CategoryAdd.css";

Modal.setAppElement("#root");

export default function CategoryAddModal({
  isOpen,
  onRequestClose,
  onAddCategory,
}) {
  const [formError, setFormError] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const categoryData = {
          categoryName,
          subCategories,
          image: selectedImage,
        };
        const response = await onAddCategory(categoryData);

        if (response === null) {
          setCategoryName("");
          setSubCategories([""]);
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

  const validate = (categoryName) => {
    const errors = {};

    if (!categoryName) {
      errors.categoryName = "Category name is required";
    } else if (categoryName.length < 3) {
      errors.categoryName = "Enter at least 3 characters";
    }

    return errors;
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel="Add Category Modal"
  className="custom-modal"
  overlayClassName="custom-overlay"
>
  <div className="modal-content p-4">
    <div className="header">
      <div className="close-icon" onClick={onRequestClose}>
        <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
    <h2 className="text-3xl font-bold mt-4">Add Category</h2>
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

    <div className="image-input mt-4">
      {selectedImage ? (
        <div className="image-preview-container">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            className="image-preview"
          />
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
            {/* The following input is hidden */}
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            Add image
          </label>
        </>
      )}
    </div>

    <div>
      <h4 className="text-lg font-semibold mt-4">Subcategories</h4>
      {subCategories.map((course, index) => (
        <div key={index} className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Subcategory"
            value={course}
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

    <div className="buttonDiv mt-4">
      <button
        onClick={handleAddCategory}
        className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add
      </button>
    </div>
  </div>
</Modal>

  );
}
