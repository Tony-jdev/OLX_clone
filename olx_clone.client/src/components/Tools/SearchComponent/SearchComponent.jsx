import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);

    const regions = [
        {
            id: 1,
            name: 'Lviv',
            cities: ['Lviv', 'Brodivka', 'Stryi']
        },
        {
            id: 2,
            name: 'Kyiv',
            cities: ['Kyiv', 'Bucha', 'Irpin']
        }
    ];

    const handleRegionChange = (event) => {
        const region = regions.find(region => region.name === event.target.value);
        setSelectedRegion(event.target.value);
        setCities(region ? region.cities : []);
        setSelectedCity('');
    };

    const handleSearch = () => {
        // Логіка для обробки пошукового запиту
        console.log('Search query:', searchQuery);
        console.log('Selected region:', selectedRegion);
        console.log('Selected city:', selectedCity);
    };

    return (
        <Grid container spacing={0} marginTop={10} marginBottom={6} justifyContent='space-between' maxWidth="1440" width='100%'>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Search Product"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, borderTopLeftRadius:4, borderBottomLeftRadius:4 } }}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0} }}>
                    <InputLabel>Region</InputLabel>
                    <Select
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        label="Region"
                    >
                        <MenuItem value="">Select Region</MenuItem>
                        {regions.map(region => (
                            <MenuItem key={region.id} value={region.name}>
                                {region.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}>
                    <InputLabel>City</InputLabel>
                    <Select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        label="City"
                    >
                        <MenuItem value="">Select City</MenuItem>
                        {cities.map(city => (
                            <MenuItem key={city} value={city}>{city}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={2} >
                <Button style={{height:'100%', width:'100%', borderRadius:0, borderTopRightRadius:4, borderBottomRightRadius:4 }} variant="contained" color="primary" onClick={handleSearch}>Search</Button>
            </Grid>
        </Grid>
    );
};

export default SearchComponent;
