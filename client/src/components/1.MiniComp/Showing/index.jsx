import { Form } from "react-bootstrap";

const Showing = ({ setItemsPerPage, setItemOffset }) => {
  const ubahShowing = (e) => {
    setItemsPerPage(e.target.value);
    setItemOffset(0);
  };
  return (
    <div
      style={{
        display: "flex",
        color: "white",
        fontWeight: "500",
        alignItems: "center",
        justifyContent: "space-between",
        width: "135px",
      }}
    >
      <label htmlFor="showing">Showing :</label>
      <div>
        <Form.Select id="showing" onChange={ubahShowing}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default Showing;
