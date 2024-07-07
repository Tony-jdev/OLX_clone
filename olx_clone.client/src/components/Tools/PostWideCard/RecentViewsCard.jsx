import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import {
    ActionButtonsContainer,
    AvatarStyle,
    CardContainer,
    ContentContainer,
    PriceStyle,
    StatIconStyle,
    StatsContainer,
    TextContainer,
} from "@/components/Tools/PostWideCard/Styles.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { IndicatorGridStyle } from "@/components/Tools/ShortProduct/Styles.js";
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { updatePostStatus, DeletePost } from "@/Api/postApi.js";
import { useSelector } from "react-redux";
import { selectToken } from "@/Storage/Redux/Slices/userInfoSlice.js";

const RecentViewsCard = ({ ad, container}) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const navigate = useNavigate();

    const token = useSelector(selectToken);

    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(1);
    const cardRef = useRef(null);

    const vip = ad.vip;
    const isUsed = ad.type !== 'New';
    
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

    const handleCardClick = () => {
        navigate(`/post/${ad.sku}`);
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
            onClick={handleCardClick}
        >
            <Avatar src={ad.photoUrl} variant="rounded" style={AvatarStyle} />
            <Grid container style={IndicatorGridStyle}>
                {vip && <IndicatorBox text="Top" style='d' />}
                {isUsed && <IndicatorBox text="Б/У" />}
            </Grid>
            <Box style={{ ...ContentContainer }}>
                <Box style={TextContainer}>
                    <Box>
                        <Text type="Title" text={ad.title} />
                        <Text type="Body" text={ad.category} />
                        <Text type="Body" text={ad.date} />
                    </Box>
                    <Text type="Title" style={{ ...PriceStyle }} sr={{textWrap: 'nowrap'}} text={`${ad.price} ₴`} />
                </Box>
                <Grid container alignItems='flex-end' justifyContent='space-between' style={{ maxHeight: 70, height: '100%' }}>
                    <Box style={StatsContainer}>
                        <Visibility style={StatIconStyle} />{ad.viewsCount ?? 0}
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default RecentViewsCard;
