/*globals Promise*/

/**
 * This is the base abstract class with all the utility methods that is used by
 * other WP request classes
 * @class WPAbstract
 * @author Jason Nathan
 */
export default class WPAbstract{
  constructor(props){
    this.props = props;
  }

  /**
   * The first handler after the initial request
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

}
