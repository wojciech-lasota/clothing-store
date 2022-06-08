let label = document.getElementById("label");
// console.log(label);
let shoppingCart = document.getElementById("shoping-card");
console.log(shoppingCart);

let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.amount).reduce((x, y) => x + y, 0);
};

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((basketItem) => {
        let { id, amount } = basketItem;
        let search =
          inventoryList.find(
            (inventoryListItem) => inventoryListItem.id == id
          ) || [];

        return `
        <div class="card-item display-f">
          <img width="100" src=${search.img} alt="" />
          <div class="details">

            <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="card-item-price">$ ${search.price}</p>
              </h4>
              <i class="bi bi-x-lg"></i>
            </div>

            <div class="buttons display-f">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${amount}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
           </div>
            <h3>$${amount * search.price}</h3>
          </div>
        </div>
        `;
      })
      .join(""));
  } else {
    console.log("basket is mpty");
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};
generateCartItems();
calculation();
const increment = (id) => {
  //   const selectedItem = id;
  // console.log(selectedItem);

  const search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id,
      amount: 1,
    });
  } else {
    search.amount++;
  }

  // console.log(basket);
  update(id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
const decrement = (id) => {
  const search = basket.find((x) => x.id === id);
  if (search === undefined) return;
  else if (search.amount === 0) return;
  else {
    search.amount--;
  }
  update(id);
  basket = basket.filter((basketItem) => basketItem.amount !== 0);
  // console.log(basket);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
const update = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.amount;
  calculation();
};
