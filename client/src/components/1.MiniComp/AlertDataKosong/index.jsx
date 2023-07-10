import React from "react";
import { Alert, Container } from "react-bootstrap";
import styles from "./index.module.css";

const AlertDataKosong = () => {
  return (
    <Container>
      <Alert key="danger" variant="danger" className={styles.alert}>
        Data tidak Ditemukan
      </Alert>
    </Container>
  );
};

export default AlertDataKosong;
