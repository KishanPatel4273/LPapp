
import AddIcon from '@mui/icons-material/Add';

type props = {
    onClick: () => void
    color? : string
    style?: {}
}

const AddButton = ({ onClick, color='green', style }: props) => {

    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',   // Center the icon horizontally
                alignItems: 'center',       // Center the icon vertically
                width: '30px',              // Set width (smaller size)
                height: '30px',             // Set height (should be equal to width for a circle)
                borderRadius: '50%',        // Make the button circular
                border: 'none',
                backgroundColor: 'transparent',    // Background color (optional)
                cursor: 'pointer',           // Change the cursor on hover
                ...style
            }}
            onClick={onClick}
        >
            <AddIcon style={{ color: color }} />
        </button>
    )

}

export default AddButton;