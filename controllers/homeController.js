const Url = require('../models/Url')
const { nanoid } = require('nanoid');

const leerUrls = async(req, res) => {
    try {
        const urls = await Url.find().lean() // lean : JS tradicional
        res.render('home', {urls: urls}); 
    } catch (error) {
        console.log(error)
        res.send('fallo algo')
    }
}

const agregarUrl = async(req, res) => {

    const {origin} = req.body

    try {
        const url = new Url({origin: origin, shortURL: nanoid(6)})
        await url.save()
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.send('error algo fallo')
    }
}

const eliminarUrl = async (req, res) => {
    const {id} = req.params;
    res.redirect("/")
    try {
        await Url.findByIdAndDelete(id)
    } catch (error) {
       console.log(error)
       res.send('error algo fallo')
    }
}

const editarUrlForm = async (req, res) => {
    const {id} = req.params
    try {
        const url = await Url.findById(id).lean();
        res.render('home', {url})  
        console.log(url)

    } catch (error) {
        console.log(error)
        res.send("error algo")
    }
}

const editarUrl = async (req, res) => {
    const {id} = req.params;
    const {origin} = req.body;
    try {
        await Url.findByIdAndUpdate(id, {origin: origin})
        res.redirect('/')

    } catch (error) {
        console.log(error)
        res.send("error algo paso")
    }
}

const redireccionamiento = async (req, res) => {
    const {shortUrl} = req.params;
    try {
       const urlDB = await Url.findOne({shortURL: shortUrl})
       res.redirect(urlDB.origin)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl, 
    redireccionamiento
}