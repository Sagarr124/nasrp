import {
  StarOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { Box, Grid, Typography, Divider } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Search results component
const SearchResults = ({ users }) => {
  const navigate = useNavigate();

  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <WidgetWrapper
            key={user._id}
            m="1rem 0"
            sx={{ width: 300, maxWidth: 400, flexGrow: 1 }}
          >
            {/* FIRST ROW */}
            <FlexBetween gap="0.5rem" pb="1.1rem">
              <FlexBetween gap="1rem">
                <UserImage image={user.picturePath} />
                <Box>
                  <Typography
                    variant="h4"
                    color="dark"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    {user.fullName}
                  </Typography>
                  <Typography color="medium">{user.userName}</Typography>
                </Box>
              </FlexBetween>
              <Grid display="flex">
                <StarOutlined />
                <Typography color="main" fontWeight="500" paddingLeft="2px">
                  {user.rating}
                </Typography>
              </Grid>
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
              <Typography color="medium">{user.description}</Typography>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <LocationOnOutlined fontSize="large" sx={{ color: "main" }} />
                <Typography color="medium">{user.country}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                <PhoneOutlined fontSize="large" sx={{ color: "main" }} />
                <Typography color="medium">{user.phoneNumber}</Typography>
              </Box>
            </Box>
          </WidgetWrapper>
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No results found
        </p>
      )}
    </>
  );
};

// Main component
const SearchUsers = ({ query }) => {
  const { users } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const filteredUsers = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.userName.toLowerCase().includes(query.toLowerCase()) ||
        user.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      width="100%"
      padding="0rem 5%"
      justifyContent={"center"}
    >
      <SearchResults users={searchResults} />
    </Box>
  );
};

export default SearchUsers;
