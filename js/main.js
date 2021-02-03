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

const addToCart = () => {
    // TODO: ADD LOGIC
    console.log("Add to cart")
}

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



    // collapse menu items by default
    collapseOnClick('color-filter-item', 'color-header-item');
    collapseOnClick('memory-filter-item', 'memory-header-item');
    collapseOnClick('os-filter-item', 'os-header-item');
    collapseOnClick('display-filter-item', 'display-header-item');



    f.renderWithFilter(items);
});



const checkboxOnChange = (key, e) => {
    // let filterName = filters[key];
    if (!e.checked) {
        // const indexOfItem = filterName.indexOf(e.value);
        // filterName.splice(indexOfItem);

        f.getFilterItemByKey(key).removeCheckedValue(e.value);
    } else {
        // filterName.push(e.value);

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

// const renderProductItems = (items) => {
//     items.forEach(function (item) {
//         let shopItem = renderProductItem(item);
//         $('#shop-grid-cnt').append(shopItem);
//     })
// }



// const filterProducts = () => {
//     const products = items.filter(item => {
//         // filter os storage, display
//         const osStorageDisplay = Object.keys(filters).every(f => filters[f].some(valToMatch => valToMatch === item[f]));
//         const color = item.color.some(valToMatch => filters.color.includes(valToMatch))
//
//         return osStorageDisplay && color;
//     });
//     return products.length > 0 ? products : items;
// }

class FilterItem {
    constructor(filterType, checkedValues=[]) {
        this.checkedValue = checkedValues;
        this.filterType = filterType
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
        console.log('price filter', this.filterType, this.checkedValue.length, this.checkedValue);
        return this.checkedValue.length !== 0;
    }

    getCheckedValueByIndex(index) {
        return this.checkedValue[index];
    }
}

class Filter {
    constructor() {
        this.filterProps = {
            price: new FilterItem("range"),
            color: new FilterItem("array", [300, 1000]),
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
        // console.log(!isPriceValidated);
        if(!isPriceValidated) {
            return;
        }

       result = items.filter(item => {
           let isPrice = item["price"] >= from && item["price"] <= to;
           let isColor = this.getFilterItemByKey("color").isWithCheckedItems() ? item["color"].some(color => this.getFilterItemByKey("color").isItemIncludes(color)) : true;
           console.log(this.filterProps, isPrice, isColor);
           // filter os storage, display
           // const osStorageDisplay = Object.keys(filters).every(f => filters[f].some(valToMatch => valToMatch === item[f]));
           // const color = item.color.some(valToMatch => filters.color.includes(valToMatch))

            return !(isPrice && isColor);
        });

       return result;
    }

    isWithCheckedItems() {
        return Object.keys(this.filterProps).every(filterKey => this.getFilterItemByKey(filterKey).isWithCheckedItems());
    }

    renderProductItems(data) {
        // todo: check data if is empty
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
        //
        // if(this.isWithCheckedItems()) {
        //     console.log('filter 1');
        //     filteredItems = this.filter();
        // } else {
        //     console.log('filter 2');
        //     filteredItems = items;
        // }
        console.log( filteredItems);
        this.renderProductItems(filteredItems);
    }
}



// class Utils {
//     constructor() {
//         this.colors = this._getColors();
//         this.categories = this._getCategory();
//         this.priceRange = this._getPriceRange();
//     }
//
//     _getColors(){
//         const result = []
//         items
//             .forEach(item => {
//                 result.push(...item.color)
//             })
//
//         return result
//             .filter((item, index, arr) => index == arr.indexOf(item))
//     }
//
//     _getCategory(){
//         return items
//             .map(item => item.category)
//             .filter((item, index, arr) => index == arr.indexOf(item))
//     }
//
//     _getPriceRange(){
//         const sortedByAsc = [...items]
//             .sort((a, b) => a.price - b.price)
//
//         return {
//             from: sortedByAsc[0].price,
//             to: sortedByAsc[sortedByAsc.length - 1].price
//         }
//
//     }
// }
//
// const utils = new Utils();
//
// const cElem = (tName, cName, text) => {
//   const elem = document.createElement(tName)
//   elem.className = cName || '';
//   elem.innerText = text || '';
//   return elem;
// }
//
// const renderItem = item => {
//     const container = cElem('div', 'card');
//     const img = cElem('img', 'card_img');
//     img.src = `img/${item.imgUrl}`;
//     const title = cElem('h6', 'card_title',item.name);
//     const price = cElem('p', 'card_price', `${item.price} $`);
//     container.append(img, title, price)
//     return container;
// }
//
// const renderCards = items => {
//     const container = document.querySelector('.items');
//     container.innerHTML = '';
//     const elems = items.map(item => renderItem(item))
//     container.append(...elems)
// }
//
// renderCards(items)
//
// const renderWithFilters = (filtersArr) => {
//     const filtredItems = items.filter(item => {
//         const isPrice = item.price >= filtersArr[0].changes.from && item.price <= filtersArr[0].changes.to
//         const isColors = !filtersArr[1].checked.length ||
//             item.color.some(color => filtersArr[1].checked.includes(color))
//         return isPrice && isColors;
//     })
//     renderCards(filtredItems);
// }
//
// class Filter{
//     constructor() {
//         this.filterArr = [
//             {
//                 type: 'range',
//                 title: 'Price',
//                 variant: utils.priceRange,
//                 changes: {...utils.priceRange}
//             },
//             {
//                 type: 'check',
//                 title: 'Colors',
//                 variants: utils.colors,
//                 checked: [],
//             },
//             {
//                 type: 'check',
//                 title: 'Categories',
//                 variants: utils.categories,
//                 checked: [],
//             },
//         ]
//     }
//
//     changePrice = (type, price) => {
//         this.filterArr[0].changes[type] = price;
//         renderWithFilters(this.filterArr)
//     }
//
//     changeColor = (colorName) => {
//         const indexOfColorInFilter = this.filterArr[1].checked.indexOf(colorName)
//         if (indexOfColorInFilter > -1) {
//             this.filterArr[1].checked.splice(indexOfColorInFilter, 1)
//         } else {
//             this.filterArr[1].checked.push(colorName)
//         }
//         renderWithFilters(this.filterArr)
//     }
// }
//
// class RenderFilter extends Filter{
//     constructor() {
//         super();
//         this.renderFilters();
//     }
//
//     get contentRenderMethods() {
//         return {
//             check: this._renderContentCheck.bind(this),
//             range: this._renderContentRange.bind(this),
//         }
//     }
//
//     renderFilters(){
//         const container = document.querySelector('.filter-container');
//         const elems = this.filterArr.map(item => this._renderCategory(item))
//         container.innerHTML = '';
//         container.append(...elems);
//     }
//
//     _renderCategory(item) {
//         const container = cElem('div', 'shop-item');
//         const title = cElem('div', 'filter-header-title');
//         title.innerHTML = `
//                    <span>${item.title}</span>
//                    <div class="arrow"></div>
//         `;
//         title.onclick = function () {
//             this.classList.toggle('filter-header-title--active');
//             const content = this.parentElement.children[1];
//             content.classList.toggle('filter-header-title--active');
//         }
//
//         const content = cElem('div', 'filter-header-title');
//         // Get method that render content
//         const getContent = this.contentRenderMethods[item.type];
//         // render content
//         const filterContent = getContent(item)
//         /// Render content into parent block
//         content.append(...filterContent)
//         container.append(title, content);
//         return container;
//     }
//
//     _renderContentCheck(item) {
//         return item.variants.map(variant => {
//             const label = cElem('label')
//             const title = cElem('span', null, variant)
//             const inp = cElem('input')
//             inp.type = 'checkbox'
//             inp.oninput = (e) => {
//                 this.changeColor(variant)
//             }
//             label.append(inp, title)
//             return label;
//         })
//     }
//
//     _renderContentRange(item) {
//         const containerFrom = cElem('div');
//         const labelFrom = cElem('label');
//         labelFrom.innerText = 'From'
//         const inputFrom = cElem('input');
//         inputFrom.value = item.variant.from
//
//         inputFrom.oninput = (e) => {
//             const elem = e.target;
//             this.changePrice('from', elem.value);
//         }
//
//         containerFrom.append(labelFrom, inputFrom)
//
//         const containerTo = cElem('div');
//         const labelTO = cElem('label');
//         labelTO.innerText = 'To'
//         const inputTo = cElem('input');
//         inputTo.value = item.variant.to
//         inputTo.oninput = (e) => {
//             const value = e.target.value;
//             this.changePrice('to', value);
//         }
//         containerTo.append(labelTO, inputTo)
//
//         return [containerFrom, containerTo]
//     }
// }
//
// const renderFilter = new RenderFilter();

