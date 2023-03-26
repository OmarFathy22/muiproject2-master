import {
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Appbar from "./components/Appbar";
import React, { useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "styles/MyTheme";
import MainContent from "./components/MainContent";
import RightSection from "./components/RightSection";
import DRAWER from "./components/DRAWER";


const Root = (props) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [showList, setshowList] = useState("none");
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {/* Appbar is landing here */}
        <Appbar
          showList={showList}
          setshowList={setshowList}
          handleDrawerToggle={handleDrawerToggle}
        />

        {/* Main content is landing here */}
        <Stack
          direction="row"
        >
          {/* <Sidebar
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
            showList={showList}
            setshowList={setshowList}
          /> */}
          <DRAWER
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            props={props}
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
          />
          <MainContent theme={theme} showList={showList} />
          {/* <Loading/> */}
          <RightSection theme={theme} />
        </Stack>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
