import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserService } from "../../service/Auth/CreateUserService"

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { fullName, email, password } = request.body as {fullName: string, email: string, password: string}
  
    if(!fullName || !email || !password) {
      reply.status(400).send({ message: "All fields are required"})
    }

    try {
      const createUserService = new CreateUserService()
      const user = await createUserService.execute({ fullName, email, password })

      reply.send(user);
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message})
    }
  }

}
export { CreateUserController }