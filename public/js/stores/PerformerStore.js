var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var PerformerStore = StoreFactory.create({});

PerformerStore.dispatchToken = Dispatcher.register((action)=> {
  switch(action.type) {
    case ActionTypes.UPDATE_PERFORMER:
    console.log(action)
      PerformerStore.setState({});
      break;
    default:
      // no-op
  }
});

module.exports = PerformerStore;
