document.addEventListener('DOMContentLoaded', function () {
    const tipoServicioSelect = document.getElementById('tipoServicioSelect');
    const listaHospitalizados = document.getElementById('listaHospitalizados');

    // Crea la tabla inicial
    const grid = new gridjs.Grid({
        columns: [
            "Cama",
            "Rut",
            "Nombre Completo",
            "Edad",
            "Ingreso",
            "Observaciones Nutricionista",
            "Fecha Alta",
            "Regimen",
            {
                name: "Opciones",
                formatter: (cell, row) => gridjs.html(`

                <button><a class="editarServicio" data-toggle="modal" data-target="#modalEditarServicioHospitalizado" data-rut="${row.cells[1].data}">Cambiar Servicio</a></button>
                <button><a class="editarAlta" data-toggle="modal" data-target="#modalEditarAltaHospitalizado" data-rut="${row.cells[1].data}">Dar Alta</a></button>
                <button><a class="verLogs" data-toggle="modal" data-target="#miModal" data-rut="${row.cells[1].data}">Logs</a></button>`)
            },
            "Ayuno"
        ],
        sort: true,
        fixedHeader: true,
        style: {
            table: {
                "font-size": "15x",
            },
            th: {
                'background-color': '#EEA561',
                color: '#000',
                'border-bottom': '3px solid #ccc',
                'text-align': 'center',
                'padding': '5px',
            },
            td: {
                'text-align': 'center',
                'align-items': 'center',
                'padding': '3px',
            }
        },
        search: true,
        language: {
            'search': {
                'placeholder': '🔍 11111111-1'
            },
            'pagination': {
                'previous': '←',
                'next': "→",
                "to": "a",
                "of": "de",
                'showing': 'Mostrando',
                'results': () => 'Resultados'
            }
        },
        pagination: {
            limit: 10,
            summary: true
        },
        server: {
            url: `http://localhost:3000/NutricionistaJefe/listar-hospitalizado?tipoServicio=0`,
            then: (data) => data.map((hospitalizado) => [
                hospitalizado.CodigoCama,
                hospitalizado.Rut,
                hospitalizado.NombreHospitalizado,
                hospitalizado.Edad,
                hospitalizado.FechaIngreso,
                hospitalizado.ObservacionesNutricionista,
                hospitalizado.FechaAlta,
                hospitalizado.TipoRegimen,
                null,
                hospitalizado.Ayuno.data,
            ]),
            handle: (res) => {
                if (res.status === 404) return { data: [] };
                if (res.ok) return res.json();
                throw Error("oh no :(");
            },
        },
    }).render(listaHospitalizados);

    // Agrega un evento change al elemento select
    tipoServicioSelect.addEventListener('change', function () {
        const selectedValue = tipoServicioSelect.value;

        // Actualiza la URL del servidor con el nuevo valor seleccionado
        grid.updateConfig({
            server: {
                url: `http://localhost:3000/NutricionistaJefe/listar-hospitalizado?tipoServicio=${selectedValue}`,
                then: (data) =>
                    data.map((hospitalizado) => [
                        hospitalizado.CodigoCama,
                        hospitalizado.Rut,
                        hospitalizado.NombreHospitalizado,
                        hospitalizado.Edad,
                        hospitalizado.FechaIngreso,
                        hospitalizado.ObservacionesNutricionista,
                        hospitalizado.FechaAlta,
                        hospitalizado.TipoRegimen,
                        null,
                        hospitalizado.Ayuno.data,
                    ])
            },
        });

        // Recarga la tabla
        grid.forceRender();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    $('#miModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Botón que activó el modal
        var rut = button.data('rut'); // Extraer el valor de data-rut del botón

        // Realizar la llamada a la API al abrir el modal
        fetch(`http://localhost:3000/NutricionistaJefe/listar-antecedentes?rut=${rut}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Actualizar el contenido del modal con los datos obtenidos
                var modal = $(this);
                modal.find('#rutEnModal').text('Rut: ' + rut);

                // Crear una tabla para mostrar los resultados
                var tabla = '<table class="table"><thead><tr><th>Código Cama</th><th>Rut</th><th>Nombre Hospitalizado</th><th>Fecha Ingreso</th><th>Observaciones Nutricionista</th><th>Fecha Alta</th><th>Tipo Regimen</th><th>Tipo Servicio</th></tr></thead><tbody>';

                // Agregar filas a la tabla con los resultados de la consulta
                data.forEach(row => {
                    tabla += `<tr><td>${row.CodigoCama}</td><td>${row.Rut}</td><td>${row.NombreHospitalizado}</td><td>${row.FechaIngreso}</td><td>${row.ObservacionesNutricionista}</td><td>${row.FechaAlta}</td><td>${row.TipoRegimen}</td><td>${row.TipoServicio}</td></tr>`;
                });

                tabla += '</tbody></table>';

                // Agregar la tabla al contenido del modal
                modal.find('#datosAntecedentes').html(tabla);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API:', error);
            });
    });
});
