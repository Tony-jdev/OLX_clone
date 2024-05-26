import React, {useEffect} from 'react';
import { Container } from '@mui/material';
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import Carousel from '@/components/Tools/Carousel/Carousel.jsx';
import CategoryMasonry from "@/components/Tools/CategoryMasonry/CategoryMasonry.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    clearData,
    fetchPostsAsync,
    fetchVipPostsAsync,
    selectError,
    selectLoading,
    selectPosts
} from "@/Storage/Redux/Slices/postSlice.js";
import SButton from '../../Tools/Button/SButton.jsx';
import {useTheme} from "@mui/material/styles";
import {FormattedMessage} from "react-intl";
import {ContainerStyle} from "@/components/Pages/Home/Styles.jsx";
import TutorialPanel from "@/components/Tools/TutorialPanel/TutorialPanel.jsx";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(  () => {
        //dispatch(clearData());
        dispatch(fetchVipPostsAsync());
    }, [dispatch]);
    
    const HeaderBtn = (
        <SButton
            type='whiteOutlinedBB' 
            text={<FormattedMessage id='home.vip.btn' />}
            sl={{background: 'white'}}
            action={()=> {
                navigate('./search');
            }}
        />
    );

    const items = [
        {
            name: <FormattedMessage id='ad1.name' />,
            description: <FormattedMessage id='ad1.description' />,
            textColor: colors.text.primary,
            btn: <SButton
                type='carouselButton'
                text={<FormattedMessage id='btn.add' /> }
                sl={{color: colors.text.input, background: colors.background.def}}
                action={()=>{}}
            />,
            imageUrl: "@/../public/Ads/Ads0.png"
        },
        {
            name: <FormattedMessage id='ad2.name' />,
            description: <FormattedMessage id='ad2.description' />,
            textColor: colors.text.input,
            btn: <SButton
                type='carouselButton'
                text={<FormattedMessage id='btn.see' />}
                sl={{color: colors.text.primary, background: colors.background.darkGradient}}
                action={()=>{}}
            />,
            imageUrl: "@/../public/Ads/Ads1.png"
        },
        {
            name: <FormattedMessage id='ad3.name' />,
            description: <FormattedMessage id='ad3.description' />,
            textColor: colors.text.input,
            btn: <SButton
                type='carouselButton'
                text={<FormattedMessage id='btn.see' />}
                sl={{color: colors.text.primary, background: colors.background.darkGradient}}
                action={()=>{}}
            />,
            imageUrl: "@/../public/Ads/Ads2.png"
        },
    ];

    
    
    return (
        <Container style={ContainerStyle}>
            <Carousel items={items} />
            <CategoryMasonry/>
            <ProductList posts={posts} error={error} loading={loading} headerText={<FormattedMessage id='home.vip.header' />} headerBtn={HeaderBtn}/>
            <TutorialPanel/>
        </Container>
    );
}

export default HomePage;
