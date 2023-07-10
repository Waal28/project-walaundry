import React, { useState, useEffect } from "react";
import { Col, Form, Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertDataKosong from "../../../1.MiniComp/AlertDataKosong";
import LoadingComp from "../../../1.MiniComp/LoadingComp";
import { DropMenu } from "../../../1.MiniComp/MenuDropdown";
import Pagination from "../../../1.MiniComp/Pagination";
import Showing from "../../../1.MiniComp/Showing";
import {
  handleFilter,
  handleHapusSemua,
  handlePromptHapus,
  handleSearch,
} from "../../../2.HandleFunc";
import { getData, updateData } from "../../../2.HandleFunc/api";
import styles from "./index.module.css";

//status laundry
const StatusLaundry = ({ status_laundry, id, setData }) => {
  const handleChangeStatusLaundry = (e, id) => {
    const val = e.target.value;
    updateData(setData, "orderan", id, { status_laundry: val });
  };

  return (
    <div>
      <select
        className={`${styles.selectCont} ${styles[status_laundry]}`}
        value={status_laundry}
        onChange={(e) => handleChangeStatusLaundry(e, id)}
      >
        <option value="diproses">Diproses</option>
        <option value="selesai_cuci">Selesai Dicuci</option>
        <option value="selesai_gosok">Selesai Digosok</option>
        <option value="sudah_diambil">Sudah Diambil</option>
      </select>
    </div>
  );
};
// status transaksi
const StatusTransaksi = ({
  status_transaksi,
  id,
  handleChangeStatusTransaksi,
}) => {
  return (
    <div>
      <select
        className={`${styles.selectCont} ${styles[status_transaksi]}`}
        value={status_transaksi}
        onChange={(e) =>
          handleChangeStatusTransaksi(e, id, {
            status_transaksi: e.target.value,
          })
        }
      >
        {status_transaksi === "sudah_bayar" ? null : (
          <option value="belum_bayar">Belum Bayar</option>
        )}
        <option value="sudah_bayar">Sudah Bayar</option>
      </select>
    </div>
  );
};
// actions dropdown
const ActionsDropdown = ({
  handleDetailOpen,
  id,
  handleClickUpdate,
  setDataById,
  setClickHapus,
}) => {
  return (
    <div style={{ width: "110px" }}>
      <Link onClick={(e) => handleClickUpdate(e, id)}>
        <i className={`${styles.update} bi bi-pencil`} title="Edit"></i>
      </Link>
      <Link
        onClick={(e) =>
          handlePromptHapus(e, setDataById, setClickHapus, "orderan", id)
        }
      >
        <i className={`${styles.delete} bi bi-trash3`} title="Hapus"></i>
      </Link>
      <Link onClick={(e) => handleDetailOpen(e, id)}>
        <i className={`${styles.details} bi bi-search`} title="Detail"></i>
      </Link>
    </div>
  );
};
//
function Items({
  currentItems,
  loading,
  itemOffset,
  setData,
  handleChangeStatusTransaksi,
  handleDetailOpen,
  handleClickUpdate,
  setClickHapus,
  setDataById,
  dataById,
  fullScreen,
}) {
  return (
    <>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Invoice</th>
            <th>Pelanggan</th>
            {fullScreen ? (
              <>
                <th>Tanggal Terima</th>
                <th>Outlet</th>
                <th>Jenis</th>
              </>
            ) : null}
            <th>Status</th>
            <th>Transaksi</th>
            <th>Actions</th>
          </tr>
        </thead>
        {currentItems.length < 1 ? (
          <tbody>
            <tr>
              <td colSpan={9}>{loading}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems &&
              currentItems.map((d, index) => (
                <tr key={index}>
                  <td>{index + itemOffset + 1}</td>
                  <td>{d.invoice}</td>
                  <td>{d.pelanggan}</td>
                  {fullScreen ? (
                    <>
                      <td>{d.waktu_invoice}</td>
                      <td>{d.outlet}</td>
                      <td>{d.jenis_laundry}</td>
                    </>
                  ) : null}

                  <td>
                    <StatusLaundry
                      status_laundry={d.status_laundry}
                      updateData={updateData}
                      id={d._id}
                      setData={setData}
                    />
                  </td>
                  <td>
                    <StatusTransaksi
                      status_transaksi={d.status_transaksi}
                      id={d._id}
                      handleChangeStatusTransaksi={handleChangeStatusTransaksi}
                    />
                  </td>
                  <td>
                    <ActionsDropdown
                      handleDetailOpen={handleDetailOpen}
                      id={d._id}
                      handleClickUpdate={handleClickUpdate}
                      setClickHapus={setClickHapus}
                      setDataById={setDataById}
                      dataById={dataById}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </>
  );
}
// parrent component
const DaftarMember = ({
  handleDetailOpen,
  data,
  setData,
  setClickHapus,
  handleClickUpdate,
  setHapusSemua,
  setDataById,
  dataById,
  handleChangeStatusTransaksi,
  fullScreen,
  setFullScreen,
  setClickDetail,
}) => {
  const [dataJenis, setDataJenis] = useState([]);
  const [dataOutlet, setDataOutlet] = useState([]);

  const menus = [
    {
      icon: "bi bi-funnel",
      nama: "Filter",
      childrens: [
        {
          nama: "Jenis Laundry",
          childrens: dataJenis.map((data) => {
            return {
              nama: data.nama,
              click: () =>
                handleFilter(data.nama, "jenis_laundry", setData, "orderan"),
            };
          }),
        },
        {
          nama: "Outlet",
          childrens: dataOutlet.map((data) => {
            return {
              nama: data.nama,
              click: () =>
                handleFilter(data.nama, "outlet", setData, "orderan"),
            };
          }),
        },
        {
          nama: "- Default Filter -",
          click: () =>
            handleFilter("Default", "jenis_laundry", setData, "orderan"),
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
    getData(setDataJenis, "jenisLaundry");
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
  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
    setClickDetail(false);
  };
  return (
    <div className={styles.container}>
      <div
        className={
          !fullScreen
            ? `${styles.table_cont} ${styles.tableFull}`
            : styles.table_cont
        }
      >
        <button className={styles.btn} onClick={handleFullScreen}>
          <i className={!fullScreen ? "bi bi-arrow-left" : "bi bi-plus-lg"}></i>
          {!fullScreen ? "Kembali" : "Tambah"}
        </button>
        <div className={styles.table_head}>
          <Row>
            <Col sm={6} className="d-flex">
              <Showing
                setItemsPerPage={setItemsPerPage}
                setItemOffset={setItemOffset}
              />
              <div className="ms-3">
                <DropMenu items={menus} />
              </div>
            </Col>
            <Col sm={{ span: 4, offset: 2 }}>
              <Form.Control
                type="search"
                placeholder="Cari nama pelanggan"
                onChange={(e) =>
                  handleSearch(e, setData, "orderan", "pelanggan")
                }
              />
            </Col>
          </Row>
        </div>
        <Items
          currentItems={currentItems}
          loading={loading}
          itemOffset={itemOffset}
          setData={setData}
          handleChangeStatusTransaksi={handleChangeStatusTransaksi}
          handleDetailOpen={handleDetailOpen}
          handleClickUpdate={handleClickUpdate}
          setClickHapus={setClickHapus}
          setDataById={setDataById}
          dataById={dataById}
          fullScreen={fullScreen}
        />
        <div className={styles.table_footer}>
          <div className={styles.pagination}>
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarMember;
