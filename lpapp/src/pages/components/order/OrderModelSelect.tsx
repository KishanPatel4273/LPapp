import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import AddButton from '../buttons/AddButton';
import CardData, { dataMapProps } from '../card/CardData';
import { store } from '../../../api';

/**
 * { tl : T[] } : S
 * { u : U } : T
 */
type props<S, T, U> = {

    title: string
    store: store
    functionType: 'CREATING' | 'UPDATING'
    show: boolean
    onClose: () => void


    ancestorId: string
    defaultDataAncestor: S
    dataAncestor: S
    dataMapAncestor: dataMapProps<S>[]
    onUpdateAncestor: (current: S, updated: S) => Promise<S | null>
    onCreateAncestor: (data: S) => Promise<S | null>

    parentId: string
    parentKey: string
    defaultData: T
    dataList: T[]
    dataMapParent: dataMapProps<T>[]
    getDataParent: () => Promise<T[] | null>
    onUpdateParent: (current: T, updated: T) => Promise<T | null>
    onDeleteParent: (data: T) => Promise<T | null>

    /**
     * T -> {u : U} where u is the key
     */
    childKey: string

    childId: string
    childTitle: string
    dataMapChild: dataMapProps<U>[]
    defaultDataChild: U
    getDataChild: () => Promise<U[] | null>
    onCreateChild: (data: U) => Promise<U | null>
}

/**
 * T is the parent type which contains the child u : U
 * 
 * { tl : T[] } : S  
 * { u : U } : T  
 *
 * @param props
 * @returns
 */
const OrderModelSelect = <S extends {}, T extends {}, U extends {}>(props: props<S, T, U>) => {

    const [show, setShow] = useState(props.show);
    const handleClose = () => { setShow(false); props.onClose() };
    const handleShow = () => setShow(true);

    const [dataAncestor, setDataAncestor] = useState<S>(props.dataAncestor);
    const [dataListParent, setDataListParent] = useState<T[]>(props.dataList);
    const [dataListChild, setDataListChild] = useState<U[]>([]);

    const [isCreatingChild, setIsCreatingChild] = useState<boolean>(false);

    const loadDataParent = async () => {
        const response = await props.getDataParent()
        if (response !== null) {
            setDataListParent(response)
        }
    }

    const loadDataChild = async () => {
        const response = await props.getDataChild()
        if (response !== null) {
            setDataListChild(response)
        }
    }

    useEffect(() => {
        loadDataParent()
        loadDataChild()
    }, [])


    /**
     * Update the ancestor S. Changes on [parentKey] : T[] will not be reflected  
     * that is to say the connection is that T has key to S in the database.
     * If function type is UPDATING, then onUpdateAncestor will handle changes.
     * @param current 
     * @param updated 
     */
    const onUpdateAncestor = async (current: S, updated: S) => {
        if (props.functionType === 'UPDATING') {
            const response = await props.onUpdateAncestor(current, updated)
            if (response !== null) {
                setDataAncestor(response)
            }
        } else {
            setDataAncestor(updated)
        }
    }

    /**
     * Updates the parent T. If the function type is UPDATING,  
     * then onUpdateParent will handle changes. 
     * @param current 
     * @param updated 
     */
    const onUpdateParent = async (current: T, updated: T) => {
        if (props.functionType === 'UPDATING') {
            const response: T | null = await props.onUpdateParent(current, updated)
            setDataListParent(dataListParent.map((value: T) => {
                if (value[props.childKey][props.childId] === current[props.childKey][props.childId]) {
                    if (response !== null) {
                        return response
                    }
                    return current
                }
                return value
            }))

        } else {
            setDataListParent(dataListParent.map((value: T) => {
                if (value[props.childKey][props.childId] === current[props.childKey][props.childId]) {
                    return updated
                }
                return value
            }))
        }
    }

    /**
     * removes the parent T. If the function type is UPDATING,  
     * then onDeleteParent will handle changes. 
     * @param current 
     * @param updated 
     */
    const onRemoveParent = (data: any) => {
        let latch = true
        if (props.functionType === 'UPDATING') {
            latch = false
            const response = props.onDeleteParent(data)
            if (response != null) {
                latch = true
            }
        }
        if (latch) {
            setDataListParent(dataListParent.filter((value: T) => value[props.childKey][props.childId] !== data[props.childKey][props.childId]))
        }
    }

    /**
     * Will add a parent T to ancestor S's list of parents given that  
     * the parent's child U is not in the parent list
     * @param data 
     */
    const onAdd = (data: U) => {
        // add to parent

        // is data in parent list
        const findMath = dataListParent.find((value: T, index: number, array: T[]) => {
            const currentChild = value[props.childKey];

            if (typeof currentChild === 'object' && typeof data === 'object') {
                return Object.entries(data)
                    .filter(([key]) => key !== props.childId) // Exclude the `childId` key from comparison
                    .every(([key, val]) => currentChild[key] === val);
            }
            return false
        })

        if (findMath === undefined) {
            setDataListParent([
                ...dataListParent,
                {
                    ...props.defaultData,
                    [props.childKey]: data,
                } as T
            ])
        }
    }

    /**
     * will handle creating child U
     * @param new_data 
     */
    const onCreateChild = async (new_data: U) => {
        setIsCreatingChild(false)

        const response: U | null = await props.onCreateChild(new_data)

        if (response !== null) {
            setDataListChild([...dataListChild, response])
            onAdd(response)
        }
    }

    /**
     * will create a new ancestor S using parent list and ancestor data
     */
    const onCreateAncestor = async () => {

        const data = { ...dataAncestor, [props.parentKey]: dataListParent }

        const response = await props.onCreateAncestor(data)

        handleClose()
    }

    return (
        <Modal
            show={show}
            size="lg"
            scrollable={true}
            onHide={() => { handleClose(); props.onClose() }}
        >
            <Modal.Header closeButton>
                <Modal.Title> {props.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {/* S */}
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {props.dataMapAncestor.map(
                                (
                                    dataMap: dataMapProps<S>,
                                    index: number,
                                    array: dataMapProps<S>[]) => {
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
                        <CardData<S>
                            key={dataAncestor[props.ancestorId]}
                            value={dataAncestor}
                            dataMap={props.dataMapAncestor}
                            onDelete={() => { }} // should not be used
                            onUpdate={onUpdateAncestor}
                            editingMode={props.functionType === 'CREATING'}
                            editable={true} // view only
                            deleteOrRemove={null}
                            saveOrAdd={'SAVE'}
                        />
                    </div>

                    {props.functionType === 'CREATING' && <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center', // Aligns items vertically
                        }}
                    >
                        <div
                            style={{
                                marginRight: '10px'
                            }}
                        >
                            Create order
                        </div>
                        <AddButton
                            onClick={onCreateAncestor}
                            color={'white'}
                            style={{
                                border: 3,
                                backgroundColor: 'green'
                            }}
                        />
                    </div>}
                    {/* HEADER */}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {props.dataMapParent.map(
                            (
                                dataMap: dataMapProps<T>,
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

                    {/* list of data T */}
                    <div>
                        <div
                            style={{
                                minHeight: '200px',
                                maxHeight: '300px', // Optional: to limit the maximum height before scrolling
                                overflowY: 'auto',  // Enables vertical scrolling if content overflows                        
                            }}
                        >
                            {dataListParent.map((value: T, index: number, array: T[]) => {
                                return <CardData<T>
                                    key={value[props.parentId]}
                                    value={value}
                                    dataMap={props.dataMapParent}
                                    onDelete={onRemoveParent}
                                    onUpdate={onUpdateParent}
                                    editingMode={props.functionType === 'CREATING'}
                                    editable={true} // view only
                                    deleteOrRemove={'REMOVE'}
                                    saveOrAdd={'SAVE'}
                                    showEditingButtonDeleteOrRemove={true} // can only update
                                />
                            })}
                        </div>
                    </div>

                    {/* 
                    
    CHILD DATA <U>  
    renders child data in a list which can be added to parent <T>
                    
*/}

                    <div
                        style={{
                            minHeight: '300px',
                            maxHeight: '300px', // Optional: to limit the maximum height before scrolling
                            // overflowY: 'auto',  // Enables vertical scrolling if content overflows                        
                        }}
                    >
                        <Modal.Header>
                            <Modal.Title> {props.childTitle} </Modal.Title>
                        </Modal.Header>
                        <div
                            style={{
                                minHeight: '200px',
                                maxHeight: '200px', // Optional: to limit the maximum height before scrolling
                                overflowY: 'auto',  // Enables vertical scrolling if content overflows   

                            }}
                        >


                            {dataListChild.map(
                                (value: U, index: number, array: U[]) => {
                                    return (<CardData<U>
                                        value={value}
                                        dataMap={props.dataMapChild}
                                        onDelete={function (data: U): void {
                                            throw new Error('Cannot Delete Child U');
                                        }}
                                        onUpdate={function (current: U, updated: U): void {
                                            // add to parent
                                            onAdd(updated)

                                        }}
                                        editingMode={false}
                                        editable={false} // view only
                                        deleteOrRemove={'DELETE'}
                                        saveOrAdd={'ADD'}
                                        showEditingButtonSaveOrAdd={true} // can only update
                                    />)
                                }
                            )}
                        </div>
                    </div>

                    {/* create button for child U */}

                    {isCreatingChild === false && <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center', // Aligns items vertically
                        }}
                    >
                        <div
                            style={{
                                marginRight: '10px'
                            }}
                        >
                            Create part
                        </div>
                        <AddButton
                            onClick={() => { setIsCreatingChild(true) }}
                            color={'white'}
                            style={{
                                border: 3,
                                backgroundColor: 'green'
                            }}
                        />
                    </div>}


                    {/* create child U */}
                    {isCreatingChild === true &&
                        <div
                            style={{
                                overflowX: 'auto',  // Enables horizontal scrolling if content overflows
                                whiteSpace: 'nowrap',  // Prevents content from wrapping to a new line
                            }}
                        >
                            <CardData<U>
                                value={props.defaultDataChild}
                                dataMap={props.dataMapChild}
                                onDelete={(data: U) => { setIsCreatingChild(false) }}
                                onUpdate={(current: U, updated: U) => { onCreateChild(updated) }}
                                editingMode={true}
                                deleteOrRemove={'DELETE'}
                                saveOrAdd={'SAVE'}
                            />
                        </div>

                    }
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default OrderModelSelect;