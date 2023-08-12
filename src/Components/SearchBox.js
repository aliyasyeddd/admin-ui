import React from "react";
import { Box } from "@mui/material";
import "./SearchBox.css";

const SearchBox = ({ performSearch, filterUsers }) => {
  return (
    <div className="header">
      <div className="title">
      <div  id="icon"></div>
      <h1> Admin UI</h1>
      </div>
      <Box className="search-field">
        <input
          className="search-text"
          placeholder="Search by name, email or role......"
          type="text"
          value={filterUsers}
          onChange={performSearch}
        />
      </Box>
    </div>
  );
};

export default SearchBox;
