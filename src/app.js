import express from "express";
import prouductsRouter from "./routes/productsManager.routes.js";
import cartsRouter from "./routes/cartsManager.routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/products", prouductsRouter);
app.use("/api/carts", cartsRouter);

const server = app.listen(8080, () =>
  console.log("Listening server on port 8080")
);

const io = new Server(server);

app.set("socketio", io);
