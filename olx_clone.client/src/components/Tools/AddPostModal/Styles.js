export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '350px',
    maxWidth: '1000px',
    width: '80%',
    p: 4,
    borderRadius: '20px',
};

export const imageContainerStyle = {
    display: 'flex',
    gap: '10px',
    margin: '10px 0',
};

export const imageBoxStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    position: 'relative',
    cursor: 'pointer',
    '&:hover img': {
        filter: 'grayscale(100%) sepia(100%) hue-rotate(-50deg)',
    },
};

export const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

export const fileInputStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
};

export const addImageBoxStyle = {
    fontSize: '34px',
};

export const radioGroupStyle = {
    margin: '10px 0',
};