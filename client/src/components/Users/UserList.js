import Card from "../UI/Card";
import styles from "./UserList.module.css";

const UserList = (props) => {
    return (
        // Пропс className может быть назван произвольно
        props.users.length !== 0 && (<Card className={styles.users}>
            <ul>
                {props.users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.age} лет
                    </li>
                ))}
            </ul>
        </Card>)
    );
};

export default UserList;