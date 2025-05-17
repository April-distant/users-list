import { useState } from "react";
import Card from "../UI/Card";
import styles from "./CreateUser.module.css";
import Button from "../UI/Button";

const CreateUser = (props) => {

    const [inputName, setInputName] = useState("");
    const [inputAge, setInputAge] = useState("");

    const createUserHandler = (event) => {
        event.preventDefault();
        console.log(inputName, inputAge);
    };

    const nameChangeHandler = (event) => {
        setInputName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setInputAge(event.target.value);
    };

    return (
        <Card className={styles.input}>
            <form onSubmit={createUserHandler}>
                <label htmlFor="name">Имя</label>
                <input id="name" type="text" onChange={nameChangeHandler} />
                {/* onChange - возникнет только когда измененный элемент потеряет фокус */}
                <label htmlFor="age">Возраст</label>
                <input id="age" type="number" onChange={ageChangeHandler} />
                {/* <button type="submit">Добавить Пользователя</button> */}
                <Button type="submit">Добавить Пользователя</Button>
            </form>
        </Card>
    );
};

export default CreateUser;