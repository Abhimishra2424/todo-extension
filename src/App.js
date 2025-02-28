/* global chrome */

import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Load tasks from Chrome storage
  useEffect(() => {
    chrome.storage.sync.get(['tasks'], (result) => {
      if (result.tasks) {
        setTasks(result.tasks);
      }
    });
  }, []);

  // Save tasks to Chrome storage
  useEffect(() => {
    chrome.storage.sync.set({ tasks });
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTaskToEdit(tasks[index]);
    setTabValue(0); // Navigate to the Create tab
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.jobNo === updatedTask.jobNo ? updatedTask : task
    );
    setTasks(updatedTasks);
    setTaskToEdit(null); // Reset task to edit
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setTaskToEdit(null); // Reset task to edit when switching tabs
  };

  return (
    <Box sx={{ width: '400px', padding: 2 }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Create" />
        <Tab label="View" />
      </Tabs>
      {tabValue === 0 && (
        <CreateTaskForm
          addTask={addTask}
          editTask={handleEditTask}
          taskToEdit={taskToEdit}
        />
      )}
      {tabValue === 1 && (
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          editTask={editTask}
        />
      )}
    </Box>
  );
}

export default App;