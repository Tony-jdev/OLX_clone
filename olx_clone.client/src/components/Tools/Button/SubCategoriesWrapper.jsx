import React, { useState, useEffect, useRef } from 'react';
import {Box, Container, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SubCategoriesWrapper = ({ children, categoryId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const theme = useTheme();
    const { colors } = theme.palette;
    const wrapperRef = useRef(null);

    const fetchSubCategories = async (categoryId) => {
        // Реалізація виклику вашого API для отримання підкатегорій
        // Наприклад:
        // const response = await fetch(`/api/subcategories?categoryId=${categoryId}`);
        // const data = await response.json();
        // setSubCategories(data);

        // Тимчасово повертаємо статичний список для прикладу
        setSubCategories([
            { id: 1, name: 'Підкатегорія 1' },
            { id: 2, name: 'Підкатегорія 2' },
            { id: 3, name: 'Підкатегорія 3' }
        ]);
    };

    useEffect(() => {
        if (isHovered) {
            fetchSubCategories(categoryId);
        }
    }, [isHovered, categoryId]);

    const calculateTransform = () => {
        if (wrapperRef.current) {
            const wrapperRect = wrapperRef.current.getBoundingClientRect();
            const leftPosition = wrapperRect.left;

            return `translateX(calc(-${leftPosition}px))`;
        }
        return 'translateX(0)';
    };

    const calculateWidth = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        return `calc(100vw - ${scrollBarWidth}px + 0.2px)`;
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             ref={wrapperRef}
        >
            {React.cloneElement(children, { isHovered })}
            <Box
                sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    transform: calculateTransform(),
                    backgroundColor: colors.background.primary,
                    boxShadow: colors.types.shadows.boxShadowWarning,
                    zIndex: 1000,
                    width: calculateWidth(),
                    padding: isHovered ? '10px' : '0',
                    display: 'flex',
                    justifyContent: 'center',
                    transition: 'height 0.5s ease-in-out, padding 0.5s ease-in-out',
                    height: isHovered ? '300px' : '0',
                    overflow: 'hidden',
                    pointerEvents: isHovered ? 'auto' : 'none'
                }}
            >
                <Container
                    style={{
                        maxWidth: 1440,
                        padding: 0,
                    }}
                >
                    {subCategories.map(subCategory => (
                        <Typography key={subCategory.id} sx={{ padding: '5px 0', color: colors.text.primary }}>
                            {subCategory.name}
                        </Typography>
                    ))}
                </Container>
            </Box>
        </div>
    );
};

export default SubCategoriesWrapper;
