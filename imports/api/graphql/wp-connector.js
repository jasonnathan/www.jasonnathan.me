/*globals fetch*/
import 'isomorphic-fetch';
import FormData from 'form-data';
import Posts from '/imports/api/PostsCollection';

const url = 'https://public-api.wordpress.com/wp/v2/sites/japanatrois.wordpress.com';
const authUrl = 'https://public-api.wordpress.com/oauth2/token';
let _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: null
};

const authWP = () => {
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
          .catch(er => console.error(er));
}
const getWP = (endpoint, query) => {
  const ep = `${url}/${endpoint}` + (query ? `?$(query)` : '');
  return authWP().then((headers) => fetch(ep, {headers, compress: !0}).then( res => res.json() ))
}

export const getPost = id => getWP(`posts/${id}`);
export const getAuthor = id => getWP(`users/${id}`);
export const getPostsByAuthor = id => getWP('posts', `author=${id}`);
export const getPosts = async (id) => {
  let _local = await Posts.find().fetch();
  if(!_local.length){
    return await getWP('posts' + (id ? `/${id}` : '')).then(posts => {
      console.log("fetched from REST", posts.length);
      Posts.batchInsert(posts);
      return Promise.resolve(posts);
    });
  }
  console.log("from DB", _local.length);
  return Promise.resolve(_local);
};
