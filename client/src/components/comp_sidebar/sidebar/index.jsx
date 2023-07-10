import React from "react";
import styles from "./sidebar.module.css";
import SideBarItems from "./sidebaritems";
import DataSidebar from "../data/sidebar";
import logo from "./logo.jpg";

const SideBar = ({ children }) => {
  const { dataAdmin, dataKasir } = DataSidebar();
  const hakAkses = localStorage.getItem("hakAkses");
  const data = hakAkses === "Admin" ? dataAdmin : dataKasir;
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.imgcont}>
          <img src={logo} alt="" />
        </div>

        {data.map((item, index) => (
          <SideBarItems key={index} item={item} />
        ))}
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default SideBar;
