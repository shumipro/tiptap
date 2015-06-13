var ActionTypes     = require('../constants').ActionTypes;
var Dispatcher = require('../dispatcher');

var RootActions = {

  enableScroll: function() {
    Dispatcher.dispatch({
      type: ActionTypes.ENABLE_ROOT_SCROLL
    });
  },

  disableScroll: function() {
    Dispatcher.dispatch({
      type: ActionTypes.DISABLE_ROOT_SCROLL
    });
  }
};

module.exports = RootActions;
