import React from "react";
import styles from "./index.module.css";

const PromptUpdate = ({
  setIsStatusTransaksiChange,
  dataById,
  handleAddStatusTransaksi,
}) => {
  return (
    <div className={styles.promtMainCont}>
      <div className={styles.promtCont}>
        <h4>Tambahkan orderan '{dataById.invoice}' ke daftar transaksi?</h4>
        <div className={styles.pilihan}>
          <button onClick={() => setIsStatusTransaksiChange(false)}>
            Batal
          </button>
          <button onClick={handleAddStatusTransaksi}>Tambah</button>
        </div>
      </div>
    </div>
  );
};
export default PromptUpdate;
