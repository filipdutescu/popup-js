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
            header: true,
            
            theme: "modern",
            
            controls: {
                close: true
            }
        }, $.fn.popup.defaults, options);
        
        this.addClass("popup");
        if(settings.hidden === true)
            this.addClass("popup-hidden");
        
        var header = `
        ${settings.theme === "modern" ? settings.controls.close === true ? "<div style='position:relative;'><button class='popup-ctrl' style='position: absolute; right: -5px; top: -5px;'>&#215;</button></div>" : "" : ""}
        <div class='popup-header'>
        ${settings.title}
        <hr />
        </div>
        `;
        
        var body = `
        <div class='popup-body'>
            ${settings.content}
        </div>
        `;
        
        var controls = `
        <div class='popup-controls'>
        ${settings.theme === "classic" ? settings.controls.close === true ? "<button class='popup-ctrl' style='position: absolute; right: 10px; top: 10px;'>&#215;</button>" : "" : ""}
        </div>
        `;

        this.html(settings.header ? header : "" + body + controls);
        
        if (settings.controls.close === true) {
            var popup = this;
            this.find(".popup-ctrl").on('click', () => {
                popup.css("opacity", "0");
                popup.css("top", "-50%");                
            });
        }
        
        return this;
    }
}(jQuery));

$.fn.popup.defaults = {
};