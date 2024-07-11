import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectOrderBy, setOrderBy } from "@/Storage/Redux/Slices/postSlice.js";
import { FormattedMessage } from 'react-intl';

const TopFilters = () => {
    const dispatch = useDispatch();
    const orderBy = useSelector(selectOrderBy);

    const sortingOptions = [
        { value: 'def', label: <FormattedMessage id="topFilters.recommended" /> },
        { value: 'asc', label: <FormattedMessage id="topFilters.priceAsc" /> },
        { value: 'desc', label: <FormattedMessage id="topFilters.priceDesc" /> },
    ];

    const handleChange = (event) => {
        const { value } = event.target;
        dispatch(setOrderBy(value));
    };

    return (
        <Box display="flex" alignItems="center" style={{ marginTop: 30, marginBottom: 30 }}>
            <Typography variant="body1">
                <FormattedMessage id="topFilters.sortBy" />
            </Typography>
            <Select defaultValue={orderBy || sortingOptions[0].value}
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
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <Typography variant="body1" sx={{ marginLeft: '16px' }}>
                <FormattedMessage id="topFilters.currency" />
            </Typography>
        </Box>
    );
};

export default TopFilters;
