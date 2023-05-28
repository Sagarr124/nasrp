import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { setPosts } from "state";
import Navbar from "../../components/Navbar";
import SearchUsers from "components/SearchUsers";
import SearchPosts from "components/SearchPosts";
import SearchJobs from "components/SearchJobs";

const SearchPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const location = useLocation();

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    document.title = "NASRP - Search";
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Typography
        sx={{ mt: "2rem", ml: "3.5rem", fontSize: "1rem", fontWeight: 500 }}
      >
        Users:
      </Typography>
      <SearchUsers query={location.state.searchText} />
      <hr />
      <Typography
        sx={{ mt: "2rem", ml: "3.5rem", fontSize: "1rem", fontWeight: 500 }}
      >
        Posts:
      </Typography>
      <SearchPosts query={location.state.searchText} />
      <hr />
      <Typography
        sx={{ mt: "2rem", ml: "3.5rem", fontSize: "1rem", fontWeight: 500 }}
      >
        Jobs:
      </Typography>
      <SearchJobs query={location.state.searchText} />
    </Box>
  );
};

export default SearchPage;
