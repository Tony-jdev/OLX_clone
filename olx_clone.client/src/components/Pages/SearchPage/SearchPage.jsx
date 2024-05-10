import React, {useEffect} from 'react';
import {Container, Grid} from '@mui/material';
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import Carousel from '@/components/Tools/Carousel/Carousel.jsx';
import PagePointer from "@/components/Tools/PagePointer/PagePointer.jsx";
import TopFilters from "@/components/Tools/TopFilters/TopFilters.jsx";
import SideFilters from "@/components/Tools/SideFilters/SideFilters.jsx";
import SubCategoryList from "@/components/Tools/SubCategoryList/SubCategoryList.jsx";
import {ContainerStyle} from "@/components/Pages/SearchPage/Styles.js";
import {useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostsAsync, selectError, selectLoading, selectPosts} from "@/Storage/Redux/Slices/postSlice.js";

function SearchPage() {
    let { category, subCategory } = useParams();
    const way = ['search', category ?? null, subCategory ?? null];

    const items = [
            "@/../public/Ads/Ads0.png",
            "@/../public/Ads/Ads1.png",
            "@/../public/Ads/Ads2.png"
    ];

    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(  () => {
        dispatch(fetchPostsAsync());
    }, [dispatch]);
    
    return (
        <>
            <Container style={{...ContainerStyle, marginTop: 10, marginBottom: 10}} >
                <PagePointer way={way}/>
            </Container>
            <Carousel items={items} isOnlyImg={true}/>
            <Container style={ContainerStyle} >
                <TopFilters/>
                <SubCategoryList/>
                <Grid container direction='row' justifyContent='space-between' style={{flexWrap: 'nowrap'}}>
                    <SideFilters/>
                    <ProductList posts={posts} error={error} loading={loading} isShort={true}/>
                </Grid>
            </Container>
        </>
    );
}

export default SearchPage;
