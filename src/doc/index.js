import { entryApiDoc } from "./app";

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API for Miliano-eWallet",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerformat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `${process.env.APP_URL}:${process.env.PORT}`,
        description: "Dev server",
      },
    ],
    paths: {
      ...entryApiDoc,
    },
  },
  apis: ["**/doc/*"],
};
