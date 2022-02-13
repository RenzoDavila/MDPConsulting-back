const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "mdpconsulting",
});

app.use(
  cors({
    origin: "*",
  })
);

// probando
app.get("/", (req, res) => {
  res.send("estas conectado a la API");
});

// listar clientes
app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM clientes";
  connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("no existen clientes actualmente");
      }
    } else {
      console.log(error);
    }
  });
});

// mostrar cliente
app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM clientes WHERE cli_id =" + id;
  connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("no existe un cliente con este id");
      }
    } else {
      console.log(error);
    }
  });
});

// promedio
app.get("/promedio", (req, res) => {
  const sql =
    "SELECT ROUND(SUM(YEAR(CURDATE())-YEAR(cli_fec_nac) + IF(DATE_FORMAT(CURDATE(),'%m-%d') > DATE_FORMAT(cli_fec_nac,'%m-%d'), 0 , -1 ))/COUNT(cli_fec_nac)) AS 'p' FROM clientes";
  connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("no existen clientes actualmente");
      }
    } else {
      console.log(error);
    }
  });
});

// agregar cliente
app.post("/agregar", (req, res) => {
  const sql = "INSERT INTO clientes SET ?";
  const cliente = {
    cli_nom: req.body.nombre,
    cli_ape: req.body.apellido,
    cli_fec_nac: req.body.fecha,
  };
  connection.query(sql, cliente, (error, results) => {
    if (!error) {
      res.send("cliente creado");
    } else {
      console.log(error);
    }
  });
});

// editar cliente
app.put("/editar/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha } = req.body;
  const sql =
    "UPDATE clientes SET cli_nom = '" +
    nombre +
    "', cli_ape = '" +
    apellido +
    "', cli_fec_nac = '" +
    fecha +
    "' WHERE (cli_id = " +
    id +
    ")";
  connection.query(sql, (error, results) => {
    if (!error) {
      res.send("cliente editado");
    } else {
      console.log(error);
    }
  });
});

// eliminar cliente
app.delete("/eliminar/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM clientes WHERE cli_id =" + id;
  connection.query(sql, (error, results) => {
    if (!error) {
      res.send("cliente eliminado");
    } else {
      console.log(error);
    }
  });
});

app.listen(5000, () => console.log("listining on port 5000"));
