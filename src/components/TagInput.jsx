// components/TagInput.jsx
import React, { useState } from "react";

const TagInput = ({ tags, setTags, existingTags }) => {
	const [inputValue, setInputValue] = useState("");

	const handleAddTag = () => {
		if (inputValue.trim() && !tags.includes(inputValue.trim())) {
			setTags([...tags, inputValue.trim()]);
			setInputValue("");
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	return (
		<div className="tag-input">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Тег (нажмите Enter или кнопку +)"
				onKeyDown={(e) =>
					e.key === "Enter" && (e.preventDefault(), handleAddTag())
				}
			/>
			<button type="button" onClick={handleAddTag}>
				+
			</button>
			<div className="tags">
				{tags.map((tag) => (
					<span key={tag} className="tag">
						{tag}
						<button
							type="button"
							onClick={() => handleRemoveTag(tag)}
						>
							×
						</button>
					</span>
				))}
			</div>
			{/* Автодополнение из существующих тегов */}
			{inputValue && (
				<div className="suggestions">
					{existingTags
						.filter(
							(tag) =>
								tag
									.toLowerCase()
									.includes(inputValue.toLowerCase()) &&
								!tags.includes(tag)
						)
						.map((tag) => (
							<div
								key={tag}
								onClick={() => {
									setTags([...tags, tag]);
									setInputValue("");
								}}
							>
								{tag}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default TagInput;
