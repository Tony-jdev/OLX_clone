import React, { useState, useRef, useEffect } from 'react';

const SquareAndTextWrapper = ({ children, squareIcon, squareColor, textColor, isHovered }) => {
    const [textWidth, setTextWidth] = useState(0);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, [children]);

    return (
        <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', height: '24px', paddingBottom: '4px' }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: isHovered ? `${textWidth - 18}px` : '0',
                    transform: 'translateY(-50%)',
                    transition: 'left 0.7s',
                    color: squareColor
                }}
            >
                {squareIcon}
            </div>
            <div ref={textRef} style={{ display: 'inline-block',
                whiteSpace: 'nowrap',
                transform: isHovered ? `translateX(-16px)` : 'translateX(0)',
                transition: 'transform 1s' }}>
                {React.cloneElement(children, { Color: textColor })}
            </div>
        </div>
    );
};

export default SquareAndTextWrapper;
