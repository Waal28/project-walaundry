import React, { useEffect, useState } from "react";
import DaftarMember from "./DaftarMember";
import TambahMember from "./TambahMember";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import DetailMember from "./DetailMember";
import PromptHapus from "../../1.MiniComp/PromptHapus";
import AlertComp from "../../1.MiniComp/AlertComp";
import PromptHapusSemua from "../../1.MiniComp/PromptHapusSemua";
import {
  deleteAllData,
  deleteOneData,
  getData,
  getDataById,
  postData,
  updateData,
} from "../../2.HandleFunc/api";
import PromptUpdate from "../../1.MiniComp/PrompUpdate";
import { next2day, today } from "../../2.HandleFunc/date";
import axios from "axios";

const Orderan = () => {
  const username = localStorage.getItem("username");
  const [clickHapus, setClickHapus] = useState(false);
  const [fullScreen, setFullScreen] = useState(true);
  const [clickDetail, setClickDetail] = useState(false);
  const [fadeClick, setFadeClick] = useState(false);
  const [data, setData] = useState([]);
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [isClickUpdate, setIsClickUpdate] = useState(false);
  const [dataById, setDataById] = useState({
    total_bayar: 0,
  });
  const [jenisLaundry, setJenisLaundry] = useState([]);
  const [dataForm, setDataForm] = useState({
    invoice: "LD" + Math.floor(Math.random() * 1000),
    waktu_invoice: today,
    waktu_selesai: next2day,
    pelanggan: "",
    outlet: "Walaundry Marpoyan",
    jenis_laundry: "Cuci Setrika",
    status_laundry: "diproses",
    status_transaksi: "belum_bayar",
    berat: 1,
    total_bayar: 5000,
    keterangan: "",
    user: username,
    jenis_transaksi: "Orderan",
  });
  const [isSuccess, setIsSuccsess] = useState(false);
  const [hapusSemua, setHapusSemua] = useState(false);
  const [text, setText] = useState("Data Berhasil Ditambahkan");
  const [gagal, setGagal] = useState(false);
  const [isStatusTransaksiChange, setIsStatusTransaksiChange] = useState(false);
  const handleDetailOpen = (e, id) => {
    setFullScreen(false);
    getDataById(setDataById, "orderan", id);
    e.preventDefault();
    setClickDetail(true);
    setIsClickUpdate(false);
    setTimeout(() => {
      setFadeClick(true);
    }, 300);
  };
  const handleDelete = (id) => {
    setClickDetail(false);
    setIsClickUpdate(false);
    //
    deleteOneData(setData, "orderan", id);
    setClickHapus(false);
    setIsSuccsess(!isSuccess);
    setText("Data Berhasil Dihapus");
    setTimeout(() => {
      setIsSuccsess(false);
    }, 5000);
  };
  const handleDeleteAll = () => {
    if (data.length > 0) {
      deleteAllData(setData, "orderan", "Orderan");
      setIsSuccsess(true);
      setGagal(false);
      setText("Semua Data Berhasil Dihapus");
      setTimeout(() => {
        setIsSuccsess(false);
      }, 5000);
      setClickHapus(false);
      setHapusSemua(false);
    } else {
      setClickDetail(false);
      setIsClickUpdate(false);

      //
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
  const handleDetailClose = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setClickDetail(false);
    }, 200);
    setFadeClick(false);
  };
  const handleClickUpdate = (e, id) => {
    setFullScreen(false);
    setClickDetail(false);
    e.preventDefault();
    getDataById(setDataById, "orderan", id);
    setIsClickUpdate(true);
  };
  const handleChangeStatusTransaksi = (e, id, val) => {
    if (e.target.value === "sudah_bayar") {
      getDataById(setDataById, "orderan", id);
      setIsStatusTransaksiChange(true);
    }
  };
  const handleAddStatusTransaksi = () => {
    setIsStatusTransaksiChange(false);
    const dataYgDikirim = {
      kd_transaksi: dataById.invoice,
      outlet: dataById.outlet,
      total: dataById.total_bayar,
      jenis_transaksi: dataById.jenis_transaksi,
      waktu_transaksi: new Date(),
      keterangan: dataById.jenis_laundry,
      user: "Iwal",
      nama_tabel: "Transaksi",
    };
    postData(setDataTransaksi, "transaksi", dataYgDikirim);
    updateData(setData, "orderan", dataById._id, {
      status_transaksi: "sudah_bayar",
    });
    setIsSuccsess(true);
    setGagal(false);
    setText("Data Berhasil Ditambahkan");
    setTimeout(() => {
      setIsSuccsess(false);
    }, 5000);
  };
  // AMBIL DATA API
  useEffect(() => {
    getData(setData, "orderan");
    getData(setDataTransaksi, "transaksi");
    getData(setJenisLaundry, "jenisLaundry");
  }, []);
  // detail
  const [dataDetailOrder, setDataDetailOrder] = useState([
    {
      berat: "",
      check: false,
      layanan: "",
      harga: "",
      total: "",
    },
  ]);
  const [alamatOutlet, setAlamatOutlet] = useState("");
  const [kontakOutlet, setKontakOutlet] = useState("");

  const getAlamatLaundry = async () => {
    const response = await axios.get(`http://localhost:3004/outlet`);
    const newData = response.data.find((outlet) => {
      if (typeof dataById.jenis_laundry !== "undefined") {
        return outlet.nama === dataById.outlet;
      }
      return outlet;
    });
    setAlamatOutlet(newData.alamat);
    setKontakOutlet(newData.kontak);
  };

  const getDetailOrder = async () => {
    const response = await axios.get(`http://localhost:3004/jenisLaundry`);
    const newData = response.data.map((jenis) => {
      if (dataById.jenis_laundry === jenis.nama) {
        return {
          berat: dataById.berat + " Kg",
          check: true,
          layanan: jenis.nama,
          harga:
            "Rp. " +
            (dataById.total_bayar / dataById.berat).toLocaleString() +
            ",00",
          total: "Rp. " + dataById.total_bayar.toLocaleString() + ",00",
        };
      } else {
        return {
          berat: "",
          check: false,
          layanan: jenis.nama,
          harga: "",
          total: "",
        };
      }
    });
    setDataDetailOrder(newData);
  };
  useEffect(() => {
    if (clickDetail) {
      getAlamatLaundry();
    }
    getDetailOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickDetail, dataById]);
  // //////
  return (
    <div className={styles.main_container}>
      <div className={styles.main_header_container}>
        <h1 className={styles.header}>Orderan</h1>
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
      {isStatusTransaksiChange ? (
        <PromptUpdate
          setIsStatusTransaksiChange={setIsStatusTransaksiChange}
          dataById={dataById}
          handleAddStatusTransaksi={handleAddStatusTransaksi}
        />
      ) : null}
      {clickHapus ? (
        hapusSemua ? (
          <PromptHapusSemua
            table={"orderan"}
            setClickHapus={setClickHapus}
            setHapusSemua={setHapusSemua}
            handleDeleteAll={handleDeleteAll}
          />
        ) : (
          <PromptHapus
            setClickHapus={setClickHapus}
            handleDelete={handleDelete}
            kode={dataById.invoice}
            _id={dataById._id}
            handleDetailClose={handleDetailClose}
          />
        )
      ) : null}
      <div className={styles.container}>
        <Container>
          <Row>
            <Col
              style={{
                marginLeft: fullScreen ? "-55%" : 0,
                transition: "all ease 1s",
              }}
            >
              {clickDetail ? (
                <DetailMember
                  handleDetailClose={handleDetailClose}
                  fade={fadeClick}
                  dataById={dataById}
                  alamatOutlet={alamatOutlet}
                  kontakOutlet={kontakOutlet}
                  dataDetailOrder={dataDetailOrder}
                />
              ) : (
                <TambahMember
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  dataById={dataById}
                  setDataById={setDataById}
                  isClickUpdate={isClickUpdate}
                  setIsClickUpdate={setIsClickUpdate}
                  setIsSuccsess={setIsSuccsess}
                  setText={setText}
                  setGagal={setGagal}
                  dataTransaksi={dataTransaksi}
                  jenisLaundry={jenisLaundry}
                  setDataTransaksi={setDataTransaksi}
                  setData={setData}
                />
              )}
            </Col>

            <Col lg={fullScreen ? 12 : 7} style={{ transition: "all ease 1s" }}>
              <DaftarMember
                handleDetailOpen={handleDetailOpen}
                data={data}
                setData={setData}
                setClickHapus={setClickHapus}
                setHapusSemua={setHapusSemua}
                handleClickUpdate={handleClickUpdate}
                setDataById={setDataById}
                dataById={dataById}
                handleChangeStatusTransaksi={handleChangeStatusTransaksi}
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
                setClickDetail={setClickDetail}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Orderan;
