import CardButton from "../CardButton/CardButton";
import "./UserAddButton.css";

function UserAddButton({ onAddUser, newUserName }) {
  const handleAddUser = () => {
    if (newUserName.trim() !== "") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const newUserId = users.length
        ? Math.max(...users.map((user) => user.id)) + 1
        : 1;
      const newUser = {
        id: newUserId,
        name: newUserName,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      onAddUser(newUserId);
    }
  };
  return (
    <CardButton
      className="user-add"
      onClick={handleAddUser}
      id="add-user-button"
    >
      Add
    </CardButton>
  );
}

export default UserAddButton;
