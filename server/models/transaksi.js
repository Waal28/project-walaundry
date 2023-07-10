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
  total: {
    type: Number,
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
  keterangan: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  nama_tabel: {
    type: String,
    require: true,
  },
});
const Transaksi = mongoose.model("transaksi", schema);
export default Transaksi;
