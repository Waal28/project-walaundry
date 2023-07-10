import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import Pagination from "../../1.MiniComp/Pagination";
import Showing from "../../1.MiniComp/Showing";
import styles from "./index.module.css";
import PrintTransaksi from "./PrintDaftarTransaksi";

// Example items, to simulate fetching from another resources.
function Items({ currentItems, loading, itemOffset }) {
  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Waktu Transaksi</th>
            <th>Jenis</th>
            <th>Outlet</th>
            <th>Keterangan</th>
            <th>Kasir/Admin</th>
            <th>Masuk</th>
            <th>Keluar</th>
          </tr>
        </thead>
        {currentItems.length < 1 ? (
          <tbody>
            <tr>
              <td colSpan={8}>{loading}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems &&
              currentItems.map((d, index) => (
                <tr key={index}>
                  <td>{index + itemOffset + 1}</td>
                  <td>{new Date(d.waktu_transaksi).toLocaleString()}</td>
                  <td>{d.jenis_transaksi}</td>
                  <td>{d.outlet}</td>
                  <td>{d.keterangan}</td>
                  <td>{d.user}</td>
                  <td>
                    {d.jenis_transaksi === "Orderan"
                      ? "Rp. " + d.total.toLocaleString() + ",00"
                      : "-"}
                  </td>
                  <td>
                    {d.jenis_transaksi === "Pengeluaran"
                      ? "Rp. " + d.total.toLocaleString() + ",00"
                      : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </>
  );
}

export function DaftarTransaksi({
  loading,
  componentRef,
  data,
  jmlhMasuk,
  jmlhKeluar,
  firstData,
  lastData,
}) {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <PrintTransaksi
        componentRef={componentRef}
        data={data}
        jmlhMasuk={jmlhMasuk}
        jmlhKeluar={jmlhKeluar}
        firstData={firstData}
        lastData={lastData}
      />
      <div className={styles.table_Main_container}>
        <div className={styles.table_cont}>
          <div className={styles.table_head}>
            <Row>
              <Col>
                <Showing
                  setItemsPerPage={setItemsPerPage}
                  setItemOffset={setItemOffset}
                />
              </Col>
            </Row>
          </div>
          <Items
            currentItems={currentItems}
            loading={loading}
            itemOffset={itemOffset}
          />
          <div className={styles.table_footer}>
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
