import React, { useEffect, useState } from "react";
import { getData } from "../../2.HandleFunc/api";
import styles from "./index.module.css";

const PrintTransaksi = ({
  componentRef,
  data,
  jmlhMasuk,
  jmlhKeluar,
  firstData,
  lastData,
}) => {
  const [outlets, setOutlets] = useState([]);
  useEffect(() => {
    getData(setOutlets, "outlet");
  }, []);
  return (
    <div style={{ display: "none" }}>
      <div ref={componentRef} className={styles.ContTablePrint}>
        <h4>Laporan Keuangan</h4>
        <h4>Walaundry</h4>
        {outlets.map((outlet, index) => (
          <p key={index}>{outlet.alamat}</p>
        ))}
        <table style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <td width="150px">Periode</td>
              <td>
                : {firstData.slice(0, 10)} - {lastData.slice(0, 10)}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td width="150px">Total Pendapatan</td>
              <td
                style={{
                  color: jmlhMasuk - jmlhKeluar < 0 ? "red" : "#223055",
                }}
              >
                : Rp. {(jmlhMasuk - jmlhKeluar).toLocaleString()}
                {jmlhMasuk - jmlhKeluar !== 0 && ",00"}
              </td>
            </tr>
          </tbody>
        </table>
        <table className={styles.tablePrint}>
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
          {data.length < 1 ? (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <p>Data Masih Kosong</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data.map((d, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(d.waktu_transaksi).toLocaleString()}</td>
                  <td>{d.jenis_transaksi}</td>
                  <td>{d.outlet}</td>
                  <td>{d.keterangan}</td>
                  <td>{d.user}</td>
                  <td>
                    {d.jenis_transaksi === "Orderan" ? "Rp." + d.total : "-"}
                  </td>
                  <td>
                    {d.jenis_transaksi === "Pengeluaran"
                      ? "Rp." + d.total
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <table>
          <tbody>
            <tr>
              <td width="150px">
                <b>Total masuk</b>
              </td>
              <td>
                <b>
                  : Rp. {jmlhMasuk.toLocaleString()}
                  {jmlhMasuk !== 0 && ",00"}
                </b>
              </td>
            </tr>
            <tr>
              <td width="150px">
                <b>Total keluar</b>
              </td>
              <td>
                <b>
                  : Rp. {jmlhKeluar.toLocaleString()}{" "}
                  {jmlhKeluar !== 0 && ",00"}
                </b>
              </td>
            </tr>
            <tr>
              <td width="150px">
                <b>Saldo akhir</b>
              </td>
              <td
                style={{
                  color: jmlhMasuk - jmlhKeluar < 0 ? "red" : "#223055",
                }}
              >
                <b>
                  : Rp. {(jmlhMasuk - jmlhKeluar).toLocaleString()}
                  {jmlhMasuk - jmlhKeluar !== 0 && ",00"}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintTransaksi;
