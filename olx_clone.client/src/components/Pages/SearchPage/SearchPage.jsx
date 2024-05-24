import React, {useEffect, useState} from 'react';
import {Container, Grid, Pagination} from '@mui/material';
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
import {
    fetchPostsAsync,
    selectError,
    selectLoading, selectOrderBy, selectPage, selectPageCount, selectPageSize,
    selectPosts,
    selectSearchText, setPage
} from "@/Storage/Redux/Slices/postSlice.js";

function SearchPage() {
    let { category, subCategory } = useParams();
    const way = ['search', category ?? null, subCategory ?? null];

    const items = [
            "@/../public/Ads/Ads0.png",
            "@/../public/Ads/Ads1.png",
            "@/../public/Ads/Ads2.png"
    ];

    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const posts = useSelector(selectPosts);
    const orderBy = useSelector(selectOrderBy);
    const page = useSelector(selectPage);
    const pageSize = useSelector(selectPageSize);
    const pageCount = useSelector(selectPageCount);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [count, setCount] = useState(1);

    useEffect(  () => {
        dispatch(fetchPostsAsync());
        setCount(parseInt(Math.ceil(pageCount / pageSize)));
    }, [dispatch, orderBy, page]);
    
    const handleChange = (event, value) => {
        dispatch(setPage(value));
    };
    
    return (
        <>
            <Container style={{...ContainerStyle, marginTop: 10, marginBottom: 10}} >
                <PagePointer way={way}/>
            </Container>
            <Carousel items={items} isOnlyImg={true} isWide={true}/>
            <Container style={ContainerStyle}>
                <TopFilters/>
                <SubCategoryList/>
                <Grid container direction='row' justifyContent='space-between' style={{flexWrap: 'nowrap'}}>
                    <SideFilters/>
                    <Grid container justifyContent='center' marginLeft={2}>
                        <ProductList posts={posts} error={error} loading={loading} isShort={true}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Pagination count={count} size="large" page={page} onChange={handleChange} 
                                sx={{
                                    marginTop: 6, 
                                    '& .Mui-selected': {
                                        color: 'white', 
                                        backgroundColor: 'orange !important', 
                                        '&:focus': {
                                            outline: 'none'
                                        } 
                                    },
                                    '& .MuiPaginationItem-icon': {
                                        '&:focus': {
                                            outline: 'none'
                                        }
                                    }
                                }} />
                </Grid>
            </Container>
        </>
    );
}

export default SearchPage;
