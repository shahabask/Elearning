import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { axiosInstance } from '../../utils/adminAxios';
Modal.setAppElement('#root');
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      opacity:1,
      zIndex: 1000,
    },
  };
function EditPlan({  isOpen, onRequestClose, plan  }) {
    const [price, setPrice] = useState('');
    const [specifications, setSpecifications] = useState(['']); // Use an array to store multiple specifications
     const [type,setType]=useState('')
     const [duration,setDuration]=useState('')
    const handleAddSpecification = () => {
      setSpecifications([...specifications, '']);
    };
  
    useEffect(()=>{
    setPrice(plan?.price)
    setSpecifications(plan?.benifits)
    setType(plan?.subscriptionMode)
    setDuration(plan?.duration)
    },[plan])
    const handleRemoveSpecification = (index) => {
      const updatedSpecifications = specifications.filter((_, i) => i !== index);
      setSpecifications(updatedSpecifications);
    };
  const handleEditPlan=async(e)=>{
    e.preventDefault();
    try {
      const planData={
        price,
        specifications,
        type,
        duration
      }
      const response=await axiosInstance.post('/editPlan',planData)
  
      setPrice('')
      setSpecifications([''])
      setType('')
      setDuration('')
      onRequestClose()
      toast.success('added successfully')
    } catch (error) {
      toast.error(error?.response?.data||error.error)
    }
    
  }
  useEffect(()=>{
    
  },[])
    return (
        

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Edit Plan Modal"
        style={customStyles}
        
      >
      
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Edit Plan</h2>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
             Subscription Type
            </label>
            <input
              type="text"
              id="type"
              className="mt-1 p-2 border rounded w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="mt-1 p-2 border rounded w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration
            </label>
            <input
              type="text"
              id="duration"
              className="mt-1 p-2 border rounded w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Specifications</label>
            {specifications?.map((spec, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  value={spec}
                  onChange={(e) => {
                    const updatedSpecs = [...specifications];
                    updatedSpecs[index] = e.target.value;
                    setSpecifications(updatedSpecs);
                  }}
                />
                <button
                  type="button"
                  className="ml-2 p-2 text-red-600"
                  onClick={() => handleRemoveSpecification(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 p-2 text-green-600"
              onClick={handleAddSpecification}
            >
              Add More
            </button>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={onRequestClose}
            >
              Cancel
            </button>
            <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleEditPlan}>
              Update Plan
            </button>
          </div>
        </div>
      </Modal>
    );
}

export default EditPlan

