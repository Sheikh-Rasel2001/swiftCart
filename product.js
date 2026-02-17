console.log("products section added successfully");

const categoryContainer = document.getElementById("category");

let allProducts = [];

fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        displayProducts(allProducts);
    });
// category buttons
fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(categories => {
        const allButton = document.createElement("button");
        allButton.className = "bg-blue-700 text-white px-3 py-1 rounded-md mr-2 mb-2";
        allButton.textContent = "All";

        allButton.addEventListener("click", () => {
            displayProducts(allProducts);
            setActiveButton(allButton);
        });

        categoryContainer.appendChild(allButton);

        categories.forEach(category => {
            const btn = document.createElement("button");
            btn.className = "bg-gray-300 border-1 px-3 py-1 rounded-md hover:bg-blue-800 transition duration-300 hover:text-gray-100 mr-2 mb-2 capitalize";
            btn.textContent = category;

            btn.addEventListener("click", () => {
                const filtered = allProducts.filter(p => p.category === category);
                displayProducts(filtered);
                setActiveButton(btn);
            });

            categoryContainer.appendChild(btn);
        });
    });

// default display products
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300";
        card.innerHTML = `
      <div class="bg-gray-300 p-4 mb-4">
        <img src="${product.image}" alt="${product.title}" class="w-full h-64 mb-4 rounded-md object-contain">
      </div>
      <div class="flex justify-between items-center text-sm px-4 mb-4">
        <span class="bg-blue-100 rounded-xl text-sm text-blue-950 font-semibold py-1 px-2">${product.category}</span>
        <span><i class="fa-solid fa-star text-yellow-500"></i>${product.rating.rate} (${product.rating.count})</span>
      </div>
      <p class="text-gray-900 font-semibold px-4 mb-4 truncate">${product.title}</p>
      <p class="text-gray-900 font-bold text-lg px-4 mb-4">$${product.price}</p>
      <div class="flex justify-between items-center px-4 mb-4">
        <button class="bg-gray-300 border-1 px-3 py-1 rounded-md hover:bg-blue-800 transition duration-300 hover:text-gray-100"><i class="fa-regular fa-eye"></i> Details</button>
        <button class="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800 transition duration-300"><i class="fa-solid fa-cart-shopping"></i> Add</button>
      </div>
    `;

        productContainer.appendChild(card);
    });
}

// set active category button
const setActiveButton = (btn) => {
    const buttons = categoryContainer.querySelectorAll("button");
    buttons.forEach(button => {
        button.classList.remove("bg-blue-700", "text-white");
        button.classList.add("bg-gray-300");
    })
    btn.classList.add("bg-blue-700", "text-white");
    btn.classList.remove("bg-gray-300");
}
