import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { scrollableBox } from "@/components/Tools/PostWideList/Styles.js";
import PostWideCard from "@/components/Tools/PostWideCard/PostWideCard.jsx";
import NoDataFound from "@/components/NoDataFound/NoDataFound.jsx";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import RecentViewsCard from "@/components/Tools/PostWideCard/RecentViewsCard.jsx";
import FavouriteCard from "@/components/Tools/PostWideCard/FavouriteCard.jsx";
import MessageCard from "@/components/Tools/PostWideCard/MessageCard.jsx";

const PostWideList = ({ unr, r, ads, onPostUpdate, onFavoriteRemoved, t, withoutCount, onFavoriteChange}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const type = t ?? 'sell';

    const containerRef = useRef(null);

    return ((ads && ads.length > 0) || (unr && unr.length > 0) || (r && r.length > 0)) ? (
        <>
            <Box ref={containerRef} style={{
                ...scrollableBox, scrollbarColor: `${colors.text.orange} ${colors.background.secondary}`,
                maxWidth: 980, maxHeight: 640, height: '100vh', width: '100vw',
            }}>
                {ads && ads.slice().reverse().map((ad, index) => (
                    <React.Fragment key={index}>
                        {type === 'sell' && (
                            <PostWideCard ad={ad} container={containerRef} onPostUpdate={onPostUpdate} />
                        )}
                        {type === 'view' && (
                            <RecentViewsCard ad={ad} container={containerRef} onFavoriteChange={onFavoriteChange}/>
                        )}
                        {type === 'fav' && (
                            <FavouriteCard ad={ad} container={containerRef} onFavoriteRemoved={onFavoriteRemoved}/>
                        )}
                        {type === 'message' && (
                            <MessageCard ad={ad} />
                        )}
                    </React.Fragment>
                ))}
                {unr
                && (<>
                        <Text type={'Title'} sr={{marginBottom: '20px'}}>Непрочитані</Text>
                        {
                            unr.map((ad, index) => (
                                <React.Fragment key={index}>
                                    {type === 'message' && (
                                        <MessageCard ad={ad} />
                                    )}
                                </React.Fragment>))
                        }
                    </>)
                }
                {r && r.length > 0 && (<>
                        <Text type={'Title'} sr={{marginBottom: '20px', paddingTop: unr ? '10px' : 0}}>Прочитані</Text>
                        {
                            r.map((ad, index) => (
                                <React.Fragment key={index}>
                                    {type === 'message' && (
                                        <MessageCard ad={ad} />
                                    )}
                                </React.Fragment>
                            ))
                        }
                    </>)
                }
            </Box>
            {!withoutCount && ads &&
                <Text type={'Body'} sl={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px', marginRight: '20px' }}>
                    Всього оголошень: {ads.length}
                </Text>
            }
        </>
    ) : <NoDataFound />
};

export default PostWideList;
