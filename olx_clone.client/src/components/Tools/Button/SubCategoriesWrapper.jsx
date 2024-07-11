import React, { useState, useEffect, useRef } from 'react';
import {Box, Container, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {GetCategories, getCategoryById} from "@/Api/categoryApi.js";

const SubCategoriesWrapper = ({ children, categoryId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const theme = useTheme();
    const { colors } = theme.palette;
    const wrapperRef = useRef(null);

    const getChildCategoriesByParentId = (data, parentId) => {
        const parentCategory = data.find(category => category.id === parentId);
        if (parentCategory && parentCategory.childCategories) {
            return parentCategory.childCategories;
        } else {
            throw new Error('No child categories found');
        }
    };
    const fetchSubCategories = async (categoryId) => {
        const subCategs = await GetCategories();
        const children = getChildCategoriesByParentId(subCategs.data, categoryId);
        console.log(children);
        setSubCategories(children);
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
                            {subCategory.title}
                        </Typography>
                    ))}
                </Container>
            </Box>
        </div>
    );
};

export default SubCategoriesWrapper;
