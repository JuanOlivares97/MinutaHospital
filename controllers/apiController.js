const db = require("../database/database.js");
const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const apiController = {
  mostrarMantenedores: (req, res) => {
    res.render(`${nombreCarpeta}/mantenedores`)
  },
  listarTipoVia: (req, res) => {
    const query = "SELECT * FROM `TipoVia`";
    db.query(query, function (error, TipoVia) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }
      res.status(200).json(TipoVia);
    });
  },
  listarTipoContrato: (req, res) => {
    const query = "SELECT * FROM TipoContrato";
    db.query(query, function (error, TipoContrato) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }
      res.status(200).json(TipoContrato);
    });
  },
  listarTipoEstamento: (req, res) => {
    const query = "SELECT * FROM TipoEstamento";
    db.query(query, function (error, TipoEstamento) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }
      res.status(200).json(TipoEstamento);
    });
  },
  listarTipoRegimen: (req, res) => {
    const query = "SELECT `IdTipoRegimen`, `DescTipoRegimen` FROM TipoRegimen WHERE Habilitado = 'S'";
    db.query(query, function (error, TipoRegimen) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }
      res.status(200).json(TipoRegimen);
    });
  },
  listarTipoServicio: (req, res) => {
    const query = "SELECT * FROM TipoServicio WHERE Habilitado = 'S'";
    db.query(query, function (error, TipoServicio) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }
      res.status(200).json(TipoServicio);
    });
  },
  listarTipoUnidad: (req, res) => {
    const query = "SELECT * FROM TipoUnidad WHERE Habilitado = 'S'";
    db.query(query, function (error, TipoUnidad) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }

      res.status(200).json(TipoUnidad);
    });
  },
  listarTipoFuncionario: (req, res) => {
    const query = "SELECT IdTipoFuncionario, TipoPerfil FROM TipoFuncionario";
    db.query(query, function (error, TipoFuncionario) {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }

      res.status(200).json(TipoFuncionario);
    });
  },
  agregarTipoVia: (req, res) => {  },
  agregarTipoContrato: (req, res) => { },
  agregarTipoEstamento: (req, res) => { },
  agregarTipoRegimen: (req, res) => { },
  agregarTipoServicio: (req, res) => { },
  agregarTipoUnidad: (req, res) => { },
  agregarTipoFuncionario: (req, res) => { },
  actualizarTipoVia: (req, res) => {  },
  actualizarTipoContrato: (req, res) => { },
  actualizarTipoEstamento: (req, res) => { },
  actualizarTipoRegimen: (req, res) => { },
  actualizarTipoServicio: (req, res) => { },
  actualizarTipoUnidad: (req, res) => { },
  actualizarTipoFuncionario: (req, res) => { },
};

module.exports = apiController;
