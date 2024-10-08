import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

type props = {
  text: string;
  onUpdate: (newText: string) => void;
};


const EditableInputField = ({ text, onUpdate }: props) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [currentText, setCurrentText] = useState(text); // Track input value

  // Handle when the user finishes editing (onBlur)
  const handleBlur = async () => {
    setIsEditing(false); // Exit edit mode
    if (currentText !== text) {
      await onUpdate(currentText); // Call the API to update the text
    }
  };

  // Handle when the user clicks to edit
  const handleDoubleClick = () => {
    setIsEditing(true); // Enter edit mode
  };

  return (
    <div style={{ display: 'flex' }}>
      {isEditing ? (
        <TextField
          style={{ display: 'flex', maxWidth: 75 }}
          defaultValue={text}
          margin="none"
          size="small"
          type="text"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)} // Update local state on input change
          onBlur={handleBlur} // Call API when input loses focus
          autoFocus
        />
          ) : (
          <label onDoubleClick={handleDoubleClick}>{currentText}</label> // Show text label and switch to edit mode on double click
      )}
        </div>
      );
};

      export default EditableInputField;
