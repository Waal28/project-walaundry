import React, { useEffect, useReducer, useState } from "react";
import { Row, Col, Form, InputGroup, Table, Container } from "react-bootstrap";
import { getData } from "../../../2.HandleFunc/api";
import styles from "./index.module.css";

const InputCompt = ({ name, value, isClick, checked, onChange }) => {
  return (
    <Form.Group as={Col} className={checked ? null : styles.checked}>
      <InputGroup>
        {isClick ? (
          <InputGroup.Text>
            <b>Rp.</b>
          </InputGroup.Text>
        ) : null}

        <Form.Control
          name={name}
          type="number"
          placeholder="0"
          onChange={onChange}
          value={value}
          disabled={!checked}
          required
        />
      </InputGroup>
    </Form.Group>
  );
};
const initialState = {
  dataPengeluaran: [
    {
      nama: "Listrik",
      qty: "",
      biaya: "",
      checked: false,
      jmlh_input_biaya: 1,
    },
    {
      nama: "Deterjen",
      qty: "",
      biaya: "",
      checked: false,
      jmlh_input_biaya: 1,
    },
    {
      nama: "Pewangi",
      qty: "",
      biaya: "",
      checked: false,
      jmlh_input_biaya: 1,
    },
    {
      nama: "Air",
      qty: "",
      biaya: "",
      checked: false,
      jmlh_input_biaya: 1,
    },
    {
      nama: "Gaji Karyawan",
      qty: "",
      gajiPerorang: "",
      biaya: "",
      checked: false,
      jmlh_input_biaya: 2,
    },
    {
      nama: "Lainnya",
      qty: "",
      biaya: "",
      checked: false,
      jmlh_input_biaya: 1,
    },
  ],
};
const reducer = (state, action) => {
  let newData = "";
  switch (action.type) {
    case "CHECKED_CHANGE":
      newData = state.map((n) => {
        if (n.nama === action.payload) {
          if (n.jmlh_input_biaya === 2) {
            return {
              ...n,
              qty: "",
              gajiPerorang: "",
              biaya: "",
              checked: !n.checked,
            };
          } else {
            return { ...n, qty: "", biaya: "", checked: !n.checked };
          }
        }
        return n;
      });
      return newData;
    case "QTY_CHANGE":
      newData = state.map((n) => {
        if (n.nama === action.payload) {
          if (n.jmlh_input_biaya === 2) {
            return {
              ...n,
              qty: action.targetValue,
              biaya: n.gajiPerorang * action.targetValue,
            };
          } else {
            return {
              ...n,
              qty: action.targetValue,
            };
          }
        }
        return n;
      });
      return newData;
    case "GAJI_CHANGE":
      newData = state.map((n) => {
        if (n.nama === action.payload) {
          return {
            ...n,
            gajiPerorang: action.targetValue,
            biaya: n.qty * action.targetValue,
          };
        }
        return n;
      });
      return newData;
    case "BIAYA_CHANGE":
      newData = state.map((n) => {
        if (n.nama === action.payload) {
          if (n.jmlh_input_biaya === 2) {
            return { ...n, biaya: n.biaya };
          } else {
            return { ...n, biaya: action.targetValue };
          }
        }
        //
        return n;
      });
      return newData;
    case "HAPUS_SEMUA":
      newData = state.map((n) => {
        if (n.checked === true) {
          if (n.jmlh_input_biaya === 2) {
            return {
              ...n,
              qty: "",
              gajiPerorang: "",
              biaya: "",
              checked: false,
            };
          } else {
            return { ...n, qty: "", biaya: "", checked: false };
          }
        }
        return n;
      });
      return newData;
    default:
      throw new Error();
  }
};

// parent function
const TambahMember = ({
  fade,
  handleClose,
  dataForm,
  setDataForm,
  postData,
  waktu,
  setText,
  setGagal,
  setIsSuccsess,
  postDataTransaksi,
  setClickDetail,
  setClickAdd,
  setFadeAdd,
  setFadeDetail,
}) => {
  const username = localStorage.getItem("username");
  const [dataPengeluaran, dispatch] = useReducer(
    reducer,
    initialState.dataPengeluaran
  );
  const dataFill = dataPengeluaran.filter((fill) => fill.checked === true);
  const total = dataFill.reduce((acc, obj) => acc + +obj.biaya, 0);

  const handleChange = (tipe, nama, target) => {
    dispatch({ type: tipe, payload: nama, targetValue: target });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const checked = dataPengeluaran.filter((fill) => fill.checked === false);
    if (checked.length >= dataPengeluaran.length) {
      setIsSuccsess(true);
      setText("Data masih kosong");
      setGagal(true);
    } else {
      const dataDikirim = {
        kd_transaksi: dataForm.kd_transaksi,
        outlet: dataForm.outlet,
        tanggal: dataForm.tanggal,
        waktu: waktu,
        jenis: dataFill.map((m) => m.nama),
        qty: dataFill.map((m) => m.qty),
        biaya: dataFill.map((m) => m.biaya),
        total: total,
        keterangan: dataForm.keterangan,
        user: username,
        jenis_transaksi: "Pengeluaran",
      };
      const dataTransaksiPost = {
        kd_transaksi: dataForm.kd_transaksi,
        outlet: dataForm.outlet,
        total: total,
        jenis_transaksi: "Pengeluaran",
        waktu_transaksi: new Date(),
        keterangan: dataFill.map((m) => m.nama).join(", "),
        user: username,
        nama_tabel: "Transaksi",
      };
      postDataTransaksi(dataTransaksiPost);
      postData(e, dataDikirim);
      dispatch({ type: "HAPUS_SEMUA" });
      // close form tambah pengeluaran
      setTimeout(() => {
        setClickDetail(false);
        setClickAdd(false);
      }, 800);
      setFadeAdd(false);
      setFadeDetail(false);
    }
  };

  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    getData(setOutlets, "outlet");
  }, []);
  return (
    <div
      className={fade ? `${styles.container} ${styles.fade}` : styles.container}
    >
      <Container>
        <Form onSubmit={handleSubmit}>
          <i className={`${styles.back} bi bi-x`} onClick={handleClose}></i>
          {/* baris 1 */}
          <Row className="pt-4">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Tanggal Transaksi (*auto)</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={dataForm.tanggal}
                  disabled
                />
                <InputGroup.Text>
                  <i className="bi bi-calendar2"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>waktu (*auto)</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={waktu}
                  disabled
                  style={{ textAlign: "center" }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Kode Transaksi (*auto)</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-receipt"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={dataForm.kd_transaksi}
                  disabled
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} xs={4}>
              <Form.Label>Outlet</Form.Label>
              <Form.Select
                value={dataForm.outlet}
                onChange={(e) =>
                  setDataForm({ ...dataForm, outlet: e.target.value })
                }
              >
                {outlets.map((outlet, index) => (
                  <option key={index} value={outlet.nama}>
                    {outlet.nama}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          {/* baris 2 */}
          <Row className="mt-4">
            <Container>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th width="30px">Check</th>
                    <th>No</th>
                    <th>Jenis Pengeluaran</th>
                    <th width="70px">Qty</th>
                    <th width="400px">Biaya</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPengeluaran.map((p, index) => (
                    <tr key={index}>
                      <td>
                        <section>
                          <Form.Check
                            // checked={p.checked}
                            value={p.checked}
                            onChange={(e) =>
                              handleChange(
                                "CHECKED_CHANGE",
                                p.nama,
                                e.target.value
                              )
                            }
                          />
                        </section>
                      </td>
                      <td>
                        <section>{index + 1}</section>
                      </td>
                      <td>
                        <section>{p.nama}</section>
                      </td>
                      <td>
                        <InputCompt
                          value={p.qty}
                          onChange={(e) =>
                            handleChange("QTY_CHANGE", p.nama, e.target.value)
                          }
                          checked={p.checked}
                        />
                      </td>
                      <td>
                        {p.jmlh_input_biaya === 2 ? (
                          <Row>
                            <div className={styles.headerGaji}>
                              <p>Gaji per orang</p>
                              <p>Total pengeluaran gaji</p>
                            </div>
                            <InputCompt
                              value={p.gajiPerorang}
                              onChange={(e) =>
                                handleChange(
                                  "GAJI_CHANGE",
                                  p.nama,
                                  e.target.value
                                )
                              }
                              isClick={true}
                              checked={p.checked}
                            />
                            <InputCompt
                              value={p.biaya}
                              isClick={true}
                              checked={p.checked}
                            />
                          </Row>
                        ) : (
                          <InputCompt
                            value={p.biaya}
                            onChange={(e) =>
                              handleChange(
                                "BIAYA_CHANGE",
                                p.nama,
                                e.target.value
                              )
                            }
                            isClick={true}
                            checked={p.checked}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th colSpan={4}></th>
                    <th>
                      <b>Total : Rp. {total.toLocaleString()}</b>
                    </th>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </Row>
          {/* baris 3 */}
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={dataForm.keterangan}
                onChange={(e) =>
                  setDataForm({ ...dataForm, keterangan: e.target.value })
                }
              />
            </Form.Group>
            <Container>
              <div className={styles.btnAddCont}>
                <button type="submit" className={styles.btn}>
                  <i className="bi bi-plus-lg"></i>
                  Tambah
                </button>
              </div>
            </Container>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default TambahMember;
