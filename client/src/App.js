import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import Dashboard from "./scenes/dashboard";
import ProfilePage from "./scenes/profilePage";
import MessagesPage from "./scenes/messagesPage";
import JobsPage from "./scenes/jobsPage";
import OrdersPage from "./scenes/ordersPage";
import SearchPage from "scenes/searchPage";
import NotFoundPage from "scenes/notFoundPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route
              path="/dashboard"
              element={isAuth ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/messages"
              element={isAuth ? <MessagesPage /> : <Navigate to="/" />}
            />
            <Route
              path="/jobs"
              element={isAuth ? <JobsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={isAuth ? <OrdersPage /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={isAuth ? <SearchPage /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
