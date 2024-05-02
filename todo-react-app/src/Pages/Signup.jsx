import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authFailure } from "../Store/userSlice";
import { signUp } from "../Store/actions/authActions";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import './signup.css'

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const loading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Login");
    dispatch(signUp(formData), () => navigate("/Login"));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(authFailure(null));
    }
  }, [dispatch, error]);

  const paperStyle = { padding: "30px 20px", width: 350, margin: "6vw auto" };
  const avatarstyle = { background: "#1bbd7e" };

  return (
    <>
      <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarstyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h1 style={{ margin: "0", color: "maroon" }}>Signup here</h1>
            <Typography variant="caption">
              Please fill this form to create an accout
            </Typography>
          </Grid>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <form onSubmit={handleSubmit} method="POST">
            <TextField
              fullWidth
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              variant="standard"
              placeholder="Enter your name"
            />
            <br />
            <TextField
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              variant="standard"
              placeholder="Enter your email"
            />
            <br />
            <TextField
              fullWidth
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              label="Username"
              variant="standard"
              placeholder="Enter username"
            />
            <br />
            <TextField
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              variant="standard"
              placeholder="Enter password"
            />
            <br />
            {/* <button type="submit" disabled={loading}>Register</button> */}
            <Grid container justifyContent="center" >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ margin: "20px" }}
              >
                Signup
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
