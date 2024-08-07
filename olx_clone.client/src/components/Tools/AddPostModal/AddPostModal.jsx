import React, { useEffect, useState } from 'react';
import {
    Box, Modal, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Text from '@/components/Tools/TextContainer/Text.jsx';
import SButton from '@/components/Tools/Button/SButton.jsx';
import {
    addImageBoxStyle,
    fileInputStyle,
    imageBoxStyle,
    imageContainerStyle, imageStyle, modalStyle,
    radioGroupStyle
} from './Styles.js';
import LocationPickerButton from "@/components/Tools/LocationPickerButton/LocationPickerButton.jsx";
import CategoriesSelector from "@/components/Tools/CategoryAndSubCategorySelect/CategoriesSelector.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataAsync, selectToken, selectUser } from "@/Storage/Redux/Slices/userInfoSlice.js";
import { CreatePost, EditPost, GetPostById, DeletePostPhoto } from "@/Api/postApi.js";
import {parseLocationString, parseLocationToString} from "@/Helpers/locationHelper.js";
import {fetchUserPostsAsync} from "@/Storage/Redux/Slices/userDataSlice.js";

const AddPostModal = ({ open, handleClose, edit, post }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    const id = edit && post ? post.id : -1;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [condition, setCondition] = useState('New');
    const [price, setPrice] = useState(0.00);
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [location, setLocation] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState(null);

    useEffect(() => {
        if (edit && post) {
            const fetchPost = async () => {
                try {
                    const fetchedPost = await GetPostById(post.sku);
                    console.log(fetchedPost);
                    setTitle(fetchedPost.data.title);
                    setDescription(fetchedPost.data.description);
                    setImages(fetchedPost.data.photos || []);
                    setCondition(fetchedPost.data.type || 'New');
                    setCategory(fetchedPost.data.category.parentId === 0 ? fetchedPost.data.category.id : fetchedPost.data.category.parentId);
                    setSubCategory(fetchedPost.data.category.parentId !== 0 ? fetchedPost.data.category.id : null);
                    setLocation(parseLocationString(fetchedPost.data.location));
                    setPrice(fetchedPost.data.price || 0.00);
                } catch (error) {
                    console.error("Failed to fetch post data:", error);
                }
            };
            fetchPost();
        }
    }, [open]);

    useEffect(() => {
        if (token) {
            dispatch(fetchUserDataAsync());
        }
    }, [token]);

    const handleImageChange = (event) => {
        if (images.length < 10) {
            const files = Array.from(event.target.files);
            setImages((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleImageRemove = (index) => {
        setConfirmDelete(true);
        setPhotoToDelete(index);
    };

    const confirmImageRemove = async () => {
        const imageToDelete = images[photoToDelete];
        if (edit && imageToDelete.id) {
            console.log(imageToDelete.id+"  T  "+ token);
            try {
                await DeletePostPhoto(imageToDelete.id, token);
            } catch (error) {
                console.error('Failed to delete photo:', error);
            }
        }
        setImages((prevImages) => prevImages.filter((_, i) => i !== photoToDelete));
        setConfirmDelete(false);
        setPhotoToDelete(null);
    };

    const handleSubmit = async () => {
        const newErrors = {};

        if (title.length < 3 || title.length > 500) {
            newErrors.title = 'Назва повинна містити від 3 до 500 символів.';
        }

        if (description.length < 3 || description.length > 500) {
            newErrors.description = 'Опис повинен містити від 3 до 500 символів.';
        }

        if (images.length === 0) {
            newErrors.images = 'Необхідно додати хоча б одну фотографію.';
        }

        if (!category) {
            newErrors.category = 'Необхідно вибрати категорію.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                console.log("cat:"+ category+ " subcat:"+ subCategory + " = " + subCategory === null ? category: subCategory);
                const loc = typeof location === 'string' ? location : parseLocationToString(location);
                const post = {
                    title,
                    description,
                    type: condition,
                    location: loc,
                    price: parseFloat(price),
                    categoryId: subCategory === null ? category: subCategory,
                    applicationUserId: user.userId,
                    files: images
                };
                console.log(post);
                console.log(id);
                
                edit ? await EditPost(id, post) : await CreatePost(post);
                dispatch(fetchUserPostsAsync());
                clearFields();
                handleClose();
            } catch (error) {
                setErrors({ submit: 'Failed to create post' });
            }
        }
    };

    const clearFields = () => {
        setTitle('');
        setDescription('');
        setImages([]);
        setCondition('New');
        setErrors({});
        setCategory(null);
        setSubCategory(null);
        setLocation('');
        setPrice(0.00);
    };

    const handleCloseAndClear = () => {
        clearFields();
        handleClose();
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleCloseAndClear}
                aria-labelledby="add-post-modal"
                aria-describedby="add-post-modal-description"
            >
                <Box sx={{...modalStyle, background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                    <Text type="Headline" text={edit ? "Редагувати оголошення" : "Додати оголошення"} />
                    <Grid container justifyContent={"start"}>
                        <Box sx={{width: '400px', marginRight: '20px', position: 'relative'}}>
                            <TextField
                                label={<Text type="Body" text="Назва" />}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                margin="normal"
                                error={!!errors.title}
                                helperText={errors.title}
                                fullWidth
                                inputProps={{ maxLength: 500 }}
                            />
                            <Text type="Label" text={`${title?.length ?? '0'} / 500 символів`} color={colors.text.secondary} sx={{ position: 'absolute', bottom: '-20px', right: '10px' }} />
                            <TextField
                                label={<Text type="Body" text="Опис" />}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description}
                                inputProps={{ maxLength: 500 }}
                            />
                            <Text type="Label" text={`${description?.length ?? '0'} / 500 символів`} color={colors.text.secondary} sx={{ position: 'absolute', bottom: '-20px', right: '10px' }} />
                            <TextField
                                label={<Text type="Body" text="Ціна (грн)" />}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                fullWidth
                                margin="normal"
                                error={!!errors.price}
                                helperText={errors.price}
                                type="number"
                                inputProps={{ step: "1", min: "1", max: "1000000", pattern: '[0-9]+([.,][0-9]{1,2})?' }}
                            />
                            <CategoriesSelector
                                category={category}
                                subCategory={subCategory}
                                onCategorySelect={setCategory}
                                onSubCategorySelect={setSubCategory}
                            />
                            {errors.category && <Text type="Body" text={errors.category} color={colors.types.error} />}
                        </Box>
                        <Box sx={{width: '400px'}}>
                            <Text type="Body" sr={{padding: '6px 8px'}} text={`Додати картинку (${images.length} / 10)`} />
                            <Box sx={{...imageContainerStyle, display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '6px 8px'}}>
                                {images.map((image, index) => (
                                    <Box key={index} sx={{
                                        ...imageBoxStyle,
                                        boxShadow: colors.boxShadow,
                                        '&:hover': {
                                            background: colors.types.error,
                                            boxShadow: colors.types.shadows.boxShadowError,
                                        },
                                    }} onClick={() => handleImageRemove(index)}>
                                        <img src={image?.photoUrl ? image.photoUrl : URL.createObjectURL(image)} alt={`uploaded ${index}`} style={{...imageStyle}} />
                                    </Box>
                                ))}
                                {images.length < 10 && (
                                    <Box sx={{
                                        ...imageBoxStyle,
                                        background: colors.text.secondary,
                                        boxShadow: colors.boxShadow,
                                        '&:hover': {
                                            background: colors.types.success,
                                            boxShadow: colors.types.shadows.boxShadowSuccess,
                                        },
                                    }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={fileInputStyle}
                                            onChange={handleImageChange}
                                        />
                                        <Box sx={{...addImageBoxStyle, color: colors.text.revers}}>+</Box>
                                    </Box>
                                )}
                            </Box>
                            {errors.images && <Text type="Body" text={errors.images} color={colors.types.error} />}
                            <FormControl sx={{width: '100%', padding: '6px 8px'}}>
                                <FormLabel><Text type="Body" text="Стан товару" /></FormLabel>
                                <RadioGroup
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                    row
                                    sx={radioGroupStyle}
                                >
                                    <FormControlLabel value="New" control={<Radio />} label={<Text type="Body" text="Новий" />} />
                                    <FormControlLabel value="Used" control={<Radio />} label={<Text type="Body" text="Б/У" />} />
                                </RadioGroup>
                            </FormControl>
                            <LocationPickerButton Color={colors.text.revers} setLocation={setLocation} location={location}/>
                        </Box>
                    </Grid>
                    <Grid container justifyContent="space-around" sx={{padding: '20px'}}>
                        <SButton
                            type='whiteOutlined'
                            borderInVisible={true}
                            sl={{ backgroundColor: colors.background.secondary, boxShadow: colors.types.shadows.boxShadowError }}
                            Color={colors.types.error}
                            hoverColor={colors.text.primary}
                            hoverBack={colors.types.error}
                            sr={{padding: '10px'}}
                            textType={'Body'}
                            text={'Скасувати'}
                            action={handleCloseAndClear}
                        />
                        <SButton
                            type='whiteOutlined'
                            borderInVisible={true}
                            sl={{ backgroundColor: colors.background.success, boxShadow: colors.types.shadows.boxShadowSuccess }}
                            Color={colors.types.success}
                            hoverColor={colors.text.primary}
                            hoverBack={colors.types.success}
                            text={edit ? 'Редагувати пост' : 'Створити пост'}
                            action={handleSubmit}
                        />
                    </Grid>
                </Box>
            </Modal>

            <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                BackdropProps={{
                    style: { backgroundColor: 'transparent' },
                }}
                PaperProps={{
                    sx: { background: colors.background.secondary, boxShadow: colors.boxShadow },
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: colors.types.error }}>
                    {"Підтвердження видалення"}
                </DialogTitle>
                <DialogContent sx={{ color: colors.text.revers }}>
                    <DialogContentText id="alert-dialog-description" sx={{ color: colors.text.revers }}>
                        Ви впевнені, що хочете видалити це фото?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)} color="primary" sx={{ color: colors.text.revers }}>
                        Скасувати
                    </Button>
                    <Button onClick={confirmImageRemove} color="error" sx={{ color: colors.types.error }}>
                        Видалити
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddPostModal;
