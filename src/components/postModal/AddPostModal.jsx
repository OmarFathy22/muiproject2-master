import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Fab, Stack, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import PostButton from "./PostButton";
import { db, storage } from "../../firebase/config";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import logo from "../../images/me.jpg";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";
import { useSnackbar } from "notistack";
import SNACKBAR from "./Snackbar";
import FeelingMENU from "./feelingMENU";
import MentionMENU from "./mentionMENU";


export default function TransitionsModal({ theme, ID , FEELING , setFEELING }) {
  const [OPEN, setOPEN] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setMedia(null);
      setUPLOAD(null);
      setPostText(null);
    }, 500);
  };

  const [PostText, setPostText] = useState(null);
  const [PostLOADING, setPostLOADING] = useState(false);
  const [Postsuccess, setPostsuccess] = useState(true);
  const [LOADING, setLOADING] = useState(true);
  const [UPLOAD, setUPLOAD] = useState(null);
  const [UPLOADMEDIA, setUPLOADMEDIA] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [videoUrl, setvideoUrl] = useState([]);
  const [Media, setMedia] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [success, setSuccess] = React.useState(false);
  const [openPostsnackbar, setopenPostsnackbar] = useState(false);
  const imageUploading = () => {
    if (Media === "image") {
      uploadImage();
    } else if (Media === "video") {
      uploadVideo();
    }
    setLOADING(true);
    setUPLOADMEDIA(true);
  };
  const SetData = async () => {
    await setDoc(doc(db, "Omar Fathy", ID), {
      feeling: FEELING,
      id: ID,
      name: "O",
      title: "Omar Fathy",
      color: "#30E3DF",
      date: moment().format("LLL"),
      mediaType: Media,
      media:
        Media === "image"
          ? imagesUrl[imagesUrl.length - 1]
          : Media === "video"
          ? videoUrl[videoUrl.length - 1]
          : null,
      body: PostText,
      liked: false,
      bookmarked: false,
    });
    setopenPostsnackbar(true);
    setPostsuccess(true);
    setPostLOADING(false);
    handleClose();
    setImage(null);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (message, variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    listAll(ref(storage, "images")).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImagesUrl((prev) => [...prev, url]);
        });
      });
    });
    listAll(ref(storage, "videos")).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setvideoUrl((prev) => [...prev, url]);
        });
      });
    });
  }, [setImagesUrl, setvideoUrl]);
  const uploadImage = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()} `);
    uploadBytes(imageRef, image).then((res) => {
      setUPLOAD(null);
      setUPLOADMEDIA(false);
      setOPEN(true);
      getDownloadURL(res.ref).then((url) => {
        setImagesUrl((prev) => [...prev, url]);
      });
    });
  };
  const uploadVideo = () => {
    if (video == null) return;
    const imageRef = ref(storage, `videos/${video.name + v4()} `);
    uploadBytes(imageRef, video).then((res) => {
      setUPLOAD(null);
      setUPLOADMEDIA(false);
      setOPEN(true);
      handleClickVariant("Your video uploaded successfully", "success");
      getDownloadURL(res.ref).then((url) => {
        setvideoUrl((prev) => [...prev, url]);
      });
    });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "85%", sm: 500 },
    bgcolor: "background.paper",
    border: `2px solid ${theme.palette.mode === "dark" ? "#000" : "#888"}`,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    mr: { xs: "20px" },
  };

  return (
    <Box>
      <Tooltip title="Add Post" placement="left">
        <Fab
          onClick={handleOpen}
          sx={{ position: "fixed", bottom: "30px", left: "30px", zIndex: 3000 }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h6"
              component="h2"
            >
              Create Post
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Avatar alt="child" src={logo} />
                <Typography
                  sx={{ ml: "20px", fontWeight: "100" }}
                  variant="body1"
                  color="inherit"
                >
                  {" "}
                  Omar Fathy
                  
                </Typography>
               {FEELING &&   <Stack direction="row">
               <Typography
                sx={{ ml: "5px" ,color:theme.palette.primary.main ,   fontWeight: "500"}}
                variant="body1" color="inherit">feels </Typography>
                <Typography
                sx={{ ml: "5px"  ,textTransform:"capitalize",  fontWeight: "500"}}
                variant="body1" color="inherit">{FEELING} </Typography>
               </Stack>
                }
              </Stack>
            </Typography>
            <TextField
              value={PostText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
              sx={{ width: "100%", mt: "20px" }}
              id="standard-multiline-static"
              multiline
              rows={3}
              placeholder="What's on your mind..."
              variant="standard"
              
            />

            <Stack
              direction="row"
              sx={{
                width: "100%",
                mt: "2px",
                mb: "20px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  // width: {xs:"37%" , sm:"27%"},
                  justifyContent: "space-between",
                  pt: "10px",
                }}
              >
                <input
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setMedia("image");
                    setUPLOAD("image");
                    setLOADING(false);
                    setUPLOADMEDIA(false);
                    setSuccess(true);
                  }}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-image-file"
                />
                <input
                  onChange={(e) => {
                    setVideo(e.target.files[0]);
                    setMedia("video");
                    setUPLOAD("video");
                    setLOADING(false);
                    setUPLOADMEDIA(false);
                    setSuccess(true);
                  }}
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  id="contained-video-file"
                />
              
                  <FeelingMENU theme={theme} EmoJiIcon={EmojiEmotionsIcon} setFEELING={setFEELING}/>
                {/* </Tooltip> */}
                <Tooltip title="Add Photo" placement="bottom">
                  <label htmlFor="contained-image-file">
                    <InsertPhotoIcon
                      sx={{
                        color: theme.palette.secondary.main,
                        cursor: "pointer",
                      mr: "10px",

                      }}
                    />
                  </label>
                </Tooltip>
                <Tooltip title="Add Video" placement="bottom">
                  <label htmlFor="contained-video-file">
                    <VideoCameraBackIcon
                      sx={{
                        color: theme.palette.success.main,
                        cursor: "pointer",
                      mr: "10px",

                      }}
                    />
                  </label>
                </Tooltip>
                <MentionMENU theme={theme} EmoJiIcon={PersonAddIcon} PostText={PostText} setPostText={setPostText} />
              </Stack>
              <Box>
                {UPLOAD && (
                  <PostButton
                    image={image}
                    imagesUrl={imagesUrl}
                    PostText={PostText}
                    setImage={setImage}
                    Media={Media}
                    videoUrl={videoUrl}
                    func={imageUploading}
                    LOADING={LOADING}
                    success={success}
                    setLOADING={setLOADING}
                    setSuccess={setSuccess}
                  >
                    upload {UPLOAD}
                  </PostButton>
                )}
                {!UPLOAD && (
                  <Button
                    sx={{ width: "100px", mt: 1.5 }}
                    variant="contained"
                    disabled={true}
                  >
                    UPLOAD
                  </Button>
                )}
              </Box>
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DateTimePicker",
                  "MobileDateTimePicker",
                  "DesktopDateTimePicker",
                  "StaticDateTimePicker",
                ]}
              >
                <DemoItem>
                  <DateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            {!UPLOADMEDIA && (
              <PostButton
                image={image}
                imagesUrl={imagesUrl}
                PostText={PostText}
                setImage={setImage}
                Media={Media}
                videoUrl={videoUrl}
                func={SetData}
                LOADING={PostLOADING}
                success={Postsuccess}
                setLOADING={setPostLOADING}
                setSuccess={setPostsuccess}
              >
                Post
              </PostButton>
            )}
            {UPLOADMEDIA && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mt: 1.5, position: "relative" }}>
                  <Button sx={{ width: "100%" }} variant="contained" disabled={true}>POST</Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
      <SNACKBAR
        OPEN={OPEN}
        setOPEN={setOPEN}
        Message={"Media Uploaded Successfully!"}
        time={3500}
        y={"top"}
        x={"center"}
      />
      <SNACKBAR
        OPEN={openPostsnackbar}
        setOPEN={setopenPostsnackbar}
        Message="New Post Added Successfully"
        time={5000}
        y={"top"}
        x={"center"}
      />
    </Box>
  );
}
