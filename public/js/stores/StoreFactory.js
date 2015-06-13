var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var Immutable    = require('immutable');

var createStore = (defaultState)=> {

  defaultState = defaultState || {};

  return assign({}, EventEmitter.prototype, {

    _defaultState: Immutable.Map(defaultState),

    _state: null,

    dispatchToken: null,

    initState: ()=> {
      this._state = this._defaultState;
      return this.getState();
    },

    setState: (state)=> {
      this._state = this._state.mergeDeep(state);
      this.changeState();
    },

    getState: ()=> {
      return this._state.toJS();
    },

    changeState: ()=> {
      var state = this.getState();
      this.emit('change:state', state);
    }

  });

};

module.exports = {
  create: (initState)=> {
    var store = createStore(initState);
    store.initState();
    return store;
  }
};
