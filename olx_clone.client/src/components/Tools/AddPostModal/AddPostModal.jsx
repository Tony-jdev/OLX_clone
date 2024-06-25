import React, {useEffect, useState} from 'react';
import {
    Box,
    Modal,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid
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
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, selectToken, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {CreatePost} from "@/Api/postApi.js";
//import { createPost } from '@/api/postApi';

const AddPostModal = ({ open, handleClose }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [condition, setCondition] = useState('new');
    const [price, setPrice] = useState(0.00);
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [location, setLocation] = useState('');


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
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
                const post = {
                    title,
                    description,
                    type: condition,
                    location,
                    price: parseFloat(price),
                    categoryId: subCategory || category,
                    applicationUserId: user.userId,
                    files: images
                };
                console.log(post);
                await CreatePost(post);
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
        setCondition('new');
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
        <Modal
            open={open}
            onClose={handleCloseAndClear}
            aria-labelledby="add-post-modal"
            aria-describedby="add-post-modal-description"
        >
            <Box sx={{...modalStyle, background: colors.background.secondary}}>
                <Text type="Headline" text="Додати оголошення" />
                <Grid container justifyContent={"start"}>
                    <Box sx={{width: '400px', marginRight: '20px', position: 'relative'}}>
                        <TextField
                            label={<Text type="Body" text="Назва" />}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!errors.title}
                            helperText={errors.title}
                            inputProps={{ maxLength: 500 }}
                        />
                        <Text type="Label" text={`${title.length} / 500 символів`} color={colors.text.secondary} sx={{ position: 'absolute', bottom: '-20px', right: '10px' }} />
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
                        <Text type="Label" text={`${description.length} / 500 символів`} color={colors.text.secondary} sx={{ position: 'absolute', bottom: '-20px', right: '10px' }} />
                        <TextField
                            label={<Text type="Body" text="Ціна (грн)" />}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!errors.price}
                            helperText={errors.price}
                            type="number"
                            inputProps={{ step: "0.01", min: "0", max: "1000000", pattern: '[0-9]+([.,][0-9]{1,2})?' }}
                        />
                        <CategoriesSelector
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
                                    <img src={URL.createObjectURL(image)} alt={`uploaded ${index}`} style={{...imageStyle}} />
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
                                <FormControlLabel value="Usd" control={<Radio />} label={<Text type="Body" text="Б/У" />} />
                            </RadioGroup>
                        </FormControl>
                        <LocationPickerButton Color={colors.text.revers} setLocation={setLocation} />
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
                        text={'Створити пост'}
                        action={handleSubmit}
                    />
                </Grid>
            </Box>
        </Modal>
    );
};

export default AddPostModal;
