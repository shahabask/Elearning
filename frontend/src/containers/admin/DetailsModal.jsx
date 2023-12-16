
function DetailsModal({ isOpen, onClose, details }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Details</h2>
        <p>{details}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default DetailsModal;
