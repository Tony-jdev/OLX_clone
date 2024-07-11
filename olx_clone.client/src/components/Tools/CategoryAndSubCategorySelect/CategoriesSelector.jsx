import React, { useEffect, useState } from 'react';
import { Box, Chip, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Text from '@/components/Tools/TextContainer/Text.jsx';
import { GetCategories } from "@/Api/categoryApi.js";
import { FormattedMessage } from 'react-intl';

const CategoriesSelector = ({ onCategorySelect, onSubCategorySelect, subCategory, category }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);

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

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await GetCategories();
            setCategories(fetchedCategories.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.id === selectedCategory);
            if (category) {
                setSubCategories(category.childCategories);
            } else {
                setSubCategories([]);
            }
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        setSelectedCategory(category);
        setSelectedSubCategory(subCategory);
    }, [category, subCategory]);

    return (
        <Box display="flex" flexDirection="column" alignItems="start">
            <Text type={'Body'} sr={{ margin: 1 }}>
                <FormattedMessage id="categoriesSelector.category" />:
            </Text>
            <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
                {categories.length > 0 && categories.map((cat) => (
                    <Chip
                        key={cat.id}
                        label={cat.title}
                        component={Button}
                        onClick={() => handleCategorySelect(cat.id)}
                        clickable
                        sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: selectedCategory === cat.id ? colors.types.success : '',
                            color: selectedCategory === cat.id ? colors.text.primary : '',
                            "&:hover": {
                                backgroundColor: selectedCategory === cat.id ? colors.types.success : '',
                            }
                        }}
                    />
                ))}
            </Box>
            {selectedCategory && subCategories.length > 0 && (
                <>
                    <Text type={'Body'} sr={{ margin: 1 }}>
                        <FormattedMessage id="categoriesSelector.subCategory" />:
                    </Text>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
                        {subCategories.length > 0 && subCategories.map((subCat) => (
                            <Chip
                                key={subCat.id}
                                label={subCat.title}
                                component={Button}
                                onClick={() => handleSubCategorySelect(subCat.id)}
                                clickable
                                sx={{
                                    mr: 1,
                                    mb: 1,
                                    backgroundColor: selectedSubCategory === subCat.id ? colors.types.success : '',
                                    color: selectedSubCategory === subCat.id ? colors.text.primary : '',
                                    "&:hover": {
                                        backgroundColor: selectedSubCategory === subCat.id ? colors.types.success : '',
                                    }
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
