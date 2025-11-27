// components/ThemeToggle.jsx
import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => {
	return (
		<button onClick={toggleTheme} className="theme-toggle">
			{theme === "light" ? "🌙 Тёмная" : "☀️ Светлая"}
		</button>
	);
};

export default ThemeToggle;
