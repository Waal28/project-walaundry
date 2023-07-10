import { ReactComponent as Process } from "../svg/process.svg";
import { ReactComponent as SelesaiDicuci } from "../svg/selesai-dicuci.svg";
import { ReactComponent as SudahDiambil } from "../svg/sudah-diambil.svg";
import { ReactComponent as SelesaiDigosok } from "../svg/selesai_gosok.svg";
import { ReactComponent as SudahDibayar } from "../svg/sudah-dibayar.svg";

const items = [
  {
    bg: "card_2",
    title: "Proses",
    jumlah: "0",
    icon: <Process fill="rgba(255,255,255,0.8)" width="50px" height="50px" />,
  },
  {
    bg: "card_3",
    title: "Selesai Dicuci",
    jumlah: "0",
    icon: (
      <SelesaiDicuci fill="rgba(255,255,255,0.8)" width="45px" height="45px" />
    ),
  },
  {
    bg: "card_4",
    title: "Selesai Digosok",
    jumlah: "0",
    icon: (
      <SelesaiDigosok fill="rgba(255,255,255,0.8)" width="45px" height="45px" />
    ),
  },
  {
    bg: "card_5",
    title: "Sudah Diambil",
    jumlah: "0",
    icon: (
      <SudahDiambil fill="rgba(255,255,255,0.8)" width="53px" height="53px" />
    ),
  },
  {
    bg: "card_6",
    title: "Sudah Dibayar",
    jumlah: "0",
    icon: (
      <SudahDibayar fill="rgba(255,255,255,0.8)" width="50px" height="50px" />
    ),
  },
];

export default items;
