// components/TaskForm.jsx
import React, { useState } from "react";
import TagInput from "./TagInput";

const TaskForm = ({ onAddTask, existingTags }) => {
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState([]);
	const [deadline, setDeadline] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		onAddTask({
			title,
			tags,
			deadline: deadline || null,
			completed: false,
		});
		setTitle("");
		setTags([]);
		setDeadline("");
	};

	return (
		<form onSubmit={handleSubmit} className="task-form">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Новая задача"
				required
			/>
			<TagInput
				tags={tags}
				setTags={setTags}
				existingTags={existingTags}
			/>
			<input
				type="datetime-local"
				value={deadline}
				onChange={(e) => setDeadline(e.target.value)}
			/>
			<button type="submit">Добавить</button>
		</form>
	);
};

export default TaskForm;
