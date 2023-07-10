import mongoose from "mongoose";

const schema = new mongoose.Schema({
  kode: {
    type: String,
    require: true,
  },
  nama: {
    type: String,
    require: true,
  },
  harga: {
    type: Number,
    require: true,
  },
  keterangan: {
    type: String,
    require: true,
  },
  nama_tabel: {
    type: String,
    require: true,
  },
});
const JenisLaundry = mongoose.model("jenis_laundry", schema);
export default JenisLaundry;
