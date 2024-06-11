import {Avatar, Box, Button, Typography} from "@mui/material";
import {Delete, Edit, Favorite, Share, Visibility} from "@mui/icons-material";
import React from "react";

const PostWideCard = ({ ad }) => {
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '20px',
            backgroundColor: '#fff',
        }}>
            <Avatar src={ad.image} variant="rounded" sx={{ width: '100px', height: '100px', marginRight: '20px' }} />
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{ad.title}</Typography>
                <Typography variant="body2">{ad.category}</Typography>
                <Typography variant="body2">{ad.date}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Button variant="outlined" color="primary" startIcon={<Edit />}>Редагувати</Button>
                    <Button variant="outlined" color="secondary" startIcon={<Delete />} sx={{ marginLeft: '10px' }}>Деактивувати</Button>
                    <Button variant="outlined" color="success" startIcon={<Visibility />} sx={{ marginLeft: '10px' }}>Рекламувати</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>{ad.price} ₴</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Visibility sx={{ marginRight: '5px' }} />{ad.views}
                    <Favorite sx={{ marginLeft: '10px', marginRight: '5px' }} />{ad.likes}
                    <Share sx={{ marginLeft: '10px', marginRight: '5px' }} />{ad.shares}
                </Box>
            </Box>
        </Box>
    );
};

export default PostWideCard;