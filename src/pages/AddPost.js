import React, { useState, useEffect } from "react";
import { Button, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddPost = ({ token }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [existingPost, setExistingPost] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {

        if (postId) {
            fetch(`https://64.227.123.235:8443/post/${postId}`, {
                headers: {
                    "Authorization": `${token}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    setExistingPost(data);
                    setText(data.text);
                })
                .catch(error => console.error("Error fetching post:", error));
        }
    }, [postId, token]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("text", text);
        formData.append("photo", image);
        if (existingPost) {
            
            formData.append("Id", postId);
        }

        try {
            let response;
            if (existingPost) {
                
                response = await fetch("https://64.227.123.235:8443/post/edit", {
                    method: "PATCH",
                    headers: {
                        "Authorization": `${token}`,
                    },
                    body: formData,
                });
            } else {
                
                response = await fetch("https://64.227.123.235:8443/post/insert", {
                    method: "POST",
                    headers: {
                        "Authorization": `${token}`,
                    },
                    body: formData,
                });
            }

            if (!response.ok) throw new Error("Failed to save post");

            setText("");
            setImage(null);
            navigate("/posts");
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, padding: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
                    {existingPost ? "Edit Post" : "Add New Post"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        multiline
                        rows={6}
                        sx={{ mb: 3 }}
                    />
                    
                    <Box sx={{ mb: 3 }}>
                        <input
                            type="file"
                            accept="image/*"
                            id="file-upload"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="file-upload">
                            <Button
                                component="span"
                                variant="outlined"
                                color="success"
                                fullWidth
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "normal",
                                    padding: "10px 20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                startIcon={<CloudUploadIcon />}
                            >
                                {existingPost ? "Change File" : "Choose File"}
                            </Button>
                        </label>
                    </Box>
                    
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        sx={{ mt: 2 }}
                        startIcon={<CheckCircleIcon />}
                    >
                        {existingPost ? "Update Post" : "Upload Post"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddPost;
