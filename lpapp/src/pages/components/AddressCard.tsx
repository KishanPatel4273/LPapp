import React, { useEffect, useState } from 'react';
import { CopyButton } from '../../components';

type props = {
    address: string, // address 
    state: string,
    zip: string
    style? : {}
};

const AddressCard = ({ address, state, zip, style }: props) => {

    return (
        <div style={{...styles.card, ...style, display:'inline-flex', flexDirection:'column'}}>
            <div style={{fontWeight:'bold', textAlign:'center', marginBottom:'1px'}}>
                Address
            </div>
            <div style={styles.row}>
                <div>{address},</div>
                <CopyButton data={address}/>
            </div>
            <div style={styles.row}>
                <div>{state},</div>
                <CopyButton data={state}/>
            </div>
            <div style={styles.row}>
                <div>{zip}</div>
                <CopyButton data={zip}/>
            </div>
        </div>
    );
};

// Inline styles for the postcard
const styles = {
    card: {
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding:'1rem',
        margin: '1rem',
        maxWidth: '200px',
        // maxHeight: '200px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1px',
    },
    label: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
};

export default AddressCard;
