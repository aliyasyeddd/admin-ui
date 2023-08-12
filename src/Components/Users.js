import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import SearchBox from "./SearchBox";
import Footer from "./Footer";
import UserData from "./UserData";
import Pagination from "./Pagination";
import { Box } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const Users = () => {
  //to display the  error message
  const { enqueueSnackbar } = useSnackbar();
  //storing users in state variable after performing api call
  const [users, setUsers] = useState([]);
  //after performing searching to store the text from the user
  const [searchTerm, setSearchTerm] = useState([]);
  //to filter users while searching according to their properties
  const [filterUsers, setFilterUsers] = useState("");
  //setting current page to one on load
  const [currentpage, setCurrentPage] = useState(1);
  //setting users per page based on api endpoint
  const [usersPerPage, setUsersPerPage] = useState(10);

  //performing api call to fetch users from api endpoint through axios which return a promise
  const FetchUsers = async () => {
    let URL =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      const response = await axios.get(URL);
      setUsers(response.data);
      setSearchTerm(response.data);
    } catch (e) {
      if ( e.response === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "API is failing to respond, Could'nt fetch user's data",
          { variant: "error" }
        );
      }
    }
  };

  //calling the function only once without side effects
  useEffect(() => {
    FetchUsers();
  }, []);

  //searching users by filtering property like name, email , role
  //also setting user propereties because the data in api is in caps lock only starting letter
  const performSearch = (search) => {
    setCurrentPage(1)
    let term = search.target.value.toLowerCase();
    if (searchTerm > 0) {
      setUsers(setSearchTerm);
    } else {
      const filterResult = searchTerm.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
      setUsers(filterResult);
    }
    setFilterUsers(term);
  };

  //if no users found while performing search according to any property showing no users found
  if (!users.length) {
    return (
      <div>
        <div className="header">
          <div className="title">
            <div id="icon"></div>
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
        <Box className="no-users">
          <SentimentDissatisfied />
          <h3 className="no-users-found">No User's Data Found!!</h3>
        </Box>
      </div>
    );
  }

  //pagination - calculating and displaying users per page
  let lastPage = currentpage * usersPerPage;
  let firstpage = lastPage - usersPerPage;
  let pagesVisted = users.slice(firstpage, lastPage);

  //selecting rows of one or more users
  const handleSelect = (e) => {
    const { name, checked } = e.target;
    let checkedUser = users.map((user) =>
      user.name === name ? { ...user, isChecked: checked } : user
    );
    setUsers(checkedUser);
  };

  //sellecting all rows in current page
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    let selectedUsers = users.map((user) => {
      if (pagesVisted.includes(user)) {
        return { ...user, isChecked: checked };
      }
      return user;
    });
    setUsers(selectedUsers);
  };

  //deleting one row by clicking on  delete button which is in actions column
  const handleDelete = (deleteUser) => {
    let userDeleted = users.filter((user) => {
      return user.id !== deleteUser;
    });
    setUsers(userDeleted);
  };

  //after checking(selecting) one or more rows deleting it by clicking on delete button
  const handleDeleteSelected = (e) => {
    e.preventDefault();
    let usersSelected = [...users];
    usersSelected = usersSelected.filter((user) => {
      return !user.isChecked;
    });
    setUsers(usersSelected);
  };

  return (
    <div>
      <SearchBox filterUsers={filterUsers} performSearch={performSearch} />
      <UserData
        users={pagesVisted}
        handleDelete={handleDelete}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        firstpage={firstpage}
        lastPage={lastPage}
        setUsers={setUsers}
      />
      <Footer handleDeleteSelected={handleDeleteSelected} />
      <Pagination
        totalUsers={users.length}
        usersPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
        currentpage={currentpage}
      />
    </div>
  );
};

export default Users;
