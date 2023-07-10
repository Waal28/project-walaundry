import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const MenuAccount = ({ setClickLogout, userAccount }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className={styles.mainCont}>
      <div
        className={
          show ? `${styles.navigation} ${styles.active}` : styles.navigation
        }
      >
        <div className={styles.user_box}>
          <div className={styles.image_box}>
            <img
              src="https://w7.pngwing.com/pngs/178/419/png-transparent-man-illustration-computer-icons-avatar-login-user-avatar-child-web-design-face-thumbnail.png"
              alt="avatar"
            />
          </div>
          <div className={styles.username}>
            <p>
              {userAccount.username} <b>({userAccount.hakAkses})</b>
            </p>
          </div>
        </div>
        <div className={styles.menu_toggle} onClick={handleClick}></div>
      </div>
      <ul
        className={show ? `${styles.menu} ${styles.menu_active}` : styles.menu}
      >
        {userAccount.hakAkses === "Admin" ? (
          <li onClick={() => navigate("/hakAkses")}>
            <i className="bi bi-person-fill-lock"></i>Hak Akses
          </li>
        ) : null}
        <li onClick={() => setClickLogout(true)}>
          <i className="bi bi-box-arrow-right"></i>Logout
        </li>
      </ul>
    </div>
  );
};

export default MenuAccount;
