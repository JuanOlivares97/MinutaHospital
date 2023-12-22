const db = require("../database/database.js");
const FuncionariosController = {
  mostrarPaginaFuncionarios: (req, res) => {
    res.render("hospitalizadoview");
  },
  listarFuncionarios: (req, res) => {
    const query = `
        SELECT 
            CONCAT(RutFuncionario, "-", DvFuncionario) as Rut,
            NombreFuncionario, 
            DATE_FORMAT(FechaInicioContrato, "%d-%m-%Y") as FechaContrato,
            DATE_FORMAT(FechaTerminoContrato, "%d-%m-%Y") as FechaTermino,
            correo as "CorreoElectronico"
            TS.DescTipoServicio as TipoServicio,
            TU.DescTipoUnidad as TipoUnidad,
            TR.DescTipoRegimen as TipoRegimen,
            TC.TipoContrato as TipoContrato,
            TF.TipoPerfil as TipoFuncionario,
            TE.DescTipoEstamento AS TipoEstamento
        FROM Funcionario F
        INNER JOIN TipoEstamento TE ON (F.IdTipoEstamento = TE.IdTipoEstamento)
        INNER JOIN TipoFuncionario TF ON (F.IdTipoFuncionario = TF.IdTipoFuncionario)
        INNER JOIN TipoContrato TC ON (F.IdTipoContrato = TC.IdTipoContrato)
        INNER JOIN TipoServicio TS ON (F.IdTipoServicio = TS.IdTipoServicio)
        INNER JOIN TipoRegimen TR ON (F.IdTipoRegimen = TR.IdTipoRegimen)
        INNER JOIN TipoUnidad TU ON (F.IdTipoUnidad = TU.IdTipoUnidad)
        WHERE F.Habilitado = 'S';`;

    db.query(query, (error, funcionarios) => {
        if (error) {
            res.status(500).json({ error: 'Error al cargar los funcionarios' });
        } else {
            res.status(200).json(funcionarios);
        }
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
