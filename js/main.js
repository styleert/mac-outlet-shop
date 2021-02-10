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

let fromRangeFilter = document.getElementById("from-range-filter");
let toRangeFilter = document.getElementById("ro-range-filter");

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

// const addToCart = () => {
    // TODO: ADD LOGIC
//     console.log("Add to cart")
// }

const hideItemPopUp = () => {
    popUp.style.display = "none";
    popUpIsOpen = false;
}

const renderProductItem = (item) => `
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
`

let f;

$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        autoplay: true,
        speed: 1000,
        fade: true,
    });

    f = new Filter();
    f.getFilterItemByKey('price').checkedValue = [179, 2799]



    // collapse menu items by default
    collapseOnClick('color-filter-item', 'color-header-item');
    collapseOnClick('memory-filter-item', 'memory-header-item');
    collapseOnClick('os-filter-item', 'os-header-item');
    collapseOnClick('display-filter-item', 'display-header-item');

    let displayGroup = document.getElementById('display-filter-item').getElementsByClassName('filter-input');
    f.renderWithFilter(items);
});

const displayCheckboxOnClick = (e) => {
    if (e.checked) {

        let displayGroup = document.getElementById('display-filter-item').getElementsByClassName('filter-input');
        for (let i = 0; i < displayGroup.length; i++) {
            displayGroup[i].checked = false;
        }
        e.checked = true;

        // filter display
        let valuesRange = e.value.split(',');
        f.getFilterItemByKey('display').checkedValue[0] = valuesRange[0];
        f.getFilterItemByKey('display').checkedValue[1] = valuesRange[1];
    } else {
        e.checked = false;
        f.getFilterItemByKey('display').removeCheckedValue(e.value);
    }
    f.renderWithFilter()

}

const memoryCheckboxOnClick = (e) => {
    if (e.checked) {

        let displayGroup = document.getElementById('memory-filter-item').getElementsByClassName('filter-input');
        for (let i = 0; i < displayGroup.length; i++) {
            displayGroup[i].checked = false;
        }
        e.checked = true;

        let valuesRange = e.value.split(',');
        f.getFilterItemByKey('storage').checkedValue[0] = valuesRange[0];
        f.getFilterItemByKey('storage').checkedValue[1] = valuesRange[1];
        console.log(f.getFilterItemByKey('storage').checkedValue)
    } else {
        e.checked = false;
        f.getFilterItemByKey('storage').removeCheckedValue(e.value);
    }

    f.renderWithFilter()
}

const checkboxOnChange = (key, e) => {
    if (!e.checked) {
        f.getFilterItemByKey(key).removeCheckedValue(e.value);
    } else {


        console.log('key', key);
        console.log('value', e.value);

        console.log('value', e.value);
        console.log('filter obj', f);
        console.log('filter item', f.getFilterItemByKey(key));
        f.getFilterItemByKey(key).addCheckedValue(e.value);

    }


    f.renderWithFilter();
}


const inputOnChange = (itemType, e) => {
    console.log(itemType);

    if(itemType === "from") {
        f.getFilterItemByKey("price").checkedValue[0] = e.value;
    } else {
        f.getFilterItemByKey("price").checkedValue[1] = e.value;
    }

    f.renderWithFilter();
}

class FilterItem {
    constructor(checkedValues=[]) {
        this.checkedValue = checkedValues;
    }

    addCheckedValue(newValue) {
        this.checkedValue.push(newValue);
    }

    removeCheckedValue(valueToRemove) {
        let indexOfItem = this.checkedValue.indexOf(valueToRemove);
        this.checkedValue.splice(indexOfItem);
    }

    isItemIncludes(value) {
        return this.checkedValue.includes(value);
    }

    isWithCheckedItems() {
        return this.checkedValue.length !== 0;
    }

    getCheckedValueByIndex(index) {
        return this.checkedValue[index];
    }
}

class Filter {
    constructor() {
        this.filterProps = {
            price: new FilterItem([179, 2799]),
            color: new FilterItem(),
            os: new FilterItem(),
            storage: new FilterItem(),
            display: new FilterItem(),
        }
    }

    getFilterItemByKey(keyName) {
        return this.filterProps[keyName];
    }

    validatePriceRanges(from, to) {
        let ok = true;

        if (this.getFilterItemByKey("price").isWithCheckedItems()) {


            // validate by type with regex
            let regex = new RegExp('\\d+$')
            if(!(regex.test(from) && regex.test(to)) || from >= to) {
                ok = false;
            }
        }
        return ok;
    }

    filter() {
        let result;
        let from = this.getFilterItemByKey("price").getCheckedValueByIndex(0);
        let to = this.getFilterItemByKey("price").getCheckedValueByIndex(1);
        let isPriceValidated = this.validatePriceRanges(from, to);
        if(!isPriceValidated) {
            return;
        }

       result = items.filter(item => {
           let isPrice = item["price"] >= from && item["price"] <= to;
           let isColor = this.getFilterItemByKey("color").isWithCheckedItems() ? item["color"].some(color => this.getFilterItemByKey("color").isItemIncludes(color)) : true;
           let isOs = this.getFilterItemByKey("os").isWithCheckedItems() ? this.getFilterItemByKey("os").checkedValue.some(filterValue => item["os"] === filterValue) : true;

           let isStorage = this.getFilterItemByKey("storage").isWithCheckedItems() ? this.getFilterItemByKey("storage").checkedValue.some(filterValue => item["storage"] <= parseInt(filterValue)) : true;

           let isDisplay = true;
           if(this.getFilterItemByKey("display").isWithCheckedItems()) {
               let filterValues = this.getFilterItemByKey("display").checkedValue;
               let isFrom = item["display"] >= parseInt(filterValues[0]);
               let isTo = filterValues[1] !== undefined ? item["display"] <= parseInt(filterValues[1]) : true;
               console.log("isFrom", isFrom, "isTo", isTo, "from", filterValues[0], "to", filterValues[1]);
               isDisplay =  isFrom && isTo;
           }

           return isPrice && isColor && isOs && isStorage && isDisplay;
       });

       return result;
    }

    isWithCheckedItems() {
        return Object.keys(this.filterProps).every(filterKey => this.getFilterItemByKey(filterKey).isWithCheckedItems());
    }

    renderProductItems(data) {
        if(data === undefined) {
            document.getElementById('shop-grid-cnt').innerHTML = `<span class="error">Filter error. Change values!</span>`;
        } else {
            data.forEach(function (item) {
                let shopItem = renderProductItem(item);
                $('#shop-grid-cnt').append(shopItem);
            })
        }
    }

    renderWithFilter() {
        document.getElementById('shop-grid-cnt').innerHTML = '';
     let filteredItems;
        filteredItems = this.filter();
        console.log( filteredItems);
        this.renderProductItems(filteredItems);
    }
}


// Cart

class Cart {
    constructor() {
       this. items = [];
       this.totalCount = 0;
       this.totalPrice = 0;
       this._getFromLS();
    }

    _getFromLS(){
       const cartAsJson = localStorage.getItem('cart');
       if(cartAsJson !== null) {
           const cart = JSON.parse(cartAsJson);
           Object.assign(this,cart);
       }
    }

    _setCartToLS(){
        const cartAsJson = JSON.stringify(this);
        localStorage.setItem('cart', cartAsJson)
    }

    addToCart(id){
        console.log(id)
        const currentItem = items.find(item => item.id === id);
        const objInItems = this.items.find(item => item.id === id);

        if(!objInItems){
            this.items.push({id, count: 1, price: currentItem.price})
        }else{
            objInItems.count++;
            objInItems.price += currentItem.price
        }
        this._reAmountProperties();
        console.log(this)
    }

    removeItemsCart(id){
        const indexOfItems = this.items.findIndex(item => item.id === id);
        this.items.splice(indexOfItems, 1);
        this._reAmountProperties();
    }

    removeFromCart(id){
        console.log(id)
        const currentItem = items.find(item => item.id === id);
        const indexOfItems = this.items.findIndex(item => item.id === id);

        if(this.items[indexOfItems].count === 0){
            this.items.splice(indexOfItems, 1);
        }else{
           this.items[indexOfItems].count--;
           this.items[indexOfItems].price -= currentItem.price
        }

        this._reAmountProperties();
        console.log(this)
    }

_reAmountProperties() {
    const initAccumulator = {
        totalCount: 0,
        totalPrice: 0
    }

    const totalAmountResult = this.items.reduce((accum, item) => {
        const currentItem = items.find(gadget => gadget.id === item.id);

        return {
            totalCount : accum.totalCount + item.count,
            totalPrice : accum.totalPrice + (currentItem.price * item.count),
        }
    },initAccumulator)
    Object.assign(this, totalAmountResult);
    this._setCartToLS();
    renderCartInstance.renderContent();
    renderCartInstance._renderModalContent();
}
}

const cartInstans = new Cart();

class RenderCart {
    constructor() {
        this.renderContent();
        this.renderModal();
    }
    renderModal(){
        const btn = document.getElementById('showCartItems');
        btn.onclick = () => {
            const cartItemsModal = document.querySelector('.cart_items');
            const IsShowModal = cartItemsModal.classList.toggle('active')

            IsShowModal && this._renderModalContent();
        }
        this._renderModalContent();
}
        
            renderContent(){
                const cartInfoElem = document.querySelector('.cart_info');
                cartInfoElem.innerText = `Total items: ${cartInstans.totalCount} ptc. ,Total price : ${cartInstans.totalPrice}$`
            }

            _renderModalContent(){
                if(!cartInstans.items.length){
                    const cartItemsModal = document.querySelector('.cart_items');
                    cartItemsModal.innerHTML = `<h5>Cart is empty</h5>`
                    return;
                }

                const {items: itemsFromCart} = cartInstans;

                const itemsForRender = [];

                items.forEach(gadget => {
                    const itemsFromCart = itemsFromCart.find(item => item.id === gadget.id);
                    if(itemsFromCart) {
                        itemsForRender.push({
                            data: gadget,
                            count: itemsFromCart.count,
                            totalPrice: itemsForRender.price,
                        })
                    }
                })

                
                const content = document.querySelector('.cart_items');
                content.innerHTML = ``;
                itemsForRender.forEach(item => {
                    const container = cElem('div', 'cart_item')
                    container.innerHTML = `    
                     <img class="cart_img" src="${'img'+item.data.imgUrl}" alt="">
                    X
                    <span>${item.count}</span>
                    =
                    <span>${item.totalPrice}</span>` 

                    content.appendChild(container)
                })

            }
         }

        const renderCartInstance = new RenderCart();