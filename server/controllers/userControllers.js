import JenisLaundry from "../models/jenis_laundry.js";
import Orderan from "../models/orderan.js";
import Pengeluaran from "../models/pengeluaran.js";
import Transaksi from "../models/transaksi.js";
import MemberLaundry from "../models/member_laundry.js";
import Outlet from "../models/outlet.js";

// orderan
export const getOrderan = async (req, res) => {
  try {
    const order = await Orderan.find();
    res.json(order.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addOrderan = async (req, res) => {
  try {
    const order = await Orderan.insertMany(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateOrderan = async (req, res) => {
  try {
    const order = await Orderan.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteOrderan = async (req, res) => {
  try {
    const order = await Orderan.deleteOne({ _id: req.params.id });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteOrderanAll = async (req, res) => {
  try {
    const order = await Orderan.deleteMany({
      jenis_transaksi: req.params.jenis_transaksi,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOrderanbyId = async (req, res) => {
  try {
    const order = await Orderan.findById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOrderanSudahBayar = async (req, res) => {
  try {
    const order = await Orderan.find();
    const sudahBayar = order.filter(
      (fill) => fill.status_transaksi === "sudah_bayar"
    );
    res.json(sudahBayar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// pengeluaran
export const getPengeluaran = async (req, res) => {
  try {
    const pengeluaran = await Pengeluaran.find();
    res.json(pengeluaran.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addPengeluaran = async (req, res) => {
  try {
    const pengeluaran = await Pengeluaran.insertMany(req.body);
    res.json(pengeluaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updatePengeluaran = async (req, res) => {
  try {
    const pengeluaran = await Pengeluaran.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(pengeluaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePengeluaran = async (req, res) => {
  try {
    const pengeluaran = await Pengeluaran.deleteOne({ _id: req.params.id });
    res.json(pengeluaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPengeluaranbyId = async (req, res) => {
  try {
    const pengeluaran = await Pengeluaran.findById(req.params.id);
    res.json(pengeluaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePengeluaranAll = async (req, res) => {
  try {
    const pengeluaran = await Pengeluaran.deleteMany({
      jenis_transaksi: req.params.jenis_transaksi,
    });
    res.json(pengeluaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// transaksi
export const getTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.find();
    res.json(transaksi.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.insertMany(req.body);
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.deleteOne({ _id: req.params.id });
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTransaksibyId = async (req, res) => {
  try {
    const transaksi = await Transaksi.findById(req.params.id);
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTransaksiByJenis = async (req, res) => {
  try {
    const transaksi = await Transaksi.find({
      jenis_transaksi: req.params.jenis_transaksi,
    });
    res.json(transaksi.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTransaksiAll = async (req, res) => {
  try {
    const transaksi = await Transaksi.deleteMany({
      nama_tabel: req.params.nama_tabel,
    });
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// jenis_laundry
export const getJenisLaundry = async (req, res) => {
  try {
    const jenis_laundry = await JenisLaundry.find();
    res.json(jenis_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addJenisLaundry = async (req, res) => {
  try {
    const jenis_laundry = await JenisLaundry.insertMany(req.body);
    res.json(jenis_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateJenisLaundry = async (req, res) => {
  try {
    const jenis_laundry = await JenisLaundry.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(jenis_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteJenisLaundry = async (req, res) => {
  try {
    const jenis_laundry = await JenisLaundry.deleteOne({ _id: req.params.id });
    res.json(jenis_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getJenisLaundrybyId = async (req, res) => {
  try {
    const jenis_laundry = await JenisLaundry.findById(req.params.id);
    res.json(jenis_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteJenisLaundryAll = async (req, res) => {
  try {
    const jenis_laundry = await JenisLaundry.deleteMany({
      nama_tabel: req.params.nama_tabel,
    });
    res.json(jenis_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// member_laundry
export const getMemberLaundry = async (req, res) => {
  try {
    const member_laundry = await MemberLaundry.find();
    res.json(member_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addMemberLaundry = async (req, res) => {
  try {
    const member_laundry = await MemberLaundry.insertMany(req.body);
    res.json(member_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateMemberLaundry = async (req, res) => {
  try {
    const member_laundry = await MemberLaundry.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(member_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteMemberLaundry = async (req, res) => {
  try {
    const member_laundry = await MemberLaundry.deleteOne({
      _id: req.params.id,
    });
    res.json(member_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMemberLaundrybyId = async (req, res) => {
  try {
    const member_laundry = await MemberLaundry.findById(req.params.id);
    res.json(member_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteMemberLaundryAll = async (req, res) => {
  try {
    const member_laundry = await JenisLaundry.deleteMany({
      nama_tabel: req.params.nama_tabel,
    });
    res.json(member_laundry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  outlet
export const getOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.find();
    res.json(outlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.insertMany(req.body);
    res.json(outlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(outlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.deleteOne({
      _id: req.params.id,
    });
    res.json(outlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
