import fs from "fs";

const path = "../files/productos.json";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }
  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        console.log("Voy por este camino", products);
        return products;
      } else {
        console.log("Voy por este camino del else");
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  addProduct = async (
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) => {
    try {
      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };
      const checkFieldsAreValids = (
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail,
        status
      ) => {
        let isValid = true;
        // Creamos un objeto con los valores a validar
        const objToValidate = {
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnail,
          status,
        };
        // Object.keys(objToValidate) devuelve un array con las claves del objeto
        const objKeys = Object.keys(objToValidate);
        // Recorremos el array de claves
        objKeys.forEach((key) => {
          // Si el valor de la clave es falsy, es decir, no tiene valor, mostramos un mensaje de error
          if (!objToValidate[key]) {
            console.log(`El campo ${key} es obligatorio.`);
            // Cambiamos el valor de la variable isValid a false
            isValid = false;
          }
        });
        return isValid;
      };
      if (
        checkFieldsAreValids(
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnail,
          status
        )
      ) {
        let products = await this.getAll();
        const validationCode = products.find((p) => p.code === code);
        if (validationCode) {
          console.log(
            `The code ${code} was alrady in use, please check the field code again.`
          );
        } else {
          if (products.length === 0) {
            product.id = 1;
          } else {
            product.id = products[products.length - 1].id + 1;
          }
          products.push(product);
        }
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return product;
      } else {
        console.log("All fields are necesary");
      }
    } catch (error) {
      console.log(error);
    }
  };
  getProductById = async (id) => {
    try {
      const products = await this.getAll();
      let product = products.find((p) => p.id === id);
      if (product) return product;
      console.log("Not found.");
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct = async (id, update) => {
    try {
      const products = await this.getAll();
      const productIndex = products.findIndex((elm) => elm.id === id);
      if (productIndex === -1) {
        console.log("No se encontro el producto a actualizar.");
        return;
      }
      let modificatedProduct = { ...products[productIndex], ...update };
      modificatedProduct.id = id;
      products.fill(modificatedProduct, productIndex, productIndex + 1);
      console.log(products);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (id) => {
    try {
      const products = await this.getAll();
      const productIndex = products.findIndex((elm) => elm.id === id);
      if (productIndex === -1) {
        console.log("No se encontro el producto a borrar.");
        return;
      }
      products.splice(productIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } catch (error) {
      console.log(error);
    }
  };
}
