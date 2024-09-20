import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import downIcon from '../assets/down.svg'; // Down arrow icon for the Display button

// Import status icons
import backlogIcon from '../assets/backlog.svg'; 
import todoIcon from '../assets/todo.svg'; 
import inProgressIcon from '../assets/in-progress.svg'; 
import doneIcon from '../assets/done.svg'; 
import canceledIcon from '../assets/canceled.svg'; 

// Priority icons
import urgentPriorityIcon from '../assets/high-priority.svg'; 
import highPriorityIcon from '../assets/high-priority.svg'; 
import mediumPriorityIcon from '../assets/medium-priority.svg'; 
import lowPriorityIcon from '../assets/low-priority.svg'; 
import noPriorityIcon from '../assets/No-priority.svg';
import plusIcon from '../assets/plus.svg'; 
import threedoticon from '../assets/three-dots-menu.svg'; 

import './KanbanDisplay.css';
import { fetchData } from '../services/fetchData'; // Adjust the path as necessary

const Display = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('priority'); 
  const [ordering, setOrdering] = useState('priority');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        if (data && data.tickets && data.users) {
          setTasks(data.tickets);
          setUsers(data.users);
        } else {
          console.error('Unexpected API response format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Function to get user information by userId
  const getUserById = (userId) => {
    return users.find(user => user.id === userId) || { name: 'Unknown User' };
  };

  // Function to sort tasks based on priority or title
  const sortTasks = (tasksArray) => {
    if (ordering === 'priority') {
      return tasksArray.sort((a, b) => a.priority - b.priority);
    } else if (ordering === 'title') {
      return tasksArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tasksArray;
  };

  // Function to get priority icon based on priority group
  const getIconByPriorityGroup = (priorityGroup) => {
    switch (priorityGroup) {
      case 'urgent':
        return urgentPriorityIcon;
      case 'high':
        return highPriorityIcon;
      case 'medium':
        return mediumPriorityIcon;
      case 'low':
        return lowPriorityIcon;
      case 'noPriority':
        return noPriorityIcon;
      default:
        return noPriorityIcon; // Default icon
    }
  };

  // Function to get status icon based on task status
  const getIconByStatusGroup = (statusGroup) => {
    switch (statusGroup) {
      case 'backlog':
        return backlogIcon;
      case 'todo':
        return todoIcon;
      case 'inProgress':
        return inProgressIcon;
      case 'done':
        return doneIcon;
      case 'canceled':
        return canceledIcon;
      default:
        return todoIcon; // Default icon
    }
  };

  // Function to group tasks by status, user, or priority
  const groupTasks = () => {
    let groups = {};
    if (Array.isArray(tasks)) {
      if (grouping === 'status') {
        groups = {
          backlog: sortTasks(tasks.filter(task => task.status === 'backlog')),
          todo: sortTasks(tasks.filter(task => task.status === 'Todo')),
          inProgress: sortTasks(tasks.filter(task => task.status === 'In progress')),
          done: sortTasks(tasks.filter(task => task.status === 'Done')),
          canceled: sortTasks(tasks.filter(task => task.status === 'Canceled')),
        };
      } else if (grouping === 'user') {
        users.forEach(user => {
          groups[user.name] = sortTasks(tasks.filter(task => task.userId === user.id));
        });
      } else if (grouping === 'priority') {
        groups = {
          noPriority: sortTasks(tasks.filter(task => task.priority === 0)),
          urgent: sortTasks(tasks.filter(task => task.priority === 1)),
          high: sortTasks(tasks.filter(task => task.priority === 2)),
          medium: sortTasks(tasks.filter(task => task.priority === 3)),
          low: sortTasks(tasks.filter(task => task.priority === 4)),
        };
      }
    }
    return groups;
  };

  // Function to handle marking a task as done
  const handleMarkAsDone = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'Done' } : task));
  };

  // Function to handle marking a task as canceled
  const handleMarkAsCanceled = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'Canceled' } : task));
  };

  const groupedTasks = groupTasks();

  return (
    <div>
      {loading && <div>Loading tasks...</div>}

      <button onClick={() => setShowFilters(!showFilters)} className="filter-button">
        <span>Display</span>
        <img src={downIcon} alt="Down arrow" className="down-icon" />
      </button>

      {showFilters && (
        <div className="filter-popover">
          <div className="filter-row">
            <div className="filter-group">
              <label>Grouping</label>
              <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Ordering</label>
              <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="task-board">
        {Object.keys(groupedTasks).map((group, index) => (
          <div key={index} className="column">
            <h2>
              {grouping === 'priority' && (
                <img
                  src={getIconByPriorityGroup(group)}
                  alt={`${group} Icon`}
                  className="group-priority-icon"
                />
              )}
              {grouping === 'status' && (
                <img
                  src={getIconByStatusGroup(group)}
                  alt={`${group} Status Icon`}
                  className="group-status-icon"
                />
              )}
              {grouping === 'user' && (
                <span className="user-circle">
                  {group.charAt(0).toUpperCase()}
                </span>
              )}
              {group.charAt(0).toUpperCase() + group.slice(1)} 
              {' (' + groupedTasks[group].length + ')'}
              <div className="group-icons">
                <img src={plusIcon} alt="Add" className="plus-icon" />
                <img src={threedoticon} alt="..." className="three-dots-icon" />
              </div>
            </h2>

            {groupedTasks[group].map((task, idx) => (
              <TaskCard
                key={idx}
                task={task}
                user={getUserById(task.userId)}
                showUserIcon={grouping !== 'user'}
                onMarkAsDone={() => handleMarkAsDone(task.id)}
                onMarkAsCanceled={() => handleMarkAsCanceled(task.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;


