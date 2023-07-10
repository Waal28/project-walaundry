import React from "react";
import SideBar from "../comp_sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  MemberLaundry,
  Orderan,
  JenisLaundry,
  Produk,
  Pengeluaran,
  Laporan,
  ProfilLaundry,
  LoginPage,
} from "../router";
import HakAkses from "../page/hakAkses";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <SideBar>
              <Dashboard />
            </SideBar>
          }
        />
        <Route
          path="/member"
          element={
            <SideBar>
              <MemberLaundry />
            </SideBar>
          }
        />
        <Route
          path="/orderan"
          element={
            <SideBar>
              <Orderan />
            </SideBar>
          }
        />
        <Route
          path="/jenis-laundry"
          element={
            <SideBar>
              <JenisLaundry />
            </SideBar>
          }
        />
        <Route
          path="/produk"
          element={
            <SideBar>
              <Produk />
            </SideBar>
          }
        />
        <Route
          path="/pengeluaran"
          element={
            <SideBar>
              <Pengeluaran />
            </SideBar>
          }
        />
        <Route
          path="/laporan"
          element={
            <SideBar>
              <Laporan />
            </SideBar>
          }
        />
        <Route
          path="/profil"
          element={
            <SideBar>
              <ProfilLaundry />
            </SideBar>
          }
        />
        <Route
          path="/hakAkses"
          element={
            <SideBar>
              <HakAkses />
            </SideBar>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </div>
  );
};

export default Home;
