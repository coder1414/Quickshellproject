import React from 'react';
import backlogIcon from '../assets/backlog.svg'; // Backlog
import todoIcon from '../assets/todo.svg'; // Todo
import inProgressIcon from '../assets/in-progress.svg'; // In Progress
import doneIcon from '../assets/done.svg'; // Done
import canceledIcon from '../assets/canceled.svg'; // Canceled

import noPriorityIcon from '../assets/No-priority.svg'; // No Priority
import urgentPriorityIcon from '../assets/SVG - Urgent Priority grey.svg'; // Urgent Priority (same as backlog for example)
import highPriorityIcon from '../assets/high-priority.svg'; // High Priority
import mediumPriorityIcon from '../assets/medium-priority.svg'; // Medium Priority
import lowPriorityIcon from '../assets/low-priority.svg'; // Low Priority

const TaskCard = ({ task, user, showUserIcon }) => {
  // Function to return the correct icon based on the task's status
  const getIconByStatus = (status) => {
    switch (status) {
      case 'Backlog':
        return backlogIcon;
      case 'Todo':
        return todoIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Done':
        return doneIcon;
      case 'Canceled':
        return canceledIcon;
      default:
        return todoIcon; // Default icon
    }
  };

  // Function to return the correct icon based on the task's priority
  const getIconByPriority = (priority) => {
    switch (priority) {
      case 0:
        return noPriorityIcon;
      case 4:
        return urgentPriorityIcon;
      case 3:
        return highPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 1:
        return lowPriorityIcon;
      default:
        return noPriorityIcon; // Default icon
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.id}</h3>
        {showUserIcon && (
          <div className="user-circle">{user.name.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div className="task-body">
        <div className="task-status">
          <img src={getIconByStatus(task.status)} alt={`${task.status} Icon`} className="status-icon" />
          <h2>{task.title}</h2>
        </div>
        <p className="tag">
          <img src={getIconByPriority(task.priority)} alt="Priority Icon" className="priority-icon" />
          <span>{task.tag[0]}</span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
