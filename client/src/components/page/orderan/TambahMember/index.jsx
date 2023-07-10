import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import LoadingComp from "../../../1.MiniComp/LoadingComp";
import { getData, postData, updateData } from "../../../2.HandleFunc/api";
import { next2day, today } from "../../../2.HandleFunc/date";
import styles from "./index.module.css";

const TambahMember = ({
  dataForm,
  setDataForm,
  dataById,
  setDataById,
  isClickUpdate,
  setIsClickUpdate,
  setIsSuccsess,
  setText,
  setGagal,
  dataTransaksi,
  jenisLaundry,
  setDataTransaksi,
  setData,
}) => {
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const [jenisHarga, setJenisHarga] = useState({ harga: 5000 });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataTransaksiPost = {
      kd_transaksi: dataForm.invoice,
      outlet: dataForm.outlet,
      total: dataForm.total_bayar,
      jenis_transaksi: dataForm.jenis_transaksi,
      waktu_transaksi: new Date(),
      keterangan: dataForm.jenis_laundry,
      user: username,
      nama_tabel: "Transaksi",
    };
    const dataTransaksiUpdate = {
      kd_transaksi: dataById.invoice,
      outlet: dataById.outlet,
      total: dataById.total_bayar,
      jenis_transaksi: dataById.jenis_transaksi,
      waktu_transaksi: new Date(),
      keterangan: dataById.jenis_laundry,
      user: username,
      nama_tabel: "Transaksi",
    };
    if (isClickUpdate) {
      if (dataById.pelanggan === "" || dataById.berat === "") {
        setIsSuccsess(true);
        setText("Data masih kosong");
        setGagal(true);
      } else if (dataById.status_transaksi === "sudah_bayar") {
        const cekData = dataTransaksi.find(
          (data) => data.kd_transaksi === dataById.invoice
        );
        // kalau cek data === undifned baru bisa post data transaksi
        if (typeof cekData === "undefined") {
          postData(setDataTransaksi, "transaksi", dataTransaksiUpdate);
        }
        updateData(setData, "orderan", dataById._id, dataById);
      } else {
        updateData(setData, "orderan", dataById._id, dataById);
      }
      setIsClickUpdate(false);
      setIsSuccsess(true);
      setGagal(false);
      setText("Data Berhasil Diupdate");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
      setDataById({});
    } else {
      if (dataForm.pelanggan === "" || dataForm.berat === "") {
        setIsSuccsess(true);
        setText("Data masih kosong");
        setGagal(true);
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
      } else if (dataForm.status_transaksi === "sudah_bayar") {
        postData(setDataTransaksi, "transaksi", dataTransaksiPost);
        postData(setData, "orderan", dataForm);
        setIsSuccsess(true);
        setText("Data Berhasil Ditambahkan");
        setGagal(false);
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
        setDataForm({
          invoice: "LD" + Math.floor(Math.random() * 1000),
          waktu_invoice: today,
          waktu_selesai: next2day,
          pelanggan: "",
          outlet: "Walaundry Marpoyan",
          jenis_laundry: "Cuci Setrika",
          status_laundry: "diproses",
          status_transaksi: "belum_bayar",
          berat: 1,
          total_bayar: 5000,
          keterangan: "",
          user: username,
          jenis_transaksi: "Orderan",
        });
      } else {
        postData(setData, "orderan", dataForm);
        setIsSuccsess(true);
        setText("Data Berhasil Ditambahkan");
        setGagal(false);
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
        setDataForm({
          invoice: "LD" + Math.floor(Math.random() * 1000),
          waktu_invoice: today,
          waktu_selesai: next2day,
          pelanggan: "",
          outlet: "Walaundry Marpoyan",
          jenis_laundry: "Cuci Setrika",
          status_laundry: "diproses",
          status_transaksi: "belum_bayar",
          berat: 1,
          total_bayar: 5000,
          keterangan: "",
          user: username,
          jenis_transaksi: "Orderan",
        });
      }
    }
  };
  const handleChange = (e) => {
    const tes = jenisLaundry.find((jenis) => jenis.nama === e.target.value);
    setJenisHarga(tes);
    if (isClickUpdate) {
      setDataById({
        ...dataById,
        jenis_laundry: e.target.value,
        total_bayar: dataById.berat * tes.harga,
      });
    } else {
      setDataForm({
        ...dataForm,
        jenis_laundry: e.target.value,
        total_bayar: dataForm.berat * tes.harga,
      });
    }
  };
  useEffect(() => {
    if (isClickUpdate) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      setLoading(true);
    }
  }, [isClickUpdate]);

  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    getData(setOutlets, "outlet");
  }, []);
  return (
    <Container className={styles.container}>
      {isClickUpdate ? (
        <Form>
          <h2 className={styles.header}>UPDATE ORDERAN</h2>
          {loading ? (
            <LoadingComp />
          ) : (
            <div>
              <Row className="mb-3">
                <Col xs={5}>
                  <Form.Text className="text-muted">
                    <b>Kode Invoice (*auto)</b>
                  </Form.Text>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <i className="bi bi-receipt"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={dataById.invoice}
                      onChange={(e) =>
                        setDataById({ ...dataById, invoice: dataById.invoice })
                      }
                      name="invoice"
                      title="Kode Invoice"
                      disabled
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Text className="text-muted">
                    <b>Outlet</b>
                  </Form.Text>
                  <InputGroup>
                    <Form.Select
                      name="outlet"
                      className={styles.selectCont}
                      value={dataById.outlet}
                      onChange={(e) =>
                        setDataById({ ...dataById, outlet: e.target.value })
                      }
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
              <Row className="mb-3">
                <Col xs={6}>
                  <Form.Text className="text-muted">
                    <b>Tanggal Terima</b>
                  </Form.Text>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      name="waktu_invoice"
                      required
                      value={dataById.waktu_invoice}
                      onChange={(e) =>
                        setDataById({
                          ...dataById,
                          waktu_invoice: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col xs={6}>
                  <Form.Text className="text-muted">
                    <b>Tanggal Selesai</b>
                  </Form.Text>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      name="waktu_selesai"
                      required
                      value={dataById.waktu_selesai}
                      onChange={(e) =>
                        setDataById({
                          ...dataById,
                          waktu_selesai: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <i className="bi bi-person-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Nama Pelanggan"
                    name="pelanggan"
                    required
                    value={dataById.pelanggan}
                    onChange={(e) =>
                      setDataById({ ...dataById, pelanggan: e.target.value })
                    }
                  />
                </InputGroup>
              </Row>
              <Row className="mb-3">
                <Col xs={5}>
                  <Form.Text className="text-muted">
                    <b>Jenis Laundry</b>
                  </Form.Text>
                  <InputGroup>
                    <Form.Select
                      name="jenis"
                      className={styles.selectCont}
                      value={dataById.jenis_laundry}
                      onChange={handleChange}
                    >
                      {jenisLaundry.map((jenis, index) => (
                        <option key={index} value={jenis.nama}>
                          {jenis.nama}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Text className="text-muted">
                    <b>Status Laundry</b>
                  </Form.Text>
                  <InputGroup>
                    <Form.Select
                      name="status"
                      className={styles.selectCont}
                      value={dataById.status_laundry}
                      onChange={(e) =>
                        setDataById({
                          ...dataById,
                          status_laundry: e.target.value,
                        })
                      }
                    >
                      <option value="diproses">Diproses</option>
                      <option value="selesai_cuci">Selesai Dicuci</option>
                      <option value="selesai_gosok">Selesai Digosok</option>
                      <option value="sudah_diambil">Sudah Diambil</option>
                    </Form.Select>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Text className="text-muted">
                    <b>Status Transaksi</b>
                  </Form.Text>
                  <InputGroup>
                    <Form.Select
                      name="transaksi"
                      className={styles.selectCont}
                      value={dataById.status_transaksi}
                      onChange={(e) =>
                        setDataById({
                          ...dataById,
                          status_transaksi: e.target.value,
                        })
                      }
                    >
                      {dataById.status_transaksi === "belum_bayar" ? (
                        <>
                          <option value="belum_bayar">Belum Bayar</option>
                          <option value="sudah_bayar">Sudah Bayar</option>
                        </>
                      ) : (
                        <option value="sudah_bayar">Sudah Bayar</option>
                      )}
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col className="d-flex flex-column justify-content-end align-items-end">
                  <InputGroup>
                    <Form.Control
                      type="number"
                      step="any"
                      placeholder="Berat"
                      name="berat"
                      required
                      value={dataById.berat}
                      onChange={(e) =>
                        setDataById({
                          ...dataById,
                          berat: e.target.value,
                          total_bayar: e.target.value * jenisHarga.harga,
                        })
                      }
                    />
                    <InputGroup.Text>
                      <b>Kg</b>
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <b>Rp.</b>
                  </InputGroup.Text>
                  <Form.Control
                    disabled
                    name="total"
                    placeholder={dataById.total_bayar.toLocaleString()}
                  />
                </InputGroup>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      placeholder="Keterangan"
                      value={dataById.keterangan}
                      onChange={(e) =>
                        setDataById({ ...dataById, keterangan: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className=" d-flex justify-content-around">
                <input
                  type="hidden"
                  name="jenis_transaksi"
                  value={dataById.jenis_transaksi}
                />

                <Button
                  as={Col}
                  xs={3}
                  type="button"
                  variant="secondary"
                  onClick={() => setIsClickUpdate(false)}
                >
                  Batal
                </Button>
                <Button
                  as={Col}
                  xs={3}
                  variant="success"
                  onClick={handleSubmit}
                >
                  Simpan
                </Button>
              </Row>
            </div>
          )}
        </Form>
      ) : (
        <Form>
          <h2 className={styles.header}>TAMBAH ORDERAN</h2>
          <Row className="mb-3">
            <Col xs={5}>
              <Form.Text className="text-muted">
                <b>Kode Invoice (*auto)</b>
              </Form.Text>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <i className="bi bi-receipt"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder={dataForm.invoice}
                  name="invoice"
                  title="Kode Invoice"
                  disabled
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Text className="text-muted">
                <b>Outlet</b>
              </Form.Text>
              <InputGroup>
                <Form.Select
                  name="outlet"
                  className={styles.selectCont}
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
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={6}>
              <Form.Text className="text-muted">
                <b>Tanggal Terima</b>
              </Form.Text>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="waktu_invoice"
                  required
                  value={dataForm.waktu_invoice}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, waktu_invoice: e.target.value })
                  }
                />
              </InputGroup>
            </Col>
            <Col xs={6}>
              <Form.Text className="text-muted">
                <b>Tanggal Selesai</b>
              </Form.Text>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="waktu_selesai"
                  required
                  value={dataForm.waktu_selesai}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, waktu_selesai: e.target.value })
                  }
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Nama Pelanggan"
                name="pelanggan"
                required
                value={dataForm.pelanggan}
                onChange={(e) =>
                  setDataForm({ ...dataForm, pelanggan: e.target.value })
                }
              />
            </InputGroup>
          </Row>
          <Row className="mb-3">
            <Col xs={5}>
              <Form.Text className="text-muted">
                <b>Jenis Laundry</b>
              </Form.Text>
              <InputGroup>
                <Form.Select
                  name="jenis"
                  className={styles.selectCont}
                  value={dataForm.jenis_laundry}
                  onChange={handleChange}
                >
                  {jenisLaundry.map((jenis, index) => (
                    <option key={index} value={jenis.nama}>
                      {jenis.nama}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
            <Col>
              <Form.Text className="text-muted">
                <b>Status Laundry</b>
              </Form.Text>
              <InputGroup>
                <Form.Select
                  name="status"
                  className={styles.selectCont}
                  value={dataForm.status_laundry}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, status_laundry: e.target.value })
                  }
                >
                  <option value="diproses">Diproses</option>
                  <option value="selesai_cuci">Selesai Dicuci</option>
                  <option value="selesai_gosok">Selesai Digosok</option>
                  <option value="sudah_diambil">Sudah Diambil</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Text className="text-muted">
                <b>Status Transaksi</b>
              </Form.Text>
              <InputGroup>
                <Form.Select
                  name="transaksi"
                  className={styles.selectCont}
                  value={dataForm.status_transaksi}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      status_transaksi: e.target.value,
                    })
                  }
                >
                  <option value="belum_bayar">Belum Bayar</option>
                  <option value="sudah_bayar">Sudah Bayar</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col className="d-flex flex-column justify-content-end align-items-end">
              <InputGroup>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="Berat"
                  name="berat"
                  required
                  value={dataForm.berat}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      berat: e.target.value,
                      total_bayar: e.target.value * jenisHarga.harga,
                    })
                  }
                />
                <InputGroup.Text>
                  <b>Kg</b>
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <b>Rp.</b>
              </InputGroup.Text>
              <Form.Control
                disabled
                name="total"
                placeholder={dataForm.total_bayar.toLocaleString()}
              />
            </InputGroup>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="Keterangan"
                  value={dataForm.keterangan}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, keterangan: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="me-2 d-flex justify-content-end">
            <input
              type="hidden"
              name="jenis_transaksi"
              value={dataForm.jenis_transaksi}
            />
            <Button
              as={Col}
              xs={3}
              onClick={handleSubmit}
              type="submit"
              variant="success"
            >
              Simpan
            </Button>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default TambahMember;
