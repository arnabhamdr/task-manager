import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/register", form);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" mt={4}>
        Register
      </Typography>
      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
