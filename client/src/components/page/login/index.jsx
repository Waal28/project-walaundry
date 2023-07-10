import { useEffect, useState } from "react";
import { Col, Row, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import logo from "../../comp_sidebar/sidebar/logo.jpg";
import axios from "axios";

export default function LoginPage() {
  const [loginPage, setLoginpage] = useState(false);
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e, property) => {
    setUser({ ...user, [property]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3004/login`, user);
      const userInfo = response.data;
      localStorage.setItem("authenticated", true);
      localStorage.setItem("alert", true);
      localStorage.setItem("username", userInfo.username);
      localStorage.setItem("hakAkses", userInfo.hakAkses);
      navigate("/");
    } catch (error) {
      setMsg(error.response.data.msg);
      setValidated(true);
    }
  };
  useEffect(() => {
    setLoginpage(true);
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#223055",
        overflow: "hidden",
      }}
    >
      <Col
        md={6}
        lg={6}
        xs={5}
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          opacity: loginPage ? 1 : 0,
          marginTop: loginPage ? 0 : "60%",
          transition: "all ease 1s",
          color: "white",
        }}
      >
        <img src={logo} alt="" />
        <p
          style={{
            fontSize: "1.5vw",
            margin: 0,
            padding: 2,
            borderBottom: "2px solid white",
          }}
        >
          Budayakan Malas Mencuci
        </p>
        <p style={{ fontSize: "1.1vw", marginTop: 4 }}>
          Karna mencuci adalah tugas kami
        </p>
      </Col>
      <Col
        md={6}
        lg={6}
        xs={7}
        style={{
          opacity: loginPage ? 1 : 0,
          marginBottom: loginPage ? 0 : "60%",
          transition: "all ease 1s",
          padding: "0 4%",
        }}
      >
        <div
          style={{
            backgroundColor: "#223055",
            padding: 4,
            borderLeft: "3px solid white",
            borderRight: "3px solid white",
            borderRadius: 5,
          }}
        >
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2
                  className="pb-3 fw-bold mb-5 text-uppercase "
                  style={{ borderBottom: "3px solid black" }}
                >
                  Walaundry
                </h2>
                <Row className="d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#223055",
                      color: "white",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <i className="bi bi-lock-fill" style={{ fontSize: 30 }}></i>
                  </div>
                  <b className="mt-4 mb-4 text-center" style={{ fontSize: 16 }}>
                    Login sistem manajemen laundry
                  </b>
                  <p className="text-center" style={{ color: "red" }}>
                    {msg}
                  </p>
                </Row>
                <div className="mb-3">
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <b>Username</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan username"
                        value={user.username}
                        onChange={(e) => handleChange(e, "username")}
                        required
                        isInvalid={validated}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>
                        <b>Password</b>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukkan password"
                        value={user.password}
                        onChange={(e) => handleChange(e, "password")}
                        required
                        isInvalid={validated}
                      />
                    </Form.Group>
                    <div className="mt-5 d-grid">
                      <button type="submit" className={styles.btn}>
                        Login
                      </button>
                    </div>
                  </Form>
                  <div className="mt-5">
                    <p className="mb-0  text-center">
                      Copyright © Walaundry 2023
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </div>
  );
}
