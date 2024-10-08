import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { store } from '../../api';
import AddressCard from '../components/AddressCard';
import AlarmCodeCard from '../components/AlarmCodesCard';
import { fakeAlarmCodeData } from '../../api/AlarmAPI';


type props = {
    store : store,
}

const StoreRow = (props : props) => {
    return (
        <tr>
            <td style={cellStyle}>{props.store.store_Id}</td>
            <td style={cellStyle}>{props.store.store_type}</td>
            <td style={cellStyle}>{props.store.address}</td>
            <td style={cellStyle}>{props.store.city}</td>
            <td style={cellStyle}>{props.store.state}</td>
            <td style={cellStyle}>{props.store.zip}</td>
            <td style={cellStyle}>{props.store.year}</td>
            <td style={cellStyle}>{props.store.store_number}</td>
            <td style={cellStyle}>{props.store.previous_store_id}</td>
        </tr>
  );
}

const cellStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
};

const Store = () => {
    const location = useLocation();
    const [storeData, setStoreData] = useState<store | null>(); 

    useEffect(() => {
        if (location.state != null) {
            setStoreData(location.state)
        }

    }, [])

    return (
        <div>
            <div style={{
                flex: 1, 
                fontSize:34,
                fontWeight: 'bold', 
                flexDirection:'row',
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center', // Centers content vertically
                textAlign: 'center',
            }}>
                {storeData ? storeData.store_number : ''}
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>


                {storeData != null ? <AddressCard 
                    address={storeData.address} state={storeData.state} zip={storeData.zip}/> : <></>
                }

                <AlarmCodeCard 
                    alarmCodes={fakeAlarmCodeData} 
                    onCreate={() => {}}
                    onUpdate={(id) => {}}
                />
            </div>
        </div>
    )
}

export {StoreRow, Store};