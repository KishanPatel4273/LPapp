import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { alarmCode, alarmPanel, createAlarmPanel, deleteAlarmPanel, deleteOrder, order, store, updateAlarmPanel, updateOrder } from '../../api';
import AddressCard from '../components/AddressCard';
import { getStore, getStores } from '../../api/StoreAPI';
import Card from '../components/card/Card';

import { createAlarmCode, deleteAlarmCode, updateAlarmCode } from '../../api';
import { clearFormattingPhoneNumber, formatPhoneNumber, isNumeric, pad } from '../../utils';
import { addStoreToAlarmPanel, getAlarmPanels, removeStoreToAlarmPanel } from '../../api/AlarmPanelAPI';
import OrderCard from '../components/order/OrderCard';


type props = {
    store: store,
}

const cellStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
};

const Store = ({ year }: { year: string }) => {
    const location = useLocation();
    const [storeData, setStoreData] = useState<store | null>();

    const { store_number } = useParams<{ store_number: string }>();

    useEffect(() => {

        if (storeData === null) {
            const store: store = {
                storeType: "SPIRIT",
                address: "",
                city: "",
                state: "",
                zip: "",
                year: year,
                storeNumber: store_number,
                latitude: 0,
                longitude: 0,
                total_square_foot: 0,
                poss_date: undefined,
                create_date: undefined,
                allows_early_drop: false,
                live_load: false,
                extended_stay: false,
                stay_length: undefined,
                alarmCodes: [],
                alarmPanels: [],
            }
            setStoreData(store)
        }


        // if (location.state != null) {
        //     setStoreData(location.state)
        //     // console.log("loc", location.state)
        // }
        // console.log("store d", location.state.store_id, storeData)
        //@TODO 

        const loadStore = async () => {
            const store = await getStore(store_number, year);

            if (store) {
                console.log("store got data from api")
                setStoreData(store)
            }
        }

        loadStore()

    }, [location.state])

    return (
        <div>
            <div style={{
                flex: 1,
                fontSize: 34,
                fontWeight: 'bold',
                flexDirection: 'row',
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center', // Centers content vertically
                textAlign: 'center',
            }}>
                {storeData ? storeData.storeType + " " + storeData.storeNumber : 'ERROR'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>


                {storeData != null && <AddressCard
                    address={storeData.address} state={storeData.state} zip={storeData.zip} />
                }

                {storeData && <Card<alarmCode>
                    title={'Alarm Codes'}
                    id={"alarmCodeId"}
                    dataList={storeData ? storeData.alarmCodes : []}
                    createMode='many-one-add'
                    defaultData={{
                        firstName: '',
                        lastName: '',
                        code: '',
                        phoneNumber: '',
                        position: 'ASM',
                        active: true,
                        dateCreated: '',
                        storeId: storeData.storeId
                    }}
                    dataMap={[
                        {
                            type: 'INPUT',
                            displayName: 'code',
                            valueFn: (data: alarmCode) => { return data['code']; },
                            maxLength: 4,
                            onUpdate: (value: string, currentData: alarmCode, updatedData) => {
                                return { code: pad(value, 4) };
                            },
                            validate: function (data: alarmCode): boolean {
                                return isNumeric(data.code);
                            }
                        },
                        {
                            type: 'INPUT',
                            displayName: 'name',
                            valueFn: (data: alarmCode) => { return data.firstName + " " + data.lastName; },
                            maxLength: 128,
                            onUpdate: (value: string, currentData: alarmCode, updatedData) => {

                                const vt = value.trim();
                                const vl = vt.split(" ");
                                if (vl.length <= 1) {
                                    return { ...updatedData, firstName: vl[0] };
                                } else if (vl.length >= 2) {
                                    console.log("saved name");
                                    return { ...updatedData, firstName: vl[0], lastName: vl[1] };
                                }
                            },
                            style: { marginLeft: 10, marginRight: 10, maxWidth: 150 },
                            validate: function (data: alarmCode): boolean {
                                return true;
                            }
                        },
                        {
                            type: 'INPUT',
                            displayName: 'phone number',
                            valueFn: (data: alarmCode) => { return formatPhoneNumber(pad(data['phoneNumber'], 10)); },
                            maxLength: 10,
                            onUpdate: (value: string, currentData: alarmCode, updatedData: alarmCode) => {
                                return { ...updatedData, phoneNumber: clearFormattingPhoneNumber(value) };
                            },
                            validate: function (data: alarmCode): boolean {
                                return isNumeric(data.code);
                            }
                        },
                    ]}
                    store={storeData}

                    onCreate={(data: alarmCode) => {
                        return createAlarmCode(data, storeData.storeId)
                    }}
                    onUpdate={(current: alarmCode, updated: alarmCode) => {
                        console.log("Update ALARM CODE")
                        return updateAlarmCode(updated, current.alarmCodeId)
                    }}
                    onDelete={(data: alarmCode) => {
                        if (data?.alarmCodeId) {
                            return deleteAlarmCode(data['alarmCodeId'])
                        }
                        return null
                    }}

                />}

                {storeData &&
                    <Card<alarmPanel>
                        title={'Panel'}
                        id={'alarmPanelId'}
                        dataList={storeData.alarmPanels}
                        createMode='many-to-many-select-add'
                        defaultData={{
                            alarmPanelId: 0,
                            panelNumber: '',
                            alarmPanelType: 'ONSITE',
                            txid: '',
                            smartTechNumber: '',
                            imei: '',
                            iccid: '',
                            stores: []
                        }}
                        dataMap={[
                            {
                                type: 'DROPDOWN',
                                displayName: 'Type',
                                options: ['ONSITE', 'OFFSITE', 'OLD'],
                                valueFn: function (data: alarmPanel): string {
                                    return data.alarmPanelType
                                },
                                onUpdate: function (value: string, currentData: alarmPanel, updatedData: alarmPanel): {} {
                                    return { alarmPanelType: value }
                                }
                            },
                            {
                                type: 'INPUT',
                                displayName: 'panel',
                                maxLength: 4,
                                valueFn: function (data: alarmPanel): string {
                                    return pad(data.panelNumber, 4)
                                },
                                validate: function (data: alarmPanel): boolean {
                                    return isNumeric(data.panelNumber)
                                },
                                onUpdate: function (value: string, currentData: alarmPanel, updatedData: alarmPanel): {} {
                                    return { panelNumber: value }
                                }
                            },
                            {
                                type: 'INPUT',
                                displayName: 'SmartTech',
                                maxLength: 16,
                                valueFn: function (data: alarmPanel): string {
                                    return data.smartTechNumber
                                },
                                validate: function (data: alarmPanel): boolean {
                                    return true
                                },
                                onUpdate: function (value: string, currentData: alarmPanel, updatedData: alarmPanel): {} {
                                    return { smartTechNumber: value }
                                }
                            },
                            {
                                type: 'INPUT',
                                displayName: 'TXID',
                                maxLength: 8,
                                valueFn: function (data: alarmPanel): string {
                                    return data.txid
                                },
                                validate: function (data: alarmPanel): boolean {
                                    return true
                                },
                                onUpdate: function (value: string, currentData: alarmPanel, updatedData: alarmPanel): {} {
                                    return { txid: value }
                                }
                            },
                            {
                                type: 'INPUT',
                                displayName: 'IMEI',
                                maxLength: 15,
                                valueFn: function (data: alarmPanel): string {
                                    return data.imei
                                },
                                validate: function (data: alarmPanel): boolean {
                                    return true
                                },
                                onUpdate: function (value: string, currentData: alarmPanel, updatedData: alarmPanel): {} {
                                    return { imei: value }
                                }
                            },
                            {
                                type: 'INPUT',
                                displayName: 'ICCID',
                                maxLength: 20,
                                valueFn: function (data: alarmPanel): string {
                                    return data.iccid
                                },
                                validate: function (data: alarmPanel): boolean {
                                    return true
                                },
                                onUpdate: function (value: string, currentData: alarmPanel, updatedData: alarmPanel): {} {
                                    return { iccid: value }
                                }
                            },
                        ]}

                        onCreate={(data: alarmPanel): Promise<alarmPanel | null> => {
                            return createAlarmPanel(data, storeData.storeId)
                        }}
                        onUpdate={(current: alarmPanel, updated: alarmPanel): Promise<alarmPanel | null> => {
                            // throw Error("Unimplemented function")

                            return updateAlarmPanel(current.alarmPanelId, updated)
                        }}
                        onDelete={(data: alarmPanel): Promise<alarmPanel | null> => {
                            // throw Error("Unimplemented function")

                            console.log(data.alarmPanelId, storeData.storeId)
                            return removeStoreToAlarmPanel(data.alarmPanelId, storeData.storeId)
                        }}
                        store={storeData}

                        modalProps={{
                            title: "Panels",
                            getData: async () => {
                                return await getAlarmPanels()
                            },
                            onAdd: async (data: alarmPanel): Promise<alarmPanel | null> => {
                                return addStoreToAlarmPanel(data.alarmPanelId, storeData.storeId)
                            },
                        }}
                    />
                }
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {storeData &&
                    <OrderCard
                        title={'R&M'}
                        id={'orderId'}
                        defaultData={{
                            shipTo: 'DSM',
                            orderState: 'PLACED',
                            orderItems: []
                        }}
                        onUpdate={async (current: order, updated: order): Promise<order | null>  => {
                            return await updateOrder(updated, current.orderId)
                        }} onDelete={async (data: order): Promise<order | null> => {
                            return await deleteOrder(data.orderId)
                        }}
                        onCreate={function (data: order): Promise<order | null> {
                            throw new Error('Function not implemented.');
                        }}
                        store={storeData}
                    />
                }
            </div>
        </div>
    )
}

export { Store };