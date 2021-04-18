const request = require('supertest');
const express = require('express');
//const app = require('../index');

const routes = require('../routes/alunoRota');
const Authroutes = require('../routes/authRota');
const connectDB = require('../infra/database');

/*
const bd = () => new Promise((resolve, reject) => {
    resolve(connectDB());
});


bd()
    .then(resp => {
        console.log(`Sucesso: Banco de dados`);

        const app = express();

        app.use(express.json());
        app.use(cors());
        app.use('/auth', Authroutes);
        app.use('/aluno', routes);

        //PORT variavel usada heroku
        app.listen(process.env.PORT || 3333, () => {
            console.log("Server running");
        });




    })
    .catch(err => console.log(err));


//fazer requisicao do token
describe('Teste 0 - Fazer o post para pedir token', () => {
    it("POST - autenticação", async () => {
        const response = await request(app)
            .post("/")
            .send({
                "senha": "123",
                "email": "h1@gmail.com"
            })
            .expect(200);
        expect(response.body).toMatchObject({
            "auth": "true",
            "message": "OK"
        });
        const token = esponse.body.token;
        console.log(token);
    });
});

//nome que descreve o meu teste
//acao que vou fazer do teste
describe("Teste 1 - Criar novo estudante", () => {
    it("POST - teste metodo POST estudante", async () => {
        //chamada da API no metodo POST
        const response = await request(app)
            .post("/")
            .send({
                "name": "Anastacia",
                "email": "anastacia@gmail.com"
            })
            .expect(200);
        expect(response.body).toMatchObject({
            "newStudent": {
                "name": "Anastacia",
                "email": "anastacia@gmail.com"
            }
        });
    });
});


describe("Teste 2 - deletar um estudante que não existe", () => {
    it("DELETE - estudante 123 que não existe", async () => {
        await request(app).delete('/123')
            .expect(404);
    });
});


describe("Teste 3 - atualização de um estudante", () => {
    //2 passos cadastrar um estudante e depois eu vou atualizar ele
    it("POST e PUT - teste metodo atualizar estudante", async () => {
        //chamada da API no metodo POST
        const response = await request(app)
            .post("/")
            .send({
                "name": "Humberto",
                "email": "h1@gmail.com"
            })
            .expect(200);
        expect(isUuid(response.body.newStudent.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newStudent": {
                "name": "Humberto",
                "email": "h1@gmail.com"
            }
        });
        //atualizar esse aluno

        const responseUpd = await request(app)
            .put(`/${response.body.newStudent.id}`)
            .send({
                "name": "Humberto Gustavo de Melo",
                "email": "h1@gmail.com"
            })
            .expect(200);
        expect(responseUpd.body).toMatchObject({
            "name": "Humberto Gustavo de Melo",
            "email": "h1@gmail.com"
        });
    });
});


afterAll(done => {
    // app.close();
    done();
});
*/