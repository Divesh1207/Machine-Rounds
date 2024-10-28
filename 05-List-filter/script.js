const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();

    console.log("API response:", data);
    displayProducts(data.posts);

    return data.posts || [];
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  }
};

const displayProducts = (posts) => {
  if (!Array.isArray(posts)) {
    console.warn("Expected an array but got:", posts);
    return;
  }

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  posts.forEach((product) => {
    const li = document.createElement("li");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = `Description: ${product.body}`;

    const tags = document.createElement("p");
    tags.textContent = "Tags: ";

    product.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.textContent = tag;
      tagSpan.style.marginRight = "5px";
      tags.appendChild(tagSpan);
    });

    const likes = document.createElement("span");
    likes.textContent = `Likes: ${product.reactions?.likes || 0}`;

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(tags);
    li.appendChild(likes);

    productList.appendChild(li);
  });
};
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const filteredProducts = async (event) => {
  const searchText = event.target.value.toLowerCase();

  const products = await fetchProducts();
  console.log("before filtered", products);
  if (Array.isArray(products)) {
    const filteredProducts = products.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(searchText))
    );
    console.log("after filtered", filteredProducts);
    displayProducts(filteredProducts);
  } else {
    console.warn("Expected an array but got:", products);
  }
};
// Use the debounce function with the filteredProducts function
const debouncedFilteredProducts = debounce(filteredProducts, 1000);

document
  .getElementById("search-input")
  .addEventListener("input", debouncedFilteredProducts);

fetchProducts();
