/* 
    MIT License

    Copyright (c) 2019 filipdutescu

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

(function($) {
    $.fn.popup = function(options) {
        var settings = $.extend({}, $.fn.popup.defaults, options);
        
        let popup = $(document.createElement("div"));

        popup.addClass(settings.style.classes.main);
        if(settings.hidden === true)
            popup.addClass(settings.style.classes.hidden);
        
        var header = `
        ${settings.layout === "modern" ? settings.controls.close === true ? `<div style='position:relative;'><button class='${settings.style.classes.control}' style='position: absolute; right: -5px; top: -5px;'>&#215;</button></div>` : "" : ""}
        <div class='${settings.style.classes.header}'>
        ${settings.title}
        <hr />
        </div>
        `;
        
        var body = `
        <div class='${settings.style.classes.body}'>
            ${settings.content}
        </div>
        `;
        
        var controls = `
        <div class='${settings.style.classes.controls}'>
        ${settings.layout === "classic" ? settings.controls.close === true ? `<button class='${settings.style.classes.control}' style='position: absolute; right: 10px; top: 10px;'>&#215;</button>` : "" : ""}
        </div>
        `;

        popup.html((settings.header ? header : "") + body + controls);
        $("body").append(popup);
        
        if (settings.controls.close === true) {
            popup.find(`.${settings.style.classes.control}`).on('click', () => {
                popup.css("opacity", "0");
                popup.css("top", "-50%");                
            });
        }
        
        this.openPopup = function() {
            popup.css("opacity", "1");
            popup.css("top", "30%");
        }

        return this;
    }
}(jQuery));

$.fn.popup.defaults = {
    title: "Popup Title",
    content: "Popup Content",

    hidden: true,
    header: true,
    
    layout: "modern",
    
    controls: {
        close: true
    },
    
    style: {
        classes: {
            main: "pu_popup",
            hidden: "pu_popup-hidden",
            header: "pu_popup-header",
            body: "pu_popup-body",
            controls: "pu_popup-controls",
            control: "pu_popup-ctrl",
        }
    }
};