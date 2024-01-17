const { strictEqual } = require("assert");
const db = require("../../database/database.js");
const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const HospitalizadoController = {
  mostrarPaginaHospitalizados: (req, res) => {
    if (req.session && req.session.user) {
      // Accede a los datos almacenados en la sesión
      const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;
      const redirectPath = getRedirectPath(IdTipoFuncionario);

      const sql = `
        SELECT COUNT(*) AS Hospitalizados
        FROM Hospitalizado
        WHERE DATE(FechaIngreso) = CURDATE()
      `;

      db.query(sql, (error, result) => {
        if (error) {
          res.render('errorView', { mensaje: 'Error al cargar los hospitalizados' });
        } else {
          res.render(`${nombreCarpeta}/hospitalizadoview`, {
            username: username,
            TipoFuncionario: redirectPath,
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
        res.render('errorView', { mensaje: 'Error al cargar los hospitalizados' });
      } else {
        res.status(200).json(hospitalizados);
      }
    });
  },
  agregarHospitalizado: async (req, res) => {
    const {
      CodigoCama, //int
      RutSinDv, //int
      DvHospitalizado, //int
      NombreHospitalizado, //string
      FechaNacimiento, //date
      FechaIngreso, //date
      ObservacionesNutricionista, //textbox
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoVia,
      IdTipoRegimen
    } = req.body;

    // Realiza una consulta SQL para agregar un hospitalizado
    const query = `INSERT INTO Hospitalizado 
        (CodigoCama,
        RutHospitalizado,
        DvHospitalizado,
        NombreHospitalizado,
        FechaNacimiento,
        FechaIngreso,
        ObservacionesNutricionista,
        IdTipoServicio,
        IdTipoUnidad,
        IdTipoVia,
        IdTipoRegimen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    db.query(query, [
      CodigoCama, //int
      RutSinDv, //int
      DvHospitalizado, //int
      NombreHospitalizado, //string
      FechaNacimiento, //date
      FechaIngreso, //date
      ObservacionesNutricionista, //textbox
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoVia,
      IdTipoRegimen
    ], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }

      return res.redirect(`/${nombreCarpeta}/listar-hospitalizado?mensaje=Hospitalizado Agregado`);
    });
  },
  actualizarServicioHospitalizado: async (req, res) => {
    const { servicio, RutHospitalizado } = req.body;
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

        return res.redirect(`/${nombreCarpeta}?mensaje=Servicio de Hospitalizado Agregado`);
      });
    });
  },
  actualizarAltaHospitalizado: async (req, res) => {
    const { 
      RutHospitalizado,
      FechaAlta,
      IndicacionesAlta,
      CodigoCamaAlta } = req.body;
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
      const updateHospitalizadoQuery = "UPDATE Hospitalizado SET FechaAlta = ?, IndicacionesAlta = ?, CodigoCamaAlta = ? WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

      db.query(updateHospitalizadoQuery, [FechaAlta, IndicacionesAlta, CodigoCamaAlta, RutHospitalizado], (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error: 'Error al actualizar el servicio del hospitalizado' + error });
        }

        return res.redirect(`/${nombreCarpeta}?mensaje=Hospitalizado dado de Alta`);
      });
    });
  },
  actualizarAyuno: async (req, res) => {
    const { RutHospitalizado } = req.body;
    const fechaSolicitud = new Date();
    const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
    const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const anio = fechaSolicitud.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;

    // Consulta para insertar un registro en AntecedentesHospitalizado
    const insertLogQuery = "INSERT INTO AntecedentesHospitalizado (FechaLog, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia) SELECT ?, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, 1 - Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia FROM Hospitalizado WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

    db.query(insertLogQuery, [fechaFormateada, RutHospitalizado], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: 'Error al insertar el log en AntecedentesHospitalizado' });
      }

      const confirmationQuery = "SELECT Ayuno FROM Hospitalizado WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";
      db.query(confirmationQuery, [RutHospitalizado], (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error: 'Error al obtener el valor de Ayuno' });
        }

        const nuevoValorAyuno = results[0].Ayuno === 1 ? 0 : 1;

        // Consulta para actualizar el servicio y modificar Ayuno
        const updateHospitalizadoQuery = "UPDATE Hospitalizado SET Ayuno = ? WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

        db.query(updateHospitalizadoQuery, [nuevoValorAyuno, RutHospitalizado], (error, results, fields) => {
          if (error) {
            return res.status(500).json({ error: 'Error al actualizar el servicio y modificar Ayuno del hospitalizado' });
          }

          return res.redirect(`/${nombreCarpeta}?mensaje=Ayuno modificado`);
        });
      });
    });
  },
  actualizarObervaciones: async (req, res) => {
    const { RutHospitalizado, Observaciones } = req.body;
    const fechaSolicitud = new Date();
    const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
    const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const anio = fechaSolicitud.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;

    // Consulta para insertar un registro en AntecedentesHospitalizado
    const insertLogQuery = "INSERT INTO AntecedentesHospitalizado (FechaLog, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia) SELECT ?, IdHospitalizado, CodigoCama, RutHospitalizado, DvHospitalizado, NombreHospitalizado, FechaNacimiento, FechaIngreso, ObservacionesNutricionista, FechaAlta, IndicacionesAlta, ServicioAlta, CodigoCamaAlta, IdTipoRegimen, 1 - Ayuno, IdTipoServicio, IdTipoUnidad, IdTipoVia FROM Hospitalizado WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";
    db.query(insertLogQuery, [fechaFormateada, RutHospitalizado], (error, results, fields) => {
      if (error) {
        return res.render('errorView',{ error: 'Error al insertar el log en AntecedentesHospitalizado '+error });
      }

        // Consulta para actualizar el servicio y modificar Ayuno
        const updateHospitalizadoQuery = "UPDATE Hospitalizado SET ObservacionesNutricionista = ? WHERE TRIM(CONCAT(RutHospitalizado, '-', DvHospitalizado)) = ?";

        db.query(updateHospitalizadoQuery, [Observaciones, RutHospitalizado], (error, results, fields) => {
          if (error) {
            return res.render('errorView',{ error: 'Error al actualizar las Observaciones '+ error });
          }

          return res.redirect(`/${nombreCarpeta}?mensaje=Observaciones modificadas`);
      });
    });
  },
  listarhistorial: async (req, res) => {

    let rut = req.query.rut;

    const query = `
    SELECT 	CodigoCama,
    TRIM(CONCAT(RutHospitalizado,'-',DvHospitalizado)) AS Rut,
    NombreHospitalizado,
    DATE_FORMAT(FechaIngreso, "%d-%m-%Y") AS FechaIngreso,
    ObservacionesNutricionista,
    DATE_FORMAT(FechaAlta, "%d-%m-%Y") AS FechaAlta,
    TR.DescTipoRegimen AS TipoRegimen,
    TS.DescTipoServicio as TipoServicio
    FROM AntecedentesHospitalizado H
    INNER JOIN TipoRegimen TR ON (H.IdTipoRegimen = TR.IdTipoRegimen)
    INNER JOIN TipoServicio TS ON (H.IdTipoServicio = TS.IdTipoServicio)
    WHERE TRIM(CONCAT(RutHospitalizado,'-',DvHospitalizado)) = ?
`;
    db.query(query, [rut], (error, hospitalizados) => {
      if (error) {
        res.status(500).json({ error: 'Error al cargar los hospitalizados' });
      } else {
        res.status(200).json(hospitalizados);
      }
    });
  }
};

function getRedirectPath(idTipoFuncionario) {
  switch (idTipoFuncionario) {
    case 1:
      return "/Nutricionista";
    case 2:
      return "/NutricionistaJefe";
    case 3:
      return "/Tecnico";
    case 4:
      return "/Clinico";
    case 5:
      return "/Recursos";
    case 6:
      return "/Recaudacion";
    default:
      return "/";
  }
}

module.exports = HospitalizadoController;
