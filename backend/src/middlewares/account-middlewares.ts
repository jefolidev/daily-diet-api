import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { authConfig } from "../configs/auth";
import { getFirstMatchedEmail } from "../services/account-services";

interface TokenPayload {
  role: string,
  sub: string
}

export const accountMiddlewares = {
  checkIfEmailExists: async (request: FastifyRequest<{ Body: { email: string } }>, response: FastifyReply) => {
    const { email } = request.body

    const userExists = await getFirstMatchedEmail(email)

    if (userExists) {
      return response.status(400).send({ message: "Email já registrado!" })
    }
  },

  ensureAuthenticaded: (request: FastifyRequest, response: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      response.status(401).send("JWT token not informed")
      throw new Error("JWT token not informed")
    }

    const [, token] = authHeader.split(" ")

    const { secret } = authConfig.jwt

    if (!secret || !token) {
      response.status(500).send("JWT secret is not defined");
      throw new Error("JWT secret is not defined");
    }

    const { sub: user_id, role } = verify(token, secret) as TokenPayload

    request.user = {
      id: String(user_id),
      role
    }

    done()
    // return response.status(201).send("Authenticated!")
  }
}