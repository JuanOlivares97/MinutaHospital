const db = require("../../database/database.js");
const path = require("path");
const nombreCarpeta = path.basename(__dirname);

const mantenedorController = {
    mostrarVistaMantenedores: (req, res) => {
        if (req.session && req.session.user) {
            // Accede a los datos almacenados en la sesión
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;

            const TipoFuncionario = getRedirectPath(IdTipoFuncionario)

            res.render(`${nombreCarpeta}/mantenedorView`, {
                username: username,
                TipoFuncionario: TipoFuncionario,
                NombreCompleto: NombreCompleto,
            });
        } else {
            res.redirect("/");
        }
    },
    // Los listar estan en el archivo apiController, estos son utilizados por GridJs
    agregarTipoVia: (req, res) => {
        const { TipoVia } = req.body;

        const getMaxIdQuery = "SELECT MAX(IdTipoVia) as maxId FROM TipoVia";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            // Obtener el nuevo idtiporegimen sumando 1 al máximo actual
            const newIdTipoVia = results[0].maxId + 1;

            const query = "INSERT INTO `TipoVia`(IdTipoVia,DescTipoVia) VALUES (?,UPPER(?))";

            db.query(query, [newIdTipoVia, TipoVia], (error, results, fields) => {
                if (error) {
                    return res.render('errorView',{ mensaje: error });
                }

                return res.redirect(`/${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
            });
        });
    },
    agregarTipoContrato: (req, res) => {
        const { TipoContrato } = req.body;
        const query = "INSERT INTO `TipoContrato`(`TipoContrato`) VALUES (UPPER(?))";

        db.query(query, [TipoContrato], (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
        });
    },
    agregarTipoEstamento: (req, res) => {
        const { DescTipoEstamento } = req.body;
        const query = "INSERT INTO `TipoEstamento`(`DescTipoEstamento`) VALUES (UPPER(?))";

        db.query(query, [DescTipoEstamento], (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
        });
    },
    agregarTipoRegimen: (req, res) => {
        const { DescTipoRegimen } = req.body;

        // Obtener el valor máximo actual de idtiporegimen
        const getMaxIdQuery = "SELECT MAX(IdTipoRegimen) as maxId FROM TipoRegimen";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            // Obtener el nuevo idtiporegimen sumando 1 al máximo actual
            const newIdTipoRegimen = results[0].maxId + 1;

            // Query para insertar el nuevo registro con el nuevo idtiporegimen
            const insertQuery =
                "INSERT INTO TipoRegimen(IdTipoRegimen, DescTipoRegimen) VALUES (?, UPPER(?))";

            db.query(
                insertQuery,
                [newIdTipoRegimen, DescTipoRegimen],
                (error, results, fields) => {
                    if (error) {
                        return res.render('errorView',{ mensaje: error });
                    }

                    return res.redirect(`${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
                }
            );
        });
    },
    agregarTipoServicio: (req, res) => {
        const { DescTipoServicio } = req.body;

        const getMaxIdQuery = "SELECT MAX(IdTipoServicio) as maxId FROM TipoServicio";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            const newIdTipoServicio = results[0].maxId + 1;

            const query = "INSERT INTO `TipoServicio`(IdTipoServicio,DescTipoServicio) VALUES (?,UPPER(?))";

            db.query(query, [newIdTipoServicio, DescTipoServicio], (error, results, fields) => {
                if (error) {
                    return res.render('errorView',{ mensaje: error });
                }

                return res.redirect(`${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
            });
        });
    },
    agregarTipoUnidad: (req, res) => {
        const { DescTipoUnidad } = req.body;

        const getMaxIdQuery = "SELECT MAX(IdTipoUnidad) as maxId FROM TipoUnidad";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            const newIdTipoUnidad = results[0].maxId + 1;
            const query = "INSERT INTO `TipoUnidad`(IdTipoUnidad,DescTipoUnidad) VALUES (?,UPPER(?))";

            db.query(query, [newIdTipoUnidad, DescTipoUnidad], (error, results, fields) => {
                if (error) {
                    return res.render('errorView',{ mensaje: error });
                }

                return res.redirect(`${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
            });
        });
    },
    agregarTipoFuncionario: (req, res) => {
        const { TipoPerfil } = req.body;
        const query = "INSERT INTO `TipoFuncionario`(`TipoPerfil`) VALUES (UPPER(?))";

        db.query(query, [TipoPerfil], (error, results, fields) => {
            if (error) {
                return res.render('errorView',{ mensaje: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores?mensaje=Registro Agregado`);
        });
    },
    editarMantenedores: (req, res) => {
        const { tabla, columna, nuevoDato, nombreIdentificador, Identificador } = req.body;
    
        // Verifica que los valores necesarios estén presentes
        if (!tabla || !columna || !nuevoDato || !nombreIdentificador || !Identificador) {
            return res.render('errorView', { mensaje: 'Faltan parámetros obligatorios.' });
        }
    
        // Evita la interpolación directa de los valores en la consulta SQL para prevenir SQL injection
        const query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        const values = [tabla, columna, nuevoDato, nombreIdentificador, Identificador];
    
        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error al ejecutar la consulta SQL:", err);
                return res.render('errorView', { mensaje: 'Error interno del servidor.' });
            }
    
            // Verifica si se actualizó correctamente
            if (result.affectedRows === 1) {
                // Puedes agregar un mensaje de éxito y redirigir
                return res.redirect(`/${nombreCarpeta}/mantenedores?mensaje=Registro actualizado`);
            } else {
                return res.render('errorView', { mensaje: 'Registro no encontrado.' });
            }
        });
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

module.exports = mantenedorController;
