import React, { useEffect, useState } from "react";
import { store } from "../../../api";
import AddIcon from '@mui/icons-material/Add';
import CardData, { dataMapProps } from "./CardData";

type props<T> = {
    title: string
    // object name refrencing id or id param
    id: string
    dataList: T[]
    defualtData: T

    dataMap: dataMapProps<T>[]


    onCreate: (data: T) => Promise<T | null>
    onUpdate: (current: T, updated: T) => Promise<T | null>
    onDelete: (data: T) => Promise<T | null>

    store: store

    style?: {}
}

const Card = <T extends {}>(props: props<T>) => {

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [dataList, setDataList] = useState<T[]>(props.dataList);

    const onCreate = async (new_data: T) => {
        setIsCreating(false)

        const response: T | null = await props.onCreate(new_data)

        if (response !== null) {
            setDataList([...dataList, response])
        }
    }

    const onUpdate = async (current: T, updated: T) => {

        console.log("onUpdate call card: ", current, updated)
        const response: T | null = await props.onUpdate(current, updated)

        if (response !== null) {
            setDataList(dataList.map(
                (value: T, index: number, array: T[]) => {
                    if (value[props.id] === current[props.id]) {
                        return response
                    }
                    return value
                }))
        }
    }

    const onDelete = async (data: T) => {

        const response: T | null = await props.onDelete(data)

        if (response !== null) {
            setDataList(dataList.filter((value: T) => value[props.id] !== data[props.id]))
        }

    }

    useEffect(() => {
        // keep data concurrent with parrent
        setDataList(props.dataList)
    }, [props.dataList])

    return (
        <div style={{ ...styles.card, ...props.style, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '1px', alignContent: 'center' }}>
                {props.title}
            </div>

            {dataList.map((value: T, index: number, array: T[]) => {
                return <CardData<T>
                    key={value[props.id]}
                    value={value}
                    dataMap={props.dataMap}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    editingMode={false}
                />

            })}


            {!isCreating && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ borderRadius: '5px', marginTop: 5, marginRight: 5 }}>
                    <button style={styles.button} onClick={() => { setIsCreating(true) }}>
                        <AddIcon style={{ fontSize: 22 }} />
                    </button>
                </div>
            </div>}

            {isCreating && <CardData<T> 
                value={props.defualtData} 
                dataMap={props.dataMap} 
                onDelete={(data : T) => {setIsCreating(false)}} 
                onUpdate={(current : T, updated : T) => {onCreate(updated)}} 
                editingMode={true} 
            />}

        </div>
    )
}

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

export default Card;