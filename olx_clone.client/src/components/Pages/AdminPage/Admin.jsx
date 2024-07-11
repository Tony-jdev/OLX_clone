import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { selectPosts, setPosts } from '@/Storage/Redux/Slices/postSlice.js';
import { isAdmin } from '@/Storage/Redux/Slices/userInfoSlice.js';
import { getPostsByStatus, updatePostStatus } from "@/Api/postApi.js";

const AdminPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const admin = useSelector(isAdmin);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (admin) {
            loadPosts();
        }
    }, [admin]);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const response = await getPostsByStatus('PendingApproval');
            dispatch(setPosts(response.data.posts));
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (postId) => {
        setLoading(true);
        try {
            await updatePostStatus(postId, 'rejected');
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
            await updatePostStatus(postId, 'accepted');
            loadPosts();
        } catch (error) {
            console.error('Failed to accept post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!admin) {
        return <Box>Access Denied</Box>;
    }

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Button variant="contained" color="primary" onClick={loadPosts} disabled={loading} sx={{ mb: 2 }}>
                    Refresh List
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
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.description}</TableCell>
                                    <TableCell>{post.price}</TableCell>
                                    <TableCell>{post.category.title}</TableCell>
                                    <TableCell>{post.location}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleReject(post.id)} disabled={loading} sx={{ mr: 1 }}>
                                            Reject
                                        </Button>
                                        <Button variant="contained" color="success" onClick={() => handleAccept(post.id)} disabled={loading}>
                                            Accept
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default AdminPage;
