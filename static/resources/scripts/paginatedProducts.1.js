var container = $('#resultContainer');
var spinner = $('#loadingSpinner');
var loadingMessage = $('#loadingMessage');
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

function fillProductInfo(product) {

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
        <small>${product.meta.shippingdetail}</small>
        </div>
        <div class="d-flex justify-content-center align-items-center">
        <a href="/secure/products?tab=new&pid=${product.id}"><i class="fas fa-edit"></i>Edit</a>
        </div>
    </div>
</div>`;
}

loadData("/v1/home/products?page=" + pageNo + "&size=" + size);