export const DefoultBtnStyle = {
    '&:focus': {outline: 'none'}
}
export const CarouselStyle={
    maxHeight: 600
}
export const IndicatorContainerStyle={
    position: 'absolute', 
    display: 'flex', 
    justifyContent:'space-around', 
    bottom: 20, 
    left: '50%', 
    transform: 'translateX(-50%)', 
    zIndex: 1,
    backgroundColor: '#adacac', 
    width: 120, 
    height: 24,
    borderRadius: 16
}
export const IndicatorIconButtonStyle= {
    fontSize:24, 
    zIndex: 2, 
    color: '#ffebcc'
}
export const activeIndicatorIconButtonStyle= {
    color: '#ff9d00'
}
export const PaperWideStyle= {
    border: 'none',
    maxWidth: '100%',
    maxHeight: 234,
    minHeight: 234,
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
export const PaperNormalStyle= {
    border: 'none',
    height: '50vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 50vh'
}
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
};