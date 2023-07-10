import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuTambah from "./MenuTambah";
import {
  deleteOneData,
  getData,
  getDataById,
  postData,
  updateData,
} from "../../2.HandleFunc/api";
import AlertComp from "../../1.MiniComp/AlertComp";
import PromptHapus from "../../1.MiniComp/PromptHapus";
import { handlePromptHapus } from "../../2.HandleFunc";
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
            <th>Hak Akses</th>
            <th>Username</th>
            <th>Aksi</th>
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
                  <td>{d.hakAkses}</td>
                  <td>{d.username}</td>
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
                          "users",
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

const HakAkses = () => {
  const [loading, setLoading] = useState(<LoadingComp />);
  const [data, setData] = useState([]);
  const [dataForm, setDataForm] = useState({
    hakAkses: "Admin",
    username: "",
    password: "",
    confPassword: "",
  });
  const [click, setClick] = useState(false);
  //
  const [isSuccess, setIsSuccsess] = useState(false);
  const [gagal, setGagal] = useState(false);
  const [text, setText] = useState(false);
  const [clickHapus, setClickHapus] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataById, setDataById] = useState({
    hakAkses: "Admin",
    username: "",
    password: "",
    confPassword: "",
  });
  const [confPassword, setConfPassword] = useState(dataById.password);
  //
  const alertMassage = (success, gagal, text) => {
    setIsSuccsess(success);
    setGagal(gagal);
    setText(text);
    setTimeout(() => {
      if (success) {
        setIsSuccsess(false);
      }
    }, 5000);
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      const massage = await updateData(setData, "users", dataById._id, {
        ...dataById,
        confPassword,
      });
      updateData(setData, "users", dataById._id, { ...dataById, confPassword });
      if (massage) {
        alertMassage(true, true, massage);
      } else {
        alertMassage(true, false, "Data berhasil diupdate");
        setDataById({
          hakAkses: "Admin",
          username: "",
          password: "",
          confPassword: "",
        });
        setClick(false);
        setIsUpdate(false);
      }
    } else {
      const massage = await postData(setData, "users", dataForm);
      postData(setData, "users", dataForm);
      if (massage) {
        alertMassage(true, true, massage);
      } else {
        alertMassage(true, false, "Data Berhasil ditambahkan");

        setDataForm({
          hakAkses: "Admin",
          username: "",
          password: "",
          confPassword: "",
        });
        setClick(false);
      }
    }
  };
  const handleDelete = (id) => {
    deleteOneData(setData, "users", id);
    setClickHapus(false);
    alertMassage(true, false, "Data berhasil Dihapus");
  };
  const handleClickUpdate = async (e, id) => {
    const user = await getDataById(setDataById, "users", id);
    setConfPassword(user.password);
    e.preventDefault();
    getDataById(setDataById, "users", id);
    setClick(true);
    setIsUpdate(true);
  };
  useEffect(() => {
    setInterval(() => {
      setLoading(<AlertDataKosong />);
    }, 3000);
  }, [data]);
  useEffect(() => {
    getData(setData, "users");
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
        <h1 className={styles.header}>Hak Akses</h1>
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
        <PromptHapus
          setClickHapus={setClickHapus}
          handleDelete={handleDelete}
          kode={dataById.kode}
          _id={dataById._id}
        />
      ) : null}
      <Row className="justify-content-center">
        <Col lg={8} md={8} sm={10} xs={12}>
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
        </Col>
        <MenuTambah
          click={click}
          handleClick={() => setClick(false)}
          handleSubmit={handleSubmit}
          setDataForm={setDataForm}
          dataForm={dataForm}
          dataById={dataById}
          setDataById={setDataById}
          isUpdate={isUpdate}
          confPassword={confPassword}
          setConfPassword={setConfPassword}
        />
      </Row>
    </div>
  );
};

export default HakAkses;
