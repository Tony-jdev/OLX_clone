import React, {useEffect} from 'react';
import {Box, Typography, Link, Chip, Button} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPostsAsync, fetchSubCategoriesAsync,
    selectCategorySku, selectSubCategories, selectSubCategorySku,
    setCategorySku,
    setSubCategorySku
} from "@/Storage/Redux/Slices/postSlice.js";
import {useNavigate} from "react-router-dom";

const SubCategoryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector(selectCategorySku);
    const subCategory = useSelector(selectSubCategorySku);
    const subCategories = useSelector(selectSubCategories);

    useEffect(  () => {
        console.log(category+" - "+ subCategory);
        dispatch(fetchSubCategoriesAsync());
    }, [dispatch, category]);
    
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>Підкатегорії:</Typography>
            {subCategories.length > 0 && subCategories.map((subCategory, index) => (
                <Chip
                    key={index}
                    label={`${subCategory.title}`}
                    component={Button}
                    onClick={()=>{
                        navigate('./'+subCategory.sku);
                        //window.location.reload();
                    }}
                    clickable
                    sx={{ mr: 1, mb: 1 }}
                />
            ))}
        </Box>
    );
};

export default SubCategoryList;
