document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const mensaje = params.get('mensaje');

    if (mensaje) {
        // Reemplaza esto con el código de configuración de SweetAlert que desees
        Swal.fire({
            title: 'Ha llegado Carta!!!',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'OK',
        });
    }
});
