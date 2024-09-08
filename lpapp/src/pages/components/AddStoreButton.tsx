import AddCircleIcon from '@mui/icons-material/AddCircle';

type props = {
    storeType:string,
    setStoreType: (string) => void,
    onClick: () => void,
}

const AddStoreButton = (props : props) => {
    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '4px', alignItems: 'center' }}>
            <button
                color="secondary"
                onClick={props.onClick}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100',
                    background: "none",
                    border: "none",
                    paddingLeft:'1rem',
                }}
            >
                <AddCircleIcon />
            </button>
            <select
              value={props.storeType} 
              onChange={(e) => props.setStoreType(e.target.value)}
              style={{ padding: '', border:0, appearance:"none"}}
            >
                <option> SPIRIT </option>
                <option> SPENCER </option>
            </select>
        </div>
    )
}

export default AddStoreButton