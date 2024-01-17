var tipoServicioSelect = document.getElementById('tipoServicioSelect');
var tipoServicioS = document.getElementById('tipoServicioS');
var cambioServicio = document.getElementById('cambioServicio');
var tipoUnidad = document.getElementById('tipoUnidad');
var tipoVia = document.getElementById('tipovia');
var tiporegimen = document.getElementById('tiporegimen');

fetch('http://localhost:3000/api/listar-tiposervicio')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos de la API y agregar opciones al select
        data.forEach(tipoServicio => {
            var option = document.createElement('option');
            option.value = tipoServicio.IdTipoServicio; // Asigna el valor según tu estructura de datos
            option.textContent = tipoServicio.DescTipoServicio; // Asigna el texto según tu estructura de datos
            cambioServicio.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));

fetch('http://localhost:3000/api/listar-tiposervicio')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos de la API y agregar opciones al select
        data.forEach(tipoServicio => {
            var option = document.createElement('option');
            option.value = tipoServicio.IdTipoServicio; // Asigna el valor según tu estructura de datos
            option.textContent = tipoServicio.DescTipoServicio; // Asigna el texto según tu estructura de datos
            tipoServicioSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));

fetch('http://localhost:3000/api/listar-tiposervicio')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos de la API y agregar opciones al select
        data.forEach(tipoServicio => {
            var option = document.createElement('option');
            option.value = tipoServicio.IdTipoServicio; // Asigna el valor según tu estructura de datos
            option.textContent = tipoServicio.DescTipoServicio; // Asigna el texto según tu estructura de datos
            tipoServicioS.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));


    fetch('http://localhost:3000/api/listar-tipounidad')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos de la API y agregar opciones al select
        data.forEach(TipoUnidad => {
            var option = document.createElement('option');
            option.value = TipoUnidad.IdTipoUnidad; // Asigna el valor según tu estructura de datos
            option.textContent = TipoUnidad.DescTipoUnidad; // Asigna el texto según tu estructura de datos
            tipoUnidad.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));

    fetch('http://localhost:3000/api/listar-tipovia')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos de la API y agregar opciones al select
        data.forEach(TipoVia => {
            var option = document.createElement('option');
            option.value = TipoVia.IdTipoVia // Asigna el valor según tu estructura de datos
            option.textContent = TipoVia.DescTipoVia; // Asigna el texto según tu estructura de datos
            tipoVia.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));


    fetch('http://localhost:3000/api/listar-tiporegimen')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos de la API y agregar opciones al select
        data.forEach(TipoRegimen => {
            var option = document.createElement('option');
            option.value = TipoRegimen.IdTipoRegimen // Asigna el valor según tu estructura de datos
            option.textContent = TipoRegimen.DescTipoRegimen; // Asigna el texto según tu estructura de datos
            tiporegimen.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
    
    
