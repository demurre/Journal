import { useContext, useState } from "react";
import styles from "./SelectUser.module.css";
import { UserContext } from "../../context/user.context";
import UserAddButton from "../UserAddButton/UserAddButton";

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);
  const [newUserName, setNewUserName] = useState("");

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  const handleNewUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleAddUser = (newUserId) => {
    setUserId(newUserId);
    setNewUserName("");
  };

  return (
    <>
      <select
        className={styles.select}
        name="user"
        id="user"
        value={userId}
        onChange={changeUser}
      >
        <option value="">Select User</option>
        {JSON.parse(localStorage.getItem("users") || "[]").map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className={styles["form-row"]}>
        <input
          className={styles.addUser}
          type="text"
          value={newUserName}
          onChange={handleNewUserNameChange}
          placeholder="Enter new user name"
          id="add-user"
        />
        <UserAddButton onAddUser={handleAddUser} newUserName={newUserName}>
          Add
        </UserAddButton>
      </div>
    </>
  );
}

export default SelectUser;
