import { useState } from "react";
import CreateUser from "./components/Users/CreateUser";
import UserList from "./components/Users/UserList";

const App = () => {
  const [userList, setUserList] = useState([]);

  const getUserHandler = (user) => {
    setUserList(user)
  };
  return (
    <div>
      <CreateUser onGetUsers={getUserHandler} />
      <UserList users={userList} />
    </div>
  );
};

export default App;