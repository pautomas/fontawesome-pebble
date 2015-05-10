var icons = require('icons');
var Vector2 = require('vector2');
var Grid = require('ui2/grid');
var UI = require('ui');
var WindowUtils = require('ui2/windowUtils');
var UI2 = require('ui2');

var fullscreen = true;
var ITEMS_PER_PAGE = 16;
var pageCount = icons.length / ITEMS_PER_PAGE;
var page = 0;
var currentIndex, prevIndex = 0;

var items = new Array(ITEMS_PER_PAGE);
var alts = new Array(ITEMS_PER_PAGE);

var helpbar = new UI.Text({
  text: 'Font Awesome Viewer',
  backgroundColor: 'mayGreen',
  font: 'GOTHIC_14',
  position: new Vector2(0, WindowUtils.getWindowHeight(fullscreen) - 20),
  size: new Vector2(WindowUtils.getWindowWidth(fullscreen), 20) });

var grid = new Grid({
  fullscreen: fullscreen,
  itemsPerRow: 4,
  backgroundColor: 'black',
  borderSpacing: 1,
  itemDefaultStyle: {
    titleColor: 'white',
    titleFont: 'ICON_18',
    backgroundColor: 'darkGray',
    highlightBackgroundColor: 'mayGreen',
    borderWidth: 0
  },
  items: items
});

var updateHelpbar = function() {
  helpbar.text(alts[currentIndex] || '');
};

var paginate = function(page) {
  var gridItems = grid._listItems;
  for (var i = 0; i < gridItems.length; i++) {
    var icon = icons[i + (page * ITEMS_PER_PAGE)];
    gridItems[i].title.text(icon.code || '');
    alts[i] = icon.name;
  }
  updateHelpbar();
};

grid.on('highlight', function(e) {
  prevIndex = currentIndex;
  currentIndex = e.itemIndex;
  updateHelpbar();
});

grid.on('click', function(e) {
  switch (e.button) {
    case 'up':
      if (prevIndex - 1 < 0) {
        page = (pageCount + page - 1) % pageCount;
        paginate(page);
      }
      break;
    case 'down':
      if (prevIndex + 1 >= ITEMS_PER_PAGE) {
        page = (page + 1) % pageCount;
        paginate(page);
      }
      break;
  }
  return false;
});

grid.on('longClick', function(e) {
  switch (e.button) {
    case 'up':
      page = (pageCount + page - 1) % pageCount;
      break;
    case 'down':
      page = (page + 1) % pageCount;
      break;
  }
  paginate(page);
  return false;
});

grid.add(helpbar);
grid.show();
paginate(page);
