import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import { ProductInfoContainer, TitleStyle, DescriptionStyle, PriceStyle } from './Styles.js';
import Carousel from "@/components/Tools/Carousel/Carousel.jsx";
import {useTheme} from "@mui/material/styles";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {LikedIcon, LikeIcon} from "@/assets/Icons/Icons.jsx";

const ProductInfo = ({post, liked=false}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const title = post.title;
    const description = post.description;
    const price = post.price;
    const createdAt = post.createdAt;
    const type = post.type;
    const viewsCount = post.viewsCount;
    
    
    
    return (
        <Box 
            style={{...ProductInfoContainer, maxWidth: '953px'}} 
            sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            <Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Headline'} sr={{fontWeight: '700'}}>
                        {title??'non'}
                    </Text>
                    <Text type={'Headline'} sr={{fontWeight: '700'}}>
                        {price??'non'}₴
                    </Text>
                </Box>
                <Text>Кропивницький, 20 червня 2024 р</Text>
            </Box>
            
            <Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Headline'}>Опис</Text>
                    <SButton
                        isIconButton={true}
                        icon={<Icon icon={liked ? LikedIcon : LikeIcon} color={colors.text.orange} step={3} height={36} width={36}/>}
                    />
                </Box>
               <Box>
                   <Text>
                       Відкрита бронь на плюшевих кошенят!!! Народилися 02.06, мама - шотландочка, тато-золота шиншила (клубний). 2 дівчинки-висловухі, 2 хлопчики- прямовухі. У кошенят широкі лапки, міцний каркас, густа шерсть, кругленькі мордочки.
                   </Text>
               </Box>
                <Box>
                    
                </Box>
            </Box>
        </Box>
    );
};

export default ProductInfo;
