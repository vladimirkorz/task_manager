import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
	return (
		<input
			type="text"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			placeholder="Поиск по задачам и тегам..."
			className="search-bar"
		/>
	);
};

export default SearchBar;
