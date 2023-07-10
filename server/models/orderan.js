import mongoose from "mongoose";

const schema = new mongoose.Schema({
  invoice: {
    type: String,
    require: true,
  },
  waktu_invoice: {
    type: String,
    require: true,
  },
  waktu_selesai: {
    type: String,
    require: true,
  },
  pelanggan: {
    type: String,
    require: true,
  },
  outlet: {
    type: String,
    require: true,
  },
  jenis_laundry: {
    type: String,
    require: true,
  },
  status_laundry: {
    type: String,
    require: true,
  },
  status_transaksi: {
    type: String,
    require: true,
  },
  berat: {
    type: Number,
    require: true,
  },
  total_bayar: {
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
const Orderan = mongoose.model("orderan", schema);
export default Orderan;
