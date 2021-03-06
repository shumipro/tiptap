var TTDispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var PerformerStore = StoreFactory.create({});

PerformerStore.dispatchToken = TTDispatcher.register((action)=> {
  if(action.type === undefined){
    return
  }
  switch(action.type) {
    case ActionTypes.UPDATE_PERFORMER:
      console.log(action)
      PerformerStore.setState(action.performer);
      break;
    default:
      // no-op
  }
});

module.exports = PerformerStore;
