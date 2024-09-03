import React from 'react';
import { useParams } from 'react-router-dom';

export type storeType = "SPIRIT" | "SPENCER";

export type store = {
    //  Primary Key
    store_id: number,
    store_type: storeType,
    address: string,
    city: string,
    state: string,
    zip: string,
    year: string,
    store_number: string,
    previous_store_id: number,
    // alarmCodesList: [AlarmCodes!]!
    // //  parts that are requested
    // rmOrdersList: [RmOrders!]!
    // //  dsm's to their stores
    // dsmStoresList: [DsmStores!]!
    // //  alarm panel data
    // alarmPanelsList: [AlarmPanels!]!
  }

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
    let { store_number } = useParams();


    return (
        <div>
            <h1> 
                {store_number}
            </h1>
        </div>
    )
}

export {StoreRow, Store};