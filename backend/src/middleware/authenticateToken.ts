import { FastifyReply, FastifyRequest } from "fastify";
import { AuthUtils } from "../utils/AuthUtils";

export async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return reply.status(401).send({ message: "Token not provided" });
  }

  try {
    const decoded = AuthUtils.verifyAccessToken(token);
    request.user = decoded;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return reply.status(401).send({ message: "Token expired" });
      } else if (error.name === 'JsonWebTokenError') {
        return reply.status(401).send({ message: "Invalid token" });
      } else if (error.message === "ACCESS_TOKEN_SECRET not defined!") {
        console.error("SERVER ERROR: ACCESS_TOKEN_SECRET not defined!");
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
    
    return reply.status(401).send({ message: "Authentication failed" });
  }
}