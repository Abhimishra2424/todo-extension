/* global chrome */

import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '400px', padding: 2 }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Create" />
        <Tab label="View" />
      </Tabs>
      {tabValue === 0 && <CreateTaskForm addTask={addTask} />}
      {tabValue === 1 && <TaskList tasks={tasks} updateTask={updateTask} />}
    </Box>
  );
}

export default App;