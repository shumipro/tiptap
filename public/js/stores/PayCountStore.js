var TTDispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var PayCountStore = StoreFactory.create({});

PayCountStore.dispatchToken = TTDispatcher.register((action)=> {
  if(action.type === undefined){
    return
  }
  switch(action.type) {
    case ActionTypes.ADD_PAY_COUNT:
      PayCountStore.setState({});
      break;
    default:
      // no-op
  }
});

module.exports = PayCountStore;
