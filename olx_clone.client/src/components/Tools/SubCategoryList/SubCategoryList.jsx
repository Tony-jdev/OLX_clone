import React, { useEffect } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategoriesAsync, selectCategorySku, selectSubCategories, selectSubCategorySku } from "@/Storage/Redux/Slices/postSlice.js";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const SubCategoryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector(selectCategorySku);
    const subCategory = useSelector(selectSubCategorySku);
    const subCategories = useSelector(selectSubCategories);

    useEffect(() => {
        console.log(category + " - " + subCategory);
        dispatch(fetchSubCategoriesAsync());
    }, [dispatch, category]);

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>
                <FormattedMessage id="subCategoryList.subCategories" />:
            </Typography>
            {subCategories.length > 0 && subCategories.map((subCategory, index) => (
                <Chip
                    key={index}
                    label={`${subCategory.title}`}
                    component={Button}
                    onClick={() => {
                        navigate('./' + subCategory.sku);
                    }}
                    clickable
                    sx={{ mr: 1, mb: 1 }}
                />
            ))}
        </Box>
    );
};

export default SubCategoryList;
