import React from "react";
import styles from "./index.module.css";
import CanvasJSReact from "@canvasjs/react-charts";
import {} from "../../../2.HandleFunc/api";
import DataPoint, { dayMonthYear } from "./dataPoint";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
CanvasJS.addColorSet("greenShades", [
  //colorSet Array

  "#7a2334",
  "#7a2377",
  "#0a4058",
  "#3c376a",
  "#43364a",
]);
//

//Create Chart
const Graph = () => {
  const { dataX, dataY, hari } = DataPoint();

  const options = {
    height: 300,
    margin: 20,
    colorSet: "greenShades",
    exportEnabled: true,
    animationEnabled: true,
    backgroundColor: "#e7e8ff",
    theme: "light2", //"light1", "dark1", "dark2"
    axisY: {
      // title: "Status Aktivitas",
      tickLength: 10,
    },
    axisX: {
      labelFontSize: 10,
      margin: 20,
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#223055",
        indexLabelPlacement: "outside",
        // dataPoints: [
        //   { label: "Orderan", y: orderan.length },
        //   { label: "Pengeluaran", y: pengeluaran.length },
        // ],
        // dataPoints: [
        //   { label: "Proses", y: status[0].length },
        //   { label: "Selesai Dicuci", y: status[1].length },
        //   { label: "Selesai Digosok", y: status[2].length },
        //   { label: "Sudah Diambil", y: status[3].length },
        //   { label: "Sudah Dibayar", y: status[4].length },
        // ],
        dataPoints: dataX.map((data, index) => {
          return { label: dayMonthYear(data), y: dataY[index] };
        }),
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Grafik Pemasukan Laundry</h2>
      <p style={{ textAlign: "center", fontWeight: "Bold", marginBottom: 27 }}>
        {hari} Hari Terakhir
      </p>
      <div className={styles.chart}>
        <CanvasJSChart options={options} />
        <div className={styles.hiddenTrial}></div>
      </div>
    </div>
  );
};

export default Graph;
