/*

mport express from 'express';

const app = express();
const port = 3131;

app.use(express.json());

app.get('/pessoal/:id', (req, res) => {
    
    const pessoas = [
    { id: 1, nome: "Ana", idade: 25 },
    { id: 2, nome: "Bruno", idade: 30 },
    { id: 3, nome: "Carla", idade: 22 },
    { id: 4, nome: "Diego", idade: 28 },
    { id: 5, nome: "Eduarda", idade: 26 },
    { id: 6, nome: "Felipe", idade: 33 },
    { id: 7, nome: "Giovana", idade: 24 },
    { id: 8, nome: "Henrique", idade: 27 },
    { id: 9, nome: "Isabela", idade: 29 },
    { id: 10, nome: "João", idade: 31 }
  ];

    const { id } = req.params;
    const pessoa = pessoas.find(p => p.id === Number(id));
    console.log(pessoa);
  
    return res.status(200).send(`${pessoa.nome} vc tem ${pessoa.idade} `);

})

app.get(req,res)  => {
    return res.status(200).send({
        message: 'todos os livros'
    })
}



app.post('/nome/:idade', (req, res) => { //nome vai ser no corpo e idade no parametro
    const { nome } = req.body;
    const { idade } = req.params;

    const idadeMin = 18;
    const maiorDeIdade =  idade >= idadeMin;
    
    return res.status(200).json(maiorDeIdade)
    if (parseInt(idade) >= idadeMin) {
        return res.status(200).send(`${nome} autorizado a entrar no Medevassa`);
    } else {
        return res.status(400).send(`${nome} não autorizado a entrar no Medevassa`);
    }
});
  
app.get('/', (req, res) => {
    return res.status(200).send({
        usuario: 'bernardo' //req.query , req.params
    });
})

app.listen('3131', (e) => {
    if (e) {
        return console.log(e);
    } else {
        console.log(`api rodando na http://localhsot:3131`);
    }
})

*/