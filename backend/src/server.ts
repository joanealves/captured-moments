import app from "./app";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error("ERRO CRÍTICO: Variável de ambiente ACCESS_TOKEN_SECRET não definida!");
  console.error("A aplicação não pode iniciar sem essa variável. Defina-a no arquivo .env");
  process.exit(1);
}

app.get('/backend', async (request, reply) => {
  reply.status(200).send({ message: 'Olá backend rodando' });
});

const start = async () => {
  try {
    await app.listen({ port: 8000, host: '0.0.0.0' });
    console.log('Servidor rodando na porta 8000');
    console.log('Acesse: http://localhost:8000/backend');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();