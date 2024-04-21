import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Typography } from '@mui/material';

const Category = ({ imageUrl, name, link }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Avatar alt={name} src={imageUrl} sx={{ width: 100, height: 100, marginBottom: 1 }} />
            <Typography variant="h6" align="center" color={"white"}>
                {name}
            </Typography>
        </Link>
    );
};

Category.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default Category;