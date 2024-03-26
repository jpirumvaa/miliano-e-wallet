/* eslint-disable import/no-extraneous-dependencies */
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
app.use(cors(corsOptions()));
app.use(cookieParser());
app.use(compression());

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
app.use(helmet());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(options.definition));
app.use("/api", routes);
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Miliano-eWallet" });
});
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
