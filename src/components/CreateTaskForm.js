import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const CreateTaskForm = ({ addTask, editTask, taskToEdit }) => {
  const [jobNo, setJobNo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  // Pre-fill form if editing a task
  useEffect(() => {
    if (taskToEdit) {
      setJobNo(taskToEdit.jobNo);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobNo || !description) return;

    const newTask = {
      jobNo,
      description,
      status,
    };

    if (taskToEdit) {
      // If editing, update the task
      editTask(newTask);
    } else {
      // If creating, add a new task
      addTask(newTask);
    }

    // Reset form
    setJobNo('');
    setDescription('');
    setStatus('Pending');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Job No"
        value={jobNo}
        onChange={(e) => setJobNo(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={4}
        inputProps={{ maxLength: 300 }} // Limit description to 300 characters
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default CreateTaskForm;