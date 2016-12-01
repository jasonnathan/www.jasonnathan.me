/*globals fetch*/
import 'isomorphic-fetch';
import querystring from 'querystring';

export default class {

  constructor({username, password, client_secret, client_id, grant_type="password"}){
    this.props = {
      username, password, client_secret, client_id, grant_type,
      authUrl: 'https://public-api.wordpress.com/oauth2/token'
    }
    this.state = {
      token: null,
      response: null
    }
  }

  get authUrl(){
    return this.props.authUrl;
  }

  get token(){
    return this.state.token;
  }

  json(response){
    if(typeof response.json !== "function"){
      return Promise.reject(new Error("Response object was magically returned without a json method"))
    }
    return response.json(); // promise
  }

  storeTokenAndResolve({error, error_description, access_token}){
    if(error){
      return Promise.reject(new Error(error_description))
    }
    this.state.token = access_token;
    return Promise.resolve(this.token);
  }

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

  access_token(){
    if(this.token){
      return Promise.resolve(this.token)
    }
    return this
      .request(this.props)
      .then(this.json)
      .then(this.storeTokenAndResolve)
  }
}
