new gridjs.Grid({
    columns: [
        "CodigoCama",
        "Rut",
        "NombreHospitalizado",
        "FechaNacimiento",
        "FechaIngreso",
        "ObservacionesNutricionista",
        "FechaAlta",
        "IndicacionesAlta",
        "ServicioAlta",
        "CodigoCamaAlta",
        "TipoServicio",
        "TipoUnidad",
        "TipoVia",
    ],
    style: {
        table: {
            "font-size": "15px",
        },
    },
    search: true,
    server: {
        url: "http://localhost:3000/NutricionistaJefe/listar-hospitalizado",
        then: (data) =>
            data.map((hospitalizado) => [
                hospitalizado.CodigoCama,
                hospitalizado.Rut,
                hospitalizado.NombreHospitalizado,
                hospitalizado.FechaNacimiento,
                hospitalizado.FechaIngreso,
                hospitalizado.ObservacionesNutricionista,
                hospitalizado.FechaAlta,
                hospitalizado.IndicacionesAlta,
                hospitalizado.ServicioAlta,
                hospitalizado.CodigoCamaAlta,
                hospitalizado.TipoServicio,
                hospitalizado.TipoUnidad,
                hospitalizado.TipoVia,
            ]),
        handle: (res) => {
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error("oh no :(");
        },
    },
}).render(document.getElementById("listaHospitalizados"));
