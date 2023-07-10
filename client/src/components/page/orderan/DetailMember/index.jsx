import React, { useRef } from "react";
import { Col, Form, Table, Row, Container } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styles from "./index.module.css";
import PrintDetail from "./printDetail";
import ttd from "./ttd.png";
import ttd2 from "./ttd2.png";

const DetailMember = ({
  fade,
  handleDetailClose,
  dataById,
  alamatOutlet,
  kontakOutlet,
  dataDetailOrder,
}) => {
  const componentRef = useRef();
  return (
    <div
      className={fade ? `${styles.container} ${styles.fade}` : styles.container}
    >
      <ReactToPrint
        trigger={() => <i className={`${styles.cetak} bi bi-printer`}></i>}
        content={() => componentRef.current}
      />
      <i className={`${styles.back} bi bi-x`} onClick={handleDetailClose}></i>
      <Container>
        <Container>
          <Row style={{ textAlign: "center" }}>
            <h3>{dataById.outlet}</h3>
            <p style={{ padding: 0, margin: 0 }}>{alamatOutlet}</p>
            <p style={{ padding: 0, margin: 0 }}>{kontakOutlet}</p>
          </Row>
          <hr />
          <Row>
            <Table size="sm">
              <tbody>
                <tr>
                  <td>Nama Pelanggan</td>
                  <td>: {dataById.pelanggan}</td>
                </tr>
                <tr>
                  <td>Tgl Terima/Kembali</td>
                  <td>
                    : {dataById.waktu_invoice} - {dataById.waktu_selesai}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th>Berat (Kg)</th>
                  <th>Layanan</th>
                  <th>Harga / Kg</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {dataDetailOrder.map((data, index) => (
                  <tr key={index}>
                    <td>{data.berat}</td>
                    <td className="d-flex">
                      <Form.Check
                        type="checkbox"
                        checked={data.check}
                        className="me-2"
                        readOnly
                      />
                      {data.layanan}
                    </td>
                    <td>{data.harga}</td>
                    <td>{data.total}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: "bold" }}>
                  <td colSpan={3} style={{ textAlign: "right" }}>
                    Total Bayar
                  </td>
                  <td>Rp. {dataById.total_bayar.toLocaleString()},00</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="mt-5">
            <Col>
              <Form.Control
                as="textarea"
                size="sm"
                rows={4}
                value={dataById.keterangan}
                disabled
              />
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <b>
                <p> Hormat Kami</p>
              </b>
              <img
                src={dataById.user === "Iwal" ? ttd : ttd2}
                alt=""
                height="80px"
              />
              <b>
                <p>{`{${dataById.user}}`}</p>
              </b>
            </Col>
          </Row>
        </Container>
        <PrintDetail
          dataById={dataById}
          alamatOutlet={alamatOutlet}
          kontakOutlet={kontakOutlet}
          dataDetailOrder={dataDetailOrder}
          componentRef={componentRef}
        />
      </Container>
    </div>
  );
};

export default DetailMember;
