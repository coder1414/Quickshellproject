import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, users }) => {
    return (
        <div className="task-column">
            <h3>{title}</h3>
            {tasks.map(task => {
                const assignedUser = users.find(user => user.id === task.userId);
                return <TaskCard key={task.id} task={task} user={assignedUser} />;
            })}
        </div>
    );
};

export default TaskColumn;
