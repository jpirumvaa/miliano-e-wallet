/* eslint-disable no-console */
import app from "./app";
import db from "./database/models";

const port = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to the db", error);
  }
})();

app.listen(
  port,
  console.log(`Server started at ${process.env.APP_URL}:${port}`)
);
