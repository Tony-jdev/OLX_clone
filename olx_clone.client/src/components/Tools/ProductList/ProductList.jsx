import React from 'react';
import {Grid, Typography} from '@mui/material';
import ShortProduct from '../ShortProduct/ShortProduct.jsx';
import ContainerHeader from "@/components/Tools/ContainerHeader/ContainerHeader.jsx";
import {GridStyle} from "@/components/Tools/ProductList/Styles.js";


const ProductList = ({loading, error, posts, headerText, headerBtn, isShort}) => {
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <Grid container style={{ width: '80%', }}>
            {headerBtn != null && headerText != null && <ContainerHeader text={headerText} btn={headerBtn}/>}
            <Grid container style={GridStyle} spacing={1}>
                {posts.length > 0 ? posts.map(product => (
                    <Grid item key={product.id} style={{width: 'fit-content'}} xs={6} sm={4} md={3} lg={isShort ? 3 : 2.4} >
                        <ShortProduct
                            id = {product.id}
                            photo={product.photoUrl}
                            name={product.title}
                            price={product.price}
                            publicationDate={product.publicationDate}
                            condition={product.status}
                            city={product.city}
                        />
                    </Grid>
                )) :  <Typography>No Posts!...</Typography>}
            </Grid>
        </Grid>
    );
};

export default ProductList;
