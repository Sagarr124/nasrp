import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MyPostWidget from "../../components/MyPostWidget";
import PostsWidget from "../../components/PostsWidget";
import UserWidget from "../../components/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user)._id;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const createConversation = async (senderId, recipientId) => {
    const response = await fetch(`https://localhost:3001/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: senderId,
        recipientId: recipientId,
      }),
    });

    const data = await response.json();

    if (response.status === 201 || response.status === 409) {
      navigate("/messages");
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    document.title = "NASRP - Profile";
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "28%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          {loggedInUserId !== userId && (
            <Button
              fullWidth
              variant="outlined"
              sx={{
                m: "1.5rem 0",
                p: "0.75rem",
                borderRadius: "0.75rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                createConversation(loggedInUserId, userId);
              }}
            >
              SEND A MESSAGE
            </Button>
          )}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "52%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {loggedInUserId === userId && (
            <MyPostWidget picturePath={user.picturePath} />
          )}

          <PostsWidget
            userId={userId}
            userPicturePath={user.picturePath}
            fullName={user.fullName}
            country={user.country}
            isProfile
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
