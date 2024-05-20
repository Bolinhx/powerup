const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRouter = require('./routes/usuarios');
const agendarTreinamentoRouter = require('./routes/agendarTreinamento');
const statusTreinamentoRouter = require('./routes/statusTreinamento');
const feedbackMentorRouter = require('./routes/feedbackMentor');
const mentoriaRouter = require('./routes/mentoria');
const statusMentoriaRouter = require('./routes/statusMentoria');
const mentorRouter = require('./routes/mentor');

const app = express();

const corsOptions = {
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos específicos
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos específicos
  optionsSuccessStatus: 204 // Para compatibilidade com navegadores mais antigos
};


// Configuração do middleware CORS para permitir todas as origens
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace to the console
    res.status(500).send('Something went wrong!'); // Send a generic error response to the client
});

// Configuração das rotas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/agendar_treinamento', agendarTreinamentoRouter);
app.use('/api/status_treinamento', statusTreinamentoRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/feedback_mentor', feedbackMentorRouter);
app.use('/api/mentoria', mentoriaRouter);
app.use('/api/status_mentoria', statusMentoriaRouter);

const PORT = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;