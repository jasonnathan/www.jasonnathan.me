/*globals fetch, Promise*/
import 'isomorphic-fetch';
import querystring from 'querystring';

export default class {

  constructor(props = {}){
    const {grant_type = "password"} = props;
    this.props = {
      ...props,
      grant_type,
      authUrl: 'https://public-api.wordpress.com/oauth2/token'
    }

    this.state = { token: null, response: null}

    this.setState = (obj) => {
      if(typeof obj === 'object'){
        this.state = {...this.state, ...obj};
      }
    }

  }

  get authUrl(){
    return this.props.authUrl;
  }

  get token(){
    return this.state.token;
  }

  static json(response){
    if(typeof response.json !== "function"){
      // this will mean there is an error with the response from WordPress
      return Promise.reject(new Error("Response object was magically returned without a json method"))
    }
    return response.json(); // promise
  }

  static storeTokenAndResolve({error, error_description, access_token}, setState = newState => newState){
    if(error){
      return Promise.reject(new Error(error_description))
    }
    setState({token: access_token});
    return Promise.resolve(access_token);
  }

  static request(props){
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
      .then(this.storeTokenAndResolve, this.setState)
  }
}
