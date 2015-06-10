# z-hook-finder
[![npm version](https://badge.fury.io/js/z-hook-finder.svg)](http://badge.fury.io/js/z-hook-finder)

## What is it
This module was created to handle a [BEM](http://bem.info)-like solution to find JS "hooks".

Here a JS hook means the same for a module as a BEM element means for a block.

As an additional "convention", I use a `js-` prefix for the classnames, which is
used to differenciate JS classes from classes used solely for design by CSS.

## Example, explanations:

```html
<!-- The "module" JS module -->
<div id="js-module">
    <div class="js-module__button"></div>
    <div class="js-module__button"></div>
    <div class="js-module__button"></div>
</div>
```

```js
var HookFinder = require('z-hook-finder');

var finder = new HookFinder($('#js-module'), 'js-module__');

finder.find('button');
// -> returns the jQuery object for the DOM element

finder.find('button', 2);
// -> returns only the first 2 buttons, and outputs a console error
```

Since this is a CommonJS module, it must be used alongside with [Browserify](http://browserify.org/), or
something similar, like [WebPacker](http://webpack.github.io/).

## Testing
Tests are in a work-in-progress state.

## License
[MIT](LICENSE)
