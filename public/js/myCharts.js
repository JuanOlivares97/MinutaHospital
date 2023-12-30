// public/myCharts.js

document.addEventListener('DOMContentLoaded', function () {
  // Datos para el primer gráfico
  const data1 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configuración del primer gráfico
  const config1 = {
    type: 'pie',
    data: data1,
  };

  // Datos para el segundo gráfico
  const data2 = {
    labels: ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [8, 15, 6, 10, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configuración del segundo gráfico
  const config2 = {
    type: 'pie',
    data: data2,
  };
   // Datos para el segundo gráfico
   const data3 = {
    labels: ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [8, 15, 6, 10, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configuración del segundo gráfico
  const config3 = {
    type: 'bar',
    data: data3,
  };
  
  
  // Obtén el contexto de los canvas
  const ctx1 = document.getElementById('myChart1').getContext('2d');
  const ctx2 = document.getElementById('myChart2').getContext('2d');
  const ctx3 = document.getElementById('myChart3').getContext('2d');

  // Crea instancias de Chart.js y dibuja los gráficos
  new Chart(ctx1, config1);
  new Chart(ctx2, config2);
  new Chart(ctx3, config3);
});
