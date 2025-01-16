import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { Box, Button, TextField, FormControl, Typography } from "@mui/material";
import loginImage from '../images/loginbg4.jpg';

function Register() {
  const [username,setUsername]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', { username,email, password })
      .then((res) => {
        if (res.data.success) {
          navigate('/login');
        } else {
          setError('Failed to register');
        }
      })
      .catch(() => setError('User already present'));
  };

  return (
    <div
    style={{
      backgroundImage: `url(${loginImage})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  > <div className="container">
    <h1>Welcome New User!</h1>
  </div>
    <Box
      sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    maxWidth: "1200px",
    padding: "20px 60px 85px 60px",
    height:"300px",
    marginTop: "10px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    color:"white"
      }}
    >
      <form
        onSubmit={handleSubmit} 
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px", 
        }}
      >
        <Typography variant="h5" textAlign="center">
          <b>Register</b>
        </Typography>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <FormControl>
          <TextField label="Username" variant="outlined" value={username}
            onChange={(e) => setUsername(e.target.value)} required
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
        <Button color="primary" type="submit" variant="contained" 
          sx={{
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Register
        </Button>
      </form>
      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "cyan" }}>
          Login here
        </Link>
      </Typography>
    </Box>
    </div>
  );
}

export default Register;