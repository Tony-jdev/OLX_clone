import {useTheme} from "@mui/material/styles";
import React, {useEffect, useRef} from "react";
import {Box} from "@mui/material";
import {scrollableBox} from "@/components/Tools/PostWideList/Styles.js";
import PostWideCard from "@/components/Tools/PostWideCard/PostWideCard.jsx";
import NoDataFound from "@/components/NoDataFound/NoDataFound.jsx";

const PostWideList = ({ads}) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const containerRef = useRef(null);

    const slowScroll = (event) => {
        event.preventDefault();
        const step = 30; 
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
        const container = containerRef.current;
        container.addEventListener('wheel', slowScroll);

        return () => {
            container.removeEventListener('wheel', slowScroll);
        };
    }, []);

    return (
        <Box ref={containerRef} style={{...scrollableBox, scrollbarColor: `${colors.text.orange} ${colors.background.secondary}`,
            maxWidth: 975, maxHeight: 640, height: '100vh', width: '100vw',
        }} >
            {ads ? ads.map(ad => (
                <PostWideCard key={ad.id} ad={ad} container={containerRef} />
            )) : <NoDataFound/>}
        </Box>
    );
};

export default PostWideList;
