import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sequelize from "@/config/database";
import cors from "cors";

/**
 * Importing routes that will make this
 * application function
 */
import orderRoutes from "@/routes/orderRoutes";
import customerRoutes from "@/routes/customerRoutes";

/**
 * Importing index.ts from models to preserve
 * inter-model relationships. Further, this isolates
 * the management of models to the models folder
 * specifically, thereby minimizing the number of
 * changes required to this core file in case of
 * model updates later on.
 */
import "./models";

const APP_PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", orderRoutes);
app.use("/api", customerRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(APP_PORT, () =>
      console.log(`Server is running on port ${APP_PORT}`)
    );
  })
  .catch((error) => console.log("Database sync error:", error));
