import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { GetUserController } from "./controller/Auth/GetUserController";
import { authenticateToken } from "./middleware/authenticateToken";
import { AddMomentsController } from "./controller/Moments/AddMomentsController";
import { GetAllMomentsController } from "./controller/Moments/GetAllMomentsController";
import { SearchMomentsController } from "./controller/Moments/SearchMomentsController";
import { UpdateMomentsController } from "./controller/Moments/UpdateMomentsController";
import { GenerateIAController } from "./controller/IA/GenerateIAController";
import { upload } from "./config/multer";
import { UploadFileController } from "./controller/Upload/UploadFileController";
import { DeleteFileController } from "./controller/Upload/DeleteFileController";
import { DeleteMomentsController } from "./controller/Moments/DeleteMomentsController";
import { UpdateIsFavoriteMomentsController } from "./controller/Moments/UpdateIsFavoriteMomentsController";
import { DateFilterMomentsController } from "./controller/Moments/DateFilterMomentsController";

export function routes(fastify: FastifyInstance) {
  fastify.post('/create-account', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply)
  })

  fastify.get('/get-user', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetUserController().handle(request, reply)
  })



  fastify.post('/add-registered-moment', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddMomentsController().handle(request, reply)
  })

  fastify.get('/get-all-moments', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetAllMomentsController().handle(request, reply)
  })

  fastify.get('/search', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SearchMomentsController().handle(request, reply)
  })

  fastify.put('/edit-moments/:id', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateMomentsController().handle(request, reply)
  })

  fastify.delete('/delete-moment/:id', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteMomentsController().handle(request, reply)
  })

  fastify.put('/update-is-favorite/:id', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new  UpdateIsFavoriteMomentsController().handle(request, reply)
  })

  fastify.get('/registered-moment/filter', { preHandler: authenticateToken}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new  DateFilterMomentsController().handle(request, reply)
  })



  fastify.post('/ia', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GenerateIAController().handle(request, reply)
  })



  fastify.post('/image-upload', {preHandler: upload.single("image")}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UploadFileController().handle(request, reply)
  })

  fastify.delete('/delete-upload', {preHandler: upload.single("image")}, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteFileController().handle(request, reply)
  })
}
