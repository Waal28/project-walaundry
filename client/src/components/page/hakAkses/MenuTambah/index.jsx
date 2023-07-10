import React from "react";
import styles from "./index.module.css";
import { Form, Row } from "react-bootstrap";
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
  confPassword,
  setConfPassword,
}) => {
  return (
    <>
      {click ? <div className={styles.formMaincont}> </div> : null}
      {isUpdate ? (
        <CSSTransition classNames="fade" in={click} timeout={500} unmountOnExit>
          <div className={styles.formCont}>
            <h2 className={styles.headerForm}>Update User Akses</h2>
            <i className={`${styles.back} bi bi-x`} onClick={handleClick}></i>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>Hak Akses</b>
                  </Form.Label>
                  <Form.Select
                    value={dataById.hakAkses}
                    onChange={(e) =>
                      setDataById({ ...dataById, hakAkses: e.target.value })
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Kasir">Kasir</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>username</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="input username"
                    required
                    value={dataById.username}
                    onChange={(e) =>
                      setDataById({ ...dataById, username: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>Password</b>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="input password"
                    required
                    value={dataById.password}
                    onChange={(e) =>
                      setDataById({ ...dataById, password: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>Konfirmasi Password</b>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="konfirmasi password"
                    required
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <button type="submit" className={styles.submit}>
                  Simpan
                </button>
              </Row>
            </Form>
          </div>
        </CSSTransition>
      ) : (
        <CSSTransition classNames="fade" in={click} timeout={500} unmountOnExit>
          <div className={styles.formCont}>
            <h2 className={styles.headerForm}>Tambah User Akses</h2>
            <i className={`${styles.back} bi bi-x`} onClick={handleClick}></i>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>Hak Akses</b>
                  </Form.Label>
                  <Form.Select
                    value={dataForm.hakAkses}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, hakAkses: e.target.value })
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Kasir">Kasir</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>username</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="input username"
                    required
                    value={dataForm.username}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, username: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>Password</b>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="input password"
                    required
                    value={dataForm.password}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, password: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <b>Konfirmasi Password</b>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="konfirmasi kassword"
                    required
                    value={dataForm.confPassword}
                    onChange={(e) =>
                      setDataForm({
                        ...dataForm,
                        confPassword: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <button type="submit" className={styles.submit}>
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
