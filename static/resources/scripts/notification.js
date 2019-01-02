var alertPanel = $('#alertPane');

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