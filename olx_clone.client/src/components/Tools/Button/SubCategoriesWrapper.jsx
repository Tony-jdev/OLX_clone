import React, { useState, useEffect, useRef } from 'react';
import {Box, Container, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {GetCategories, getCategoryById} from "@/Api/categoryApi.js";
import SButton from "@/components/Tools/Button/SButton.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {ArrowRight} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const SubCategoriesWrapper = ({ children, categoryId, Color }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const theme = useTheme();
    const { colors } = theme.palette;
    const wrapperRef = useRef(null);
    const [pcat, setpcat] = useState(null);
    const navigate = useNavigate();

    const getChildCategoriesByParentId = (data, parentId) => {
        const parentCategory = data.find(category => category.id === parentId);
        setpcat(parentCategory);
        console.log(parentCategory);
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
                    height: isHovered ? 'fit-content' : '0',
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
                        <SButton
                            key = {subCategory.id}
                            type={'transparentButton'}
                            text={subCategory.title}
                            Color={colors.text.primary}
                            sr={{maxWidth: '174px', width: '100%', justifyContent: 'space-between'}}
                            next={<Icon
                                icon={ArrowRight}
                                color={Color}
                                step={1}
                                width={18}
                                height={18}
                            />}
                            action={()=>{ navigate(`/search/${pcat.sku}/${subCategory.sku}`)}}
                        />
                    ))}
                </Container>
            </Box>
        </div>
    );
};

export default SubCategoriesWrapper;
