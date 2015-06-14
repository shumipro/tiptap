var TTDispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var PageHistoryStore = StoreFactory.create({
  isHistoryBack: false
});

PageHistoryStore.dispatchToken = TTDispatcher.register((action)=> {
  if(action.type === undefined){
    return
  }
  switch(action.type) {
    case ActionTypes.ON_HISTORY_BACK:
      PageHistoryStore.setState({
        isHistoryBack: true
      });
      break;
      
    case ActionTypes.OFF_HISTORY_BACK:
      PageHistoryStore.setState({
        isHistoryBack: false
      });
      break;
      
    default:
      // no-op
  }
});

module.exports = PageHistoryStore;
