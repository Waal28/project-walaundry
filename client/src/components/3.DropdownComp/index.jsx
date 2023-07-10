import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./index.module.css";

function DropdownComp({ items }) {
  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant="primary"
        title={
          <span>
            <i className="bi bi-filter"></i>Filter
          </span>
        }
      >
        {items.map((item, index) => (
          <Dropdown.Item
            key={`dr${index}`}
            eventKey={index}
            className={styles.item}
          >
            {item}
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item eventKey={items.length + 1} className={styles.item}>
          Default
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}

export default DropdownComp;
