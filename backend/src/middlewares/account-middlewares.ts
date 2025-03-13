import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { authConfig } from "../configs/auth";
import { findAccountByEmail } from "../services/account-services";
import { Role, rolePermissions, type Rules } from "../utils/rules";

interface TokenPayload {
  role: Role,
  sub: string
}

export const accountMiddlewares = {
  checkIfEmailExists: async (request: FastifyRequest<{ Body: { email: string } }>, response: FastifyReply) => {
    const { email } = request.body

    const userExists = await findAccountByEmail(email)

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
      role: role
    }

    console.log("Middleware de Autenticação: Role recebida: ", role)

    done()
  },

  checkPermissions: (requiredPermissions: Rules[]) => {
    return (request: FastifyRequest, response: FastifyReply, done: DoneFuncWithErrOrRes) => {
      console.log("Cargo do usuário logado: ", request.user?.role)

      console.log("Permissões: ", rolePermissions)
      console.log("Permissões Pedidas: ", requiredPermissions)

      if (!request.user || !request.user?.role) {
        return response.code(401).send("Unauthorized")
      }

      const userPermissions = rolePermissions[request.user.role]

      console.log("Permissões do usuário logado: ", userPermissions)

      const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission))

      if (!hasPermission) {
        return response.status(403).send("Forbidden")
      }
      done()
    }
  }
}