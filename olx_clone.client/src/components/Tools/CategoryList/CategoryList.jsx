import React from 'react';
import {Container, Grid, Typography} from '@mui/material';
import Category from '../Category/Category.jsx'; 

const categoriesData = [ // Дані для категорій
    {
        id: 1,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 1',
        link: '/category1'
    },
    {
        id: 2,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 2',
        link: '/category2'
    },
    {
        id: 3,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 3',
        link: '/category1'
    },
    {
        id: 4,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 4',
        link: '/category2'
    },
    {
        id: 5,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 5',
        link: '/category1'
    },
    {
        id: 6,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 6',
        link: '/category2'
    },
    {
        id: 7,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 7',
        link: '/category1'
    },
    {
        id: 8,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 8',
        link: '/category2'
    },
    {
        id: 9,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 9',
        link: '/category1'
    },
    {
        id: 10,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 10',
        link: '/category2'
    },
    {
        id: 11,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 11',
        link: '/category1'
    },
    {
        id: 12,
        imageUrl: '../../../public/category.jpeg',
        name: 'Category 12',
        link: '/category2'
    }
];

const CategoryList = () => {
    return (
        <Grid container justifyContent="center" style={{margin:0, width:'100%'}}>
            <Typography variant="h4" textAlign="center" width="100%" marginTop={5}>
                Список категорій
            </Typography>
            <Grid container spacing={2} maxWidth="1440" style={{marginTop:20, marginBottom:50, marginLeft:0}}>
                {categoriesData.map(category => (
                    <Grid item key={category.id}>
                        <Category
                            imageUrl={category.imageUrl}
                            name={category.name}
                            link={category.link}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default CategoryList;
