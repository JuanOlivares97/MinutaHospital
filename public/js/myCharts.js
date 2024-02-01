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
