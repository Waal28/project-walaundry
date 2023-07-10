import React, { useEffect, useState } from "react";
import DaftarMember from "./DaftarMember";
import TambahMember from "./TambahMember";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import DetailMember from "./DetailMember";
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

const MemberLaundry = () => {
  const [clickAdd, setClickAdd] = useState(false);
  const [clickDetail, setClickDetail] = useState(false);
  const [fadeAdd, setFadeAdd] = useState(false);
  const [fadeDetail, setFadeDetail] = useState(false);
  //
  const [data, setData] = useState([]);
  const [dataForm, setDataForm] = useState({
    idMember: `MEM${Math.floor(Math.random() * 900) + 100}`,
    nama: "",
    noHp: "",
    alamat: "",
    jabatan: "",
    outlet: "Walaundry Marpoyan",
    tempat: "",
    tanggal: "",
    bulan: "Januari",
    tahun: "",
    gender: "",
  });
  const [isSuccess, setIsSuccsess] = useState(false);
  const [isClickUpdate, setIsClickUpdate] = useState(false);
  const [hapusSemua, setHapusSemua] = useState(false);
  const [gagal, setGagal] = useState(false);
  const [text, setText] = useState(false);
  const [clickHapus, setClickHapus] = useState(false);
  const [dataById, setDataById] = useState({
    idMember: "",
    nama: "",
    noHp: "",
    alamat: "",
    jabatan: "",
    outlet: "",
    tempat: "",
    tanggal: "",
    bulan: "",
    tahun: "",
    gender: "",
  });
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isClickUpdate) {
      if (
        dataById.nama === "" ||
        dataById.alamat === "" ||
        dataById.noHp === "" ||
        dataById.gender === ""
      ) {
        setIsSuccsess(true);
        setGagal(true);
        setText("Data gagal Diupdate");
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
      } else {
        updateData(setData, "memberLaundry", dataById._id, dataById);
        setIsSuccsess(true);
        setGagal(false);
        setText("Data Berhasil Diupdate");
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
        setDataById({
          idMember: "",
          nama: "",
          noHp: "",
          alamat: "",
          jabatan: "",
          outlet: "",
          tempat: "",
          tanggal: "",
          bulan: "",
          tahun: "",
          gender: "",
        });
        setIsClickUpdate(false);
        // close form tambah/update data
        setTimeout(() => {
          setClickDetail(false);
          setClickAdd(false);
        }, 800);
        setFadeAdd(false);
        setFadeDetail(false);
      }
    } else {
      if (
        dataForm.nama === "" ||
        dataForm.alamat === "" ||
        dataForm.noHp === "" ||
        dataForm.gender === ""
      ) {
        setIsSuccsess(true);
        setGagal(true);
        setText("Data gagal Ditambahkan");
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
      } else {
        postData(setData, "memberLaundry", dataForm);
        setIsSuccsess(true);
        setGagal(false);
        setText("Data Berhasil Ditambahkan");
        setTimeout(() => {
          setIsSuccsess(false);
        }, 5000);
        setDataForm({
          idMember: `MEM${Math.floor(Math.random() * 900) + 100}`,
          nama: "",
          noHp: "",
          alamat: "",
          jabatan: "",
          outlet: "",
          tempat: "",
          tanggal: "",
          bulan: "Januari",
          tahun: "",
          gender: "",
        });

        // close form tambah/update data
        setTimeout(() => {
          setClickDetail(false);
          setClickAdd(false);
        }, 800);
        setFadeAdd(false);
        setFadeDetail(false);
      }
    }
  };
  const handleDelete = (id) => {
    if (typeof id === "undefined") {
      setClickHapus(false);
      setIsSuccsess(true);
      setGagal(true);
      setText("Data gagal Dihapus");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
    } else {
      deleteOneData(setData, "memberLaundry", id);
      setClickHapus(false);
      setIsSuccsess(true);
      setGagal(false);
      setText("Data Berhasil Dihapus");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
    }
  };
  const handleDeleteAll = () => {
    if (data.length > 0) {
      deleteAllData(setData, "memberLaundry", "Jenis Laundry");
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
  const handleAdd = (e) => {
    e.preventDefault();
    setClickAdd(true);
    setTimeout(() => {
      setFadeAdd(true);
    }, 100);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setIsClickUpdate(false);
    setTimeout(() => {
      setClickDetail(false);
      setClickAdd(false);
    }, 800);
    setFadeAdd(false);
    setFadeDetail(false);
    setDataById({
      idMember: "",
      nama: "",
      noHp: "",
      alamat: "",
      jabatan: "",
      outlet: "",
      tempat: "",
      tanggal: "",
      bulan: "",
      tahun: "",
      gender: "",
    });
    setDataForm({
      idMember: `MEM${Math.floor(Math.random() * 900) + 100}`,
      nama: "",
      noHp: "",
      alamat: "",
      jabatan: "",
      outlet: "",
      tempat: "",
      tanggal: "",
      bulan: "Januari",
      tahun: "",
      gender: "",
    });
  };
  const handleDetail = (e, id) => {
    e.preventDefault();
    setClickDetail(true);
    setClickAdd(false);
    setTimeout(() => {
      setFadeDetail(true);
    }, 100);

    setClickAdd(false);
    getDataById(setDataById, "memberLaundry", id);
  };
  const handleClickUpdate = (e, id) => {
    e.preventDefault();
    getDataById(setDataById, "memberLaundry", id);
    setIsClickUpdate(true);
    setClickAdd(true);
    setTimeout(() => {
      setFadeAdd(true);
    }, 100);
  };
  //
  useEffect(() => {
    getData(setData, "memberLaundry");
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.main_header_container}>
        <h1 className={styles.header}>Petugas Laundry</h1>
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
            table={"member laundry"}
            setClickHapus={setClickHapus}
            setHapusSemua={setHapusSemua}
            handleDeleteAll={handleDeleteAll}
          />
        ) : (
          <PromptHapus
            setClickHapus={setClickHapus}
            handleDelete={handleDelete}
            kode={dataById.idMember}
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
                  handleSubmit={handleSubmit}
                  isClickUpdate={isClickUpdate}
                  dataById={dataById}
                  setDataById={setDataById}
                />
              </Col>
            ) : null}
          </Row>
          <div className={styles.cardTableCont}>
            {clickDetail ? (
              <DetailMember
                fade={fadeDetail}
                handleClose={handleClose}
                dataById={dataById}
              />
            ) : null}
            <DaftarMember
              data={data}
              setData={setData}
              handleAdd={handleAdd}
              handleDetail={handleDetail}
              clickAdd={clickAdd}
              handleClickUpdate={handleClickUpdate}
              setDataById={setDataById}
              setClickHapus={setClickHapus}
              setHapusSemua={setHapusSemua}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MemberLaundry;
