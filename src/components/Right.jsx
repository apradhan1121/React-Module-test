import React, { useState, useEffect } from "react";
import NotesDialog from "./NotesDialog";
import { FaPaperPlane } from 'react-icons/fa'; // Import the paper plane icon from react-icons library


function Right({ selectedGroup }) {
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem(selectedGroup?.name)) || [];
    setNotes(savedNotes);
  }, [selectedGroup]);

  const handleToggleNotesDialog = () => {
    setShowNotesDialog(!showNotesDialog);
  };

  const handleSaveNote = (note) => {
    setNotes([...notes, note]);
    localStorage.setItem(selectedGroup.name, JSON.stringify([...notes, note]));
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message");
      return;
    }
    setNotes([...notes, message]);
    localStorage.setItem(
      selectedGroup.name,
      JSON.stringify([...notes, message])
    );
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div style={{ width: '100%', background: '#DAE5F5', padding: '20px', height: '100vw' }}>
      {/* Display "Select a group" only when no group is selected and notes dialog is not open */}
      {selectedGroup === null && !showNotesDialog && <h2>Select a group</h2>}
      
      {/* Render group details and notes when a group is selected */}
      {selectedGroup && (
        <>
          <div className="right-header" style={{display:'flex', alignItems:'center', backgroundColor:'#001F8B', paddingLeft:'2em'}}>
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: selectedGroup.color,
                marginRight: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              {selectedGroup.name
                .split(' ')
                .map((word) => word.charAt(0))
                .join('')
                .toUpperCase()}
            </div>
            <h2 style={{color:'white'}}>{selectedGroup.name}</h2>
          </div>
          
          {/* Container with white background to wrap the notes */}
          <div style={{ marginTop: '10px' }}>
            {/* Apply white background color to each note */}
            {notes.map((note, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                {note}
              </div>
            ))}
          </div>
          {/* Text area for writing and sending messages */}
          <div style={{ marginTop: '10px', display: 'flex' }}>
            <textarea
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop:'2em' }}
            />
            {/* Use the paper plane icon as the send button */}
            <FaPaperPlane size={24} style={{ cursor: 'pointer' }} onClick={handleSendMessage} />
          </div>
          {showNotesDialog && <NotesDialog onClose={handleToggleNotesDialog} onSave={handleSaveNote} />}
        </>
      )}
    </div>
  );
}

export default Right;
