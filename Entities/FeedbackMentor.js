class FeedbackMentor{
    constructor(id, id_mentor, id_usuario, mensagem) {
        this.id = id;
        this.id_mentor = id_mentor;
        this.id_usuario = id_usuario;
        this.mensagem = mensagem;
    }
}

module.exports = FeedbackMentor;