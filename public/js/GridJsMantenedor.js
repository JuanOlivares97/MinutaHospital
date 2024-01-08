const tipovia = document.getElementById('ListaVia');
const tipocontrato = document.getElementById('ListaContrato');
const tipoestamento = document.getElementById('ListaEstamento');
const tiporegimen = document.getElementById('ListaRegimen');
const tiposervicio = document.getElementById('ListaServicio');
const tipounidad = document.getElementById('ListaUnidad');
const tipofuncionario = document.getElementById('ListaTipoFuncionarios');

function generarGrafico(objecto, titulo1, titulo2, api, columna1, columna2) {
    const grid = new gridjs.Grid({
        columns: [
            titulo1,
            titulo2,
            {
                name: "Opciones",
                formatter: (cell, row) => gridjs.html(`
                <button class="btn btn-secondary btn-lg"  data-toggle="modal" data-target="#modalEditar" data-rut="${row.cells[1].data}">Editar</button>
                `)
            }
        ],
        sort: true,
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
                'previous': "←",
                'next': "→",
                "to": "a",
                "of": "de",
                'showing': 'Mostrando',
                'results': () => 'Resultados'
            }
        },
        pagination: {
            limit: 10
        },
        server: {
            url: 'http://localhost:3000/api/listar-' + api,
            then: (data) => data.map((Tipo) => [
                Tipo[columna1], // Corregir aquí
                Tipo[columna2]  // Corregir aquí
            ]),
            handle: (res) => {
                if (res.status === 404) return { data: [] };
                if (res.ok) return res.json();
                throw Error("oh no :(");
            },
        },
    }).render(objecto);
}


document.addEventListener('DOMContentLoaded', function () {
    generarGrafico(tipovia, '#', "Tipo Via", "tipovia", 'IdTipoVia', 'DescTipoVia')
    generarGrafico(tipocontrato, '#', "Contrato", "tipocontrato", 'IdTipoContrato', 'TipoContrato')
    generarGrafico(tipoestamento, '#', "Estamento", "tipoestamento", 'IdTipoEstamento', 'DescTipoEstamento')
    generarGrafico(tiporegimen, '#', "Regimen", "tiporegimen", 'IdTipoRegimen', 'DescTipoRegimen')
    generarGrafico(tiposervicio, '#', "Servicio", "tiposervicio", 'IdTipoServicio', 'DescTipoServicio')
    generarGrafico(tipounidad, '#', "Unidad", "tipounidad", 'IdTipoUnidad', 'DescTipoUnidad')
    generarGrafico(tipofuncionario, '#', "Tipo Funcionario", "tipofuncionario", 'IdTipoFuncionario', 'TipoPerfil')
});





