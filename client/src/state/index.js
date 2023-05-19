import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userMode: "freelancer",
  user: null,
  token: null,
  users: [],
  posts: [],
  jobs: [],
  orders: [],
  categories: [],
  conversations: [],
  messages: [],
  notifications: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserMode: (state) => {
      state.userMode = state.userMode === "freelancer" ? "client" : "freelancer";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.users = [];
      state.posts = [];
      state.jobs = [];
      state.orders = [];
      state.categories = [];
      state.conversations = [];
      state.messages = [];
      state.notifications = [];
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload.jobs;
    },
    setJob: (state, action) => {
      const updatedJobs = state.jobs.map((job) => {
        if (job._id === action.payload.job._id) return action.payload.job;
        return job;
      });
      state.jobs = updatedJobs;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setCategory: (state, action) => {
      const updatedCategories = state.categories.map((category) => {
        if (category._id === action.payload.category._id) return action.payload.category;
        return category;
      });
      state.categories = updatedCategories;
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
    },
    setOrder: (state, action) => {
      const updatedOrders = state.orders.map((order) => {
        if (order._id === action.payload.order._id) return action.payload.order;
        return order;
      });
      state.orders = updatedOrders;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setUser: (state, action) => {
      const updatedUsers = state.users.map((user) => {
        if (user._id === action.payload.user._id) return action.payload.user;
        return user;
      });
      state.users = updatedUsers;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload.conversations;
    },
    setConversation: (state, action) => {
      const updatedConversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload.conversation._id) return action.payload.conversation;
        return conversation;
      });
      state.conversations = updatedConversations;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
    setMessage: (state, action) => {
      const updatedMessages = state.messages.map((message) => {
        if (message._id === action.payload.message._id) return action.payload.message;
        return message;
      });
      state.messages = updatedMessages;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    setNotification: (state, action) => {
      const updatedNotifications = state.notifications.map((notification) => {
        if (notification._id === action.payload.notification._id) return action.payload.notification;
        return notification;
      });
      state.notifications = updatedNotifications;
    },
  },
});

export const { setMode, setUserMode, setLogin, setLogout, setPosts, setPost, setJobs, setJob, setCategories, setCategory, setOrders, setOrder, setUsers, setUser, setConversations, setConversation, setMessages, setMessage, setNotifications, setNotification } =
  authSlice.actions;
export default authSlice.reducer;
