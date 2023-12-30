const listaFuncionarios = document.getElementById("listarfuncionarios");
const grid = new gridjs.Grid({
    columns: [
        "Rut",
        "Nombre",
        "Fecha Contrato",
        "Fecha Termino",
        "Correo",
        "Servicio",
        "Unidad",
        "Regimen",
        "Contrato",
        "Funcionario",
        "Estamento",
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
        }
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
        search: {
            placeholder: "🔍 11111111-1",
        },
        pagination: {
            previous: "⬅️",
            next: "➡️",
            showing: "😃 Mostrando",
            results: () => "Pacientes",
        },
    },
    pagination: {
        limit: 10,
        summary: true,
    },
    server: {
        url: `http://localhost:3000/NutricionistaJefe/listar-funcionario`,
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
