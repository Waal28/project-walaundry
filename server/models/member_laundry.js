import mongoose from "mongoose";

const schema = new mongoose.Schema({
  idMember: {
    type: String,
    require: true,
  },
  nama: {
    type: String,
    require: true,
  },
  noHp: {
    type: Number,
    require: true,
  },
  alamat: {
    type: String,
    require: true,
  },
  jabatan: {
    type: String,
    require: true,
  },
  outlet: {
    type: String,
    require: true,
  },
  tempat: {
    type: String,
    require: true,
  },
  tanggal: {
    type: Number,
    require: true,
  },
  bulan: {
    type: String,
    require: true,
  },
  tahun: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  nama_tabel: {
    type: String,
    require: true,
  },
});
const MemberLaundry = mongoose.model("member_laundry", schema);
export default MemberLaundry;
