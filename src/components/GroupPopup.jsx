import React, { useState } from 'react';
import './CSS/GroupPopup.css'

function GroupPopup({ onClose, onSave }) {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('#000000');

  const handleNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleColorChange = (e) => {
    setGroupColor(e.target.value);
  };

  const handleSubmit = () => {
    if (groupName.trim() === '') {
      alert('Please enter a group name');
      return;
    }
    onSave(groupName, groupColor);
    setGroupName('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Group</h2>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={handleNameChange}
        />
        <label htmlFor="groupColor">Choose Color:</label>
        <input
          type="color"
          id="groupColor"
          value={groupColor}
          onChange={handleColorChange}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default GroupPopup;