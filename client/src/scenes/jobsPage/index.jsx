import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import JobsWidget from "../../components/JobsWidget";
import PostJobWidget from "../../components/PostJobWidget";

const JobsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    document.title = "NASRP - Jobs";
  });

  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="1rem 6%" gap="0.5rem" justifyContent="center">
        <Box
          ml={isNonMobileScreens ? "20%" : undefined}
          mr={isNonMobileScreens ? "20%" : undefined}
          mt={isNonMobileScreens ? "1rem" : "2rem"}
          mb={isNonMobileScreens ? "1rem" : undefined}
        >
          <PostJobWidget />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="1rem 2rem"
        >
          <JobsWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default JobsPage;
