const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

  // Validate that all variables exist
  if (toggle && nav && bodypd && headerpd) {
    // Añadir un elemento de imagen al inicio de la barra de navegación
    const logoImg = document.createElement('img');
    logoImg.src = '/resources/img/logopequeno-hospital.png'; // Reemplaza 'ruta_del_logo.png' con la ruta real de tu logo
    logoImg.alt = 'Logo'; // Agrega un texto alternativo para accesibilidad
    nav.insertBefore(logoImg, nav.firstChild);

    toggle.addEventListener('click', () => {
      // show navbar
      nav.classList.toggle('show');
      // change icon
      toggle.classList.toggle('bx-x');
      // add padding to body
      bodypd.classList.toggle('body-pd');
      // add padding to header
      headerpd.classList.toggle('body-pd');
    });
  }
}

showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');
