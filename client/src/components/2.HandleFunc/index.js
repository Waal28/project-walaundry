import axios from "axios";
import { getData, getDataById } from "./api";

// ini handle search
export const handleSearch = async (e, setData, table, field) => {
  e.preventDefault();
  const query = e.target.value;
  const response = await axios.get(`http://localhost:3004/${table}`);
  const updateList = response.data.filter(
    (fill) => fill[field].toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  setData(updateList);
};
// ini handle filter
export const handleFilter = async (value, field, setData, table) => {
  const response = await getData(setData, table);
  const dataFilter = response.filter((res) => res[field] === value);

  if (value === "Default" || value === "") {
    await getData(setData, table);
  } else {
    setData(dataFilter);
  }
};
// handleSort
export const handleSortWaktu = async (
  data,
  setData,
  sortWaktu,
  setSortWaktu
) => {
  setSortWaktu(!sortWaktu);
  let dataSort = data;
  if (sortWaktu) {
    dataSort = dataSort.sort(
      (a, b) => new Date(b.waktu_transaksi) - new Date(a.waktu_transaksi)
    );
    setData(dataSort);
  } else {
    dataSort = dataSort.sort(
      (a, b) => new Date(a.waktu_transaksi) - new Date(b.waktu_transaksi)
    );
    setData(dataSort);
  }
};
export const handleSortTotal = (data, setData, sortTotal, setSortTotal) => {
  setSortTotal(!sortTotal);
  let dataSort = data;
  if (sortTotal) {
    dataSort = dataSort.sort((a, b) => b.total - a.total);
    setData(dataSort);
  } else {
    dataSort = dataSort.sort((a, b) => a.total - b.total);
    setData(dataSort);
  }
};
// handle promp hapus
export const handlePromptHapus = (e, setDataById, setClickHapus, table, id) => {
  e.preventDefault();
  setClickHapus(true);
  getDataById(setDataById, table, id);
};
export const handleHapusSemua = (setClickHapus, setHapusSemua) => {
  setClickHapus(true);
  setHapusSemua(true);
};
