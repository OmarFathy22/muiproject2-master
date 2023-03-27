import { useState } from "react";
import { doc } from "firebase/firestore";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import logo from "../images/me.jpg";
import React from "react";

const PostCard = ({ post, theme, cardRefs, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async (id) => {
    const cardIndex = cardRefs.current.findIndex((card) => card.id === id);
    await deleteDoc(doc(db, "Omar Fathy", id));
    cardRefs.current[cardIndex].remove();
  };

  const updatePost = async (id, checked, checked2) => {
    await updateDoc(doc(db, "Omar Fathy", id), {
      liked: checked,
      bookmarked: checked2,
    });
  };

  const sharePost = (id) => {
    // Implement the share functionality here
    console.log(`Sharing post with ID ${id}`);
  };

  const renderMenuItems = (post) => {
    return (
      <React.Fragment>
        <MenuItem
          sx={{ p: "5px 30px" }}
          onClick={() => {
            handleClose();
            deletePost(post.id);
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          sx={{ p: "5px 30px" }}
          onClick={() => {
            handleClose();
            // Implement the edit functionality here
            console.log(`Editing post with ID ${post.id}`);
          }}
        >
          Edit
        </MenuItem>
      </React.Fragment>
    );
  };

  return (
    <Card
      key={index}
      ref={(el) => (cardRefs.current[index] = el)}
      sx={{
        maxWidth: 450,
        mr: "auto",
        ml: "auto",
        mb: "40px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              color: theme.palette.getContrastText(post.data().color),
              bgcolor: post.data().color,
            }}
            aria-label="recipe"
            src={logo}
          >
            {post.data().name}
          </Avatar>
        }
        action={
          <Box component="article">
            <IconButton
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{ "aria-labelledby": "fade-button" }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {renderMenuItems(post)}
            </Menu>
          </Box>
        }
        title={post.data().title}
        subheader={post.data().date}
      />
      {post.data().mediaType === "image" && (
        <CardMedia
          component="img"
          height="300"
          image={post.data().media}
          alt="Paella dish"
        />
      )}
      {post.data().mediaType === "video" && (
        <video src={post.data().media} width="100%" height="300" controls>
          Your browser does not support HTML video.
        </video>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.data().body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Checkbox
          checked={post.data().liked}
          onChange={(e) => {
            updatePost(post.id, e.target.checked, post.data().bookmarked);
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
        />
        <IconButton
          onClick={() => {
            sharePost(post.id);
          }}
          aria-label="share"
        >      <ShareIcon />
        </IconButton>
        <Box sx={{ flexGrow: "1" }} />
        <Checkbox
          onChange={(e) => {
            updatePost(post.id, post.data().liked, e.target.checked);
          }}
          checked={post.data().bookmarked}
          icon={<BookmarkBorderOutlinedIcon />}
          checkedIcon={<BookmarkIcon />}
        />
      </CardActions>
    </Card>
  );
};

export default PostCard;