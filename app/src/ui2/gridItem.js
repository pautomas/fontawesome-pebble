var util2 = require('util2');
var Vector2 = require('vector2');
var Rect = require('ui/rect');
var Text = require('ui/text');
var Image = require('ui/image');
var ListItem = require('ui2/listItem');
var myutil = require('myutil');

var defaults = {
  parent : null,
  position : new Vector2(0, 0),
  size : new Vector2(70, 70),
};

var GridItem = function(gridItemDef) {
  ListItem.call(this, myutil.shadow(defaults, gridItemDef || {}));
};

util2.inherit(GridItem, ListItem);

GridItem.prototype._init = function() {
  var left = this.state.position.x;
  var top = this.state.position.y;
  var item = this.state.item;
  var borderWidth = item.borderWidth;
  var backgroundColor = item.backgroundColor;
  var borderColor = item.borderColor;
  var itemSize = this.state.size.x; // Grid items are always square
  var innerSize = itemSize - borderWidth * 2;

  this.border = new Rect({
    backgroundColor: borderColor,
    radius: 2,
    position: new Vector2(left, top),
    size: new Vector2(itemSize, itemSize) });
  this.content = new Rect({
    backgroundColor: backgroundColor,
    radius: 2,
    position: new Vector2(left + borderWidth, top + borderWidth),
    size: new Vector2(innerSize, innerSize) });

  var iconSize = new Vector2(innerSize, innerSize);
  if (item.title) {
    iconSize.addSelf({ x: 0, y: -15 });
  }
  this.icon = new Image({
    image: item.icon,
    compositing : 'set',
    position: new Vector2(left + borderWidth, top + borderWidth),
    size: iconSize });
  this.title = new Text({
    text: item.title || "",
    font: item.titleFont,
    color: item.titleColor,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    position: new Vector2(left + borderWidth, top + (itemSize - 30)),
    size: new Vector2(innerSize, 30 - borderWidth) });

  this
    ._add(this.border)
    ._add(this.content)
    ._add(this.icon)
    ._add(this.title);
};

module.exports = GridItem;
