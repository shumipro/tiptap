var ActionTypes     = require('../constants').ActionTypes;
var Dispatcher = require('../dispatcher');

var PeformerActions = {

  updatePerformer: function() {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_PERFORMER
    });
  }
};

module.exports = PeformerActions;
