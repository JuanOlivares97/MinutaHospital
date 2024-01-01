const db = require("../../database/database.js");
const path = require('path');
const nombreCarpeta = path.basename(__dirname);


const mantenedorController = {
    mostrarVistaMantenedores: (req,res) =>{
        res.render(`${nombreCarpeta}/mantenedorView`)
    },
    // Los listar estan en el archivo apiController, estos son utilizados por GridJs
    agregarTipoVia: (req, res) => {
        const { IdTipoVia, TipoVia } = req.body;

        const query = "INSERT INTO `TipoVia`(`IdTipoVia`, `DescTipoVia`) VALUES (?,?)";

        db.query(query, [IdTipoVia, TipoVia], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
    },
    agregarTipoContrato: (req, res) => {
        const { IdTipoContrato, TipoContrato } = req.body;

        const query = "INSERT INTO `TipoContrato`(`IdTipoContrato`, `TipoContrato`) VALUES (?,?)";

        db.query(query, [IdTipoContrato, TipoContrato], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
     },
    agregarTipoEstamento: (req, res) => {
        const { IdTipoEstamento, DescTipoEstamento } = req.body;

        const query = "INSERT INTO `TipoEstamento`(`IdTipoEstamento`, `DescTipoEstamento`) VALUES (?,?)";

        db.query(query, [IdTipoEstamento, DescTipoEstamento], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
     },
    agregarTipoRegimen: (req, res) => {
        const { IdTipoRegimen, DescTipoRegimen } = req.body;

        const query = "INSERT INTO `TipoRegimen`(`IdTipoRegimen`, `DescTipoRegimen`, `Habilitado`) VALUES (?,?,'S')";

        db.query(query, [IdTipoRegimen, DescTipoRegimen], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
     },
    agregarTipoServicio: (req, res) => {
        const { IdTipoServicio, DescTipoServicio } = req.body;

        const query = "INSERT INTO `TipoServicio`(`IdTipoServicio`, `DescTipoServicio`, `Habilitado`) VALUES (?,?,'S')";

        db.query(query, [IdTipoServicio, DescTipoServicio], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
     },
    agregarTipoUnidad: (req, res) => {
        const { IdTipoUnidad, DescTipoUnidad } = req.body;

        const query = "INSERT INTO `TipoUnidad`(`IdTipoUnidad`, `DescTipoUnidad`, `Habilitado`) VALUES (?,?,'S')";

        db.query(query, [IdTipoUnidad, DescTipoUnidad], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
     },
    agregarTipoFuncionario: (req, res) => {
        const { IdTipoUnidad, DescTipoUnidad } = req.body;

        const query = "INSERT INTO `TipoFuncionario`(`IdTipoFuncionario`, `TipoPerfil`) VALUES ('[value?,?)";

        db.query(query, [IdTipoUnidad, DescTipoUnidad], (error, results, fields) => {
            if (error) {
                console.log("No Agregado")
                //res.status(500).json({ error: 'Error al cargar los hospitalizados' });
            } else {
                console.log("Agregado")
                //res.status(200).json(hospitalizados);
            }
        })
     },
    actualizarTipoVia: (req, res) => { },
    actualizarTipoContrato: (req, res) => { },
    actualizarTipoEstamento: (req, res) => { },
    actualizarTipoRegimen: (req, res) => { },
    actualizarTipoServicio: (req, res) => { },
    actualizarTipoUnidad: (req, res) => { },
    actualizarTipoFuncionario: (req, res) => { },
}

module.exports = mantenedorController