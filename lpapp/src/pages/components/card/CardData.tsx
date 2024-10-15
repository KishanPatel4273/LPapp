import { useEffect, useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import InputField from "../InputField";
import { dsm } from "../../../api";


export type dataMapType = "INPUT" | "DROPDOWN"

export type dataMapBase<T> = {
    type?: dataMapType
    displayName: string
    valueFn: (data: T) => string
    onUpdate: (
        value: string,
        currentData: T,
        updatedData: T,
    ) => {}
    style?: {}

}

export type dataMapInput<T> = dataMapBase<T> & {
    type: "INPUT"
    validate: (data: T) => boolean
    maxLength?: number
}

export type dataMapDropDown<T> = dataMapBase<T> & {
    type: "DROPDOWN"
    options: string[]
    defaultOption: string
}

export type dataMapProps<T> = dataMapInput<T> | dataMapDropDown<T>


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

    useEffect(() => {
        setData(value)
    }, [value])

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
                        onClick={() => { onDelete(data) }}
                    >
                        <ClearIcon style={{ color: 'red' }} />
                    </button>
                </div>}

            {dataMap.map((dataMap: dataMapProps<T>,
                index: number,
                array: dataMapProps<T>[]) => {

                switch (dataMap.type) {
                    case "INPUT":
                        return (
                            <InputField
                                key={index + "_" + dataMap.valueFn(data)} // if the key changes this will cause a rerender of component
                                value={dataMap.valueFn(data)}
                                style={{ ...dataMap.style }}
                                editMode={isEditing}
                                maxLength={dataMap.maxLength}
                                // @TODO add validate 
                                onUpdate={(value: string) => {
                                    setUpdatedData({ ...updatedData, ...dataMap.onUpdate(value, data, updatedData) })
                                }}
                            />
                        )
                    case "DROPDOWN":
                        return (
                            <>
                                {isEditing ? (
                                    <select
                                        key={index + "_" + dataMap.valueFn(data)} // if the key changes this will cause a rerender of component
                                        value={dataMap.defaultOption}
                                        onChange={(e) => setUpdatedData({ ...updatedData, ...dataMap.onUpdate(e.target.value, data, updatedData) })}
                                        style={{ ...dataMap.style }}
                                    >
                                        {dataMap.options.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div
                                        style={{ display: 'flex', textAlign: 'center' }}
                                    >
                                        {dataMap.valueFn(data)}
                                    </div>)
                                }
                            </>
                        )
                }


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