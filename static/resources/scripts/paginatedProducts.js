var container = $('#resultContainer');
var spinner = $('#loadingSpinner');
var loadingMessage = $('#loadingMessage');
var shoppingBadge = $('#shoppingCart');
var alertPanel = $('#alertPane');
var pageNo = 1;
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

function addProductToSession(productId,quantity) {
    $.post("/v1/cart/products", { productId: productId,quantity:quantity }).always((responseData) => {
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

    return `<div class="card m-2 myshadow" style="max-width:250px" >
    <center>
        <img class="productThumbnail" src="../static/resources/images/Product1.jpg"
            alt="Product Image">
    </center>
    <div class="card-body">
        <h3>${product.productname}</h3>
        <div class="d-flex justify-content-center align-items-center">
            ${product.price}/-INR
            <button onClick=addProductToSession(${product.id},1) class="btn btn-link my-2 mr-0" type="submit"><i class="fas fa-cart-plus"></i>
                Buy Now</button>
        </div>
    </div>
</div>`;
}

loadData("/v1/home/products?page=" + pageNo + "&size=" + size);