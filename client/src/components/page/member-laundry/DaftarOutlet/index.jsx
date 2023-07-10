import React, { useEffect, useState } from "react";
import { Form, Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import AlertDataKosong from "../../../1.MiniComp/AlertDataKosong";
import LoadingComp from "../../../1.MiniComp/LoadingComp";
import { DropMenu } from "../../../1.MiniComp/MenuDropdown";
import Pagination from "../../../1.MiniComp/Pagination";
import Showing from "../../../1.MiniComp/Showing";
import {
  handleFilter,
  handleHapusSemua,
  handlePromptHapus,
  handleSearch,
} from "../../../2.HandleFunc";
import styles from "./index.module.css";

const MenuFilter = ({ click, setClick }) => {
  return (
    <>
      {click ? <div className={styles.formMaincont}> </div> : null}
      <CSSTransition classNames="fade" in={click} timeout={500} unmountOnExit>
        <div className={styles.formCont}>
          <h2 className={styles.headerForm}>Tambah Jenis Laundry</h2>
          <i className={`${styles.back} bi bi-x`} onClick={setClick}></i>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <b>Kode</b>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <b>Nama</b>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <b>Harga per Kg</b>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Password" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    <b>Keterangan</b>
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <button type="submit" className={styles.submit}>
                Kirim
              </button>
            </Row>
          </Form>
        </div>
      </CSSTransition>
    </>
  );
};
function Items({
  currentItems,
  loading,
  itemOffset,
  handleClickUpdate,
  setDataById,
  setClickHapus,
  handleDetail,
}) {
  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Id Member</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>No Hp</th>
            <th>Actions</th>
          </tr>
        </thead>
        {currentItems.length < 1 ? (
          <tbody>
            <tr>
              <td colSpan={7}>{loading}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems &&
              currentItems.map((d, index) => (
                <tr key={index}>
                  <td>{index + itemOffset + 1}</td>
                  <td>{d.idMember}</td>
                  <td>{d.nama}</td>
                  <td>{d.jabatan}</td>
                  <td>{d.noHp}</td>
                  <td className={styles.actions}>
                    <Link onClick={(e) => handleClickUpdate(e, d._id)}>
                      <i className={`${styles.update} bi bi-pencil`}></i>
                    </Link>
                    <Link
                      onClick={(e) =>
                        handlePromptHapus(
                          e,
                          setDataById,
                          setClickHapus,
                          "memberLaundry",
                          d._id
                        )
                      }
                    >
                      <i className={`${styles.delete} bi bi-trash3`}></i>
                    </Link>
                    <Link onClick={(e) => handleDetail(e, d._id)}>
                      <i className={`${styles.details} bi bi-search`}></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </>
  );
}
const DaftarOutlet = ({
  data,
  setData,
  handleAdd,
  handleDetail,
  clickAdd,
  handleClickUpdate,
  setDataById,
  setClickHapus,
  setHapusSemua,
}) => {
  const menus = [
    {
      icon: "bi bi-funnel",
      nama: "Filter",
      childrens: [
        {
          nama: "Gender",
          childrens: [
            {
              nama: "Pria",
              click: () =>
                handleFilter("Pria", setData, "transaksi", "transaksiByJenis"),
            },
            {
              nama: "Wanita",
              click: () =>
                handleFilter(
                  "Wanita",
                  setData,
                  "transaksi",
                  "transaksiByJenis"
                ),
            },
          ],
        },
        {
          nama: "- Default Filter -",
          click: () =>
            handleFilter(
              "Default",
              setData,
              "memberLaundry",
              "transaksiByJenis"
            ),
        },
      ],
    },
    {
      icon: "bi bi-trash",
      nama: "Hapus semua data",
      click: () => handleHapusSemua(setClickHapus, setHapusSemua),
    },
  ];
  const [loading, setLoading] = useState(<LoadingComp />);
  const [click, setClick] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setLoading(<AlertDataKosong />);
    }, 3000);
  }, [data]);
  //
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className={styles.container}>
      <MenuFilter click={click} setClick={() => setClick(false)} />
      <div className={styles.table_cont}>
        <div className={styles.btnAddCont}>
          {clickAdd ? (
            <button disabled className={styles.btnDisable} onClick={handleAdd}>
              <i className="bi bi-plus-lg"></i>
              Tambah
            </button>
          ) : (
            <button className={styles.btn} onClick={handleAdd}>
              <i className="bi bi-plus-lg"></i>
              Tambah
            </button>
          )}
        </div>
        <div className={styles.table_head}>
          <Row>
            <Col md={2}>
              <Showing
                setItemsPerPage={setItemsPerPage}
                setItemOffset={setItemOffset}
              />
            </Col>
            <Col md={2}>
              <DropMenu items={menus} />
            </Col>
            <Col md={{ span: 3, offset: 5 }}>
              <Form.Control
                type="search"
                placeholder="Cari nama"
                onChange={(e) =>
                  handleSearch(e, setData, "memberLaundry", "nama")
                }
              />
            </Col>
          </Row>
        </div>
        <Items
          currentItems={currentItems}
          loading={loading}
          itemOffset={itemOffset}
          handleClickUpdate={handleClickUpdate}
          setDataById={setDataById}
          setClickHapus={setClickHapus}
          handleDetail={handleDetail}
        />
        <div className={styles.table_footer}>
          <div className={styles.pagination}>
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarOutlet;
