import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { selectPosts, setPosts } from '@/Storage/Redux/Slices/postSlice.js';
import { isAdmin, logOut } from '@/Storage/Redux/Slices/userInfoSlice.js';
import { getPostsByStatus, updatePostStatus } from "@/Api/postApi.js";
import {Navigate, useNavigate} from "react-router-dom";

const AdminPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const admin = useSelector(isAdmin);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPostPhoto, setSelectedPostPhoto] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            loadPosts();
        }
    }, [admin]);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const response = await getPostsByStatus('PendingApproval');
            console.log(response);
            dispatch(setPosts(response.data));
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (postId) => {
        setLoading(true);
        try {
            await updatePostStatus(postId, 4);
            loadPosts();
        } catch (error) {
            console.error('Failed to reject post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (postId) => {
        setLoading(true);
        try {
            await updatePostStatus(postId, 0);
            loadPosts();
        } catch (error) {
            console.error('Failed to accept post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/')
    };

    const handleViewPhoto = (photoUrl) => {
        setSelectedPostPhoto(photoUrl);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPostPhoto('');
    };

    if (!admin) {
        return <Box>Access Denied</Box>;
    }

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Button variant="contained" color="primary" onClick={loadPosts} disabled={loading} sx={{ mb: 2, mr: 2 }}>
                    Refresh List
                </Button>
                <Button variant="contained" color="secondary" onClick={handleLogOut} sx={{ mb: 2 }}>
                    Log Out
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts && posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.description}</TableCell>
                                    <TableCell>{post.price}</TableCell>
                                    <TableCell>{post.category?.title}</TableCell>
                                    <TableCell>{post.location}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleReject(post.id)} disabled={loading} sx={{ mr: 1 }}>
                                            Reject
                                        </Button>
                                        <Button variant="contained" color="success" onClick={() => handleAccept(post.id)} disabled={loading} sx={{ mr: 1 }}>
                                            Accept
                                        </Button>
                                        <Button variant="contained" onClick={() => handleViewPhoto(post.photoUrl)} disabled={loading}>
                                            View Photo
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle>Post Photo</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                src={selectedPostPhoto}
                                alt="Post Photo"
                                loading="lazy"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default AdminPage;
