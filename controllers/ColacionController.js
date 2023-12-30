const db = require("../database/database.js");

const ColacionController = {
    mostrarDashboard: (req, res) => {
        if (req.session && req.session.user) {
            // Accede a los datos almacenados en la sesión
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;

            res.render("dashboardView", {
                username: username,
                IdTipoFuncionario: IdTipoFuncionario,
                NombreCompleto: NombreCompleto
            });
        } else {
            res.redirect("/");
        }
    },
    mostrarFormColacion: (req, res) => {
        const { rut, username, IdTipoFuncionario, NombreCompleto } = req.session.user;
        const redirectPath = getRedirectPath(IdTipoFuncionario);

        const fechaSolicitud = new Date();
        const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
        const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
        const anio = fechaSolicitud.getFullYear();

        const fechaFormateada = `${anio}-${mes}-${dia}`; // Obtener la fecha actual
        // Supongo que "rut" y "fechaFormateada" deben obtenerse de alguna manera en tu código

        const checkQuery = "SELECT COUNT(*) AS count FROM Colacion WHERE RutSolicitante = ? AND FechaSolicitud = ?";
        db.query(checkQuery, [rut, fechaFormateada], (error, result) => {
            if (error) {
                // Manejo del error, por ejemplo, enviar una respuesta de error al cliente
                return res.status(500).json({ error: 'Error en la consulta de validación.' });
            } else {
                const count = result[0].count;
                res.render('elegirColacionView', {
                    username: username,
                    RutaTipoFuncionario: redirectPath,
                    NombreCompleto: NombreCompleto,
                    deshabilitado: count > 0
                });
            }
        });
    },
    //Agregar Colación por tipo de regimen.
    agregarColacion: (req, res) => {
        const { regimen } = req.body;
        const { rut } = req.session.user;
        const fechaSolicitud = new Date();
        const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
        const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
        const anio = fechaSolicitud.getFullYear();

        const fechaFormateada = `${anio}-${mes}-${dia}`; // Obtener la fecha actual

        // Verificar si ya existe un registro para el mismo Rut y la misma Fecha
        const checkQuery = "SELECT COUNT(*) AS count FROM Colacion WHERE RutSolicitante = ? AND FechaSolicitud = ?";
        db.query(checkQuery, [rut, fechaFormateada], (error, result) => {
            if (error) {
                // Manejo del error, por ejemplo, enviar una respuesta de error al cliente
                return res.status(500).json({ error: 'Error en la consulta de validación.' });
            } else {
                const count = result[0].count;

                if (count > 0) {
                    // Ya existe un registro para el mismo Rut y la misma Fecha
                    return res.status(400).json({ error: 'Ya existe un registro para el mismo Rut en la misma fecha.' });
                } else {
                    // Si no hay registros existentes, puedes proceder con la inserción
                    const insertQuery = "INSERT INTO Colacion (RutSolicitante,IdTipoRegimen,FechaSolicitud) VALUES (?,?,?)";
                    db.query(insertQuery, [rut, regimen, fechaFormateada], (error, result) => {
                        if (error) {
                            // Manejo del error, por ejemplo, enviar una respuesta de error al cliente
                            return res.status(500).json({ error: 'Error en la inserción de datos.' + error.message });
                        } else {
                            // Éxito en la inserción
                            return res.status(200).json({ message: 'Registro de colación agregado exitosamente.' });
                        }
                    });
                }
            }
        });
    },
    confirmarColacion: (req, res) => { },
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