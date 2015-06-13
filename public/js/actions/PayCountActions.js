var ActionTypes     = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');

var PayCountActions = {

  addPayCount: function(data) {
    TTDispatcher.dispatch({
      type: ActionTypes.ADD_PAY_COUNT,
      data: data
    });
  },

  emptyPayCount: function(){
    TTDispatcher.dispatch({
      type: ActionTypes.EMPTY_PAY_COUNT
    });
  }
};

module.exports = PayCountActions;
