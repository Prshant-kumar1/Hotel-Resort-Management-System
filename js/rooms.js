let selectedCategory = "all";
let selectedPrice = "all";
let searchText = "";

function filterItems(category) {
  selectedCategory = category;
  showItems();
}

function filterPrice(price) {
  selectedPrice = price;
  showItems();
}

function searchItems(text) {
  searchText = text.toLowerCase();
  showItems();
}

function showItems() {
  let items = document.querySelectorAll("[data-category]");
  let shown = 0;

  for (let i = 0; i < items.length; i++) {
    let price = Number(items[i].dataset.price);

    let categoryOk = selectedCategory === "all" || items[i].dataset.category === selectedCategory;

    let priceOk = true;
    if (selectedPrice === "low") {
      priceOk = price < 6000;
    } else if (selectedPrice === "mid") {
      priceOk = price >= 6000 && price <= 9000;
    } else if (selectedPrice === "high") {
      priceOk = price > 9000;
    }

    let searchOk = true;
    let photos = items[i].querySelectorAll(".card");
    if (photos.length > 0) {
      searchOk = false;
      for (let j = 0; j < photos.length; j++) {
        let title = photos[j].querySelector("h3").textContent.toLowerCase();
        if (title.includes(searchText)) {
          photos[j].classList.remove("is-hidden");
          searchOk = true;
        } else {
          photos[j].classList.add("is-hidden");
        }
      }
    }

    if (categoryOk && priceOk && searchOk) {
      items[i].classList.remove("is-hidden");
      shown = shown + 1;
    } else {
      items[i].classList.add("is-hidden");
    }
  }

  let message = document.getElementById("no-results");
  if (message) {
    if (shown === 0) {
      message.classList.remove("is-hidden");
    } else {
      message.classList.add("is-hidden");
    }
  }
}