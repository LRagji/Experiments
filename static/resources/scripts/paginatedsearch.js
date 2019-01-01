var container = $('#resultContainer');
var spinner = $('#loadingSpinner');
var loadingMessage = $('#loadingMessage');
var apiURl = "./v1/home/products";
var alertPanel = $('#alertPane');
var shoppingBadge = $('#shoppingCart');
var querySegment = "&s=";
var pageNo = 0;
var size = 10;

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
        loadData(apiURl + "?page=" + pageNo + "&size=" + size + querySegment);
    }
}

function loadData(query) {
    loadingMessage.text("Loading more users from page:" + pageNo);
    var xhrObj = $.getJSON(query).always(function (data) {
        if (xhrObj.status === 206) {
            extractData(data);
            $(window).scroll(shouldLoadNextPage);
        }
        else if (xhrObj.status === 200) {
            $(window).off('scroll', shouldLoadNextPage);
            extractData(data);
            spinner.hide();
        }
        else {
            $(window).off('scroll', shouldLoadNextPage);
            loadingMessage.text("Failed to load users, please refresh and try again");
        }
    });
}
function extractData(data) {
    $.each(data, function (key, val) {
        var clonedTemplate = fillInfo(val);
        container.append(clonedTemplate);
    });
    pageNo++;
}

function fillInfo(product) {
    return `<div class="card m-2 myshadow myproductcard">
    <a href="/product?pid=${product.id}" >
    <center>
        <img class="productThumbnail" src="../static/resources/images/products/${product.image}" style="max-width:150px;max-height:170px" alt="Product Image">
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
        <small>Ships in ${product.meta.shippingdetail} day(s)</small>
        </div>
        <div class="d-flex justify-content-center align-items-center">
        <button onClick=addProductToSession(${product.id},1) class="btn btn-success my-2 mr-0" type="submit"><i class="fas fa-cart-plus"></i>
                Add to cart</button>
        </div>
    </div>
</div>`;
}
querySegment = "&s=" + encodeURIComponent($("#keyword").text());
loadData(apiURl + "?page=" + pageNo + "&size=" + size + querySegment);