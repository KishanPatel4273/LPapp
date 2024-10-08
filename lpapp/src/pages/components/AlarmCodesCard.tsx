import React, { useEffect, useState } from 'react';
import { CopyButton } from '../../components';
import { alarmCode } from '../../api';
import AlarmCodeCard from './AlarmCodeCard';
import AddIcon from '@mui/icons-material/Add';
import EditableInputField from './EditableInputField';
import Divider from '@mui/material/Divider';


type props = {
    style?: {}
    alarmCodes: alarmCode[]
    onCreate: () => void
    onUpdate: (alarm_Id: number) => void
};

const AlarmCodesCard = ({ alarmCodes, onCreate, onUpdate, style }: props) => {

    const [isCreating, setIsCreating] = useState<boolean>(false)


    const deleteCode = () => {

    }

    const updateCode = () => {

    }

    const createCode = () => {
        
    }


    return (
        <div style={{ ...styles.card, ...style, display:'flex', flexDirection:'column'}}>
            
            <Divider orientation="vertical" flexItem />               
            
            {alarmCodes.map((value: alarmCode, index, arr) => {
                return <AlarmCodeCard 
                            alarmCode={value}
                            onDelete={(alarmCodes) => {
                                // remove from list and call api to delete
                            }}
                            onUpdate={(alarmCodes) => {
                                // update list and call api put
                            }}
                         />
            })}

            {!isCreating && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ borderRadius: '5px', marginTop:5, marginRight: 5 }}>
                    <button style={styles.button} onClick={() => {setIsCreating(true)}}>
                        <AddIcon style={{fontSize:22}}/>
                    </button>
                </div>
            </div>}
            
            <EditableInputField text={'test'} onUpdate={(newText: string) => {}} />


        </div>
    );
};

const styles = {
    card: {
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        margin: '1rem',
        minWidth: '200px',
        // maxWidth: '400px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: 'green', // Green background
        color: 'white', // White icon or text
        border: 'none', // Remove default border
        borderRadius: '50%', // Make the button round
        width: '22px', // Adjust width
        height: '22px', // Adjust height (equal to width for a perfect circle)
        display: 'flex', // Flexbox for centering the icon
        justifyContent: 'center', // Center icon horizontally
        alignItems: 'center', // Center icon vertically
        cursor: 'pointer', // Add a pointer cursor on hover
        outline: 'none', // Remove the focus outline
    },
};
export default AlarmCodesCard;
