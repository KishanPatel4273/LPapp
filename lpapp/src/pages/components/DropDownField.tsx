import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

type props = {
    defaultOption: string;
    editMode: boolean; // if editing field
    options: string[]
    onUpdate: (value: string) => void;
    style?: {}
};


const DropDownField = ({ defaultOption, editMode, options, onUpdate, style }: props) => {
    const [isEditing, setIsEditing] = useState(editMode); // Track edit mode
    const [currentOption, setCurrentOption] = useState(defaultOption); // Track input value

    useEffect(() => {
        setIsEditing(editMode)
    }, [editMode])

    return (
        <div style={{ display: 'flex', ...style }}>
            {isEditing ? (
                <select
                    value={currentOption}
                    onChange={(e) => {
                        setCurrentOption(e.target.value)
                        onUpdate(e.target.value)
                    }
                    }
                    style={{...style}}
                >
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <div
                    style={{ display: 'flex', textAlign: 'center' }}
                >
                    {currentOption}
                </div>)
            }
        </div>
    );
};

export default DropDownField;
