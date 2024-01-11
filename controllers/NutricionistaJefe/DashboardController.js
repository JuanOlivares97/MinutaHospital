const db = require("../../database/database.js");
const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const dashboardController = {
    mostrarDashboard: (req, res) => {
        if (req.session && req.session.user) {
            // Accede a los datos almacenados en la sesión
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;
            const redirectPath = getRedirectPath(IdTipoFuncionario);
            res.render(`${nombreCarpeta}/dashboard`, {
                username: username,
                TipoFuncionario: redirectPath,
                NombreCompleto: NombreCompleto
            });
        } else {
            res.redirect("/");
        }
    },
    colacionFuncionarios: (req, res) => {

        const query = `SELECT count(*) as cantidad, tr.DescTipoRegimen FROM Colacion c inner join TipoRegimen tr on c.IdTipoRegimen = tr.IdTipoRegimen WHERE FechaSolicitud = CURRENT_DATE group by tr.DescTipoRegimen; 
        `

        db.query(query, (error, colacion) => {
            if (error) {
                res.status(500).json({ error: 'Error al cargar las colaciones de los funcionarios' });
            } else {
                res.status(200).json(colacion);
            }
        });
    },
    colacionHospitalizados: (req, res) => {

        const query = `select count(*) as cantidad,tr.DescTipoRegimen from Hospitalizado h inner join TipoRegimen tr on h.IdTipoRegimen = tr.IdTipoRegimen group by tr.DescTipoRegimen; 
        `

        db.query(query, (error, colacion) => {
            if (error) {
                res.status(500).json({ error: 'Error al cargar las colaciones de los pacientes' });
            } else {
                res.status(200).json(colacion);
            }
        });
    }
}
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
module.exports = dashboardController;