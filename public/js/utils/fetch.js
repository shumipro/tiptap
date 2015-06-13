/**
 * fetch wapper
 * Created by yokomichi on 2015/04/01.
 */
require('whatwg-fetch');

function authFetch(url, options) {
  if (!options) {
    options = {}
  }
  return fetch(url, options)
}

module.exports = {
  authFetch: authFetch
};
