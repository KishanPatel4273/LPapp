import { useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import InputField from "../InputField";
import { dsm } from "../../../api";


export type dataMapProps<T> = {
    displayName: string
    valueFn: (data: T) => string
    onUpdate: (
        value: string,
        currentData: T,
        updatedData: T,
    ) => {}
    styleInput?: {}
}

type props<T> = {
    value: T;
    dataMap: dataMapProps<T>[]
    
    onDelete: (data: T) => void;
    onUpdate: (current: T, updated: T) => void
    editingMode: boolean;
    style?: {};
}

const CardData = <T extends {}>({ value, dataMap, onDelete, onUpdate, editingMode, style }: props<T>) => {

    const [isEditing, setIsEditing] = useState<boolean>(editingMode);
    const [data, setData] = useState(value)
    const [updatedData, setUpdatedData] = useState(value)

    const onUpdateData = () => {
        // switch modes
        setIsEditing(false)
        // call callback to handle update
        // send updatedData as data has not been changed yet
        onUpdate(data, updatedData)
        // update current data
        setData(updatedData)
 
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
                        onClick={() => {onDelete(data)}}
                    >
                        <ClearIcon style={{ color: 'red' }} />
                    </button>
                </div>}

            {dataMap.map((dataMap:dataMapProps<T>,
                          index:number,
                          array:dataMapProps<T>[]) => {

                return (
                    <InputField
                        key={index}
                        value={dataMap.valueFn(data)} 
                        style={{...dataMap.styleInput}}
                        editMode={isEditing} 
                        onUpdate={(value : string) => {
                            setUpdatedData({...updatedData, ...dataMap.onUpdate(value, data, updatedData)})
                        }}
                    />
                )
            })}

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
                            backgroundColor: 'transparent',    // Background color (optional)
                            cursor: 'pointer'           // Change the cursor on hover
                        }}
                        onClick={onUpdateData}
                    >
                        <CheckIcon style={{ color: 'green' }} />
                    </button>
                </div>}
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Center items horizontally
        border: '1px solid #ccc',
        margin: '5px',
    },
};


export default CardData