import React, { useEffect, useState } from "react";
import DaftarMember from "./DaftarMember";
import TambahMember from "./TambahMember";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import DetailMember from "./DetailMember";
import axios from "axios";
import { date } from "../../store/currentDate";
import AlertComp from "../../1.MiniComp/AlertComp";
import PromptHapus from "../../1.MiniComp/PromptHapus";
import {
  deleteAllData,
  deleteOneData,
  getData,
  getDataById,
} from "../../2.HandleFunc/api";
import PromptHapusSemua from "../../1.MiniComp/PromptHapusSemua";

const Pengeluaran = () => {
  const [data, setData] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [clickAdd, setClickAdd] = useState(false);
  const [clickDetail, setClickDetail] = useState(false);
  const [fadeAdd, setFadeAdd] = useState(false);
  const [fadeDetail, setFadeDetail] = useState(false);
  const waktu = dateTime.toLocaleTimeString("fr-FR");
  const [dataForm, setDataForm] = useState({
    kd_transaksi: "PR" + Math.floor(Math.random() * 10000),
    outlet: "Walaundry Marpoyan",
    tanggal: date,
    qty: [],
    biaya: [],
    keterangan: "",
    jenis_transaksi: "Pengeluaran",
  });
  //
  const [isSuccess, setIsSuccsess] = useState(false);
  const [hapusSemua, setHapusSemua] = useState(false);
  const [gagal, setGagal] = useState(false);
  const [text, setText] = useState(false);
  const [clickHapus, setClickHapus] = useState(false);
  //
  const [dataById, setDataById] = useState({
    jenis: [],
    qty: [],
    biaya: [],
    total: 0,
  });
  const handleAdd = (e) => {
    e.preventDefault();
    setClickAdd(true);
    setTimeout(() => {
      setFadeAdd(true);
    }, 100);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setClickDetail(false);
      setClickAdd(false);
    }, 800);
    setFadeAdd(false);
    setFadeDetail(false);
  };
  const handleDelete = (id) => {
    deleteOneData(setData, "pengeluaran", id);
    setClickHapus(false);
    setIsSuccsess(!isSuccess);
    setGagal(false);
    setText("Data Berhasil Dihapus");
    setTimeout(() => {
      setIsSuccsess(false);
    }, 5000);
  };
  const handleDetail = (e, id) => {
    getDataById(setDataById, "pengeluaran", id);
    e.preventDefault();
    setClickDetail(true);
    setTimeout(() => {
      setFadeDetail(true);
    }, 100);
    setClickAdd(false);
  };
  const postData = async (e, value) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3004/pengeluaran", value);
      getData(setData, "pengeluaran");
      setIsSuccsess(!isSuccess);
      setGagal(false);
      setText("Data Berhasil Ditambahkan");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
      setDataForm({
        ...dataForm,
        kd_transaksi: "PR" + Math.floor(Math.random() * 10000),
        jenis: "Walaundry Marpoyan",
        tanggal: date,
        keterangan: "",
      });
    } catch (error) {
      setIsSuccsess(!isSuccess);
      setGagal(true);
      setText("Data gagal ditambahkan");
      console.log(error);
    }
  };
  const postDataTransaksi = async (val) => {
    try {
      await axios.post("http://localhost:3004/transaksi", val);
    } catch (error) {
      alert("Data gagal ditambahkan");
      console.log(error);
    }
  };
  const handleDeleteAll = () => {
    if (data.length > 0) {
      deleteAllData(setData, "pengeluaran", "Pengeluaran");
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
  useEffect(() => {
    getData(setData, "pengeluaran");

    const timerId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.main_header_container}>
        <h1 className={styles.header}>Pengeluaran</h1>
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
      </div>
      {clickHapus ? (
        hapusSemua ? (
          <PromptHapusSemua
            table={"pengeluaran"}
            setClickHapus={setClickHapus}
            setHapusSemua={setHapusSemua}
            handleDeleteAll={handleDeleteAll}
          />
        ) : (
          <PromptHapus
            setClickHapus={setClickHapus}
            handleDelete={handleDelete}
            kode={dataById.kd_transaksi}
            _id={dataById._id}
          />
        )
      ) : null}
      <div className={styles.container}>
        <Container>
          <Row>
            {clickAdd ? (
              <Col>
                <TambahMember
                  fade={fadeAdd}
                  handleClose={handleClose}
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  postData={postData}
                  waktu={waktu}
                  setText={setText}
                  setGagal={setGagal}
                  setIsSuccsess={setIsSuccsess}
                  postDataTransaksi={postDataTransaksi}
                  setClickDetail={setClickDetail}
                  setClickAdd={setClickAdd}
                  setFadeAdd={setFadeAdd}
                  setFadeDetail={setFadeAdd}
                />
              </Col>
            ) : null}
          </Row>

          <Row>
            {clickDetail ? (
              <Col lg={4}>
                <DetailMember
                  fade={fadeDetail}
                  handleClose={handleClose}
                  dataById={dataById}
                />
              </Col>
            ) : null}
            <Col lg={clickDetail ? 8 : 12}>
              <DaftarMember
                data={data}
                clickAdd={clickAdd}
                handleAdd={handleAdd}
                handleDetail={handleDetail}
                setClickHapus={setClickHapus}
                setData={setData}
                setDataById={setDataById}
                setHapusSemua={setHapusSemua}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Pengeluaran;
