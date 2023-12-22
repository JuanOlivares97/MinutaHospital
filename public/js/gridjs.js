new gridjs.Grid({
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
            <form action="" method="POST">
                    <input type="hidden" name="" value="${row.cells[1].data}" required> 
                    <button style="width:100px; margin:5px;"> Editar </button>
                  </form>
            <form action="" method="POST">
                    <input type="hidden" name="" value="${row.cells[1].data}" required> 
                    <button style="width:100px; margin:5px;">Eliminar</button>
            </form>
                  `)
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
        }
      },
    server: {
        method: 'POST',
        url: "http://localhost:3000/NutricionistaJefe/listar-hospitalizado",
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
            ]),
        handle: (res) => {
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error("oh no :(");
        },
    },
}).render(document.getElementById("listaHospitalizados"));
