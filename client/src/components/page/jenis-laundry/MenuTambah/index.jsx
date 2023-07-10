import React from "react";
import styles from "./index.module.css";
import { Form, Col, Row } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

const MenuTambah = ({
  click,
  handleClick,
  handleSubmit,
  setDataForm,
  dataForm,
  dataById,
  setDataById,
  isUpdate,
}) => {
  return (
    <>
      {click ? <div className={styles.formMaincont}> </div> : null}
      {isUpdate ? (
        <CSSTransition classNames="fade" in={click} timeout={500} unmountOnExit>
          <div className={styles.formCont}>
            <h2 className={styles.headerForm}>Update Jenis Laundry</h2>
            <i className={`${styles.back} bi bi-x`} onClick={handleClick}></i>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <b>Kode (*auto)</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={dataById.kode}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Nama</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="input nama produk"
                      value={dataById.nama}
                      onChange={(e) =>
                        setDataById({ ...dataById, nama: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Harga per Kg</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="input harga"
                      value={dataById.harga}
                      onChange={(e) =>
                        setDataById({ ...dataById, harga: e.target.value })
                      }
                    />
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
                    <Form.Control
                      as="textarea"
                      placeholder="input keterangan"
                      rows={3}
                      value={dataById.keterangan}
                      onChange={(e) =>
                        setDataById({ ...dataById, keterangan: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <button
                  type="submit"
                  className={styles.submit}
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </Row>
            </Form>
          </div>
        </CSSTransition>
      ) : (
        <CSSTransition classNames="fade" in={click} timeout={500} unmountOnExit>
          <div className={styles.formCont}>
            <h2 className={styles.headerForm}>Tambah Jenis Laundry</h2>
            <i className={`${styles.back} bi bi-x`} onClick={handleClick}></i>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <b>Kode (*auto)</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={dataForm.kode}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Nama</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="input nama produk"
                      value={dataForm.nama}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, nama: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Harga per Kg</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="input harga"
                      value={dataForm.harga}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, harga: e.target.value })
                      }
                    />
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
                    <Form.Control
                      as="textarea"
                      placeholder="input keterangan"
                      rows={3}
                      value={dataForm.keterangan}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, keterangan: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <button
                  type="submit"
                  className={styles.submit}
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </Row>
            </Form>
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default MenuTambah;
