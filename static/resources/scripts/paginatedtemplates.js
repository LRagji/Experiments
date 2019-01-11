//ENUM for Loading callback(page,status)
//0 Started
//1 Finished but have more pages
//2 Finished and no more pages avaialable
//3 Results errored out.

let _pageNo = 0, _size = 10;
let _triggerPane = undefined, _resultPane = undefined;
let _apiUrl = "";
let _loadingCallback = undefined, _templateProcessCallback = undefined;
let _payload = undefined;

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
}

function hookUpPagination(apiUrl, templateProcessCallback, resultsPaneId, loadingCallback, triggerPaneId, startingPageNo, pageSize, payload) {

    _pageNo = startingPageNo;
    _size = pageSize;
    _triggerPane = $('#' + triggerPaneId);
    _resultPane = $('#' + resultsPaneId);
    _loadingCallback = loadingCallback;
    _apiUrl = apiUrl;
    _templateProcessCallback = templateProcessCallback;
    _payload = payload

    let seperator = (_apiUrl.includes('?') > 0) ? '&' : '?';
    loadData(_apiUrl + seperator + "page=" + _pageNo + "&size=" + _size);

}

function shouldLoadNextPage(e) {
    if (_triggerPane.isInViewport()) {
        $(window).off('scroll', shouldLoadNextPage);
        let seperator = (_apiUrl.includes('?') > 0) ? '&' : '?';
        loadData(_apiUrl + seperator + "page=" + _pageNo + "&size=" + _size);
    }
}

function loadData(query) {
    _loadingCallback(_pageNo, 0);
    if (_payload === undefined)
        $.getJSON(query).always(handleResponse);
    else
        $.post(query, _payload, undefined, "json").always(handleResponse);
}

function handleResponse(data, textStatus, xhrObj) {
    if (xhrObj.status === 206) {
        extractData(data);
        $(window).scroll(shouldLoadNextPage);
        _loadingCallback(_pageNo, 1);
    }
    else if (xhrObj.status === 200) {
        $(window).off('scroll', shouldLoadNextPage);
        extractData(data);
        _loadingCallback(_pageNo, 2);
    }
    else {
        $(window).off('scroll', shouldLoadNextPage);
        _loadingCallback(_pageNo, 3);
    }
}

function extractData(data) {
    $.each(data, function (key, val) {
        var clonedTemplate = _templateProcessCallback(val);
        _resultPane.append(clonedTemplate);
    });
    _pageNo++;
}