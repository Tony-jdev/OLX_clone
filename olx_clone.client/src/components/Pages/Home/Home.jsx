import React, {useEffect} from 'react';
import { Container } from '@mui/material';
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import Carousel from '@/components/Tools/Carousel/Carousel.jsx';
import CategoryMasonry from "@/components/Tools/CategoryMasonry/CategoryMasonry.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
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
import {AddOutlinedIcon} from "@/assets/Icons/Icons.jsx";
import Carusel from "@/components/Tools/CaruselM3/Carusel.jsx";

const itemss = [
    { image: 'https://th.bing.com/th/id/OIP.bZDmBBbw15Uog6Em-3dJeQHaE8?rs=1&pid=ImgDetMain', name: 'Item 1', price: '100$' },
    { image: 'https://th.bing.com/th/id/OIP.bZDmBBbw15Uog6Em-3dJeQHaE8?rs=1&pid=ImgDetMain', name: 'Item 2', price: '200$' },
    { image: 'https://th.bing.com/th/id/OIP.bZDmBBbw15Uog6Em-3dJeQHaE8?rs=1&pid=ImgDetMain', name: 'Item 3', price: '300$' },
];


function HomePage() {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(  () => {
        dispatch(fetchVipPostsAsync());
    }, [dispatch]);
    
    const HeaderBtn = (
        <SButton
            type='whiteOutlinedBB' 
            text={<FormattedMessage id='home.vip.btn' />}
            hoverColor={colors.black}
            hoverBack={colors.white}
            hoverShadow={colors.boxShadow}
            textType={'Body'}
            Color={colors.black}
            sl={{background: colors.white }}
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
                textType={'Title'}
                text={<FormattedMessage id='btn.add' /> }
                Color={colors.text.input}
                prew={<AddOutlinedIcon sx={{marginRight: '5px'}}/>}
                sl={{background: colors.background.def}}
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
                textType={'Title'}
                text={<FormattedMessage id='btn.see' />}
                Color={colors.text.primary}
                sl={{background: colors.background.darkGradient}}
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
                textType={'Title'}
                text={<FormattedMessage id='btn.see' />}
                Color={colors.text.primary}
                sl={{background: colors.background.darkGradient}}
                action={()=>{}}
            />,
            imageUrl: "@/../public/Ads/Ads2.png"
        },
    ];

    
    
    return (
        <Container style={ContainerStyle}>
            <Carousel items={items} />
            <CategoryMasonry/>
            <Carusel
                headerText={<FormattedMessage id='home.vip.header' />} headerBtn={HeaderBtn}
                items={posts}
                error={error}
                loading={loading}
            />
            <TutorialPanel/>
        </Container>
    );
}

export default HomePage;
