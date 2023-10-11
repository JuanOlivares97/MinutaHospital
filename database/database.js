const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'lowedev.cl',
    user: 'clo87134_UserHospital',
    password: '-#hfEU8*3*#G',
    database: 'clo87134_Hospital'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conexión a la base de datos exitosa como ID ' + connection.threadId);
  });

module.exports = connection