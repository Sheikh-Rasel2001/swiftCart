console.log("connected successfully");
const url = "https://fakestoreapi.com/products";

// trending products
const container = document.getElementById("card-container");
fetch (url)
.then(res => res.json())
.then(data => {
    const card3 = data.slice(0, 3);
    card3.forEach (product => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300";
        card.innerHTML = `
        <div class="bg-gray-300 p-4 mb-4">
            <img src="${product.image}" alt="${product.title}"
              class="w-full h-64 mb-4 rounded-md object-contain">
          </div>
          <!-- product details -->
          <div class="flex justify-between items-center text-sm px-4 mb-4">
            <span class="bg-blue-100 rounded-xl text-sm text-blue-950 font-semibold py-1 px-2">${product.category}</span>
            <span><i class="fa-solid fa-star text-yellow-500"></i>${product.rating.rate} (${product.rating.count})</span>
          </div>
          <p class="text-gray-900 font-semibold px-4 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">${product.title}</p>
          <p class="text-gray-900 font-bold text-lg px-4 mb-4">$${product.price}</p>
          <div class="flex justify-between items-center px-4 mb-4">
            <button
              class="bg-gray-300 border-1 px-3 py-1 rounded-md hover:bg-blue-800 transition duration-300 hover:text-gray-100"><i
                class="fa-regular fa-eye"></i> Details</button>
            <button class="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800 transition duration-300"><i
                class="fa-solid fa-cart-shopping"></i> Add</button>
          </div>
        `
        container.appendChild(card)
    })
})