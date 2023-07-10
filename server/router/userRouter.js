import express from "express";
import {
  addUser,
  deleteUser,
  getUserbyId,
  getUsers,
  Login,
  updateUser,
} from "../controllers/hakAksesController.js";
import {
  addJenisLaundry,
  addMemberLaundry,
  addOrderan,
  addOutlet,
  addPengeluaran,
  addTransaksi,
  deleteJenisLaundry,
  deleteJenisLaundryAll,
  deleteMemberLaundry,
  deleteMemberLaundryAll,
  deleteOrderan,
  deleteOrderanAll,
  deleteOutlet,
  deletePengeluaran,
  deletePengeluaranAll,
  deleteTransaksi,
  deleteTransaksiAll,
  getJenisLaundry,
  getJenisLaundrybyId,
  getMemberLaundry,
  getMemberLaundrybyId,
  getOrderan,
  getOrderanbyId,
  getOrderanSudahBayar,
  getOutlet,
  getPengeluaran,
  getPengeluaranbyId,
  getTransaksi,
  getTransaksibyId,
  getTransaksiByJenis,
  updateJenisLaundry,
  updateMemberLaundry,
  updateOrderan,
  updateOutlet,
  updatePengeluaran,
} from "../controllers/userControllers.js";

const router = express.Router();
// orderan
router.get("/orderan", getOrderan);
router.get("/orderan/:id", getOrderanbyId);
router.post("/orderan", addOrderan);
router.patch("/orderan/:id", updateOrderan);
router.delete("/orderan/:id", deleteOrderan);
router.delete("/orderan/deleteall/:jenis_transaksi", deleteOrderanAll);
router.get("/orderanSudahBayar", getOrderanSudahBayar);
// pengeluaran
router.get("/pengeluaran", getPengeluaran);
router.get("/pengeluaran/:id", getPengeluaranbyId);
router.post("/pengeluaran", addPengeluaran);
router.patch("/pengeluaran/:id", updatePengeluaran);
router.delete("/pengeluaran/:id", deletePengeluaran);
router.delete("/pengeluaran/deleteall/:jenis_transaksi", deletePengeluaranAll);
//transaksi
router.get("/transaksi", getTransaksi);
router.get("/transaksi/:id", getTransaksibyId);
router.post("/transaksi", addTransaksi);
router.delete("/transaksi/:id", deleteTransaksi);
router.get("/transaksiByJenis/:jenis_transaksi", getTransaksiByJenis);
router.delete("/transaksi/deleteall/:nama_tabel", deleteTransaksiAll);
// jenis_laundry
router.get("/jenisLaundry", getJenisLaundry);
router.get("/jenisLaundry/:id", getJenisLaundrybyId);
router.post("/jenisLaundry", addJenisLaundry);
router.patch("/jenisLaundry/:id", updateJenisLaundry);
router.delete("/jenisLaundry/:id", deleteJenisLaundry);
router.delete("/jenisLaundry/deleteall/:nama_tabel", deleteJenisLaundryAll);
// member_laundry
router.get("/memberLaundry", getMemberLaundry);
router.get("/memberLaundry/:id", getMemberLaundrybyId);
router.post("/memberLaundry", addMemberLaundry);
router.patch("/memberLaundry/:id", updateMemberLaundry);
router.delete("/memberLaundry/:id", deleteMemberLaundry);
router.delete("/memberLaundry/deleteall/:nama_tabel", deleteMemberLaundryAll);
// outlet
router.get("/outlet", getOutlet);
router.post("/outlet", addOutlet);
router.patch("/outlet/:id", updateOutlet);
router.delete("/outlet/:id", deleteOutlet);
// users
router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/login", Login);

export default router;
