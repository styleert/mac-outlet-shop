let popUpIsOpen = false;
let popUp = document.getElementById("pop-up");
let popUpImg = document.getElementById("pop-up-img");
let popUpProdTitle = document.getElementById("pop-up-prod-title");
let popUpProdReviews = document.getElementById("pop-up-prod-reviews");
let popUpProdOrders = document.getElementById("pop-up-prod-orders");

let popUpProdColor = document.getElementById("pop-up-prod-color");
let popUpProdOS = document.getElementById("pop-up-prod-os");
let popUpProdChip = document.getElementById("pop-up-prod-chip");
let popUpProdHeight = document.getElementById("pop-up-prod-height");
let popUpProdWidth = document.getElementById("pop-up-prod-width");
let popUpProdWeight = document.getElementById("pop-up-prod-weight");
let popUpProdDepth = document.getElementById("pop-up-prod-depth");

let popUpProdPrice = document.getElementById("pop-up-prod-price");
let popUpProdStock = document.getElementById("pop-up-prod-stock");

// FILTER MENU CONTROLLER
const collapseOnClick = (filterId, headerId) => {
    let priceFilter = document.getElementById(filterId);
    let header = document.getElementById(headerId);

    if (priceFilter.style.display === "none") {
        priceFilter.style.display = "block";
        header.classList.remove("filter-header-collapsed");
    } else {
        priceFilter.style.display = "none";
        header.classList.add("filter-header-collapsed");
    }
}

const showItemPopUp = (itemId) => {
    popUpIsOpen = !popUpIsOpen;

    if(!popUpIsOpen) {
        popUp.style.display = "none";
    } else {
        popUp.style.display = "flex";

        let product = items.filter(function (item) {
            return item['id'] === itemId;
        })[0]
        console.log(product);

        popUpImg.src = './img/' + product.imgUrl;
        popUpProdTitle.innerHTML = product.name;
        popUpProdReviews.innerHTML = `<b>${product.orderInfo.reviews}%</b> Positive reviews`;
        popUpProdOrders.innerHTML = '840'; // todo: update value
        popUpProdColor.innerHTML = product.color;
        popUpProdOS.innerHTML = product.os;
        popUpProdChip.innerHTML = product.chip.name + ' ' + product.chip.cores;
        popUpProdHeight.innerHTML = product.size.height;
        popUpProdWidth.innerHTML = product.size.width;
        popUpProdDepth.innerHTML = product.size.depth;
        popUpProdWeight.innerHTML = product.size.weight;
        popUpProdPrice.innerHTML = '$ ' + product.price;
        popUpProdStock.innerHTML = `Stock: <b>${product.orderInfo.inStock}</b>pcs.`;
    }
}

const addToCart = () => {
    // TODO: ADD LOGIC
    console.log("Add to cart")
}

const hideItemPopUp = () => {
    popUp.style.display = "none";
    popUpIsOpen = false;
}

$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        autoplay: true,
        speed: 1000,
        fade: true,
    });


    // collapse menu items by default
    collapseOnClick('color-filter-item', 'color-header-item');
    collapseOnClick('memory-filter-item', 'memory-header-item');
    collapseOnClick('os-filter-item', 'os-header-item');
    collapseOnClick('display-filter-item', 'display-header-item');

    items.forEach(function (item) {
        console.log(item.imgUrl);

        $('#shop-grid-cnt').append(`
            <div id="shop-item" class="shop-item">
                    <div class="stat-wrapper" onClick="showItemPopUp(${item.id})">
                        <div class="shop-item-inner">
                            <img src=${'./img/' + item.imgUrl} alt="Apple TV" class="item-img">
                            <div class="flex-column-center">
                                <h5 class="shop-item-title shop-item-cnt">${item.name}</h5>
                                <div class="flex-cnt shop-item-cnt">
                                    <div class="shop-item-available-icon"></div>
                                    <span class="shop-item-description"><b>${item.orderInfo.inStock}</b> left in stock</span>
                                </div>
                                <span class="shop-item-description shop-item-cnt">Price: <b>${item.price}</b> $</span>
                                <button class="button">Add to cart</button>
                            </div>
                        </div>
                        <div class="item-stat flex-column-center">
                            <div class="stat-wrapper stat-wrapper-left">
                                <span class="shop-item-cnt"><b>${item.orderInfo.reviews}%</b> Positive reviews</span>
                                <span>Above avarage</span>
                            </div>
                            <div class="stat-wrapper stat-wrapper-right">
                                <span class="shop-item-cnt"><b>527</b></span>
                                <span>orders</span>
                            </div>
                        </div>
                    </div>
                </div>
        `)
    })


});