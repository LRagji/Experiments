var container = $('#resultContainer');
var spinner = $('#loadingSpinner');
var loadingMessage = $('#loadingMessage');
var apiURl = "./v1/users";
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
        loadData(apiURl + "?page=" + pageNo + "&size=" + size);
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
function extractData(data)
{
    $.each(data, function (key, val) {
        var clonedTemplate = fillInfo(val);
        container.append(clonedTemplate);
    });
    pageNo++;
}

function fillInfo(user) {

    return `<div class="card myshadow my-2">
    <div class="card-body">
        <h3>
            <small class="text-muted">${user.salutation}</small>
            ${user.first} ${user.last}
        </h3>
        <ul class="list-inline">
            <li class="list-inline-item"><i class="fas fa-mobile-alt"></i> ${user.mobile}</li>
            <li class="list-inline-item"><i class="far fa-envelope"></i> ${user.email}</li>
            <li class="list-inline-item text-uppercase"><i class="far fa-smile"></i> ${user.meta.type}</li>
        </ul>
        <div class="d-flex">
            <ul class="list-inline ml-auto mr-0">
                <li class="list-inline-item">
                    <form action="/secure/users/activation" method="POST">
                        <input type="hidden" name="userid" value="${user.id}" />
                        <input type="hidden" name="status" value="${user.meta.status === 'active' ? 'Deactivate' : 'Activate'}" />
                        <button type="submit" class="btn btn-secondary">${user.meta.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                    </form>
                </li>
                <li class="list-inline-item">
                    <form action="/secure/users/promotion" method="POST">
                        <input type="hidden" name="userid" value="${user.id}" />
                        <input type="hidden" name="promotion" value="${user.meta.type === 'admin' ? 'normal' : 'admin'}" />
                        <button type="submit" class="btn btn-secondary">${user.meta.type === 'admin' ? 'Demote to Normal' : 'Promote to Admin'}</button>
                    </form>
                </li>
                <li class="list-inline-item">
                    <form action="/secure/users/secret" method="POST">
                        <input type="hidden" name="userid" value="${user.id}" />
                        <input type="hidden" name="password" value="${user.id}" />
                        <button type="submit" class="btn btn-secondary">Reset to default password</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</div>`;
}

loadData(apiURl + "?page=" + pageNo + "&size=" + size);