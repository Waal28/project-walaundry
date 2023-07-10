import React from "react";
import styles from "./index.module.css";

const PromptHapusSemua = ({
  table,
  setClickHapus,
  setHapusSemua,
  handleDeleteAll,
}) => {
  const handleClick = () => {
    setClickHapus(false);
    setHapusSemua(false);
  };
  return (
    <div className={styles.promtMainCont}>
      <div className={styles.promtCont}>
        <h4>Anda yakin ingin hapus semua data {table}?</h4>
        <div className={styles.pilihan}>
          <button onClick={handleClick}>Cancel</button>
          <button onClick={handleDeleteAll}>Hapus</button>
        </div>
      </div>
    </div>
  );
};
export default PromptHapusSemua;
