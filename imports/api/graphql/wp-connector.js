/*globals fetch*/
import 'isomorphic-fetch';
import FormData from 'form-data';

// Posts.remove({});

// const url = 'https://public-api.wordpress.com/wp/v2/sites/japanatrois.wordpress.com';
const url = 'https://public-api.wordpress.com/wp/v2/sites/jasonnathan.wordpress.com';
const authUrl = 'https://public-api.wordpress.com/oauth2/token';
let _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: null
};

const authWP = () => {
  if(_headers.Authorization)
    return Promise.resolve(_headers);

  const form = new FormData();
  const { CLIENT_ID, CLIENT_SECRET,WP_USERNAME,WP_PASSWD } = process.env;
  form.append('client_id', CLIENT_ID);
  form.append('client_secret', CLIENT_SECRET);
  form.append('grant_type', 'password');
  form.append('username', WP_USERNAME);
  form.append('password', WP_PASSWD);

  return fetch(authUrl, {method: 'POST', compress: true, body: form})
          .then(res => res.json())
          .then(({access_token}) => {_headers.Authorization = `Bearer ${access_token}`; return _headers})
}
const getWP = (endpoint, query) => {
  const ep = `${url}/${endpoint}` + (query ? `?${query}` : '');
  return authWP().then((headers) => fetch(ep, {headers, compress: !0}).then( res => {
    const totalPosts = res.headers.get('x-wp-total');
    if(totalPosts)
      return res.json().then((data) =>{
        data.totalPosts = totalPosts;
        return Promise.resolve(data);
      });
    return res.json();
  } ))
}

export const getPost = id => getWP(`posts/${id}`);
export const getAuthor = id => getWP(`users/${id}`);
export const getCategoryByPost = id => getWP('categories', `post=${id}`)
export const getPostsByAuthor = id => getWP('posts', `author=${id}`);
export const getCategories = () => getWP(`categories`);
export const getPosts = () => getWP('posts');
