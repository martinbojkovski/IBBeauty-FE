import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    Container, Box, Button, Grid, Card, CardMedia, CardContent, Typography,
    Pagination, Dialog, DialogTitle, DialogContent, DialogActions, Fab, useMediaQuery
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const Posts = ({ token }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        validateToken();
        fetchPosts();
    }, [page]);

    const validateToken = () => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp < Date.now() / 1000) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            }
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/post/paginated?page=${page}&size=10`);
            if (!response.ok) throw new Error("Failed to fetch posts");
            const data = await response.json();
            setPosts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handlePageChange = (event, value) => setPage(value - 1);
    const handleEditPost = (postId) => navigate(`/posts/edit/${postId}`);
    const handleAddPost = () => navigate("/posts/add-post");

    const handleDeletePost = async () => {
        try {
            await fetch(`/api/post/delete/${postToDelete.Id}`, {
                method: "DELETE",
                headers: { "Authorization": `${token}` },
            });
            setPosts(posts.filter(post => post.Id !== postToDelete.Id));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", backgroundColor: "#f9f9f9", paddingBottom: "80px" }}>
            <Container maxWidth={isMobile ? "xs" : "md"}>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", textAlign: "center", margin: "20px 0", color: "#004d40" }}>
                    Posts
                </Typography>
                <Grid container spacing={isMobile ? 1 : 2} justifyContent="center">
                    {posts.map((post) => (
                        <Grid item xs={12} key={post.Id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
                                <CardMedia
                                    component="img"
                                    height={isMobile ? "200" : "400"}
                                    image={`data:image/png;base64,${post.photo}`}
                                    alt="Post image"
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent>
                                    <Typography variant="body1" sx={{ fontSize: isMobile ? "0.9rem" : "1rem", lineHeight: 1.5 }}>
                                        {post.text}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        Published: {post.datePublished}
                                    </Typography>
                                    {isLoggedIn && (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                            <Button variant="contained" color="primary" onClick={() => handleEditPost(post.Id)} startIcon={<Edit />}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<Delete />}
                                                onClick={() => { setPostToDelete(post); setOpenDeleteDialog(true); }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", marginY: 3 }}>
                    <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
                </Box>
            </Container>

            {isLoggedIn && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "fixed",
                        bottom: 50,
                        right: 16,
                        backgroundColor: "#004d40",
                        width: isMobile ? 50 : 56,
                        height: isMobile ? 50 : 56,
                    }}
                    onClick={handleAddPost}
                >
                    <Add fontSize={isMobile ? "small" : "medium"} />
                </Fab>
            )}

            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this post?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined" color="success">Cancel</Button>
                    <Button onClick={handleDeletePost} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Posts;
