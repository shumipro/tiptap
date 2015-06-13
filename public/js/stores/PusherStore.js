var ActionTypes = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');
var StoreFactory = require('./StoreFactory');

var PusherStore = StoreFactory.create({
  show    : false,
  userId  : null,
  userName: null,
  userIcon: null,
  payValue: 0
});


PusherStore.dispatchToken = 
  TTDispatcher.register(function(action) {
  
    switch(action.type) {
      case ActionTypes.SHOW_CONFIRM_DIALOG:
        PusherStore.setState({show: true});
        break;
      case ActionTypes.CLOSE_CONFIRM_DIALOG:
        PusherStore.setState({show: false});
        break;
      case ActionTypes.SET_CONFIRM_OPTION:
        PusherStore.setState({
          userId    : action.userId,
          userName  : action.userName,
          userIcon  : action.userIcon,
          payValue  : action.payValue
        });
        break;
      default:
        // no-op
    }
  
  });

module.exports = PusherStore;