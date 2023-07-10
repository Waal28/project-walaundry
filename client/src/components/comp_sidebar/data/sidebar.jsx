const DataSidebar = () => {
  const dataAdmin = [
    {
      title: "Dashboard",
      icon: "bi bi-speedometer2",
      path: "/",
    },
    {
      title: "Petugas Laundry",
      icon: "bi bi-people-fill",
      path: "/member",
    },

    {
      title: "Jenis Laundry",
      icon: "bi bi-list-ul",
      path: "/jenis-laundry",
    },

    {
      title: "Transaksi",
      icon: "bi bi-wallet",
      childrens: [
        {
          title: "Orderan",
          icon: "bi bi-cart2",
          path: "/orderan",
        },
        {
          title: "Pengeluaran",
          icon: "bi bi-clipboard-minus",
          path: "/pengeluaran",
        },
      ],
    },
    {
      title: "Laporan",
      icon: "bi bi-journal-text",
      path: "/laporan",
    },
    {
      title: "Profil Laundry",
      icon: "bi bi-person-circle",
      path: "/profil",
    },
  ];
  const dataKasir = [
    {
      title: "Dashboard",
      icon: "bi bi-speedometer2",
      path: "/",
    },
    {
      title: "Transaksi",
      icon: "bi bi-wallet",
      childrens: [
        {
          title: "Orderan",
          icon: "bi bi-cart2",
          path: "/orderan",
        },
        {
          title: "Pengeluaran",
          icon: "bi bi-clipboard-minus",
          path: "/pengeluaran",
        },
      ],
    },
  ];
  return { dataAdmin, dataKasir };
};

export default DataSidebar;
