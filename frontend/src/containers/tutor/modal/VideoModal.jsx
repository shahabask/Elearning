import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    position: 'static',
    border: 'none',
    background: 'none',
    overflow: 'visible',
  },
};

Modal.setAppElement('#root');

function VideoModal({id, isOpen, onRequestClose, onSaveVideo }) {
  const [video, setVideo] = useState( { title: '', description: '', videoUrl: null });
  const [errors, setErrors] = useState({});

  const clearErrors = () => {
    setErrors({});
  };

  const handleSave = () => {
    clearErrors();
    const isValid = validate();

    if (isValid) {
      onSaveVideo(video,id);
      onRequestClose();
      setVideo({ title: '', description: '', videoUrl: null })
    }
  };

  const handleVideoChange = (e) => {
    setVideo({
      ...video,
      videoUrl: e.target.files[0],
    });
  };

  const handletitleChange = (e) => {
    setVideo({
      ...video,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setVideo({
      ...video,
      description: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!video.title) {
      newErrors['title'] = 'Title is required';
    }

    if (!video.description) {
      newErrors['description'] = 'Description is required';
    }

    if (!video.videoUrl) {
      newErrors['videoUrl'] = 'Video is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="w-96 p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          { 'Add Video'}
        </h2>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full border p-2 rounded mb-2"
        />
        {errors['videoUrl'] && <p className="text-red-600">{errors['videoUrl']}</p>}
        <input
          type="text"
          placeholder="Video title"
          value={video.title}
          onChange={handletitleChange}
          className="w-full border p-2 rounded mb-2"
        />
        {errors['title'] && <p className="text-red-600">{errors['title']}</p>}
        <textarea
          placeholder="Video Description"
          value={video.description}
          onChange={handleDescriptionChange}
          className="w-full border p-2 rounded mb-2"
        />
        {errors['description'] && <p className="text-red-600">{errors['description']}</p>}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white rounded p-2 mr-2 hover:bg-blue-600 mt-4"
        >
          Save Video
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 mt-4"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default VideoModal;
