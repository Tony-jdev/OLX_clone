import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { scrollableBox } from "@/components/Tools/PostWideList/Styles.js";
import PostWideCard from "@/components/Tools/PostWideCard/PostWideCard.jsx";
import NoDataFound from "@/components/NoDataFound/NoDataFound.jsx";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import RecentViewsCard from "@/components/Tools/PostWideCard/RecentViewsCard.jsx";

const PostWideList = ({ ads, onPostUpdate, t }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const type = t ?? 'sell';

    const containerRef = useRef(null);

    const slowScroll = (event) => {
        event.preventDefault();
        const step = 80;
        if (event.deltaY > 0) {
            containerRef.current.scrollBy({
                top: step,
                behavior: 'auto'
            });
        } else {
            containerRef.current.scrollBy({
                top: -step,
                behavior: 'auto'
            });
        }
    };

    useEffect(() => {
        if (ads && ads.length > 0) {
            const container = containerRef.current;
            container.addEventListener('wheel', slowScroll);

            return () => {
                container.removeEventListener('wheel', slowScroll);
            };
        }
    }, [ads]);

    return ads && ads.length > 0 ? (
        <>
            <Box ref={containerRef} style={{
                ...scrollableBox, scrollbarColor: `${colors.text.orange} ${colors.background.secondary}`,
                maxWidth: 980, maxHeight: 640, height: '100vh', width: '100vw',
            }}>
                {ads.map((ad, index) => (
                    <React.Fragment key={index}>
                        {type === 'sell' && (
                            <PostWideCard ad={ad} container={containerRef} onPostUpdate={onPostUpdate} />
                        )}
                        {type === 'view' && (
                            <RecentViewsCard ad={ad} container={containerRef}/>
                        )}
                        {type === 'message' && (
                            <Typography variant="body1">{ad.description}</Typography>
                        )}
                    </React.Fragment>
                ))}
            </Box>
            <Text type={'Body'} sl={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px', marginRight: '20px' }}>
                Всього оголошень: {ads.length}
            </Text>
        </>
    ) : <NoDataFound />
};

export default PostWideList;
