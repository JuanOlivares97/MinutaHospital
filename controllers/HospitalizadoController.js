const db = require("../database/database.js");

const HospitalizadoController = {
  mostrarPaginaHospitalizados: (req, res) => {
    if (req.session && req.session.user) {
        // Accede a los datos almacenados en la sesión
        const { username, IdTipoFuncionario } = req.session.user;

        res.render("hospitalizadoview", {
            username: username,
            IdTipoFuncionario: IdTipoFuncionario
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
        CONCAT(RutHospitalizado, "-", DvHospitalizado) AS Rut,
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
      ServicioAlta,
      CodigoCamaAlta,
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoVia
    } = req.body;

    // Realiza una consulta SQL para agregar un hospitalizado
    const query = "INSERT INTO `Hospitalizado` (`CodigoCama`, `RutHospitalizado`, `DvHospitalizado`, `NombreHospitalizado`, `FechaNacimiento`, `FechaIngreso`, `ObservacionesNutricionista`, `FechaAlta`, `IndicacionesAlta`, `ServicioAlta`, `CodigoCamaAlta`, `IdTipoServicio`, `IdTipoUnidad`, `IdTipoVia`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";

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
      ServicioAlta,
      CodigoCamaAlta,
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoVia
    ], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }

      return res.redirect('/NutricionistaJefe/listar-hospitalizado');
    });
  },
  actualizarHospitalizado: async (req, res) => {
    const RutHospitalizado = req.params.rut;
    // Realiza una consulta SQL para obtener los datos del hospitalizado a editar
    const query = "SELECT * FROM Hospitalizado WHERE TRIM(CONCAT(`RutHospitalizado`,'-',`DvHospitalizado`)) = ?";

    db.query(query, [RutHospitalizado], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener el hospitalizado' });
      }
      return res.status(200).json({ Bacan: 'hospitalizado actualizado' });
      // Renderiza el formulario de edición con los datos del hospitalizado
      //res.render('formularioEditarHospitalizado', { hospitalizado: results[0] }); // Asegúrate de crear la vista correspondiente
    });
  },
  mostrarFormularioEditar: async (req, res) => {
    // Recoge los datos del formulario (puedes usar req.body)
    const { nombre, edad, diagnostico } = req.body; // Asegúrate de que coincidan con los campos del formulario

    // Obtén el ID del hospitalizado a actualizar
    const hospitalizadoId = req.params.id;

    // Realiza una consulta SQL para actualizar el hospitalizado
    const query = "";

    db.query(query, [nombre, edad, diagnostico, hospitalizadoId], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: 'Error al actualizar el hospitalizado' });
      }

      return res.redirect('/NutricionistaJefe/listar-hospitalizado'); // Redirige a la lista de hospitalizados
    });
  },
  eliminarHospitalizado: async (req, res) => {
    // Obtén el ID del hospitalizado a eliminar
    const RutHospitalizado = req.params.rut;

    // Realiza una consulta SQL para eliminar el hospitalizado
    const query = "DELETE FROM `Hospitalizado` WHERE TRIM(CONCAT(`RutHospitalizado`,'-',`DvHospitalizado`)) = ?";

    db.query(query, [RutHospitalizado], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      return res.status(200).json({ Bacan: 'hospitalizado Eliminado' });
      //return res.redirect('/NutricionistaJefe/listar-hospitalizado'); // Redirige a la lista de hospitalizados
    });
  },
};

module.exports = HospitalizadoController;
