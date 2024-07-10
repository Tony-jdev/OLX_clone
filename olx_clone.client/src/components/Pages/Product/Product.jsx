import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductInfo from "@/components/Tools/ProductInfo/ProductInfo.jsx";
import SellerInfo from "@/components/Tools/SellerInfo/SellerInfo.jsx";
import LocationInfo from "@/components/Tools/LocationInfo/LocationInfo.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx"; 
import {Box, Container, Grid} from "@mui/material";
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
import Carousel from "@/components/Tools/Carousel/Carousel.jsx";
import {useTheme} from "@mui/material/styles";
import {useChat} from "@/providers/ChatProvider.jsx";
import {
    selectCustomer,
    selectPost,
    selectSeller,
    setCustomer, setPost,
    setSeller
} from "@/Storage/Redux/Slices/chatSlice.js";
import {isUserLoggedIn, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {addRecentView} from "@/Helpers/recentViewsHelper.js";
import {GetPostById} from "@/Api/postApi.js";
import {fetchUserById} from "@/Api/userApi.js";
import ProductList from "@/components/Tools/ProductList/ProductList.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";

const ProductPage = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const postId = useSelector(selectSelectedPostId);
    const post = useSelector(selectSelectedPost);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const navigate = useNavigate();
    
    const user = useSelector(selectUser);
    const isUserLogined = useSelector(isUserLoggedIn);
    const {openAuth} = useAuth();

    const customer = useSelector(selectCustomer);
    const seller = useSelector(selectSeller);
    const postChat = useSelector(selectPost);

    const [urls,setUrls] = useState([]);
    const [sellerPosts,setSellerPosts] = useState([]);

    const productListRef = useRef(null);
    const [open,setOpen] = useState(false);


    const { openChat, fetchChats } = useChat();
    
    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    useEffect(() => {
        dispatch(setSelectedPostId(id));
        const fetch = async ()=>{
            await dispatch(fetchPostByIdAsync(id));
        }
        fetch();
        window.scrollTo(0, 0);
    }, [dispatch, id]);
    

    useEffect(() => {
        if (post && post.photos) {
            setUrls(post.photos.map(photo => photo.photoUrl));
        }
    }, [post]);

    useEffect(() => {

        console.log(user);
        console.log(post);
        console.log(post?.user);
        
        const fetchPosts = async () => {
            const seller = await fetchUserById(post?.user.id);
            console.log(seller);
            setSellerPosts(seller.data.posts);
        }
        fetchPosts();
        
        if(isUserLogined && post?.sku && user?.userId)
        {
            addRecentView(user?.userId, post?.sku);
        }

        if(post)
        {
            dispatch(setCustomer(user));
            dispatch(setSeller(post.user));
            dispatch(setPost(post));
        }
    }, [post, user]);

    useEffect(() => {
        if (open && productListRef.current) {
            productListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [open]);
    
    const handleOpenChat = () => {
        if(isUserLogined)
        {
            if(user.userId !== post.user.id)
            {
                
                navigate('/user/Messages', { state:
                        {
                            additionalData: {
                                senderId: post.user.id,
                                userId: user.userId,
                                postId: post.id,
                                postSku: post.sku,
                            }
                        } 
                });
            }
        }
        else openAuth();
    };
    
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
        <Container style={{marginTop: 60, marginBottom: 60, maxWidth: '1440px', width: '100%', padding: 0}}>
            <Grid container direction={'row'} justifyContent={'space-between'} style={{marginBottom: '20px'}}>
                <Box sx={{background: colors.background.secondary, boxShadow: colors.boxShadow, 
                    borderRadius: '20px', maxHeight: '630px', height: '100vh',
                    alignContent: 'center',
                }}>
                    {urls && <Carousel items={urls} isWide={false} isOnlyImg={true} width={'953px'} withoutNBtns={true} stopAutoplay={true}/>}
                </Box>
                <Box style={{maxWidth:'466px', width: '100%'}}>
                    <SellerInfo seller={seller} OpenChat={handleOpenChat} onShowSellerProds={()=>{setOpen(true);}}/>
                    <LocationInfo location={post.location} />
                </Box>
            </Grid>
            <ProductInfo post={post}/>
            {open && sellerPosts && sellerPosts.length > 0 && (<div ref={productListRef}>
                <ProductList posts={sellerPosts} headerText={"Всі оголошення продавця"}/>
            </div>)}
        </Container>
    );
};

export default ProductPage;
