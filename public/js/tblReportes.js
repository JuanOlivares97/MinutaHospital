document.addEventListener('DOMContentLoaded', function () {
    const tablareportes = document.getElementById('tbl-reportes');

    // Crea la tabla inicial
    const grid = new gridjs.Grid({
        columns: [
            
        ],
        sort: true,
        fixedHeader: true,
        style: {
            table: {
                "font-size": "15x",
                "width":"80%",
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
                'showing': ' Mostrando',
                'results': () => 'Pacientes'
            }
        },
        pagination: {
            limit: 10,
            summary: true
        },
        server: {
            url: ``,
            then: (data) => data.map((row) => [

            ]),
            handle: (res) => {
                if (res.status === 404) return { data: [] };
                if (res.ok) return res.json();
                throw Error("oh no :(");
            },
        },
    }).render(tablareportes);
});