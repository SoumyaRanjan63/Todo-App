import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authFailure } from "../Store/userSlice";
import { signIn } from "../Store/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import './login.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
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
    dispatch(signIn(formData, () => navigate("/Dashboard")));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(authFailure(null));
    }
  }, [dispatch, error]);

  const paperStyle = { padding: "30px 20px", width: 350, margin: "6vw auto" };
  return (
    <>
    <div className="logincontainer">
      <Grid align="center"  >
        <Paper elevation={15} style={paperStyle}>
          <Avatar style={{ background: "#1bbd7e" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={{color:"maroon"}}>Login</h2>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <form onSubmit={handleSubmit} method="POST">
            <TextField
              fullWidth
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="standard"
              placeholder="Email or username"
              label="Email"
            />
            <br />
            <TextField
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="standard"
              placeholder="Password"
              label="Password"
            />
            <br />
             <Grid container justifyContent="center" >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ margin: "20px" }}
              >
                Login
              </Button>
              <Typography>
                New to our platform? Please&nbsp;
                <Link to="/Signup">Sign up</Link>
                &nbsp;here
              </Typography>
            </Grid>
          </form>
        </Paper>
      </Grid>
      </div>
    </>
  );
};

export default Login;
