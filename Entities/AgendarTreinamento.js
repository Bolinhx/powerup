class AgendarTreinamento {
    constructor(id, id_usuario, tipo, area, titulo, descricao, data, duracao, link_reuniao, link_gravacao, id_status_treinamento) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.tipo = tipo;
        this.area = area;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.duracao = duracao;
        this.link_reuniao = link_reuniao;
        this.link_gravacao = link_gravacao;
        this.id_status_treinamento = id_status_treinamento;
    }
}

module.exports = AgendarTreinamento;