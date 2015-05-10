const SCREEN_WIDTH = 144;
const SCREEN_HEIGHT = 168;
const STATUS_BAR_HEIGHT = 16;

var WindowUtils = {
  getWindowWidth : function(fullscreen) {
    return SCREEN_WIDTH;
  },
  getWindowHeight : function(fullscreen) {
    return SCREEN_HEIGHT - WindowUtils.getWindowTop(fullscreen);
  },
  getWindowTop : function(fullscreen) {
    return fullscreen === true ? 0 : STATUS_BAR_HEIGHT;
  }
};

module.exports = WindowUtils;
