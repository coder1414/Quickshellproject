


import React from 'react';

const GroupingDropdown = ({ onGroupingChange, onOrderingChange }) => {
  return (
    <div className="dropdown-container">
      <label>
        Group by:
        <select onChange={onGroupingChange}>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="user">User</option>
        </select>
      </label>
      <label>
        Order by:
        <select onChange={onOrderingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default GroupingDropdown;
