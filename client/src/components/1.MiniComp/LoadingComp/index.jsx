import React from "react";
import styles from "./index.module.css";

const LoadingComp = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.lds_dual_ring}></div>
    </div>
  );
};

export default LoadingComp;
