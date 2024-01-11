const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const db = require("../../database/database.js");

const FuncionariosController = {
  mostrarPaginaFuncionarios: (req, res) => {
    if (req.session && req.session.user) {
      // Accede a los datos almacenados en la sesión
      const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;
      const redirectPath = getRedirectPath(IdTipoFuncionario);

      res.render(`${nombreCarpeta}/funcionarioView`, {
        username: username,
        TipoFuncionario: redirectPath,
        NombreCompleto: NombreCompleto,
      });
    } else {
      res.redirect("/");
    }

  },
  listarFuncionarios: (req, res) => {
    const query = `
        SELECT 
            TRIM(CONCAT(RutFuncionario, "-", DvFuncionario)) as Rut,
            (NombreFuncionario) , 
            DATE_FORMAT(FechaInicioContrato, "%d-%m-%Y") as FechaContrato,
            COALESCE(DATE_FORMAT(FechaTerminoContrato, "%d-%m-%Y"), 'INDEFINIDO') as FechaTermino,
            correo as "CorreoElectronico",
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
  agregarFuncionarios: (req, res) => {
    const {
      RutSinDv,
      dvFuncionario,
      NombreCompletoFuncionario,
      FechaInicioContrato,
      FechaTermino,
      CorreoElectronico,
      TipoContrato,
      TipoFuncionario,
      TipoEstamento,
      TipoServicio,
      TipoUnidad,
      TipoRegimen,
    } = req.body;
    let contrasena = RutSinDv;
    const fechaTermino = FechaTermino !== '' ? FechaTermino : null;
    // Realiza una consulta SQL para agregar un hospitalizado
    const query =
      "INSERT INTO Funcionario (RutFuncionario, DvFuncionario, NombreFuncionario, FechaInicioContrato, FechaTerminoContrato, Habilitado, contrasena, correo, IdTipoContrato, IdTipoFuncionario, IdTipoEstamento, IdTipoServicio, IdTipoUnidad, IdTipoRegimen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        RutSinDv,
        dvFuncionario,
        NombreCompletoFuncionario,
        FechaInicioContrato,
        fechaTermino,
        "S",
        contrasena,
        CorreoElectronico,
        TipoContrato,
        TipoFuncionario,
        TipoEstamento,
        TipoServicio,
        TipoUnidad,
        TipoRegimen,
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        return res.redirect(`/${nombreCarpeta}/funcionarios?mensaje=Operación realizada con éxito`);
      }
    );
  },
  actualizarFuncionarios: (req, res) => {
    const {
      Rut,
      NombreCompletoFuncionario,
      CorreoElectronico,
      TipoContrato,
      TipoFuncionario,
      TipoEstamento,
      TipoServicio,
      TipoUnidad,
      TipoRegimen,
    } = req.body;

    const FechaTermino = req.body.FechaTermino || null;

    const query =
      `UPDATE Funcionario SET 
    NombreFuncionario = ?,
    FechaTerminoContrato = ?, 
    correo = ?,
    IdTipoContrato = ?,
    IdTipoFuncionario = ?, 
    IdTipoEstamento = ?, 
    IdTipoServicio = ?, 
    IdTipoUnidad = ?,
    IdTipoRegimen = ? 
    WHERE TRIM(CONCAT(RutFuncionario, "-", DvFuncionario)) = ?`;

    db.query(
      query,
      [
        NombreCompletoFuncionario,
        FechaTermino,
        CorreoElectronico,
        TipoContrato,
        TipoFuncionario,
        TipoEstamento,
        TipoServicio,
        TipoUnidad,
        TipoRegimen,
        Rut
      ],
      (error, results, fields) => {
        if (error) {
          console.log(req.body)
          return res.render('errorView', { mensaje: error });
        }

        return res.redirect(`/${nombreCarpeta}/funcionarios?mensaje=Operación realizada con éxito`);
      }
    );
  },
  deshabilitarFuncionarios: (req, res) => {
    const { Rut } = req.body;

    const query = "UPDATE Funcionario SET Habilitado = 'N' WHERE TRIM(CONCAT(RutFuncionario, ' - ', DvFuncionario)) = ?";

    db.query(query, [Rut], (error, results, fields) => {
      if (error) {
        console.log(req.body)
        return res.render('errorView', { mensaje: error });
      }

      return res.redirect(`/${nombreCarpeta}/funcionarios?mensaje=Usuario Deshabilitado`);
    }
    )
  },
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

module.exports = FuncionariosController;
