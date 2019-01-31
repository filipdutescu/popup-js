# popup-js
Free to use, open source jQuery plugin which provides customizable Pop-up/Dialog components in just 2 lines of code. Has a stylesheet for the component, but custom styling is also possible.

## Getting Started
The following intructions will provided the knowledge needed to import and implement `popup-js` into your project. They will only cover basic topics, for users who want to get the plugin up and working as soon as possible. 

### Prerequisites
This component is a <a href="https://jquery.com/" target="_blank">jQuery</a> plugin, thus needing it in order to work. You can either download it from <a href="https://jquery.com/download/" target="_blank">here</a> or import it from a CDN.

In the head of your HTML page include it as **_before_** this component's `.js`, as follows:
````html
<head>
  <script src="jquery-3.3.1.min.js"></script>
  ...
  <script src="popup-js.js"></script>
</head>
````

### Importing popup-js
You could either clone/download this repository or use the links of the raw files to mimic a CDN in your project. After you imported jQuery, the next thing is to import `popup-js.js` as follows:
````html
<script src="popup-js.js"></script>
````
---
You could (and should) also include the stylesheet of the Popup component, like so:
````html
<link rel="stylesheet" type="text/css" href="popup-js.css" />
````

### Using popup-js
Using `popup-js` is as easy as calling the `.popup(...)` function and storing its result in a variable. Then, whenever you want to display the popup, you can call `.openPopup()` on that object.

For example, add in the page's script (or in `<script>`) an empty query and then call `.popup(...)`:
````html
<script>
  let myPopup = $().popup(...);
</script>
````
This creates a popup that uses the _default_ settings (see [docs](https://github.com/filipdutescu/popup-js/wiki/Docs)). In order to display it, a trigger is required. For example, a button which calls `.openPopup()`, as such:
````html
<button onclick="myPopup.openPopup()">Open Popup</button>
````
That's it. You now have a working popup. Of course, it contains junk data, which is not very useful, is it? Here is a quick way to add content to the popup, by adding parameters to the `.popup()` call:
````html
<script>
  let myPopup = $().popup({
      title: "My title",
      content: "My content"
  });
</script>
````
Those two parameters can also receive raw html:
````html
<script>
  let myPopup = $().popup({
      title: "<h3>My title</h3>",
      content: "<div class='my-class'>My <span style='font-style: italic;'>content</span></div>"
  });
</script>
````

There is a lot more you can do with `popup-js`. To see all of the options and more tutorials, see the [documentation](https://github.com/filipdutescu/popup-js/wiki/Docs).

## Built With
* <a href="https://jquery.com/" target="_blank">jQuery</a> - main framework used</li>

## Authors
* **Filip Dutescu** - <a href="https://github.com/filipdutescu" target="_blank">@filipdutescu</a>

## License
This project is licensed under the MIT License - see the <a href="https://github.com/filipdutescu/popup-js/blob/master/LICENSE">LICENSE.md</a> file for details
