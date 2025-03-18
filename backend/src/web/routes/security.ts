import {FastifyRequest, FastifyReply} from "fastify";

export class Security {
	async initialize(schemes: any) {
		// schemes will contain securitySchemes as found in the openapi specification
		// console.log("Initialize:", JSON.stringify(schemes));
	}

	jwt(req: FastifyRequest, reply: FastifyReply, params: any) {
		// If validation fails: throw new Error('Could not authenticate request')
		// Else, simply return.

		// The request object can also be mutated here (e.g. to set 'req.user')

    return req.jwtVerify()
	}
}