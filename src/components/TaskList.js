import React from 'react';
import { List, ListItem, ListItemText, Button, Chip, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const TaskList = ({ tasks, updateTask, editTask }) => {
  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    updateTask(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateTask(updatedTasks);
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', padding: 2 }}>
          <ListItemText
            primary={`Job No: ${task.jobNo}`}
            secondary={
              <>
                <Box sx={{ wordWrap: 'break-word', maxWidth: '300px' }}>
                  Description: {task.description}
                </Box>
                <Chip
                  label={task.status}
                  color={
                    task.status === 'Done'
                      ? 'success'
                      : task.status === 'In Progress'
                      ? 'warning'
                      : 'default'
                  }
                  sx={{ marginTop: 1 }}
                />
              </>
            }
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              color="primary"
              onClick={() => editTask(index)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<DoneIcon />}
              onClick={() => handleStatusChange(index, 'Done')}
              disabled={task.status === 'Done'}
            >
              Done
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;