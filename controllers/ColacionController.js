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
    //Agregar Colación por tipo de regimen.
    agregarColacion: (req, res) => {
        const { regimen } =   req.body;
        const { username } = req.session.user;
        //res.render("dashboard", { titulo: "Dashboard" });
    },
    confirmarColacion: (req, res) => {
        
        //res.render("dashboard", { titulo: "Dashboard" });
    },
};


module.exports = ColacionController; 