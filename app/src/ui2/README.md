UI2 for Pebble.js
===

UI2 is a library built on top of [Pebble.js](https://github.com/pebble/pebblejs). The aim is to provide more complex interfaces while keeping the simplicity of the original library.

UI2 isn't ready to be used to build production apps, and (at least for now) it should be used with caution.

# Usage

Drop the `ui2/` folder in the `js/` folder of your Pebble.js project and call `require('ui2')`

```js
var UI2 = require('ui2');
```

# API reference

WIP

## List

A List is a type of [Window] that displays and horizontal list of text items. While not very useful on its own it can be [extended](#extending) to host any type of content.

```js
var list = new UI2.List({
  items: [{
    title: 'First item'
  },{
    title: 'Second item'
  }]
});
list.show();
```

### List.on('click', callback)

TBD

### List.on('longclick', callback)

TBD

### List.on('select', callback)

TBD

### List.on('highlight', callback)

TBD

## Grid

A Grid is a type of [Window] that displays a grid of items. Each item can display a title and an icon.

Items are always square and its size will be automatically calculated to be able to display a maximum of `itemsPerRow`.

```js
var grid = new UI2.Grid({
  itemsPerRow: 2,
  items: [{
    title: 'First item',
    icon: 'images/first_image.png'
  },{
    title: 'Second item',
    icon: 'images/second_image.png'
  }]
});
grid.show();
```

### Grid.on('click', callback)

TBD

### Grid.on('longclick', callback)

TBD

### Grid.on('select', callback)

TBD

### Grid.on('highlight', callback)

TBD


## Extending Lists

TBD

## WindowUtils

Helper class that provides methods related to the Pebble screen:

```js
var WindowUtils = require('ui2/windowUtils');
```

### WindowUtils.getWindowWidth(fullscreen)

* `fullscreen` `boolean` if the current [Window] is in fullscreen.

Returns the width of the [Window], in pixels.

### WindowUtils.getWindowHeight(fullscreen)

* `fullscreen` `boolean` if the current [Window] is in fullscreen.

Returns the height of the [Window], in pixels taking into account the status bar height (if present).

### WindowUtils.getWindowTop(fullscreen)

* `fullscreen` `boolean` if the current [Window] is in fullscreen.

Returns the top position of the [Window] relative to the screen, in pixels.


[Window]: https://github.com/pebble/pebblejs#window
[Extending Lists]: #extending
