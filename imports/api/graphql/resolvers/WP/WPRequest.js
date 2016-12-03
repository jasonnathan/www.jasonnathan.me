/*globals fetch*/
/**
 * The only class needed for making WP requests. Created to make it easier to
 * write tests cases and possibly to extend WP functionality in future.
 *
 * @class WPRequest
 * @extends WPAbstract
 * @author Jason Nathan
 */
/** Fetch module imports into global. */
import 'isomorphic-fetch';

/** base utility class */
import WPAbstract from './WPAbstract';

/** Extract the Blog URL from environment */
const {WP_URL} = process.env;

export default class WPRequest extends WPAbstract{

  /**
   * @type {WPAuth} auth An instance of WPAuth
   * @type {String} url The WP blog URL of the REST API
   */
  constructor(auth, url = WP_URL){
    super({auth, url});
    if(!auth){
      throw new Error("WPRequest must be instantiated with an instance of WPAuth")
    }
    this.auth = auth;
    this.url = url
  }

  /**
   * A simple utility to construct the endpoint
   *
   * @type {String} endpoint the REST endpoint to query e.g. /posts
   * @type {Object|String} query contains relevant request query params
   * @returns {String}
   */
  parseEndpoint(endpoint, query = null){
    if(query){
      if(typeof query === 'object'){
        query = Object.keys(query).map(k => `${k}=${query[k]}`).join("&");
      }
    }
    let ep = `${WP_URL}/${endpoint}`;
    ep += query ? `?${query}` : '';
    return ep;
  }

  /**
   * Returns a function that takes a token as an argument that in turn makes
   * the actual request.
   *
   * @type String endpoint The fully constructed URL to query, see above
   * @returns {Promise}
   */
  fetchWithToken(endpoint){
    return token => {
      if(!token || typeof token !== 'string'){
        throw new Error("Cannot fetch endpoint without a valid access_token")
      }
      return fetch(endpoint, { Authorization:`Bearer ${token}`, compress: !0 })
    }
  }

  /**
   * A convenience method that does all of the above and returns a JSON response
   *
   * @type {String} endpoint the REST endpoint to query e.g. /posts
   * @type {Object|String} query contains relevant request query params
   * @returns {Promise}
   */
  fetch(endpoint, query){
    const ep = this.parseEndpoint(endpoint, query);
    return this.auth
      .access_token()
      .then(this.fetchWithToken(ep))
      .then(super.json);
  }
}
