import { FastifyReply, FastifyRequest } from "fastify";
import { SimpleData } from "../../types";

interface UserJwt {
  user: string;
}

export class Services {
  constructor() { }
  private sharedData: string = `Hello world`;

  async doLogin(req: FastifyRequest, res: FastifyReply) {
    const body: { username: string, password: string } = req.body! as any;
    console.log(req);

    if (body.username === `admin` && body.password === `admin`) {
      const token = await res.jwtSign({ user: body.username });

      return {
        token
      }

    } else {
      res.code(401);
      return {
        error: `Invalid username or password`
      }
    }
  }

  async getData(input: FastifyRequest) {
    return {
      someData: this.sharedData,
    } satisfies SimpleData
  }

  async setData(input: FastifyRequest) {
    let body = input.body! as SimpleData;

    this.sharedData = body.someData;
    
    return body;
  }
}

