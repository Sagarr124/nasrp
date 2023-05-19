import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import SearchUsers from "components/SearchUsers";

const SearchPage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "NASRP - Search";
  });

  return (
    <Box>
      <Navbar />
      <SearchUsers query={location.state.searchText} />
    </Box>
  );
};

export default SearchPage;
