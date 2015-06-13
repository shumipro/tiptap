var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var RootStore = StoreFactory.create({});

RootStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.CLOSE_SIDE_MODAL:
      RootStore.setState({enableScroll: true});
      break;
    default:
      // no-op
  }
});

module.exports = RootStore;
