const db = require('../../database/database.js');
const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const reportesController = {
    mostrarViewReportes: (req, res) => {
        const setLanguageQuery = `SET lc_time_names = 'es_ES';`;


        if (req.session && req.session.user) {
            // Accede a los datos almacenados en la sesión
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;

            const TipoFuncionario = getRedirectPath(IdTipoFuncionario)

            db.query(setLanguageQuery, (errorSetLanguage) => {
                if (errorSetLanguage) {
                    console.log(errorSetLanguage);
                    return res.status(500).send('Error al configurar el idioma.');
                }

                const query = `SELECT TU.DescTipoUnidad, RacionesFuncionarios, RacionesHospitalizados, RacionesLactantes, 
                    Anio, UPPER(MONTHNAME(CURRENT_DATE())) AS Mes
            FROM Reportes R
            INNER JOIN TipoUnidad TU ON R.IdTipoUnidad = TU.IdTipoUnidad
            WHERE Anio = YEAR(CURRENT_DATE()) AND Mes = MONTH(CURRENT_DATE());`;

                const info = {
                    anio: null,
                    mes: null
                };

                db.query(query, (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Error al obtener información.');
                    }

                    if (result.length > 0) {
                        info.anio = result[0].Anio;
                        info.mes = result[0].Mes;
                    }

                    // Almacena la información en la sesión
                    req.session.info = info;
                    req.session.detalles = result;



                    res.render(`${nombreCarpeta}/reportesView`, {
                        detalles: result,
                        info: info,
                        NombreCompleto: NombreCompleto,
                        TipoFuncionario: TipoFuncionario
                    });
                });
            });
        } else {
            res.redirect("/");
        }
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

module.exports = reportesController;