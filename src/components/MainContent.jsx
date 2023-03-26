import { Box, Checkbox, Fade, Menu, MenuItem, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";
import AddPostModal from "./postModal/AddPostModal";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import logo from "../images/me.jpg";
import React from "react";
import { doc } from "firebase/firestore";


const MainContent = ({ theme, showList }) => {
  const [value, loading] = useCollection(collection(db, "Omar Fathy"));

  const [anchorEl, setAnchorEl] = useState(null);
  const n = 8;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ID = new Date().getTime().toString();
  const deletePost = async(id) => {
    await deleteDoc(doc(db, "Omar Fathy", id));
  }
  const updatePost = async(id , checked , checked2) => {
    await updateDoc(doc(db, "Omar Fathy", id), {
      liked: checked ,
      bookmarked: checked2,
    });
  }
  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: "1",
          pt: "100px",
          pl: { xs: "12px" },
          pr: { xs: "12px" },
          justifyContent: "center",
        }}
      >
        {[...Array(n)].map((e, i) => (
          <Card sx={{ maxWidth: 450, mr: "auto", ml: "auto", mb: "40px" }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />

            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }
  if (value) {
    return (
      <Box
        sx={{
          flexGrow: "1",
          pt: "100px",
          pl: { xs: "12px" },
          pr: { xs: "12px" },
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
        }}
      >
        {value.docs.map((post, index) => {
          return (
            <Card
              key={index}
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
                      onClick={handleClick}
                      aria-label="settings"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                      sx={{ p: "5px 30px" }} onClick={() => {
                        handleClose();
                        deletePost(post.id);
                      }}>
                        Delete
                      </MenuItem>
                      <MenuItem sx={{ p: "5px 30px" }} onClick={handleClose}>
                        Edit
                      </MenuItem>

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
                <video
                  src={post.data().media}
                  width="100%"
                  height="300"
                  controls
                >
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
                    updatePost(post.id , e.target.checked , post.data().bookmarked);
                  }}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Box sx={{ flexGrow: "1" }} />
                <Checkbox
                  onChange={(e) => {
                    updatePost(post.id , post.data().liked , e.target.checked);
                  }}
                  checked={post.data().bookmarked}
                  icon={<BookmarkBorderOutlinedIcon />}
                  checkedIcon={<BookmarkIcon />}
                />
              </CardActions>
            </Card>
          );
        })}
        {/* Modal is landing here */}
        <AddPostModal theme={theme} ID={ID} />
        <h1 id = "last_post" style={{visibility:"hidden"}} >Omar fathy</h1>
      </Box>
    );
  }
};

export default MainContent;
