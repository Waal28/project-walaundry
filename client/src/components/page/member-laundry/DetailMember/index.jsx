import React from "react";
import styles from "./index.module.css";

const DetailMember = ({ fade, handleClose, dataById }) => {
  return (
    <div
      className={fade ? `${styles.container} ${styles.fade}` : styles.container}
    >
      <i className={`${styles.back} bi bi-x`} onClick={handleClose}></i>
      {/* <CardProfile /> */}
      <div className={styles.card_container}>
        <img
          className={styles.round}
          src="https://w7.pngwing.com/pngs/178/419/png-transparent-man-illustration-computer-icons-avatar-login-user-avatar-child-web-design-face-thumbnail.png"
          alt="user"
        />
        <h3>{dataById.nama}</h3>
        <h6>({dataById.idMember})</h6>
        <div className={styles.primary}>{dataById.jabatan}</div>
        <div className={styles.skills}>
          <h6>Data Pribadi</h6>
          <table>
            <tbody>
              <tr>
                <td>Gender</td>
                <td> : {dataById.gender}</td>
              </tr>
              <tr>
                <td>No Hp</td>
                <td> : 0{dataById.noHp}</td>
              </tr>
              <tr>
                <td>Ttl</td>
                <td>
                  : {dataById.tempat}, {dataById.tanggal} {dataById.bulan}{" "}
                  {dataById.tahun}
                </td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td> : {dataById.alamat}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailMember;
