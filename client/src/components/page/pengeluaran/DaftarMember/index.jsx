import React, { useEffect, useState } from "react";
import { Form, Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertDataKosong from "../../../1.MiniComp/AlertDataKosong";
import LoadingComp from "../../../1.MiniComp/LoadingComp";
import styles from "./index.module.css";
import {
  handleSearch,
  handlePromptHapus,
  handleHapusSemua,
  handleFilter,
} from "../../../2.HandleFunc";
import Pagination from "../../../1.MiniComp/Pagination";
import Showing from "../../../1.MiniComp/Showing";
import { DropMenu } from "../../../1.MiniComp/MenuDropdown";
import { getData } from "../../../2.HandleFunc/api";

function Items({
  currentItems,
  loading,
  itemOffset,
  setDataById,
  setClickHapus,
  handleDetail,
}) {
  return (
    <>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Transaksi</th>
            <th>Tanggal</th>
            <th>Jenis Pengeluaran</th>
            <th>Outlet</th>
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
            {currentItems.map((d, index) => (
              <tr key={index}>
                <td>{index + itemOffset + 1}</td>
                <td>{d.kd_transaksi}</td>
                <td>
                  {d.tanggal}, {d.waktu.slice(0, 5)}
                </td>
                <td>{d.jenis.join(", ")}</td>
                <td>{d.outlet}</td>
                <td>Rp. {d.total.toLocaleString()},00</td>
                <td className={styles.actions}>
                  <Link
                    onClick={(e) =>
                      handlePromptHapus(
                        e,
                        setDataById,
                        setClickHapus,
                        "pengeluaran",
                        d._id
                      )
                    }
                  >
                    <i className={`${styles.delete} bi bi-trash3`}></i>
                  </Link>
                  <Link>
                    <i
                      onClick={(e) => handleDetail(e, d._id)}
                      className={`${styles.details} bi bi-search`}
                    ></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
}
//
const DaftarMember = ({
  data,
  clickAdd,
  handleAdd,
  handleDetail,
  setClickHapus,
  setData,
  setDataById,
  setHapusSemua,
}) => {
  const [dataOutlet, setDataOutlet] = useState([]);
  const dataPengeluaran = [
    "Listrik",
    "Deterjen",
    "Pewangi",
    "Air",
    "Gaji Karyawan",
    "Lainnya",
  ];
  const menus = [
    {
      icon: "bi bi-funnel",
      nama: "Filter",
      childrens: [
        // {
        //   nama: "Jenis Pengeluaran",
        //   childrens: dataPengeluaran.map((data) => {
        //     return {
        //       nama: data,
        //       click: () => handleFilter(data, "jenis", setData, "pengeluaran"),
        //     };
        //   }),
        // },
        {
          nama: "Outlet",
          childrens: dataOutlet.map((data) => {
            return {
              nama: data.nama,
              click: () =>
                handleFilter(data.nama, "outlet", setData, "pengeluaran"),
            };
          }),
        },
        {
          nama: "- Default Filter -",
          click: () =>
            handleFilter("Default", "jenis_laundry", setData, "pengeluaran"),
        },
      ],
    },
    {
      icon: "bi bi-trash",
      nama: "Hapus semua data",
      click: () => handleHapusSemua(setClickHapus, setHapusSemua),
    },
  ];
  //
  const [loading, setLoading] = useState(<LoadingComp />);

  useEffect(() => {
    setInterval(() => {
      setLoading(<AlertDataKosong />);
    }, 3000);
    getData(setDataOutlet, "outlet");
  }, [data]);
  //
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
    <div className={styles.container}>
      <div className={styles.table_cont}>
        <div className={styles.btnAddCont}>
          {clickAdd ? (
            <button disabled className={styles.btnDisable} onClick={handleAdd}>
              <i className="bi bi-plus-lg"></i>
              Tambah
            </button>
          ) : (
            <button className={styles.btn} onClick={handleAdd}>
              <i className="bi bi-plus-lg"></i>
              Tambah
            </button>
          )}
        </div>
        <div className={styles.table_head}>
          <Row>
            <Col sm={5} className="d-flex">
              <Showing
                setItemsPerPage={setItemsPerPage}
                setItemOffset={setItemOffset}
              />
              <div className="ms-3">
                <DropMenu items={menus} />
              </div>
            </Col>
            <Col sm={{ span: 4, offset: 3 }}>
              <Form.Control
                type="search"
                placeholder="Cari Kode Transaksi"
                onChange={(e) =>
                  handleSearch(e, setData, "pengeluaran", "kd_transaksi")
                }
              />
            </Col>
          </Row>
        </div>
        <Items
          currentItems={currentItems}
          loading={loading}
          itemOffset={itemOffset}
          setDataById={setDataById}
          setClickHapus={setClickHapus}
          handleDetail={handleDetail}
        />
        <div className={styles.table_footer}>
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      </div>
    </div>
  );
};

export default DaftarMember;
