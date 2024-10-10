import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { store } from '../../api';
import AddressCard from '../components/AddressCard';
import AlarmCodeCard from '../components/AlarmCodesCard';
import { getStore, getStores } from '../../api/StoreAPI';


type props = {
    store : store,
}

const cellStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
};

const Store = ({year} : {year : string}) => {
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
            const store  = await getStore(location.state.storeNumber, year);
    
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
                fontSize:34,
                fontWeight: 'bold', 
                flexDirection:'row',
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center', // Centers content vertically
                textAlign: 'center',
            }}>
                {storeData ? storeData.storeNumber : 'ERROR'}
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>


                {storeData != null && <AddressCard 
                    address={storeData.address} state={storeData.state} zip={storeData.zip}/>
                }

                {storeData && 
                    <AlarmCodeCard 
                        alarmCodes={storeData.alarmCodes} 
                        onCreate={() => {}}
                        onUpdate={(id) => {}}
                        store={storeData}
                    />
                }
            </div>
        </div>
    )
}

export {Store};