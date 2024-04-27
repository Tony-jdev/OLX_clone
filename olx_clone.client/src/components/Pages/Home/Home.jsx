import React from 'react';
import { Container } from '@mui/material';
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import CategoryList from "@/components/Tools/CategoryList/CategoryList.jsx";
import Carousel from '@/components/Tools/Carousel/Carousel.jsx';
import CategoryMasonry from "@/components/Tools/CategoryMasonry/CategoryMasonry.jsx";

function HomePage() {
    return (
        <div className='div-full-width'>
            <Container style={{maxWidth: 1440, marginTop: 60, marginBottom: 60, padding: 0}}>
                <Carousel/>
                <CategoryMasonry/>
                <ProductList/>
            </Container>
        </div>
    );
}

export default HomePage;
