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

                <button><a class="editarServicio" id="agregar" href="#" data-toggle="modal" data-target="#modalEditarServicioHospitalizado" data-rut="${row.cells[1].data}">Cambiar Servicio</a></button>
                <button><a class="editarAlta" id="agregar" href="#" data-toggle="modal" data-target="#modalEditarAltaHospitalizado" data-rut="${row.cells[1].data}">Dar Alta</a></button>
                <button><a class="" id="agregar" href="#" data-toggle="modal" data-target="#" data-rut="${row.cells[1].data}">Logs</a></button>`)
            },
            "Ayuno"
        ],
        sort: true,
        fixedHeader: true,
        style: {
            table: {
                "font-size": "15px",
            },
        },
        search: true,
        language: {
            'search': {
                'placeholder': '🔍 11111111-1'
            },
            'pagination': {
                'previous': '⬅️',
                'next': '➡️',
                'showing': '😃 Mostrando',
                'results': () => 'Pacientes'
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
