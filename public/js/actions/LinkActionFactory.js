/**
  Link Actions
*/
var _ = require('lodash');
var AuthFetch = require('../utils/fetch').authFetch;

var LinkActionFactory = new ()=>{

  /**
    react-router context
  */
  this._router = null;

  this.init = function(router) {
    this._router = router;
  }

  this.create = function(type, opts) {
    var func = this[type];
    if (func) {
      return func.call(this, opts);
    }
    console.error('link type "'+type+'" is not defined.');
    return function() {};
  }

  /**
   * Direct link
   * @param {String} opts.dest hash params
   */
  this.direct = function(opts) {
    return function() {
      this._router.transitionTo(opts.dest);
    }.bind(this);
  }

}

module.exports = LinkActionFactory;
