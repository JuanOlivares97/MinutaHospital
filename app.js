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
const NutricionistaRoutes = require("./routes/NutricionistaRoutes.js")
const ClinicoRoutes = require("./routes/ClinicoRoutes.js")
const RecaudadorRoutes = require("./routes/RecaudadorRoutes.js")
const RecursosRoutes = require("./routes/RecursosRoutes.js")
const TecnicoRoutes = require("./routes/TecnicoRoutes.js")
const FuncionarioRoutes = require("./routes/FuncionarioRoutes.js")

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
app.set('views', ['views',
                 'views/Clinico',
                  'views/Nutricionista',
                  'views/NutricionistaJefe',
                  'views/Recaudacion',
                  'views/Recursos',
                  'views/Tecnico']);
                  
app.use(express.json());

app.use('/', LoginRoutes);
app.use('/NutricionistaJefe', NutricionistaJefeRoutes);
app.use('/Nutricionista', NutricionistaRoutes);
app.use('/Clinico', ClinicoRoutes);
app.use('/Recaudacion', RecaudadorRoutes);
app.use('/Recursos', RecursosRoutes);
app.use('/Tecnico',TecnicoRoutes);
app.use('/Funcionario',FuncionarioRoutes)
app.use('/api', apiRoutes)

app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});