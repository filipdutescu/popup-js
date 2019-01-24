function Popup(id)
{
    if(typeof jQuery == 'undefined'){
        var jq = document.createElement("script");
        jq.type = "text/javascript";
        jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        document.head.appendChild(jq);
    }

    this.id = '#' + id;

    $(this.id + " .close").on('click', function () {
        $(this.id).css("opacity", "0");
        $(this.id).css("top", "-50%");        
    });
}

function createPopup(id) {
    $(id).css("opacity", "1");
    $(id).css("top", "30%");
}

// function closeDialog() {
//     $("#creation-dialog").css("opacity", "0");
//     $("#creation-dialog").css("top", "-50%");
// }