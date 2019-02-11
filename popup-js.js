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

(function ($) {
    $.fn.popup = function (options) {
        let settings = $.extend({}, $.fn.popup.defaults, options);

        let popup = $(document.createElement("div"));

        popup.addClass(settings.style.main);
        if(settings.fixed === true)
            popup.addClass(settings.style.fixed);
        if(settings.animated === true)
            popup.addClass(settings.style.animated);
        if (settings.hidden === true)
            popup.addClass(settings.style.hidden);
        if (settings.transitionOnOpen.top === true)
            popup.addClass(settings.style.transitionTop);
        if (settings.transitionOnOpen.right === true)
            popup.addClass(settings.style.transitionRight);
        if (settings.transitionOnOpen.bottom === true)
            popup.addClass(settings.style.transitionBottom);
        if (settings.transitionOnOpen.left === true)
            popup.addClass(settings.style.transitionLeft);

        let header = `
        ${settings.layout === "modern" ? settings.controls.close === true ? `<div class='${settings.style.modern}'><button class='${settings.style.control}' data-control='close'>&#215;</button></div>` : "" : ""}
        <div class='${settings.style.header}'>
            ${settings.title}
            <hr />
        </div>
        `;

        let body = `
        <div class='${settings.style.body}'>
            ${settings.content}
        </div>
        `;

        let controls = `
        <div class='${settings.style.controls} ${settings.layout === "classic" ? settings.style.classic : ""}'>
            ${settings.controls.confirm === true ? `<button class='${settings.style.control}' data-control='confirm'>Confirm</button>` : ""}
            ${settings.controls.submit === true ? `<button class='${settings.style.control}' data-control='submit'>Submit</button>` : ""}
            ${settings.controls.cancel === true ? `<button class='${settings.style.control}' data-control='cancel'>cancel</button>` : ""}
            ${settings.layout === "classic" ? settings.controls.close === true ? `<button class='${settings.style.control}' data-control='close'>Close</button>` : "" : ""}
        </div>
        `;

        popup.html((settings.header ? header : "") + body + controls);
        $("body").append(popup);

        if (settings.controls.close === true) {
            popup.find(`.${settings.style.control}[data-control='close']`).on('click', () => {
                let lastTransition = "";
                if (settings.transitionOnClose.fade === true) {
                    popup.css("opacity", "0");
                    lastTransition = "opacity";
                }
                if (settings.transitionOnClose.top === true) {
                    if(settings.transitionOnOpen.bottom !== true) {
                        popup.css("top", settings.transitionOnCloseAmmount);
                        lastTransition = "top";
                    }
                    else {
                        popup.css("bottom", settings.transitionOnCloseAmmount.substring(0, 1) === '-' ? settings.transitionOnCloseAmmount.substring(1, settings.transitionOnCloseAmmount.length) : settings.transitionOnCloseAmmount);
                        lastTransition = "bottom";
                    }
                }
                if (settings.transitionOnClose.right === true) {
                    if(settings.transitionOnOpen.left !== true) {
                        popup.css("right", settings.transitionOnCloseAmmount);
                        lastTransition = "right";
                    }
                    else {                        
                        popup.css("left", settings.transitionOnCloseAmmount.substring(0, 1) === '-' ? settings.transitionOnCloseAmmount.substring(1, settings.transitionOnCloseAmmount.length) : settings.transitionOnCloseAmmount);
                        lastTransition = "left";
                    }
                }
                if (settings.transitionOnClose.bottom === true) {
                    if(settings.transitionOnOpen.top !== true) {
                        popup.css("bottom", settings.transitionOnCloseAmmount);
                        lastTransition = "bottom";
                    }
                    else {
                        popup.css("top", settings.transitionOnCloseAmmount.substring(0, 1) === '-' ? settings.transitionOnCloseAmmount.substring(1, settings.transitionOnCloseAmmount.length) : settings.transitionOnCloseAmmount);
                        lastTransition = "top";
                    }
                }
                if (settings.transitionOnClose.left === true) {
                    if(settings.transitionOnOpen.right !== true) {
                        popup.css("left", settings.transitionOnCloseAmmount);
                        lastTransition = "left";
                    }
                    else {  
                        popup.css("right", settings.transitionOnCloseAmmount.substring(0, 1) === '-' ? settings.transitionOnCloseAmmount.substring(1, settings.transitionOnCloseAmmount.length) : settings.transitionOnCloseAmmount);
                        lastTransition = "right";
                    }
                }

                popup.on('transitionend', function (event) {
                    if (event.originalEvent.propertyName === lastTransition) {
                        popup.removeAttr("style");
                        lastTransition = "";
                    }
                });

                let closeCallback = settings.actions.find(a => a.name === 'close');
                if(typeof closeCallback !== 'undefined') {
                    closeCallback = closeCallback.callback;
                    if(closeCallback != null)
                        closeCallback();
                }
            });
        }

        if(settings.controls.confirm === true) {
            let confirmCallback = settings.actions.find(a => a.name === 'confirm');
            if(typeof confirmCallback !== 'undefined') {
                confirmCallback = confirmCallback.callback;
                if(confirmCallback != null)
                    popup.find(`.${settings.style.control}[data-control='confirm']`).on('click', confirmCallback);
            }
        }

        if(settings.controls.cancel === true) {
            let cancelCallback = settings.actions.find(a => a.name === 'cancel');
            if(typeof cancelCallback !== 'undefined') {
                cancelCallback = cancelCallback.callback;
                if(cancelCallback != null)
                    popup.find(`.${settings.style.control}[data-control='cancel']`).on('click', cancelCallback);
            }
        }

        if(settings.controls.submit === true) {
            let submitCallback = settings.actions.find(a => a.name === 'submit');
            if(typeof submitCallback !== 'undefined') {
                submitCallback = submitCallback.callback;
                if(submitCallback != null)
                    popup.find(`.${settings.style.control}[data-control='submit']`).on('click', submitCallback);
            }
        }

        this.openPopup = function () {
            if (settings.transitionOnOpen.fade === true || settings.hidden !== 'undefined')
                popup.css("opacity", "1");
            if (settings.transitionOnOpen.top === true)
                popup.css("top", settings.transitionOnOpenAmmount);
            if (settings.transitionOnOpen.right === true)
                popup.css("right", settings.transitionOnOpenAmmount);
            if (settings.transitionOnOpen.bottom === true)
                popup.css("bottom", settings.transitionOnOpenAmmount);
            if (settings.transitionOnOpen.left === true)
                popup.css("left", settings.transitionOnOpenAmmount);
        }

        return this;
    }
}(jQuery));

$.fn.popup.defaults = {
    title: "Popup Title",
    content: "Popup Content",

    header: true,
    fixed: false,

    layout: "modern",

    controls: {
        close: true,
        confirm: false,
        cancel: false,
        submit: false
    },

    actions: [
        { name: "close", callback: null },
        { name: "confirm", callback: null },
        { name: "cancel", callback: null },
        { name: "submit", callback: null }
    ],

    hidden: true,
    animated: true,

    transitionOnOpen: {
        top: true,
        right: false,
        bottom: false,
        left: false,
        fade: true
    },
    transitionOnOpenAmmount: "20%",

    transitionOnClose: {
        top: true,
        right: false,
        bottom: false,
        left: false,
        fade: true
    },
    transitionOnCloseAmmount: "-100%",

    style: {
        main: "pu_popup",
        header: "pu_popup-header",
        body: "pu_popup-body",
        controls: "pu_popup-controls",
        control: "pu_popup-ctrl",

        fixed: "pu_popup-fixed",

        animated: "pu_popup-animated",
        hidden: "pu_popup-hidden",
        transitionTop: "pu_popup-top",
        transitionRight: "pu_popup-right",
        transitionBottom: "pu_popup-bottom",
        transitionLeft: "pu_popup-left",

        modern: "pu_popup-modern",
        classic: "pu_popup-classic"
    }
};
