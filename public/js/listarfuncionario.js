const listaFuncionarios = document.getElementById("listarfuncionarios");
const grid = new gridjs.Grid({
    columns: [
        {
            name: "Rut",
            width: "auto"
        },
        { name: "Nombre"},
        { name: "Fecha Contrato" },
        { name: "Fecha Termino" },
        { name: "Correo", width: "155px"  },
        { name: "Servicio", width: "155px" },
        { name: "Unidad" },
        { name: "Regimen" },
        { name: "Contrato" },
        { name: "Funcionario" },
        { name: "Estamento" },
        {
            name: "Opciones",
            formatter: (cell, row) => gridjs.html(`
                    <button
                    class="editarFuncionacio"
                    style="width:50%; margin:5px;"
                    data-Rut="${row.cells[0].data}"
                    data-NombreCompletoFuncionario="${row.cells[1].data}"
                    data-FechaTermino="${row.cells[3].data}"
                    data-CorreoElectronico="${row.cells[4].data}"
                    data-bs-toggle="modal"
                    data-bs-target="#editarFuncionario"
                    ><i class='bx bx-edit'></i></button>
        
                    <form action="/NutricionistaJefe/deshabilitar-funcionario" method="post">
            <input type="hidden" name="Rut" value="${row.cells[0].data}">
            <button style="width:50%; margin:5px;">
                <i class='bx bx-trash'></i>
            </button>
        </form>
        
                  `)
        }
    ],
    sort: true,
    fixedHeader: true,
    style: {
        table: {
            "font-size": "15px",
        },
        th: {
            'background-color': '#EEA561',
            color: '#000',
            'border-bottom': '3px solid #ccc',
            'text-align': 'center',
            'padding': '0px',
        },
        td: {
            'text-align': 'center',
            'align-items': 'center',
            'padding': 0,
        }
    },
    search: true,
    language: {
        search: {
            placeholder: "11111111-1 🔍",
        },
        'pagination': {
            'previous': '←',
            'next': "→",
            "to": "a",
            "of": "de",
            'showing': 'Mostrando',
            results: () => "Pacientes",
        },
    },
    pagination: {
        limit: 10,
        summary: true,
    },
    server: {
        url: `/NutricionistaJefe/listar-funcionario`,
        then: (data) =>
            data.map((funcionario) => [
                funcionario.Rut,
                funcionario.NombreFuncionario,
                funcionario.FechaContrato,
                funcionario.FechaTermino,
                funcionario.CorreoElectronico,
                funcionario.TipoServicio,
                funcionario.TipoUnidad,
                funcionario.TipoRegimen,
                funcionario.TipoContrato,
                funcionario.TipoFuncionario,
                funcionario.TipoEstamento,
            ]),
        handle: (res) => {
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();
            throw Error("oh no :(");
        },
    },
}).render(listaFuncionarios);

