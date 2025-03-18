
import path from "path";

import fastify from 'fastify'
const openapiGlue = import("fastify-openapi-glue");
import fastifyJwt from "@fastify/jwt";
import cors from '@fastify/cors'

import {Services} from "./web/routes/handlers";
import {Security} from "./web/routes/security";

import { randomKey } from "./api/secure";

const server = fastify()

const spec = path.join(__dirname, `..`, `..`, `spec`, `spec.yaml`);

const options = {
  specification: spec,
  serviceHandlers: new Services(),
  securityHandlers: new Security(),
};

server.register(cors, {
  origin: "*",
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", `PATCH`]
})

server.register(openapiGlue, options);

server.register(fastifyJwt, {
  secret: randomKey()
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})