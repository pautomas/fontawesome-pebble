var util2 = require('util2');
var myutil = require('myutil');
var Window = require('ui/window');
var List = require('ui2/list');
var GridItem = require('ui2/gridItem');
var Vector2 = require('vector2');
var WindowUtils = require('ui2/windowUtils');

var itemDefaultStyle = {
  borderWidth : 1,
  borderColor : 'black',
  backgroundColor : 'white',
  titleColor: 'black',
  titleFont: 'GOTHIC_14',
  highlightBackgroundColor : 'black',
  highlightBorderColor : 'white',
  highlightTitleColor : 'white'
};

var defaults = {
  items: [],
  itemsPerRow : 2,
  borderSpacing : 2,
  backgroundColor: 'clear'
};

var Grid = function(gridDef) {
  gridDef.itemDefaultStyle = myutil.shadow(itemDefaultStyle, gridDef.itemDefaultStyle || {});
  List.call(this, myutil.shadow(defaults, gridDef || {}));
};

Grid._codeName = 'grid';

util2.inherit(Grid, List);

Grid.prototype._loadElements = function() {
  var itemsPerRow = this.state.itemsPerRow;
  var borderSpacing = this.state.borderSpacing;

  var itemSize = (WindowUtils.getWindowWidth(this.state.fullscreen) -
                 (borderSpacing * 2 * itemsPerRow)) / itemsPerRow;

  for (var i = 0; i < this.state.items.length; i++) {
    var item = myutil.shadow(this.state.itemDefaultStyle, this.state.items[i] || {});
    var sizeWithMargin = (itemSize + borderSpacing * 2);
    var left = (sizeWithMargin * (i % itemsPerRow)) + borderSpacing;
    var top = (sizeWithMargin * Math.floor(i / itemsPerRow)) + borderSpacing;

    var gridItem = new GridItem({
      // @TODO: Make GridItem extend ElementContainer and extend GridItem add
      // to support it and pass himself as parent.
      parent: this,
      item: item,
      position: new Vector2(left, top),
      size: new Vector2(itemSize, itemSize)
    });

    gridItem.show();

    this._listItems[i] = gridItem;
  }
};

Grid.emit = Window.emit;

module.exports = Grid;
