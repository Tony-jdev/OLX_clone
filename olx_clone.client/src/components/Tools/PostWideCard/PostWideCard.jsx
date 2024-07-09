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

const PostWideCard = ({ ad, container, onPostUpdate }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const navigate = useNavigate();

    const token = useSelector(selectToken);

    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(1);
    const cardRef = useRef(null);

    const vip = ad.vip;
    const isUsed = ad.type !== 'New';

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [sellConfirmOpen, setSellConfirmOpen] = useState(false);

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

    const handleDeactivate = async () => {
        try {
            await updatePostStatus(ad.id, 1); 
            onPostUpdate(); 
        } catch (error) {
            console.error('Failed to deactivate post:', error);
        }
    };

    const handleActivate = async () => {
        try {
            await updatePostStatus(ad.id, 0); 
            onPostUpdate(); 
        } catch (error) {
            console.error('Failed to activate post:', error);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await DeletePost(ad.id, token);
            onPostUpdate(); 
        } catch (error) {
            console.error('Failed to delete post:', error);
        } finally {
            setDeleteConfirmOpen(false);
        }
    };

    const handleSell = async (e) => {
        e.stopPropagation();
        try {
            await updatePostStatus(ad.id, 2); 
            onPostUpdate(); 
        } catch (error) {
            console.error('Failed to mark as sold:', error);
        } finally {
            setSellConfirmOpen(false);
        }
    };

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
                    {ad.status !== 'Sold' && (
                        <Box style={ActionButtonsContainer} onClick={(e) => e.stopPropagation()}>
                            {ad.status === 'Active' ? (
                                <>
                                    <SButton
                                        textType={'Body'}
                                        text={"Продано"}
                                        Color={colors.text.primary}
                                        borderInVisible={true}
                                        sl={{ background: colors.types.success }}
                                        sr={{ width: '150px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.success}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowSuccess}
                                        action={(e) => {
                                            e.stopPropagation();
                                            setSellConfirmOpen(true);
                                        }}
                                    />
                                    
                                    <SButton
                                        textType={'Body'}
                                        Color={colors.text.primary}
                                        text={"Редагувати"}
                                        borderInVisible={true}
                                        sl={{ background: colors.types.warning }}
                                        sr={{ width: '150px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.warning}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowWarning}
                                        action={(e) => {
                                            e.stopPropagation();
                                            navigate("/create/" + ad.sku);
                                        }}
                                    />
                                    <SButton
                                        textType={'Body'}
                                        text={"Деактивувати"}
                                        borderInVisible={true}
                                        Color={colors.text.primary}
                                        sl={{ background: colors.types.error }}
                                        sr={{ width: '150px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.error}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowError}
                                        action={(e) => {
                                            e.stopPropagation();
                                            handleDeactivate();
                                        }}
                                    />
                                    <SButton
                                        textType={'Body'}
                                        text={"Рекламувати"}
                                        Color={colors.text.primary}
                                        borderInVisible={true}
                                        sl={{ background: colors.types.default }}
                                        sr={{ width: '150px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.default}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowDefault}
                                        action={(e) => {
                                            e.stopPropagation();
                                            // Your advertise action here
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <SButton
                                        textType={'Body'}
                                        Color={colors.text.primary}
                                        text={"Редагувати"}
                                        borderInVisible={true}
                                        sl={{ background: colors.types.warning }}
                                        sr={{ width: '160px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.warning}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowWarning}
                                        action={(e) => {
                                            e.stopPropagation();
                                            navigate("/create/" + ad.sku);
                                        }}
                                    />
                                    <SButton
                                        textType={'Body'}
                                        text={"Видалити"}
                                        borderInVisible={true}
                                        Color={colors.text.primary}
                                        sl={{ background: colors.types.error }}
                                        sr={{ width: '160px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.error}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowError}
                                        action={(e) => {
                                            e.stopPropagation();
                                            setDeleteConfirmOpen(true);
                                        }}
                                    />
                                    <SButton
                                        textType={'Body'}
                                        text={"Активувати"}
                                        Color={colors.text.primary}
                                        borderInVisible={true}
                                        sl={{ background: colors.types.default }}
                                        sr={{ width: '160px', height: '30px', fontSize: '16px', fontWeight: '500', textTransform: 'none', }}
                                        hoverColor={colors.types.default}
                                        hoverBack={colors.background.secondary}
                                        hoverShadow={colors.types.shadows.boxShadowDefault}
                                        action={(e) => {
                                            e.stopPropagation();
                                            handleActivate();
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                    )}
                </Grid>
            </Box>

            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={sellConfirmOpen}
                onClose={() => setSellConfirmOpen(false)}
                aria-labelledby="alert-sell-title"
                aria-describedby="alert-sell-description"
            >
                <DialogTitle id="alert-sell-title">{"Confirm Sale"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-sell-description">
                        Are you sure you want to mark this post as sold? Confirm only if the product has been sold and you have received payment.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSellConfirmOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSell} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PostWideCard;
