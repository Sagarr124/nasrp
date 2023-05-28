import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import JobWidget from "./JobWidget";

// Search results component
const SearchResults = ({ users, categories, jobs }) => {
  return (
    <>
      {jobs.length > 0 ? (
        jobs.map(
          ({
            _id,
            clientId,
            title,
            categoryId,
            description,
            dueDate,
            createdAt,
          }) => {
            let date = new Date(createdAt);
            date = date.toLocaleDateString();

            if (new Date(dueDate) > new Date()) {
              return (
                <JobWidget
                  key={_id}
                  jobId={_id}
                  title={title}
                  category={
                    categories.find((category) => category._id === categoryId)
                      ?.title
                  }
                  description={description}
                  dueDate={new Date(dueDate).toLocaleDateString()}
                  clientId={clientId}
                  clientPicture={
                    users.find((user) => user._id === clientId)?.picturePath
                  }
                  clientName={
                    users.find((user) => user._id === clientId)?.fullName
                  }
                  date={date}
                />
              );
            } else return null;
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
const SearchJobs = ({ query }) => {
  const { users, categories, jobs } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredJobs);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap="1rem 2rem"
      width="100%"
      padding="0rem 5%"
      justifyContent={"center"}
    >
      <SearchResults
        users={users}
        categories={categories}
        jobs={searchResults}
      />
    </Box>
  );
};

export default SearchJobs;
