import fs from "fs";

const path = "../files/carts.json";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }
  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");

        const carts = JSON.parse(data);

        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  addCart = async () => {
    //CHECK
    try {
      const carts = await this.getCarts();
      let cart = {
        products: [],
      };
      if (carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      let cart = carts.find((c) => c.id === id);
      if (cart) return cart;
      console.log("Not found.");
    } catch (error) {
      console.log(error);
    }
  };
  updateCart = async (cartId, productId) => {
    try {
      const carts = await this.getCarts();
      const productDefault = {
        product: productId,
        quantity: 1,
      };
      const cart = carts.find((elm) => elm.id === cartId);
      const cartProducts = cart.products;
      if (!cart) {
        console.log("No se encontro el carrito a actualizar.");
        return;
      }
      if (cartProducts.length === 0) {
        cartProducts.push(productDefault);
      } else {
        cartProducts.forEach((p) => {
          if (productId === p.product) {
            p.quantity++;
          }
        });
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  deleteCart = async (id) => {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((elm) => elm.id === id);
      if (cartIndex === -1) {
        console.log("No se encontro el carrito a borrar.");
        return;
      }
      carts.splice(cartIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
}
