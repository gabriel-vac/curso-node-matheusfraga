const express = require('express');

const server = express();

//poder receber JSON no Body
server.use(express.json());

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend'}

const cursos = ['Node JS', 'Javascript', 'React Native'];

//Middleware Global (Será cahmado independente da rota)
server.use((req, res, next) => {
    console.log('REQUISIÇÃO CHAMADA');
    return next(); //Dou o next para não ficar preso nessa requisição
});

function checkCurso(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Nome do curso é obrigatório' });
    }

    return next();
}

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index]
    if (!curso) {
        return res.status(404).json({error: 'Registro não encontrado'})
    }

    //criando uma variavel curso dentro da requisição
    req.curso = curso;

    return next();
}

server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

// localhost:3000/curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    //acessar query params
    // const nome = req.query.nome;
    // //acessar route params
    // const id = req.params.id;
    // return res.json({ curso: `Aprendendo ${nome}`, id: id });

    return res.json(req.curso); //req.curso é a variavel que criei dentro de req (objeto de requisição) no middleware checkIndexCurso
});

server.post('/cursos', checkCurso, (req, res) => {
    //Declarar a constante dessa forma, faz pegar o valor do campo "name" diretamente do JSON de envio.

    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    //Constante declarada dessa forma pegar automaticamente o parâmetro equivalente, se fosse declarada apenas "const index" teria que atribuir "req.params.index"

    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);
    return res.json({ message: 'Curso deletado com sucesso', index: index });
});

server.listen(3000);
