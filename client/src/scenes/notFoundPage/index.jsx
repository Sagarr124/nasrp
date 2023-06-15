import { Box, Typography, Button, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found";
  });

  return (
    <Box
      width={"100%"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">
        This page does not exist or is unavailable.
      </Typography>
      <Button
        onClick={() => navigate("/jobs")}
        sx={{
          m: "2rem 0",
          p: "1rem 2rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
        variant="outlined"
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
