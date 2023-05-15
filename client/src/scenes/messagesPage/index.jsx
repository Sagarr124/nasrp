import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversations, setMessages } from "../../state";
import Navbar from "../../components/Navbar";
import UserImage from "components/UserImage";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001");

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const userId = useSelector((state) => state.user._id);
  const { token, conversations, messages } = useSelector((state) => state);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [currentMessage, setCurrentMessage] = useState("");

  const getUserConversations = async () => {
    const response = await fetch(
      `http://localhost:3001/messages/conversations/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setConversations({ conversations: data }));
  };

  const getConversationMessages = async (conversationId) => {
    const response = await fetch(
      `http://localhost:3001/messages/conversations/${conversationId}/messages`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setMessages({ messages: data }));
  };

  const handleSend = () => {
    // Send message logic
  };

  useEffect(() => {
    document.title = "NASRP - Messages";
    getUserConversations();
    dispatch(setMessages({ messages: [] }));
  }, []);

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
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper sx={{ maxHeight: 500, overflow: "auto", height: 500 }}>
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                textAlign={"center"}
                sx={{ p: 2, paddingBottom: 0 }}
              >
                Conversations
              </Typography>
              <List>
                {conversations.map((conversation) => (
                  <ListItemButton
                    key={conversation._id}
                    onClick={() => getConversationMessages(conversation._id)}
                  >
                    <ListItemAvatar>
                      <UserImage
                        image={
                          conversation.participants[0]._id !== userId
                            ? conversation.participants[0].picturePath
                            : conversation.participants[1].picturePath
                        }
                        size="45px"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        conversation.participants[0]._id !== userId
                          ? conversation.participants[0].fullName
                          : conversation.participants[1].fullName
                      }
                      secondary={
                        conversation.participants[0]._id !== userId
                          ? conversation.participants[0].userName
                          : conversation.participants[1].userName
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Paper fullWidth sx={{ padding: 2 }}></Paper>
              <Paper sx={{ flexGrow: 1, overflow: "auto", maxHeight: 450 }}>
                <List>
                  {messages.map((message) => (
                    <ListItem
                      key={message._id}
                      sx={{
                        display: "flex",
                        justifyContent:
                          message.senderId === userId
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <ListItemText
                        primary={message.content}
                        sx={{
                          padding: 2,
                          border: "1px solid black",
                          backgroundColor:
                            message.senderId === userId
                              ? palette.background.alt
                              : palette.background.default,
                          borderRadius:
                            message.senderId === userId
                              ? "10px 0 10px 10px"
                              : "0 10px 10px 10px",
                          boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
                          marginTop: 1,
                          maxWidth: "25rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  placeholder="Type your message here..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  fullWidth
                  multiline
                  maxRows={4}
                  sx={{ mr: 1 }}
                />
                <Button
                  variant="contained"
                  sx={{ padding: "0.75rem" }}
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MessagesPage;
