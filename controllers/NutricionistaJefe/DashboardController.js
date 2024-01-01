const db = require("../../database/database.js");
const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const dashboardController = {
    mostrarDashboard: (req, res) => {
        if (req.session && req.session.user) {
            // Accede a los datos almacenados en la sesión
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;

            res.render(`${nombreCarpeta}/dashboard`, {
                username: username,
                IdTipoFuncionario: IdTipoFuncionario,
                NombreCompleto: NombreCompleto
            });
        } else {
            res.redirect("/");
        }
    },
}

module.exports = dashboardController;