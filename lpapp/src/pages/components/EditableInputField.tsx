import React, { useState } from 'react';

type Props = {
  text: string;
  onUpdate: (newText: string) => Promise<void>;
};

const EditableInputField = ({ text, onUpdate }: Props) => {
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
    <div>
      {isEditing ? (
        <input
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
