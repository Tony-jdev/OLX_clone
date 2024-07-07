import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Grid } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import {
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
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "@/Storage/Redux/Slices/userInfoSlice.js";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {LikedIcon, MessageMailIcon} from "@/assets/Icons/Icons.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {formatLocationAndDate} from "@/Helpers/DateHelper.js";
import {CategoryChainComponent} from "@/Helpers/CategoryChain.jsx";
import {BodyMedium, HeadlineMedium, TitleMedium} from "@/components/Tools/TextContainer/Styles.js";

const RecentViewsCard = ({ ad, container }) => {
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

    useEffect(() => {
        console.log(ad);
    }, [ad]);

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
            <Avatar src={ad?.photoUrl} variant="rounded" style={AvatarStyle} />
            <Grid container style={IndicatorGridStyle}>
                {vip && <IndicatorBox text="Top" style='d' />}
                {isUsed && <IndicatorBox text="Б/У" />}
            </Grid>
            <Box style={{ ...ContentContainer }}>
                <Box style={TextContainer}>
                    <Box>
                        <Text type="Title" >{ad.title}</Text>
                        <Text textSt={TitleMedium} color={colors.text.secondary} >{
                           0 //<CategoryChainComponent category={ad.category}/>
                        }</Text>
                    </Box>
                    <Box style={{display: 'flex', flexDirection: 'row', height: 'max-content', alignItems: 'center'}}>
                        <Text textSt={HeadlineMedium} style={{ ...PriceStyle }} sr={{marginRight: '14px'}} text={`${ad.price}`} />
                        <Text textSt={BodyMedium} style={{ ...PriceStyle }} sr={{marginRight: '14px'}} text={` ₴`} />
                    </Box>
                </Box>
                <Grid container alignItems='flex-end' justifyContent='space-between' style={{ maxHeight: 70, height: '100%' }}>
                    <Box style={StatsContainer}>
                        <Text textSt={TitleMedium}  >{
                            0//formatLocationAndDate(ad.location,  ad.createdAt)
                        }</Text>
                    </Box>
                    <Box style={StatsContainer}>
                        <SButton
                            isIconButton={true}
                            icon={
                                <Icon
                                    icon={LikedIcon}
                                    color={colors.text.revers}
                                    step={1}
                                    width={36}
                                    height={36}
                                />}
                        />
                        <SButton
                            isIconButton={true}

                            icon={
                                <Icon
                                    icon={MessageMailIcon}
                                    color={colors.text.revers}
                                    step={1}
                                    width={36}
                                    height={36}
                                />
                            }
                        />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default RecentViewsCard;
