import styles from "./Card.module.css";

const Card = (props) => {
    return (
        // Классу styles.card будет присвоен какой-то уникальное имя с префиксом
        <div className={`${styles.card} ${props.className}`}>{props.children}</div>
    );
};

export default Card;