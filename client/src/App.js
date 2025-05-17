import { useState } from "react";
import CreateUser from "./components/Users/CreateUser";
import UserList from "./components/Users/UserList";

const App = () => {
  const [userList, setUserList] = useState([]);

  const createUserHandler = (name, age) => {
    // Обновляем старое состояние
    // В setUserList передаём функцию с предыдущим состоянием 
    // Свойство prevUserList может иметь любое название
    setUserList((prevUserList) => {
      return [
        ...prevUserList,
        // id: Date.now()
        {
          name: name,
          age: age,
          id: Date.now(),
          // id: Math.random().toString()
        },
      ];
    });
  };
  return (
    <div>
      <CreateUser onCreateUser={createUserHandler} />
      <UserList users={userList} />
    </div>
  );
};

export default App;