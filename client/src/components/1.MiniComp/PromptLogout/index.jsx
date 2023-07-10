import React from "react";
import styles from "./index.module.css";

const PromptLogout = ({ setClickLogout, handleLogout, _id, kode }) => {
  return (
    <div className={styles.promtMainCont}>
      <div className={styles.promtCont}>
        <h4>Keluar aplikasi?</h4>
        <div className={styles.pilihan}>
          <button onClick={() => setClickLogout(false)}>Batal</button>
          <button onClick={() => handleLogout(_id)}>Keluar</button>
        </div>
      </div>
    </div>
  );
};
export default PromptLogout;
