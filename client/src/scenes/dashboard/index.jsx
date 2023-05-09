import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UserWidget from "../../components/UserWidget";
import ActiveOrdersWidget from "../../components/ActiveOrdersWidget";
import { useEffect } from "react";

const Dashboard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "NASRP - Dashboard";
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
      >
        <Box flexBasis={isNonMobileScreens ? "28%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "70%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <ActiveOrdersWidget userId={_id} page={"dashboard"} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
