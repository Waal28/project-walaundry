import mongoose from "mongoose";

const schema = new mongoose.Schema({
  kd_transaksi: {
    type: String,
    require: true,
  },
  outlet: {
    type: String,
    require: true,
  },
  tanggal: {
    type: String,
    require: true,
  },
  waktu: {
    type: String,
    require: true,
  },
  jenis: {
    type: Array,
    require: true,
  },
  qty: {
    type: Array,
    require: true,
  },
  biaya: {
    type: Array,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  keterangan: {
    type: String,
    require: true,
  },
  jenis_transaksi: {
    type: String,
    require: true,
  },
  waktu_transaksi: {
    type: Date,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
});
const Pengeluaran = mongoose.model("pengeluaran", schema);
export default Pengeluaran;
