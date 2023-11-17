document.addEventListener("DOMContentLoaded", function() {
    var botonListarHospitalizados = document.getElementById("listarHospitalizadosBtn");
    var tablaHospitalizados = document.getElementById("tablaHospitalizados");

    botonListarHospitalizados.addEventListener("click", function() {
        fetch('/listar-hospitalizado')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Limpia el contenido actual de la tabla
            while (tablaHospitalizados.rows.length > 1) {
                tablaHospitalizados.deleteRow(1);
            }

            // Itera sobre los datos y agrega filas a la tabla
            data.forEach(function(paciente) {
                var row = tablaHospitalizados.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);
                var cell9 = row.insertCell(8);
                var cell10 = row.insertCell(9);
                var cell11 = row.insertCell(10);
                var cell12 = row.insertCell(11);
                var cell13 = row.insertCell(12);
                var cell14 = row.insertCell(12);
                
                cell1.textContent = paciente.CodigoCama;
                cell2.textContent = paciente.RutHospitalizado;
                cell3.textContent = paciente.DvHospitalizado;
                cell4.textContent = paciente.NombreHospitalizado;
                cell5.textContent = paciente.FechaNacimiento;
                cell6.textContent = paciente.FechaIngreso;
                cell7.textContent = paciente.ObservacionesNutricionista;
                cell8.textContent = paciente.FechaAlta;
                cell9.textContent = paciente.IdIndicacionesAlta;
                cell10.textContent = paciente.ServicioAlta;
                cell11.textContent = paciente.CodigoCamaAlta;
                cell12.textContent = paciente.IdTipoServicio;
                cell13.textContent = paciente.IdTipoUnidad;
                cell14.textContent = paciente.IdTipoVia;
                // Agrega más celdas según tus datos
            });
        })
        .catch(function(error) {
            console.error("Error al listar hospitalizados: " + error);
        });
    });
});