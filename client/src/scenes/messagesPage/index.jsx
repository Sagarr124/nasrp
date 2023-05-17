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
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConversations, setMessages } from "../../state";
import Navbar from "../../components/Navbar";
import UserImage from "components/UserImage";
import io from "socket.io-client";

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const userId = useSelector((state) => state.user._id);
  const { token, conversations, messages } = useSelector((state) => state);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const socket = io("http://localhost:3001");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (message) => {
    socket.emit("chat message", message);
    setCurrentMessage("");
    getConversationMessages(message.conversationId);
  };

  useEffect(() => {
    document.title = "NASRP - Messages";
    getUserConversations();
    dispatch(setMessages({ messages: [] }));
  }, [conversationId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("chat message", (message) => {
      console.log("received message at client-end:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
                    onClick={() => {
                      setConversationId(conversation._id);
                      getConversationMessages(conversation._id);
                      const recipient =
                        conversation.participants[0]._id !== userId
                          ? conversation.participants[0]._id
                          : conversation.participants[1]._id;
                      setRecipientId(recipient);
                    }}
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
              {conversationId && recipientId && (
                <Paper>
                  <List>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/profile/${recipientId}`);
                        navigate(0);
                      }}
                    >
                      <ListItemAvatar>
                        <UserImage
                          image={
                            conversations.find(
                              (conversation) =>
                                conversation._id === conversationId
                            )?.participants[0]._id !== userId
                              ? conversations.find(
                                  (conversation) =>
                                    conversation._id === conversationId
                                )?.participants[0].picturePath
                              : conversations.find(
                                  (conversation) =>
                                    conversation._id === conversationId
                                )?.participants[1].picturePath
                          }
                          size="50px"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          conversations.find(
                            (conversation) =>
                              conversation._id === conversationId
                          )?.participants[0]._id !== userId
                            ? conversations.find(
                                (conversation) =>
                                  conversation._id === conversationId
                              )?.participants[0].fullName
                            : conversations.find(
                                (conversation) =>
                                  conversation._id === conversationId
                              )?.participants[1].fullName
                        }
                        secondary={
                          conversations.find(
                            (conversation) =>
                              conversation._id === conversationId
                          )?.participants[0]._id !== userId
                            ? conversations.find(
                                (conversation) =>
                                  conversation._id === conversationId
                              )?.participants[0].userName
                            : conversations.find(
                                (conversation) =>
                                  conversation._id === conversationId
                              )?.participants[1].userName
                        }
                        sx={{
                          fontWeight: "bold",
                        }}
                      />
                    </ListItemButton>
                  </List>
                </Paper>
              )}
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
                        secondary={message.createdAt.toLocaleString()}
                        sx={{
                          padding: 1.5,
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
                  <div ref={messagesEndRef} />
                </List>
              </Paper>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  placeholder="Type your message here..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  disabled={recipientId === ""}
                  fullWidth
                  multiline
                  required
                  maxRows={4}
                  sx={{ mr: 1, mt: "0.5rem" }}
                />
                <Button
                  variant="contained"
                  disabled={!currentMessage}
                  sx={{ padding: "1rem", mt: "0.5rem" }}
                  onClick={() =>
                    sendMessage({
                      conversationId: conversationId,
                      senderId: userId,
                      recipientId: recipientId,
                      content: currentMessage,
                    })
                  }
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
