import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nama: {
    type: String,
    require: true,
  },
  alamat: {
    type: String,
    require: true,
  },
  kontak: {
    type: String,
    require: true,
  },
});
const Outlet = mongoose.model("outlet", schema);
export default Outlet;
