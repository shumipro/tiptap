var ActionTypes     = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');

var PeformerActions = {

  updatePerformer: function() {
    TTDispatcher.dispatch({
      type: ActionTypes.UPDATE_PERFORMER
    });
  }
};

module.exports = PeformerActions;
