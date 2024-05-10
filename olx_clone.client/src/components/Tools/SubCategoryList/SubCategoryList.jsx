import React from 'react';
import { Box, Typography, Link, Chip } from '@mui/material';

const subCategories = [
    { name: 'Підкатегорія 1', count: 24, link: '/subcategory-1' },
    { name: 'Підкатегорія 2', count: 50, link: '/subcategory-2' },
    { name: 'Підкатегорія 3', count: 12, link: '/subcategory-3' },
    { name: 'Підкатегорія 4', count: 37, link: '/subcategory-4' },
    { name: 'Підкатегорія 5', count: 63, link: '/subcategory-5' },
    { name: 'Підкатегорія 1', count: 24, link: '/subcategory-1' },
    { name: 'Підкатегорія 2', count: 50, link: '/subcategory-2' },
    { name: 'Підкатегорія 3', count: 12, link: '/subcategory-3' },
    { name: 'Підкатегорія 4', count: 37, link: '/subcategory-4' },
    { name: 'Підкатегорія 5', count: 63, link: '/subcategory-5' },
    { name: 'Підкатегорія 1', count: 24, link: '/subcategory-1' },
    { name: 'Підкатегорія 2', count: 50, link: '/subcategory-2' },
    { name: 'Підкатегорія 3', count: 12, link: '/subcategory-3' },
    { name: 'Підкатегорія 4', count: 37, link: '/subcategory-4' },
    { name: 'Підкатегорія 5', count: 63, link: '/subcategory-5' },
];

const SubCategoryList = () => {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>Підкатегорії:</Typography>
            {subCategories.length > 0 && subCategories.map((subCategory, index) => (
                <Chip
                    key={index}
                    label={`${subCategory.name} (${subCategory.count})`}
                    component={Link}
                    href={subCategory.link}
                    clickable
                    sx={{ mr: 1, mb: 1 }}
                />
            ))}
        </Box>
    );
};

export default SubCategoryList;
