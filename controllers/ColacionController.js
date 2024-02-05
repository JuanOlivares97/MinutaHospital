const db = require("../database/database.js");

const ColacionController = {
  mostrarFormColacion: (req, res) => {
    const { rut, username, IdTipoFuncionario, NombreCompleto } =
      req.session.user;
    const redirectPath = getRedirectPath(IdTipoFuncionario);

    const fechaSolicitud = new Date();
    const dia = fechaSolicitud.getDate().toString().padStart(2, "0");
    const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, "0"); // Se suma 1 porque los meses van de 0 a 11
    const anio = fechaSolicitud.getFullYear();

    const fechaFormateada = `${anio}-${mes}-${dia}`; // Obtener la fecha actual

    const checkQuery =
      "SELECT COUNT(*) AS count FROM Colacion WHERE RutSolicitante = ? AND FechaSolicitud = ?";
    db.query(checkQuery, [rut, fechaFormateada], (error, result) => {
      if (error) {
        return res.render("errorView", {
          mensaje: "Error en la consulta de validación.",
        });
      } else {
        const count = result[0].count;
        res.render("elegirColacionView", {
          username: username,
          RutaTipoFuncionario: redirectPath,
          NombreCompleto: NombreCompleto,
          deshabilitado: count > 0,
        });
      }
    });
  },
  //Agregar Colación por tipo de regimen.
  agregarColacion: (req, res) => {
    const { regimen } = req.body;
    const { rut, IdTipoFuncionario } = req.session.user;
    const redirectPath = getRedirectPath(IdTipoFuncionario);
    const fechaSolicitud = new Date();
    const dia = fechaSolicitud.getDate().toString().padStart(2, "0");
    const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, "0"); // Se suma 1 porque los meses van de 0 a 11
    const anio = fechaSolicitud.getFullYear();

    const fechaFormateada = `${anio}-${mes}-${dia}`; // Obtener la fecha actual

    // Verificar si ya existe un registro para el mismo Rut y la misma Fecha
    const checkQuery =
      "SELECT COUNT(*) AS count FROM Colacion WHERE RutSolicitante = ? AND FechaSolicitud = ?";
    db.query(checkQuery, [rut, fechaFormateada], (error, result) => {
      if (error) {
        // Manejo del error, por ejemplo, enviar una respuesta de error al cliente
        return res
          .status(500)
          .json({ error: "Error en la consulta de validación." });
      } else {
        const count = result[0].count;

        if (count > 0) {
          // Ya existe un registro para el mismo Rut y la misma Fecha
          return res.render("errorView", {
            mensaje:
              "Ya existe un registro para el mismo Rut en la misma fecha.",
          });
        } else {
          // Si no hay registros existentes, puedes proceder con la inserción
          const insertQuery =
            "INSERT INTO Colacion (RutSolicitante,IdTipoRegimen,FechaSolicitud) VALUES (?,?,?)";
          db.query(
            insertQuery,
            [rut, regimen, fechaFormateada],
            (error, result) => {
              if (error) {
                // Manejo del error, por ejemplo, enviar una respuesta de error al cliente
                return res.render("errorView", {
                  mensaje: "Error en la inserción de datos." + error.message,
                });
              } else {
                // Éxito en la inserción
                return res.redirect(redirectPath);
              }
            }
          );
        }
      }
    });
  },
  confirmarColacion: (req, res) => {
    if (req.session && req.session.user) {
      const { rut, IdTipoFuncionario } = req.session.user;
      const redirectPath = getRedirectPath(IdTipoFuncionario);
      const sql =
        "SELECT COUNT(*) AS count FROM Colacion WHERE RutSolicitante = ? AND FechaSolicitud = CURRENT_DATE AND Retirado = 1";

      db.query(sql, [rut], (error, result) => {
        if (error) {
          console.error(error);
          return res.render("errorView", {
            mensaje: "Error en la base de datos",
          });
        }

        const count = result[0].count;
        if (count === 0) {
          return res.render("confirmarColacion");
        }

        return res.redirect(redirectPath);
      });
    } else {
      res.redirect("/");
    }
  },
  actualizarEstadoColacion: (req, res) => {
    const { rutField } = req.body;
    const { IdTipoFuncionario } = req.session.user;
    const redirectPath = getRedirectPath(IdTipoFuncionario);

    const query =
      "UPDATE `Colacion` SET `Retirado` = 1 WHERE `RutSolicitante` = ? AND FechaSolicitud = CURRENT_DATE";

    db.query(query, [rutField], (error, result) => {
      if (error) {
        return res.render("errorView", {
          mensaje: "No se ha podido confirmar su colación estimado/a.",
        });
      } else if (result.affectedRows > 0) {
        res.redirect(redirectPath);
      } else {
        return res.render("errorView", {
          mensaje: "No se ha podido confirmar su colación estimado/a.",
        });
      }
    });
  },
  ventaColacion: (req, res) => {
    try {
      res.render("puntoventa");
    } catch (error) {
      console.error(error);
      res.render("errorView", {
        mensaje: "Error al mostrar la vista de punto de venta.",
      });
    }
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

module.exports = ColacionController;
