import React, { useEffect, useState } from 'react';
import { CopyButton } from '../../components';
import { alarmCode, store } from '../../api';
import AlarmCodeCard from './AlarmCodeCard';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import { createAlarmCode, deleteAlarmCode, updateAlarmCode } from '../../api/AlarmAPI';


type props = {
    style?: {}
    alarmCodes: alarmCode[]
    onCreate: (alarmCode: alarmCode) => void
    onUpdate: (alarm_Id: number) => void
    store: store
};

const AlarmCodesCard = ({ alarmCodes, store, onCreate, onUpdate, style }: props) => {

    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [alarmCodeList, setAlarmCodeList] = useState(alarmCodes)

    const onDeleteCode = (alarmCode : alarmCode) => {
        console.log("delete", alarmCode)
        if (alarmCode?.alarmCodeId) {
            deleteAlarmCode(alarmCode?.alarmCodeId)
            setAlarmCodeList(alarmCodeList.filter(item => item.alarmCodeId !== alarmCode.alarmCodeId));

        } else {
            console.log("deleting alarm code went wrong...")
        }

    }

    const updateCode = async (alarmCode : alarmCode) => {
        const response = await updateAlarmCode(alarmCode, alarmCode.alarmCodeId)
        if (response != false) {
            // response 
        } else {
            console.log("updating alarm code went wrong...")
        }
    }

    const createCode = async (alarmCode : alarmCode) => {
        setIsCreating(false)
        const response = await createAlarmCode(alarmCode, store.storeId)
        if (response !== false) {
            setAlarmCodeList([...alarmCodeList, response])
            console.log("Test Response:", response)
        }

        onCreate(alarmCode)
    }

    useEffect(() => {
        setAlarmCodeList(alarmCodes)
    }, [alarmCodes])


    return (
        <div style={{ ...styles.card, ...style, display: 'flex', flexDirection: 'column' }}>

            <div style={{fontWeight:'bold', textAlign:'center', marginBottom:'1px', alignContent:'center'}}>
                Alarm Codes
            </div>  

            {alarmCodeList.map((value: alarmCode, index, arr) => {
                return <AlarmCodeCard key={value.alarmCodeId}
                    alarmCode={value}
                    onDelete={onDeleteCode}
                    onUpdate={updateCode} 
                    isEditingMode={false}                
                />
            })}

            {!isCreating && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ borderRadius: '5px', marginTop: 5, marginRight: 5 }}>
                    <button style={styles.button} onClick={() => { setIsCreating(true) }}>
                        <AddIcon style={{ fontSize: 22 }} />
                    </button>
                </div>
            </div>}
            {isCreating && <AlarmCodeCard alarmCode={{
                firstName: '',
                lastName: '',
                code: '',
                phoneNumber: '',
                position: 'ASM',
                active: true,
                dateCreated: '',
                storeId: store.storeId
            }} onDelete={function (alarmCode: alarmCode): void {
                setIsCreating(false);
            }} onUpdate={function (alarmCode: alarmCode): void {
                createCode(alarmCode)
            }} isEditingMode={true} 
            />}

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
