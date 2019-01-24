function togglePopup(id) {
    $(id).css("opacity", "1");
    $(id).css("top", "30%");
}

(function($) {
    $.fn.popup = function(options) {
        var settings = $.extend({
            title: "Popup Title",
            content: "Popup Content",

            hidden: true,

            controls: {
                close: true
            },
            actions: {
                close: function() {
                    this.css("opacity", "0");
                    this.css("top", "-50%");
                }
            }
        }, options);

        this.addClass("popup");
        if(settings.hidden === true)
            this.addClass("popup-hidden");

        var header = `
            <div class='popup-header' ${settings.controls.close === true ? "style='position: relative;'" : ""}>
                <p>${settings.title}<p>
                ${settings.controls.close === true ? "<button class='popup-ctrl' style='position: absolute; right: 10px; top: 10px;'>&#215;</button>" : ""}
            </div>
        `;

        var body = `
            <div class='popup-body'>
                <p>${settings.content}</p>
            </div>
        `;

        var controls = `
            <div class='popup-controls'>
            </div>
        `;

        this.html(header + body + controls);

        if(settings.controls.close === true)
            this.find(".popup-ctrl").on('click', settings.actions.close);

        //this.add("<p>test</p>")

        return this;
    }
}(jQuery));