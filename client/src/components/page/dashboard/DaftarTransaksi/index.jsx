import React, { useState, useEffect } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import {} from "react-router-dom";
import LoadingComp from "../../../1.MiniComp/LoadingComp";
import AlertDataKosong from "../../../1.MiniComp/AlertDataKosong";
import styles from "./index.module.css";
import {
  handleFilter,
  handleHapusSemua,
  handlePromptHapus,
  handleSearch,
} from "../../../2.HandleFunc";
import Pagination from "../../../1.MiniComp/Pagination";
import Showing from "../../../1.MiniComp/Showing";
import { DropMenu } from "../../../1.MiniComp/MenuDropdown";
import TimeAgo from "timeago-react";
import { getData } from "../../../2.HandleFunc/api";

const DaftarTransaksi = ({
  data,
  setData,
  setDataById,
  setClickHapus,
  setHapusSemua,
  handleDetail,
}) => {
  const [loading, setLoading] = useState(<LoadingComp />);
  const [dataOutlet, setDataOutlet] = useState([]);
  const menus = [
    {
      icon: "bi bi-funnel",
      nama: "Filter",
      childrens: [
        {
          nama: "Jenis Pengeluaran",
          childrens: [
            {
              nama: "Orderan",
              click: () =>
                handleFilter(
                  "Orderan",
                  "jenis_transaksi",
                  setData,
                  "transaksi"
                ),
            },
            {
              nama: "Pengeluaran",
              click: () =>
                handleFilter(
                  "Pengeluaran",
                  "jenis_transaksi",
                  setData,
                  "transaksi"
                ),
            },
          ],
        },
        {
          nama: "Outlet",
          childrens: dataOutlet.map((data) => {
            return {
              nama: data.nama,
              click: () =>
                handleFilter(data.nama, "outlet", setData, "transaksi"),
            };
          }),
        },
        {
          nama: "- Default Filter -",
          click: () =>
            handleFilter("Default", "jenis_transaksi", setData, "transaksi"),
        },
      ],
    },
    {
      icon: "bi bi-trash",
      nama: "Hapus semua data",
      click: () => handleHapusSemua(setClickHapus, setHapusSemua),
    },
  ];

  //stup pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setInterval(() => {
      setLoading(<AlertDataKosong />);
    }, 3000);
    getData(setDataOutlet, "outlet");
  }, [data]);
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Daftar Transaksi</h2>
      <div className={styles.table_cont}>
        <div className={styles.table_head}>
          <Row>
            <Col md={6} className="d-flex">
              <Showing
                setItemsPerPage={setItemsPerPage}
                setItemOffset={setItemOffset}
              />
              <div className="ms-3">
                <DropMenu items={menus} />
              </div>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <Form.Control
                type="search"
                placeholder="Cari kode transaksi"
                onChange={(e) =>
                  handleSearch(e, setData, "transaksi", "kd_transaksi")
                }
              />
            </Col>
          </Row>
        </div>
        <Table striped hover>
          <thead>
            <tr>
              <th width="35px">No</th>
              <th>Kode</th>
              <th>Waktu</th>
              <th>Jenis Transaksi</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          {currentItems.length < 1 ? (
            <tbody>
              <tr>
                <td colSpan={7}>{loading}</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentItems &&
                currentItems.map((d, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + itemOffset + 1}</td>
                    <td>{d.kd_transaksi}</td>
                    <td>
                      <TimeAgo
                        datetime={new Date(d.waktu_transaksi)}
                        locale="id_ID"
                      />
                    </td>
                    <td>{d.jenis_transaksi}</td>
                    <td>Rp. {d.total.toLocaleString()},00</td>
                    <td className={styles.actions}>
                      <div
                        onClick={(e) =>
                          handlePromptHapus(
                            e,
                            setDataById,
                            setClickHapus,
                            "transaksi",
                            d._id
                          )
                        }
                      >
                        <i className={`${styles.delete} bi bi-trash3`}></i>
                      </div>
                      <div onClick={(e) => handleDetail(d._id)}>
                        <i className={`${styles.details} bi bi-search`}></i>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </Table>
        <div className={styles.table_footer}>
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      </div>
    </div>
  );
};

export default DaftarTransaksi;
