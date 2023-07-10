import axios from "axios";
import { useEffect, useState } from "react";

const DataPoint = () => {
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const hari = 4;

  const ambilWaktu = async () => {
    const res = await axios.get("http://localhost:3004/transaksi");
    const orderan = res.data.filter(
      (data) => data.jenis_transaksi === "Orderan"
    );

    const data_X = [];
    const data_Y = [];

    for (let i = 0; i < hari; i++) {
      let date = new Date(orderan[0].waktu_transaksi);
      let yesterday = date - 1000 * 60 * 60 * 24 * i;
      yesterday = new Date(yesterday);

      data_X.push(yesterday);
    }
    for (let j = 0; j < hari; j++) {
      let result = orderan.filter((d) => {
        return dayMonthYear(d.waktu_transaksi) === dayMonthYear(data_X[j]);
      });
      let jmlh = result.reduce((acc, curr) => acc + +curr.total, 0);
      data_Y.push(jmlh);
    }

    setDataX(data_X.reverse());
    setDataY(data_Y.reverse());
  };

  useEffect(() => {
    ambilWaktu();
  }, []);

  return { dataX, dataY, hari };
};
export default DataPoint;

export const dayMonthYear = (value) => {
  var dateObj = new Date(value);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return day + "/" + month + "/" + year;
};
