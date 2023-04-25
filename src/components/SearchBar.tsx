import React from "react";

import "./SearchBar.scss";

interface SearchBarProps {
  handleQueryOnChange: (value: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  const { handleQueryOnChange } = props;

  return (
    <div className="searchBoxWrapper">
      <input
        type="text"
        className="searchBox"
        placeholder="Search query goes here!"
        onChange={(e) => handleQueryOnChange(e.target.value)}
      />
    </div>
  );
}
