import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch (error) {
      console.error("Invalid credentials", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" mt={4}>
        Login
      </Typography>
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
        Login
      </Button>
    </Container>
  );
}

export default Login;
