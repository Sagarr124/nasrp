import { useState } from "react";
import {
  Box,
  Stack,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  userName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  country: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  picture: yup.string().required("required"),
  description: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});

const initialValuesRegister = {
  fullName: "",
  userName: "",
  email: "",
  password: "",
  country: "",
  phoneNumber: "",
  picture: "",
  description: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesForgotPassword = {
  email: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isForgotPassword = pageType === "forgot";
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedInResponse.status === 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/dashboard");
    } else if (loggedInResponse.status === 400) {
      setSnackbarMessage(loggedIn.msg);
      setSnackbarOpen(true);
    }
  };

  const forgotPassword = async (values, onSubmitProps) => {};

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
    if (isForgotPassword) await forgotPassword(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        isLogin
          ? initialValuesLogin
          : isRegister
          ? initialValuesRegister
          : initialValuesForgotPassword
      }
      validationSchema={
        isLogin
          ? loginSchema
          : isRegister
          ? registerSchema
          : forgotPasswordSchema
      }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="fullName"
                  error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  error={Boolean(touched.userName) && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  error={Boolean(touched.country) && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Profile Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Write a short title for yourself"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            {isLogin && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <Typography
                  onClick={() => {
                    setPageType("forgot");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    textAlign: "right",
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                    gridColumn: "span 4",
                  }}
                >
                  {isLogin && "Forgotten password?"}
                </Typography>
              </>
            )}

            {isForgotPassword && (
              <>
                <TextField
                  label="Enter email address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            {(isLogin || isRegister) && (
              <>
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
                  {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={4000}
                  onClose={handleSnackbarClose}
                >
                  <Alert severity="error" onClose={handleSnackbarClose}>
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </>
            )}

            {isForgotPassword && (
              <Stack direction="row" justifyContent={"right"}>
                <Button
                  onClick={() => {
                    setPageType("login");
                    resetForm();
                  }}
                  sx={{
                    m: "2rem 0",
                    p: "1rem 2rem",
                    color: palette.background.main,
                    "&:hover": { color: palette.primary.main },
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem 2rem",
                    marginLeft: "2rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  variant="outlined"
                >
                  Verify
                </Button>
              </Stack>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
