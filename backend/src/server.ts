import fastify from "fastify";

const app = fastify({ logger: true })

const start = async () => {

    app.get('/backend', async (request, replay)  => {
        replay.status(200).send({message: 'Olá backend rodando' })
    })

    app.listen({ port : 8000}), () => {
        console.log('Oservidor está rodando!')
    }
}

start();