import React, { useEffect, useState } from "react";
import { store } from "../../../api";
import AddIcon from '@mui/icons-material/Add';
import CardData, { dataMapProps } from "./CardData";
import ModelSelect from "./ModelSelect";

type createMode = "many-one-add" | "many-to-many-select-add"

type modalProps<T> = {
    title : string
    /**
     * Get T[], can be an api call that happens when the data is needed
     */
    getData: () => Promise<T[] | null>

    /**
     * used for saving or adding
     */
    // onUpdate: (current: T, updated: T) => Promise<T | null>

    /**
     * 
     * api call to add data to store
     */
    onAdd: (data: T) => Promise<T | null>
}

export type propsBase<T> = {
    title: string
    // object name referencing id or id param
    id: string
    /**
     * list of T that will be rendered
     */
    dataList: T[]
    /**
    * default to use when creating a new entry
    */
    defaultData: T

    /**
     * Format of rows
     */
    dataMap: dataMapProps<T>[]

    onUpdate: (current: T, updated: T) => Promise<T | null>
    onDelete: (data: T) => Promise<T | null>

    store: store

    onCreate: (data: T) => Promise<T | null>
    /**
     * create mode specifies how to handle adding to T to store
     * "many-one-add" -> create a new entry
     * "many-to-many-select-add" -> connect an existing entry or new entry to store
     */
    createMode: createMode

    style?: {}
}

/**
 * props for modal that is used for adding many to many relations to store
 */
type modalCreateProps<T> = propsBase<T> & {
    createMode: 'many-to-many-select-add'
    modalProps: modalProps<T>
}

type cardProps<T> = (propsBase<T> & { createMode: 'many-one-add' }) | modalCreateProps<T>

const Card = <T extends {}>(props: cardProps<T>) => {

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
        console.log("onUpdate call card RESPONSE: ", response)
        if (response !== null) {
            setDataList(dataList.map(
                (value: T, index: number, array: T[]) => {
                    if (value[props.id] === current[props.id]) {
                        return response
                    }
                    return value
                }))
        }

        // TODO: IF IT FAILS NEED TO REVERT BACK TO OLD TEXT
    }

    const onDelete = async (data: T) => {

        const response: T | null = await props.onDelete(data)

        if (response !== null) {
            setDataList(dataList.filter((value: T) => value[props.id] !== data[props.id]))
        }

    }
    
    const onAdd = async (data : T) => {
        if (props.createMode === 'many-to-many-select-add') {
            const response = await props.modalProps.onAdd(data)

            if (response !== null) {
                setDataList([...dataList, response])
            }
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


            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // margin: '5px'
            }}>
                {props.dataMap.map((dataMap: dataMapProps<T>,
                    index: number,
                    array: dataMapProps<T>[]) => {
                    return (
                        <div
                            key={dataMap.displayName}
                            style={{ marginLeft: '5px', marginRight: '5px' }}
                        >
                            {dataMap.displayName}
                        </div>
                    )
                }
                )}
            </div>

            {dataList.map((value: T, index: number, array: T[]) => {
                return <CardData<T>
                    key={value[props.id]}
                    value={value}
                    dataMap={props.dataMap}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    editingMode={false}
                    deleteOrRemove={props.createMode === 'many-one-add' ? 'DELETE' : 'REMOVE'}
                    saveOrAdd={'SAVE'}
                />

            })}


            {!isCreating && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ borderRadius: '5px', marginTop: 5, marginRight: 5 }}>
                    <button style={styles.button} onClick={() => { setIsCreating(true) }}>
                        <AddIcon style={{ fontSize: 22 }} />
                    </button>
                </div>
            </div>}

            {isCreating &&
                (props.createMode === 'many-one-add' ? (
                    <CardData<T>
                        value={props.defaultData}
                        dataMap={props.dataMap}
                        onDelete={(data: T) => { setIsCreating(false) }}
                        onUpdate={(current: T, updated: T) => { onCreate(updated) }}
                        editingMode={true}
                        deleteOrRemove={'DELETE'}
                        saveOrAdd={'SAVE'}
                    />
                ) : (
                    <ModelSelect<T>
                        show={true}
                        onClose={() => { setIsCreating(false); }}
                        getData={props.modalProps.getData}
                        title={props.modalProps.title} 
                        id={props.id} 
                        dataList={[]} 
                        defaultData={props.defaultData} 
                        dataMap={props.dataMap} 
                        onUpdate={
                            (current: T, updated : T) : Promise<T | null> => {
                                onAdd(current)  
                                return null
                            }
                        } 
                        onDelete={() => {throw Error("onDelete in Modal should not be used")}} 
                        store={props.store} 
                        onCreate={props.onCreate} 
                        createMode={"many-one-add"} 
                    />
                ))
            }

        </div>
    )
}

const styles = {
    card: {
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        margin: '1rem',
        minWidth: 'auto',

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