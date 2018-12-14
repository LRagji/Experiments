var container = $('#resultContainer');
var spinner = $('#loadingSpinner');
var loadingMessage = $('#loadingMessage');
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

function fillProductInfo(product) {

    return `<div class="card">
    <center>
        <img class="card-img-top" style="max-width:220px; max-height:250px" src="../static/resources/images/Product1.jpg"
            alt="Product Image">
    </center>
    <div class="card-body">
        <h3>${product.productname}</h3>
        <div class="d-flex justify-content-center align-items-center">
            ${product.price}/-INR
            <button class="btn btn-link my-2 mr-0" type="submit"><i class="fas fa-cart-plus"></i>
                Buy Now</button>
        </div>
        </input>
    </div>
</div>`;
}

loadData("/v1/home/products?page=" + pageNo + "&size=" + size);