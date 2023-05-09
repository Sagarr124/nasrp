import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({
  userId,
  userPicturePath,
  fullName,
  country,
  isProfile = false,
}) => {
  const dispatch = useDispatch();
  const { token, posts } = useSelector((state) => state);

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.length > 0 ? (
        posts.map(
          ({ _id, description, picturePath, likes, comments, createdAt }) => {
            let date = new Date(createdAt);
            date =
              date.toLocaleTimeString() + " | " + date.toLocaleDateString();
            return (
              <PostWidget
                key={_id}
                postId={_id}
                fullName={fullName}
                description={description}
                country={country}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                date={date}
              />
            );
          }
        )
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No posts to show
        </p>
      )}
    </>
  );
};

export default PostsWidget;
