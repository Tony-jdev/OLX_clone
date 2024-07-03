import React, {useEffect, useState} from 'react';
import {
    Box,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio, FormControl, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/system';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, selectToken, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {parseLocationString, parseLocationToString} from "@/Helpers/locationHelper.js";
import {CreatePost, DeletePostPhoto, EditPost, GetPostById} from "@/Api/postApi.js";
import {useNavigate, useParams} from "react-router-dom";
import {
    fetchPostByIdAsync,
    selectSelectedPost,
    selectSelectedPostId, setSelectedPost,
    setSelectedPostId
} from "@/Storage/Redux/Slices/postSlice.js";
import {fetchUserPostsAsync} from "@/Storage/Redux/Slices/userDataSlice.js";
import {
    addImageBoxStyle,
    fileInputStyle,
    imageBoxStyle,
    imageContainerStyle,
    imageStyle, radioGroupStyle
} from "@/components/Tools/AddPostModal/Styles.js";
import CategoriesSelector from "@/components/Tools/CategoryAndSubCategorySelect/CategoriesSelector.jsx";
import LocationPickerButton from "@/components/Tools/LocationPickerButton/LocationPickerButton.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";

const Container = styled(Box)({
    padding: '10px',
    maxWidth: '1390px',
    margin: '10px auto',
});

const Section = styled(Box)({
    padding: '32px',
    marginBottom: '20px',
    borderRadius: '2px',
});


const CreatePostPage = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const { id } = useParams();
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const postId = useSelector(selectSelectedPostId);
    const post = useSelector(selectSelectedPost);

    const [edit, setEdit] = useState(!!id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [condition, setCondition] = useState('New');
    const [price, setPrice] = useState(1.00);
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [location, setLocation] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    
    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await dispatch(setSelectedPostId(id));
                await dispatch(fetchPostByIdAsync());
            }
           fetch();
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setDescription(post.description);
            setImages(post.photos || []);
            setCondition(post.type || 'New');
            setCategory(post.category.parentId === 0 ? post.category.id : post.category.parentId);
            setSubCategory(post.category.parentId !== 0 ? post.category.id : null);
            setLocation(parseLocationString(post.location));
            setPrice(post.price || 0.00);
        }
    }, [post]);

    useEffect(() => {
        if (token) {
            dispatch(fetchUserDataAsync());
        }
    }, [token, dispatch]);

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
                const loc = typeof location === 'string' ? location : parseLocationToString(location);
                const UpdatePost = {
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

                edit ? await EditPost(post.id, UpdatePost) : await CreatePost(UpdatePost);
                dispatch(fetchUserPostsAsync());
                clearFields();
                navigate(-1);
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
        navigate(-1);
    };
    
    return (
        <Container>
            <Text type="Headline" sr={{margin: '10px 0px 30px 0px'}} text={edit ? "Редагувати оголошення" : "Додати оголошення"} />
            <Section sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <Text type="Title" sr={{margin: '10px 0px 10px 0px'}} text={'Опишіть у подробицях'} />
                <TextField
                    label={<Text type="Body" text="Назва" />}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    style={{maxWidth: '924px'}}
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title}
                    inputProps={{ maxLength: 75 }}
                />
                <Box display={'flex'} maxWidth={'924px'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Text type="Label" text={'Введіть щонайменше 3 символи '}
                          color={colors.text.secondary}
                          sx={{position: 'absolute', bottom: '-20px', right: '10px'}}/>
                    
                    <Text type="Label" text={`${title?.length ?? '0'} / 75 символів`}
                          color={colors.text.secondary}
                          sx={{position: 'absolute', bottom: '-20px', right: '10px'}}/>
                </Box>
                <TextField
                    label={<Text type="Body" text="Опис" />}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    style={{maxWidth: '832px', }}
                    multiline
                    rows={12}
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description}
                    inputProps={{ maxLength: 1250 }}
                />
                <Box display={'flex'} maxWidth={'832px'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Text type="Label" text={'Введіть щонайменше 3 символи '}
                          color={colors.text.secondary}
                          sx={{position: 'absolute', bottom: '-20px', right: '10px'}}/>

                    <Text type="Label" text={`${description?.length ?? '0'} / 1250 символів`}
                          color={colors.text.secondary}
                          sx={{position: 'absolute', bottom: '-20px', right: '10px'}}/>
                </Box>
                <TextField
                    label={<Text type="Body" text="Ціна (грн)" />}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    style={{maxWidth: '300px'}}
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price}
                    type="number"
                    inputProps={{ step: "1", min: "1", max: "1000000", pattern: '[1-9]+([.,][0-9]{1,2})?' }}
                />
            </Section>

            <Section sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <Text type="Title" sr={{padding: '6px 8px'}} text={`Додати фото (${images.length} / 10)`} />
                <Text type="Body" sr={{padding: '6px 8px'}} text={'Переше фото буде на обкладенці оголошення'} />
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
                            background: '#FFEBCC',
                            boxShadow: colors.boxShadow,
                            '&:hover': {
                                background: '#FFEBCC',
                                boxShadow: colors.types.shadows.boxShadowDefault,
                            },
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={fileInputStyle}
                                onChange={handleImageChange}
                            />
                            <Box sx={{...addImageBoxStyle, color: colors.text.revers}}><AddPhotoAlternateIcon sx={{color: colors.text.orange}}/></Box>
                        </Box>
                    )}
                </Box>
                {errors.images && <Text type="Body" text={errors.images} color={colors.types.error} />}
            </Section>

            <Section sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <CategoriesSelector
                    category={category}
                    subCategory={subCategory}
                    onCategorySelect={setCategory}
                    onSubCategorySelect={setSubCategory}
                />
                {errors.category && <Text type="Body" text={errors.category} color={colors.types.error} />}
            </Section>

            <Section sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <LocationPickerButton Color={colors.text.revers} setLocation={setLocation} location={location} />
            </Section>

            <Section sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
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
            </Section>

            <Section sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <SButton
                    type='carouselButton'
                    sl={{ backgroundColor: colors.background.secondary, }}
                    Color={colors.text.revers}
                    hoverColor={colors.text.primary}
                    hoverBack={colors.types.error}
                    sr={{padding: '10px', marginRight: '20px', border: '1px solid black'}}
                    textType={'Body'}
                    text={'Скасувати'}
                    action={handleCloseAndClear}
                />
                <SButton
                    type='orangeRoundButton'
                    borderInVisible={true}
                    sl={{ background: colors.background.darkGradient }}
                    Color={colors.text.primary}
                    hoverColor={colors.text.primary}
                    hoverBack={colors.types.success}
                    sr={{padding: '10px', marginRight: '10px', borderRadius: '30px 0px 30px 30px', border: '1px solid black'}}
                    text={edit ? 'Редагувати пост' : 'Створити пост'}
                    action={handleSubmit}
                />
            </Section>

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
        </Container>
    );
};

export default CreatePostPage;
