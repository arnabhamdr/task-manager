import { useState, useEffect } from "react";
import API from "../api";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!form.title) return;
    await API.post("/tasks", form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <h2>Your Tasks</h2>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleAdd}>
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <Button color="error" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            }
          >
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TaskManager;
