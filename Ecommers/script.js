    const TAX_RATE = 0.1;
    const DELIVERY_FEE = 40;
    const cart = [];

    const products = [
      {
        id: 1,
        name: "Plastic Stool",
        price: 30,
        img: "https://imgs.search.brave.com/8an8juTa0xmv1mDYCWTQYFzJ1n_ewEpx-UHH6mNuMtA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9HVS9HVi9NWS0z/MDAxODE5NC9wZi05/MDItMjEtMjctMjct/c3Rvb2wtMjUweDI1/MC5qcGc",
      },
      {
        id: 2,
        name: "Mini Table",
        price: 50,
        img: "https://imgs.search.brave.com/1czagWaj0zEnJmaHh2SXfT8kt0L_Rg6Qhw8Yyigt2eM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFTY2tna0V4Zkwu/anBn",
      },
      {
        id: 3,
        name: "Small Bookshelf",
        price: 60,
        img: "https://imgs.search.brave.com/oN4bnLbJWE9WfD6Bmejb-cXZ39T7J2hKcS005g4tHEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzk0LzkzLzYw/LzM2MF9GXzEwOTQ5/MzYwMTRfOWJZVTNJ/UXc0Yzl4Wk13bnpK/dGhXNE9qSjZBZ1Ux/NGUuanBn",
      },
      {
        id: 4,
        name: "Compact Drawer",
        price: 45,
        img: "https://imgs.search.brave.com/81rNfdaDGptyqASnQFakUCim5sNaltIp6ey7H7kPHUQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFmVmJLT0hDb0wu/anBn",
      },
      {
        id: 5,
        name: "Foot Rest",
        price: 35,
        img: "https://imgs.search.brave.com/ld2Rw28SUdeOCao1S6HQMwUrzt8El2SspNFME-OOSS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFqdUo0NUp0VEwu/anBn",
      },
    ];

    function displayProducts() {
      const list = document.getElementById("product-list");
      list.innerHTML = "";
      products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        list.appendChild(div);
      });
    }

    function addToCart(productId) {
      const existing = cart.find((item) => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        const product = products.find((p) => p.id === productId);
        cart.push({ ...product, quantity: 1 });
      }
      updateCart();
    }

    function removeOne(index) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    }

    function clearCart() {
      cart.length = 0;
      updateCart();
    }

    function updateCart() {
      const cartContainer = document.getElementById("cart-items");
      const cartQty = document.getElementById("cart-quantity");
      const summary = document.getElementById("summary");

      cartContainer.innerHTML = "";
      let totalQuantity = 0;

      cart.forEach((item, index) => {
        totalQuantity += item.quantity;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div>
            <p>${item.name} (x${item.quantity}) - ₹${item.price}</p>
            <button onclick="removeOne(${index})">Remove One</button>
          </div>
        `;
        cartContainer.appendChild(div);
      });

      cartQty.value = totalQuantity;

      if (cart.length === 0) {
        summary.innerHTML = "";
        return;
      }

      const itemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const beforeTax = itemTotal + DELIVERY_FEE;
      const tax = beforeTax * TAX_RATE;
      const total = beforeTax + tax;

      summary.innerHTML = `
        <p>Items Total: ₹${itemTotal.toFixed(2)}</p>
        <p>Delivery Fee: ₹${DELIVERY_FEE.toFixed(2)}</p>
        <p>Total Before Tax: ₹${beforeTax.toFixed(2)}</p>
        <p>Estimated Tax (10%): ₹${tax.toFixed(2)}</p>
        <p class="total">Order Total: ₹${total.toFixed(2)}</p>
      `;
    }

    displayProducts();