import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import styles from "./index.module.css";

const PrintDetail = ({ dataById, componentRef }) => {
  return (
    <div style={{ display: "none" }}>
      <div ref={componentRef} className={styles.ContTablePrint}>
        <Card className={styles.cardCont}>
          <h5 className="text-center">Detail Transaksi Laundry</h5>
          <table>
            <tbody>
              <tr>
                <td>Tanggal</td>
                <td>: {new Date(dataById.waktu_transaksi).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Kode</td>
                <td>: {dataById.kd_transaksi}</td>
              </tr>
              <tr>
                <td>Outlet</td>
                <td>: {dataById.outlet}</td>
              </tr>
              <tr>
                <td>Dibuat oleh</td>
                <td>: {dataById.user}</td>
              </tr>
              <tr>
                <td>Jenis Transaksi</td>
                <td>: {dataById.jenis_transaksi}</td>
              </tr>
            </tbody>
          </table>
          <b style={{ fontSize: 12 }}>Keterangan :</b>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                size="sm"
                rows={4}
                value={dataById.keterangan}
                disabled
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default PrintDetail;
