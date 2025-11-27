import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
	return (
		<ul className="task-list">
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					onUpdate={onUpdateTask}
					onDelete={onDeleteTask}
				/>
			))}
		</ul>
	);
};

export default TaskList;
