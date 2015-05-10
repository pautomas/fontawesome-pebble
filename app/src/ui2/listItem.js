var Vector2 = require('vector2');
var Rect = require('ui/rect');
var Text = require('ui/text');
var Image = require('ui/image');
var myutil = require('myutil');

var defaults = {
  parent : null,
  position : new Vector2(0, 0),
  size : new Vector2(70, 70),
};

var ListItem = function(listItemDef) {
  this.state = myutil.shadow(defaults, listItemDef || {});
  if (!this.state.parent) {
    throw new Error("A parent needs to be set.");
  }
  this._items = [];
  this._init();
};

ListItem.prototype._init = function() {
  var item = this.state.item;
  var borderWidth = item.borderWidth;
  var innerPosition = new Vector2(
    this.state.position.x + borderWidth,
    this.state.position.y + borderWidth);
  var innerSize = new Vector2(
    this.state.size.x - borderWidth * 2,
    this.state.size.y - borderWidth * 2);

  this.border = new Rect({
    position: this.state.position,
    size: this.state.size,
    backgroundColor: item.borderColor
  });
  this.content = new Rect({
    backgroundColor: item.backgroundColor,
    position: innerPosition,
    size: innerSize
  });
  this.title = new Text({
    text: item.title || "",
    font: item.titleFont,
    color: item.titleColor,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    position: new Vector2(innerPosition.x, innerPosition.y),
    size: new Vector2(innerSize.x, innerSize.y),
  });
  this
    ._add(this.border)
    ._add(this.content)
    ._add(this.title);
};

ListItem.prototype._add = function(element) {
    this._insert(this._items.length, element);
    return this;
};

ListItem.prototype._insert = function(index, element) {
  this._items.splice(index, 0, element);
  return this;
};

ListItem.prototype.show = function() {
  for (var i = 0; i < this._items.length; i++) {
    this.state.parent.add(this._items[i]);
  }
};

ListItem.prototype.highlight = function(highlight) {
  if (highlight) {
    this.content.backgroundColor(this.state.item.highlightBackgroundColor);
    this.border.backgroundColor(this.state.item.highlightBorderColor);
    this.title.color(this.state.item.highlightTitleColor);
  } else {
    this.content.backgroundColor(this.state.item.backgroundColor);
    this.border.backgroundColor(this.state.item.borderColor);
    this.title.color(this.state.item.titleColor);
  }
};

module.exports = ListItem;
