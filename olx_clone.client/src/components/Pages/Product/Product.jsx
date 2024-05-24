import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductInfo from "@/components/Tools/ProductInfo/ProductInfo.jsx";
import SellerInfo from "@/components/Tools/SellerInfo/SellerInfo.jsx";
import LocationInfo from "@/components/Tools/LocationInfo/LocationInfo.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx"; 
import {Container} from "@mui/material";
import {ContainerStyle} from "@/components/Pages/Product/Styles.js";
import {useNavigate, useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {
    fetchPostByIdAsync,
    selectError,
    selectLoading,
    selectSelectedPost,
    selectSelectedPostId, setSelectedPostId
} from "@/Storage/Redux/Slices/postSlice.js";

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const postId = useSelector(selectSelectedPostId);
    const post = useSelector(selectSelectedPost);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(setSelectedPostId(id));
        dispatch(fetchPostByIdAsync(id));
    }, [dispatch, id]);
    
    if (post === null) {
        return <Container>
            
            no such Product Found!
            
            <SButton
            type="whiteOutlined"
            text="Go back"
            action={()=>{ navigate(-1) }}
        /></Container>
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Container>

            Error: {error}

            <SButton
                type="whiteOutlined"
                text="Go back"
                action={()=>{ navigate(-1) }}
            /></Container>
    }


    return (
        <Container style={{marginTop: 60, marginBottom: 60}}>
            <ProductInfo post={post}/>
            <SellerInfo seller={'product'} />
            <LocationInfo location={'product'} />
            
            <Container style={{display: 'flex', padding: 0, justifyContent: 'space-between', marginTop: 50}}>
                <SButton
                    type="contained"
                    text={<FormattedMessage id="productPage.chatWithSeller" />}
                    action={()=>{}}
                />
                <SButton
                    type="outlined"
                    text={<FormattedMessage id="productPage.goBack" />}
                    action={() => navigate(-1)}
                />
            </Container>
        </Container>
    );
};

export default ProductPage;
