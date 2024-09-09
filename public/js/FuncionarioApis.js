var tipocontrato = document.getElementById('TipoContrato');
var tipofuncionario = document.getElementById('TipoFuncionario');
var tipoestamento = document.getElementById('TipoEstamento');
var tiposervicio = document.getElementById('TipoServicio');
var tipounidad = document.getElementById('TipoUnidad');
var tiporegimen = document.getElementById('TipoRegimen');


var tipocontrato1 = document.getElementById('TipoContrato1');
var tipofuncionario1 = document.getElementById('TipoFuncionario1');
var tipoestamento1 = document.getElementById('TipoEstamento1');
var tiposervicio1 = document.getElementById('TipoServicio1');
var tipounidad1 = document.getElementById('TipoUnidad1');
var tiporegimen1 = document.getElementById('TipoRegimen1');



function ConsumirApi(TipoApi, IdKey, DescripcionKey, selectElement) {
    fetch('/api/listar-' + TipoApi)
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

ConsumirApi('tipocontrato', 'IdTipoContrato', 'TipoContrato', tipocontrato1);
ConsumirApi('tipofuncionario', 'IdTipoFuncionario', 'TipoPerfil', tipofuncionario1);
ConsumirApi('tipoestamento', 'IdTipoEstamento', 'DescTipoEstamento', tipoestamento1);
ConsumirApi('tiposervicio', 'IdTipoServicio', 'DescTipoServicio', tiposervicio1);
ConsumirApi('tipounidad', 'IdTipoUnidad', 'DescTipoUnidad', tipounidad1);
ConsumirApi('tiporegimen', 'IdTipoRegimen', 'DescTipoRegimen', tiporegimen1);

