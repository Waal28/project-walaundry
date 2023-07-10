import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertComp from "../../1.MiniComp/AlertComp";
import PromptHapus from "../../1.MiniComp/PromptHapus";
import PromptHapusSemua from "../../1.MiniComp/PromptHapusSemua";
import PromptLogout from "../../1.MiniComp/PromptLogout";
import {
  deleteAllData,
  deleteOneData,
  getData,
  getDataById,
} from "../../2.HandleFunc/api";
import DaftarTransaksi from "./DaftarTransaksi";
import DetailMember from "./DetailMember";
import Graph from "./Graph";
import styles from "./index.module.css";
import MenuAccount from "./MenuAccount";
import RincianCard from "./RincianCard";
import items from "./RincianCard/data";

const Dashboard = () => {
  const [userAccount, setUserAccount] = useState({
    username: "Jeri",
    hakAkses: "kasir",
  });

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataById, setDataById] = useState({});
  const [dataOrderan, setDataOrderan] = useState([]);
  const [, setDataOrderanDhBayar] = useState([]);

  //
  const [isSuccess, setIsSuccsess] = useState(false);
  const [hapusSemua, setHapusSemua] = useState(false);
  const [gagal, setGagal] = useState(false);
  const [text, setText] = useState(false);
  const [clickHapus, setClickHapus] = useState(false);
  const [clickLogout, setClickLogout] = useState(false);
  //
  const [clickDetail, setClickDetail] = useState(false);
  const [fadeDetail, setFadeDetail] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setClickDetail(false);
    }, 500);
    setFadeDetail(false);
  };
  const handleDetail = (id) => {
    getDataById(setDataById, "transaksi", id);
    setClickDetail(true);
    setTimeout(() => {
      setFadeDetail(true);
    }, 100);
  };
  //

  const proses = dataOrderan.filter((d) => d.status_laundry === "diproses");
  const selesai_cuci = dataOrderan.filter(
    (d) => d.status_laundry === "selesai_cuci"
  );
  const selesai_gosok = dataOrderan.filter(
    (d) => d.status_laundry === "selesai_gosok"
  );
  const sudah_diambil = dataOrderan.filter(
    (d) => d.status_laundry === "sudah_diambil"
  );
  const sudah_bayar = dataOrderan.filter(
    (d) => d.status_transaksi === "sudah_bayar"
  );

  const status = [
    proses,
    selesai_cuci,
    selesai_gosok,
    sudah_diambil,
    sudah_bayar,
  ];

  const handleDelete = (id) => {
    deleteOneData(setData, "transaksi", id);
    setClickHapus(false);
    setIsSuccsess(!isSuccess);
    setGagal(false);
    setText("Data Berhasil Dihapus");
    setTimeout(() => {
      setIsSuccsess(false);
    }, 5000);
  };
  const handleDeleteAll = () => {
    if (data.length > 0) {
      deleteAllData(setData, "transaksi", "Transaksi");
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
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("hakAkses");

    navigate("/login");
  };
  useEffect(() => {
    getData(setData, "transaksi");
    getData(setDataOrderanDhBayar, "orderanSudahBayar");
    getData(setDataOrderan, "orderan");
  }, []);
  //
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const username = localStorage.getItem("username");
    const hakAkses = localStorage.getItem("hakAkses");
    setUserAccount({ username, hakAkses });
    const alert = localStorage.getItem("alert");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      if (alert) {
        setIsSuccsess(true);
        setGagal(false);
        setText("Login berhasil");
        setTimeout(() => {
          if (setIsSuccsess) {
            setIsSuccsess(false);
            localStorage.removeItem("alert");
          }
        }, 5000);
      }
    }
    // setUserAccount(userInfo);
  }, []);
  const hakAkses = localStorage.getItem("hakAkses");
  if (!authenticated) {
    navigate("/login");
  } else {
    //
    return (
      <div className={styles.main_container}>
        <div className={styles.main_header_container}>
          <div className={styles.header_container}>
            <h1 className={styles.header}>Dashboard</h1>
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
                  table="transaksi"
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
            {clickLogout ? (
              <PromptLogout
                setClickLogout={setClickLogout}
                handleLogout={handleLogout}
              />
            ) : null}
            <div className={styles.welcome}>
              <h3>Hi {hakAkses}, selamat datang</h3>
            </div>
          </div>
          <MenuAccount
            setClickLogout={setClickLogout}
            userAccount={userAccount}
          />
        </div>

        <Container className={styles.cardContainer}>
          {items.map((item, index) => (
            <RincianCard key={index} item={item} status={status[index]} />
          ))}
        </Container>
        <Row style={{ marginTop: 20, justifyContent: "center" }}>
          {userAccount.hakAkses === "Admin" ? (
            <Col lg={7}>
              <DaftarTransaksi
                data={data}
                setData={setData}
                setDataById={setDataById}
                setClickHapus={setClickHapus}
                setHapusSemua={setHapusSemua}
                handleDetail={handleDetail}
              />
            </Col>
          ) : null}
          <Col lg={userAccount.hakAkses !== "Admin" ? 10 : 5}>
            {clickDetail ? (
              <DetailMember
                fade={fadeDetail}
                handleClose={handleClose}
                dataById={dataById}
              />
            ) : (
              <Graph />
            )}
          </Col>
        </Row>
      </div>
    );
  }
};

export default Dashboard;
