import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Table, Container, Col, Button, Row, Form } from "react-bootstrap";
import {
  deleteOneData,
  getData,
  postData,
  updateData,
} from "../../2.HandleFunc/api";
import { Link } from "react-router-dom";
import dataProfil from "./data.json";

const ProfilLaundry = () => {
  const [desc, setDesc] = useState(dataProfil.desc);
  const [outlets, setOutlets] = useState(dataProfil.outlets);
  const [filosofi, setFilosofi] = useState(dataProfil.filosofi);
  const [visi, setVisi] = useState(dataProfil.visi);
  const [misi, setMisi] = useState(dataProfil.misi);
  const [jenisLaundry, setJenisLaundry] = useState([]);
  const [process, setprocess] = useState(dataProfil.proses);

  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenProc, setIsHiddenProc] = useState(true);
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [outlet, setOutlet] = useState({
    _id: 555,
    nama: "",
    alamat: "",
    kontak: "",
  });
  const [newProcess, setNewProcess] = useState("");
  const handleAddOutlet = () => {
    setIsHidden(!isHidden);
    setOutlet({
      nama: "",
      alamat: "",
      kontak: "",
    });
  };
  const handleDeleteOutlet = (id) => {
    deleteOneData(setOutlets, "outlet", id);
  };
  const handleSimpan = (e) => {
    e.preventDefault();

    postData(setOutlets, "outlet", outlet);
    setOutlet({
      nama: "",
      alamat: "",
      kontak: "",
    });
    setIsHidden(!isHidden);
  };
  const handleChangeNama = (e, id) => {
    const newData = outlets.map((data) => {
      if (data._id === id) {
        return { ...data, nama: e.target.value };
      }
      return data;
    });
    setOutlets(newData);
  };
  const handleChangeAlamat = (e, id) => {
    const newData = outlets.map((data) => {
      if (data._id === id) {
        return { ...data, alamat: e.target.value };
      }
      return data;
    });
    setOutlets(newData);
  };
  const handleChangeKontak = (e, id) => {
    const newData = outlets.map((data) => {
      if (data._id === id) {
        return { ...data, kontak: e.target.value };
      }
      return data;
    });
    setOutlets(newData);
  };
  const handleChangeProcess = (e, id) => {
    const newData = process.map((data) => {
      if (data._id === id) {
        return { ...data, nama: e.target.value };
      }
      return data;
    });
    setprocess(newData);
  };

  const handleUpdate = () => {
    setIsClickEdit(!isClickEdit);
    return outlets.map((out) => updateData(setOutlets, "outlet", out._id, out));
  };
  useEffect(() => {
    getData(setOutlets, "outlet");
    getData(setJenisLaundry, "jenisLaundry");
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.main_header_container}>
        <h1 className={styles.header}>Profil Laundry</h1>
      </div>
      {isClickEdit ? (
        <Container className={styles.container}>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Container className={styles.content}>
                <Container>
                  <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <h2>Profil Walaundry</h2>
                    </Col>
                    <Col md={3} style={{ textAlign: "right" }}>
                      <Button
                        onClick={handleUpdate}
                        variant="outline-secondary"
                        className="ms-2"
                      >
                        Simpan
                      </Button>
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-3">
                  <h4>Deskripsi</h4>
                  <Form.Control
                    as="textarea"
                    size="sm"
                    rows={8}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Container>
                <Container>
                  <Form onSubmit={handleSimpan}>
                    <div className="d-flex align-items-center">
                      <h4>Cabang</h4>
                    </div>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th width="30px">No</th>
                          <th width="150px">Outlet</th>
                          <th width="270px">Alamat</th>
                          <th>Kontak</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outlets.map((outlet, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="text"
                                required
                                value={outlet.nama}
                                onChange={(e) =>
                                  handleChangeNama(e, outlet._id)
                                }
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="text"
                                required
                                value={outlet.alamat}
                                onChange={(e) =>
                                  handleChangeAlamat(e, outlet._id)
                                }
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="text"
                                required
                                value={outlet.kontak}
                                onChange={(e) =>
                                  handleChangeKontak(e, outlet._id)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Form>
                </Container>
                <Container>
                  <h4>Filosofi</h4>
                  <Form.Control
                    as="textarea"
                    size="sm"
                    rows={1}
                    value={filosofi}
                    onChange={(e) => setFilosofi(e.target.value)}
                  />
                </Container>
                <Container>
                  <h4>Visi</h4>
                  <Form.Control
                    as="textarea"
                    size="sm"
                    rows={2}
                    value={visi}
                    onChange={(e) => setVisi(e.target.value)}
                  />
                </Container>
                <Container>
                  <h4>Misi</h4>
                  <Form.Control
                    as="textarea"
                    size="sm"
                    rows={3}
                    value={misi}
                    onChange={(e) => setMisi(e.target.value)}
                  />
                </Container>
                <Container>
                  <h4>Jasa</h4>
                  <p>Kami menawarkan pelayanan jasa laundry meliputi:</p>
                  <ul>
                    {jenisLaundry.map((jenis, index) => (
                      <li key={index}>{jenis.nama}</li>
                    ))}
                  </ul>
                </Container>
                <Container>
                  <div className="d-flex align-items-center">
                    <h4>Proses Pengerjaan</h4>
                    <i className="bi bi-plus-circle ms-2"></i>
                  </div>
                  <p>Proses pengerjaan laundry kami adalah sebagai berikut:</p>
                  <ul>
                    {process.map((proc, index) => (
                      <li key={index}>
                        <Form.Control
                          as="textarea"
                          size="sm"
                          rows={3}
                          value={proc.nama}
                          onChange={(e) => handleChangeProcess(e, proc._id)}
                        />
                      </li>
                    ))}
                  </ul>
                </Container>
              </Container>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className={styles.container}>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Container className={styles.content}>
                <Container>
                  <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <h2>Profil Walaundry</h2>
                    </Col>
                    <Col md={3} style={{ textAlign: "right" }}>
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() => setIsClickEdit(!isClickEdit)}
                      ></i>
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-3">
                  <h4>Deskripsi</h4>
                  <p>{desc}</p>
                </Container>
                <Container>
                  <Form onSubmit={handleSimpan}>
                    <div className="d-flex align-items-center">
                      <h4>Cabang</h4>
                      <i
                        className="bi bi-plus-circle ms-2"
                        onClick={handleAddOutlet}
                      ></i>
                      {!isHidden && (
                        <Button
                          variant="outline-secondary"
                          type="submit"
                          className="ms-2"
                        >
                          Simpan
                        </Button>
                      )}
                    </div>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th width="30px">No</th>
                          <th width="150px">Outlet</th>
                          <th width="270px">Alamat</th>
                          <th>Kontak</th>
                          {!isHidden && <th></th>}
                        </tr>
                      </thead>
                      <tbody>
                        {outlets.map((outlet, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{outlet.nama}</td>
                            <td>{outlet.alamat}</td>
                            <td>{outlet.kontak} </td>
                            {!isHidden && (
                              <td>
                                <i
                                  className="bi bi-trash"
                                  onClick={() => handleDeleteOutlet(outlet._id)}
                                ></i>
                              </td>
                            )}
                          </tr>
                        ))}
                        <tr style={isHidden ? { display: "none" } : null}>
                          <td>{outlets.length + 1}</td>
                          <td>
                            <Form.Control
                              size="sm"
                              type="text"
                              required
                              value={outlet.nama}
                              onChange={(e) =>
                                setOutlet({ ...outlet, nama: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <Form.Control
                              size="sm"
                              required
                              type="text"
                              value={outlet.alamat}
                              onChange={(e) =>
                                setOutlet({ ...outlet, alamat: e.target.value })
                              }
                            />
                          </td>
                          <td colSpan={2}>
                            <Form.Control
                              size="sm"
                              type="text"
                              required
                              value={outlet.kontak}
                              onChange={(e) =>
                                setOutlet({ ...outlet, kontak: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Form>
                </Container>
                <Container>
                  <h4>Filosofi</h4>
                  <p>“Memberikan manfaat bagi banyak orang”</p>
                </Container>
                <Container>
                  <h4>Visi</h4>
                  <p>"{visi}"</p>
                </Container>
                <Container>
                  <h4>Misi</h4>
                  <p>"{misi}"</p>
                </Container>
                <Container>
                  <h4>Jasa</h4>
                  <p>Kami menawarkan pelayanan jasa laundry meliputi:</p>
                  <ul>
                    {jenisLaundry.map((jenis, index) => (
                      <li key={index}>{jenis.nama}</li>
                    ))}
                  </ul>
                </Container>
                <Container>
                  <div className="d-flex align-items-center">
                    <h4>Proses Pengerjaan</h4>
                    <i
                      className="bi bi-plus-circle ms-2"
                      onClick={() => setIsHiddenProc(!isHiddenProc)}
                    ></i>
                  </div>
                  <p>Proses pengerjaan laundry kami adalah sebagai berikut:</p>
                  <ul>
                    {process.map((proc, index) => (
                      <li key={index}>{proc.nama}</li>
                    ))}
                    {isHiddenProc ? null : (
                      <li>
                        <Form.Control
                          size="sm"
                          type="text"
                          required
                          value={newProcess}
                          onChange={(e) => setNewProcess(e.target.value)}
                        />
                      </li>
                    )}
                  </ul>
                </Container>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ProfilLaundry;
