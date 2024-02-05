const db = require('../../database/database.js');
const path = require('path');
const nombreCarpeta = path.basename(__dirname);

const VentasController = {
    mostrarVistaVentas: (req, res) => {
        if (req.session && req.session.user) {
            const { username, IdTipoFuncionario, NombreCompleto } = req.session.user;

            const TipoFuncionario = getRedirectPath(IdTipoFuncionario)

            res.render(`${nombreCarpeta}/puntoventa`, {
                username: username,
                TipoFuncionario: TipoFuncionario,
                NombreCompleto: NombreCompleto,
            });
        } else {
            res.redirect("/");
        }
    },
    agregarVenta: (req, res) => {
        const fechaSolicitud = new Date();
        const dia = fechaSolicitud.getDate().toString().padStart(2, '0');
        const mes = (fechaSolicitud.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
        const anio = fechaSolicitud.getFullYear();
        const fechaFormateada = `${anio}-${mes}-${dia}`;

        const { Rut, Productos, Total } = req.body;
        console.log((req.body))

        if (!Rut || !Productos || !Total) {
            return res.status(400).json({ error: 'Faltan datos obligatorios ' + Rut + " " + Productos + " " + Total });
        }
        const productosJSON = JSON.stringify(Productos);

        const query = "INSERT INTO `ventas`(`Fecha_Venta`, `Rut`, `Productos`, `Total`) VALUES (?, ?, ?, ?)";
        db.query(query, [fechaFormateada, Rut, productosJSON, Total], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: 'Error ' + error });
            }
            res.status(200).json({ message: 'Venta agregada correctamente' });
        });
    },
    listarVentas: (req, res) => {
        const { fechaInicio, fechaFin } = req.query;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Se requieren fechas de inicio y fin.' });
        }

        const query = `SELECT 
        DATE_FORMAT(Fecha_Venta, '%d-%m-%Y') as Fecha_Venta,
        Rut,
        REPLACE(REPLACE(REPLACE(JSON_UNQUOTE(JSON_EXTRACT(Productos, '$[*].nombre')),']',''), '[', ''),'"','') AS nombre_producto,
        Total 
        FROM ventas 
        WHERE Fecha_Venta BETWEEN ? AND ?`;

        db.query(query, [fechaInicio, fechaFin], (error, results, fields) => {
            if (error) {
                return res.status(500).json({ error: 'Error ' + error });
            }
            res.status(200).json({ ventas: results });
        });
    },
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

module.exports = VentasController