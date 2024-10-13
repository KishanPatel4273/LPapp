import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { alarmCode, store } from '../../api';
import AddressCard from '../components/AddressCard';
import { getStore, getStores } from '../../api/StoreAPI';
import Card from '../components/card/Card';

import { createAlarmCode, deleteAlarmCode, updateAlarmCode } from '../../api/AlarmAPI';
import { clearFormattingPhoneNumber, formatPhoneNumber } from '../../utils';


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

    useEffect(() => {

        // if (location.state != null) {
        //     setStoreData(location.state)
        //     // console.log("loc", location.state)
        // }
        // console.log("store d", location.state.store_id, storeData)
        //@TODO 
        const loadStore = async () => {
            const store = await getStore(location.state.storeNumber, year);

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
                {storeData ? storeData.storeNumber : 'ERROR'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>


                {storeData != null && <AddressCard
                    address={storeData.address} state={storeData.state} zip={storeData.zip} />
                }

                {storeData && <Card<alarmCode>
                    title={'Alarm Codes'}
                    id={"alarmCodeId"}

                    dataList={storeData ? storeData.alarmCodes : []}
                    defualtData={{
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
                            displayName: 'code',
                            valueFn: (data: alarmCode) => {return data['code']},
                            onUpdate: (value: string, currentData: alarmCode, updatedData) => {
                                return {code: value }
                            },
                        },
                        {
                            displayName: '',
                            valueFn: (data: alarmCode) => { return data.firstName + " " + data.lastName },
                            onUpdate: (value: string, currentData: alarmCode, updatedData) => {
                                const vt = value.trim()
                                const vl = vt.split(" ")
                                if (vl.length <= 1) {
                                    return { ...updatedData, firstName: vl[0] }
                                } else if (vl.length >= 2) {
                                    console.log("saved name")
                                    return { ...updatedData, firstName: vl[0], lastName: vl[1] }
                                }
                            },
                            styleInput:{marginLeft: 10, marginRight: 10, maxWidth: 150 },
                        },
                        {
                            displayName: '',
                            valueFn: (data: alarmCode) => {return formatPhoneNumber(data['phoneNumber'])},

                            onUpdate: (value: string, currentData: alarmCode, updatedData: alarmCode) => {
                                return {...updatedData, phoneNumber:clearFormattingPhoneNumber(value)}
                            }
                        },
                    ]}
                    store={storeData}

                    onCreate={(data : alarmCode) => {
                        return createAlarmCode(data, storeData.storeId)
                    }}
                    onUpdate={(current : alarmCode, updated : alarmCode) => {
                        return updateAlarmCode(updated, current.alarmCodeId)
                    }}
                    onDelete={(data : alarmCode) => {
                        if(data?.alarmCodeId) {
                            return deleteAlarmCode(data['alarmCodeId'])
                        }
                        return null
                    }}

                />}

            </div>
        </div>
    )
}

export { Store };