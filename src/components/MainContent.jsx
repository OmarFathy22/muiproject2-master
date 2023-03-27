// main
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import logo from "../images/me.jpg";
import React, { useState } from "react";
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
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
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
import AddPostModal from "./postModal/AddPostModal";

const MainContent = ({ theme, showList }) => {
  const [FEELING, setFEELING] = useState(null);
  const [value, loading] = useCollection(
    query(collection(db, "Omar Fathy"), orderBy("id", "desc"))
  );
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
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "Omar Fathy", id));
  };

  const updatePost = async (id, checked, checked2) => {
    await updateDoc(doc(db, "Omar Fathy", id), {
      liked: checked,
      bookmarked: checked2,
    });
  };

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
          <Card
            sx={{ maxWidth: 450, mr: "auto", ml: "auto", mb: "40px" }}
            key={i}
          >
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
                  width="40%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="80%" />}
            />

            <CardContent>
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="100%" />
              </React.Fragment>
            </CardContent>
            <Skeleton
              sx={{ height: 190, mb: "50px" }}
              animation="wave"
              variant="rectangular"
            />
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
                      MenuListProps={{ "aria-labelledby": "fade-button" }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        sx={{ p: "5px 30px" }}
                        onClick={() => {
                          handleClose();
                          // deletePost(post.id);
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem sx={{ p: "5px 30px" }} onClick={handleClose}>
                        Edit
                      </MenuItem>
                    </Menu>
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
              <CardContent>
                <Typography
                  dir="auto"
                  component="p"
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
        })}
        {/* Modal is landing here */}
        <AddPostModal theme={theme} ID={ID} FEELING={FEELING} setFEELING={setFEELING} />
      </Box>
    );
  }
};

export default MainContent;
