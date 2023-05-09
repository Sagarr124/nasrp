import {
  Box,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    document.title = "NASRP - Login or Register";
  });

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Tooltip title="Nisar Ahmed Siddiqui Rozgaar Programme">
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            NASRP
          </Typography>
        </Tooltip>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to NASRP, the Hub of Opportunities!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
