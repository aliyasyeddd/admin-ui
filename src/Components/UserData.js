import React, { useState } from "react";
import "./UserData.css";
import { RiDeleteBin5Fill, RiSave2Line } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { Button } from "@mui/material";

const UserData = ({
  users,
  handleDelete,
  handleSelect,
  handleSelectAll,
  firstPage,
  lastPage,
}) => {
  //set edit users while on clicking on edit button
  const [editId, setEditId] = useState(1);
  

  //clicking on edit button to edit the user date
  const handleEdit = (id) => {
    setEditId(id);
  };


  //after editing it should save data without expectation of persistancce
  const handleSave = () => {
    setEditId(-1);
  };

  return (
    <div>
      <table className="table">
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
            return editId === user.id ? (
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
                  <input type="text" name="name" defaultValue={name} />
                </td>
                <td>
                  <input type="text" name="email" defaultValue={email} />
                </td>
                <td>
                  <input type="text" name="role" defaultValue={role} />
                </td>
                <td>
                  {editId ? (
                    <Button
                      title="update"
                      className="icon-save"
                      onClick={handleSave}
                    >
                      <RiSave2Line />
                    </Button>
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
                    onClick={() => handleEdit(id)}
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
    </div>
  );
};
export default UserData;
