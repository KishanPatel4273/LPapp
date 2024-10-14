import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

type props = {
    value: string;
    editMode: boolean; // if editing field
    maxLength? : number
    onUpdate: (value: string) => void;
    style? : {}
};


const InputField = ({ value, editMode,maxLength, onUpdate, style }: props) => {
    const [isEditing, setIsEditing] = useState(editMode); // Track edit mode
    const [currentText, setCurrentText] = useState(value); // Track input value

    useEffect(() => {
        setIsEditing(editMode)
    }, [editMode])

    return (
        <div style={{ display: 'flex', ...style }}>
            {isEditing ? (
                <input
                    style={{ display: 'flex', width:'auto', border:'none' }}
                    defaultValue={value}
                    type="text"
                    
                    value={currentText}
                    onChange={(e) => {
                        if(e.target.value.length > maxLength) {
                            e.target.value =  e.target.value.substring(0, maxLength)
                        }
                        setCurrentText(e.target.value)
                        onUpdate(e.target.value)
                    }} // Update local state on input change
                    autoFocus
                />
            ) : (
                <div 
                    style={{display:'flex', textAlign:'center'}}
                >
                    {currentText}
                </div> 
            )}
        </div>
    );
};

export default InputField;
