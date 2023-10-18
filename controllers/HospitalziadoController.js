const db = require("../database/database.js");

const HospitalizadoController = {
  ListarHospitalizados: async (req, res) => {
    try {
      // Realiza una consulta SQL para obtener los hospitalizados
      const query = "SELECT * FROM Hospitalizado";

      const results = await new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      });

      res.render("HospitalizadosView", { hospitalizados: results }); // Renderiza la vista 'hospitalizados' con los resultados
    } catch (error) {
      return res.status(500).json({ error: "Error al listar hospitalizados" });
    }
  },
  agregarHospitalizado: async (req, res) => {
    res.render('FormAgregarHospitalizado');
  },
  mostrarFormularioAgregar: async (req, res) => {
    // Recoge los datos del formulario (puedes usar req.body)
    const { 
        CodigoCama, //int
          RutHospitalizado, //int
          DvHospitalizado, //int
          NombreHospitalizado, //string
          FechaNacimiento, //date
          FechaIngreso, //date
          ObservacionesNutricionista, //textbox
          FechaAlta, //date
          IdIndicacionesAlta, //textbox
          ServicioAlta,
          CodigoCamaAlta,
          IdTipoServicio,
          IdTipoUnidad,
          IdTipoVia,
          IdPautaSubjetiva,
          IdPautaObjetiva, } = req.body; // Asegúrate de que coincidan con los campos del formulario

    // Realiza una consulta SQL para agregar un hospitalizado
    const query = "INSERT INTO `Hospitalizado` (`CodigoCama`, `RutHospitalizado`, `DvHospitalizado`, `NombreHospitalizado`, `FechaNacimiento`, `FechaIngreso`, `ObservacionesNutricionista`, `FechaAlta`, `IdIndicacionesAlta`, `ServicioAlta`, `CodigoCamaAlta`, `IdTipoServicio`, `IdTipoUnidad`, `IdTipoVia`, `IdPautaSubjetiva`, `IdPautaObjetiva`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";
    db.query(query, [
        CodigoCama, //int
          RutHospitalizado, //int
          DvHospitalizado, //int
          NombreHospitalizado, //string
          FechaNacimiento, //date
          FechaIngreso, //date
          ObservacionesNutricionista, //textbox
          FechaAlta, //date
          IdIndicacionesAlta, //textbox
          ServicioAlta,
          CodigoCamaAlta,
          IdTipoServicio,
          IdTipoUnidad,
          IdTipoVia,
          IdPautaSubjetiva,
          IdPautaObjetiva], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: 'Error al agregar hospitalizado' });
      }

      return res.redirect('/NutricionistaJefe/listar-hospitalizado'); // Redirige a la lista de hospitalizados
    });
  },
  actualizarHospitalizado: async (req, res) => {
    const hospitalizadoId = req.params.id;
    
    // Realiza una consulta SQL para obtener los datos del hospitalizado a editar
    const query = "SELECT * FROM Hospitalizado WHERE id = ?";
    
    db.query(query, [hospitalizadoId], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener el hospitalizado' });
      }

      // Renderiza el formulario de edición con los datos del hospitalizado
      res.render('formularioEditarHospitalizado', { hospitalizado: results[0] }); // Asegúrate de crear la vista correspondiente
    });
  },
  mostrarFormularioEditar: async (req,res)=>{
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
    const hospitalizadoId = req.params.id;

    // Realiza una consulta SQL para eliminar el hospitalizado
    const query = "DELETE FROM Hospitalizado WHERE IdHospitalizado = ?";
    
    db.query(query, [hospitalizadoId], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: 'Error al eliminar el hospitalizado' });
      }

      return res.redirect('/NutricionistaJefe/listar-hospitalizado'); // Redirige a la lista de hospitalizados
    });
  },
};

module.exports = HospitalizadoController;
