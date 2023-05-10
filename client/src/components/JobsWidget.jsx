import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setCategories } from "../state";
import JobWidget from "./JobWidget";

const JobsWidget = () => {
  const dispatch = useDispatch();
  const { users, jobs, categories, token, userMode } = useSelector(
    (state) => state
  );

  const getJobs = async () => {
    const response = await fetch("http://localhost:3001/jobs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setJobs({ jobs: data }));
  };

  const getCategories = async () => {
    const response = await fetch("http://localhost:3001/categories", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setCategories({ categories: data }));
  };

  useEffect(() => {
    if (categories.length < 1) getCategories();
    getJobs();
  }, [userMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {jobs.length > 0 ? (
        jobs.map(
          ({ _id, clientId, title, categoryId, description, createdAt }) => {
            const user = users.find((usr) => usr._id === clientId);
            const category = categories.find((cat) => cat._id === categoryId);
            let date = new Date(createdAt);
            date = date.toLocaleDateString();

            return (
              <JobWidget
                key={_id}
                jobId={_id}
                title={title}
                category={category.title}
                description={description}
                clientId={user._id}
                clientPicture={user.picturePath}
                clientName={user.fullName}
                date={date}
              />
            );
          }
        )
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No jobs to show
        </p>
      )}
    </>
  );
};

export default JobsWidget;
