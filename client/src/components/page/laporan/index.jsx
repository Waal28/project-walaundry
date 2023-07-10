import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getData } from "../../2.HandleFunc/api";
import LoadingComp from "../../1.MiniComp/LoadingComp";
import AlertDataKosong from "../../1.MiniComp/AlertDataKosong";
import ReactToPrint from "react-to-print";
import axios from "axios";
import { DaftarTransaksi } from "./DaftarTransaksi";

const Pengeluaran = () => {
  const componentRef = useRef();
  const page = [];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(<LoadingComp />);
  //
  const [firstData, setFirstData] = useState("");
  const [lastData, setLastData] = useState("");

  const jmlhMasuk = data
    .filter((d) => d.jenis_transaksi === "Orderan")
    .reduce((acc, obj) => acc + +obj.total, 0);
  const jmlhKeluar = data
    .filter((d) => d.jenis_transaksi === "Pengeluaran")
    .reduce((acc, obj) => acc + +obj.total, 0);
  //

  for (let i = 0; i < Math.ceil(data.length / 5); i++) {
    page.push(i + 1);
  }
  const ambilWaktu = async () => {
    const res = await axios.get("http://localhost:3004/transaksi");
    setFirstData(res.data.slice(-1)[0].waktu_transaksi);
    setLastData(res.data.slice(0)[0].waktu_transaksi);
  };
  const filterWaktu = () => {
    const fill = data.filter(
      (d) =>
        new Date(d.waktu_transaksi) >= new Date(firstData) &&
        new Date(d.waktu_transaksi) <= new Date(lastData)
    );
    // setData(fill);
    setData(fill);
  };
  const handleReset = () => {
    getData(setData, "transaksi");
    ambilWaktu();
  };
  //
  useEffect(() => {
    setInterval(() => {
      setLoading(<AlertDataKosong />);
    }, 3000);
  }, [data]);
  useEffect(() => {
    getData(setData, "transaksi");
    ambilWaktu();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_header_container}>
        <h1 className={styles.header}>Laporan Keuangan</h1>
      </div>
      <div className={styles.container}>
        <Row>
          <Col md={{ span: 5, offset: 0 }}>
            <Container className={styles.filter}>
              <h4>
                <i className="bi bi-funnel-fill"></i> Filter Tanggal Transaksi
              </h4>
              <Row>
                <Col>
                  <b>Tanggal Awal</b>
                  <Form.Control
                    type="date"
                    value={firstData.slice(0, 10)}
                    onChange={(e) => setFirstData(e.target.value)}
                  />
                </Col>
                <Col>
                  <b>Tanggal Akhir</b>
                  <Form.Control
                    type="date"
                    value={lastData.slice(0, 10)}
                    onChange={(e) => setLastData(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end align-items-end">
                  <button className={styles.btn} onClick={filterWaktu}>
                    Filter
                  </button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={{ span: 4, offset: 0 }}>
            <Container className={styles.rincian}>
              <Table>
                <tbody>
                  <tr>
                    <td width="150px">
                      <b>Total masuk</b>
                    </td>
                    <td>
                      <b>
                        : Rp. {jmlhMasuk.toLocaleString()}
                        {jmlhMasuk !== 0 && ",00"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td width="150px">
                      <b>Total keluar</b>
                    </td>
                    <td>
                      <b>
                        : Rp. {jmlhKeluar.toLocaleString()}
                        {jmlhKeluar !== 0 && ",00"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td width="150px">
                      <b>Saldo akhir</b>
                    </td>
                    <td>
                      <b
                        style={{
                          color: jmlhMasuk - jmlhKeluar < 0 ? "red" : "#223055",
                        }}
                      >
                        : Rp. {(jmlhMasuk - jmlhKeluar).toLocaleString()}
                        {jmlhMasuk - jmlhKeluar !== 0 && ",00"}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <ReactToPrint
                trigger={() => (
                  <button className={styles.btn}>
                    <i className="bi bi-printer"></i> Cetak laporan
                  </button>
                )}
                content={() => componentRef.current}
              />
            </Container>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <DaftarTransaksi
              loading={loading}
              componentRef={componentRef}
              data={data}
              setData={setData}
              jmlhMasuk={jmlhMasuk}
              jmlhKeluar={jmlhKeluar}
              firstData={firstData}
              lastData={lastData}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Pengeluaran;
