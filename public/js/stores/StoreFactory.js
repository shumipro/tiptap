var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var Immutable    = require('immutable');

var createStore = function(defaultState) {

  defaultState = defaultState || {};

  return assign({}, EventEmitter.prototype, {

    _defaultState: Immutable.Map(defaultState),

    _state: null,

    dispatchToken: null,

    initState: function() {
      this._state = this._defaultState;
      return this.getState();
    },

    setState: function(state) {
      this._state = this._state.mergeDeep(state);
      this.changeState();
    },

    getState: function() {
      return this._state.toJS();
    },

    changeState: function() {
      var state = this.getState();
      this.emit('change:state', state);
    }

  });

};

module.exports = {
  create: function(initState) {
    var store = createStore(initState);
    store.initState();
    return store;
  }
};
