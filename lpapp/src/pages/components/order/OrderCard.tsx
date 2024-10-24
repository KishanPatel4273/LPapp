import React, { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import CardData, { dataMapProps } from "../card/CardData";
import { createOrder, createProduct, orderStateType, getProducts, order, orderItem, product, store, getOrdersByStore, updateOrderItem, deleteOrderItem, createOrderItem, updateOrder } from "../../../api";
import OrderModelSelect from "./OrderModelSelect";
import { isNumeric } from "../../../utils";
import { CurrencyExchange } from "@mui/icons-material";


type props = {
    title: string
    // object name referencing id or id param
    id: string
    /**
     * list of order that will be rendered
     */
    // dataList: order[]
    /**
    * default to use when creating a new entry
    */
    defaultData: order

    onUpdate: (current: order, updated: order) => Promise<order | null>
    onDelete: (data: order) => Promise<order | null>

    store: store

    onCreate: (data: order) => Promise<order | null>

    style?: {}
}

const OrderCard = (props: props) => {

    const orderDataMap: dataMapProps<order>[] = [
        {
            type: 'DROPDOWN',
            displayName: 'shipTo',
            options: ['STORE', 'DSM', 'ZM'],
            valueFn: (data: order) => { return data['shipTo']; },
            onUpdate: (value: string, currentData: order, updatedData) => {
                return { shipTo: value };
            },
        },
        {
            type: 'DROPDOWN',
            displayName: 'Status',
            options: ['PLACED', 'READY', 'SHIPPED', 'CANCELLED'],
            valueFn: (data: order) => { return data['orderState']; },
            onUpdate: (value: string, currentData: order, updatedData) => {
                return { orderState: value };
            },
        },
    ]

    const orderItemDataMap: dataMapProps<orderItem>[] = [
        {
            type: 'VIEW',
            displayName: 'product',
            valueFn: (data: orderItem) => { return data['product']['name']; },
            maxLength: 128,
            onUpdate: (value: string, currentData: orderItem, updatedData) => {
                return {};
            },
        },
        {
            type: 'INPUT',
            displayName: 'quantity',
            valueFn: (data: orderItem) => { return '' + data['quantity']; },
            maxLength: 4,

            onUpdate: (value: string, currentData: orderItem, updatedData) => {
                return { quantity: Number(value) };
            },
            validate: function (data: orderItem): boolean {
                return 0 < data.quantity
            }
        },
        {
            type: 'INPUT',
            displayName: 'comments',
            valueFn: (data: orderItem) => { return data['comments']; },
            maxLength: 128,

            onUpdate: (value: string, currentData: orderItem, updatedData) => {
                return { comments: value };
            },
            validate: function (data: orderItem): boolean {
                return true
            }
        },
    ]

    const [isCreatingOrUpdating, setIsCreatingOrUpdating] = useState<[boolean, boolean, order]>([false, false, null]); // 
    const [dataList, setDataList] = useState<order[]>([]);
    const [storeData, setStoreData] = useState<store>(props.store)

    const onCreate = async (new_data: order) => {
        setIsCreatingOrUpdating([false, false, null])

        const response: order | null = await createOrder(new_data)

        if (response !== null) {
            setDataList([...dataList, response])
        }

        return response
    }

    const onUpdate = async (current: order, updated: order) => {

        console.log("onUpdate call card: ", current, updated)
        const response: order | null = await props.onUpdate(current, updated)
        console.log("onUpdate call card RESPONSE: ", await response)
        if (response !== null) {
            setDataList(dataList.map(
                (value: order, index: number, array: order[]) => {
                    if (value[props.id] === current[props.id]) {
                        return response
                    }
                    return value
                }))
        } else {
            console.log("Update Failed")
        }
        // orderODO: IF Iorder FAILS NEED orderO REVERorder BACK orderO OLD orderEXorder
    }

    const onDelete = async (data: order) => {

        const response: order | null = await props.onDelete(data)

        if (response !== null) {
            setDataList(dataList.filter((value: order) => value[props.id] !== data[props.id]))
        }

    }

    const onLoadData = async () => {
        const response = await getOrdersByStore(storeData.storeId);
        if (response !== null) {
            console.log("Order data", response)
            setDataList(response);
        }
    }

    useEffect(() => {
        setStoreData(props.store)
    }, [props.store])

    useEffect(() => {
        console.log("reload load data")
        onLoadData()
    }, [isCreatingOrUpdating[0], isCreatingOrUpdating[1]])

    return (
        <div style={{ ...styles.card, ...props.style, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '1px', alignContent: 'center' }}>
                {props.title}
            </div>

            {/* Header */}
            {/* <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // margin: '5px'
            }}>
                {orderDataMap.map((dataMap: dataMapProps<order>,
                    index: number,
                    array: dataMapProps<order>[]) => {
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
            </div> */}

            {dataList.map((value: order, index: number, array: order[]) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <CardData<order>
                            key={value[props.id]}
                            value={value}
                            dataMap={orderDataMap}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            editingMode={false}
                            deleteOrRemove={'DELETE'}
                            saveOrAdd={'SAVE'}
                        />

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div
                                onDoubleClick={() => {
                                    setIsCreatingOrUpdating([false, true, value]);
                                }}
                            >
                                {value.orderItems?.map((value: orderItem) => {
                                    return (
                                        <CardData<orderItem>
                                            key={value["orderItemId"]}
                                            value={value}
                                            dataMap={orderItemDataMap}
                                            onDelete={() => { }}
                                            onUpdate={() => { }}
                                            editingMode={false}
                                            editable={false}
                                            deleteOrRemove={'DELETE'}
                                            saveOrAdd={'SAVE'}
                                        />
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                )
            })}


            {!isCreatingOrUpdating[0] && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ borderRadius: '5px', marginTop: 5, marginRight: 5 }}>
                    <button style={styles.button} onClick={() => { setIsCreatingOrUpdating([true, false, null]) }}>
                        <AddIcon style={{ fontSize: 22 }} />
                    </button>
                </div>
            </div>}

            {(isCreatingOrUpdating[0] || isCreatingOrUpdating[1]) &&

                <OrderModelSelect<order, orderItem, product>

                    title={"Order"}
                    store={storeData}
                    functionType={isCreatingOrUpdating[1] ? 'UPDATING' : 'CREATING'}
                    show={true}
                    onClose={() => { setIsCreatingOrUpdating([false, false, null]); }}


                    parentId={'orderItemId'}
                    parentKey={'orderItems'}
                    dataList={[]}
                    defaultData={{
                        quantity: 1,
                        comments: "",
                        product: {
                            name: "",
                            active: true
                        },
                    }}
                    dataMapParent={orderItemDataMap}
                    getDataParent={() => {
                        if (isCreatingOrUpdating[1]) {
                            return isCreatingOrUpdating[2].orderItems as undefined as Promise<orderItem[]>
                        }
                        return [] as undefined as Promise<orderItem[]>
                    }}
                    onUpdateParent={
                        async (current: orderItem, updated: orderItem): Promise<orderItem | null> => {
                            if (current.orderItemId === undefined && isCreatingOrUpdating[1]) {
                                return await createOrderItem(updated, isCreatingOrUpdating[2].orderId)
                            }
                            return await updateOrderItem(updated, current.orderId)
                        }
                    }
                    onDeleteParent={async (data: orderItem) => { return await deleteOrderItem(data.orderItemId) }}

                    ancestorId={"orderId"}
                    defaultDataAncestor={{
                        shipTo: 'STORE',
                        orderState: 'PLACED',
                        storeId: storeData.storeId,
                        orderItems: [],
                    }
                    }
                    dataAncestor={
                        isCreatingOrUpdating[1] ?
                            {
                                ...isCreatingOrUpdating[2],
                                orderItems: []
                            }

                            : {
                                shipTo: 'STORE',
                                orderState: 'PLACED',
                                storeId: storeData.storeId,
                                orderItems: [],
                            }}
                    dataMapAncestor={orderDataMap}
                    onUpdateAncestor={async (current: order, updated: order) => {
                        return await updateOrder(updated, current.orderId)
                    }}
                    onCreateAncestor={(data: order) => {
                        return onCreate(data)
                    }}


                    childKey="product"

                    childTitle="Parts"
                    childId="productId"
                    defaultDataChild={{ name: "", active: true }}
                    getDataChild={(): Promise<product[] | null> => {
                        return getProducts();
                    }}
                    dataMapChild={[
                        {
                            type: 'INPUT',
                            displayName: 'name',
                            valueFn: (data: product) => { return data['name']; },
                            maxLength: 128,
                            onUpdate: (value: string, currentData: product, updatedData) => {
                                return { name: value };
                            },
                            validate: function (data: product): boolean {
                                return true
                            }
                        },
                    ]}
                    onCreateChild={(data: product) => {
                        return createProduct(data)
                    }}
                />

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

export default OrderCard;