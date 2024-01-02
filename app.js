const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://supercharly.cl'
};
app.use(cors(corsOptions));


const LoginRoutes = require('./routes/LoginRoutes.js')
const NutricionistaJefeRoutes = require("./routes/NutricionistaJefeRoutes.js")
const apiRoutes = require('./routes/apiRoutes.js')

app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'))
app.set("view engine", "ejs");

app.use('/', LoginRoutes);
app.use('/NutricionistaJefe', NutricionistaJefeRoutes);
//app.use('/Nutricionista', NutricionistaRoutes);
//app.use('/Clinico', ClinicoRoutes);
//app.use('/Recaudador', RecaudadorRoutes);
//app.use('/Recursos', RecursosRoutes);
//app.use('/Tecnico',TecnicoRoutes);
app.use('/api', apiRoutes)

app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});