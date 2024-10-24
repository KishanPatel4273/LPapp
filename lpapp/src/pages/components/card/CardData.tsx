import { useEffect, useState } from "react";

import InputField from "../InputField";
import { dsm } from "../../../api";
import DropDownField from "../DropDownField";
import DeleteButton from "../buttons/DeleteButton";
import SaveButton from "../buttons/SaveButton";
import RemoveButton from "../buttons/RemoveButton";
import AddButton from "../buttons/AddButton";


export type dataMapType = "INPUT" | "DROPDOWN" | "VIEW"

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
}


export type dataMapVIEW<T> = dataMapBase<T> & {
    type: "VIEW"
    maxLength?: number
}

export type dataMapProps<T> = dataMapInput<T> | dataMapDropDown<T> | dataMapVIEW<T>


type props<T> = {
    value: T;
    dataMap: dataMapProps<T>[]

    onDelete: (data: T) => void;
    onUpdate: (current: T, updated: T) => void
    editingMode: boolean;
    editable?: boolean
    deleteOrRemove: 'DELETE' | 'REMOVE' | null
    saveOrAdd: 'SAVE' | 'ADD' | null
    showEditingButtonDeleteOrRemove?: boolean
    showEditingButtonSaveOrAdd?: boolean

    style?: {};
}

const CardData = <T extends {}>({ value, dataMap, onDelete, onUpdate, editingMode, deleteOrRemove, saveOrAdd, editable = true, showEditingButtonDeleteOrRemove = false, showEditingButtonSaveOrAdd = false, style }: props<T>) => {

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
            onDoubleClick={() => {
                if (editable) {
                    setIsEditing(true)
                }
            }}
        >
            {deleteOrRemove && (isEditing || showEditingButtonDeleteOrRemove) &&
                <div style={{ display: 'flex' }}>
                    {deleteOrRemove === 'DELETE' ?
                        <DeleteButton
                            onClick={() => { onDelete(data) }}
                        />
                        :
                        <RemoveButton
                            onClick={() => { onDelete(data) }}
                        />
                    }
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
                                style={{ ...dataMap.style, margin: '5px' }}
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

                            <DropDownField
                                key={index + "_" + dataMap.valueFn(data)} // if the key changes this will cause a rerender of component
                                defaultOption={dataMap.valueFn(data)}
                                editMode={isEditing}
                                options={dataMap.options}
                                onUpdate={(value: string) => {
                                    setUpdatedData({ ...updatedData, ...dataMap.onUpdate(value, data, updatedData) })
                                }}
                            />

                        )
                    case "VIEW":
                        return (
                            <InputField
                                key={index + "_" + dataMap.valueFn(data)} // if the key changes this will cause a rerender of component
                                value={dataMap.valueFn(data)}
                                style={{ ...dataMap.style, margin: '5px' }}
                                editMode={false}
                                maxLength={dataMap.maxLength}
                                // @TODO add validate 
                                onUpdate={(value: string) => {
                                    setUpdatedData({ ...updatedData, ...dataMap.onUpdate(value, data, updatedData) })
                                }}
                            />
                        )
                }


            })}

            {saveOrAdd && (isEditing || showEditingButtonSaveOrAdd) &&
                <div style={{ display: 'flex' }}>
                    {saveOrAdd === 'SAVE' ?
                        <SaveButton
                            onClick={onUpdateData}
                        />
                        :
                        <AddButton
                            onClick={onUpdateData}
                        />
                    }
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