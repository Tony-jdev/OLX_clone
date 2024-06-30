import React from 'react';
import { Box, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Icon from '@/components/Tools/IconContainer/Icon.jsx'; 
import SButton from '@/components/Tools/Button/SButton.jsx'; 
import Text from '@/components/Tools/TextContainer/Text.jsx';
import {useTheme} from "@mui/material/styles";
import {CardContainer} from "@/components/Tools/SellerInfo/Styles.js";
import {color} from "@mui/system";

const SellerInfo = ({ authorName, joinedDate, onlineTime, OpenChat }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Grid style={CardContainer} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: colors.boxShadow, backgroundColor: colors.background.secondary }}>
            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '406px', maxHeight: '264px', height: '100%'}}>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Headline'}>Про автора</Text>
                    <Box display="flex">
                        {[...Array(5)].map((_, index) => (
                            <Icon key={index} icon={StarIcon} color={colors.text.orange} step={1} width={20} height={20} />
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Text type={'Title'} mt={2}>{authorName?? "Artem"}</Text>
                    <Text type={'Title'} color={colors.text.secondary}>На eVSE з {joinedDate??'липня 2022 р.'}</Text>
                    <Text type={'Title'} color={colors.text.secondary}>Онлайн в {onlineTime?? '20:00'}</Text>
                </Box>
                <Box>
                    <SButton
                        text={'Усі оголошення автора'}
                        textType={'Body'}
                        type={'transparentButton'}
                        Color={colors.text.revers}
                        next={<Icon icon={ArrowForwardIcon} color={colors.text.revers} step={3} width={28} height={18}/>}
                    />
                </Box>
            </Box>
            
            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '106px', maxWidth: '406px', height: '100%'}}>
                <SButton 
                    type={'orangeRoundButton'}
                    text={'Повідомлення'}
                    textType={'Title'}
                    Color={colors.text.primary}
                    hoverShadow={colors.types.shadows.boxShadowWarning}
                    sl={{background: colors.background.lightGradient}}
                    sr={{padding: '0px 16px 0px 16px', maxWidth: '406px', maxHeight: '48px', width: "100%", height: '100vh', borderRadius: '30px' }}
                    action={OpenChat}
                />
                <SButton
                    type={'orangeRoundButton'}
                    text={'Показати телефон'}
                    textType={'Title'}
                    Color={colors.text.primary}
                    hoverShadow={colors.types.shadows.boxShadowWarning}
                    sl={{background: colors.background.lightGradient}}
                    sr={{padding: '0px 16px 0px 16px', maxWidth: '406px', maxHeight: '48px', width: "100%", height: '100vh', borderRadius: '30px' }}
                />
            </Box>
        </Grid>
    );
};

export default SellerInfo;
