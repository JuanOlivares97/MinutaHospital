const db = require("../database/database.js");
const apiController = require("../controllers/apiController.js");
const FuncionariosController = {
  mostrarFuncionarios: (req, res) => {
    res.render('funcionarioView')
},
  listarFuncionarios: (req, res) => {
    db.query("SELECT * FROM Funcionario", function (error, funcionarios) {
        if (error) {
            return res.status(500).json({ error: error });
        }
        res.json(funcionarios);
    });
},
  agregarFuncionarios: async (req, res) => {
    // Recoge los datos del formulario (puedes usar req.body)
    const {
      IdFuncionario,
      RutFuncionario,
      DvFuncionario,
      NombreFuncionario,
      FechaInicioContrato,
      FechaTerminoContrato,
      Habilitado,
      contrasena,
      IdTipoContrato,
      IdTipoFuncionario,
      IdTipoEstamento,
      IdTipoServicio,
      IdTipoUnidad,
      IdTipoRegimen,
    } = req.body; // Asegúrate de que coincidan con los campos del formulario

    // Realiza una consulta SQL para agregar un hospitalizado
    const query =
      "INSERT INTO Funcionario (RutFuncionario, DvFuncionario, NombreFuncionario, FechaInicioContrato, FechaTerminoContrato, Habilitado, contrasena, IdTipoContrato, IdTipoFuncionario, IdTipoEstamento, IdTipoServicio, IdTipoUnidad, IdTipoRegimen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        IdFuncionario,
        RutFuncionario,
        DvFuncionario,
        NombreFuncionario,
        FechaInicioContrato,
        FechaTerminoContrato,
        Habilitado,
        contrasena,
        IdTipoContrato,
        IdTipoFuncionario,
        IdTipoEstamento,
        IdTipoServicio,
        IdTipoUnidad,
        IdTipoRegimen,
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        return res.redirect("/NutricionistaJefe/listar-funcionario");
      }
    );
  },
  actualizarFuncionarios: async (req, res) => {
    const RutHospitalizado = req.params.rut;
    // Realiza una consulta SQL para obtener los datos del hospitalizado a editar
    const query =
      "SELECT * FROM Funcionario WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ?";

    db.query(query, [RutHospitalizado], (error, results, fields) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al obtener el hospitalizado" });
      }
      return res.status(200).json({ Bacan: "hospitalizado actualizado" });
      // Renderiza el formulario de edición con los datos del hospitalizado
      //res.render('formularioEditarHospitalizado', { hospitalizado: results[0] }); // Asegúrate de crear la vista correspondiente
    });
  },
  eliminarFuncionarios: async (req, res) => {
    // Obtén el ID del hospitalizado a eliminar
    const RutFuncionario = req.params.rut;

    // Realiza una consulta SQL para eliminar el hospitalizado
    const query =
      "DELETE FROM `Funcionario` WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ?";

    db.query(query, [RutFuncionario], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      return res.redirect('/NutricionistaJefe/listar-Funcionario'); // Redirige a la lista de Funcionarios
    });
  },
};

module.exports = FuncionariosController;
