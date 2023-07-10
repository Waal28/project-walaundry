import { useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./index.module.css";

const DropMenuTree = ({ item }) => {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <Dropdown.ItemText
        className={
          open
            ? `${styles.sidebar_item} ${styles.open}`
            : `${styles.sidebar_item}`
        }
      >
        <div className={styles.sidebar_title} onClick={() => setOpen(!open)}>
          <span>
            {item.icon && <i className={item.icon}></i>} {item.nama}{" "}
          </span>
          <i
            className={`bi-chevron-down ${styles.toggle_btn}`}
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className={styles.sidebar_content}>
          {item.childrens.map((child, index) => (
            <DropMenuTree key={index} item={child} />
          ))}
        </div>
      </Dropdown.ItemText>
    );
  } else {
    return (
      <Dropdown.Item
        className={styles.sidebar_item}
        value={item.value}
        onClick={item.click}
      >
        <div className={styles.sidebar_title}>
          <span>
            {item.icon && <i className={item.icon}></i>} {item.nama}
          </span>
        </div>
      </Dropdown.Item>
    );
  }
};

export function DropMenu({ items }) {
  return (
    <>
      <DropdownButton
        variant="light"
        as={ButtonGroup}
        id="dropdown-button-drop-right"
        drop="right"
        title={<i className="bi bi-menu-button"> Menu</i>}
      >
        {items.map((item, index) => (
          <DropMenuTree key={index} item={item} />
        ))}
      </DropdownButton>
    </>
  );
}
