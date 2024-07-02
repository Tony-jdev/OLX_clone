import React, {useEffect, useState} from 'react';
import {Container, Grid, Pagination} from '@mui/material';
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import Carousel from '@/components/Tools/Carousel/Carousel.jsx';
import PagePointer from "@/components/Tools/PagePointer/PagePointer.jsx";
import TopFilters from "@/components/Tools/TopFilters/TopFilters.jsx";
import SideFilters from "@/components/Tools/SideFilters/SideFilters.jsx";
import SubCategoryList from "@/components/Tools/SubCategoryList/SubCategoryList.jsx";
import {ContainerStyle} from "@/components/Pages/SearchPage/Styles.js";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPostsAsync, fetchPostsByCategoryAsync, selectCategorySku,
    selectError,
    selectLoading, selectLocation, selectOrderBy, selectPage, selectPageCount, selectPageSize,
    selectPosts,
    selectSearchText, selectSubCategorySku, setCategorySku, setPage, setSubCategorySku
} from "@/Storage/Redux/Slices/postSlice.js";

function SearchPage() {
    const navigate = useNavigate();
    let { category, subCategory } = useParams();
    const way = ['search', category ?? null, subCategory ?? null];

    const items = [
        "../../../../public/Ads/Ads0.png",
        "../../../../public/Ads/Ads1.png",
        "../../../../public/Ads/Ads2.png"
    ];

    const dispatch = useDispatch();
    const categorySku = useSelector(selectCategorySku);
    const subCategorySku = useSelector(selectSubCategorySku);
    const searchText = useSelector(selectSearchText);
    const posts = useSelector(selectPosts);
    const orderBy = useSelector(selectOrderBy);
    const location = useSelector(selectLocation);
    const page = useSelector(selectPage);
    const pageSize = useSelector(selectPageSize);
    const pageCount = useSelector(selectPageCount);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [count, setCount] = useState(1);

    useEffect(  () => {
        dispatch(setCategorySku(category));
        dispatch(setSubCategorySku(subCategory));
    }, [dispatch, category, subCategory, ]);
    
    useEffect(  () => {
        const last = subCategory ? subCategory : category ? category : null;
        if(last)
        {
            dispatch(fetchPostsByCategoryAsync())
        }
        else
        {
            dispatch(fetchPostsAsync());
        }
        window.scrollTo(0, 0);
    }, [dispatch, orderBy, page, category, subCategory, searchText, location]);
    
    useEffect(  () => {
        setCount(parseInt(Math.ceil(pageCount / pageSize)));
    }, [dispatch, page, pageCount, pageSize, category, subCategory]);

    useEffect(  () => {
        dispatch(setPage(1));
    }, [category, subCategory]);
    
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
                { categorySku && !subCategorySku && <SubCategoryList /> }
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
