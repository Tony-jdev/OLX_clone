import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Delete, Edit, Favorite, Share, Visibility } from '@mui/icons-material';
import { ActionButtonsContainer, AvatarStyle, CardContainer, ContentContainer, PriceStyle, 
    StatIconMarginLeft, StatIconStyle, StatsContainer, TextContainer,
} from "@/components/Tools/PostWideCard/Styles.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {IndicatorGridStyle} from "@/components/Tools/ShortProduct/Styles.js";
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useTheme} from "@mui/material/styles";
import AddPostModal from "@/components/Tools/AddPostModal/AddPostModal.jsx";
import {useNavigate} from "react-router-dom";


//ad:{
//    "id": 0,
//    "title": "string",
//    "sku": "string",
//    "price": 0,
//    "location": "string",
//    "type": "string",
//    "isTop": true,
//    "photoUrl": "string"
//}

const PostWideCard = ({ ad, container }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const navigate = useNavigate();

    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(1);
    const cardRef = useRef(null);
    
    const vip = ad.vip;
    const isUsed = ad.type !== 'New';

    const [editModalOpen, setEditModalOpen] = useState(false);
    
    

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio;

                if (ratio > 0.99) {
                    setOpacity(1);
                    setScale(1);
                } else {
                    setOpacity(ratio);
                    setScale(ratio);
                }
            },
            {
                root: container.current,
                threshold: Array.from(Array(101).keys(), (v) => v * 0.01),
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [container]);


    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };
    
    return (
        <Box
            ref={cardRef}
            sx={{
                ...CardContainer,
                opacity: opacity,
                transform: `scale(${scale})`,
                transition: 'opacity 0.05s, transform 0.125s',
                boxShadow: colors.boxShadow,
            }}
        >
            <Avatar src={ad.photoUrl} variant="rounded" style={AvatarStyle} />
            <Grid container style={IndicatorGridStyle}>
                {vip && <IndicatorBox text="Top" style='d' />}
                {isUsed && <IndicatorBox text="Б/У" />}
            </Grid>
            <Box style={{ ...ContentContainer }}>
                <Box style={TextContainer}>
                    <Box>
                        <Text type="Headline" text={ad.title} />
                        <Text type="Body" text={ad.category} />
                        <Text type="Body" text={ad.date} />
                    </Box>
                    <Text type="Headline" style={{ ...PriceStyle }} text={`${ad.price} ₴`} />
                </Box>
                <Grid container alignItems='flex-end' justifyContent='space-between' style={{ maxHeight: 70, height: '100%' }}>
                    <Box style={StatsContainer}>
                        <Visibility style={StatIconStyle} />{ad.views}
                    </Box>
                    <Box style={ActionButtonsContainer}>
                        <SButton
                            prew={<Edit sx={{ marginRight: '5px', height: '16px', }} />}
                            textType={'Body'}
                            Color={colors.text.primary}
                            text={"Редагувати"}
                            borderInVisible={true}
                            sl={{ background: colors.types.warning}}
                            sr={{ width: '160px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                            hoverColor={colors.types.warning}
                            hoverBack={colors.background.secondary}
                            hoverShadow={colors.types.shadows.boxShadowWarning}
                            action={()=>navigate('/create/'+ad.sku)}
                        />
                        <SButton
                            prew={<Delete sx={{ marginRight: '5px', height: '16px', }} />}
                            textType={'Body'}
                            text={"Деактивувати"}
                            borderInVisible={true}
                            Color={colors.text.primary}
                            sl={{ background: colors.types.error}}
                            sr={{ width: '160px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                            hoverColor={colors.types.error}
                            hoverBack={colors.background.secondary}
                            hoverShadow={colors.types.shadows.boxShadowError}
                            action={() => { }}
                        />
                        <SButton
                            prew={<Visibility sx={{ marginRight: '5px', height: '16px' }} />}
                            textType={'Body'}
                            text={"Рекламувати"}
                            Color={colors.text.primary}
                            borderInVisible={true}
                            sl={{ background: colors.types.default }}
                            sr={{ width: '160px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                            hoverColor={colors.types.default}
                            hoverBack={colors.background.secondary}
                            hoverShadow={colors.types.shadows.boxShadowDefault}
                            action={() => { }}
                        />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default PostWideCard;
