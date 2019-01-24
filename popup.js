function Dialog()
{

}

function create(dialogId) {
    $(dialogId).css("opacity", "1");
    $(dialogId).css("top", "30%");
}

function closeDialog() {
    $("#creation-dialog").css("opacity", "0");
    $("#creation-dialog").css("top", "-50%");
}