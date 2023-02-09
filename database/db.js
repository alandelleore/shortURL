const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(process.env.URI)
    .then(() => console.log('DB conectanda 😍'))
    .catch(e => console.log('Fallo la conexion' + e))