class Usuario{
    constructor(id, nome, area, email, codigo_ativacao, superpoder, flag_mentor_ativo, mentor) {
        this.id = id;
        this.nome = nome;
        this.area = area;
        this.email = email;
        this.codigo_ativacao = codigo_ativacao;
        this.superpoder = superpoder;
        this.flag_mentor_ativo = flag_mentor_ativo;
        this.mentor = mentor;
    }
}

module.exports = Usuario;