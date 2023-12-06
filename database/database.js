const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'supercharly.cl',
    user: 'supercha_hospital',
    password: 'hospital123',
    database: 'supercha_hospital'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conexión a la base de datos exitosa como ID ' + connection.threadId);
  });

module.exports = connection