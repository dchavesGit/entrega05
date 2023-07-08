const addToCartButtons = document.querySelectorAll(".add");
const cartIdElm = document.getElementById("cartId");

addToCartButtons.forEach((element) => {
  element.addEventListener("click", (evt) => {
    const idAttr = element.getAttribute("id");
    const productId = idAttr.split("_").pop();
    if (cartIdElm.textContent === "") {
      fetch("/api/carts", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((resp) => {
        resp.json().then((respDeserilize) => {
          const cartID = respDeserilize.payload._id;
          cartIdElm.textContent = cartID;
          addProductToCart(productId);
        });
      });
    } else {
      addProductToCart(productId);
    }
  });
});

const addProductToCart = (productId) => {
  fetch(`/api/carts/${cartIdElm.textContent}/products/${productId}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ quantity: 1 }),
  }).then((resp2) => {
    console.log(resp2);
  });
};
