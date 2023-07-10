import axios from "axios";

export const getData = async (setData, table) => {
  const response = await axios.get(`http://localhost:3004/${table}`);
  setData(response.data);
  const data = response.data;
  return data;
};
export const getDataByField = async (setData, tableField, field) => {
  const response = await axios.get(
    `http://localhost:3004/${tableField}/${field}`
  );
  setData(response.data);
  const data = response.data;
  return data;
};
export const getDataById = async (setDataById, table, id) => {
  const response = await axios.get(`http://localhost:3004/${table}/${id}`);
  setDataById(response.data);
  const data = response.data;
  return data;
};
export const postData = async (setData, table, value) => {
  try {
    await axios.post(`http://localhost:3004/${table}`, value);
    getData(setData, table);
  } catch (error) {
    return error.response.data.msg;
  }
};
export const updateData = async (setData, table, id, value) => {
  try {
    await axios.patch(`http://localhost:3004/${table}/${id}`, value);
    getData(setData, table);
  } catch (error) {
    return error.response.data.msg;
  }
};
export const deleteOneData = async (setData, table, id) => {
  try {
    await axios.delete(`http://localhost:3004/${table}/${id}`);
    getData(setData, table);
  } catch (error) {
    alert("Data gagal dihapus");
    console.log(error);
  }
};
export const deleteAllData = async (setData, table, jenis_transaksi) => {
  try {
    await axios.delete(
      `http://localhost:3004/${table}/deleteall/${jenis_transaksi}`
    );
    getData(setData, table);
  } catch (error) {
    alert("Data gagal dihapus");
    console.log(error);
  }
};
