var util2 = require('util2');
var myutil = require('myutil');
var Window = require('ui/window');
var ListItem = require('ui2/listItem');
var Vector2 = require('vector2');
var WindowUtils = require('ui2/windowUtils');

var itemDefaultStyle = {
  borderWidth : 1,
  borderColor : 'black',
  backgroundColor : 'white',
  titleColor: 'black',
  highlightBackgroundColor : 'black',
  highlightBorderColor : 'white',
  highlightTitleColor : 'white'
};

var defaults = {
  items: [],
  borderSpacing : 2,
  backgroundColor: 'clear'
};

var List = function(listDef) {
  listDef.itemDefaultStyle = myutil.shadow(itemDefaultStyle, listDef.itemDefaultStyle || {});
  Window.call(this, myutil.shadow(defaults, listDef || {}));
  this._listItems = [];
  this._selectionIndex = 0;

  this.on('click', this._onClickHandler);
};

List._codeName = 'list';

util2.inherit(List, Window);

List.prototype._show = function() {
  this._loadElements();
  Window.prototype._show.apply(this, arguments);
  this._highlightItem(this._selectionIndex);
};

List.prototype.action = function() {
  throw new Error("Grids don't support action bars.");
};

List.prototype.buttonConfig = function() {
  throw new Error("Grids don't support changing button configurations.");
};

List.prototype._buttonAutoConfig = function() {};

List.prototype._loadElements = function() {
  var borderSpacing = this.state.borderSpacing;

  var itemWidth = WindowUtils.getWindowWidth() - (borderSpacing * 2);
  var itemHeight = 50;

  for (var i = 0; i < this.state.items.length; i++) {
    var item = myutil.shadow(this.state.itemDefaultStyle, this.state.items[i] || {});
    var heightWithMargin = (itemHeight + borderSpacing * 2);
    var left = borderSpacing;
    var top = (heightWithMargin * i) + borderSpacing;

    var listItem = this._createItem({
      // @TODO: Make GridItem extend ElementContainer and extend GridItem add
      // to support it and pass himself as parent.
      parent: this,
      item: item,
      position: new Vector2(left, top),
      size: new Vector2(itemWidth, itemHeight)
    });

    listItem.show();

    this._listItems[i] = listItem;
  }
};

List.prototype._createItem = function(itemDef) {
  return new ListItem(itemDef);
};

List.prototype._highlightItem = function(index) {
  var oldItem = this._listItems[this._selectionIndex];
  var newItem = this._listItems[index];

  oldItem.highlight(false);
  newItem.highlight(true);

  this._scrollIntoView(newItem.border);

  this._selectionIndex = index;

  var event = {
    grid : this,
    item : this._listItems[index].state.item,
    itemIndex : index
  };
  this.emit('highlight', null, event);
};

List.prototype._getVisibleItems = function() {
  var visibleItems = [];
  for (var i = 0; i < this._listItems.length; i++) {
    if (this._isItemVisible(this._listItems[i].border)) {
      visibleItems.push(this._listItems[i]);
    }
  }
  return visibleItems;
};

List.prototype._isItemVisible = function(item) {
  var position = item.position();
  var size = item.size();

  var left = position.x - this.state.borderSpacing;
  var right = position.x + size.x + this.state.borderSpacing;
  var top = position.y - this.state.borderSpacing;
  var bottom = position.y + size.y + this.state.borderSpacing;

  var screenTop = WindowUtils.getWindowTop(this.state.fullscreen);
  var screenHeight = WindowUtils.getWindowHeight(this.state.fullscreen);
  var screenWidth = WindowUtils.getWindowWidth(this.state.fullscreen);

  return ((top > screenTop && top < screenHeight) ||
          (bottom > 0 && bottom < screenHeight)) &&
          ((left > 0 && left < screenHeight) ||
          (right > 0 && right < screenWidth));
};

List.prototype._scrollIntoView = function(item) {
  var position = item.position();
  var size = item.size();

  var left = position.x - this.state.borderSpacing;
  var right = position.x + size.x + this.state.borderSpacing;
  var top = position.y - this.state.borderSpacing;
  var bottom = position.y + size.y + this.state.borderSpacing;

  var screenTop = WindowUtils.getWindowTop(this.state.fullscreen);
  var screenHeight = WindowUtils.getWindowHeight(this.state.fullscreen);
  var screenWidth = WindowUtils.getWindowWidth(this.state.fullscreen);

  var offsetX = right > screenWidth ? right - screenWidth : left < 0 ? left : 0;
  var offsetY = bottom > screenHeight ? bottom - screenHeight : top < screenTop ? top : 0;

  if (offsetY !== 0 || offsetX !== 0) {
    this.each(function(element) {
      var elementPosition = element.position();
      elementPosition.x -= offsetX;
      elementPosition.y -= offsetY;
      element.animate({ position: elementPosition });
    });
  }
};

List.emit = Window.emit;

List.prototype._onClickHandler = function(e) {
  var index = this._selectionIndex;
  switch (e.button) {
    case 'up':
      index = (this._listItems.length + index - 1) % this._listItems.length;
      this._highlightItem(index);
      break;
    case 'down':
      index = (index + 1) % this._listItems.length;
      this._highlightItem(index);
      break;
    case 'select':
      var event = {
        grid : this,
        item : this._listItems[index].state.item,
        itemIndex : index
      };
      this.emit('select', null, event);
      break;
  }
};

module.exports = List;
