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

$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        autoplay: false,
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
                    <div class="stat-wrapper">
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