//import { SqlContenedor } from "./Handlers/Contenedor.js";
//import { optionsSql, optionsSqlite } from "./dbCnf/Confi.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getProducts } from "./Mocks/products.js";
import Contenedor from "./Handlers/Contenedortx.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

// NORMALIZR
import util from "util";
function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

//PLANTILLAS
app.set("view engine", "ejs");

//DB
//const productosContenedor = new SqlContenedor(optionsSql, "Productos");
const productosContenedor =new Contenedor("productos.txt");
const mensajesContenedor = new Contenedor("mensajes.txt");
//const mensajesContenedor = new SqlContenedor(optionsSqlite, "Mensajes");

//GET
app.get("/productos", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    res.render("index", {
      pageTitle: "Desafio 07 - DB",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
  }
});

//GET PRODUCTOS-TEST (FAKER)
app.get("/productos-test", async (req, res) => {
  try {
    const productos = getProducts(5);
    res.render("index", {
      pageTitle: "Desafio 09 - Faker/Normalizacion",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
  }
});

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
  const productos = getProducts(5);
  const mensajes = await mensajesContenedor.getAllNormalized();
  print(mensajes);
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

    socket.on("nuevoProducto", async (data) => {
      io.sockets.emit("productos", getProducts(productos.length++));
    });

    socket.on("nuevoMensaje", async (data) => {
      await mensajesContenedor.save(data);
      console.log(data);
      io.sockets.emit("mensajes", await mensajesContenedor.getAllNormalized());
    });

})

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));