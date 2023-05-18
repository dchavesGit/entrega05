import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();

const cartManager = new CartManager("./files/carts.json");

router.post("/", async (req, res) => {
  //CHECK
  let cart = await cartManager.addCart();
  console.log(cart);
  res.send({ status: "success", cart });
});

router.get("/:cid", async (req, res) => {
  //CHECK
  //llamar al cartManager para obeter carrito correspondiente
  const cid = Number(req.params.cid);
  let cartSelected = await cartManager.getCartById(cid);
  let productsSelected = cartSelected.products;
  res.send({ status: "success found", productsSelected });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const productId = Number(req.params.pid);
  const cartId = Number(req.params.cid);
  const cartSelected = await cartManager.updateCart(cartId, productId);
  res.send({ status: "product added", cartSelected });
});
export default router;
