let shop = document.getElementById('shop');
//console.log(shop);
let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

let shopItemsData = [{
    id: "1",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg"
},
{
    id: "2",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg"
},
{
    id: "3",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg"
},
{
    id: "4",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg"
}];



let generateShop = () => {
    return (shop.innerHTML = shopItemsData
      .map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x)=>x.id === x.id) || [];
        console.log(search);
        return `
        <div id=product-id-${id} class="item">
                <img width ="220" src="${img}" alt="">
                <div class="details display-f fd-c">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity display-f jc-sb ai-c">
                        <h2>$ ${price}</h2>
                        <div class="buttons display-f">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(""))
};

generateShop();

let increment = (id) =>{
    let selectedItem = id;
    // console.log(selectedItem);

    let search = basket.find((x)=> x.id === id)
    if(search === undefined){
        basket.push({
            id:id,
            item:1,
    
        });
    }else{
        search.item++;
    }

    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
    update(id);
    
};
let decrement = (id) =>{
    

    let search = basket.find((x)=> x.id === id)
    if(search.item === 0){
        return;
    }else{
        search.item--;
    }

    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(id);
    
};
let update = (id) =>{
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };