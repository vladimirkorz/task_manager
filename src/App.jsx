import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [theme, setTheme] = useState("light"); // 'light' | 'dark'
	const [tags, setTags] = useState([]);

	// Загрузка задач и тегов из localStorage при старте
	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
		const savedTags = JSON.parse(localStorage.getItem("tags")) || [];
		const savedTheme = localStorage.getItem("theme") || "light";

		setTasks(savedTasks);
		setTags(savedTags);
		setTheme(savedTheme);
		document.body.className = savedTheme;
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	// Сохранение в localStorage при изменении
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	useEffect(() => {
		localStorage.setItem("tags", JSON.stringify(tags));
	}, [tags]);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.body.className = theme;
	}, [theme]);

	// Фильтрация задач по поиску
	const filteredTasks = tasks.filter(
		(task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	// Функции CRUD
	const addTask = (task) => {
		setTasks([...tasks, { ...task, id: Date.now() }]);
		// Добавляем новые теги в общий список
		const newTags = task.tags.filter((tag) => !tags.includes(tag));
		if (newTags.length > 0) setTags([...tags, ...newTags]);
	};

	const updateTask = (updatedTask) => {
		setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
		// Обновление списка тегов при изменении
		const allTags = [...new Set(tasks.flatMap((t) => t.tags))];
		setTags(allTags);
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((t) => t.id !== id));
	};

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<div className="app">
			<header>
				<h1>Task Manager</h1>
				<ThemeToggle theme={theme} toggleTheme={toggleTheme} />
			</header>
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<TaskForm onAddTask={addTask} existingTags={tags} />
			<TaskList
				tasks={filteredTasks}
				onUpdateTask={updateTask}
				onDeleteTask={deleteTask}
			/>
		</div>
	);
};

export default App;
