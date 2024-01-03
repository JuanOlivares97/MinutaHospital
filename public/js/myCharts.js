// public/myCharts.js

/* document.addEventListener('DOMContentLoaded', function () {
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
}); */

function createChart(apiEndpoint, htmlElementId, labels, values, chartType) {
  const ctx = document.getElementById(htmlElementId).getContext('2d');

  // Realizar la solicitud a la API
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // Extraer los datos necesarios para el gráfico
      const apiLabels = data.map(item => item[labels]);
      const apiValues = data.map(item => item[values]);

      // Datos para el gráfico
      const chartData = {
        labels: apiLabels,
        datasets: [
          {
            data: apiValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      // Configuración del gráfico
      const chartConfig = {
        type: chartType,
        data: chartData,
      };

      // Crear el gráfico
      new Chart(ctx, chartConfig);
    })
    .catch(error => console.error('Error al cargar los datos desde la API:', error));
}

// Ejemplo de uso
document.addEventListener('DOMContentLoaded', function () {
  createChart('http://localhost:3000/NutricionistaJefe/colacion-funcionarios', 'myChart1', 'DescTipoRegimen', 'cantidad', 'pie');
  createChart('http://localhost:3000/NutricionistaJefe/colacion-hospitalizados', 'myChart2', 'DescTipoRegimen', 'cantidad', 'pie');
});
