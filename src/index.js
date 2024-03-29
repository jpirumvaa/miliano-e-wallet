/* eslint-disable no-console */
/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: application's entry file. It uses app.js, and database configurations
 * @lastUpdated: Mar 29, 2023
 */

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
