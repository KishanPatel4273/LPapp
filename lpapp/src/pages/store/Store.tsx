import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { store } from '../../api';
import AddressCard from '../components/AddressCard';


type props = {
    store : store,
}

const StoreRow = (props : props) => {
    return (
        <tr>
            <td style={cellStyle}>{props.store.store_id}</td>
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
       
            {storeData != null ? <AddressCard 
                    address={storeData.address}
                    state={storeData.state}
                    zip={storeData.zip}
                    />      
                    : <></> }
        </div>
    )
}

export {StoreRow, Store};