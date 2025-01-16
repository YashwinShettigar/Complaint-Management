import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { Box, Button, TextField, FormControl, Typography } from "@mui/material";
import '../components/HomePage.css';
import loginImage from '../images/loginbg4.jpg';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          const { role } = result.data;
  
          if (role === "admin") {
            navigate('/home1'); 
          } else if (role === "user") {
            navigate('/home'); 
          } else {
            setError("Invalid role");
          }
        } else {
          setError(result.data.message || "User not found"); 
        }
      })
      .catch((err) => {
        console.error("Login error: ", err);
        setError("Username/Password doesnot match.");
      });
  };

  return(
    <div
    style={{
      backgroundImage: `url(${loginImage})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
  >    <div className="container">
    <h1>Welcome Back!</h1>
  </div>
  <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    maxWidth: "1200px",
    padding: 7,
    marginTop: "10px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    color:"white"
  }}
>  
  <Typography variant="h5" textAlign="center">
    <b>Login</b>
  </Typography>
  {error && <p style={{ color: 'red' }}>{error}</p>}
  <FormControl>
    <TextField label="Email" type="email" variant="outlined" value={email}
      onChange={(e) => setEmail(e.target.value)} required
      sx={{
        "& .MuiInputLabel-root": { color: "white", fontSize: "15px" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
          fontSize: "15px",
        },
        "& .MuiInputBase-input": { color: "white" },
        width: "300px",
      }}
    />
  </FormControl>
  <FormControl>
    <TextField label="Password" type="password" variant="outlined" value={password}
      onChange={(e) => setPassword(e.target.value)} required
      sx={{
        "& .MuiInputLabel-root": { color: "white", fontSize: "15px" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
          fontSize: "15px",
        },
        "& .MuiInputBase-input": { color: "white" },
        width: "300px",
      }}
    />
  </FormControl>
  <Button color="primary" type="submit" variant="contained" onClick={handleSubmit}
    sx={{
      padding: "10px",
      borderRadius: "4px",
      fontWeight: "bold",
    }}
  >
    Login
  </Button>
  <Typography align="center" sx={{mt:2}}>
    Dont have an account? {""}
    <Link to="/register" style={{textDecoration:"none",color:"cyan"}}>
    Register here</Link>
  </Typography>
</Box>
</div>
  );
}

export default Login;