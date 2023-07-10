import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const RincianCard = ({ item, status }) => {
  const bg = item.bg;
  const [loading, setLoading] = useState(
    <div className={styles.loader_container}>
      <div className={styles.lds_dual_ring}></div>
    </div>
  );
  useEffect(() => {
    setTimeout(() => {
      setLoading(0);
    }, 2000);
  }, []);
  return (
    // <Container className={styles.cards}>
    <div className={`${styles.card} ${styles[bg]}`}>
      <h3 className={styles.card__title}>{item.title}</h3>
      <div className={styles.svg}>{item.icon}</div>
      <div className={styles.card__jumlah}>
        {status.length < 1 ? loading : status.length}
      </div>
    </div>
    // </Container>
  );
};

export default RincianCard;
