const db = require("../../database/database.js");
const path = require("path");
const nombreCarpeta = path.basename(__dirname);

const mantenedorController = {
    mostrarVistaMantenedores: (req, res) => {
        if (req.session && req.session.user) {
            // Accede a los datos almacenados en la sesión
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;

            res.render(`${nombreCarpeta}/mantenedorView`, {
                username: username,
                IdTipoFuncionario: IdTipoFuncionario,
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
                return res.status(500).json({ error: error });
            }

            // Obtener el nuevo idtiporegimen sumando 1 al máximo actual
            const newIdTipoVia = results[0].maxId + 1;

            const query = "INSERT INTO `TipoVia`(IdTipoVia,DescTipoVia) VALUES (?,UPPER(?))";

            db.query(query, [newIdTipoVia, TipoVia], (error, results, fields) => {
                if (error) {
                    return res.status(500).json({ error: error });
                }

                return res.redirect(`/${nombreCarpeta}/mantenedores`);
            });
        });
    },
    agregarTipoContrato: (req, res) => {
        const { TipoContrato } = req.body;
        const query = "INSERT INTO `TipoContrato`(`TipoContrato`) VALUES (UPPER(?))";

        db.query(query, [TipoContrato], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    agregarTipoEstamento: (req, res) => {
        const { DescTipoEstamento } = req.body;
        const query = "INSERT INTO `TipoEstamento`(`DescTipoEstamento`) VALUES (UPPER(?))";

        db.query(query, [DescTipoEstamento], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    agregarTipoRegimen: (req, res) => {
        const { DescTipoRegimen } = req.body;

        // Obtener el valor máximo actual de idtiporegimen
        const getMaxIdQuery = "SELECT MAX(IdTipoRegimen) as maxId FROM TipoRegimen";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
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
                        return res.status(500).json({ error: error });
                    }

                    return res.redirect(`${nombreCarpeta}/mantenedores`);
                }
            );
        });
    },
    agregarTipoServicio: (req, res) => {
        const { DescTipoServicio } = req.body;

        const getMaxIdQuery = "SELECT MAX(IdTipoServicio) as maxId FROM TipoServicio";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            const newIdTipoServicio = results[0].maxId + 1;

            const query = "INSERT INTO `TipoServicio`(IdTipoServicio,DescTipoServicio) VALUES (?,UPPER(?))";

            db.query(query, [newIdTipoServicio, DescTipoServicio], (error, results, fields) => {
                if (error) {
                    return res.status(500).json({ error: error });
                }

                return res.redirect(`${nombreCarpeta}/mantenedores`);
            });
        });
    },
    agregarTipoUnidad: (req, res) => {
        const { DescTipoUnidad } = req.body;

        const getMaxIdQuery = "SELECT MAX(IdTipoUnidad) as maxId FROM TipoUnidad";

        db.query(getMaxIdQuery, (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            const newIdTipoUnidad = results[0].maxId + 1;
            const query = "INSERT INTO `TipoUnidad`(IdTipoUnidad,DescTipoUnidad) VALUES (?,UPPER(?))";

            db.query(query, [newIdTipoUnidad, DescTipoUnidad], (error, results, fields) => {
                if (error) {
                    return res.status(500).json({ error: error });
                }

                return res.redirect(`${nombreCarpeta}/mantenedores`);
            });
        });
    },
    agregarTipoFuncionario: (req, res) => {
        const { TipoPerfil } = req.body;
        const query = "INSERT INTO `TipoFuncionario`(`TipoPerfil`) VALUES (UPPER(?))";

        db.query(query, [TipoPerfil], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoVia: (req, res) => {
        const { IdTipoVia, NuevoDescTipoVia } = req.body;
        const query = "UPDATE `TipoVia` SET DescTipoVia = UPPER(?) WHERE IdTipoVia = ?";

        db.query(query, [NuevoDescTipoVia, IdTipoVia], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoContrato: (req, res) => {
        const { IdTipoContrato, NuevoTipoContrato } = req.body;
        const query = "UPDATE `TipoContrato` SET TipoContrato = ? WHERE IdTipoContrato = ?";

        db.query(query, [NuevoTipoContrato, IdTipoContrato], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoEstamento: (req, res) => {
        const { IdTipoEstamento, NuevoDescTipoEstamento } = req.body;
        const query = "UPDATE `TipoEstamento` SET DescTipoEstamento = ? WHERE IdTipoEstamento = ?";

        db.query(query, [NuevoDescTipoEstamento, IdTipoEstamento], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoRegimen: (req, res) => {
        const { IdTipoRegimen, NuevoDescTipoRegimen } = req.body;
        const query = "UPDATE `TipoRegimen` SET DescTipoRegimen = ? WHERE IdTipoRegimen = ?";

        db.query(query, [NuevoDescTipoRegimen, IdTipoRegimen], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoServicio: (req, res) => {
        const { IdTipoServicio, NuevoDescTipoServicio } = req.body;
        const query = "UPDATE `TipoServicio` SET DescTipoServicio = ? WHERE IdTipoServicio = ?";

        db.query(query, [NuevoDescTipoServicio, IdTipoServicio], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoUnidad: (req, res) => {
        const { IdTipoUnidad, NuevoDescTipoUnidad } = req.body;
        const query = "UPDATE `TipoUnidad` SET DescTipoUnidad = ? WHERE IdTipoUnidad = ?";

        db.query(query, [NuevoDescTipoUnidad, IdTipoUnidad], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
    editarTipoFuncionario: (req, res) => {
        const { IdTipoPerfil, NuevoTipoPerfil } = req.body;
        const query = "UPDATE `TipoFuncionario` SET TipoPerfil = ? WHERE IdTipoPerfil = ?";

        db.query(query, [NuevoTipoPerfil, IdTipoPerfil], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: error });
            }

            return res.redirect(`${nombreCarpeta}/mantenedores`);
        });
    },
};

module.exports = mantenedorController;
