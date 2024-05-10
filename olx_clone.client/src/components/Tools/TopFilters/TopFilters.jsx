import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';


const TopFilters = () => {
    const sortingOptions = [
        { value: 'postTop', label: 'Товар: рекомендовані' },
        { value: 'priceAsc', label: 'Ціна: за зростанням' },
        { value: 'priceDesc', label: 'Ціна: за спаданням' },
        { value: 'nameAsc', label: 'Назва: за алфавітом' },
        { value: 'nameDesc', label: 'Назва: за зворотнім алфавітом' },
    ];

    return (
        <Box display="flex" alignItems="center">
            <Typography variant="body1">Сортувати за:</Typography>
            <Select defaultValue={sortingOptions[0].value}>
                {sortingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <Typography variant="body1" sx={{ marginLeft: '16px' }}>Валюта: ₴</Typography>
        </Box>
    );
};

export default TopFilters;
