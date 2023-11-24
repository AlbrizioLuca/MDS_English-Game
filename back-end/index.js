const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: '172.23.144.1' || 'localhost',
    user: 'streamopoly',
    password: 'secret',
    database: 'boite-a-quizz'
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes pour récupérer les questions et réponses
app.get('/questions', (req, res) => {
    db.query('SELECT * FROM questions', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Route pour récupérer une question par son ID
app.get('/question/:id', (req, res) => {
    const questionId = req.params.id;
    db.query('SELECT * FROM questions WHERE id = ?', questionId, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Route pour ajouter une question
app.post('/question', (req, res) => {
    const { content, responses, solution } = req.body;
    const newQuestion = { content, responses, solution };
    db.query('INSERT INTO questions SET ?', newQuestion, (err, result) => {
        if (err) throw err;
        res.send('Question ajoutée à la base de données');
    });
});

// Route pour mettre à jour une question par son ID
app.put('/question/:id', (req, res) => {
    const questionId = req.params.id;
    const { content, responses, solution } = req.body;
    const updatedQuestion = { content, responses, solution };
    db.query('UPDATE questions SET ? WHERE id = ?', [updatedQuestion, questionId], (err, result) => {
        if (err) throw err;
        res.send('Question mise à jour avec succès');
    });
});

// Route pour supprimer une question par son ID
app.delete('/question/:id', (req, res) => {
    const questionId = req.params.id;
    db.query('DELETE FROM questions WHERE id = ?', questionId, (err, result) => {
        if (err) throw err;
        res.send('Question supprimée avec succès');
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});