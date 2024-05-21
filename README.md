
# powerup
PowerUp é uma API REST desenvolvida para gerir o banco da aplicação "Compart" , todas as rotas, com seus endpoits e descrições estão documentadas aqui:

[Documentação API](https://documenter.getpostman.com/view/35066383/2sA3QngYjE#6f2f0699-ca5d-4532-a60f-a69ee31166bf)

## Tecnologias Utilizadas
Node.js<br>
Express<br>
Azure MySQL<br>
Azure App Services (CI/CD)

## Caso queira rodar ela localmente
Clone o repositorio
rode no terminal "npm install"
configure o banco em config/db.js com as chaves de acesso que estão no arquivo que recebeu por email do CAMP
em seguida de o comando "npm start"
Ela vai estar rodando na porta 3000

## Modelo de Entidade Relacional
O diagrama foi criado usando o DBdiagram, para facilitar a exportação para o SQLClient(Dbaver)
![powerup_ioasys (4)](https://github.com/Bolinhx/powerup/assets/143739215/f3e87d92-5f2a-44ec-9a6a-bc126dc75521)

## Melhorias Futuras
A fim de facilitar os testes e o desenvolvimento junto do Front e Mobile e conseguirmos entregar tudo dentro do nosso escopo inicial, todas as colunas do banco estão sem restrição para INSERT ou CREATE. Para uma proxima etapa seria implementado as regras de campo.

## Sugestões, Criticas, Elogios
Estou aberto para receber o seu feedback.
Não exite em me contactar: 
oibolinhx@gmail.com


