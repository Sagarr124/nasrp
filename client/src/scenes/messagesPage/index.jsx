import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../state";
import Navbar from "../../components/Navbar";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001");

// const messages = [
//   { id: 1, name: "John Doe", message: "Hi there!" },
//   { id: 2, name: "Jane Doe", message: "Hello!" },
//   { id: 3, name: "John Doe", message: "How are you?" },
//   { id: 4, name: "Jane Doe", message: "I'm good, thanks. How about you?" },
//   { id: 5, name: "John Doe", message: "I'm doing well, thanks." },
//   { id: 1, name: "John Doe", message: "Hi there!" },
//   { id: 2, name: "Jane Doe", message: "Hello!" },
//   { id: 3, name: "John Doe", message: "How are you?" },
//   { id: 4, name: "Jane Doe", message: "I'm good, thanks. How about you?" },
//   { id: 5, name: "John Doe", message: "I'm doing well, thanks." },
// ];

const MessagesPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const { token, messages } = useSelector((state) => state);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [currentMessage, setCurrentMessage] = useState("");

  const getUserMessages = async () => {
    const response = await fetch(`http://localhost:3001/messages/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // dispatch(setMessages({ messages: data }));
    console.log(data);
  };

  const handleSend = () => {
    // Send message logic
  };

  useEffect(() => {
    document.title = "NASRP - Messages";
    getUserMessages();
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
              <List>
                {messages.map((message) => (
                  <ListItem key={message.id} button>
                    <ListItemText
                      primary={message.name}
                      secondary={message.message}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Paper sx={{ flexGrow: 1, overflow: "auto" }}>
                {/* Current conversation messages */}
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
