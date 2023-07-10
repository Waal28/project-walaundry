import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Table, Container, Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuTambah from "./MenuTambah";
import {
  deleteAllData,
  deleteOneData,
  getData,
  getDataById,
  postData,
  updateData,
} from "../../2.HandleFunc/api";
import AlertComp from "../../1.MiniComp/AlertComp";
import PromptHapusSemua from "../../1.MiniComp/PromptHapusSemua";
import PromptHapus from "../../1.MiniComp/PromptHapus";
import { handleHapusSemua, handlePromptHapus } from "../../2.HandleFunc";
import LoadingComp from "../../1.MiniComp/LoadingComp";
import AlertDataKosong from "../../1.MiniComp/AlertDataKosong";
import Showing from "../../1.MiniComp/Showing";
import Pagination from "../../1.MiniComp/Pagination";

function Items({
  currentItems,
  loading,
  itemOffset,
  handleClickUpdate,
  setDataById,
  setClickHapus,
}) {
  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama</th>
            <th width="100px">Harga per kg</th>
            <th>Keterangan</th>
            <th width="100px">Aksi</th>
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
                  <td className={styles.index}>{index + itemOffset + 1}</td>
                  <td>{d.kode}</td>
                  <td>{d.nama}</td>
                  <td>{d.harga}</td>
                  <td>{d.keterangan}</td>
                  <td className={styles.action}>
                    <Link onClick={(e) => handleClickUpdate(e, d._id)}>
                      <i className={`${styles.update} bi bi-pencil`}></i>
                    </Link>
                    <Link
                      onClick={(e) =>
                        handlePromptHapus(
                          e,
                          setDataById,
                          setClickHapus,
                          "jenisLaundry",
                          d._id
                        )
                      }
                    >
                      <i className={`${styles.delete} bi bi-trash3`}></i>
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

const JenisLaundry = () => {
  const [loading, setLoading] = useState(<LoadingComp />);
  const [data, setData] = useState([]);
  const [dataForm, setDataForm] = useState({
    kode: `JL${Math.floor(Math.random() * 900) + 100}`,
    nama: "",
    harga: "",
    nama_tabel: "Jenis Laundry",
  });
  const [click, setClick] = useState(false);
  //
  const [isSuccess, setIsSuccsess] = useState(false);
  const [hapusSemua, setHapusSemua] = useState(false);
  const [gagal, setGagal] = useState(false);
  const [text, setText] = useState(false);
  const [clickHapus, setClickHapus] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataById, setDataById] = useState({});
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      updateData(setData, "jenisLaundry", dataById._id, dataById);
      setIsSuccsess(true);
      setGagal(false);
      setText("Data Berhasil Diupdate");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
      setDataById({});
      setClick(false);
      setIsUpdate(false);
    } else {
      if (dataForm.nama === "" || dataForm.harga === "") {
        setIsSuccsess(true);
        setGagal(true);
        setText("Data gagal Ditambahkan");
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
      } else {
        postData(setData, "jenisLaundry", dataForm);
        setIsSuccsess(true);
        setGagal(false);
        setText("Data Berhasil Ditambahkan");
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
        setDataForm({
          ...dataForm,
          kode: `JL${Math.floor(Math.random() * 900) + 100}`,
          nama: "",
          harga: "",
          keterangan: "",
        });
        setClick(false);
      }
    }
  };
  const handleDelete = (id) => {
    deleteOneData(setData, "jenisLaundry", id);
    setClickHapus(false);
    setIsSuccsess(true);
    setGagal(false);
    setText("Data Berhasil Dihapus");
    setTimeout(() => {
      setIsSuccsess(false);
    }, 5000);
  };
  const handleDeleteAll = () => {
    if (data.length > 0) {
      deleteAllData(setData, "jenisLaundry", "Jenis Laundry");
      setIsSuccsess(true);
      setGagal(false);
      setText("Semua Data Berhasil Dihapus");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
      setClickHapus(false);
      setHapusSemua(false);
    } else {
      setIsSuccsess(true);
      setGagal(true);
      setText("Data masih kosong");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
      setClickHapus(false);
      setHapusSemua(false);
    }
  };
  const handleClickUpdate = (e, id) => {
    e.preventDefault();
    getDataById(setDataById, "jenisLaundry", id);
    setClick(true);
    setIsUpdate(true);
  };
  useEffect(() => {
    setInterval(() => {
      setLoading(<AlertDataKosong />);
    }, 3000);
  }, [data]);
  useEffect(() => {
    getData(setData, "jenisLaundry");
  }, []);
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
    <div className={styles.main_container}>
      <div className={styles.main_header_container}>
        <h1 className={styles.header}>Jenis Laundry</h1>
      </div>
      {isSuccess ? (
        <AlertComp
          gagal={gagal}
          text={text}
          setIsSuccsess={setIsSuccsess}
          AlertClass={
            gagal
              ? `${styles.alertGagalCont} ${styles.scale}`
              : `${styles.alertCont} ${styles.scale}`
          }
        />
      ) : (
        <AlertComp
          text={text}
          setIsSuccsess={setIsSuccsess}
          AlertClass={gagal ? styles.alertGagalCont : styles.alertCont}
        />
      )}
      {clickHapus ? (
        hapusSemua ? (
          <PromptHapusSemua
            table={"jenis laundry"}
            setClickHapus={setClickHapus}
            setHapusSemua={setHapusSemua}
            handleDeleteAll={handleDeleteAll}
          />
        ) : (
          <PromptHapus
            setClickHapus={setClickHapus}
            handleDelete={handleDelete}
            kode={dataById.kode}
            _id={dataById._id}
          />
        )
      ) : null}
      <Container>
        <div className={styles.tableCont}>
          <button className={styles.btn} onClick={() => setClick(true)}>
            <i className="bi bi-plus-lg"></i>
            Tambah
          </button>
          <div className={styles.table_head}>
            <Row>
              <Col md={2}>
                <Showing
                  setItemsPerPage={setItemsPerPage}
                  setItemOffset={setItemOffset}
                />
              </Col>
              <Col md={3}>
                <Button
                  variant="light"
                  onClick={() => handleHapusSemua(setClickHapus, setHapusSemua)}
                >
                  <i className="bi bi-trash"></i>
                  Hapus semua data
                </Button>
              </Col>
            </Row>
          </div>
          <Items
            currentItems={currentItems}
            loading={loading}
            itemOffset={itemOffset}
            handleClickUpdate={handleClickUpdate}
            setDataById={setDataById}
            setClickHapus={setClickHapus}
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
        <MenuTambah
          click={click}
          handleClick={() => setClick(false)}
          handleSubmit={handleSubmit}
          setDataForm={setDataForm}
          dataForm={dataForm}
          dataById={dataById}
          setDataById={setDataById}
          isUpdate={isUpdate}
        />
      </Container>
    </div>
  );
};

export default JenisLaundry;
