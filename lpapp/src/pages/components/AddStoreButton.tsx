import AddCircleIcon from '@mui/icons-material/AddCircle';

type props = {
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
                    borderRadius:'100',
                    background:"none",
                    border:"none",
                }}
            >
                <AddCircleIcon />
            </button>
        </div>
    )
}

export default AddStoreButton