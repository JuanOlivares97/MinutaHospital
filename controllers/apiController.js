const db = require("../database/database.js");

const apiController = {
    listarTipoVia: async (req, res) => {
      try {
        const query = "SELECT * FROM `TipoVia`";
        const TipoVia =  await db.query(query);
        console.log(TipoVia)
        return TipoVia;
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al listar TipoVia" });
      }
    },
    listarTipoContrato: async (req, res) => {
        try {
          const query = "SELECT * FROM TipoContrato";
          const TipoContrato =  await db.query(query);
          return TipoContrato;
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al listar TipoContrato" });
        }
      },
      listarTipoEstamento: async (req, res) => {
        try {
          const query = "SELECT * FROM TipoEstamento";
          const TipoEstamento =  await db.query(query);
          return TipoEstamento // Renderiza la vista con los datos
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al listar TipoEstamento" });
        }
      },
      listarTipoRegimen: async (req, res) => {
        try {
          const query = "SELECT * FROM TipoRegimen";
          const TipoRegimen =  await db.query(query);
          return TipoRegimen;
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al listar TipoRegimen" });
        }
      },
      listarTipoServicio: async (req, res) => {
        try {
          const query = "SELECT * FROM TipoServicio";
          const TipoServicio =  await db.query(query);
          return TipoServicio;
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al listar TipoServicio" });
        }
      },
      listarTipoUnidad: async (req, res) => {
        try {
          const query = "SELECT * FROM TipoUnidad";
          const TipoUnidad =  await db.query(query);
          return TipoUnidad;
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al listar TipoUnidad" });
        }
      },
  };
  
module.exports = apiController;