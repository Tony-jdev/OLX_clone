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
        <Grid container>
            {headerBtn != null && headerText != null && <ContainerHeader text={headerText} btn={headerBtn}/>}
            <Grid container style={GridStyle} spacing={3} direction='row'>
                {posts.length > 0 ? posts.map(product => (
                    <Grid item key={product.id} style={{width: 'fit-content'}}>
                        <ShortProduct
                            id = {product.sku}
                            photo={product.photoUrl}
                            name={product.title}
                            price={product.price}
                            publicationDate={product.createdAt}
                            condition={product.type}
                            city={product.city}
                        />
                    </Grid>
                )) :  <Typography>No Posts!...</Typography>}
            </Grid>
        </Grid>
    );
};

export default ProductList;
