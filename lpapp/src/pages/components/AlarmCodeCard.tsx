import React, { useEffect, useState } from 'react';
import { CopyButton } from '../../components';
import { alarmCode } from '../../api';
import { formatPhoneNumber } from '../../api/AlarmAPI';
import TextField from '@mui/material/TextField';
import InputField from './InputField';
import { ALL } from 'dns';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

type prams = {
    alarmCode: alarmCode
    onDelete : (alarmCode:alarmCode) => void
    onUpdate : (alarmCode:alarmCode) => void
    style?: {}
}

/**
 * @todo checking input formats
 * @param param
 * @returns 
 */
const AlarmCodeCard = ({ alarmCode, onDelete, onUpdate, style }: prams) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [data, setData] = useState(alarmCode)
    const [updatedData, setUpdatedData] = useState(alarmCode)

    const deleteCode = () => {
        onDelete(updatedData)
    }

    const updateCode = () => {
        setData(updatedData)
        setIsEditing(false)
        onUpdate(updatedData)
    }

    return (
        <div
            style={{ ...styles.container, ...style }}
            onDoubleClick={() => { setIsEditing(true) }}
        >

            {isEditing &&
                <div style={{ display: 'flex' }}>
                    <button
                        style={{
                            display: 'flex',
                            justifyContent: 'center',   // Center the icon horizontally
                            alignItems: 'center',       // Center the icon vertically
                            width: '30px',              // Set width (smaller size)
                            height: '30px',             // Set height (should be equal to width for a circle)
                            borderRadius: '50%',        // Make the button circular
                            border: 'none',             // Remove the border (optional)
                            backgroundColor: 'transparent',    // Background color (optional)
                            cursor: 'pointer'           // Change the cursor on hover
                        }}
                        onClick={deleteCode}
                    >
                        <ClearIcon style={{ color: 'red' }} />
                    </button>
                </div>}


            <InputField
                value={data.code}
                editMode={isEditing}
                onUpdate={(value) => { 
                    setUpdatedData({...updatedData,  code:value }) 
                   }}
            />

            <InputField
                style={{ marginLeft: 10, marginRight: 10, maxWidth: 150 }}
                value={data.firstName + " " + data.lastName}
                editMode={isEditing}
                onUpdate={(value) => {  
                    const vt = value.trim()
                    const vl = vt.split(" ")
                    if (vl.length <= 1) {
                        setUpdatedData({...updatedData, firstName: vl[0]})
                    } else if (vl.length >= 2) {
                        setUpdatedData({...updatedData, firstName: vl[0], lastName: vl[1]})
                    }
                }}

            />

            <InputField
                value={formatPhoneNumber(data.phoneNumber)}
                editMode={isEditing}
                onUpdate={(value) => { 
                    setUpdatedData({...updatedData, phoneNumber:formatPhoneNumber(value)}) 
                }}
            />

            {isEditing &&
                <div style={{ display: 'flex' }}>
                    <button
                        style={{
                            display: 'flex',
                            justifyContent: 'center',   // Center the icon horizontally
                            alignItems: 'center',       // Center the icon vertically
                            width: '30px',              // Set width (smaller size)
                            height: '30px',             // Set height (should be equal to width for a circle)
                            borderRadius: '50%',        // Make the button circular
                            border: 'none',
                            backgroundColor:'transparent',    // Background color (optional)
                            cursor: 'pointer'           // Change the cursor on hover
                        }}
                        onClick={updateCode}
                    >
                        <CheckIcon style={{ color: 'green' }} />
                    </button>
                </div>}
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Center items horizontally
        border: '1px solid #ccc',
        margin: '5px',
    },
};

export default AlarmCodeCard