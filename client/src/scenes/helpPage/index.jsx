import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";

const HelpPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    document.title = "NASRP - Help";
  });

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      ></Box>
    </Box>
  );
};

export default HelpPage;
