import React, { useState } from "react";
import styles from "./sidebaritem.module.css";
import { Link } from "react-router-dom";

const SideBarItems = ({ item }) => {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          open
            ? `${styles.sidebar_item} ${styles.open}`
            : `${styles.sidebar_item}`
        }
      >
        <div className={styles.sidebar_title} onClick={() => setOpen(!open)}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className={`bi-chevron-down ${styles.toggle_btn}`}
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className={styles.sidebar_content}>
          {item.childrens.map((child, index) => (
            <SideBarItems key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={item.path || "#"}
        className={`${styles.sidebar_item} ${styles.plain}`}
      >
        <div className={styles.sidebar_title}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
        </div>
      </Link>
    );
  }
};

export default SideBarItems;
