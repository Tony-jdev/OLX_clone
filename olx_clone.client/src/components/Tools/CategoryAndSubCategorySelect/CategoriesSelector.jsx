import React, { useEffect, useState } from 'react';
import { Box, Chip, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Text from '@/components/Tools/TextContainer/Text.jsx';
import { GetCategories } from "@/Api/categoryApi.js";
import { useTheme } from '@mui/material/styles';

const CategoriesSelector = ({ onCategorySelect, onSubCategorySelect, subCategory, category }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { colors } = theme.palette;

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category ?? null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory ?? null);

    const handleCategorySelect = (categoryId) => {
        if (selectedCategory !== categoryId) {
            setSelectedSubCategory(null);
            onSubCategorySelect(null);
        }
        setSelectedCategory(categoryId);
        if (onCategorySelect) {
            onCategorySelect(categoryId);
        }
    };

    const handleSubCategorySelect = (subCategoryId) => {
        setSelectedSubCategory(subCategoryId);
        if (onSubCategorySelect) {
            onSubCategorySelect(subCategoryId);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await GetCategories();
                setCategories(fetchedCategories.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.id === selectedCategory);
            if (category) {
                setSubCategories(category.childCategories);
            }
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory, categories]);
    
    useEffect(()=>{
        console.log("id1: "+ category+" id2: "+subCategory);
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="start">
            <Text type={'Body'} sr={{ margin: 1 }}>Категорія:</Text>
            <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
                {categories.length > 0 && categories.map((category, index) => (
                    <Chip
                        key={index}
                        label={`${category.title}`}
                        component={Button}
                        onClick={() => handleCategorySelect(category.id)}
                        clickable
                        sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: selectedCategory === category.id ? colors.types.success : '',
                            color: selectedCategory === category.id ? colors.text.primary : '',
                            "&:hover" : {backgroundColor: selectedCategory === category.id ? colors.types.success : '',}
                        }}
                    />
                ))}
            </Box>
            {selectedCategory && subCategories.length > 0 && (
                <>
                    <Text type={'Body'} sr={{ margin: 1 }}>Підкатегорія:</Text>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
                        {subCategories.length > 0 && subCategories.map((subCategory, index) => (
                            <Chip
                                key={index}
                                label={`${subCategory.title}`}
                                component={Button}
                                onClick={() => handleSubCategorySelect(subCategory.id)}
                                clickable
                                sx={{
                                    mr: 1,
                                    mb: 1,
                                    backgroundColor: selectedSubCategory === subCategory.id ? colors.types.success : '',
                                    color: selectedSubCategory === subCategory.id ? colors.text.primary : '',
                                    "&:hover" : {backgroundColor: selectedSubCategory === subCategory.id ? colors.types.success : '',}
                                }}
                            />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CategoriesSelector;
