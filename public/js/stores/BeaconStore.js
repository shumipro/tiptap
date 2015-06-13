var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;
var StoreFactory = require('./StoreFactory');

var BeaconStore = StoreFactory.create({});

BeaconStore.dispatchToken = Dispatcher.register((action)=> {
  switch(action.type) {
    default:
      // no-op
  }
});

module.exports = RootStore;
