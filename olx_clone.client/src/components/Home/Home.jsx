import React from 'react';
import {Container} from '@mui/material';
import ProductList from "@/components/ProductList/ProductList.jsx";
import CategoryList from "@/components/CategoryList/CategoryList.jsx";
import SearchComponent from "@/components/SearchComponent/SearchComponent.jsx";
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
