var ActionTypes     = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');

var PayCountActions = {

  addPayCount: function() {
    TTDispatcher.dispatch({
      type: ActionTypes.ADD_PAY_COUNT
    });
  }
};

module.exports = PayCountActions;
