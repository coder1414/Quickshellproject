import React, { useEffect, useState } from 'react';
import { fetchData } from './services/fetchData';
import KanbanDisplay from './components/KanbanDisplay.js';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');

  useEffect(() => {
    const loadTasksAndUsers = async () => {
      const { tickets, users } = await fetchData();
      setTasks(tickets);
      setUsers(users);
    };
    loadTasksAndUsers();
  }, []);

  return (
    <div className="app-container">
      <KanbanDisplay 
        tasks={tasks} 
        users={users} 
        groupBy={groupBy} 
        orderBy={orderBy} 
        setGroupBy={setGroupBy} 
        setOrderBy={setOrderBy} 
      />
    </div>
  );
};

export default App;
