import React from 'react';
import { List, ListItem, ListItemText, Button, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

const TaskList = ({ tasks, updateTask }) => {
  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    updateTask(updatedTasks);
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', padding: 2 }}>
          <ListItemText
            primary={`Job No: ${task.jobNo}`}
            secondary={`Description: ${task.description}`}
          />
          <Chip
            label={task.status}
            color={
              task.status === 'Done'
                ? 'success'
                : task.status === 'In Progress'
                ? 'warning'
                : 'default'
            }
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleStatusChange(index, 'In Progress')}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            startIcon={<DoneIcon />}
            onClick={() => handleStatusChange(index, 'Done')}
            sx={{ marginLeft: 2 }}
          >
            Done
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;