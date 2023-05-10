import {
  Box,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  useTheme,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { setJobs } from "../state";

const postJobSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
});

const initialValuesPostJob = {
  title: "",
  description: "",
};

const PostJobWidget = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userMode = useSelector((state) => state.userMode);
  const categories = useSelector((state) => state.categories);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setCategory("");
    setOpen(false);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const postJob = async (values) => {
    const { title, description } = values;

    const response = await fetch(`http://localhost:3001/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: _id,
        title: title,
        categoryId: category,
        description: description,
      }),
    });

    const jobs = await response.json();

    if (response.status === 201) {
      dispatch(setJobs({ jobs }));
      handleClose();
      setSeverity("success");
      setSnackbarMessage("Job posted successfully!");
      setSnackbarOpen(true);
    } else if (response.status === 409) {
      setSeverity("error");
      setSnackbarMessage("Job posting failed!");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {}, [userMode]);

  return (
    <WidgetWrapper>
      <FlexBetween gap={"1rem"}>
        <FormControl sx={{ minWidth: 80, width: "20%" }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sort}
            label="Sort"
            onChange={handleSort}
          >
            <MenuItem value={10}>Date</MenuItem>
            <MenuItem value={20}>Job Status</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 100, width: "30%" }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={handleFilter}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {userMode === "client" && (
          <>
            <Button
              onClick={handleOpen}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "2rem",
                width: "6rem",
                height: "3rem",
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              POST JOB
            </Button>

            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isNonMobileScreens ? "24rem" : "20rem",
                  bgcolor: "white",
                  border: "2px solid #000",
                  borderRadius: "1rem",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  fontSize={"1rem"}
                  fontWeight={"600"}
                  marginBottom={"1rem"}
                  textAlign={"center"}
                >
                  Post Job
                </Typography>
                <Formik
                  onSubmit={postJob}
                  initialValues={initialValuesPostJob}
                  validationSchema={postJobSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      >
                        <TextField
                          label="Title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          name="title"
                          error={
                            Boolean(touched.title) && Boolean(errors.title)
                          }
                          helperText={touched.title && errors.title}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <FormControl sx={{ gridColumn: "span 4" }}>
                          <InputLabel id="category-label">Category</InputLabel>
                          <Select
                            labelId="category-label"
                            id="category-select"
                            value={category}
                            label="Category"
                            onChange={handleCategory}
                            required
                          >
                            {categories.map((category) => (
                              <MenuItem key={category._id} value={category._id}>
                                {category.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          label="Description"
                          multiline
                          maxRows={4}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          name="description"
                          error={
                            Boolean(touched.description) &&
                            Boolean(errors.description)
                          }
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Box>
                      <Box>
                        <Button
                          fullWidth
                          type="submit"
                          sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                          }}
                          variant="outlined"
                        >
                          POST NOW
                        </Button>
                        <Snackbar
                          open={snackbarOpen}
                          autoHideDuration={4000}
                          onClose={handleSnackbarClose}
                        >
                          <Alert
                            severity={severity}
                            onClose={handleSnackbarClose}
                          >
                            {snackbarMessage}
                          </Alert>
                        </Snackbar>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Modal>
          </>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostJobWidget;
