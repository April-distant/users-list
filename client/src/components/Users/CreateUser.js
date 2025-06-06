import { useState, useEffect } from "react";
import Card from "../UI/Card";
import styles from "./CreateUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const CreateUser = (props) => {

    const [inputName, setInputName] = useState("");
    const [inputAge, setInputAge] = useState("");
    const [error, setError] = useState();

    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(data => { return data.json() })
            .then(users => {
                props.onGetUsers(users);
            })
            .catch(err => console.log('Ошибка', err))
    }, [])


    const createUserHandler = (event) => {
        event.preventDefault();

        // Делаем проверки валидации до отправки данных. 
        // Пока просто return, потому будет модальное окно.
        if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
            setError({
                title: "Некорректный ввод",
                message: "Поля ввода не могут быть пустыми",
            });
            return;
        }

        if (+inputAge < 1) {
            setError({
                title: "Некорректный возраст",
                message: "Возраст должен быть больше 0",
            });
            return;
        }

        // console.log(inputName, inputAge);
        // props.onCreateUser(inputName, inputAge);
        // При этом надо инпуты сделать зависимыми от состояний компонента через value.

        fetch('http://localhost:4000/user', {
            method: 'POST',
            body: JSON.stringify({
                name: inputName,
                age: inputAge
            }),
            headers: { 'Content-Type': 'application/json' }

        }).then(() => {
            fetch('http://localhost:4000/users')
                .then(data => { return data.json() })
                .then(users => {
                    props.onGetUsers(users);
                })
                .catch(err => console.log('Ошибка', err))
        })

        setInputName("");
        setInputAge("");
    };

    const nameChangeHandler = (event) => {
        setInputName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setInputAge(event.target.value);
    };

    const errorHandler = () => {
        setError(false);
    };

    return (
        <>
            {error && (
                <ErrorModal
                    onCloseModal={errorHandler}
                    title={error.title}
                    message={error.message}
                />
            )}

            <Card className={styles.input}>
                <form onSubmit={createUserHandler}>
                    <label htmlFor="name">Имя</label>
                    <input
                        id="name"
                        type="text"
                        onChange={nameChangeHandler}
                        value={inputName} />
                    {/* onChange - возникнет только когда измененный элемент потеряет фокус */}

                    <label htmlFor="age">Возраст</label>
                    <input
                        id="age"
                        type="number"
                        onChange={ageChangeHandler}
                        value={inputAge} />
                    {/* <button type="submit">Добавить Пользователя</button> */}
                    <Button type="submit">Добавить Пользователя</Button>
                </form>
            </Card>
        </>
    );
};

export default CreateUser;