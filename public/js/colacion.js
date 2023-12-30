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