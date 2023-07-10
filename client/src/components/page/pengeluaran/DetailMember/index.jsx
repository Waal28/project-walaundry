import React, { useRef } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styles from "./index.module.css";
import PrintDetail from "./printDetail";

const DetailMember = ({ fade, handleClose, dataById }) => {
  const componentRef = useRef();
  return (
    <div
      className={fade ? `${styles.container} ${styles.fade}` : styles.container}
    >
      <ReactToPrint
        trigger={() => <i className={`${styles.cetak} bi bi-printer`}></i>}
        content={() => componentRef.current}
      />
      <i className={`${styles.back} bi bi-x`} onClick={handleClose}></i>
      <Card className={styles.cardCont}>
        <h5 className="text-center">Detail Pengeluaran Laundry</h5>
        <table>
          <tbody>
            <tr>
              <td>Tanggal</td>
              <td>: {dataById.tanggal}</td>
            </tr>
            <tr>
              <td>Jam</td>
              <td>: {dataById.waktu}</td>
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
          </tbody>
        </table>
        <Table className="my-3">
          <thead>
            <tr>
              <th>Jenis</th>
              <th>QTY</th>
              <th>Biaya</th>
            </tr>
          </thead>
          <tbody>
            {dataById.jenis.map((d, index) => (
              <tr key={index}>
                <td>{d}</td>
                <td>{dataById.qty[index]}</td>
                <td>{dataById.biaya[index].toLocaleString()}</td>
              </tr>
            ))}

            <tr>
              <td style={{ textAlign: "end" }}>
                <b style={{ fontSize: 12 }}>Total :</b>
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                RP. {dataById.total.toLocaleString()},00
              </td>
            </tr>
          </tbody>
        </Table>
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
      <PrintDetail dataById={dataById} componentRef={componentRef} />
    </div>
  );
};

export default DetailMember;
