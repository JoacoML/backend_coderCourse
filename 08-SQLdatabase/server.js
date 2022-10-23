const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer);
const path = require("path");
//const productos = require("./router/products");
const Products = require("./container/container");
const products = new Products("products");
const Messages = require("./container/messContainer");
const messages = new Messages("messages");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", "./views");
app.set("view engine", "ejs");

//app.use("/", productos);

app.get("/", async (req, res) => {
  res.status(200).render("pages/index");
});

app.all("*", (req, res) => {
  res.json({ res: "no se puede acceder a esta ruta" });
});

const PORT = 8085;

const server = httpServer.listen(PORT, () => {
  console.log(`listening in port ${server.address().port}`);
});

io.on("connection", async (cliente) => {
  console.log(`cliente ${cliente.id} conectado`);

  cliente.emit("productos-server", await products.getAll());

  cliente.on("new-product", async (producto) => {
    await products.save(producto);
    io.sockets.emit("productos-server", await products.getAll());
  });

  cliente.emit("mensajes-server", await messages.getAll());

  cliente.on("new-message", async (mensaje) => {
    await messages.save(mensaje)

    io.sockets.emit("mensajes-server", await messages.getAll());
  });
});