var ActionTypes = require('../constants').ActionTypes;
var TTDispatcher = require('../dispatcher');


var PusherActions = {

  openPusherModal: function() {
    console.log('open');
    TTDispatcher.dispatch({
      type: ActionTypes.OPEN_PUSHER_DIALOG
    });
  },
  
  closePusherModal: function() {
    TTDispatcher.dispatch({
      type: ActionTypes.CLOSE_PUSHER_DIALOG
    });
  },
  
  setPusherData: function(data) {
    TTDispatcher.dispatch({
      type    : ActionTypes.SET_PUSHER_DATA,
      userId  : data.userId,
      userName: data.userName || "No Name",
      userIcon: data.userIcon || null,
      payValue: data.payValue || 0,
      show: data.show || false
    }); 
  }
};

module.exports = PusherActions;
