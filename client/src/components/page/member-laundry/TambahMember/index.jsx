import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, InputGroup } from "react-bootstrap";
import { getData } from "../../../2.HandleFunc/api";
import styles from "./index.module.css";

const propertiMember = [
  {
    name: "Nama Lengkap",
    nameForm: "nama",
    icon: "bi bi-person-fill",
    placeholder: "Input Nama Lengkap",
  },
  {
    name: "Nomor Telepon",
    nameForm: "noHp",
    icon: "bi bi-telephone-fill",
    placeholder: "Input No Telepon",
  },
  {
    name: "Alamat",
    nameForm: "alamat",
    icon: "bi bi-geo-alt-fill",
    placeholder: "Input Alamat",
  },
];
const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const jabatan = ["Owner", "Kasir", "Tenaga Cuci", "Tenaga Setrika"];
const TambahMember = ({
  fade,
  handleClose,
  dataForm,
  setDataForm,
  handleSubmit,
  isClickUpdate,
  dataById,
  setDataById,
}) => {
  const handleChange = (e) => {
    if (isClickUpdate) {
      setDataById({ ...dataById, [e.target.name]: e.target.value });
    } else {
      setDataForm({ ...dataForm, [e.target.name]: e.target.value });
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
      {isClickUpdate ? (
        <>
          <h2 className={styles.header}>UPDATE PETUGAS</h2>
          <i className={`${styles.back} bi bi-x`} onClick={handleClose}></i>
          <Container>
            <Form onSubmit={handleSubmit}>
              {propertiMember.map((prop, index) => (
                <Row className="mb-4" key={index}>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className={prop.icon}></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={prop.nameForm === "noHp" ? "number" : "text"}
                        placeholder={prop.name}
                        name={prop.nameForm}
                        value={dataById[prop.nameForm]}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              ))}
              <Row className="mb-4">
                <Col md={4}>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-fill-gear"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="jabatan"
                      value={dataById.jabatan}
                      onChange={handleChange}
                    >
                      <option defaultValue="Owner">-Jabatan-</option>
                      {jabatan.map((j, index) => (
                        <option key={index} value={j}>
                          {j}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col md={5}>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-shop"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="outlet"
                      value={dataById.outlet}
                      onChange={handleChange}
                    >
                      {outlets.map((outlet, index) => (
                        <option key={index} value={outlet.nama}>
                          {outlet.nama}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-house-door-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Tempat"
                      name="tempat"
                      value={dataById.tempat}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    placeholder="Tgl"
                    className="text-center"
                    name="tanggal"
                    value={dataById.tanggal}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={2}>
                  <Form.Select
                    name="bulan"
                    value={dataById.bulan}
                    onChange={handleChange}
                  >
                    {month.map((m, index) => (
                      <option key={index} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    placeholder="Tahun"
                    className="text-center"
                    name="tahun"
                    value={dataById.tahun}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <input
                    type="radio"
                    id="pria"
                    name="gender"
                    value="Pria"
                    checked={dataById.gender === "Pria"}
                    onChange={handleChange}
                  />
                  <label htmlFor="pria">Pria</label>
                </Col>
                <Col md={2}>
                  <input
                    type="radio"
                    id="wanita"
                    name="gender"
                    value="Wanita"
                    checked={dataById.gender === "Wanita"}
                    onChange={handleChange}
                  />
                  <label htmlFor="wanita">Wanita</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 10 }}>
                  <button type="submit">Simpan</button>
                </Col>
              </Row>
            </Form>
          </Container>
        </>
      ) : (
        <>
          <h2 className={styles.header}>TAMBAH PETUGAS</h2>
          <i className={`${styles.back} bi bi-x`} onClick={handleClose}></i>
          <Container>
            <Form onSubmit={handleSubmit}>
              {propertiMember.map((prop, index) => (
                <Row className="mb-4" key={index}>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className={prop.icon}></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={prop.nameForm === "noHp" ? "number" : "text"}
                        placeholder={prop.name}
                        name={prop.nameForm}
                        value={dataForm.nameForm}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              ))}
              <Row className="mb-4">
                <Col md={4}>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-fill-gear"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="jabatan"
                      value={dataForm.jabatan}
                      onChange={handleChange}
                    >
                      <option defaultValue="Owner">-Jabatan-</option>
                      {jabatan.map((j, index) => (
                        <option key={index} value={j}>
                          {j}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col md={5}>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-shop"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="outlet"
                      value={dataForm.outlet}
                      onChange={handleChange}
                    >
                      {outlets.map((outlet, index) => (
                        <option key={index} value={outlet.nama}>
                          {outlet.nama}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-house-door-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Tempat"
                      name="tempat"
                      value={dataForm.tempat}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    placeholder="Tgl"
                    className="text-center"
                    name="tanggal"
                    value={dataForm.tanggal}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={2}>
                  <Form.Select
                    name="bulan"
                    value={dataForm.bulan}
                    onChange={handleChange}
                  >
                    {month.map((m, index) => (
                      <option key={index} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    placeholder="Tahun"
                    className="text-center"
                    name="tahun"
                    value={dataForm.tahun}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <input
                    type="radio"
                    id="pria"
                    name="gender"
                    value="Pria"
                    checked={dataForm.gender === "Pria"}
                    onChange={handleChange}
                  />
                  <label htmlFor="pria">Pria</label>
                </Col>
                <Col md={2}>
                  <input
                    type="radio"
                    id="wanita"
                    name="gender"
                    value="Wanita"
                    checked={dataForm.gender === "Wanita"}
                    onChange={handleChange}
                  />
                  <label htmlFor="wanita">Wanita</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 10 }}>
                  <button type="submit">Simpan</button>
                </Col>
              </Row>
            </Form>
          </Container>
        </>
      )}
    </div>
  );
};

export default TambahMember;
