document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const mensaje = params.get('mensaje');

    if (mensaje) {
        alert(mensaje);
    }
});