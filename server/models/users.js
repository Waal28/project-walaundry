import mongoose from "mongoose";

const schema = new mongoose.Schema({
  hakAkses: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
const Users = mongoose.model("users", schema);
export default Users;
