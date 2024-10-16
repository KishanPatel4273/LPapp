
import ClearIcon from '@mui/icons-material/Clear';

type props = {
    onClick : () => void
    color? : string
    style? : {}
}

const DeleteButton = ({ onClick, color='red', style } : props) => {

    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',   // Center the icon horizontally
                alignItems: 'center',       // Center the icon vertically
                width: '30px',              // Set width (smaller size)
                height: '30px',             // Set height (should be equal to width for a circle)
                borderRadius: '50%',        // Make the button circular
                border: 'none',             // Remove the border (optional)
                backgroundColor: 'transparent',    // Background color (optional)
                cursor: 'pointer',          // Change the cursor on hover
                ...style
            }}
            onClick={onClick}
        >
            <ClearIcon style={{ color: color }} />
        </button>
    )

}

export default DeleteButton;