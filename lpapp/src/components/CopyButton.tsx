import React, { useEffect, useState } from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

type props = {
    data: string
    style?: {}
};

const CopyButton = ({ data, style }: props) => {

    return (
        <button
            style={{ ...styles.card, ...style }}
            onClick={() => { navigator.clipboard.writeText(data) }}
        >
            <ContentCopyRoundedIcon style={{ flex: 1 }} />
        </button>
    );
};

const styles = {
    card: {
        border: "none",
        borderRadius: '5px',
        backgroundColor: '#fdfdfd',
        padding: '5px 10px',
        cursor: 'pointer',
    },
}

export default CopyButton;
