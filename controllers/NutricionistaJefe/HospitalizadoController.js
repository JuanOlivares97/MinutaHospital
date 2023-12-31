const { strictEqual } = require("assert");
const db = require("../../database/database.js");
const path = require('path');
const nombreCarpeta = path.basename(__dirname);


const HospitalizadoController = {
  mostrarPaginaHospitalizados: (req, res) => {
    if (req.session && req.session.user) {
      // Accede a los datos almacenados en la sesión
      const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;
  
      const sql = `
        SELECT COUNT(*) AS Hospitalizados
        FROM Hospitalizado
        WHERE DATE(FechaIngreso) = CURDATE()
      `;
  
      db.query(sql, (error, result) => {
        if (error) {
          res.status(500).json({ error: 'Error al cargar los hospitalizados' });
        } else {
          res.render(`${nombreCarpeta}/hospitalizadoview`, {
            username: username,
            IdTipoFuncionario: IdTipoFuncionario,
            NombreCompleto: NombreCompleto,
            conteoHospitalizado: result[0].Hospitalizados // Accede al resultado correctamente
          });
        }
      });
    } else {
      res.redirect("/");
    }
  },  
  listarHospitalizados: (req, res) => {
    let tipoServicio = req.query.tipoServicio;

    // Si no se proporciona el parámetro tipoServicio, asigna un valor predeterminado o deja que sea null
    if (!tipoServicio) {
      tipoServicio = 0;  // O asigna el valor que desees por defecto
    }

    const query = `
        SELECT CodigoCama,
        TRIM(CONCAT(RutHospitalizado,'-',DvHospitalizado)) AS Rut,
        NombreHospitalizado,
        TIMESTAMPDIFF(YEAR, FechaNacimiento, CURDATE()) AS Edad,
        DATE_FORMAT(FechaIngreso, "%d-%m-%Y") AS FechaIngreso,
        ObservacionesNutricionista,
        DATE_FORMAT(FechaAlta, "%d-%m-%Y") AS FechaAlta,
        TR.DescTipoRegimen AS TipoRegimen,
        Ayuno
        FROM Hospitalizado H
        INNER JOIN TipoRegimen TR ON (H.IdTipoRegimen = TR.IdTipoRegimen)
        WHERE IdTipoServicio = ?;
    `;

    db.query(query, [tipoServicio], (error, hospitalizados) => {
      if (error) {
        res.status(500).json({ error: 'Error al cargar los hospitalizados' });
      } else {
        res.status(200).json(hospitalizados);
      }
    });
  },
  agregarHospitalizado: async (req, res) => {
    const {
      CodigoCama, //int
      RutHospitalizado, //int
      DvHospitalizado, //int
      NombreHospitalizado, //string
      FechaNacimiento, //date
      FechaIngreso, //date
      ObservacionesNutricionista, //textbox
      FechaAlta, //date
      IndicacionesAlta, //textbox
      CodigoCamaAlta,
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoVia
    } = req.body;

    // Realiza una consulta SQL para agregar un hospitalizado
    const query = "INSERT INTO `Hospitalizado` (`CodigoCama`, `RutHospitalizado`, `DvHospitalizado`, `NombreHospitalizado`, `FechaNacimiento`, `FechaIngreso`, `ObservacionesNutricionista`, `FechaAlta`, `IndicacionesAlta`, `CodigoCamaAlta`, `IdTipoServicio`, `IdTipoUnidad`, `IdTipoVia`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";

    db.query(query, [
      CodigoCama, //int
      RutHospitalizado, //int
      DvHospitalizado, //int
      NombreHospitalizado, //string
      FechaNacimiento, //date
      FechaIngreso, //date
      ObservacionesNutricionista, //textbox
      FechaAlta, //date
      IndicacionesAlta, //textbox
      CodigoCamaAlta,
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoVia
    ], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }

      return res.redirect(`${nombreCarpeta}/listar-hospitalizado`);
    });
  },
  actualizarServicioHospitalizado: async (req, res) => {
    const { servicio, RutHospitalizado } = req.body;
    console.log(servicio)
    const fechaSolicitud = new Date();
    const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
    const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const anio = fechaSolicitud.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;

    // Consulta para insertar un registro en AntecedentesHospitalizado
    const insertLogQuery = "INSERT INTO AntecedentesHospitalizado (FechaLog, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia) SELECT ?, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia FROM Hospitalizado WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

    db.query(insertLogQuery, [fechaFormateada, RutHospitalizado], (error, results, fields) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar el log en AntecedentesHospitalizado' });
        }

        // Consulta para actualizar el servicio del hospitalizado
        const updateHospitalizadoQuery = "UPDATE Hospitalizado SET IdTipoServicio = ? WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

        db.query(updateHospitalizadoQuery, [servicio, RutHospitalizado], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: 'Error al actualizar el servicio del hospitalizado' });
            }

            return res.redirect(`${nombreCarpeta}`);
        });
    });
},
actualizarAltaHospitalizado: async (req, res) => {
  const { RutHospitalizado, FechaAlta } = req.body;
  console.log(FechaAlta)
  const fechaSolicitud = new Date();
  const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
  const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
  const anio = fechaSolicitud.getFullYear();
  const fechaFormateada = `${anio}-${mes}-${dia}`;

  // Consulta para insertar un registro en AntecedentesHospitalizado
  const insertLogQuery = "INSERT INTO AntecedentesHospitalizado (FechaLog, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia) SELECT ?, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia FROM Hospitalizado WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

  db.query(insertLogQuery, [fechaFormateada, RutHospitalizado], (error, results, fields) => {
      if (error) {
          return res.status(500).json({ error: 'Error al insertar el log en AntecedentesHospitalizado' });
      }

      // Consulta para actualizar el servicio del hospitalizado
      const updateHospitalizadoQuery = "UPDATE Hospitalizado SET FechaAlta = ? WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

      db.query(updateHospitalizadoQuery, [FechaAlta, RutHospitalizado], (error, results, fields) => {
          if (error) {
              return res.status(500).json({ error: 'Error al actualizar el servicio del hospitalizado' });
          }

          return res.redirect(`${nombreCarpeta}`);
      });
  });
},
  mostrarGrafico: (req, res) => {
    if (req.session && req.session.user) {
      // Accede a los datos almacenados en la sesión
      const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;
      res.render(`${nombreCarpeta}/Dashboard`,{
        username: username,
        IdTipoFuncionario: IdTipoFuncionario,
        NombreCompleto: NombreCompleto,
      });
    } else {
      res.redirect("/");
    }
  },
};

module.exports = HospitalizadoController;
