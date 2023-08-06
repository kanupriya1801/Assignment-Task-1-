import styles from "./Card.module.css";

const Card = ({ cardData, title }) => {
  if (!cardData) return null;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString(); 
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {Object.entries(cardData).map(([key, value]) => (
        <div className={styles.cell} key={key}>
          <div className={styles.label}>{key}</div>
          <div className={styles.value}>
            {typeof value === "string" ? value : formatTimestamp(value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
