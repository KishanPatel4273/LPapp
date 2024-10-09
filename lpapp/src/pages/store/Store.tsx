import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { store } from '../../api';
import AddressCard from '../components/AddressCard';
import AlarmCodeCard from '../components/AlarmCodesCard';
import { fakeAlarmCodeData } from '../../api/AlarmAPI';
import { getStore, getStores } from '../../api/StoreAPI';


type props = {
    store : store,
}

const StoreRow = (props : props) => {
    return (
        <tr>
            <td style={cellStyle}>{props.store.storeId}</td>
            <td style={cellStyle}>{props.store.storeType}</td>
            <td style={cellStyle}>{props.store.address}</td>
            <td style={cellStyle}>{props.store.city}</td>
            <td style={cellStyle}>{props.store.state}</td>
            <td style={cellStyle}>{props.store.zip}</td>
            <td style={cellStyle}>{props.store.year}</td>
            <td style={cellStyle}>{props.store.storeNumber}</td>
            <td style={cellStyle}>{props.store.previousStoreId}</td>
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
        console.log("store d", location.state.store_id, storeData)
        //@TODO store_id is null
        const loadStore = async () => {
            const store  = await getStore(location.state.store_id);
    
            if (store) {
                console.log("store got data from api")
                setStoreData(store)
            }
        }

    }, [location.state])

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
                {storeData ? storeData.storeNumber + " " + storeData.storeId : ''}
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>


                {storeData != null ? <AddressCard 
                    address={storeData.address} state={storeData.state} zip={storeData.zip}/> : <></>
                }

                <AlarmCodeCard 
                    alarmCodes={fakeAlarmCodeData} 
                    onCreate={() => {}}
                    onUpdate={(id) => {}}
                    store={storeData}
                />
            </div>
        </div>
    )
}

export {StoreRow, Store};