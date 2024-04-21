import React from 'react';
import {Grid, Typography} from '@mui/material';
import ShortProduct from '../ShortProduct/ShortProduct.jsx'; // Передбачається, що компонент ShortProduct розміщено у відповідному файлі
const ProductList = () => {
    // Припустимі дані для кількох товарів
    const products = [
        {
            id: 1,
            photo: '../../../public/product.jpeg',
            name: 'Product 1',
            price: '$10',
            publicationDate: '2024-04-07',
            condition: 'New',
            city: 'City A'
        },
        {
            id: 2,
            photo: '../../../public/product.jpeg',
            name: 'Product 2',
            price: '$20',
            publicationDate: '2024-04-06',
            condition: 'Used',
            city: 'City B'
        },
        {
            id: 3,
            photo: '../../../public/product.jpeg',
            name: 'Product 1',
            price: '$10',
            publicationDate: '2024-04-07',
            condition: 'New',
            city: 'City A'
        },
        {
            id: 4,
            photo: '../../../public/product.jpeg',
            name: 'Product 2',
            price: '$20',
            publicationDate: '2024-04-06',
            condition: 'Used',
            city: 'City B'
        },
        {
            id: 5,
            photo: '../../../public/product.jpeg',
            name: 'Product 3',
            price: '$15',
            publicationDate: '2024-04-05',
            condition: 'New',
            city: 'City C'
        },
        {
            id: 6,
            photo: '../../../public/product.jpeg',
            name: 'Product 4',
            price: '$25',
            publicationDate: '2024-04-04',
            condition: 'Used',
            city: 'City D'
        },
        {
            id: 7,
            photo: '../../../public/product.jpeg',
            name: 'Product 5',
            price: '$12',
            publicationDate: '2024-04-03',
            condition: 'New',
            city: 'City E'
        },
    ];

    return (
        <Grid container>
            <Typography variant="h4" textAlign="center" width="100%" marginTop={5}>
                VIP товари
            </Typography>
            <Grid container spacing={1} marginTop={2} marginBottom={5}>
                {products.map(product => (
                    <Grid item key={product.id} xs={6} sm={6} md={3} lg={3}>
                        <ShortProduct
                            photo={product.photo}
                            name={product.name}
                            price={product.price}
                            publicationDate={product.publicationDate}
                            condition={product.condition}
                            city={product.city}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default ProductList;
