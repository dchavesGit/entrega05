import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const productManager = new ProductManager("./files/productos.json");

router.get("/", async (req, res) => {
  // CHECK
  try {
    const products = await productManager.getAll();
    const { limit } = req.query;
    if (!limit) {
    } else {
      if (limit < products.length) {
        products.splice(limit - products.length);
      }
    }
    res.render("home", { products });
  } catch (error) {
    console.log(error);
  }
});
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", { products: await productManager.getAll() });
});
router.get("/:pid", async (req, res) => {
  // CHECK
  try {
    const products = await productManager.getAll();
    const productId = Number(req.params.pid);
    const productSelected = products.find((p) => p.id === productId);
    console.log(productId);
    console.log(productSelected);
    if (!productSelected) {
      res.send({ error: "Product not found" });
    } else {
      res.send({ status: "product found", productSelected });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  // CHECK
  try {
    const product = req.body;
    if (!product.status) {
      product.status = true;
    }
    const result = await productManager.addProduct(
      product.title,
      product.description,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbnail
    );
    const io = req.app.get("socketio");
    console.log(result);
    io.emit("productAdd", JSON.stringify(result));
    console.log(JSON.stringify(result));
    res.send({ status: "added success", result });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:pid", async (req, res) => {
  //CHECK
  let update = req.body;
  const id = Number(req.params.pid);
  let productUpdated = await productManager.updateProduct(id, update);
  return res.send({ status: "success", productUpdated });
});

router.delete("/:pid", async (req, res) => {
  //CHECK
  const id = Number(req.params.pid);
  await productManager.deleteProduct(id);
  const io = req.app.get("socketio");
  io.emit("productDelete", id);
  res.send({ status: "success product deleted" });
});

export default router;
