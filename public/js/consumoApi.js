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

var tipoServicioS = document.getElementById('tipoServicioS');

// Hacer una solicitud a la API
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

    document.addEventListener("DOMContentLoaded", function () {
        // Elemento donde se mostrarán los botones
        const tiposRegimenList = document.getElementById("tiposRegimenList");
        const tipoRegimenForm = document.getElementById("tipoRegimenForm");
    
        // URL de la API
        const apiUrl = "http://localhost:3000/api/listar-tiporegimen";
    
        // Hacer la solicitud a la API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Crear botones para cada tipo de régimen
                data.forEach(tipoRegimen => {
                    const button = document.createElement("button");
                    button.textContent = tipoRegimen.DescTipoRegimen;
                    button.value = tipoRegimen.IdTipoRegimen;
                    button.addEventListener("click", function () {
                        // Acciones cuando se hace clic en el botón
                        const selectedId = this.value;
    
                        if (selectedId) {
                            const regimenInput = document.getElementById("regimenInput");
                            regimenInput.value = selectedId;    
                            // Envía el formulario después de configurar el valor
                            tipoRegimenForm.submit();
                        } else {
                            console.error("Error: No se ha seleccionado ningún tipo de régimen.");
                        }
                    });
    
                    // Agregar el botón al elemento contenedor
                    tiposRegimenList.appendChild(button);
                });
            })
            .catch(error => {
                console.error("Error al obtener datos de la API:", error);
                // Puedes manejar el error mostrando un mensaje al usuario
            });
    });
    
    
