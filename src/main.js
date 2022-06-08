const shop = document.getElementById("shop");
//console.log(shop);
let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);

const generateShop = () => {
  return (shop.innerHTML = inventoryList
    .map(({ id, name, price, desc, img }) => {
      const search = basket.find(({ id: basketId }) => id === basketId) || [];
      // console.log(search);
      return `
        <div id=product-id-${id} class="item">
                <img width ="220" height="220" src="${img}" alt="">
                <div class="details display-f fd-c">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity display-f jc-sb ai-c">
                        <h2>$ ${price}</h2>
                        <div class="buttons display-f">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.amount === undefined ? 0 : search.amount}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
    .join(""));
};

generateShop();

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

  localStorage.setItem("data", JSON.stringify(basket));
};
// const updateCartAmount = () => {
//   const cartAmount = document.getElementById("cartAmount");
//   cartAmount.innerHTML = basket.reduce(
//     (itemsAmount, { amount }) => itemsAmount + amount,
//     0
//   );
// };
const update = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.amount;
  calculation();
};

const calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.amount).reduce((x, y) => x + y, 0);
};
calculation();
