import React from "react";
import styles from "./index.module.css";

const PromptHapus = ({ setClickHapus, handleDelete, _id, kode }) => {
  return (
    <div className={styles.promtMainCont}>
      <div className={styles.promtCont}>
        <h4>Anda yakin ingin hapus data dengan kode '{kode}'?</h4>
        <div className={styles.pilihan}>
          <button onClick={() => setClickHapus(false)}>Batal</button>
          <button onClick={() => handleDelete(_id)}>Hapus</button>
        </div>
      </div>
    </div>
  );
};
export default PromptHapus;
