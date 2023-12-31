var tipocontrato = document.getElementById('TipoContrato');
var tipofuncionario = document.getElementById('TipoFuncionario');
var tipoestamento = document.getElementById('TipoEstamento');
var tiposervicio = document.getElementById('TipoServicio');
var tipounidad = document.getElementById('TipoUnidad');
var tiporegimen = document.getElementById('TipoRegimen');

function ConsumirApi(TipoApi, IdKey, DescripcionKey, selectElement) {
    fetch('http://localhost:3000/api/listar-' + TipoApi)
        .then(response => response.json())
        .then(data => {
            // Clear existing options
            selectElement.innerHTML = '';

            // Iterar sobre los datos de la API y agregar opciones al select
            data.forEach(Tipo => {
                var option = document.createElement('option');
                option.value = Tipo[IdKey]; // Asigna el valor según tu estructura de datos
                option.textContent = Tipo[DescripcionKey]; // Asigna el texto según tu estructura de datos
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
}

ConsumirApi('tipocontrato', 'IdTipoContrato', 'TipoContrato', tipocontrato);
ConsumirApi('tipofuncionario', 'IdTipoFuncionario', 'TipoPerfil', tipofuncionario);
ConsumirApi('tipoestamento', 'IdTipoEstamento', 'DescTipoEstamento', tipoestamento);
ConsumirApi('tiposervicio', 'IdTipoServicio', 'DescTipoServicio', tiposervicio);
ConsumirApi('tipounidad', 'IdTipoUnidad', 'DescTipoUnidad', tipounidad);
ConsumirApi('tiporegimen', 'IdTipoRegimen', 'DescTipoRegimen', tiporegimen);

