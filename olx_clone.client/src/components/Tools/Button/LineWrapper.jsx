import React, { useState, useRef, useEffect } from 'react';

const UnderlineWrapper = ({ children, underlineColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const wrapperRef = useRef(null);

    const [childrenWidth, setChildrenWidth] = useState(0);

    useEffect(() => {
        if (wrapperRef.current) {
            setChildrenWidth(wrapperRef.current.offsetWidth);
        }
    }, [children]);

    return (
        <div style={{ 
            position: 'relative', 
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden', 
            height: '40px', marginTop: '10px', marginBottom: '10px',
            
        }}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             ref={wrapperRef}
        >
            {React.cloneElement(children, { isHovered })}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    height: '2px',
                    background: underlineColor,
                    transition: 'width 1s',
                    width: isHovered ? `${childrenWidth - 8}px` : '0',
                    top: 36
                }}
            ></div>
        </div>
    );
};

export default UnderlineWrapper;
