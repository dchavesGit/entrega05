const socket = io();

const container = document.getElementById("container");

socket.on("productAdd", (data) => {
  let prod = JSON.parse(data);
  let ul = document.createElement("ul");
  ul.setAttribute("id", prod.id);
  ul.innerHTML = `
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
        `;
  container.appendChild(ul);
});

socket.on("productDelete", (id) => {
  const product = document.getElementById(id);
  product.remove();
});
