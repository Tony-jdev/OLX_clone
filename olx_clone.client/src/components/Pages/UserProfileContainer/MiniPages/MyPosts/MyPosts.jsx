import React from 'react';
import { Box, Grid, Typography, Button, Avatar, Tab, Tabs } from '@mui/material';
import PostWideCard from "@/components/Tools/PostWideCard/PostWideCard.jsx";
import Text from "@/components/Tools/TextContainer/Text.jsx";

const ads = [
    {
        id: 1,
        title: 'Віддамо котика на ім\'я Борис Васильович',
        image: 'https://via.placeholder.com/100',
        category: 'Тварини/Коти',
        date: 'Активне до: 20 травня 2024р.',
        price: '5000',
        views: 15,
        likes: 25,
        shares: 3
    },
    {
        id: 2,
        title: 'Віддамо котика на ім\'я Борис Васильович',
        image: 'https://via.placeholder.com/100',
        category: 'Тварини/Коти',
        date: 'Активне до: 20 травня 2024р.',
        price: '5000',
        views: 15,
        likes: 25,
        shares: 3
    },
    {
        id: 3,
        title: 'Віддамо котика на ім\'я Борис Васильович',
        image: 'https://via.placeholder.com/100',
        category: 'Тварини/Коти',
        date: 'Активне до: 20 травня 2024р.',
        price: '5000',
        views: 15,
        likes: 25,
        shares: 3
    }
];

const AdList = () => {
    return (
        <Box>
            {ads.map(ad => (
                <PostWideCard key={ad.id} ad={ad} />
            ))}
            <Typography variant="body2" sx={{ textAlign: 'right', marginTop: '10px' }}>Всього оголошень: {ads.length}</Typography>
        </Box>
    );
};

const MyPosts = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <Tabs value={selectedTab} onChange={handleChange} aria-label="profile tabs">
                <Tab label="Активні" />
                <Tab label="Очікують" />
                <Tab label="Неактивні" />
                <Tab label="Відхилені" />
            </Tabs>
            <Box sx={{marginTop: '20px'}}>
                {selectedTab === 0 && <AdList />}
                {selectedTab === 1 && <Typography>Очікують</Typography>}
                {selectedTab === 2 && <Text text={'Неактивні'}/>}
                {selectedTab === 3 && <Typography>Відхилені</Typography>}
            </Box>
        </Box>
    );
};

export default MyPosts;
