var tipoServicioSelect = document.getElementById('tipoServicioSelect');

        // Hacer una solicitud a la API
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