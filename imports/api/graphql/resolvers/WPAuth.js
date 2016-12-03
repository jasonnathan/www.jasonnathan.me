/*globals fetch, Promise*/

/**
 * This is the Wordpress authentication class that returns an access_token via
 * an auth request or from it's internal state. This class should only ever
 * be instantiated once in a lifecycle of a program because of its internal
 * state.
 * @class Wordpress Auth
 */

/**
 * Creates a fetch global
 */
import 'isomorphic-fetch';

/**
 * used to format the url params
 */
import querystring from 'querystring';

export default class {

  /**
   * Constructs this class with initial properties and creates the initial state
   * @type {Object} = [{
   *       username: String, // WP_USERNAME
   *       password: String, // WP_PASSWD
   *       client_secret: String, // CLIENT_ID from WP app
   *       client_id: String // CLIENT_SECRET from WP app
   *   }]
   */
  constructor(props = {}){
    const {grant_type = "password"} = props;
    this.props = {
      ...props,
      grant_type,
      authUrl: 'https://public-api.wordpress.com/oauth2/token'
    }

    this.state = { token: null }

    this.setState = (obj) => {
      if(typeof obj === 'object'){
        this.state = {...this.state, ...obj};
      }
    }
  }

  /**
   * getter for the authUrl to use
   * @return {String} [description]
   */
  get authUrl(){
    return this.props.authUrl;
  }

  /**
   * getter for token from internal state
   * @return {String} The stored access_token
   */
  get token(){
    return this.state.token;
  }

  /**
   * The request method. It is initiated with props even when used internally.
   * Makes it easier to test
   *
   * @type {Object} = [{
   *       username: String, // WP_USERNAME
   *       password: String, // WP_PASSWD
   *       client_secret: String, // CLIENT_ID from WP app
   *       client_id: String // CLIENT_SECRET from WP app
   *   }]
   * @returns {Promise}
   */
  request(props){
    const {
      username, password, client_secret,
      client_id, grant_type, authUrl
    } = props;

    return fetch(authUrl, {
      headers: {"Content-Type": 'application/x-www-form-urlencoded'},
      method: 'POST',
      compress: !0,
      body: querystring.stringify({
        username, password, client_secret, client_id, grant_type
      })
    });
  }


  /**
   * The first handler for after the initial request
   *
   * @type {Object} the Response object from the request above
   * @returns {Promise}
   */
  json(response){
    if(typeof response.json !== "function"){
      // this will mean there is an error with the response from WordPress
      return Promise.reject(new Error("Response object was magically returned without a json method"))
    }
    return response.json(); // promise
  }

  /**
   * Returns a function that:
   * - extracts and stores the access_token using and returns a Promise with it
   * - detects errors from the API and rejects with the error message
   *
   * @type {Function} setState is called with token when it is received
   * @returns {Promise}
   */
  storeTokenAndResolve(setState){
    return ({access_token, error, error_description}) => {
      if(error){
        return Promise.reject(new Error(error_description))
      }

      setState({token: access_token});
      return Promise.resolve(access_token);
    }
  }

  /**
   * A utility for all the obave methods. Calls each in succession in
   * Thenable(s) and resolves to an access_token
   *
   * @returns {Promise}
   */
  access_token(){
    if(this.token){
      return Promise.resolve(this.token)
    }
    return this
      .request(this.props)
      .then(this.json)
      .then(this.storeTokenAndResolve(this.setState))
  }
}
