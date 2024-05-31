import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {selectOrderBy, setOrderBy} from "@/Storage/Redux/Slices/postSlice.js";


const TopFilters = () => {
    const dispatch = useDispatch();
    const orderBy = useSelector(selectOrderBy);
    
    const sortingOptions = [
        { value: 'def', label: 'Товар: рекомендовані' },
        { value: 'asc', label: 'Ціна: за зростанням' },
        { value: 'desc', label: 'Ціна: за спаданням' },
    ];

    const handleChange = (event) => {
        const { value } = event.target;
        dispatch(setOrderBy(value));
    };
    
    return (
        <Box display="flex" alignItems="center" style={{marginTop: 30, marginBottom: 30}}>
            <Typography variant="body1">Сортувати за:</Typography>
            <Select defaultValue={orderBy}
                    sx={{
                        marginLeft: '5px',

                        '& .MuiSelect-select': {
                            paddingTop: '5px !important',
                            paddingBottom: '5px !important',
                            paddingLeft: '5px !important',
                        },
                    }}
                    onChange={handleChange}
            >
                {sortingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <Typography variant="body1" sx={{ marginLeft: '16px' }}>Валюта: ₴</Typography>
        </Box>
    );
};

export default TopFilters;
