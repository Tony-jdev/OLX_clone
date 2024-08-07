import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton.jsx';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataAsync, selectToken, selectUser } from "@/Storage/Redux/Slices/userInfoSlice.js";
import OrangeProgress from "@/components/Tools/CentralProgress/OrangeProgress.jsx";
import { useTheme } from "@mui/material/styles";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { PenEditIcon } from "@/assets/Icons/Icons.jsx";
import { updateUserById } from "@/Api/userApi.js";
import { InfoBlock, ButtonGroup } from "@/components/Pages/UserProfileContainer/MiniPages/UserInfo/Styles.js";
import { uploadUserPhoto } from '@/Api/userApi.js';

const EditableField = ({ label, value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value ?? '');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        setEditValue(value ?? '');
    }, [value]);

    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
        setIsConfirmOpen(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: '20px 20px 20px 0px' }}>
                {!isEditing ? (
                    <>
                        <Text type={'Body'} sr={{ alignSelf: 'center', width: '160px' }}>{label}:</Text>
                        <Text type={'Body'} sr={{ alignSelf: 'center' }}>{value}</Text>
                        <SButton isIconButton={true} icon={<PenEditIcon sx={{ width: '18px', height: '18px' }} />} action={() => setIsEditing(true)} />
                    </>
                ) : (
                    <>
                        <TextField value={editValue} onChange={(e) => setEditValue(e.target.value)} variant="outlined" />
                        <Button onClick={() => setIsConfirmOpen(true)}><FormattedMessage id="profile.save" /></Button>
                        <Button onClick={() => setIsEditing(false)}><FormattedMessage id="profile.cancel" /></Button>
                    </>
                )}
            </Box>

            <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                <DialogTitle><FormattedMessage id="profile.confirmUpdate" /></DialogTitle>
                <DialogContent>
                    <DialogContentText><FormattedMessage id="profile.confirmUpdateText" /></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmOpen(false)} color="primary"><FormattedMessage id="profile.cancel" /></Button>
                    <Button onClick={handleSave} color="primary"><FormattedMessage id="profile.confirm" /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const UserProfile = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const userD = await dispatch(fetchUserDataAsync());
                const photoD = userD.profilePhotoUrl;
                setPhoto(photoD);
            }
            getUser();
        }
    }, [token, dispatch]);

    if (!user) {
        return <OrangeProgress />;
    }

    const handleUpdate = async (field, value) => {
        const updatedUser = {
            id: user.userId,
            name: field === 'name' ? value : user.name ?? "Noname",
            surname: field === 'surname' ? value : user.surname ?? 'Noname',
            phoneNumber: field === 'phone' ? value : user.phoneNumber ?? "",
            address: user.address ?? '',
        };
        try {
            await updateUserById(user.userId, updatedUser);
            dispatch(fetchUserDataAsync());
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                await uploadUserPhoto(user.userId, file);
                dispatch(fetchUserDataAsync());
            } catch (error) {
                console.error('Failed to upload avatar:', error);
            }
        }
    };

    const handlePasswordChange = async () => {
        try {
            await updateUserById(user.id, { password: newPassword });
            setIsPasswordModalOpen(false);
            setNewPassword('');
        } catch (error) {
            console.error('Failed to change password:', error);
        }
    };

    return (
        <>
            <Box sx={{ ...InfoBlock, background: colors.background.secondary, boxShadow: colors.boxShadow }}>
                <Text type={'Title'}><FormattedMessage id="profile.contactInfo" /></Text>
                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '20px 20px 20px 0px' }}>
                    <Text type={'Body'} sr={{ alignSelf: 'center', width: '150px' }}><FormattedMessage id="profile.profilePhoto" />: </Text>
                    <Box>
                        <label htmlFor="avatar-upload">
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                            <Avatar
                                src={photo??""}
                                sx={{ width: 50, height: 50, cursor: 'pointer' }}
                            />
                        </label>
                    </Box>
                </Box>

                <EditableField label={<FormattedMessage id="profile.name" />} value={user.name} onSave={(value) => handleUpdate('name', value)} />
                <EditableField label={<FormattedMessage id="profile.surname" />} value={user.surname} onSave={(value) => handleUpdate('surname', value)} />
                <EditableField label={<FormattedMessage id="profile.email" />} value={user.email} onSave={(value) => handleUpdate('email', value)} />
                <EditableField label={<FormattedMessage id="profile.phone" />} value={user.phoneNumber} onSave={(value) => handleUpdate('phone', value)} />
            </Box>
            <Box sx={{ ...ButtonGroup, background: colors.background.secondary, boxShadow: colors.boxShadow }}>
                <SButton type='whiteOutlined' text={<FormattedMessage id="profile.changePassword" />} action={() => setIsPasswordModalOpen(true)} />
                <SButton type='orange' text={<FormattedMessage id="profile.resetPassword" />} />
            </Box>

            <Dialog open={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
                <DialogTitle><FormattedMessage id="profile.changePasswordTitle" /></DialogTitle>
                <DialogContent>
                    <TextField
                        label={<FormattedMessage id="profile.newPassword" />}
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsPasswordModalOpen(false)} color="primary"><FormattedMessage id="profile.cancel" /></Button>
                    <Button onClick={handlePasswordChange} color="primary"><FormattedMessage id="profile.save" /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserProfile;
