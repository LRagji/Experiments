var container = $('#resultContainer');
var spinner = $('#loadingSpinner');
var loadingMessage = $('#loadingMessage');
var shoppingBadge = $('#shoppingCart');
var alertPanel = $('#alertPane');
var pageNo = 0;
var size = 10;

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function shouldLoadNextPage(e) {
    if (spinner.isInViewport()) {
        $(window).off('scroll', shouldLoadNextPage);
        loadData("/v1/home/products?page=" + pageNo + "&size=" + size);
    }
}

function loadData(query) {
    loadingMessage.text("Loading more products from page:" + pageNo);
    var xhrObj = $.getJSON(query, function (data) {
        var items = [];
        $.each(data, function (key, val) {
            var clonedTemplate = fillProductInfo(val);
            container.append(clonedTemplate);
        });
        pageNo++;

        if (xhrObj.status === 206) {
            $(window).scroll(shouldLoadNextPage);
        }
        else {
            $(window).off('scroll', shouldLoadNextPage);
            if (xhrObj.status !== 200) {
                loadingMessage.text("Failed to load products, please refresh and try again");
            }
            else {
                spinner.hide();
            }
        }
    });
}

function addProductToSession(productId, quantity) {
    $.post("/v1/cart/products", { productId: productId, quantity: quantity }).always((responseData) => {
        if (responseData !== undefined && responseData.TotalProducts !== undefined && parseInt(responseData.TotalProducts)) {
            showSucess("Product added to your shopping cart.")
            shoppingBadge.text(parseInt(responseData.TotalProducts));
        }
        else {
            showFailure("Failed to add product to cart.");
        }
    });
}

function showFailure(message) {
    alertPanel.text(message)
        .removeAttr('class')
        .addClass('alert alert-danger text-center alertPane')
        .show()
        .fadeOut(4000);
}

function showSucess(message) {
    alertPanel.text(message)
        .removeAttr('class')
        .addClass('alert alert-success text-center alertPane')
        .show()
        .fadeOut(4000);
}

function fillProductInfo(product) {

    return `<div class="card m-2 myshadow myproductcard">
    <a href="/product?pid=${product.id}" >
    <center>
        <img class="productThumbnail" src="../static/resources/images/${product.image}" style="max-width:150px;max-height:170px" alt="Product Image">
    </center>
    </a>
    <div class="card-body bg-light">
   <strong>${product.name}</strong>
        <div class="d-flex justify-content-center align-items-center my-2">
        <h3 class="text-success">
        &#8377;${product.offerprice}
        <small><small class="text-muted"><del>&#8377;${product.price}</del></small></small>
        </h3>
        </div>
        <div class="d-flex justify-content-center align-items-center">
        <small>${product.meta.shippingdetail}</small>
        </div>
        <div class="d-flex justify-content-center align-items-center">
        <button onClick=addProductToSession(${product.id},1) class="btn btn-success my-2 mr-0" type="submit"><i class="fas fa-cart-plus"></i>
                Add to cart</button>
        </div>
    </div>
</div>`;
}

loadData("/v1/home/products?page=" + pageNo + "&size=" + size);