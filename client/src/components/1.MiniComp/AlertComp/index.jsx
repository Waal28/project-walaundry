import React from "react";
import styles from "./index.module.css";

const AlertComp = ({ setIsSuccsess, AlertClass, text, gagal }) => {
  return (
    <div className={AlertClass}>
      {gagal ? (
        <div className={styles.container}>
          <div className={styles.alertTitleGagal}>
            <i className="bi bi-exclamation-circle"></i>
            <p>{text}</p>
          </div>
          <div className={styles.silangGagal}>
            <i className="bi bi-x" onClick={() => setIsSuccsess(false)}></i>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.alertTitle}>
            <i className="bi bi-check2-circle"></i>
            <p>{text}</p>
          </div>
          <div className={styles.silang}>
            <i className="bi bi-x" onClick={() => setIsSuccsess(false)}></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertComp;
