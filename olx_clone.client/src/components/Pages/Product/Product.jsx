import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductInfo from "@/components/Tools/ProductInfo/ProductInfo.jsx";
import SellerInfo from "@/components/Tools/SellerInfo/SellerInfo.jsx";
import LocationInfo from "@/components/Tools/LocationInfo/LocationInfo.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx"; 
import {Container} from "@mui/material";
import {ContainerStyle} from "@/components/Pages/Product/Styles.js";
import {fetchPostById} from "@/Storage/Redux/Slices/postInfoSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const ProductPage = () => {
    const { Id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);
    const navigate = useNavigate();

    
    
    useEffect(() => {
        console.log("Start");
        dispatch(fetchPostById(Id)); 
        console.log(product);
    }, [dispatch, Id]);

    const handleChat = () => {
        // Обробник для кнопки чату
        // Реалізація чату з продавцем
    };
    
    if (product === null) {
        return <Container>
            
            no such Product Found!
            
            <SButton
            type="whiteOutlined"
            text="Go back"
            action={()=>{ navigate(-1) }}
        /></Container>
    }
    else console.log(product);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <Container style={ContainerStyle}>
            <ProductInfo product={'product'} />
            <SellerInfo seller={'product'} />
            <LocationInfo location={'product'} />
            <SButton
                type="contained"
                text={<FormattedMessage id="productPage.chatWithSeller" />} 
                action={handleChat}
            />
            <SButton
                type="outlined"
                text={<FormattedMessage id="productPage.goBack" />} 
                action={() => navigate(-1)} 
            />
        </Container>
    );
};

export default ProductPage;
