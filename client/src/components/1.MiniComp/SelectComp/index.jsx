import { Form } from "react-bootstrap";
import { handleFilter } from "../../2.HandleFunc";

export const SelectComp = ({ items, setData }) => {
  return (
    <Form.Select
      onChange={(e) =>
        handleFilter(e.target.value, setData, "transaksi", "transaksiByJenis")
      }
    >
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </Form.Select>
  );
};
