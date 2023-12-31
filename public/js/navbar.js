document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  // Cambia la imagen del logo cuando se carga la página y al cambiar el tamaño de la ventana
  window.onload = function() {
    cambiarImagen(); // Cambia la imagen cuando se carga la página
    window.addEventListener('resize', cambiarImagen); // Cambia la imagen al cambiar el tamaño de la ventana
  };

  function cambiarImagen() {
    var logo = document.getElementById('logo');
    var screenWidth = window.innerWidth;

    // Cambia la imagen del logo según el ancho de la pantalla
    if (screenWidth <= 68) {
      logo.src = '/resources/img/logogrande-hospital.png';
    } else {
      logo.src = '/resources/img/logopequeno-hospital.png';
    }
  }
});