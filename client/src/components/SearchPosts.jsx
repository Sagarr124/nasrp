import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostWidget from "./PostWidget";

// Search results component
const SearchResults = ({ users, posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            description,
            picturePath,
            likes,
            comments,
            createdAt,
          }) => {
            let date = new Date(createdAt);
            date =
              date.toLocaleTimeString() + " | " + date.toLocaleDateString();
            return (
              <PostWidget
                key={_id}
                postId={_id}
                fullName={users.find((user) => user._id === userId)?.fullName}
                description={description}
                country={users.find((user) => user._id === userId)?.country}
                picturePath={picturePath}
                userPicturePath={
                  users.find((user) => user._id === userId)?.picturePath
                }
                likes={likes}
                comments={comments}
                date={date}
              />
            );
          }
        )
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No results found
        </p>
      )}
    </>
  );
};

// Main component
const SearchPosts = ({ query }) => {
  const { users, posts } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const filteredPosts = posts.filter((post) =>
      post.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredPosts);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="100%"
      padding="0rem 20%"
      justifyContent={"center"}
    >
      <SearchResults users={users} posts={searchResults} />
    </Box>
  );
};

export default SearchPosts;
