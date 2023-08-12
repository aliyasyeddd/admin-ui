import React, { useState } from "react";
import "./UserData.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Button } from "@mui/material";

const UserData = ({
  users,
  handleDelete,
  handleSelect,
  handleSelectAll,
  firstPage,
  lastPage,
  setUsers,
}) => {
  //set edit users while on clicking on edit button
  const [editUserId, setEditUserId] = useState(1);
  //storing the edited user data
  const [userEditForm, setUserEditForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  //clicking on edit button to edit the user data and set the data in the  state variable
  const handleUserEdit = (e, id, name, email, role) => {
    e.preventDefault();
    setEditUserId(id);
    const formData = {
      id: id,
      name: name,
      email: email,
      role: role,
    };
    setUserEditForm(formData);
  };

  //saving the data edited by user , after editing it should save data without expectation of persistancce
  const handleUserEditFormSave = (e) => {
    e.preventDefault();
    const userEdited = {
      id: editUserId,
      name: userEditForm.name,
      email: userEditForm.email,
      role: userEditForm.role,
    };
    const updatedUser = [...users];
    const userIndex = updatedUser.findIndex((user) => user.id === editUserId);
    updatedUser[userIndex] = userEdited;
    setUsers(updatedUser);
    setEditUserId(null);
  };

  //when user has updated the user data
  const handleUserEditUpdate = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserEditForm({ ...userEditForm, [name]: value });
  };

  //cancels the data that entered and then shows original data of user
  const handleUserEditCancel = (e) => {
    e.preventDefault();
    setEditUserId(null);
  };

  return (
    <div>
      <form onSubmit={handleUserEditFormSave}>
        <table className="table-responsive">
          <thead className="table-head">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    users
                      .slice(firstPage, lastPage)
                      .filter((user) => user?.isChecked !== true).length < 1
                  }
                  onChange={handleSelectAll}
                ></input>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {users.map((user) => {
              const { id, name, email, role } = user;
              //should render according to edit button
              return editUserId === user.id ? (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      id={id}
                      name={name}
                      disabled={true}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      defaultValue={name}
                      onChange={handleUserEditUpdate}
                      placeholder="Enter name..."
                    ></input>
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      defaultValue={email}
                      onChange={handleUserEditUpdate}
                      placeholder="Enter email..."
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="role"
                      defaultValue={role}
                      onChange={handleUserEditUpdate}
                      placeholder="Enter role..."
                    ></input>
                  </td>
                  <td>
                    {editUserId ? (
                      <>
                        <Button
                          type="submit"
                          title="update"
                          className="icon-save"
                        >
                          <FaRegSave />
                        </Button>
                        <Button
                          type="button"
                          title="cancel"
                          className="icon-cancel"
                          onClick={handleUserEditCancel}
                        >
                          <GiCancel />
                        </Button>
                      </>
                    ) : null}
                  </td>
                </tr>
              ) : (
                //users are sorted by id not by alphabetic order
                <tr key={id} className={user.isChecked ? "selected" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      id={id}
                      name={name}
                      checked={user?.isChecked || false}
                      onChange={handleSelect}
                    ></input>
                  </td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>
                    <Button
                      className="icon-edit"
                      size="large"
                      onClick={(e) => handleUserEdit(e, id, name, email, role)}
                    >
                      <TbUserEdit />
                    </Button>
                    <Button
                      className="icon-delete"
                      size="large"
                      onClick={() => handleDelete(id)}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};
export default UserData;
