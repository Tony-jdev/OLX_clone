import React, {useEffect, useState} from 'react';
import { Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Icon from '@/components/Tools/IconContainer/Icon.jsx';
import SButton from '@/components/Tools/Button/SButton.jsx';
import Text from '@/components/Tools/TextContainer/Text.jsx';
import { useTheme } from "@mui/material/styles";
import { CardContainer } from "@/components/Tools/SellerInfo/Styles.js";
import {formatDateFromISOV2} from "@/Helpers/DateHelper.js";

const SellerInfo = ({ seller, OpenChat, onShowSellerProds }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [phoneModalOpen, setPhoneModalOpen] = useState(false);

    const handleOpenPhoneModal = () => {
        setPhoneModalOpen(true);
    };

    const handleClosePhoneModal = () => {
        setPhoneModalOpen(false);
    };

    const name = seller?.name ?? 'Noname';
    const phone = seller?.phoneNumber ?? 'No phone number';
    const createdAt = formatDateFromISOV2(seller?.createdAt);
    const lastOnline = seller?.lastOnline ?? '24:00';

    return (
        <>
            <Grid style={CardContainer} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: colors.boxShadow, backgroundColor: colors.background.secondary }}>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '406px', maxHeight: '264px', height: '100%' }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text type={'Headline'}>Про автора</Text>
                    </Box>
                    <Box>
                        <Text type={'Title'} mt={2}>{name}</Text>
                        <Text type={'Title'} color={colors.text.secondary}>На eVSE {createdAt}</Text>
                        <Text type={'Title'} color={colors.text.secondary}>Онлайн в {lastOnline}</Text>
                    </Box>
                    <Box>
                        <SButton
                            text={'Усі оголошення автора'}
                            textType={'Body'}
                            type={'transparentButton'}
                            Color={colors.text.revers}
                            next={<Icon icon={ArrowForwardIcon} color={colors.text.revers} step={3} width={28} height={18} />}
                            action={onShowSellerProds}
                        />
                    </Box>
                </Box>

                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '106px', maxWidth: '406px', height: '100%' }}>
                    <SButton
                        type={'orangeRoundButton'}
                        text={'Повідомлення'}
                        textType={'Title'}
                        Color={colors.text.primary}
                        hoverShadow={colors.types.shadows.boxShadowWarning}
                        sl={{ background: colors.background.lightGradient }}
                        sr={{ padding: '0px 16px 0px 16px', maxWidth: '406px', maxHeight: '48px', width: "100%", height: '100vh', borderRadius: '30px' }}
                        action={OpenChat}
                    />
                    <SButton
                        type={'orangeRoundButton'}
                        text={'Показати телефон'}
                        textType={'Title'}
                        Color={colors.text.primary}
                        hoverShadow={colors.types.shadows.boxShadowWarning}
                        sl={{ background: colors.background.lightGradient }}
                        sr={{ padding: '0px 16px 0px 16px', maxWidth: '406px', maxHeight: '48px', width: "100%", height: '100vh', borderRadius: '30px' }}
                        action={handleOpenPhoneModal}
                    />
                </Box>
            </Grid>

            <Dialog
                open={phoneModalOpen}
                onClose={handleClosePhoneModal}
                aria-labelledby="phone-dialog-title"
                aria-describedby="phone-dialog-description"
            >
                <DialogTitle id="phone-dialog-title">Номер телефону продавця</DialogTitle>
                <DialogContent>
                    <DialogContentText id="phone-dialog-description">
                        {phone}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePhoneModal} color="primary">
                        Закрити
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SellerInfo;
