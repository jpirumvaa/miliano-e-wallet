/* eslint-disable import/no-extraneous-dependencies */
/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: application's configurations
 * @lastUpdated: Mar 29, 2023
 */
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import corsOptions from "./utils/corsOptions";
import routes from "./routes/index";
import { options } from "./doc";

require("dotenv").config();

const app = express();
app.use(express.json({ limit: "300mb" }));
app.use(morgan("dev"));

// only allow the allowed origins
app.use(cors(corsOptions()));
app.use(cookieParser());

//use compression to speed up application by compressing the response
app.use(compression());

//secure API with allowing specific methods
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, X-Requested-With"
  );
  next();
});

app.use(express.static("storage"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//secure application with helmet that hides real app headers and reduce consequences that can result from eavesdroppers having a lot of unnecessary information
app.use(helmet());

//swagger documentation
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(options.definition));
app.use("/api", routes);

//application entry endpoint
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Miliano-eWallet" });
});

//when no route found
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
