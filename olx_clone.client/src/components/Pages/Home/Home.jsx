import React from 'react';
import { Container } from '@mui/material';
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import CategoryList from "@/components/Tools/CategoryList/CategoryList.jsx";
import SearchComponent from "@/components/Tools/SearchComponent/SearchComponent.jsx";
import "./Home.css";

function HomePage() {
    return (
        <div className='div-full-width'>
            <Container>
                <SearchComponent/>
            </Container>
            <CategoryList/>
            <Container>
                <ProductList/>
            </Container>
        </div>
    );
}

export default HomePage;
