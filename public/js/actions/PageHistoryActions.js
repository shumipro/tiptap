var ActionTypes     = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');

var PageHistoryActions = {

  onHistoryBack: function() {
    console.log("on");
    TTDispatcher.dispatch({
      type: ActionTypes.ON_HISTORY_BACK
    });
  },

  offHistoryBack: function(){
    TTDispatcher.dispatch({
      type: ActionTypes.OFF_HISTORY_BACK
    });
  }
};

module.exports = PageHistoryActions;
