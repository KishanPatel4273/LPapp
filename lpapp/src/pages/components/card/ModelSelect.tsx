import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Card, { propsBase } from './Card';
import CardData, { dataMapProps } from './CardData';
import AddButton from '../buttons/AddButton';

type props<T> = propsBase<T> & { createMode: 'many-one-add' } & {
    show: boolean
    onClose: () => void
    getData: () => Promise<T[] | null>
}

const ModelSelect = <T extends {}>(props: props<T>) => {

    const [show, setShow] = useState(props.show);
    const handleClose = () => { setShow(false); props.onClose() };
    const handleShow = () => setShow(true);

    const [dataList, setDataList] = useState<T[]>(props.dataList);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const loadData = async () => {
        const response = await props.getData()
        console.log("Modal data", response)
        if (response !== null) {
            setDataList(response)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const onCreate = async (new_data: T) => {
        setIsCreating(false)

        const response: T | null = await props.onCreate(new_data)

        if (response !== null) {
            setDataList([...dataList, response])
        }
        //         
        //      CLOSE MODAL AND ADD TO ORIGINAL CARD
        // 
        // 


    }

    return (
        <Modal show={show} onHide={() => { handleClose(); props.onClose() }}>
            <Modal.Header closeButton>
                <Modal.Title> {props.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {/* HEADER */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {props.dataMap.map(
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
                    <div
                        style={{
                            minHeight: '200px',
                            maxHeight: '400px', // Optional: to limit the maximum height before scrolling
                            overflowY: 'auto',  // Enables vertical scrolling if content overflows                        
                        }}
                    >
                        {dataList.map((value: T, index: number, array: T[]) => {
                            return <CardData<T>
                                key={value[props.id]}
                                value={value}
                                dataMap={props.dataMap}
                                onDelete={props.onDelete} // should not be used
                                onUpdate={() => {
                                    // add value clicked on
                                    props.onUpdate(value, value)
                                    handleClose()
                                }}
                                editingMode={false}
                                editable={false} // view only
                                deleteOrRemove={'DELETE'}
                                saveOrAdd={'ADD'}
                                showEditingButtonSaveOrAdd={true} // can only update
                            />
                        })}
                    </div>


                    {/* create button */}

                    {isCreating === false && <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <AddButton
                            onClick={() => { setIsCreating(true) }}
                            color={'white'}
                            style={{
                                border: 3,
                                backgroundColor: 'green'
                            }}
                        />
                    </div>}

                    {isCreating === true &&
                        <div
                            style={{
                                overflowX: 'auto',  // Enables horizontal scrolling if content overflows
                                whiteSpace: 'nowrap',  // Prevents content from wrapping to a new line
                            }}
                        >
                            <CardData<T>
                                value={props.defaultData}
                                dataMap={props.dataMap}
                                onDelete={(data: T) => { setIsCreating(false) }}
                                onUpdate={(current: T, updated: T) => { onCreate(updated) }}
                                editingMode={true}
                                deleteOrRemove={'DELETE'}
                                saveOrAdd={'SAVE'}
                            />
                        </div>

                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModelSelect;