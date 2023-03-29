import logo from "../images/me.jpg";
import React, {useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
function Post({theme,showList,ID,deletePost,updatePost , value , loading , post}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
      <Card
          key={post.date}
          sx={{ maxWidth: 450, mr: "auto", ml: "auto", mb: "40px" }}
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
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  aria-label="settings"
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            }
            
            title={!post.data().feeling?<Typography
              sx={{  fontWeight: "300"}}
              variant="body1" color="inherit">{post.data().title} </Typography>: (
              <Stack direction="row">
              <Typography
               sx={{  fontWeight: "300"}}
               variant="body1" color="inherit">{post.data().title} </Typography>
              <Typography
               sx={{ ml: "5px" ,color:theme.palette.primary.main ,   fontWeight: "500"}}
               variant="body1" color="inherit">feels </Typography>
               <Typography
               sx={{ ml: "5px"  ,textTransform:"capitalize",  fontWeight: "500"}}
               variant="body1" color="inherit">{post.data().feeling} </Typography>
              </Stack>
            )}
            subheader={post.data().date}
          />
            <Menu
                  id="fade-menu"
                  MenuListProps={{ "aria-labelledby": "fade-button" }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}

                >
                  <MenuItem 
                    sx={{ p: "5px 30px" }}
                    onClick={(eo) => {
                      handleClose();
                      deletePost(post.id);
                    

                    }}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem sx={{ p: "5px 30px" }} onClick={handleClose}>
                    Edit
                  </MenuItem>
                </Menu>
          <CardContent>
            <Typography
              dir="auto"
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {post.data().body}
            </Typography>
          </CardContent>
          {post.data().mediaType === "image" && (
            <CardMedia
              component="img"
              height="300"
              image={post.data().media}
              alt="Paella dish"
            />
          )}
          {post.data().mediaType === "video" && (
            <video
              src={post.data().media}
              width="100%"
              height="300"
              controls
            >
              Your browser does not support HTML video.
            </video>
          )}

          <CardActions disableSpacing>
            <Checkbox
              // hover
              sx={{
                "&:hover": {
                  backgroundColor:{xs:"transparent",md:"rgba(255, 255, 255, 0.08)"},
                },
              }}
              checked={post.data().liked}
              onChange={(e) => {
                updatePost(
                  post.id,
                  e.target.checked,
                  post.data().bookmarked
                );
              }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <IconButton
            sx={{
              "&:hover": {
                backgroundColor:{xs:"transparent",md:"rgba(255, 255, 255, 0.08)"},
              },
            }}
            aria-label="share">
              <ShareIcon />
            </IconButton>
            <Box sx={{ flexGrow: "1" }} />
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor:{xs:"transparent",md:"rgba(255, 255, 255, 0.08)"},
                },
              }}
              onClick={() => {
                deletePost(post.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Checkbox
              sx={{
                "&:hover": {
                  backgroundColor:{xs:"transparent",md:"rgba(255, 255, 255, 0.08)"},
                },
              }}
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
}

export default Post;