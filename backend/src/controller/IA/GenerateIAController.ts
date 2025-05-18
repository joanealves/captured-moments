import { FastifyReply, FastifyRequest } from "fastify"
import axios from "axios"

class GenerateIAController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { text } = request.body as { text: string }
    
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      console.error("ERRO: Variável OPENROUTER_API_KEY não definida!");
      return reply.status(500).send({ message: "Erro de configuração do servidor" });
    }

    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        "model": "anthropic/claude-3-haiku-20240307",
        "messages": [
          {
            "role": "user",
            "content": `Eu desejo que você melhore a seguinte frase e acrescente mais detalhes de uma forma resumida: "${text}".
            Eu não quero que em sua resposta contenha mais nenhuma outra palavra além da frase que você melhorou.
            Nem uma apresentação do tipo: "aqui está a frase que você solicitou", ou algo do tipo...
            Eu quero uma resposta direta. Somente a resposta final. Nada a mais!`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://seu-site.com',
          'X-Title': 'Captured Moments App'
        }
      });
      
      const aiResponse = response.data.choices[0].message.content;
      
      reply.send(aiResponse);
    } catch (error) {
      console.error("Erro ao chamar OpenRouter:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      reply.status(500).send({ message: "Erro ao processar sua solicitação" });
    }
  }
}

export { GenerateIAController }