// NotesDialog.jsx

import React, { useState } from 'react';
import './CSS/NotesDialog.css'; // Import CSS file for styling

function NotesDialog({ onClose, onSave }) {
  const [note, setNote] = useState('');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() === '') {
      alert('Please enter a note');
      return;
    }
    onSave(note);
    setNote('');
    onClose();
  };

  return (
    <div className="notes-dialog">
      <div className="notes-dialog-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Note</h2>
        {/* Apply flexbox to ensure the textarea fills the available space */}
        <div className="textarea-container">
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Enter your note..."
          />
        </div>
        <div className="notes-dialog-buttons">
          <button onClick={handleSaveNote}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NotesDialog;
