// components/TaskItem.jsx
import React, { useState } from "react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [tags, setTags] = useState(task.tags);
	const [deadline, setDeadline] = useState(task.deadline || "");

	const isOverdue =
		task.deadline &&
		new Date(task.deadline) < new Date() &&
		!task.completed;

	const handleSave = () => {
		onUpdate({ ...task, title, tags, deadline: deadline || null });
		setIsEditing(false);
	};

	const handleToggleComplete = () => {
		onUpdate({ ...task, completed: !task.completed });
	};

	return (
		<li
			className={`task-item ${task.completed ? "completed" : ""} ${
				isOverdue ? "overdue" : ""
			}`}
		>
			{isEditing ? (
				<div className="edit-form">
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{/* Здесь можно использовать TagInput компонент */}
					<input
						type="datetime-local"
						value={deadline}
						onChange={(e) => setDeadline(e.target.value)}
					/>
					<button onClick={handleSave}>Сохранить</button>
					<button onClick={() => setIsEditing(false)}>Отмена</button>
				</div>
			) : (
				<>
					<div className="task-content">
						<input
							type="checkbox"
							checked={task.completed}
							onChange={handleToggleComplete}
						/>
						<span>{task.title}</span>
						<div className="tags">
							{task.tags.map((tag) => (
								<span key={tag} className="tag">
									{tag}
								</span>
							))}
						</div>
						{task.deadline && (
							<span className="deadline">
								Дедлайн:{" "}
								{new Date(task.deadline).toLocaleString()}
							</span>
						)}
					</div>
					<div className="task-actions">
						<button onClick={() => setIsEditing(true)}>✏️</button>
						<button onClick={() => onDelete(task.id)}>🗑️</button>
					</div>
				</>
			)}
		</li>
	);
};

export default TaskItem;
