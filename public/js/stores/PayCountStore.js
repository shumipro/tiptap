var TTDispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var PayCountStore = StoreFactory.create({
  tips: []
});

PayCountStore.dispatchToken = TTDispatcher.register((action)=> {
  if(action.type === undefined){
    return
  }
  switch(action.type) {
    case ActionTypes.ADD_PAY_COUNT:
      var tips = PayCountStore.getState().tips || [];
      // append to tips list
      tips.push(action.data);
      PayCountStore.setState({tips: tips});
      break;
    case ActionTypes.EMPTY_PAY_COUNT:
      PayCountStore.setState({tips: []});
      break;
    default:
      // no-op
  }
});

module.exports = PayCountStore;
