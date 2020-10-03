const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacao = require('./util/cotacao');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações',
        author: 'Adriano'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Adriano Henrique'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Adriano Henrique'
    });
});

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        return res.status(400).json({
            error: {
                message: 'O ativo deve ser informado',
                code: 400
            }
        });
    }

    const symbol = req.query.ativo.toUpperCase();
    cotacao(symbol, (err,data) => {
        if (err) {
            return res.status(err.code).json({
                error :{
                    message: 'O ativo deve ser informado',
                    code: err.code
            }});
        }
        res.status(200).json(data);
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Pagina não encontrada'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up ${PORT}`);
})