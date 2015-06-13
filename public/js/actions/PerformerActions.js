var ActionTypes     = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');

var PeformerActions = {

  updatePerformer: function(data) {
    TTDispatcher.dispatch({
      type: ActionTypes.UPDATE_PERFORMER,
      performer: data
    });
  }
};

module.exports = PeformerActions;
