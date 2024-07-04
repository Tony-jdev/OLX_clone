import React, {useEffect} from 'react';
import {Grid, Typography} from '@mui/material';
import ShortProduct from '../ShortProduct/ShortProduct.jsx';
import ContainerHeader from "@/components/Tools/ContainerHeader/ContainerHeader.jsx";
import {GridStyle} from "@/components/Tools/ProductList/Styles.js";
import NoDataFound from "@/components/NoDataFound/NoDataFound.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, selectToken, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {selectError, selectLoading} from "@/Storage/Redux/Slices/userInfoSlice.js";
import OrangeProgress from "@/components/Tools/CentralProgress/OrangeProgress.jsx";


const ProductList = ({loading, error, posts, headerText, headerBtn, isShort, userId}) => {

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error ) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <Grid container>
            {( headerBtn != null || headerText != null ) && <ContainerHeader text={headerText} btn={headerBtn}/>}
            <Grid container style={GridStyle} spacing={2.5} direction='row'>
                {posts && posts.length > 0 ? posts.map(product => (
                    <Grid item key={product.id} style={{width: 'fit-content'}}>
                        <ShortProduct
                            id = {product.sku}
                            photo={product.photoUrl}
                            name={product.title}
                            price={product.price}
                            publicationDate={product.createdAt}
                            vip={product.isTop}
                            type={product.type}
                            city={product.city}
                            intId={product.id}
                        />
                    </Grid>
                )) :  <NoDataFound/>}
            </Grid>
        </Grid>
    );
};

export default ProductList;
